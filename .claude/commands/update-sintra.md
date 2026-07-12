---
description: Research and add news + use-case updates, gate on validation, deploy, and verify the live site actually reflects what was just shipped. The full loop — not just "commit and hope".
---

# `/update-sintra` — update, deploy, and verify

This is the broader sibling of `/update-news`: it covers news **and**
use-case content in one run, and — the part that's usually skipped —
**closes the loop by checking the live site**, not just trusting that a
green build means the deploy actually landed. (It has not always landed
silently before — see `CLAUDE.md`'s "No branch protection" note. Don't
assume; check.)

## Goal

Add genuinely new, verifiable content (news items and, when there's a real
gap, use cases), pass every gate, deploy, and **prove** the live site matches
what was just added — with a concrete fetch-and-compare, not an assumption.
Quality over quantity throughout: if there's nothing genuinely new to add,
add nothing and say so plainly.

## Procedure

### 1. Sync and baseline

```bash
git checkout main && git pull origin main
npx tsx scripts/validate-content.ts   # note the current counts — this is your "before" snapshot
```

### 2. News

Follow `/update-news`'s procedure exactly (`.claude/commands/update-news.md`):
collect existing IDs from both `newsLatestData.ts` and `newsData.ts`,
web-search for genuinely new verifiable events since the latest item, append
to `LATEST_AI_NEWS` following the schema there. Typically 3-8 items on a
normal day; some days genuinely have zero.

### 3. Use cases (only when there's a real gap)

This step is conditional — most runs won't touch use cases. Only add when
you've identified a **specific, real gap**: a content area explicitly
requested, or a genuinely missing topic surfaced by recent news (e.g. a new
technique or tool category with no prompt coverage yet). Never pad use-case
count for its own sake.

Before writing anything:
```bash
grep -in "<topic keyword>" src/data/useCases.json   # check it doesn't already exist
```
Follow the schema in `/manage-sintra` (or `CLAUDE.md`'s data files map).
Cross-check against what's already in `TOPIC_HUBS`' `matchTags` if the new
use cases should surface on a topic hub page.

**Known failure mode to avoid**: this repo has had two independent batches of
similar content (finance use cases, in one case) added in parallel without
either side knowing about the other, discovered only at merge time. If you
suspect parallel work might be happening (recent commits from other
sessions, an open PR touching the same file), diff against `origin/main`
before finalizing your additions, not after.

### 4. GATE — validate and build

```bash
npm run check
```
If this fails, **stop** — do not commit, do not deploy. Fix the failure
(or revert your change) and re-run. This is non-negotiable; there is no
CI gate blocking a broken `main` from "shipping" in the sense that matters
(the deploy step will just fail, possibly silently).

### 5. Commit and push

```bash
git add src/lib/newsLatestData.ts public/feed.xml public/feed.json \
        src/data/useCases.json public/api/use-cases.json public/llms*.txt \
        src/lib/useCasesCount.generated.ts  # only the files you actually touched
git commit -m "chore: content update $(date -u +%Y-%m-%d)"
git push origin main
```

### 6. Confirm the deploy Action, don't assume it

Check `.github/workflows/deploy.yml`'s latest run for your commit SHA. If
you have GitHub API access, check its `conclusion` directly. If not, or if
it's unavailable:

```bash
git fetch origin gh-pages
git log --oneline -1 origin/gh-pages   # should show "deploy: <your-sha>"
```

If the Action failed or hasn't run, fall back to manual deploy (see
`/manage-sintra`'s Deployment section) rather than leaving `main` ahead of
`gh-pages` indefinitely.

### 7. Verify live matches expected — the step that's usually skipped

This is the actual point of this skill over the manual procedure: **prove**
the live site reflects what you just shipped, with a real fetch, not an
assumption from "the build succeeded."

Pick 1-2 concrete, checkable facts from what you just added and confirm them
against the live site:

```bash
# Example: confirm a specific news item's title is live
curl -sS "https://joaoccaldas.github.io/sintra-ai/feed.json" | grep -o "Exact Title Of Item You Added"

# Example: confirm the use-case count matches what you expect post-update
curl -sS "https://joaoccaldas.github.io/sintra-ai/api/use-cases.json" | python3 -c "import json,sys; print(json.load(sys.stdin)['count'])"
```

**Do not use WebFetch for JSON-LD/structured-data checks** — it converts
HTML to markdown and silently strips `<script>` tags, producing false
negatives. Use `curl` + `grep`/`python3 -m json.tool` for anything that
needs to inspect raw HTML or JSON.

If the live check doesn't match within a reasonable wait (deploys typically
take a few minutes), don't just report success anyway — say plainly what you
verified, what you couldn't yet confirm, and that you'll check again shortly
rather than asserting it shipped.

### 8. Report

One clear summary: what was added (news item titles, use-case titles if
any), the deploy commit SHA, and the specific live-verification result
(not just "deploy succeeded" — the actual fact you checked and what it
showed). On a "nothing new today" day, say that plainly too — a quiet day
is a valid, correctly-reported outcome, not a failure to hide.

## On failure (any step)

Don't deploy malformed data, and don't report success you haven't verified.
If there's a GitHub issue mechanism available (see `/update-news`'s
`📰 Daily news log` convention), log the outcome there — including failures
— so the history is visible without digging through commits.
