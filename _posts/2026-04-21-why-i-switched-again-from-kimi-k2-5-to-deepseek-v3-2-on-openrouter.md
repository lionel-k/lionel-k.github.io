---
layout: post
title: "Why I Switched Again - From Kimi K2.5 to DeepSeek-v3.2 on OpenRouter"
date: 2026-04-21 08:00:00 +0200
categories: [openclaw, ai, models]
---

*This is post 4 of a 4-part series documenting my OpenClaw setup journey: VPS Setup → AI Model → AI Team → Model Switch.*

In the second post of this series, I explained why I initially chose **Kimi K2.5** (via NVIDIA) as the default model for my AI agent team. Fast forward a few weeks, and I’ve switched again—this time to **DeepSeek‑v3.2** delivered through OpenRouter. Why the change, and what did it involve? This post walks through the real‑world decision, the step‑by‑step configuration updates, and the practical differences I’ve observed.

## 1. Why we initially chose Kimi K2.5 – a quick recap

When I first configured OpenClaw, I wanted a model that balanced reasoning ability, a large context window, and reliable API access. Kimi K2.5 (offered through NVIDIA’s API) delivered a solid 262k context window, competitive pricing, and strong performance on both coding and planning tasks. It became the default for both my product‑manager agent (`kazi‑pm`) and my engineer agent (`kazi‑dev`).

The setup was straightforward: enable the NVIDIA plugin, store the API key, and point the agent definitions to `openrouter/moonshotai/kimi‑k2.5`. Everything worked—but as I’ll explain, a discovery and a practical trigger prompted a second look.

## 2. Discovering DeepSeek‑v3.2 already in the config

While reviewing my `openclaw.json` file for an unrelated reason, I noticed that **DeepSeek‑v3.2** was already listed in the `agents.defaults.models` block. I had added it earlier as a potential fallback, but never actually switched to it. The entry looked like this:

```json
"openrouter/deepseek/deepseek-v3.2": {}
```

Seeing it there made me curious: How would it compare to Kimi K2.5 on cost, speed, and reasoning? More importantly, why was I paying NVIDIA’s rate when a comparable (or better) model might be available through OpenRouter at a lower price?

## 3. The trigger for switching

Two things pushed me to make the change:

1. **A minor API hiccup** – The NVIDIA endpoint had a brief outage that caused my agents to stall for a few minutes. While not a major issue, it reminded me that I was locked into a single provider.
2. **OpenRouter’s unified interface** – I already had OpenRouter configured as a provider (it’s enabled by default in OpenClaw). Switching to DeepSeek‑v3.2 would let me keep all my model calls through one gateway, simplify billing, and give me the flexibility to swap models later without touching the provider setup.

The combination of redundancy and potential cost savings made the switch worth trying.

## 4. The actual switch – step‑by‑step changes

Changing the default model involved editing two places: the global `openclaw.json` and each agent’s `agent.yaml` file.

### 4.1 Update `openclaw.json`

In the `agents.list` section, I changed the `model` field for both `kazi‑pm` and `kazi‑dev`:

```json
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
```

I also updated the default primary model under `agents.defaults.model`:

```json
"defaults": {
  "workspace": "/data/.openclaw/workspace",
  "model": {
    "primary": "openrouter/deepseek/deepseek-v3.2"
  },
  …
}
```

### 4.2 Update each agent’s `agent.yaml`

Each agent has its own YAML file that overrides the global model setting. I edited both files to reflect the new model.

**`/data/.openclaw/agents/kazi-pm/agent/agent.yaml`**:
```yaml
id: kazi-pm
name: kazi-pm
model: openrouter/deepseek/deepseek-v3.2
description: Product Manager agent – breaks down projects, writes issues, sets priorities, and marks issues as ready for development.
emoji: 📋
```

**`/data/.openclaw/agents/kazi-dev/agent/agent.yaml`**:
```yaml
id: kazi-dev
name: kazi-dev
model: openrouter/deepseek/deepseek-v3.2
description: Engineer agent – implements technical tasks, works on codebases, makes focused changes, creates branches, opens PRs. Only picks issues labeled pm:ready.
emoji: 💻
```

### 4.3 Restart the OpenClaw gateway

After saving the changes, I restarted the OpenClaw gateway to pick up the new configuration:

```bash
openclaw gateway restart
```

That’s it. The agents immediately started using DeepSeek‑v3.2 via OpenRouter.

## 5. OpenRouter as the new provider – moving from NVIDIA to OpenRouter

