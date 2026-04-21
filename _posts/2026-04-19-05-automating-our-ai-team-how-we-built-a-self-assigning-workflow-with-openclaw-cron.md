---
layout: post
title: "Automating Our AI Team: How We Built a Self‑Assigning Workflow with OpenClaw Cron"
date: 2026-04-19 08:00:00 +0200
categories: [ai, openclaw, automation, cron]
---

## Why automate assignment?

In the [previous post]({% post_url 2026-04-19-04-my-first-project-with-my-ai-team-revamping-my-personal-website %}), we saw how our AI team revamped this website. Now we take the next step: removing the last manual trigger.

When we built our AI team ([kazi-pm]({% post_url 2026-04-19-02-building-an-ai-team-with-openclaw-meet-kazi-kazi-pm-and-kazi-dev %}) and [kazi-dev]({% post_url 2026-04-19-04-my-first-project-with-my-ai-team-revamping-my-personal-website %})), the workflow was already efficient: the PM would create well‑specified GitHub issues, the dev would pick them up, implement the fix, and open a pull request. But there was still a manual step: **someone had to tell kazi‑dev which issues to work on next**.

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
     "last_processed": 13,
     "in_progress": null
   }
   ```

   If a run fails mid‑processing, `in_progress` stays set, and the next cron run will skip that issue until the claim expires (default 2 hours). This prevents dangling “in‑progress” issues from blocking the queue forever.

3. **Claim‑based concurrency control** – Before spawning a sub‑agent, the skill writes a claim with a timestamp to `/data/.clawdbot/gh‑issues‑claims.json`. Any other cron run (or interactive `/gh‑issues` call) will see the claim and skip the issue until the claim expires. This guarantees that even if two cron jobs fire at nearly the same time, they won’t duplicate work.

4. **Automatic PR review handling** – We also run a separate cron job with `--reviews‑only --cron` that checks open `fix/issue‑*` PRs for new review comments and spawns agents to address them. This closes the loop: not only are issues auto‑fixed, but review feedback is auto‑incorporated.

## What it looks like in practice

Here’s a real sequence from this website’s repo (issue numbers are GitHub’s; branch names follow `fix/issue‑<n>` when the skill opens the PR):

1. **kazi‑pm** files issue [#7](https://github.com/lionel-k/lionel-k.github.io/issues/7) (“Landing Page with Bio”) and labels it `pm:ready`.
2. On the next cron tick, the job sees the label, claims the issue, and spawns a sub‑agent.
3. The sub‑agent implements the work and opens [PR #14](https://github.com/lionel-k/lionel-k.github.io/pull/14) (`hero-section`).
4. The skill updates `last_processed` so the queue advances; a later `pm:ready` issue (e.g. [#8](https://github.com/lionel-k/lionel-k.github.io/issues/8) → [PR #20](https://github.com/lionel-k/lionel-k.github.io/pull/20)) follows the same pattern.
5. If a PR gets review comments, the review‑only cron job can spawn a follow‑up to address them.
6. After you merge, the issue is closed and the next eligible issue can run.

Steps 1–4 can run **without anyone manually queueing work for kazi‑dev**; merging and quality review are still human decisions on our side.

## Results so far

**What we can verify from this repository alone:** the public tracker lists **13** issues and **10** pull requests merged to `main` (plus a couple of pilot or superseded PRs that did not merge). That is a small history, but it is enough to have exercised the workflow repeatedly.

Several `pm:ready` items here became merged PRs—for example [#4](https://github.com/lionel-k/lionel-k.github.io/issues/4) → [PR #9](https://github.com/lionel-k/lionel-k.github.io/pull/9), [#7](https://github.com/lionel-k/lionel-k.github.io/issues/7) → [PR #14](https://github.com/lionel-k/lionel-k.github.io/pull/14), [#8](https://github.com/lionel-k/lionel-k.github.io/issues/8) → [PR #20](https://github.com/lionel-k/lionel-k.github.io/pull/20), and [#13](https://github.com/lionel-k/lionel-k.github.io/issues/13) → [PR #17](https://github.com/lionel-k/lionel-k.github.io/pull/17). We are **not** publishing cross‑repo totals or a count of timed‑out sub‑agent runs; those earlier headline numbers were not grounded in anything readers can check on GitHub.

What has changed in practice is still real: once an issue is labeled `pm:ready`, we are no longer deciding by hand what kazi‑dev should pick up next—the cron loop does that. The mental load of “what should the AI team work on next?” is much lower, even though we still review and merge PRs ourselves.

## Lessons learned

- **Start with a low‑stakes repository** – We first tested the cron workflow on our personal website repo, where mistakes are harmless. That is still where most of the observable history lives; anything beyond that is a matter of taste and risk tolerance, not a claim we can prove from public data.
- **Keep the cursor and claim files readable** – When something goes wrong (e.g., an issue stuck `in_progress`), being able to manually edit the JSON files is a lifesaver.
- **Monitor with lightweight alerts** – We set up a simple Telegram notification (`--notify‑channel`) that reports each new PR. That gives us visibility without needing to watch the repo constantly.
- **Balance autonomy with oversight** – The AI team can now run fully autonomously, but we still review every PR before merging. That’s a conscious choice: automation handles the _execution_, humans keep the _quality gate_.

## What’s next

Where we use the AI team, this self‑assigning pattern is what we reach for first. A few extensions we have in mind:

- **Multi‑repo polling** – A single cron job that rotates through a list of repositories, so we don’t need a separate entry for each repo.
- **Priority queues** – Using GitHub milestones or custom labels to prioritize certain issues over others.
- **Better timeout handling** – Currently, timed‑out issues are simply skipped; we could retry them with a different model or a longer timeout.

But the core idea is already working on this site: the agents can pick up `pm:ready` work on a schedule; humans still merge and steer quality.

## Try it yourself

If you’re using OpenClaw and the `gh‑issues` skill, adding `--cron` is literally a one‑flag change. The skill handles all the state‑tracking and concurrency for you. Start with a low‑risk repo, set up a cron job, and watch your AI team start running itself.
