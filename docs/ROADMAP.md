# Sintra Tesseract — Product Roadmap

Thesis: the site already wins on **breadth + freshness** (deep content kept current
by the scheduled `/update-news` task). The next chapter is **utility + retention** —
turning an AI encyclopedia into a daily AI *utility* people return to.

The through-line: **scheduled Claude tasks are the content + distribution engine.**

---

## ✅ Shipped

### "Try free — no login" prompt runner
Visitors can run any prompt in a free AI tool with **no login, no API key, no
backend** — preserving the static-export model.

- `src/lib/freeAiRunners.ts` — registry of free, no-login tools. Prefill via URL
  where supported (Perplexity, DuckDuckGo AI); paste-based otherwise (LMArena,
  Perchance). The control **always copies the filled prompt to the clipboard**
  first, so paste-based tools are one paste away.
- `src/components/PromptRunner.tsx` — accessible button + popover menu.
- Mounted in `ExpandedCard.tsx` and `app/prompts/[slug]/PromptPageClient.tsx`,
  next to the existing login-required `launchInAI` deep link.
- Tested: `scripts/tests/free-ai-runners.test.ts` (runs under `npm test` / `npm run check`).
- Adding a tool: append to `FREE_AI_RUNNERS`. Set `prefills: true` only if the tool
  reliably accepts the prompt via its URL. Keep it free **and** usable without login.

---

## Next bets (priority order)

### 1. Retention loop — daily/weekly email digest
**Why:** fresh news ships daily but nothing brings readers back. A digest is the
single biggest retention lever and reuses content we already generate.
**How:** extend `/update-news` to render an HTML digest from the day's
`newsLatestData.ts` additions and send via a static-friendly provider
(Buttondown / Resend free tier). Add a signup embed to the hero/footer. Needs:
the owner to pick a provider and add its form endpoint / send token.

### 2. Authoritative, always-fresh model comparison (`/models`)
**Why:** "which model / what does it cost" is the #1 evergreen AI question and a
compounding SEO magnet. The page, token calculator, and compare-tray already exist.
**How:** back it with a structured data file refreshed by a scheduled task (same
pattern as news): pricing, context window, benchmarks, latency. Make it the best
free model-decision tool on the web.

### 3. Local-first personalization
**Why:** retention; `SavedPromptsProvider` + `PersonaEntry` are half-built.
**How:** role-based home, "continue where you left off", saved searches, a personal
dashboard — all client/localStorage, no backend.

### The pivotal architectural decision
The **static-export constraint** caps utility/personalization. The highest-leverage
move is adding a **thin edge function** (Cloudflare Worker / Vercel Edge) for the
interactive bits (BYOK "run with Claude", newsletter send, contact form) while
keeping the static site for content + SEO. Bets 1–3's richest versions flow from it.
The "Try free" runner deliberately needs none of this — it ships value today.
