require 'net/http'
require 'json'
require 'base64'
require 'open-uri'
require 'csv'
require 'dotenv'
require 'mini_magick'
require_relative 'utils'
require 'pry'

module ImageGenerator
  class Generator
    def initialize(openai_client = nil)
      @openai_client = openai_client
      Dotenv.load(File.join(__dir__, '..', '..', '.env'))
    end

    def generate_for_blog(blog_id)
      blog_post = find_blog_post(blog_id)
      return nil unless blog_post

      prompt = generate_prompt(blog_post['topic'])
      result = generate(prompt)

      result[:slug] = Utils.slugify(blog_post['topic']) if result

      result
    end

    def generate(prompt, options = {})
      model = options[:model]&.downcase || ENV['IMAGE_MODEL']&.downcase || 'flux'
      width = options[:width] || 1280
      height = options[:height] || 736

      begin
        case model
        when 'dalle', 'dall-e'
          generate_dalle_image(prompt, width, height)
        else
          generate_flux_image(prompt, width, height)
        end
      rescue StandardError => e
        puts "Error generating image with #{model}: #{e.message}"
        nil
      end
    end

    private

    def find_blog_post(blog_id)
      csv_path = File.join(__dir__, '..', 'data', 'blog_topics.csv')
      blog_posts = CSV.read(csv_path, headers: true)
      blog_post = blog_posts.find { |post| post['id'] == blog_id.to_s }

      if blog_post.nil?
        puts "Error: Blog post with ID #{blog_id} not found."
        return nil
      end

      blog_post
    end

    def generate_prompt(topic)
      prompt_template = File.read(File.join(__dir__, '..', 'prompts', 'image_prompt.txt'))
      prompt_template.gsub('[TOPIC]', topic)
    end

    def generate_flux_image(prompt, width, height)
      url = URI('https://api.us1.bfl.ai/v1/flux-pro-1.1')
      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true

      request = Net::HTTP::Post.new(url)
      request['Content-Type'] = 'application/json'
      request['X-Key'] = ENV['BLACK_FOREST_LABS_API_KEY']

      request.body = {
        prompt: prompt,
        width: width,
        height: height,
        prompt_upsampling: false,
        seed: rand(1..999_999),
        safety_tolerance: 2,
        output_format: 'png',
      }.to_json

      response = http.request(request)
      result = JSON.parse(response.body)
      polling_url = result['polling_url']

      return puts('No polling URL received') unless polling_url

      5.times do |i|
        sleep(5) # Wait 5 seconds between checks
        puts "Checking image status... (#{i + 1}/5)"

        poll_result = JSON.parse(URI.open(polling_url).read)
        if image_url = poll_result.dig('result', 'sample')
          # Download PNG image
          png_data = URI.open(image_url).read

          # Convert PNG to WebP using ImageMagick
          image = MiniMagick::Image.read(png_data)
          webp_data = StringIO.new
          image.format 'webp'
          image.write(webp_data)

          return { data: webp_data.string, format: 'webp', original: { data: png_data, format: 'png' } }
        end
      end

      puts 'Image generation timed out'
      nil
    rescue => e
      puts "Error: #{e.message}"
      nil
    end

    def generate_dalle_image(prompt, width, height)
      raise 'OpenAI client not initialized' unless @openai_client

      response =
        @openai_client.images.generate(
          parameters: {
            model: 'dall-e-3',
            prompt: prompt,
            size: "#{width}x#{height}",
            quality: 'standard',
            n: 1,
            response_format: 'b64_json',
          },
        )

      if base64_data = response.dig('data', 0, 'b64_json')
        { data: Base64.decode64(base64_data), format: 'webp' }
      else
        puts 'No image data received from DALL-E API'
        nil
      end
    rescue => e
      puts "Error with DALL-E API: #{e.message}"
      nil
    end
  end

  # Convenience method to create and use a generator instance
  def self.generate_for_blog(blog_id, options = {})
    Generator.new(options[:openai_client]).generate_for_blog(blog_id)
  end

  def self.generate(prompt, options = {})
    Generator.new(options[:openai_client]).generate(prompt, options)
  end
end
