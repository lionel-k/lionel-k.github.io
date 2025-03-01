#!/usr/bin/env ruby

require 'ruby/openai'
require_relative 'scripts/image_generator'
require 'fileutils'

Dotenv.load('../.env')

def print_usage
  puts 'Usage: ruby generate_image.rb [BLOG_ID]'
  puts '  BLOG_ID: The ID of the blog post to generate an image for'
  puts "           If not provided, will process all blog posts with 'draft' status"
  exit 1
end

def setup_openai_client
  if ENV['OPENAI_API_KEY'].nil? || ENV['OPENAI_API_KEY'].empty?
    puts 'Error: OPENAI_API_KEY is not set in your environment or .env file.'
    exit 1
  end
  OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])
end

def ensure_output_directory
  FileUtils.mkdir_p(File.join(__dir__, 'blog_posts'))
end

def generate_image(blog_id, client)
  puts "\nGenerating image for blog post ID: #{blog_id}"

  result = ImageGenerator.generate_for_blog(blog_id, openai_client: client)

  if result && result[:data] && result[:slug]
    # Create a filename using the blog post slug
    filename = "#{result[:slug]}.#{result[:format]}"
    output_path = File.join(__dir__, 'blog_posts', filename)

    # Save the image
    File.binwrite(output_path, result[:data])
    puts "✓ Image generated successfully: #{filename}"
    true
  else
    puts "× Failed to generate image for blog ID: #{blog_id}"
    false
  end
end

# Main execution
begin
  print_usage if ARGV.include?('-h') || ARGV.include?('--help')

  ensure_output_directory
  client = setup_openai_client

  if ARGV.empty?
    # Process all draft blog posts
    csv_path = File.join(__dir__, 'data', 'blog_topics.csv')
    blog_posts = CSV.read(csv_path, headers: true)
    draft_posts = blog_posts.select { |post| post['editorial_status'] == 'draft' }

    if draft_posts.empty?
      puts "No blog posts with 'draft' status found."
      exit 0
    end

    puts "Found #{draft_posts.size} draft blog posts. Generating images..."
    draft_posts.each { |post| generate_image(post['id'], client) }
  else
    # Process specific blog post
    blog_id = ARGV[0]
    generate_image(blog_id, client)
  end
rescue StandardError => e
  puts "\nError: #{e.message}"
  puts e.backtrace if ENV['DEBUG']
  exit 1
end
