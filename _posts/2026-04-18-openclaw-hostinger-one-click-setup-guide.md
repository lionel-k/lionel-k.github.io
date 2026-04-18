---
layout: post
title: "Setting up OpenClaw with Hostinger's One‑Click Installation – A Complete Setup Guide"
date: 2026-04-18 08:00:00 +0200
categories: [openclaw, hostinger, tutorial]
---

## 1. Why choose Hostinger's managed OpenClaw? (Managed vs self‑hosted, convenience vs control, zero maintenance)

When I first discovered OpenClaw—an open‑source AI orchestration platform that lets you run multiple AI agents, connect to tools like GitHub, Telegram, and browsers, and automate complex workflows—I knew I wanted it to be a constant companion in my work. But I didn’t want to manage a server.

You have two main options: **self‑hosting on a VPS** or **using a managed service like Hostinger**.

**Self‑hosting on a VPS** gives you full control and can be cheaper, but it also means you’re responsible for updates, security patches, backups, and keeping the server online 24/7. If you’re a developer who loves tinkering, that’s fine. If you’re a founder or a busy professional, it’s a distraction.

**Hostinger’s managed OpenClaw** is a one‑click installation that handles all the infrastructure for you. You get:
- **Zero maintenance** – Hostinger applies security updates, monitors the service, and ensures high availability.
- **Built‑in AI credits** – No need to purchase separate API credits; your plan includes a monthly allowance.
- **Pre‑configured tools** – The OpenClaw instance comes with the GitHub, Telegram, and browser plugins already enabled.
- **One‑click scaling** – If you need more resources, you can upgrade your plan with a single click.

If you want an always‑on AI assistant without the hassle of server management, Hostinger’s managed OpenClaw is the fastest, most reliable way to get started.

## 2. Prerequisites (Hostinger account, domain/email, Telegram/WhatsApp ready, NVIDIA API key)

Before you click “Install,” make sure you have the following ready:

### Hostinger Account
- A Hostinger account (any plan that includes the “Managed OpenClaw” offering). If you don’t have one, you can sign up during the installation flow.

### Communication Channel
- **Telegram** or **WhatsApp** set up on your phone. You’ll need a phone number to create a bot (Telegram) or link a WhatsApp account.

