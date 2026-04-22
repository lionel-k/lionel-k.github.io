# lionel-k.github.io

My personal branding website and blog.

## About

This repository hosts my personal website — a simple, clean, and professional site that serves as my online presence.

## What's Inside

- **Landing Page**: An introduction to who I am and what I do
- **Blog**: Thoughts, learnings, and stories written in Markdown
- **OpenClaw Journey**: Documenting my experience building with OpenClaw

## Goals

- Keep it simple, clean, and professional
- Share knowledge and experiences through blog posts
- Document the journey of building with OpenClaw
- Create a space that reflects my work and interests

## Tech Stack

- Static site (Jekyll + GitHub Pages)
- Blog posts written in Markdown
- Minimal, professional design

## Analytics

This site uses [Umami](https://umami.is/) for privacy-friendly analytics. The tracking script is included in the `<head>` of all pages when built for production (`JEKYLL_ENV=production`).

### Configuration

Analytics settings are defined in `_config.yml`:

```yaml
umami:
  website_id: "f1519f41-6b8d-44ad-900d-bf9921c2c4eb"
  host_url: "https://analytics.lingu.africa"
```

To use a different Umami property or host, edit those values in `_config.yml`.

### Verification

- The script uses the `defer` attribute for non‑blocking loading.
- It only loads when `jekyll.environment == 'production'` and `site.umami.website_id` is set.
- To verify tracking, check the Umami dashboard for pageview events.

## License

MIT