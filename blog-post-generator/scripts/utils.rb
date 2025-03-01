require 'date'
require 'fileutils'

module Utils
  # Convert a title to a URL-friendly slug
  def self.slugify(title)
    title.downcase.gsub(/[^a-z0-9\s-]/, '') # Remove special characters
      .gsub(/\s+/, '-') # Replace spaces with hyphens
      .gsub(/-+/, '-') # Remove consecutive hyphens
  end

  # Calculate reading time based on content
  def self.calculate_reading_time(content)
    words_per_minute = 200
    word_count = content.split.size
    minutes = (word_count.to_f / words_per_minute).ceil
    "#{minutes} min read"
  end

  # Generate cover image path based on slug
  def self.generate_cover_image_path(slug)
    "/images/blog/#{slug}.webp"
  end

  # Extract highlights from content (takes first sentence from each main section)
  def self.extract_highlights(content)
    sections = content.split(/\n{2,}/)
    highlights =
      sections.map do |section|
        first_sentence = section.split(/[.!?]/).first
        next if first_sentence.nil? || first_sentence.strip.empty?
        first_sentence.strip
      end.compact

    highlights.select { |h| h.length > 30 && h.length < 120 }[0..3]
  end

  # Format date for file naming
  def self.format_date(date_string)
    Date.parse(date_string).strftime('%Y-%m-%d')
  end

  # Ensure directory exists
  def self.ensure_directory(path)
    FileUtils.mkdir_p(path) unless Dir.exist?(path)
  end
end
