#!/usr/bin/env ruby

require 'fileutils'
require 'json'
require 'base64'
require 'dotenv'

# Load environment variables
Dotenv.load('../.env')

# Source and destination directories
SOURCE_DIR = File.join(__dir__, '..', 'blog_posts')
BLOG_DEST_DIR = File.expand_path('~/code/lionel-k/lingu_africa/www/content/blog')
IMAGE_DEST_DIR = File.expand_path('~/code/lionel-k/lingu_africa/www/public/images/blog')

def generate_image(topic, slug)
  puts "\nGenerating cover image for '#{topic}'..."

  # Read and customize the image prompt template
  image_prompt_template = File.read(File.join(__dir__, '..', 'prompts', 'image_prompt.txt'))
  prompt = image_prompt_template.gsub('[TOPIC]', topic)

  begin
    response =
      OpenAI::Client.new.images.generate(
        parameters: {
          model: 'dall-e-3',
          prompt: prompt,
          size: '1792x1024',
          quality: 'standard',
          n: 1,
          response_format: 'b64_json',
        },
      )

    # Save the image
    image_data = Base64.decode64(response.dig('data', 0, 'b64_json'))
    image_path = File.join(SOURCE_DIR, "#{slug}.webp")
    File.binwrite(image_path, image_data)
    puts '✓ Cover image generated successfully'
    image_path
  rescue StandardError => e
    puts "Error generating image: #{e.message}"
    nil
  end
end

def move_files
  # Ensure source directory exists
  unless Dir.exist?(SOURCE_DIR)
    puts "Error: Source directory '#{SOURCE_DIR}' does not exist."
    exit 1
  end

  # Ensure destination directories exist
  [BLOG_DEST_DIR, IMAGE_DEST_DIR].each do |dir|
    unless Dir.exist?(dir)
      puts "Error: Destination directory '#{dir}' does not exist."
      puts 'Please ensure the lingu_africa repository is cloned at the correct location.'
      exit 1
    end
  end

  # Find all MDX files and images in source directory
  mdx_files = Dir.glob(File.join(SOURCE_DIR, '*.mdx'))
  image_files = Dir.glob(File.join(SOURCE_DIR, '*.{webp,png}'))

  puts "\nFound #{mdx_files.length} blog posts and #{image_files.length} images to process."

  # Process blog posts
  unless mdx_files.empty?
    puts "\nProcessing blog posts:"
    mdx_files.each do |source_file|
      filename = File.basename(source_file)
      puts "\nMoving blog post '#{filename}'..."

      # Move blog post
      blog_dest_file = File.join(BLOG_DEST_DIR, filename)
      if File.exist?(blog_dest_file)
        puts '  Warning: Blog post already exists in destination. Backing up existing file...'
        backup_file = "#{blog_dest_file}.backup"
        FileUtils.mv(blog_dest_file, backup_file)
        puts "  ✓ Existing blog post backed up to '#{File.basename(backup_file)}'"
      end

      begin
        FileUtils.mv(source_file, blog_dest_file)
        puts '  ✓ Blog post moved successfully'
      rescue StandardError => e
        puts "  Error moving blog post: #{e.message}"

        # Restore backup if it exists
        if File.exist?("#{blog_dest_file}.backup")
          FileUtils.mv("#{blog_dest_file}.backup", blog_dest_file)
          puts '  ✓ Restored backup file'
        end
      end
    end
  end

  # Process images
  unless image_files.empty?
    puts "\nProcessing images:"
    image_files.each do |source_file|
      filename = File.basename(source_file)
      puts "\nMoving image '#{filename}'..."

      image_dest_file = File.join(IMAGE_DEST_DIR, filename)
      if File.exist?(image_dest_file)
        puts '  Warning: Image already exists in destination. Backing up existing file...'
        backup_file = "#{image_dest_file}.backup"
        FileUtils.mv(image_dest_file, backup_file)
        puts "  ✓ Existing image backed up to '#{File.basename(backup_file)}'"
      end

      begin
        FileUtils.mv(source_file, image_dest_file)
        puts '  ✓ Image moved successfully'
      rescue StandardError => e
        puts "  Error moving image: #{e.message}"

        # Restore backup if it exists
        if File.exist?("#{image_dest_file}.backup")
          FileUtils.mv("#{image_dest_file}.backup", image_dest_file)
          puts '  ✓ Restored backup file'
        end
      end
    end
  end

  puts "\n✓ All files processed successfully"
  puts "  - #{mdx_files.length} blog posts moved"
  puts "  - #{image_files.length} images moved"
end

# Execute the script
move_files
