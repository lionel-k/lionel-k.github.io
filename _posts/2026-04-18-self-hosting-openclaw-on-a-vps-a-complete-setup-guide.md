---
layout: post
title: "Self-hosting OpenClaw on a VPS - A Complete Setup Guide"
date: 2026-04-18 08:00:00 +0200
categories: [openclaw, self-hosting, tutorial]
---

## 1. Why self-host OpenClaw? (VPS vs local, control vs convenience)

When I first discovered OpenClaw—an open-source AI orchestration platform that lets you run multiple AI agents, connect to tools like GitHub, Telegram, and browsers, and automate complex workflows—I knew I wanted it to be a constant companion in my work. But where to run it?

You have two main options: **local machine** or **VPS (Virtual Private Server)**.

**Local machine** (your laptop or desktop) is great for privacy and zero ongoing cost. However, your AI assistant goes offline when you close your laptop, and you're limited by your own hardware specs and internet upload speed.

**A VPS** gives you a 24/7, always-online agent that you can reach from anywhere, with predictable monthly pricing and resources you can scale. Since I wanted OpenClaw to be available while I'm traveling, working from different devices, or even sleeping, I chose a VPS.

Self‑hosting also means full control: you decide which AI models to use (OpenAI, NVIDIA, OpenRouter, etc.), which plugins are enabled, and exactly how your agents behave. No third‑party vendor locks, no surprise policy changes—just your own setup, tailored to your needs.

If you're a developer, a technical founder, or just someone who loves tinkering with AI automation, self‑hosting OpenClaw on a VPS is a rewarding project that pays off in daily productivity.

## 2. Prerequisites (VPS specs, environment variables needed)

Before you start, make sure you have the following ready:

### VPS Requirements

