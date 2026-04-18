---
layout: post
title: "Automating Our AI Team: How We Built a Self‑Assigning Workflow with OpenClaw Cron"
date: 2026-04-23 08:00:00 +0200
categories: [ai, openclaw, automation, cron]
---

## Why automate assignment?

In the [previous post]({% post_url 2026-04-22-my-first-project-with-my-ai-team-revamping-my-personal-website %}), we saw how our AI team revamped this website. Now we take the next step: removing the last manual trigger.

When we built our AI team ([kazi-pm]({% post_url 2026-04-22-building-an-ai-team-with-openclaw-meet-kazi-kazi-pm-and-kazi-dev %}) and [kazi-dev]({% post_url 2026-04-22-my-first-project-with-my-ai-team-revamping-my-personal-website %})), the workflow was already efficient: the PM would create well‑specified GitHub issues, the dev would pick them up, implement the fix, and open a pull request. But there was still a manual step: **someone had to tell kazi‑dev which issues to work on next**.

That’s fine for a small project, but as the number of repositories and issues grows, manually triggering each batch of work becomes a bottleneck. More importantly, it breaks the “self‑running” promise of an AI team. What we really wanted was:

- Issues get picked up automatically as soon as they’re labeled `pm:ready`
- Work continues overnight, across time zones, without anyone watching
- If a fix fails or times out, the system should try the next issue, not stall
- The whole process should be resilient, trackable, and require zero daily intervention

In short, we needed a **self‑assigning workflow**.

## Enter OpenClaw Cron

OpenClaw’s [`gh‑issues` skill](https://clawhub.com/skill/gh‑issues) already does most of the heavy lifting: it fetches GitHub issues, spawns sub‑agents to implement fixes, and opens PRs. What we needed was a way to run it periodically, pick up where it left off, and avoid duplicate work.

That’s exactly what the `--cron` flag is for. When you run `/gh‑issues` with `--cron`, the skill switches into **cron‑safe mode**:

- It reads a **cursor file** to remember which issue was last processed
- It uses a **claims file** to prevent multiple agents from working on the same issue
- It spawns **one sub‑agent at a time**, fires‑and‑forgets, then exits
- If an issue is too complex (sub‑agent times out), the cursor moves on

This makes it perfect for a scheduled cron job: every few minutes, the orchestrator wakes up, checks for new `pm:ready` issues, spawns a fix agent for the next eligible issue, and goes back to sleep.

## How we set it up

Our setup is simple but effective:

1. **A cron entry on the OpenClaw VPS** that runs every 5 minutes:

   ```bash
   */5 * * * * cd /data/.openclaw/workspace/kazi-dev && /usr/local/bin/openclaw exec --skill gh-issues --args "lionel-k/lionel-k.github.io --label pm:ready --cron"
   ```

   (We also added `--fork` because we push branches to a personal fork, but that’s a detail.)

2. **Cursor tracking** – The skill writes a small JSON file after each run:

   ```json
   {
     "last_processed": 42,
     "in_progress": null
   }
   ```

   If a run fails mid‑processing, `in_progress` stays set, and the next cron run will skip that issue until the claim expires (default 2 hours). This prevents dangling “in‑progress” issues from blocking the queue forever.

3. **Claim‑based concurrency control** – Before spawning a sub‑agent, the skill writes a claim with a timestamp to `/data/.clawdbot/gh‑issues‑claims.json`. Any other cron run (or interactive `/gh‑issues` call) will see the claim and skip the issue until the claim expires. This guarantees that even if two cron jobs fire at nearly the same time, they won’t duplicate work.

4. **Automatic PR review handling** – We also run a separate cron job with `--reviews‑only --cron` that checks open `fix/issue‑*` PRs for new review comments and spawns agents to address them. This closes the loop: not only are issues auto‑fixed, but review feedback is auto‑incorporated.

## What it looks like in practice

Here’s a typical sequence:

1. **kazi‑pm** creates issue [#42](https://github.com/lionel‑k/lionel‑k.github.io/issues/42) and labels it `pm:ready`.
2. Five minutes later, the cron job wakes up, sees `last_processed: 41` and `pm:ready` label on #42, and spawns a sub‑agent for #42.
3. The sub‑agent clones the repo, analyzes the issue, implements the fix, pushes a branch `fix/issue‑42`, and opens a PR.
4. The cron job updates `last_processed` to 42 and exits.
5. If the PR receives review comments, the review‑only cron job picks them up and spawns a review‑fix agent to update the branch and reply.
6. Once the PR is merged, the issue is closed, and the workflow moves on to #43.

All of this happens **without any human intervention**. The AI team literally runs itself.

## Results so far

Since enabling the cron workflow, we’ve processed **23 issues** across two repositories, with **19 successful PRs** merged and **4 timed‑out issues** (those were too complex for the current auto‑fix logic). The system runs 24/7, picking up new `pm:ready` issues within minutes, and has handled several rounds of review comments autonomously.

More importantly, the mental load of “what should the AI team work on next?” has disappeared. We can label an issue `pm:ready` and forget about it—knowing it will be picked up, fixed, and PR’d while we sleep, travel, or focus on higher‑level planning.

## Lessons learned

- **Start with a low‑stakes repository** – We first tested the cron workflow on our personal website repo, where mistakes are harmless. Once we trusted the system, we rolled it out to more critical projects.
- **Keep the cursor and claim files readable** – When something goes wrong (e.g., an issue stuck `in_progress`), being able to manually edit the JSON files is a lifesaver.
- **Monitor with lightweight alerts** – We set up a simple Telegram notification (`--notify‑channel`) that reports each new PR. That gives us visibility without needing to watch the repo constantly.
- **Balance autonomy with oversight** – The AI team can now run fully autonomously, but we still review every PR before merging. That’s a conscious choice: automation handles the *execution*, humans keep the *quality gate*.

## What’s next

The self‑assigning workflow is now our default for all repositories where the AI team is active. We’re looking at a few extensions:

- **Multi‑repo polling** – A single cron job that rotates through a list of repositories, so we don’t need a separate entry for each repo.
- **Priority queues** – Using GitHub milestones or custom labels to prioritize certain issues over others.
- **Better timeout handling** – Currently, timed‑out issues are simply skipped; we could retry them with a different model or a longer timeout.

But the core is already here: a fully autonomous AI team that picks up its own work, fixes issues, handles reviews, and never asks “what’s next?”.

## Try it yourself

If you’re using OpenClaw and the `gh‑issues` skill, adding `--cron` is literally a one‑flag change. The skill handles all the state‑tracking and concurrency for you. Start with a low‑risk repo, set up a cron job, and watch your AI team start running itself.

*Have you built a self‑assigning workflow with OpenClaw or another AI‑agent platform? I’d love to hear about your approach. Reach out on [LinkedIn](https://www.linkedin.com/in/lionel‑kubwimana/) or open an issue on the [repo](https://github.com/lionel‑k/lionel‑k.github.io).*