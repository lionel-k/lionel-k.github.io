#!/usr/bin/env ruby

require 'csv'
require 'logger'
require_relative '../generate_blog'

# Set up logging
logger = Logger.new($stdout)
logger.level = Logger::INFO
logger.formatter =
  proc { |severity, datetime, progname, msg| "#{datetime.strftime('%Y-%m-%d %H:%M:%S')} [#{severity}] #{msg}\n" }

def generate_posts(count, logger)
  # Read CSV and find draft posts
  csv_path = File.join(__dir__, '..', 'data', 'blog_topics.csv')
  blog_posts = CSV.read(csv_path, headers: true)
  draft_posts = blog_posts.select { |post| post['editorial_status'] == 'draft' }

  if draft_posts.empty?
    logger.error "No draft posts found in #{csv_path}"
    exit 1
  end

  posts_to_generate = draft_posts.first(count)
  total_posts = posts_to_generate.length

  logger.info "Found #{total_posts} draft posts to generate"
  logger.info 'Starting generation process...'

  posts_to_generate.each_with_index do |post, index|
    current_post = index + 1
    logger.info '=' * 80
    logger.info "Generating post #{current_post}/#{total_posts}: #{post['topic']}"
    logger.info '=' * 80

    begin
      # Call the main generation script
      ARGV.replace([post['id']])
      load File.join(__dir__, '..', 'generate_blog.rb')

      # Sleep between posts to avoid rate limiting
      if current_post < total_posts
        sleep_time = 30 # 30 seconds between posts
        logger.info "Waiting #{sleep_time} seconds before generating next post..."
        sleep(sleep_time)
      end
    rescue StandardError => e
      logger.error "Error generating post '#{post['topic']}': #{e.message}"
      logger.error e.backtrace.join("\n")
      next
    end
  end

  logger.info '=' * 80
  logger.info 'Generation process completed!'
  logger.info "Successfully generated #{total_posts} posts"
  logger.info '=' * 80
end

if ARGV.empty?
  puts "Usage: #{$0} <number_of_posts>"
  exit 1
end

count = ARGV[0].to_i
if count <= 0
  puts 'Please provide a positive number of posts to generate'
  exit 1
end

generate_posts(count, logger)
