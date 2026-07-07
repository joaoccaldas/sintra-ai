---
description: Daily AI news update — research, validate against schema, deploy, and report any failure visibly (never fails silently).
---

You are running the **scheduled daily AI news update** for the Sintra Tesseract
site (static Next.js, deployed to the `gh-pages` branch). Use the **real current
date**. Work on `main`.

## Goal
Add a handful (typically 3–8) of **real, verifiable, non-duplicate** AI news
items to the curated feed, pass the schema + build gate, deploy, and **never
fail silently**. Quality over quantity — if there is no genuinely new verifiable
news, add nothing and say so. Never invent or pad.

## Procedure — follow exactly. If any **GATE** fails, jump to "On failure".

1. **Sync**: `git checkout main && git pull origin main`. If `node_modules` is
   missing, run `npm ci`.

2. **Collect existing ids** so you don't duplicate: gather every `id` and the
   recent `title`s from `src/lib/newsLatestData.ts` (the curated feed,
   `LATEST_AI_NEWS`) **and** `src/lib/newsData.ts` (the historical archive,
   `AI_NEWS`). Always grep for key terms before adding — many "new" items are
   already present.

3. **Research**: web-search significant AI events since the newest existing
   item's date — new models/updates, record benchmarks, major product/agent/API
   launches, funding, acquisitions, policy. Include Brazil (`country: "BR"`) and
   Sweden (`country: "SE"`) items when relevant. **Verify each against an
   official or reputable source URL.** Skip anything speculative or already in
   the feed/archive.

4. **Append** `NewsItem` objects to the **`LATEST_AI_NEWS`** array in
   `src/lib/newsLatestData.ts` (NOT `newsData.ts`). All news pages read the
   combined feed (`src/lib/newsDataCombined.ts` = curated over historical), so
   items land everywhere automatically — a regression test
   (`scripts/tests/news-feed-wiring.test.ts`) enforces this wiring. Required
   schema — every field must be present and non-empty except `country`/`dateDay`:
   ```ts
   {
     id: "kebab-case-unique-id",        // unique across LATEST_AI_NEWS and newsData.ts
     date: "Jun 2026",                  // "Mon YYYY"
     dateNum: 202606,                   // YYYYMM
     dateDay: 29,                       // day of month (1–31)
     title: "...",
     summary: "2–3 factual sentences with specific numbers. No hype.",
     tags: ["Company", "Topic"],        // ≥1
     significance: "landmark" | "major" | "notable",
     provider: "Company Name",
     providerColor: "#hexcolor",        // see CLAUDE.md provider colors
     url: "https://official-source",    // must be https; not already used in archive
     why_it_matters: "one practitioner-insight sentence",
     what_to_try: "one actionable sentence",
     country: "BR" | "SE",              // optional, regional items only
   }
   ```

5. **GATE — schema + build**: run `npm run check`. This runs `validate-data` +
   `validate-content` + `validate-latest-news` (the news schema gate) +
   `typecheck` + `build` (which also regenerates `public/feed.xml`). **If it
   exits non-zero, DO NOT commit or deploy** — go to "On failure" with the log.

6. **Commit news only**: 
   ```bash
   git add src/lib/newsLatestData.ts public/feed.xml
   git commit -m "chore: news update $(date -u +%Y-%m-%d)"
   git push origin main    # retry up to 4x with backoff (2s,4s,8s,16s) on network error
   ```
   Never commit `dist/`.

7. **Deploy**: the push to `main` in step 6 triggers the **Build & Deploy**
   GitHub Action (`.github/workflows/deploy.yml`), which runs `audit:static`,
   rebuilds (refreshing the live feed on networked runners), and publishes to
   `gh-pages`. Confirm the run goes green (GitHub MCP `actions_list` for
   `deploy.yml`); if it fails or Actions is unavailable, fall back to manual
   plumbing (never commit dist to a tracked branch):
   ```bash
   npm run build
   git fetch origin gh-pages
   TREE=$(git --work-tree=dist add -f -A && git --work-tree=dist write-tree)
   PARENT=$(git rev-parse refs/remotes/origin/gh-pages)
   COMMIT=$(echo "deploy: $(date -u +%Y-%m-%d) - daily news" | git commit-tree $TREE -p $PARENT)
   git push origin $COMMIT:refs/heads/gh-pages
   git reset HEAD
   ```

8. **Report success (summary notification)**: print a one-line summary — count +
   titles of items added (or "No new verified items today"). Then post the same
   summary to the persistent GitHub log so each run is visible without digging
   through commits:
   - Find/locate the open issue titled **`📰 Daily news log`** in
     `joaoccaldas/sintra-ai` (use the GitHub MCP — `search_issues` /
     `list_issues`). If it doesn't exist, create it once with `issue_write`.
   - Add a comment (`add_issue_comment`) with the date, item count, titles, and
     the deploy commit sha. On a "no new items" day, still comment so the absence
     is logged (proves the task ran).
   - If a reliable headless email/Slack connector is configured for scheduled
     runs, also send the summary there; otherwise the GitHub log is the channel.

## On failure (any GATE or step error)
- **Do NOT deploy.** Leave the feed unshipped rather than ship malformed data.
- **Open a GitHub issue** so the failure is visible (this is the no-silent-fail
  signal): use the GitHub MCP `issue_write` (find it via ToolSearch) to create an
  issue in `joaoccaldas/sintra-ai` titled `Daily news update failed — <date>`,
  body = the failing step + the `npm run check` error output (trimmed).
- Stop. Do not retry destructively.

## Guardrails
- Only `main`. Only real, verifiable items with official source URLs.
- The `validate-latest-news` gate enforces: unique ids, no collision with the
  historical archive (id or URL), https URLs, valid `dateNum`/`dateDay`, and all
  required fields — so a malformed item fails the build before it can ship.
