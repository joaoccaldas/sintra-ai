# Sintra AI — Audit & Top 10 Improvements

_Audit date: 6 Jul 2026 · Updated 9 Jul 2026 · Scope: full webapp review, bug hunt, schema standardisation, command-center homepage, automation hub, and a roadmap to make Sintra the one-stop shop for AI._

The site is already a mature Next.js 15 static export with a strong design
system (4 themes, CSS-variable tokens, framer-motion), robust content
validation, a live-feed pipeline, a dedicated automation hub, and a clearer
homepage architecture. This audit builds on that foundation rather than
reworking it. The next design principle is: **motion must explain structure**.
Sintra should feel cinematic, but every animation should help the user move from
AI signal to execution.

---

## Bugs & issues found

| # | Severity | Finding | Status |
|---|----------|---------|--------|
| B1 | **High** | No live/inbound feed — "one-stop shop for AI news" relied entirely on the hand-curated archive; nothing pulled the frontier in automatically. | ✅ Fixed (live aggregator) |
| B2 | **Med** | `featuredData.ts` used a hardcoded `/sintra-ai/guides/` base path — breaks in `next dev` (no basePath) and bypasses the `BASE_PATH` convention. | ✅ Fixed |
| B3 | **Med** | Weekly picks (`THIS_WEEK`) were 22 days stale with no guard — silently ages on the homepage. | ✅ Fixed + audit guard |
| B4 | **Med** | Documentation drift: `CLAUDE.md` counts (197/220/55/30/43) vs actual (211/509/74/54/52); manual news procedure pointed at `newsData.ts` while the daily task writes `newsLatestData.ts`. | ✅ Synced |
| B5 | **Med** | `USE_CASE_SCHEMA.md` domain table (`Business Intelligence`) didn't match the validator's `VALID_DOMAINS` (`Finance & FP&A`, `Data & Analytics`), and referenced the deleted `CategoryCarousel3D.tsx`. | ✅ Fixed |
| B6 | **Low** | Outbound feed was RSS-only; no JSON Feed for modern/JS readers. | ✅ Fixed (feed.json) |
| B7 | **Low** | `CAT_ACCENT` in `constants.ts` maps every category to the same violet — category accents carry no signal. Likely intentional (monochrome brand); left as-is, flagged for a design decision. | ⏳ Noted |
| B8 | **Low** | No automated freshness/staleness gate in CI. | ✅ Fixed (audit-freshness) |
| B9 | **Med** | Homepage had strong content density but not enough product story; it needed a clearer operating map for a one-stop-shop experience. | ✅ Fixed (command-center hero + AI stack journey) |
| B10 | **Med** | AI automation was present indirectly through prompts/tools, but not elevated as a first-class information architecture. | ✅ Fixed (`/automate`) |

---

## Top improvements now implemented

### ✅ 1. Live AI feed aggregator
`scripts/aggregate-live-feed.mjs` is a dependency-free, fault-tolerant build-time
aggregator pulling newest posts from primary sources. It writes
`src/data/liveFeed.generated.json`, normalises links to HTTPS, dedupes, sorts and
caps the feed. A dead source is logged and skipped; if every source is
unreachable, the committed snapshot is kept rather than overwritten.

### ✅ 2. Standardised content schemas + validator
`src/lib/liveFeedData.ts` gives the app a typed loader. `scripts/audit-freshness.mjs`
enforces live-feed schema, freshness and link hygiene, so a stale or malformed
feed becomes visible before deploy.

### ✅ 3. Freshness & staleness audit
`audit:static` now includes the freshness gate. This protects the site from the
quiet decay that makes daily AI sites feel abandoned.

### ✅ 4. Live Feed page
`/live` is a category-filterable feed with source badges, relative timestamps,
reduced-motion support and DataFeed JSON-LD.

### ✅ 5. Command-center homepage
The hero now positions Sintra as **the operating map for AI work** rather than a
plain library. It shows live signals, workflow blueprints and use-case counts,
then guides users toward live intelligence, automation and the full map.

### ✅ 6. Cinematic AI Stack Journey
`AIStackJourney.tsx` adds the downward scroll concept: Signal → Meaning →
Automation → Decision → Mastery → Trust. The motion is deliberately tied to the
information architecture, so the animation clarifies how Sintra works instead of
becoming decoration.

### ✅ 7. Automation Hub
`/automate` elevates AI automation into a first-class destination. It includes
the Sense → Reason → Act → Learn operating loop, reusable workflow blueprints,
the automation stack, and guardrails for safe execution.

### ✅ 8. Homepage live + automation previews
The homepage now shows both the live frontier feed and a preview of the
Automation Hub. This makes the front page feel like a working AI cockpit rather
than a catalogue.

### ✅ 9. Outbound feeds and SEO
`feed.xml` and `feed.json` are generated. `/live` and `/automate` have metadata,
canonical URLs and structured data.

### ✅ 10. Search and tests updated
Automation workflows are part of the global search index. Tests now guard the
Automation Hub data and the command-center homepage wiring.

---

## How the daily/weekly update works now

1. **Every build** (`prebuild`): `aggregate-live-feed.mjs` refreshes the live
   feed → `generate-rss.ts` writes `feed.xml` + `feed.json` → use-case count.
2. **Daily news** (`/update-news`): append to `LATEST_AI_NEWS` in
   `newsLatestData.ts` (wins over the historical archive via `newsDataCombined`).
3. **Weekly** (Monday): update `THIS_WEEK` in `featuredData.ts`; archive the
   previous week.
4. **Automation updates**: add reusable workflow patterns to `automationData.ts`;
   tests enforce safe IDs, links, steps and stack examples.
5. **Gate**: `npm run audit:static` runs validate-data + validate-content +
   **audit:freshness** + tests + typecheck before any deploy.

Run `npm run check` for the full validate-and-build; `npm run aggregate-feed`
to refresh the live feed on demand.

> **Deployment note:** `.github/workflows/deploy.yml` builds and publishes
> `dist/` to `gh-pages` on every push to `main` and daily at 06:00 UTC — each run
> re-fetches the live feed on GitHub's networked runners. The manual gh-pages
> plumbing remains a fallback only.