### AI Provider API Key
- **`NVIDIA_API_KEY`** – if you want to use NVIDIA’s Kimi K2.5 as your default model. You can obtain this key from the [NVIDIA API dashboard](https://build.nvidia.com/).
- (Optional) **`OPENAI_API_KEY`** – if you want to keep OpenAI models as a backup. This is recommended, but not required for the basic setup.

### Optional but Helpful
- A domain name (you can use a Hostinger subdomain if you don’t have one).
- Basic familiarity with web dashboards and environment variables.

## 3. The installation (step‑by‑step: signup, selecting the Managed OpenClaw plan, one‑click install, initial dashboard tour)

Here’s exactly what I did to get OpenClaw running on Hostinger.

### Step 1: Sign up or log in to Hostinger
Go to [hostinger.com](https://www.hostinger.com) and either create a new account or log in to an existing one.

### Step 2: Navigate to the “Managed OpenClaw” offering
From the Hostinger dashboard, click **“Marketplace”** or **“Applications”** and search for **“OpenClaw”**. You’ll see the “Managed OpenClaw” tile. Click it.

### Step 3: Choose your plan
Hostinger offers several tiers (Starter, Pro, Business). For a personal AI assistant, the **Starter** plan is enough. It includes:
- 1 OpenClaw instance
- 10 GB storage
- 100 AI credits per month
- Basic support

Select the plan that fits your needs and click **“Install Now.”**

### Step 4: Configure your instance
You’ll be asked to pick:
- **Region** – choose the one closest to you or your team.
- **Domain** – you can use a Hostinger subdomain (e.g., `yourname.hostingerapp.com`) or map a custom domain later.
- **Admin email** – this will be used for important notifications.

Leave the other settings at their defaults and click **“Confirm.”**

### Step 5: Wait for provisioning
Hostinger will spin up your OpenClaw instance. This usually takes 2–5 minutes. You’ll see a progress bar and a “Your instance is ready” message when it’s done.

### Step 6: Tour the OpenClaw dashboard
Once the instance is live, you’ll be redirected to the OpenClaw dashboard. Take a moment to explore:
- **Status panel** – shows whether the gateway is running, the default model, and connected channels.
- **Configuration** – where you can set environment variables, edit the model list, and enable/disable plugins.
- **Logs** – real‑time logs of agent activity and errors.
- **SSH Access** – a built‑in terminal if you need to run CLI commands (rarely needed).

That’s it! Your managed OpenClaw instance is now running. The next steps are about tailoring it to your workflow.

## 4. Environment variables (how to set `NVIDIA_API_KEY` in Hostinger's panel, why this key matters, common mistakes)

OpenClaw uses environment variables to keep secrets out of config files. Hostinger provides a web interface to manage them.

### Step 1: Open the environment variable panel
In your OpenClaw dashboard, go to **“Configuration”** → **“Environment Variables.”**

### Step 2: Add `NVIDIA_API_KEY`
Click **“Add Variable.”** Fill in:
- **Key:** `NVIDIA_API_KEY`
- **Value:** your NVIDIA API key (starts with `nvapi‑...`)
- **Scope:** `Global`

Click **“Save.”** The variable will be injected into the OpenClaw runtime immediately—no restart needed.

### Why this key matters
The NVIDIA provider lets OpenClaw call Kimi K2.5 (and other NVIDIA‑hosted models). Without a valid key, the model catalog will be empty, and you won’t be able to use Kimi.

Note that OpenClaw supports two distinct providers for Kimi K2.5: the **NVIDIA provider** (which uses the `NVIDIA_API_KEY`) and the **Moonshot provider** (which would require a separate Moonshot API key). For Hostinger’s managed setup, we use the NVIDIA provider because it's pre‑configured and the key is easier to obtain. Make sure you're using the NVIDIA provider, not the Moonshot provider, when setting up your environment variable.

### Common mistakes
1. **Wrong key name** – using `NVIDIA_API_KEY` (correct) vs `NVIDIA_KEY` or `NVIDIA_API` (incorrect). The config expects exactly `NVIDIA_API_KEY`.
2. **Missing provider** – the `nvidia` plugin must be enabled. It is by default in Hostinger’s setup, but double‑check in **“Plugins”**.
3. **Key visibility** – make sure you copy the entire key, including the `nvapi‑` prefix, and avoid extra spaces.

If you also want to keep OpenAI models as a backup, add `OPENAI_API_KEY` the same way.

## 5. Model configuration (setting Kimi K2.5 as default via OpenClaw config, keeping OpenAI models as fallback, verifying the model catalog)

Hostinger’s OpenClaw instance comes with a sensible default configuration, but you’ll probably want to switch the default model to Kimi K2.5 and verify that OpenAI models are still available.

### Step 1: Check the current default model
Go to **“Status”** in the dashboard. Look for **“Default model.”** It might be set to an OpenAI model (e.g., `gpt‑4.1`).

### Step 2: Open the model configuration
Navigate to **“Configuration”** → **“Models.”** You’ll see a list of all enabled providers and their models.

### Step 3: Set Kimi K2.5 as default
Find the **“NVIDIA”** provider and expand it. Click the star icon (⭐) next to **“Kimi K2.5.”** This marks it as the primary model for new sessions.

### Step 4: Keep OpenAI models as fallback
Make sure the **“OpenAI”** provider is toggled **ON**. All its models (GPT‑4.1, GPT‑5.1‑Codex, etc.) will stay in the catalog. This gives you a backup if NVIDIA’s API experiences downtime or if you need a different reasoning style.

### Step 5: Verify the model catalog
Go back to **“Status”** and scroll to the **“Models”** table. You should see both `nvidia/moonshotai/kimi‑k2.5` and the OpenAI entries. The default model should now be `moonshotai/kimi‑k2.5`.

If you don’t see Kimi listed, return to the environment variable panel and confirm `NVIDIA_API_KEY` is set correctly. Also check that the NVIDIA provider is enabled in **“Plugins.”**

## 6. Telegram/WhatsApp pairing (step‑by‑step pairing flow, troubleshooting timeouts, confirming connectivity)

Once your model is configured, you’ll want to connect OpenClaw to a messaging channel so you can talk to it from your phone. I’ll walk through Telegram; WhatsApp is similar.

### Step 1: Create a Telegram bot
1. Open Telegram and search for **“@BotFather.”**
2. Send `/newbot` and follow the prompts.
3. BotFather will give you a **bot token** (looks like `1234567890:ABCdefGHIjkl...`). Copy it.

### Step 2: Add the bot token to OpenClaw
In your OpenClaw dashboard, go to **“Channels”** → **“Telegram.”** Paste the token into the **“Bot Token”** field and click **“Save.”**

### Step 3: Start a pairing session
Still in the Telegram channel settings, click **“Start Pairing.”** A QR code and a numeric pairing code will appear.

### Step 4: Link your Telegram account
1. Open Telegram and search for your bot (by the username you gave it).
2. Send the pairing code as a message, or scan the QR code from the Telegram app.
3. The bot will reply with a confirmation message.

### Step 5: Test the connection
Send a simple message to your bot, like `/help` or “Hello.” You should receive a reply from OpenClaw within a few seconds.

### Common pairing issues
- **Timeout** – the pairing session expires after 5 minutes. If you take too long, click **“Start Pairing”** again.
- **Wrong token** – double‑check you pasted the entire token, without extra spaces.
- **Bot not started** – after adding the token, make sure the Telegram channel is **“Enabled.”**
- **Firewall/network** – Hostinger’s infrastructure should allow outbound connections, but if you’re behind a strict corporate firewall, try from a different network.

If you prefer WhatsApp, the process is similar: you’ll need a WhatsApp Business account and a phone number. The OpenClaw dashboard has a dedicated WhatsApp channel panel.

## 7. The gotchas (real errors we hit and how to fix them: env‑var naming confusion, pairing timeouts, model catalog missing, session‑vs‑default‑model mismatch)

No setup is completely smooth. Here are the real errors I encountered—and exactly how to fix them—so you can avoid the same pitfalls.

### 1. Environment variable naming confusion
I added `NVIDIA_API_KEY` but the model catalog remained empty. The reason: the variable name was `NVIDIA_API_KEY` (correct) but the config expected the key to be in the **`nvidia` provider block** under `apiKey`. Since Hostinger injects environment variables globally, OpenClaw picks them up automatically—but only if the plugin is enabled.

**Fix:** Verify the NVIDIA plugin is enabled (Configuration → Plugins). Then restart the gateway (Configuration → Restart Gateway) to force a fresh environment load.

### 2. Pairing timeout
The QR code expired before I could scan it, and the numeric code didn’t work. This happened because I waited too long.

**Fix:** Click **“Start Pairing”** again and immediately scan the new QR or enter the new code. Have your phone ready before you begin.

### 3. Model catalog missing after config change
After editing the model list, Kimi K2.5 disappeared from the catalog. The cause: I accidentally toggled off the NVIDIA provider while trying to change the default model.

**Fix:** Go back to **“Plugins”**, ensure **“NVIDIA”** is **ON**, then go to **“Models”** and re‑star Kimi K2.5. Restart the gateway if the model still doesn’t appear.

### 4. Session‑vs‑default‑model mismatch
I started a new session and it still used the old default model (GPT‑4.1) instead of Kimi K2.5. This happens because session caches the model selection at creation time.

**Fix:** Explicitly select the model when starting a session. In the dashboard, click **“New Session”** and pick `nvidia/moonshotai/kimi‑k2.5` from the dropdown. Going forward, new sessions will use the updated default.

### 5. OpenAI models disappear after config edit
I removed the OpenAI plugin entry thinking I wouldn’t need it, then later wanted it back.

**Fix:** Keep the OpenAI plugin **enabled** even if you don’t plan to use it daily. It’s a valuable fallback. If you already removed it, re‑enable it in **“Plugins”** and restart the gateway.

Learning from these gotchas will save you hours of debugging. Write them down for your own future reference!

## 8. Verification checklist (how to confirm everything works: send a test message, run a simple command, check agent responsiveness, verify default model)

Once your setup is complete, run through this checklist to ensure everything is working as expected.

### 1. Gateway is running
In the dashboard **“Status”** panel, look for **“Gateway status: Running.”**

### 2. Default model is correct
Check **“Default model”** in the same panel. It should read `moonshotai/kimi‑k2.5` (or whichever model you selected).

### 3. Environment variables are loaded
Go to **“Configuration”** → **“Environment Variables.”** Confirm `NVIDIA_API_KEY` is listed with a green checkmark.

### 4. Model catalog includes both NVIDIA and OpenAI
Scroll down the **“Status”** page to the **“Models”** table. Look for `nvidia/moonshotai/kimi‑k2.5` and at least one OpenAI entry (e.g., `openai/gpt‑4.1`).

### 5. Telegram/WhatsApp channel is connected
Send a test message to your bot. It should reply within a few seconds. If you’re using WhatsApp, check that the phone number is linked and the connection is **“Active.”**

### 6. Start a test session
In the dashboard, click **“New Session,”** pick `nvidia/moonshotai/kimi‑k2.5` from the dropdown, and type a simple question like “What’s the current date?” You should get a coherent answer.

### 7. Check logs for errors
Go to **“Logs”** and look for any red error messages. A few warnings are normal, but there should be no repeating failures about missing API keys or connection timeouts.

If all the above steps pass, congratulations—your managed OpenClaw setup is fully operational!

## 9. Rebuild checklist (if you need to start over or migrate to another account)

If you ever need to recreate this setup from scratch—maybe on a new Hostinger account or after deleting your instance—here’s the condensed checklist I now keep in my notes.

1. **Sign up / log in to Hostinger** and navigate to the Managed OpenClaw offering.
2. **Choose your plan** (Starter is fine for personal use) and click **“Install Now.”**
3. **Wait for provisioning** (2–5 minutes).
4. **Add environment variables** (`NVIDIA_API_KEY` and optionally `OPENAI_API_KEY`) in Configuration → Environment Variables.
5. **Set default model** to Kimi K2.5 in Configuration → Models.
6. **Keep OpenAI provider enabled** (toggle ON in Plugins).
7. **Connect Telegram/WhatsApp**:
   - Create a bot (Telegram) or link a phone number (WhatsApp).
   - Paste the token/credentials in Channels → Telegram/WhatsApp.
   - Start pairing and complete the linking flow.
8. **Verify with the checklist** (section 8) to catch any missing pieces.
9. **Bookmark your OpenClaw dashboard URL** and save your bot’s username/number for quick access.

That’s the whole process distilled into nine repeatable steps. Bookmark this list—you’ll thank yourself later.

---

This is the first post in a four‑part series about running OpenClaw in production:

1. **Hostinger One‑Click Setup** (this post) – getting OpenClaw running on a fully managed service.
2. **AI Model Configuration** – choosing and switching between AI models.
3. **Building an AI Team** – setting up specialized agents for different tasks.
4. **Model Switch in Production** – safely changing the default model without breaking existing workflows.

If you run into issues or have questions, feel free to reach out on [GitHub](https://github.com/lionel-k/lionel-k.github.io/issues) or [Telegram](https://t.me/lionelkubwimana).

Happy automating! 🚀