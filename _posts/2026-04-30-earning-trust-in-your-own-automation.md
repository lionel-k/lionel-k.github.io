---
layout: "post"
title: "Earning trust in your own automation"
date: "2026-04-30"
categories: ["automation", "productivity"]
published: true
description: "How to move from a pile of one-off scripts to a reliable system you can actually trust—and the small habits that keep it that way."
---

## 1. The silent creep: how one-off scripts accumulate while debugging

It starts innocently enough. You're debugging a weird API flake, and you need to see the raw response. You write a three‑line Python script that dumps the JSON to a file. It works. You add a second script to compare two runs. Then a third to clean up old test data. By the end of the week, your `~/tmp/` directory holds a dozen scripts, each named something like `check_thing.py`, `fix_that.py`, `why_is_this_failing.py`.

These scripts are not part of your project. They're not version‑controlled. They're not documented. But they hold tribal knowledge about your system—knowledge that evaporates the moment you delete them. Worse, they become de‑facto tools. When the same issue surfaces three months later, you reach for `check_thing.py` again, only to find it expects a different environment, uses a deprecated library, or just silently does the wrong thing.

This is the silent creep of automation debt. Each script is a tiny, undocumented promise: “I will work next time.” But without a clear home, a clear owner, or a clear contract, that promise is broken more often than it's kept. The cost isn't just the time you spend rewriting the same logic; it's the erosion of trust. You begin to doubt your own tools, and that doubt spills over into the whole system.

## 2. The fragile cron: when “ship it” flows start to feel risky

Once you decide to formalize a script—maybe you schedule it with cron, or hook it into a CI step—the stakes rise. Now the script runs when you're not watching. If it fails, it might break something real: a missed notification, a stale database, a deployment that never happens.

You add a few guards: `set -e`, a log file, an email on error. But soon the script grows. It needs credentials, API tokens, environment variables. It has to handle network timeouts, rate limits, partial failures. The original ten‑line helper balloons into a hundred‑line monolith, and you’re spending more time maintaining the “automation” than you would have spent doing the task manually.

The fragility shows up in subtle ways. The cron job works for six months, then silently stops because a library changed its return format. The CI step passes green but actually does nothing because a conditional branch is always false. You start to feel a low‑grade anxiety every time you see the job run. You’ve built a machine you don’t fully understand, and you’re afraid to touch it.

## 3. The boring fix: one clear place for GitHub mutations and guardrails that fail obviously

The way out isn't a fancy new framework or a rewrite. It's a boring, deliberate consolidation: pick one place where automation lives, and make that place impossible to ignore.

For GitHub‑centric workflows, that place might be a single directory—call it `automation/`—that holds every script that talks to the API, every cron entry point, every label‑changer, every PR‑opener. Each script is a module in a small, documented Python package. The package has a `README.md` that explains the invariants: “All mutations go through `gh.py`,” “All state changes are logged,” “All errors print a human‑readable message and exit non‑zero.”

The guardrails are equally boring. Instead of trying to handle every possible failure gracefully, you design the automation to fail obviously. If a token is missing, the script prints “ERROR: Missing GITHUB_TOKEN” and exits with code 1. If an API call returns an unexpected status, it prints the response body and stops. If a required file is missing, it doesn't default to an empty list—it screams.

This obvious failure is a feature. It turns hidden bugs into visible, actionable alerts. It also makes the automation predictable: you know exactly what will happen when something goes wrong, because you've seen the same error pattern a dozen times. That predictability builds trust.

## 4. Small habits that build trust—where scratch files live and how commits stay reviewable

Trust isn't built in a day. It's the sum of small, repeatable habits that keep the system clean and your own mental model accurate.

**Scratch files get a home.** Instead of scattering one‑off scripts across `~/tmp/`, keep a single `scratch/` directory inside the project (or inside your workspace). Every file there is considered temporary, but it's still version‑controlled. When you finish debugging, you either delete the scratch file, turn it into a proper test, or move it into `automation/`. The rule is simple: if it's worth keeping for more than a day, it lives in the repository.

**Commits stay reviewable.** When automation makes a change—a new label, a closed issue, a pushed branch—it does so through a script that produces a clear, human‑readable diff. The script writes a commit message that explains what changed and why. That commit goes into a well‑named branch (`issue‑123`) and is pushed immediately. The result is a PR that looks exactly like a human‑authored change, ready for review.

**Logs are for humans.** Every script writes a brief, plain‑English log line for each significant step: “Fetching issue #65,” “Updating label from ‘pm:ready’ to ‘dev:in‑progress’,” “Pushing branch ‘issue‑65’.” No JSON blobs, no stack traces unless something is truly broken. The logs go to stdout, so you can watch them in real time, and they're captured by cron or CI for later inspection.

**You treat your own automation as a first‑class user.** You wouldn't ship a UI that crashes silently; don't ship a script that does the same. Write the error messages you'd want to read. Document the assumptions you'll forget. Keep the code simple enough that you can understand it at 3 a.m. after six months away.

---

Trust in automation isn't about perfection. It's about visibility, predictability, and the confidence that when something breaks, you'll know—and you'll know how to fix it. Start with one clear place, fail obviously, and practice the small habits that keep the system honest. The pile of one‑off scripts will shrink, the cron jobs will feel less scary, and you'll stop holding your breath every time the automation runs.