- **A Linux VPS** running Ubuntu 22.04 or 24.04 (other distributions may work but aren't officially tested).
- **At least 2GB of RAM** (4GB recommended if you plan to run multiple heavy agents).
- **20GB of SSD storage** (enough for Node.js, npm packages, and logs).
- **Root/administrative access** via SSH.

### Software Dependencies

- **Node.js 20.x or later** (the OpenClaw CLI is a Node.js package).
- **npm** (comes with Node.js).
- **Git** (for cloning repositories and managing version control).

You can install Node.js on Ubuntu with:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### Environment Variables

OpenClaw uses environment variables to keep secrets out of config files. You'll need at least one of the following depending on which AI providers you enable:

- `NVIDIA_API_KEY` – if you want to use NVIDIA's Kimi K2.5 or other NVIDIA-hosted models.
- `OPENAI_API_KEY` – if you want to keep OpenAI models as a backup.
- `TELEGRAM_BOT_TOKEN` – if you want to connect a Telegram bot (optional but highly useful).

Store them in your shell's profile (e.g., `~/.bashrc` or `~/.profile`) or use a `.env` file in the OpenClaw workspace later.

### Optional but Helpful

- A domain name pointing to your VPS IP (if you want to expose the OpenClaw gateway over HTTPS).
- A GitHub Personal Access Token (if you plan to use the GitHub integration).
- Basic familiarity with the command line and editing JSON files.

## 3. The installation (step-by-step, what the docs don't mention)

Here's the exact sequence I followed to get OpenClaw running on a fresh Ubuntu VPS. The official docs are concise, but these are the nuances that saved me time.

### Step 1: Install Node.js and npm

If you haven't already:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt update
sudo apt install -y nodejs
```

Verify with `node --version` and `npm --version`.

### Step 2: Install OpenClaw globally

```bash
sudo npm install -g openclaw
```

This installs the `openclaw` CLI command. The installation may take a minute.

### Step 3: Create the OpenClaw workspace directory

OpenClaw expects a workspace folder where it stores configs, logs, and agent files. By default it uses `/data/.openclaw`. Let's create it:

```bash
sudo mkdir -p /data/.openclaw
sudo chown -R $USER:$USER /data/.openclaw
```

If you prefer a different location, you can set the `OPENCLAW_DATA` environment variable.

### Step 4: Start the gateway daemon

OpenClaw runs a local gateway that handles communication between agents and external channels. Start it with:

```bash
openclaw gateway start
```

You should see output like:

```
✓ Gateway started (pid: ...)
```

Check its status:

```bash
openclaw gateway status
```

If the gateway fails to start, check the logs with `journalctl -u openclaw-gateway` (if it's running as a systemd service) or look in `/data/.openclaw/logs/`.

### Step 5: Verify the installation

Run the basic health check:

```bash
openclaw status
```

You should see a list of enabled plugins, the default model, and channel statuses. At this point, the default model is likely set to a cloud provider like OpenAI GPT‑4.1—we'll change that in the next section.

### Step 6: Prepare your workspace

OpenClaw creates a workspace directory inside `/data/.openclaw/workspace`. You can place your project files there, or configure agents to use different workspaces.

I created a dedicated workspace for my blog repository:

```bash
mkdir -p /data/.openclaw/workspace/lionel-k.github.io
cd /data/.openclaw/workspace/lionel-k.github.io
git clone https://github.com/lionel-k/lionel-k.github.io .
```

Now OpenClaw agents can operate directly on that codebase.

That's it! The core OpenClaw system is now installed and ready for configuration.

## 4. Model configuration (setting Kimi K2.5 as default, keeping OpenAI as backup)

Out of the box, OpenClaw defaults to an OpenAI model. I wanted to switch to **Kimi K2.5 via NVIDIA** (a powerful, cost‑effective model) while keeping OpenAI models as a fallback. Here's how to do that without breaking anything.

### Step 1: Ensure the NVIDIA plugin is enabled

Open the main config file:

```bash
nano /data/.openclaw/openclaw.json
```

Look for the `plugins.entries` section. You should see:

```json
"plugins": {
  "entries": {
    "openai": { "enabled": true },
    "nvidia": { "enabled": true }
  }
}
```

If `nvidia` is missing or set to `false`, change it to `true`. Save the file.

### Step 2: Add the NVIDIA provider configuration

In the same file, find the `models.providers` block. Add (or update) the `nvidia` provider as follows:

```json
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
          "name": "Kimi K2.5"
        }
      ]
    }
  }
}
```

Notice the `apiKey` references the environment variable `NVIDIA_API_KEY`. Make sure you've set it in your shell before starting OpenClaw.

### Step 3: Set Kimi K2.5 as the default model

Now locate the `agents.defaults.model` section. Change it to:

```json
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
      "nvidia/moonshotai/kimi-k2.5": { "alias": "Kimi K2.5 (NVIDIA)" }
    }
  }
}
```

This does two things:

1. Sets `nvidia/moonshotai/kimi-k2.5` as the primary model for new sessions.
2. Keeps all the OpenAI model entries in the list, so you can still select them explicitly when needed.

### Step 4: Restart the gateway

After editing the config, restart the gateway for changes to take effect:

```bash
openclaw gateway restart
```

### Step 5: Verify the new default

Run `openclaw status` again. Under "Default model" you should now see `moonshotai/kimi-k2.5`. Also check that the OpenAI models are still listed in the models table.

That's it! OpenClaw will now use Kimi K2.5 for new conversations, while preserving the ability to switch to OpenAI models if you need a different style or capability.

## 5. The gotchas (real errors we hit and how to fix them)

No setup is completely smooth. Here are the real errors I encountered—and exactly how to fix them—so you can avoid the same pitfalls.

### 1. Wrong directory confusion

When running git commands (especially amend/force‑push), I sometimes found myself in the wrong repository directory. This made fixes unreliable and caused mismatched branches.

**Fix:** Always confirm your location before critical operations:

```bash
pwd
git remote -v
git branch --show-current
git status
```

Make a habit of checking these four commands before any `git commit`, `git amend`, or `git push`.

### 2. Async exec/process instability

OpenClaw's `exec` tool can time out or return incomplete output when a command takes too long. This can hide the real failure and leave you guessing.

**Fix:** Break long operations into smaller, explicit steps. Capture output after each critical command and verify it looks correct. For example, instead of a single `git push --force-with-lease`, run:

```bash
git log -1 --oneline  # confirm the commit
git push --force-with-lease 2>&1 | tee push.log
cat push.log | grep -q "successful" && echo "Push succeeded" || echo "Push failed"
```

### 3. Commit author mismatch

Even though the GitHub App successfully opened a PR, the commit author showed up as **Kazi** instead of **Lionel Kubwimana**. This happened because the git author config wasn't set before committing.

**Fix:** **Always** set your git identity before the first commit in any repository:

```bash
git config user.name "Lionel Kubwimana"
git config user.email "lionel.kubwimana@gmail.com"
```

If you already pushed with the wrong author, amend the last commit:

```bash
git commit --amend --author="Lionel Kubwimana <lionel.kubwimana@gmail.com>" --no-edit
git push --force-with-lease
```

### 4. Gateway fails to start with "address already in use"

If you already have a service on port 18789 (the default gateway port), the gateway won't start.

**Fix:** Change the gateway port in `/data/.openclaw/openclaw.json` under `gateway.bind.port`, or stop the conflicting service.

### 5. NVIDIA plugin enabled but model not appearing

After adding the NVIDIA provider config, Kimi K2.5 still didn't show up in `openclaw status`. The reason: the `NVIDIA_API_KEY` environment variable wasn't exported in the environment where the gateway runs.

**Fix:** Export the variable system‑wide (e.g., in `~/.profile`) and restart the gateway:

```bash
echo 'export NVIDIA_API_KEY="your_key_here"' >> ~/.profile
source ~/.profile
openclaw gateway restart
```

### 6. OpenAI models disappear after config edit

If you accidentally remove the OpenAI plugin entry or its models from the config, they'll vanish from the model list.

**Fix:** Keep the `openai` plugin enabled (`"enabled": true`) and keep the OpenAI model entries in `agents.defaults.models`. The config merge mode (`"mode": "merge"`) helps, but double‑check after any edit.

### 7. Telegram bot not responding

I added the bot token but the bot didn't reply. The issue: the Telegram channel plugin wasn't enabled.

**Fix:** Enable the Telegram channel in `channels.telegram.enabled` and ensure the bot token is correct:

```json
"channels": {
  "telegram": {
    "enabled": true,
    "botToken": "YOUR_BOT_TOKEN"
  }
}
```

Then restart the gateway.

Learning from these gotchas will save you hours of debugging. Write them down for your own future reference!

## 6. Verification checklist (how to confirm everything works)

Once your setup is complete, run through this checklist to ensure everything is working as expected.

### 1. Gateway is running

```bash
openclaw gateway status
```

Should output `✓ Gateway is running (pid: …)`.

### 2. Default model is correct

```bash
openclaw status | grep -A2 -B2 "Default model"
```

You should see your chosen default (e.g., `moonshotai/kimi-k2.5`).

### 3. All required plugins are enabled

```bash
openclaw status | grep -E "(Plugin|Channel)"
```

Look for `openai`, `nvidia`, `telegram` (if you enabled them) with a `✓` or `enabled` status.

### 4. Environment variables are loaded

```bash
echo $NVIDIA_API_KEY | head -c 10  # should show the first 10 chars (confirms it's set)
echo $OPENAI_API_KEY | head -c 10
```

If either is empty, revisit your shell profile.

### 5. Start a test session

Open a new OpenClaw session and ask a simple question to verify the AI responds:

```bash
openclaw session new --model nvidia/moonshotai/kimi-k2.5
```

Inside the session, type `Hello, can you tell me the current date?` and see if you get a coherent answer.

### 6. Telegram connectivity (if enabled)

Send a message to your Telegram bot. It should respond with a welcome message or at least acknowledge the command. If not, check the gateway logs:

```bash
journalctl -u openclaw-gateway -n 20 --no-pager
```

### 7. GitHub integration (if configured)

Create a test issue or PR via the GitHub skill to confirm the agent can interact with your repositories.

### 8. Git author config

In any repository where you'll commit code, verify the author is set correctly:

```bash
git config user.name
git config user.email
git log -1 --format='%an <%ae>' 2>/dev/null || echo "No commits yet"
```

If all the above steps pass, congratulations—your OpenClaw VPS setup is fully operational!

## 7. Rebuild checklist (if you need to do it again)

If you ever need to recreate this setup from scratch—maybe on a new VPS or after a system wipe—here's the condensed checklist I now keep in my notes.

1. **Provision a Linux VPS** (Ubuntu 22.04/24.04, 2+ GB RAM, 20+ GB SSD).
2. **Install Node.js 20+**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   ```
3. **Install OpenClaw globally**:
   ```bash
   sudo npm install -g openclaw
   ```
