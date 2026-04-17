---
layout: post
title: "Building an AI Team with OpenClaw - Meet Kazi, kazi-pm, and kazi-dev"
date: 2026-04-18 08:00:00 +0200
categories: [openclaw, ai, team, workflow]
---

As a technical founder, I've been exploring how AI agents can augment my workflow. Early on, I fell into the trap of treating a single AI assistant as a “do‑everything” Swiss Army knife. That monolithic approach quickly broke down: the agent would context‑switch between planning, coding, reviewing, and communicating, leading to muddled thinking, inconsistent decisions, and a frustrating lack of focus.

The solution? **Build a team.** Just as a human team separates roles, you can structure multiple AI agents that each have a clear purpose and well‑defined boundaries. In this post I'll walk through the real‑world setup I’ve been using: a three‑agent team powered by [OpenClaw](https://openclaw.dev), consisting of **Kazi** (the main agent), **kazi‑pm** (the product manager), and **kazi‑dev** (the engineer). I’ll show you exactly how they’re configured, how work flows between them, and what I’ve learned from running this setup day‑to‑day.

## 1. The problem with monolithic AI

When you ask a single AI agent to handle everything—from high‑level planning to low‑level implementation—you’re essentially forcing it to be a product manager, an engineer, a QA tester, and a communicator all at once. The result is predictable:

*   **Context overload:** The agent constantly juggles conflicting priorities, losing track of the original goal.
*   **Inconsistent decisions:** Without clear role boundaries, the agent might switch coding styles, violate project conventions, or make contradictory architectural choices.
*   **Poor handoffs:** There’s no natural “checkpoint” where one phase of work ends and another begins, so mistakes compound and become harder to spot.

What we need is a **separation of concerns**. Each agent should have a single, well‑defined responsibility, just like a well‑functioning human team.

## 2. The team structure

Here’s the trio I’ve settled on:

*   **Kazi** – The “main” agent. Kazi is the point of contact for me (the human) and acts as the team lead. Its job is to understand the overall request, decide whether to handle it directly or delegate, and coordinate the other two agents. Kazi owns the big picture.
*   **kazi‑pm** – The product manager. When a project needs to be broken down, scoped, or prioritized, Kazi hands it off to kazi‑pm. kazi‑pm creates clear GitHub issues, defines acceptance criteria, and sets milestones—but never writes code.
*   **kazi‑dev** – The engineer. kazi‑dev takes those well‑defined issues and implements them. It creates branches, writes code, runs tests, and opens pull requests—but doesn’t decide what to build next or change the project’s direction.

Each agent lives in its own workspace and has its own “soul” (a `SOUL.md` file) that defines its personality, boundaries, and core truths.

## 3. kazi‑pm: The Product Manager

kazi‑pm’s purpose is to **plan, not to implement**. Its workspace (`/data/.openclaw/workspace/kazi‑pm`) contains an `AGENTS.md` that spells out when to delegate:

> When to Delegate
>
> - Creating GitHub issues
> - Breaking down projects into milestones
> - Defining MVP scope
> - Prioritizing work
> - Writing acceptance criteria

Its `SOUL.md` reinforces the role:

> **Name:** kazi‑pm  
> **Role:** Product Manager  
> **Purpose:** Break projects into small useful issues, define MVP scope, prioritize work, structure milestones and execution order.

A key rule kazi‑pm follows is **never including effort estimates** (small/medium/large) in issues. As the `SOUL.md` states, “they don’t bring value to kazi‑dev and add unnecessary noise.” This keeps the focus on clarity and outcomes, not arbitrary sizing.

**When to delegate to kazi‑pm:** Whenever a request requires planning, scoping, or breaking a larger goal into discrete, actionable issues.

## 4. kazi‑dev: The Engineer

kazi‑dev’s purpose is to **implement, not to plan**. Its workspace (`/data/.openclaw/workspace/kazi‑dev`) has an `AGENTS.md` that lists:

> When to Delegate
>
> - Implementing features
> - Writing code changes
> - Creating PRs
> - Debugging technical issues
> - Testing and validation

The `SOUL.md` file is explicit about boundaries:

> **Name:** kazi‑dev  
> **Role:** Engineer  
> **Purpose:** Implement technical tasks, work on codebases, make focused changes, create branches, open small clear PRs.
>
> **Boundaries:**
> - I implement. I don't plan or prioritize.
> - I follow the plan laid out by kazi‑pm or Kazi.
> - When specs are unclear, I ask.

kazi‑dev also has a critical workflow rule: **push before PR**. Because the GitHub API requires the branch to already exist on GitHub, kazi‑dev always runs `git push` before creating a pull request via the API.

**When to delegate to kazi‑dev:** When there’s a clearly defined issue or task that requires coding, debugging, or a pull request.

