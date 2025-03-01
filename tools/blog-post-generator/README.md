# Blog Post Generator

A Ruby-based tool to automatically generate SEO-optimized blog posts for Lingu.Africa using OpenAI's GPT-4.

## Prerequisites

- Ruby (2.7 or higher)
- OpenAI API key (set in ../.env file)

## Installation

1. Install required gems:

```bash
gem install ruby-openai dotenv csv
```

2. Ensure your OpenAI API key is set in the parent directory's `.env` file:

```
OPENAI_API_KEY=your_api_key_here
```

## Directory Structure

```
blog_post_generator/
│── prompts/
│   └── base_prompt.txt          # Base prompt template
│── blog_posts/
│   └── YYYY-MM-DD-title-slug.md # Generated blog posts
│── scripts/
│   ├── generate_blog.rb         # Main script
│   ├── prompt_generator.rb      # Converts blog details to prompt
│   ├── content_processor.rb     # Processes OpenAI response
│   └── utils.rb                 # Helper functions
│── data/
│   └── blog_topics.csv         # CSV file containing blog topics
└── README.md                   # This file
```

## Usage

1. Add your blog post details to `data/blog_topics.csv`. Each row should include:

   - id
   - topic
   - category
   - tags (comma-separated)
   - primary_keyword
   - secondary_keywords (comma-separated)
   - editorial_status
   - publish_date
   - cta_link

2. Generate a blog post by running:

```bash
cd scripts
ruby generate_blog.rb <blog_post_id>
```

For example:

```bash
ruby generate_blog.rb 1
```

This will:

- Generate a blog post using the specified template and OpenAI
- Create a markdown file in the blog_posts directory
- Update the editorial_status in the CSV file

## Output Format

Generated blog posts will be saved as markdown files with YAML frontmatter:

```yaml
---
title: "Blog Post Title"
description: "Auto-generated description"
category: "Category Name"
coverImage: "/blog/slug.webp"
author: "Lionel Kubwimana"
date: "YYYY-MM-DD"
highlights:
  - "Highlight 1"
  - "Highlight 2"
  - "Highlight 3"
tags:
  - "tag1"
  - "tag2"
readingTime: "X min read"
cta:
  text: "Start Your Language Learning Journey"
  link: "/books"
---
[Blog post content here]
```

## Features

- SEO-optimized content generation
- Automatic highlight extraction
- Reading time calculation
- Consistent formatting with YAML frontmatter
- Cover image path generation
- CSV status tracking
- Error handling and validation
