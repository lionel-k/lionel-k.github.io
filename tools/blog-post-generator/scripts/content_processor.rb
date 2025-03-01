require_relative 'utils'
require_relative 'openai_client'

class ContentProcessor
  def initialize(blog_post)
    @blog_post = blog_post
    @slug = Utils.slugify(@blog_post[:topic])
  end

  def process(content, highlights = nil)
    reading_time = Utils.calculate_reading_time(content)
    cover_image = Utils.generate_cover_image_path(@slug)

    # Extract or use provided highlights
    content_highlights = highlights ? parse_highlights(highlights) : Utils.extract_highlights(content)

    frontmatter = generate_frontmatter(content_highlights, reading_time, cover_image)
    "#{frontmatter}\n\n#{format_content(content)}"
  end

  private

  def generate_frontmatter(highlights, reading_time, cover_image)
    yaml = <<~YAML
      ---
      title: "#{@blog_post[:topic]}"
      description: "#{generate_description}"
      category: "#{@blog_post[:category]}"
      coverImage: "#{cover_image}"
      author: "Lionel Kubwimana"
      date: "#{@blog_post[:publish_date]}"
      highlights:
      #{highlights.map { |h| "  - \"#{h.strip}\"" }.join("\n")}
      tags:
      #{@blog_post[:tags].split(',').map { |tag| "  - \"#{tag.strip}\"" }.join("\n")}
      readingTime: "#{reading_time}"
      cta:
        text: "Start Your Language Learning Journey"
        link: "#{@blog_post[:cta_link]}"
      ---
    YAML
    yaml
  end

  def format_content(content)
    # Remove any word count markers
    content = content.gsub(/\(Word count: \d+\)/, '')
    content = content.gsub(/\(\d+ words\)/, '')

    # Ensure proper markdown formatting
    content =
      content.gsub(/^(#+)\s*(.+)$/) do |match|
        level = $1.length
        title = $2.strip
        "#{'#' * level} #{title}"
      end

    # Format lists with bold items if not already formatted
    content = content.gsub(/^(\d+)\.\s+([^*].+)$/) { |match| "#{$1}. **#{$2.strip}**" }

    # Ensure proper spacing between sections
    content = content.gsub(/\n{3,}/, "\n\n")

    content.strip
  end

  def parse_highlights(highlights)
    # Extract highlights from the generated highlights section
    highlights.scan(/[-*]\s+(.+)/).map(&:first).map(&:strip)
  end

  def generate_description
    description_template = File.read(File.join(__dir__, '..', 'prompts', 'description_prompt.txt'))
    description_prompt = replace_placeholders(
      description_template,
      {
        'TOPIC' => @blog_post[:topic],
        'PRIMARY_KEYWORD' => @blog_post[:primary_keyword],
        'SECONDARY_KEYWORDS' => @blog_post[:secondary_keywords]
      }
    )

    begin
      description_response = OpenAIClient.generate_content(
        description_prompt,
        'You are an expert SEO content writer. Create compelling meta descriptions that drive clicks.',
        max_tokens: 200
      )
      description = OpenAIClient.extract_content(description_response)

      # Validate the description length
      if description && description.length.between?(155, 160)
        return description
      end

      # Fallback description if the generated one is not within length requirements
      "Learn effective strategies about #{@blog_post[:primary_keyword]}. Discover insights on #{@blog_post[:secondary_keywords].split(',').first(2).join(' and ')} in this comprehensive guide."[0...160]
    rescue StandardError => e
      puts "Error generating description: #{e.message}"
      # Return fallback description in case of any errors
      "Learn effective strategies about #{@blog_post[:primary_keyword]}. Discover insights on #{@blog_post[:secondary_keywords].split(',').first(2).join(' and ')} in this comprehensive guide."[0...160]
    end
  end

  def replace_placeholders(template, replacements)
    result = template.dup
    replacements.each { |key, value| result.gsub!("[#{key}]", value.to_s) }
    result
  end
end