## 5. The handoff patterns

Work flows through the team in two main patterns:

1.  **Main → PM → Dev** (the full chain)  
    *Example:* “I want to add a contact form to the website.”  
    - Kazi receives the request, realizes it needs to be planned, and delegates to kazi‑pm.  
    - kazi‑pm breaks the project into issues (design, backend endpoint, frontend component, tests) and creates them in GitHub with acceptance criteria.  
    - Kazi then picks the first issue and delegates it to kazi‑dev.  
    - kazi‑dev implements the issue, opens a PR, and reports back to Kazi.

2.  **Main → Dev** (direct implementation)  
    *Example:* “Update the README with the new installation steps.”  
    - Kazi sees the task is already well‑defined and hands it straight to kazi‑dev.  
    - kazi‑dev makes the change, pushes, opens a PR, and notifies Kazi.

Kazi always stays in the loop, ensuring the human (me) gets a single point of contact and a coherent summary of what’s been done.

## 6. Configuration deep‑dive

The heart of the setup is OpenClaw’s `openclaw.json` configuration file. Here’s the relevant `agents` section that defines the team:

```json
"agents": {
  "list": [
    {
      "id": "main",
      "name": "main"
    },
    {
      "id": "kazi-pm",
      "name": "kazi-pm",
      "workspace": "/data/.openclaw/workspace/kazi-pm",
      "agentDir": "/data/.openclaw/agents/kazi-pm/agent",
      "model": "openrouter/deepseek/deepseek-v3.2"
    },
    {
      "id": "kazi-dev",
      "name": "kazi-dev",
      "workspace": "/data/.openclaw/workspace/kazi-dev",
      "agentDir": "/data/.openclaw/agents/kazi-dev/agent",
      "model": "openrouter/deepseek/deepseek-v3.2"
    }
  ],
  "defaults": {
    "workspace": "/data/.openclaw/workspace",
    "model": {
      "primary": "openrouter/deepseek/deepseek-v3.2"
    }
  }
}
```

Each agent gets its own workspace directory, which contains its `AGENTS.md`, `SOUL.md`, and any other project‑specific files. The `agentDir` points to the folder that holds the agent’s system prompt and tool‑policy files (though in my case those are kept minimal, letting the `SOUL.md` drive most of the behavior).

Because all three agents use the same underlying model (`deepseek‑v3.2`), the differentiation comes entirely from their workspace context and the instructions in their `SOUL.md` files. That’s a powerful concept: you can shape agent behavior just by curating the files it sees when it starts.

## 7. What works / what doesn’t (real patterns from actual usage)

After running this team for several weeks, here are my takeaways:

**What works well:**

*   **Clear role separation** drastically reduces confusion. The agents stay “in character” because their `SOUL.md` files constantly remind them of their purpose.
*   **Natural handoffs** create built‑in quality gates. kazi‑pm won’t write code; kazi‑dev won’t change priorities. That forces me (or Kazi) to explicitly approve each phase transition.
*   **Single point of contact** (Kazi) keeps the conversation clean. I don’t have to talk to three different bots; I talk to one, and it routes the work internally.
*   **Workspace isolation** means each agent only sees the files relevant to its role. kazi‑dev doesn’t get distracted by planning documents; kazi‑pm doesn’t get tempted to tweak code.

**What still needs work:**

*   **Token‑management overhead.** GitHub installation tokens expire hourly, so agents need to regenerate them before each API call. I’ve automated this with a sourced script, but it’s an extra step.
*   **Cross‑agent awareness.** Sometimes kazi‑dev will finish an issue and not know whether to wait for kazi‑pm to create the next one. We’re still relying on Kazi to monitor the pipeline and trigger the next step.
*   **Error recovery.** If a push fails or an API call returns 429, the agent doesn’t always have a built‑in retry strategy. Human intervention is still required for edge cases.

## Where to go from here

If you’re exploring multi‑agent workflows with OpenClaw, I recommend starting with two agents: a “planner” and a “doer.” Give each a dedicated workspace and write a concise `SOUL.md` that defines their role, boundaries, and core truths. That alone will get you 80% of the benefit.

Once that feels comfortable, add a third “coordinator” agent (like Kazi) to handle the handoffs and keep the conversation unified.

The biggest lesson? **Treat your AI agents like a team, not a toolbox.** Give them clear responsibilities, let them specialize, and build processes that play to their strengths. The result is a more reliable, more scalable, and more enjoyable AI‑augmented workflow.

You can browse the actual configuration files and workspaces in the [openclaw‑config](https://github.com/lionel‑k/openclaw‑config) repo (coming soon). If you’ve built your own agent team, I’d love to hear about your experience—reach out on [Twitter/X](https://twitter.com/lionel‑k) or [GitHub](https://github.com/lionel‑k).