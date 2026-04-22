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
  website_id: "PERSONAL_WEBSITE_ID"  # Replace with actual website ID from Umami dashboard
  host_url: "https://analytics.lingu.africa"
```

The website ID is specific to the personal website property in Umami. To get the ID:

1. Log into the Umami dashboard at https://analytics.lingu.africa
2. Navigate to the personal website property
3. Copy the website ID from the property settings
4. Update `_config.yml` with the correct ID

### Environment Variables (Optional)

For local development or different environments, you can override the configuration via environment variables:

- `UMAMI_WEBSITE_ID`: Overrides `site.umami.website_id`
- `UMAMI_HOST_URL`: Overrides `site.umami.host_url`

These can be set in GitHub Pages as repository secrets for production builds.

### Verification

- The script uses the `defer` attribute for non‑blocking loading.
- It only loads when `jekyll.environment == 'production'` and `site.umami.website_id` is set.
- To verify tracking, check the Umami dashboard for pageview events.

## License

MIT