4. **Create workspace directory** and set ownership:
   ```bash
   sudo mkdir -p /data/.openclaw
   sudo chown -R $USER:$USER /data/.openclaw
   ```
5. **Set environment variables** (`NVIDIA_API_KEY`, `OPENAI_API_KEY`, `TELEGRAM_BOT_TOKEN`) in `~/.profile` and reload.
6. **Start the gateway**:
   ```bash
   openclaw gateway start
   ```
7. **Edit `/data/.openclaw/openclaw.json`**:
   - Enable the `nvidia` plugin.
   - Add the NVIDIA provider configuration (see section 4).
   - Set default model to `nvidia/moonshotai/kimi-k2.5`.
   - Keep OpenAI plugin enabled and its model entries.
   - Enable Telegram channel if desired.
8. **Restart the gateway**:
   ```bash
   openclaw gateway restart
   ```
9. **Verify with `openclaw status`** – confirm default model, plugins, and channels.
10. **Set git identity** in any repository you'll work with:
    ```bash
    git config user.name "Lionel Kubwimana"
    git config user.email "lionel.kubwimana@gmail.com"
    ```
11. **Run the verification checklist** (section 6) to catch any missing pieces.

That's the whole process distilled into eleven repeatable steps. Bookmark this list—you'll thank yourself later.

---

This is the first post in a four‑part series about self‑hosting OpenClaw:

1. **VPS Setup** (this post) – getting OpenClaw running on a VPS.
2. **AI Model Configuration** – choosing and switching between AI models.
3. **Building an AI Team** – setting up specialized agents for different tasks.
4. **Model Switch in Production** – safely changing the default model without breaking existing workflows.

Happy self‑hosting! 🚀
