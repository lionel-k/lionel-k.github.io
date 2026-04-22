---
layout: post
title: "Extending our open‑source agent automation to multiple repositories"
date: 2026-04-21 08:00:00 +0200
categories: [openclaw, ai, automation, github, agents, multi‑repo]
description: "How we extended our AI‑agent automation from one repository to two, with workspace isolation, global locking, and priority‑based dispatch—keeping the system simple and reliable."
---

This week, we expanded the reach of our AI‑agent team beyond a single repository. What started as an automation experiment for `lionel‑k.github.io` now runs across two separate repos, each with its own workspace, routing rules, and priority queue.

## 1. Why a second repo was added – real need: Lingu.Africa site and blog

Our flagship project **Lingu.Africa** needed a dedicated blog site [lingu.africa](https://lingu.africa) alongside the **personal branding site** [lionel.kubwimana.me](https://lionel.kubwimana.me). Instead of building a monolithic platform, we extended the existing dispatcher to operate on two independent repositories, ensuring:

- **Workspace isolation** – each project owns its own working directory, preventing accidental file overlap.
- **Repository‑aware labeling** – every issue, branch, and commit attaches the correct repository slug.
- **Global lock across repos** – a single `kazi‑dev` agent handles work in serial order, with a **priority‑then‑oldest** tie‑break to guarantee fair processing.

The config is expressed in a single file, `automation/repos.json`:

```json
[
  {
    "slug": "lionel‑k/lionel‑k.github.io",
    "installation_id": INSTALLATION_ID,
    "workspace_path": "/data/.openclaw/workspace/lionel‑k.github.io",
    "repository_url": "https://github.com/lionel‑k/lionel‑k.github.io"
  },
  {
    "slug": "lionel‑k/lingu_africa",
    "installation_id": INSTALLATION_ID,
    "workspace_path": "/data/.openclaw/workspace/lingu_africa",
    "repository_url": "https://github.com/lionel‑k/lingu_africa"
  }
]
```

## 2. What changed in the automation – dispatcher loading repos.json, repo‑aware label/branch operations, spawn‑line fix

`dispatcher_v2.py` (covered in our earlier post about [automating our AI team with OpenClaw Cron]({% post_url 2026-04-19-05-automating-our-ai-team-how-we-built-a-self-assigning-workflow-with-openclaw-cron %})) became **repo‑aware**, loading the repository list at startup:

```python
def load_repos():
    """Load repository list from repos.json."""
    global REPOS
    repos_path = os.path.join(os.path.dirname(__file__), 'repos.json')
    try:
        with open(repos_path, 'r') as f:
            REPOS = json.load(f)
        log_info(f"Loaded {len(REPOS)} repos from {repos_path}")
    except Exception as e:
        log_error(f"Failed to load repos.json: {e}")
        # fallback to hardcoded default
        REPOS = […]
```

The dispatcher now:

- **Switches workspaces** before each operation (`os.chdir(repo_info['workspace_path'])`).
- **Embeds the repository slug** on every generated branch (`issue‑{number}` → `<slug>/issue‑{number}`).
- **Routes labeling and spawning logic** based on the issue’s repository affiliation.
- **Guarantees atomic hand‑over** across both repos with a global lock.

This ensures no two tasks run in parallel across the repos, maintaining a **predictable token burn rate** and **avoiding race conditions**.

## 3. How repo routing and workspace isolation work – each repo has its own workspace path, explicit routing rules

Each repository entry in `repos.json` includes:

- `slug` → GitHub `owner/repo` identifier
- `installation_id` → required for GitHub App API token scoping
- `workspace_path` → absolute local path where the repository is cloned
- `repository_url` → HTTPS URL for cloning

When the dispatcher starts:

1. `load_repos()` reads the config, resulting in `REPOS = […]`.
2. A **global lock** (`/data/.openclaw/workspace/automation/kazi‑dev.lock`) ensures at most one agent instance is active across both repos.
3. The dispatcher iterates over `REPOS`, **checking for `pm:ready` issues** in each repository, **evaluating priority**, and **selecting the oldest issue** when priority matches.

Workspace isolation is achieved by simply **changing directories** before spawning the `kazi‑dev` agent:

```python
workspace_path = repo_info['workspace_path']
if os.path.exists(workspace_path):
    os.chdir(workspace_path)
    log_info(f"Now working in {workspace_path}")
```

This directory switch guarantees that any shell commands executed by the agent (git push, branch creation, label operations) are **relative to the correct repository**.

## 4. How the dispatcher now supports both repos – single active kazi‑dev, global lock across repos, priority‑then‑oldest tie‑break

The dispatcher implements a **conservative concurrency scheme**:

1. **A single active `kazi‑dev` agent** runs across all repositories, acquired via a lock file.
2. **Priority ranking**: `p0` issues are processed before `p1`,`p1` before `p2`.
3. **Tie‑break**: among issues with the same priority, the **oldest issue** (by creation date) is chosen.
4. **Serial processing**: only one issue is processed at a time per repository.

This global lock ensures that even if the system picks one `pm:ready` issue from the personal site and another from the project blog, they will be executed **serially**, maintaining a single point of control.

As the logs from today show:

```plaintext
[INFO] ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
[INFO] Loading repo list…
[INFO] Loaded 2 repos from /data/.openclaw/workspace/automation/repos.json
[INFO] Scanning 'lionel‑k/lionel‑k.github.io'
            issues with pm‑ready label: #37
[INFO] Scanning 'lionel‑k/lingu_africa'
            issues with pm‑ready label: #195
[INFO] ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
[INFO] Final selection: lionel‑k/lionel‑k.github.io #37 priority = p2
```

The dispatcher **scans both repositories**, identifies the ready issues, applies the priority‑then‑oldest rule, selects one, and spawns `kazi‑dev` with the correct repository context.

## 5. Why this matters for a real multi‑project agent setup – steady serial throughput, no parallelism, controlled token burn rate

In an automated‑agent system, **predictable concurrency** is more important than maximum throughput. Our design guarantees:

1. **Steady serial processing** – no two tasks run at the same time, eliminating inter‑repository conflict and race risks.
2. **Controlled token burn** – by limiting concurrent activity, we stay well within the API rate‑limits of GitHub, OpenRouter, and other services.
3. **Simple rollout** – adding a new repository to `repos.json` automatically brings it into the shared priority‑queue system, with clear precedence and zero config changes elsewhere.

The **single active agent per repository type** model matches how Lionel’s AI‑agent team actually works: it’s okay to wait a bit longer if the work is done **correctly, reliably, and without collisions**.

## Wrapping up – from one repo to many, sustainably

What started as a **single‑repo dispatcher** is now a **multi‑repo orchestrator** that:

- **Scans multiple repositories** from a single config file,
- **Picks the globally highest‑priority job** while respecting per‑repo workspace isolation,
- **Maintains a global lock** to ensure serial task processing,
- **Routes each job to the correct repository’s workspace**.

The changes we made today are **real, tested, and already running** – extending our agent automation to multiple repos wasn’t hypothetical; it was necessary and done.
