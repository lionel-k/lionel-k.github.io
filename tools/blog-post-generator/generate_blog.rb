#!/usr/bin/env ruby

require 'csv'
require 'dotenv'
require_relative 'scripts/prompt_generator'
require_relative 'scripts/content_processor'
require_relative 'scripts/utils'
require_relative 'scripts/image_generator'
require_relative 'scripts/openai_client'
require 'base64'
require 'open-uri'
require 'net/http'
require 'json'

# Load environment variables
Dotenv.load('../.env')

# Check if the API key is set
if ENV['OPENAI_API_KEY'].nil? || ENV['OPENAI_API_KEY'].empty?
  puts 'Error: OPENAI_API_KEY is not set in your environment or .env file.'
  exit 1
end

# Read CSV and find the blog post
csv_path = File.join(__dir__, 'data', 'blog_topics.csv')
blog_posts = CSV.read(csv_path, headers: true)

# Find the first blog post with draft status if no ID is provided
blog_post =
  if ARGV.empty?
    first_draft = blog_posts.find { |post| post['editorial_status'] == 'draft' }
    if first_draft.nil?
      puts 'Error: No blog posts with draft status found.'
      exit 1
    end
    puts "No blog post ID provided. Generating the first draft post: #{first_draft['topic']}"
    first_draft
  else
    blog_post_id = ARGV[0]
    found_post = blog_posts.find { |post| post['id'] == blog_post_id }
    if found_post.nil?
      puts "Error: Blog post with ID #{blog_post_id} not found."
      exit 1
    end
    found_post
  end

# Convert CSV row to hash with symbol keys
blog_post_hash = blog_post.to_h.transform_keys(&:to_sym)

