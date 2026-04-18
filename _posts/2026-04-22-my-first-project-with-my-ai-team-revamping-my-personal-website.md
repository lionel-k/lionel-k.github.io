---
layout: post
title: "My First Project with My AI Team: Revamping My Personal Website"
date: 2026-04-22 08:00:00 +0200
categories: [ai, openclaw, workflow]
---

Why start with a personal website? It’s a live project that showcases workflow, branding, and technical stack—low risk, high visibility. It also gave my newly formed AI team a concrete, self‑contained goal to collaborate on.

## Meet the AI team

- **Kazi** – the orchestrator that routes requests and keeps the overall workflow moving.
- **kazi‑pm** – the product manager that breaks down projects into issues, writes clear specs, and sets priorities.
- **kazi‑dev** – the engineer that implements features, writes code, and opens pull requests.

Together they form a lightweight, role‑based team that mirrors how human software teams operate.

## The workflow in action

Here’s how we used the team step‑by‑step:

1. **kazi‑pm creates issues** – Every piece of work starts with a GitHub issue that includes a clear goal, acceptance criteria, and any relevant context. For example, the issue for the hero section ([#7](https://github.com/lionel-k/lionel-k.github.io/issues/7)) described exactly what was needed: a name, tagline, avatar, and social links.

2. **kazi‑dev implements** – Once an issue is labeled `pm:ready`, kazi‑dev picks it up, creates a feature branch, writes the code, and opens a pull request. The PR includes a detailed description of the changes and references the original issue.

3. **Human review and merge** – I (Lionel) review the PR, make any necessary edits using Cursor, and merge when I’m happy. This human‑in‑the‑loop step ensures quality and alignment with my personal style.

4. **Repeat** – The cycle continues with new issues, keeping momentum and delivering incremental improvements.

## Examples of work delivered

In just a few days the team has already shipped several tangible improvements:

- **[Setup Jekyll for GitHub Pages](https://github.com/lionel-k/lionel-k.github.io/pull/9)** – Replaced the deprecated `github‑pages` gem, added missing Ruby 3.4+ standard‑library gems, and got the site building cleanly with Jekyll 4.x.

- **[Implement hero section and LinkedIn link](https://github.com/lionel-k/lionel-k.github.io/pull/14)** – Added a responsive hero section with a tagline, placeholder avatar, and LinkedIn social link, fulfilling all the acceptance criteria from issue #7.

- **[Add avatar](https://github.com/lionel-k/lionel-k.github.io/pull/16)** – Replaced the placeholder avatar with a real image and cleaned up unused files.

- **Clean professional styling with design tokens** – Introduced CSS custom properties for colors, spacing, and typography, making the site’s visual design more consistent and easier to maintain.

Each of these PRs was created by kazi‑dev, reviewed by me, and merged after any tweaks. The process feels remarkably similar to working with a human developer—just faster and available around the clock.

## What works well

- **Clear role separation** – PM defines what to build, dev builds it, human reviews and merges. No confusion about who does what.

- **Iterative, human‑in‑the‑loop process** – The AI team handles the heavy lifting of implementation, but I stay in the driver’s seat for creative and quality decisions.

- **GitHub as the collaboration hub** – Issues, PRs, and commits create a transparent paper trail that’s easy to follow and reference.

- **Low‑friction tooling** – OpenClaw’s integration with GitHub (via installation tokens) means the AI team can push branches, create PRs, and comment on issues without manual authentication steps.

## What we’re learning

- **Balancing autonomy vs. oversight** – We started with very detailed issue specs, but as the team gains context we can give them more leeway.

- **Ensuring acceptance criteria are clear** – Vague criteria lead to PRs that miss the mark; precise, testable criteria keep everyone aligned.

- **Adapting the workflow** – We’ve already adjusted label conventions, PR templates, and review patterns based on what works best for this project.

## Next steps

This first project has validated the basic workflow and built confidence that an AI team can contribute meaningfully to a real‑world codebase. Now we’re ready to apply the same model to more complex projects:

- **Lingu.Africa** – Bringing the AI team into my main product, where they’ll help with feature development, bug fixes, and documentation.

- **More automation** – Exploring how much of the review and merge process can be safely automated while preserving quality.

- **Expanding the team** – Adding specialized agents for design, testing, and deployment as the need arises.

## Wrapping up

Revamping my personal website with an AI team wasn’t just about getting a nicer website—it was a live experiment in human‑AI collaboration. The results are already live at [lionel‑k.github.io](https://lionel‑k.github.io), and the workflow we’ve established is ready for bigger challenges.

If you’re curious about applying AI agents to your own projects, I encourage you to start with something small and concrete. The personal website is a perfect first project: it’s visible, low‑risk, and gives you a chance to refine your collaboration model before tackling mission‑critical work.

*Thanks to kazi‑pm and kazi‑dev for their contributions to this post—and to the website itself.*