---
layout: post
title: "Choosing the Right AI Model - Why I Switched from OpenAI to Kimi K2.5"
date: 2026-04-19 08:00:00 +0200
categories: [openclaw, ai, models]
---

*This is post 2 of a 4-part series documenting my OpenClaw setup journey: VPS Setup → AI Model → AI Team → Model Switch.*

When you start building with AI agents, the default choice is often "just use OpenAI." It's the most documented, the most integrated, and for many tasks, it works exceptionally well. But default choices come with hidden trade-offs: cost, lock‑in, and sometimes a one‑size‑fits‑all model that isn't actually the best fit for your specific needs.

In this post I'll walk through the real evaluation process I used to pick a default model for my OpenClaw‑based AI team—and why I ended up switching from OpenAI to **Kimi K2.5** (delivered via NVIDIA) while keeping OpenAI models as a deliberate backup.

## 1. The problem with default choices

OpenAI’s models are fantastic, but they’re not the only game in town. Relying on a single provider means:

- **Cost accumulation** – every request adds up, especially at scale.
- **Context‑window limits** – even GPT‑5.4 Pro tops out at 128k tokens, which can be a constraint for long documents or multi‑step reasoning.
- **Vendor lock‑in** – your workflows become tied to one company’s pricing, availability, and policy changes.
- **Missing specialized strengths** – different models excel at different things (coding, reasoning, long‑context comprehension).

The goal wasn’t to *replace* OpenAI, but to **choose the right default** for the majority of daily tasks, while keeping OpenAI available for situations where it’s worth the premium.

## 2. Evaluation criteria

I defined four concrete criteria for the evaluation:

1. **Context window** – How many tokens can the model handle in a single conversation? Larger windows mean less truncation and better coherence over long interactions.
2. **Cost** – Not just per‑token pricing, but also any hidden fees (cache usage, monthly minimums). For a personal setup, zero‑cost options are especially attractive.
3. **Reasoning quality** – Does the model follow complex instructions, reason step‑by‑step, and produce reliable outputs?
4. **Availability & latency** – Is the provider stable, with low latency and high uptime? Can I access it via a simple API?

These criteria reflect real‑world needs: I wanted my AI agents to handle lengthy code reviews, draft multi‑section blog posts, and remember context across hours of work—all without breaking the bank.

## 3. The candidates

OpenClaw’s plugin architecture lets me configure multiple model providers side‑by‑side. I set up the following candidates (all accessible from the same agent interface):

| Model | Provider | Context Window | Max Tokens | Cost (per 1M tokens) |
|-------|----------|----------------|------------|----------------------|
| GPT‑5.4 | OpenAI | 128k | 16,384 | ~$5 input / $15 output |
| GPT‑5.4 Pro | OpenAI | 128k | 16,384 | ~$10 input / $30 output |
| GPT‑5.2 | OpenAI | 128k | 16,384 | ~$2 input / $6 output |
| GPT‑5.1 Codex | OpenAI | 32k | 8,192 | ~$1 input / $3 output |
| GPT‑4.1 | OpenAI | 32k | 8,192 | ~$0.5 input / $1.5 output |
| **Kimi K2.5** | **NVIDIA (Moonshot)** | **262,144** | **8,192** | **$0** (current setup) |
| DeepSeek‑v3.2 | OpenRouter | 128k | 8,192 | ~$0.1 input / $0.4 output |

*Note: The zero cost for Kimi K2.5 reflects a promotional credit in my current NVIDIA account; actual pricing may apply later, but the per‑token rate is still extremely low.*

Each model brings different trade‑offs. The OpenAI lineup is mature and well‑understood, but the context windows are limited and costs add up. DeepSeek‑v3.2 is remarkably affordable, yet its 128k window is half of Kimi’s. Kimi K2.5’s **262k context** stood out immediately—enough to hold an entire codebase or a series of long documents in a single conversation.

## 4. The decision

I chose **Kimi K2.5** as the default model for three primary reasons:

1. **Massive context window (262k)** – This is more than double the typical 128k limit. For my use case (reviewing PRs, drafting long‑form content, maintaining agent memory), the extra headroom is a game‑changer.
2. **Zero cost (for now)** – Even when the promotional credits expire, NVIDIA’s per‑token pricing is competitive, and the effective cost for my personal usage will remain negligible.
3. **Strong reasoning performance** – In side‑by‑side tests, Kimi K2.5 produced coherent, step‑wise reasoning that matched or exceeded GPT‑5.2 on most tasks, especially those requiring long‑context comprehension.

