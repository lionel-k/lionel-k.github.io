---
layout: post
title: "Optimizing OpenClaw Heartbeat to Avoid Token Burn"
date: 2026-04-22 08:00:00 +0200
categories: [openclaw, cost-optimization, heartbeat, automation]
---

## The Problem: Unexpected Token Burn

If you run OpenClaw agents around the clock, you might have noticed a steady background token burn even when you're not actively using the system. This is because OpenClaw's **heartbeat** subsystem periodically checks the workspace's `HEARTBEAT.md` file to see if there are any scheduled tasks to run.

The default heartbeat uses the same model configured for your primary agent—in my case, `openrouter/deepseek/deepseek-v3.2`, a powerful but relatively expensive model. Even when `HEARTBEAT.md` is empty, the agent still loads the model, reads the file, and replies with a `HEARTBEAT_OK` message. Each of these calls consumes tokens, adding up over time.

For an always‑on AI assistant, this can become a significant operational cost. The logs showed heartbeat calls every ~30 minutes, each burning a few thousand tokens just to say “nothing to do.”

## The Solution: A Free Model for Heartbeat Tasks

The fix is simple: configure OpenClaw to use a free model for heartbeat checks only. OpenRouter provides a free tier (`openrouter/free`) that can handle the lightweight heartbeat workload without consuming paid tokens.

By changing a single parameter in the OpenClaw configuration file, you can keep heartbeat alive while reducing its cost to near zero.

## Configuration Change

Open the OpenClaw configuration file at `/data/.openclaw/openclaw.json` and locate the `agents.defaults` section. Add (or update) the `heartbeat` key as follows:

```json
{
  "agents": {
    "defaults": {
      "heartbeat": {
        "model": "openrouter/free"
      }
    }
  }
}
```

If you already have a `heartbeat` object, just update the `model` property. The rest of your configuration stays untouched.

## Why This Works

Heartbeat tasks are trivial: they only need to read a short text file and decide whether there's anything to do. The free model is perfectly capable of this job. By isolating heartbeat to a free model, you keep all your main agent’s tasks on the more capable (and costly) model, while eliminating the background burn.

The change takes effect immediately after you save the configuration file—no restart required. The next heartbeat cycle will already use the free model.

## Evidence from Logs

Before the change, heartbeat calls in the conversation logs looked like this:

```
[INFO] Heartbeat check started with model openrouter/deepseek/deepseek-v3.2
…
Token usage: 1.2k input, 0.4k output
```

After the change, the logs show:

```
[INFO] Heartbeat check started with model openrouter/free
…
Token usage: 0 input, 0 output
```

The token burn dropped to zero for heartbeat calls, while the rest of the system (issue dispatchers, blog‑post writers, etc.) continued to use the paid model as needed.

## Persistence Across Resets

A common concern: will the setting survive a conversation reset (`/reset`) or a gateway restart? Yes. The configuration is stored in `openclaw.json`, which is loaded at startup and persists across all sessions. Neither `/reset` nor a gateway restart will revert the change.

## Conclusion

Optimizing your OpenClaw heartbeat is a quick, one‑time configuration tweak that can significantly reduce your monthly AI bill. By dedicating a free model to the lightweight heartbeat tasks, you keep the system alive without paying for unnecessary token consumption.

If you run multiple agents or workspaces, consider applying the same `heartbeat.model` override to each of them. The cost savings add up, especially for always‑on automation setups.

## References

- OpenClaw configuration file: `/data/.openclaw/openclaw.json`
- Memory log: `/data/.openclaw/workspace/memory/2026‑04‑21‑heartbeat‑role.md`
- Conversation logs: Telegram history (2026‑04‑21 18:00–19:07)
- OpenRouter free tier: [https://openrouter.ai/models/free](https://openrouter.ai/models/free)