begin
  puts "Generating blog post: #{blog_post_hash[:topic]}"

  def replace_placeholders(template, replacements)
    result = template.dup
    replacements.each { |key, value| result.gsub!("[#{key}]", value.to_s) }
    result
  end

  def validate_word_count(text, expected_count, section_name, tolerance = 50)
    return false if text.nil? || text.empty?

    actual_count = text.split(/\s+/).size
    if (actual_count - expected_count).abs > tolerance
      puts "Info: #{section_name} word count is #{actual_count} words"
      return true # Continue anyway
    end
    true
  end

  def check_total_word_count(content, current_section = nil)
    return 0 if content.nil? || content.empty?

    total_words = content.split(/\s+/).size
    puts "Current total word count: #{total_words} words"
    puts "Section being processed: #{current_section}" if current_section
    total_words
  end

  # Step 1: Generate Outline
  puts "\nStep 1: Generating outline..."
  outline_prompt = PromptGenerator.new(File.join(__dir__, 'prompts', 'outline_prompt.txt')).generate(blog_post_hash)
  outline_response = OpenAIClient.generate_content(outline_prompt, 'You are an expert content outliner. Create a detailed blog post outline.')
  outline = OpenAIClient.extract_content(outline_response)
  puts '✓ Outline generated'

  # Step 2: Generate Highlights
  puts "\nStep 2: Generating highlights..."
  highlights_template = File.read(File.join(__dir__, 'prompts', 'highlights_prompt.txt'))
  highlights_prompt =
    replace_placeholders(
      highlights_template,
      {
        'TOPIC' => blog_post_hash[:topic],
        'PRIMARY_KEYWORD' => blog_post_hash[:primary_keyword],
        'SECONDARY_KEYWORDS' => blog_post_hash[:secondary_keywords],
        'OUTLINE' => outline,
      },
    )
  highlights_response = OpenAIClient.generate_content(highlights_prompt, 'You are an expert content summarizer. Create engaging highlights.')
  highlights = OpenAIClient.extract_content(highlights_response)
  puts '✓ Highlights generated'

  # Step 3: Generate Introduction
  puts "\nStep 3: Generating introduction..."
  intro_template = File.read(File.join(__dir__, 'prompts', 'introduction_prompt.txt'))
  intro_prompt =
    replace_placeholders(
      intro_template,
      {
        'TOPIC' => blog_post_hash[:topic],
        'PRIMARY_KEYWORD' => blog_post_hash[:primary_keyword],
        'SECONDARY_KEYWORDS' => blog_post_hash[:secondary_keywords],
        'OUTLINE' => outline,
      },
    )

  introduction = nil
  attempts = 0
  max_attempts = 3

  begin
    until validate_word_count(introduction, 250, 'Introduction') || attempts >= max_attempts
      intro_response = OpenAIClient.generate_content(intro_prompt, 'You are an expert content writer. Write an engaging introduction.')
      introduction = OpenAIClient.extract_content(intro_response)
      attempts += 1
    end

    if attempts >= max_attempts && !validate_word_count(introduction, 250, 'Introduction')
      puts "Warning: Could not generate introduction with correct word count after #{max_attempts} attempts."
      puts "Proceeding with last generated introduction (#{introduction.split(/\s+/).size} words)"
    end
  rescue StandardError => e
    puts "Error generating introduction: #{e.message}"
    exit 1
  end

  puts '✓ Introduction generated'

  # Step 4: Generate Each Section
  puts "\nStep 4: Generating main sections..."
  sections = []
  section_template = File.read(File.join(__dir__, 'prompts', 'section_prompt.txt'))

  # Debug output
  puts "\nDEBUG: Generated outline:"
  puts outline
  puts "\nDEBUG: Attempting to extract sections..."

  # First, normalize the outline format
  normalized_outline = outline.gsub(/^#(?!#)/, '##') # Convert single # to ##

  # Extract section information from outline with more flexible pattern
  section_info =
    normalized_outline
      .scan(/##\s+([^#\n]+?)(?:\s*\((\d+|XXX)\s*words?\))([^#]*?)(?=(?:##|\z))/im)
      .map do |title, words, content|
        puts "\nDEBUG: Found section:"
        puts "Title: #{title.strip}"
        puts "Word count: #{words}"

        # Handle placeholder word counts
        word_count = words == 'XXX' ? 600 : words.to_i # Default to 600 words for main sections

        # Extract subsections
        subsections =
          content
            .scan(/###\s+([^#\n]+?)(?:\s*\((\d+|XXX)\s*words?\))([^#]*?)(?=(?:###|\z))/im)
            .map do |sub_title, sub_words, sub_content|
              sub_word_count = sub_words == 'XXX' ? 200 : sub_words.to_i # Default to 200 words for subsections
              points = sub_content.scan(/[-*]\s+([^\n]+)/).flatten
              [sub_title.strip, sub_word_count, points.join("\n- ")]
            end

        # If no subsections found, treat the whole content as one section
        if subsections.empty?
          points = content.scan(/[-*]\s+([^\n]+)/).flatten
          formatted_points = points.join("\n- ")
          [title.strip, word_count, formatted_points, []]
        else
          puts "Found #{subsections.length} subsections"
          subsections.each { |sub_title, sub_words, _| puts "  - #{sub_title} (#{sub_words} words)" }
          [title.strip, word_count, '', subsections]
        end
      end

  if section_info.empty?
    puts 'Error: Could not extract section information from the outline.'
    puts 'Please check the outline format. Expected format:'
    puts '## Section Title (550 words)'
    puts '### Subsection Title (180 words)'
    puts '- Point 1'
    puts '- Point 2'
    puts "\nActual outline received:"
    puts outline
    exit 1
  end

  # Skip intro and conclusion
  main_sections = section_info.select { |title, _, _, _| !title.downcase.match?(/introduction|conclusion/) }

  puts "\nDEBUG: Found #{main_sections.length} main sections:"
  main_sections.each do |title, words, _, subsections|
    puts "- #{title} (#{words} words)"
    subsections.each { |sub_title, sub_words, _| puts "  - #{sub_title} (#{sub_words} words)" }
  end

  main_sections.each do |title, word_count, points, subsections|
    puts "\n  Generating section: #{title}"

    # Calculate running total for information only
    current_content = [introduction, *sections].join("\n\n")
    check_total_word_count(current_content, title)

    section_content = []
    begin
      if subsections.empty?
        # Generate single section if no subsections
        section_content_valid = false
        attempts = 0
        until section_content_valid || attempts >= max_attempts
          section_prompt =
            replace_placeholders(
              section_template,
              {
                'SECTION_TITLE' => title,
                'TOPIC' => blog_post_hash[:topic],
                'WORD_COUNT' => word_count,
                'PRIMARY_KEYWORD' => blog_post_hash[:primary_keyword],
                'SECONDARY_KEYWORDS' => blog_post_hash[:secondary_keywords],
                'OUTLINE' => outline,
                'SECTION_POINTS' => points,
              },
            )
          section_response =
            OpenAIClient.generate_content(section_prompt, 'You are an expert content writer. Write a detailed section.')
          content = OpenAIClient.extract_content(section_response)
          section_content_valid = validate_word_count(content, word_count, title)
          section_content = [content]
          attempts += 1
        end
      else
        # Generate each subsection
        subsections.each do |sub_title, sub_word_count, sub_points|
          puts "    Generating subsection: #{sub_title}"
          subsection_content_valid = false
          attempts = 0

          until subsection_content_valid || attempts >= max_attempts
            section_prompt =
              replace_placeholders(
                section_template,
                {
                  'SECTION_TITLE' => "#{title} - #{sub_title}",
                  'TOPIC' => blog_post_hash[:topic],
                  'WORD_COUNT' => sub_word_count,
                  'PRIMARY_KEYWORD' => blog_post_hash[:primary_keyword],
                  'SECONDARY_KEYWORDS' => blog_post_hash[:secondary_keywords],
                  'OUTLINE' => outline,
                  'SECTION_POINTS' => sub_points,
                },
              )
            section_response =
              OpenAIClient.generate_content(section_prompt, 'You are an expert content writer. Write a detailed subsection.')
            content = OpenAIClient.extract_content(section_response)
            subsection_content_valid = validate_word_count(content, sub_word_count, "#{title} - #{sub_title}")
            section_content << "### #{sub_title}\n\n#{content}"
            attempts += 1
          end
        end
      end

      sections << section_content.join("\n\n")
      puts '  ✓ Section completed'

      # Report current total
      current_content = [introduction, *sections].join("\n\n")
      check_total_word_count(current_content, title)
    rescue StandardError => e
      puts "Error generating section '#{title}': #{e.message}"
      exit 1
    end
  end

  # Step 5: Generate Conclusion
  puts "\nStep 5: Generating conclusion..."
  conclusion_template = File.read(File.join(__dir__, 'prompts', 'conclusion_prompt.txt'))

  conclusion = nil
  attempts = 0

  begin
    until validate_word_count(conclusion, 350, 'Conclusion') || attempts >= max_attempts
      conclusion_prompt =
        replace_placeholders(
          conclusion_template,
          {
            'TOPIC' => blog_post_hash[:topic],
            'PRIMARY_KEYWORD' => blog_post_hash[:primary_keyword],
            'SECONDARY_KEYWORDS' => blog_post_hash[:secondary_keywords],
            'OUTLINE' => outline,
            'HIGHLIGHTS' => highlights,
            'WORD_COUNT' => 350,
          },
        )
      conclusion_response =
        OpenAIClient.generate_content(conclusion_prompt, 'You are an expert content writer. Write an impactful conclusion.')
      conclusion = OpenAIClient.extract_content(conclusion_response)
      attempts += 1
    end
  rescue StandardError => e
    puts "Error generating conclusion: #{e.message}"
    exit 1
  end

  puts '✓ Conclusion generated'

  # Step 6: Merge All Sections
  puts "\nStep 6: Merging all sections..."
  full_content = [introduction, *sections, conclusion].join("\n\n")

  # Report final word count
  word_count = full_content.split(/\s+/).size
  puts "Final word count: #{word_count} words"

  # Process content and add frontmatter
  processor = ContentProcessor.new(blog_post_hash)
  final_content = processor.process(full_content, highlights)

  # Create output filename and paths
  date = Utils.format_date(blog_post_hash[:publish_date])
  slug = Utils.slugify(blog_post_hash[:topic])
  output_filename = "#{date}-#{slug}.mdx"
  output_path = File.join(__dir__, 'blog_posts', output_filename)

  # Generate cover image
  puts "\nStep 7: Generating cover image..."
  image_prompt_template = File.read(File.join(__dir__, 'prompts', 'image_prompt.txt'))
  prompt = image_prompt_template.gsub('[TOPIC]', blog_post_hash[:topic])

  begin
    result = ImageGenerator.generate(prompt, openai_client: OpenAIClient)

    if result && result[:data]
      # Save the image
      image_path = File.join(__dir__, 'blog_posts', "#{slug}.#{result[:format]}")
      File.binwrite(image_path, result[:data])
      puts '✓ Cover image generated successfully'
    else
      puts 'Failed to generate image'
    end
  rescue StandardError => e
    puts "Error generating cover image: #{e.message}"
  end

  # Ensure blog_posts directory exists
  Utils.ensure_directory(File.join(__dir__, 'blog_posts'))

  # Write the blog post file
  File.write(output_path, final_content)
  puts "\n✓ Blog post generated successfully: #{output_filename}"

  # Update CSV status
  blog_post['editorial_status'] = 'generated'
  CSV.open(csv_path, 'w', headers: true) do |csv|
    csv << blog_posts.headers
    blog_posts.each { |row| csv << row }
  end

  puts '✓ CSV status updated'
rescue Faraday::Error => e
  puts "\nError calling OpenAI API: #{e.message}"
  exit 1
rescue StandardError => e
  puts "\nUnexpected error: #{e.message}"
  puts e.backtrace
  exit 1
end

# Add Flux API image generation method
def generate_flux_image(prompt)
  url = URI('https://api.us1.bfl.ai/v1/flux-pro-1.1')
  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['X-Key'] = ENV['BLACK_FOREST_LABS_API_KEY']

  request.body = {
    prompt: prompt,
    image_prompt: '',
    width: 1792,
    height: 1024,
    prompt_upsampling: false,
    seed: rand(1..999_999),
    safety_tolerance: 2,
    output_format: 'jpeg',
    webhook_url: '',
    webhook_secret: '',
  }.to_json

  response = http.request(request)
  JSON.parse(response.body)
rescue => e
  puts "Error with Flux API: #{e.message}"
  nil
end

# Add DALL-E image generation method
def generate_dalle_image(client, prompt)
  response =
    client.images.generate(
      parameters: {
        model: 'dall-e-3',
        prompt: prompt,
        size: '1792x1024',
        quality: 'standard',
        n: 1,
        response_format: 'b64_json',
      },
    )

  response.dig('data', 0, 'b64_json')
rescue => e
  puts "Error with DALL-E API: #{e.message}"
  nil
end