The decision wasn’t about “beating” OpenAI, but about **optimizing for my specific workload**. Kimi’s huge context window means fewer “I forgot the earlier part of the conversation” moments, and the cost structure lets me experiment freely without worrying about the bill.

## 5. The setup

Configuring multiple models in OpenClaw is straightforward. Here’s the relevant part of my `openclaw.json` (sanitized):

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "nvidia/moonshotai/kimi-k2.5"
      },
      "models": {
        "openai/gpt-5.4": { "alias": "ChatGPT 5.4" },
        "openai/gpt-5.4-pro": { "alias": "ChatGPT 5.4 Pro" },
        "openai/gpt-5.2": { "alias": "ChatGPT 5.2" },
        "openai/gpt-5.1-codex": { "alias": "ChatGPT 5.1 Codex" },
        "openai/gpt-4.1": { "alias": "ChatGPT 4.1" },
        "nvidia/moonshotai/kimi-k2.5": {},
        "openrouter/deepseek/deepseek-v3.2": {}
      }
    }
  },
  "models": {
    "mode": "merge",
    "providers": {
      "nvidia": {
        "baseUrl": "https://integrate.api.nvidia.com/v1",
        "apiKey": "${NVIDIA_API_KEY}",
        "api": "openai-completions",
        "models": [
          {
            "id": "moonshotai/kimi-k2.5",
            "name": "Kimi K2.5",
            "reasoning": false,
            "input": ["text", "image"],
            "cost": { "input": 0, "output": 0, "cacheRead": 0, "cacheWrite": 0 },
            "contextWindow": 262144,
            "maxTokens": 8192,
            "api": "openai-completions"
          }
        ]
      }
    }
  }
}
```

Key points:

- The `primary` field sets Kimi K2.5 as the default for new sessions.
- All other models remain in the `models` list, so they can be selected explicitly when needed.
- The NVIDIA provider configuration includes the exact context‑window and token limits.
- Environment variables (`NVIDIA_API_KEY`, `OPENAI_API_KEY`) keep secrets out of the config file.

After editing the config, a simple `openclaw gateway restart` applies the changes. The agent immediately starts using Kimi K2.5 for new conversations.

## 6. Backup strategy

Switching defaults doesn’t mean abandoning OpenAI. I kept all OpenAI models enabled for two reasons:

- **Fallback for critical tasks** – If Kimi experiences downtime or produces unexpected outputs, I can manually switch to GPT‑5.4 Pro for that conversation.
- **Specialized strengths** – For certain coding tasks, GPT‑5.1 Codex still outperforms Kimi; for ultra‑complex reasoning, GPT‑5.4 Pro is worth the extra cost.

This **multi‑model strategy** gives me the best of both worlds: a high‑performance, cost‑effective default, plus a curated set of alternatives for when the situation demands them.

## 7. Lessons learned

Looking back, here’s what I would do differently—and what I’d recommend to anyone making a similar decision:

- **Test with real workloads** – Don’t just rely on benchmarks. Run your actual tasks (code reviews, writing, planning) on each candidate and compare the outputs.
- **Monitor costs from day one** – Even with zero‑cost credits, set up a simple dashboard to track token usage. It helps you anticipate future expenses.
- **Keep configuration modular** – Store provider settings in separate, version‑controlled files if possible. It makes swapping models much easier.
- **Document the why** – When you change the default, write a short note explaining the decision. Six months from now, you’ll thank yourself.

The move from OpenAI to Kimi K2.5 wasn’t about rejecting a great tool—it was about **choosing the right tool for the job**. With a 262k context window, zero cost (for now), and robust reasoning, Kimi has become the workhorse of my AI team, while OpenAI stays on the bench for specialized moments.

If you’re evaluating models for your own OpenClaw (or any LLM‑based) setup, I hope this real‑world breakdown helps you make a more informed choice. The landscape changes fast, but the principles of context, cost, and capability will stay relevant.

*Next up: [Building an AI Team with OpenClaw – Meet Kazi, Kazi‑PM, and Kazi‑Dev](/blog/2026/04/20/building-an-ai-team-with-openclaw).*