---
layout: post
title: "My First Project with My AI Team: Revamping My Personal Website"
date: 2026-04-22 08:00:00 +0200
categories: [ai, openclaw, collaboration]
---

## Why start with a personal website?

When I decided to build my first real-world project with my AI team, I wanted something that would be both visible and low-risk. A personal website is the perfect candidate: it’s a live project that showcases workflow, branding, and technical stack, but it’s also forgiving enough to allow experimentation. More importantly, it would let me test the entire AI‑collaboration pipeline—from planning to implementation to review—on a tangible output that I (and anyone else) could actually visit.

That’s how **lionel-k.github.io** became the inaugural project for my AI team.

## Meet the AI team

Before diving into the workflow, a quick introduction to the cast:

- **Kazi** – the orchestrator. Kazi is the main agent that coordinates the overall conversation, decides when to delegate, and keeps the big picture in view.
- **kazi-pm** – the product manager. This agent is responsible for breaking down goals into concrete issues, writing clear specs, setting priorities, and ensuring the work aligns with the project’s vision.
- **kazi-dev** – the engineer. kazi-dev implements the actual code changes, creates branches, writes commit messages, opens PRs, and follows the technical standards defined in the workspace.

Each agent has a distinct personality and role, defined in files like `AGENTS.md` and `SOUL.md`. This separation of concerns is crucial; it mimics how a human team would operate and prevents any single agent from trying to do everything at once.

## The workflow in action

Here’s the step‑by‑step flow we used to revamp the website:

1. **kazi-pm creates issues with clear specs and priorities**  
   The product manager analyzes the goal (“revamp the personal website”) and writes GitHub issues that describe what needs to be done, why it matters, and what “done” looks like. For example, issue [#8](https://github.com/lionel-k/lionel-k.github.io/issues/8) asked for a clean, professional styling system with design tokens and theme support.

2. **kazi-dev implements features and opens PRs**  
   Once an issue is marked “ready for dev,” kazi-dev picks it up, creates a feature branch, writes the code, commits with a conventional commit message, and pushes the branch. **Critically, the branch must be pushed to GitHub before creating the PR**—the GitHub API requires the remote branch to exist. kazi-dev then opens a pull request with a clear title, a detailed body, and references the original issue.

3. **Human (me) reviews the PR, makes edits using Cursor, merges when happy**  
   This is the essential human‑in‑the‑loop step. I review every PR, check the code, test locally, and often tweak wording or adjust CSS directly in Cursor. The AI team doesn’t merge its own work; I do. This ensures quality, alignment with my personal taste, and a final sanity check before anything goes live.

## Examples of work delivered

Here are a few of the PRs that came out of this collaboration:

- **[#9 – Setup Jekyll for GitHub Pages](https://github.com/lionel-k/lionel-k.github.io/pull/9)** – The foundation. kazi‑dev configured Jekyll, set up the basic layout, and made the site deployable via GitHub Pages.
- **[#14 – Implement hero section and LinkedIn link](https://github.com/lionel-k/lionel-k.github.io/pull/14)** – Added a welcoming hero section with a clear call‑to‑action and a LinkedIn profile link.
- **[#16 – Add avatar](https://github.com/lionel-k/lionel-k.github.io/pull/16)** – Integrated my avatar into the site header, improving personal branding.
- **[#20 – Clean Professional Styling](https://github.com/lionel-k/lionel-k.github.io/pull/20)** – Introduced CSS custom properties (design tokens) for light/dark themes, improved typography and spacing, and added a manual theme toggle with JavaScript persistence.
- **[#22 – Blog Post series](https://github.com/lionel-k/lionel-k.github.io/pull/22)** – A series of four blog posts documenting the OpenClaw setup, model choices, and team‑building process. (Yes, this post is part of that series!)

Each of these PRs followed the same pattern: an issue written by kazi‑pm, a branch implemented by kazi‑dev, and a human review before merge.

## What works well

- **Clear role separation** – Having dedicated PM and dev agents prevents confusion and keeps the workflow predictable.
- **Iterative human‑in‑the‑loop process** – The AI team does the heavy lifting, but I stay in the driver’s seat. I can adjust, refine, or veto anything before it goes live.
- **GitHub as the collaboration hub** – Issues, PRs, and commits create a transparent audit trail and make it easy to track progress.
- **Conventional commits and PR hygiene** – kazi‑dev follows the commit‑message conventions and keeps PRs focused, which makes reviewing and merging straightforward.

## What we’re learning

- **Balancing autonomy vs. oversight** – How much can I trust the AI team to make design or wording decisions? We’re still calibrating that balance.
- **Ensuring acceptance criteria are clear** – Vague specs lead to rework. kazi‑pm is learning to write more precise “definition of done” criteria.
- **Adapting the workflow** – We’ve already adjusted the PR‑creation flow after hitting the “head branch must exist” API error. The process keeps evolving.

## Next steps

This first project has given us a solid proof‑of‑concept. The same workflow can now be applied to more complex, real‑world products like **Lingu.Africa**—my platform for African language learning. The website revamp was a low‑stakes sandbox; the next projects will have higher impact and more moving parts.

If you’re curious about the technical details of the AI setup, check out the earlier posts in this series: [Self‑hosting OpenClaw on a VPS]({% post_url 2026-04-22-self-hosting-openclaw-on-a-vps-a-complete-setup-guide %}), [Choosing the Right AI Model]({% post_url 2026-04-22-choosing-the-right-ai-model-why-i-switched-from-openai-to-kimi-k2.5 %}), and [Building an AI Team with OpenClaw]({% post_url 2026-04-22-building-an-ai-team-with-openclaw-meet-kazi-kazi-pm-and-kazi-dev %}).

*Have you tried working with AI agents on a live project? I’d love to hear about your experience. Reach out on [LinkedIn](https://www.linkedin.com/in/lionel-kubwimana/) or open an issue on the [repo](https://github.com/lionel-k/lionel-k.github.io).*