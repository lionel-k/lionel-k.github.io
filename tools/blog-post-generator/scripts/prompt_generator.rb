class PromptGenerator
  def initialize(base_prompt_path)
    @base_prompt = File.read(base_prompt_path)
  end

  def generate(blog_post)
    prompt = @base_prompt.dup

    # Replace placeholders with actual values
    prompt.gsub!('[TOPIC]', blog_post[:topic])
    prompt.gsub!('[PRIMARY_KEYWORD]', blog_post[:primary_keyword])
    prompt.gsub!('[SECONDARY_KEYWORDS]', blog_post[:secondary_keywords])

    # Add category-specific guidance
    prompt << "\n\nCategory-Specific Guidelines:"
    prompt << "\nThis article falls under the '#{blog_post[:category]}' category."
    prompt << "\nEnsure the content aligns with the following tags: #{blog_post[:tags]}"

    prompt
  end
end
