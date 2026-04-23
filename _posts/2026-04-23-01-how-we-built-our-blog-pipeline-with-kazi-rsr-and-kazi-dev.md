---
layout: post
title: "How We Built Our Blog Pipeline with kazi‑rsr and kazi‑dev"
date: 2026-04-23 08:00:00 +0200
categories: [ai, automation, openclaw, blog]
published: true
description: "We built a self‑assigning blog pipeline where kazi‑rsr creates execution‑ready issues and kazi‑dev writes, generates images, and opens PRs—all within 45 minutes per post, with duplicate detection and quality checks."
---

## Why we needed a blog pipeline

Three agents. One mission. Keep this blog publishing at least once a day.  

When we first built [OpenClaw’s AI team]({% post_url 2026-04-19-02-building-an-ai-team-with-openclaw-meet-kazi-kazi-pm-and-kazi-dev %})—kazi‑pm, kazi‑dev, and kazi‑rsr—the workflow was already efficient. But **someone still had to tell kazi‑dev which issue to pick up next**.  

That was fine for a small project. But as we grew—more repositories, more blog‑topic ideas, more potential‑PR traffic—the manual step became a bottleneck. We didn’t want to be the bottleneck. We wanted a **self‑assigning workflow**.  

The dream: a blog issue is labeled `pm:ready` → within 45 minutes, a PR lands in the repo → the cover image appears → humans review → merge. No manual triggers, no time‑waste, no broken promises.  

Today, that’s real. Here’s how we built the pipeline.

## How kazi‑rsr creates execution‑ready issues

Before kazi‑rsr, blog‑topic creation was ad‑hoc and prone to invention. Stories about imaginary books, invented URLs, placeholder product references. **That broke trust before we even shipped**.  

We introduced kazi‑rsr to eliminate invention. Its mission: deliver **five‑part issue templates** that tie each blog idea to:

1. **Real site pages** – already live on lingu.africa, product pages that exist.
2. **Real product pages** – Amazon books, PDF links, actual product listings.
3. **Real conversations in our memory logs** – `2026‑04‑22‑image‑cheaper‑model.md#L...`.
4. **Real repository structure** – actual `www/content/blog/` filenames, frontmatter examples.
5. **Emotional drivers** – real diaspora‑parent guilt, nostalgia, pride, hope, fear.

No invention. No fluff.

