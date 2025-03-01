require 'ruby/openai'

module OpenAIClient
  def self.client
    @client ||= OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])
  end

  def self.generate_content(prompt, system_content, model: 'gpt-4', temperature: 0.7, max_tokens: 8000)
    client.chat(
      parameters: {
        model: model,
        messages: [
          { role: 'system', content: system_content },
          { role: 'user', content: prompt }
        ],
        temperature: temperature,
        max_tokens: max_tokens,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      }
    )
  end

  def self.extract_content(response)
    content = response.dig('choices', 0, 'message', 'content')
    if content.nil? || content.empty?
      puts 'Error: Failed to generate content from OpenAI.'
      return nil
    end
    content.strip
  end
end
