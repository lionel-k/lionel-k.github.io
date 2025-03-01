require_relative 'utils'

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
    "Discover effective strategies and insights about #{@blog_post[:primary_keyword]}. Learn about #{@blog_post[:secondary_keywords].split(',').join(', ')} and more in this comprehensive guide."
  end
end