The switch also meant moving from the NVIDIA‑specific provider to OpenRouter’s unified gateway. OpenRouter acts as an aggregator: it routes requests to the appropriate upstream API (in this case DeepSeek’s) and handles billing, rate‑limiting, and fallback.

Because OpenClaw already had the `openrouter` plugin enabled, no extra configuration was needed—just the model‑identifier change. The existing OpenRouter API key (set as an environment variable) was automatically used.

I kept the NVIDIA plugin enabled for now; there’s no harm in leaving it as a backup, and it preserves the option to switch back quickly if needed.

## 6. Practical differences – context window, speed, cost, reasoning

After a day of usage, here’s what I observed:

| Aspect | Kimi K2.5 (NVIDIA) | DeepSeek‑v3.2 (OpenRouter) |
|--------|-------------------|----------------------------|
| **Context window** | 262k | 128k |
| **Speed** | ~3–5 seconds per typical response | ~2–4 seconds per typical response |
| **Cost** | ~$0.60 / 1M input tokens | ~$0.10 / 1M input tokens (OpenRouter’s tiered pricing) |
| **Reasoning quality** | Strong on planning and coding tasks | Equally strong, with a slight edge on code‑generation precision |
| **Provider stability** | Single‑provider dependency | Multi‑provider aggregation (OpenRouter can route to other backends) |

The **smaller context window (128k vs 262k)** hasn’t been a problem for my agent workflows. Most agent conversations stay well under 50k tokens, and the 128k limit is still generous.

**Speed** is roughly comparable—if anything, DeepSeek‑v3.2 feels a touch faster, though that could be due to network conditions.

**Cost** is the clearest win. OpenRouter’s pricing for DeepSeek‑v3.2 is significantly lower, and because I’m already using OpenRouter for other experiments, I benefit from consolidated billing.

**Reasoning capability** is subjectively unchanged. Both models handle the multi‑agent delegation pattern (PM writes issues, Dev implements them) without missing a beat. DeepSeek‑v3.2 seems slightly more concise in its code suggestions, which I appreciate.

## 7. Multi‑agent delegation with the new model

One of my main concerns was whether the model switch would disrupt the handoff between `kazi‑pm` and `kazi‑dev`. The two agents rely on a shared understanding of task context, issue descriptions, and acceptance criteria.

Happily, the transition was seamless. Because both agents now use the *same* model, there’s even more consistency in how they interpret instructions and format outputs. The PM still writes clear, actionable issues, and the Dev still picks them up and turns them into branches and PRs—no extra configuration or prompt adjustments required.

## 8. Lessons learned – when to reconsider a model choice, how to test without disrupting workflow

1. **Periodically review your model lineup.** New models appear frequently, and pricing changes. A quick scan of your config file can reveal alternatives you already have available.

2. **Keep a fallback provider enabled.** Leaving the NVIDIA plugin active gave me peace of mind; if OpenRouter had issues, I could switch back with a few lines of JSON.

3. **Test with a single agent first.** I could have changed only `kazi‑dev`’s model, run a few tasks, and then decided whether to update `kazi‑pm`. In this case I was confident enough to switch both at once, but for risk‑averse setups, a staged rollout is smarter.

4. **Monitor token usage and latency.** After the switch, I watched the logs for a few hours to ensure response times stayed within expectations and that token counts weren’t unexpectedly high. OpenRouter’s dashboard made this easy.

5. **Remember that the model is just one part of the stack.** The agent’s instructions, workspace setup, and tooling matter just as much. A well‑prompted “weaker” model often outperforms a poorly‑prompted “stronger” one.

## Wrapping up

Switching from Kimi K2.5 to DeepSeek‑v3.2 turned out to be a low‑effort, high‑reward change. It cut costs, kept performance on par (or slightly better), and moved me to a more flexible provider setup. Most importantly, it didn’t disrupt the daily workflow of my AI agent team.

If you’re running OpenClaw with a single‑provider model, take a look at OpenRouter’s offerings—you might already have a better option sitting in your config file, waiting to be activated.

*This is the final post in a four‑part series about self‑hosting OpenClaw. You can read the previous posts: [VPS Setup](/blog/self-hosting-openclaw-on-a-vps-a-complete-setup-guide), [AI Model Configuration](/blog/choosing-the-right-ai-model-why-i-switched-from-openai-to-kimi-k2-5), and [Building an AI Team](/blog/building-an-ai-team-with-openclaw-meet-kazi-kazi-pm-and-kazi-dev).*