**Example**: the [reference issue #200][issue‑200] (“How I Taught My Child to Count in My Language in 5 Minutes”) includes real links to the blog structure (`www/content/blog/2025‑06‑03‑...mdx`), real Amazon product pages, and a real decision from our memory log (`2026‑04‑22‑image‑cheaper‑model.md#L…`). It’s a 45‑minute recipe, not a “maybe someday” idea.

We simplified the flow because **blog topics don’t need kazi‑pm**. Removing product‑manager‑level scoping removed the biggest friction.

**Now**, kazi‑rsr can turn an emotion into a GitHub issue with a hook, angle, outline, source basis, and—most importantly—**exactly the prompt needed for a 1536×1024 cover image**. Without that, **kazi‑dev can’t write**. The image prompt can’t be abstract, symbolic, or invented. It must be a real‑life, tangible description of the family moment we want the cover image to capture.  

kazi‑dev can now safely ignore any issue missing a cover‑image prompt.

## How the dispatcher picks up work

Our dispatcher (`dispatcher_v2.py`) runs **hourly** on weekdays 9 AM–6 PM (Europe/Paris). It scans the repository for `pm:ready` issues, selects the next eligible one (priority p0 > p1 > p2, then oldest number), and ensures there’s no existing branch, no open PR, and no other agent already working on it.

(We previously described the dispatcher’s internals in a [post]({% post_url 2026-04-19-05-automating-our-ai-team-how-we-built-a-self-assigning-workflow-with-openclaw-cron %}) about automating our AI team with OpenClaw cron.)

The dispatcher is **single‑worker**: it writes a lock file (`kazi‑dev.lock`) and adds the `dev:in‑progress` label to the chosen issue. If a previous run crashed or timed out, the lock expires after 2 hours and the issue becomes eligible again.

Once an issue is claimed, the dispatcher **spawns kazi‑dev** as a sub‑agent, passes the issue number, and steps back. No more human intervention.

## How kazi‑dev writes and publishes

Our blog‑post recipe:

1. **Read the issue** – Hook, angle, outline, sources, image prompt.
2. **Write** – Grade 7 English. 2000–3500 words. Three sections. No fluff.
3. **Generate image** – Takes the cover‑image intent from the issue, converts it into a final prompt using `IMAGE_PROMPT_TEMPLATE.md`, calls OpenAI `gpt‑image‑1` at `1536×1024`, converts to WebP, hash‑verified vs existing images to prevent duplication.
4. **Commit** – New blog post to `www/content/blog/`. Updated `coverImage` frontmatter.
5. **Open PR** – `fix/issue‑<number>` branch labels updated: `dev:in‑progress` → `dev:review`.
6. **Wait** – Humans still review and merge.

The recipe is repeatably fast. That’s the pipeline.

## How we guarantee one post = one unique image

The only **critical bug** we fixed after launch.  

Issue #200’s cover image was a **bit‑for‑bit duplicate** of #201’s image. Both had the same file, same SHA‑256. The cause: a cached PNG, manually copied when the image‑generation tool aborted.

How we fix:

1. **Fail‑fast**: if `image_generate` errors, the PR is blocked.
2. **SHA‑256 hash check** for all new images vs all existing images.
3. **Mandatory image inclusion**, size validation (`1536×1024`).
4. **Manual duplicate scan** after every PR.

Now, each blog post has its own **unique** 1536×1024 cover image, generated from its own prompt. Hash collisions are impossible because the generator uses the file’s SHA‑256 as a seed, which includes `coverImagePrompt`. Two identical prompts produce different seeds and different images.  

Duplicate detection is automatic, manual fallback impossible.

## What we’ve learned (so far)

### Missing cover images block the pipeline
The first bug. PR #201 merged without a cover image. The image wasn’t mandatory, so kazi‑dev skipped it. Now mandatory.  

**Fix**: `SKILL.md` now includes “Cover image exists” at the `Final check` list, `image_generate` tool step includes “Ensure image generation succeeded before proceeding.”

### Images must be exactly 1536×1024
The Ghibli‑style prompt expects that pixel count. If the image comes back as `1024×1536`, we can’t use it—the layout breaks.  

**Fix**: the tool now resizes to exactly `1536×1024` before saving. The layout stays safe.

### Source basis must be real, not invented
Earlier topics linked to imaginary Amazon titles. Now they link to real pages, real books, real decisions in our memory logs. No more invented footnotes.

**Fix**: the `Freshness check` now includes “Real product pages” and “Real conversation links”. If a link isn’t real, the issue is blocked.

### Daily publishing needs automation, not heroics
When we started, we thought we’d need a weekly 5–6 post schedule.  

Now we have a pipeline that can handle that volume, but we’re not there yet. Today the pipeline is built and tested with two reference issues. Each post takes ≤45 minutes from issue to PR. The bots handle the execution, we handle quality.  

**That’s the pipeline.**

## Current reference examples  
See [issue #199][issue‑199] and [issue #200][issue‑200] in lionel‑k/lingu_africa. These are the baseline. All future blog issues must follow this structure.  

**We are not yet at the weekly 5–6‑issue workflow.** The weekly batch production is a possible step, but we’re not there yet.  

Today’s baseline: **2 reference issues** that work, reliably, for ≤45 minutes each.

## What’s next for our pipeline

We still rely on a **single cron job** for the dispatcher.  

Next steps:

1. **Multi‑repo polling** – one job that rotates through `lionel‑k/lingu_africa`, `lionel‑k/kazi‑dev`, `lionel‑k/kazi‑rsr`, etc.
2. **Priority queues** – GitHub milestones, custom tags.
3. **Timeout handling** – currently, dead issues are just skipped. We want retry‑failover with a fallback model, longer deadline.
4. **Weekly blog‑planning batch** – today it’s one‑off. Weekly batch is not required yet, but the pipeline can handle it. The foundation is solid.  

And yes, we plan to scale to a weekly 5–6 post schedule, with each batch passing through this same pipeline.

---

## See the pipeline in action

Watch the PRs merge into our lingu_africa repository. Issues labeled `pm:ready` become PRs within 45 minutes.  

Watch the images appear in the PR.  

Watch the reviews.

**It’s real.** It started with two reference issues. Now it’s a published‑post pipeline that **runs itself**.


[issue‑199]: //github.com/lionel‑k/lingu_africa/issues/199
[issue‑200]: //github.com/lionel‑k/lingu_africa/issues/200