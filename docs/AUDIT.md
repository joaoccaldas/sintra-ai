# Sintra AI — Audit & Top 10 Improvements

_Audit date: 6 Jul 2026 · Scope: full webapp review, bug hunt, schema standardisation, and a roadmap to make Sintra the one-stop shop for AI._

The site is already a mature Next.js 15 static export with a strong design
system (4 themes, CSS-variable tokens, framer-motion), robust content
validation, and a well-documented daily-news workflow. This audit builds on that
foundation rather than reworking it. Improvements 1–9 below are **implemented and
verified** in this pass (full `next build` + `npm run audit:static` green);
#10 is scoped for the next pass.

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

---

## Top 10 improvements

### ✅ 1. Live AI feed aggregator (the headline feature)
`scripts/aggregate-live-feed.mjs` — a dependency-free, fault-tolerant build-time
aggregator pulling the newest posts from ~11 primary sources (Google DeepMind,
OpenAI, Google AI, Hugging Face, arXiv cs.AI, BAIR Berkeley, MIT Tech Review,
TechCrunch, VentureBeat, Simon Willison, Hacker News). Output is normalised,
https-upgraded, deduped, date-sorted, and capped, written to
`src/data/liveFeed.generated.json`. Runs in `prebuild`, so every deploy ships a
fresh snapshot with **zero runtime fetch** (respecting the static-export
constraint). A dead source is logged and skipped — never a broken build; if
every source is unreachable (egress-blocked CI), the previous committed
snapshot is kept rather than overwritten.

### ✅ 2. Standardised content schemas + validator
`src/lib/liveFeedData.ts` gives the app a typed loader (`LiveFeedItem`,
`LIVE_ITEMS`, `liveAge`, `liveFeedAgeHours`). `scripts/audit-freshness.mjs`
enforces the live-feed schema (id/title/https-url/ISO-date/source/category) so a
malformed feed can never ship. This is the standardised daily-update contract.

### ✅ 3. Freshness & staleness audit
`scripts/audit-freshness.mjs` (wired into `audit:static`) gates on: live feed
non-empty + fresh (<48h), weekly picks not stale (<14d), and base-path link
hygiene. Catches the exact failure modes that quietly degrade a "daily" site.

### ✅ 4. Live Feed page — clean, animated, professional
`/live` (`LiveFeedPage.tsx`): a category-filterable feed with source badges,
relative timestamps, a pulsing LIVE indicator, staggered scroll-reveal
animation, empty-state, and full reduced-motion support — built entirely in the
existing void/violet/Cormorant design language.

### ✅ 5. Homepage "Live from the frontier" strip
The 5 freshest posts render on the landing page (`ContentNav` → `LiveStrip`),
linking through to `/live`. Wired into the sidebar nav (Radio icon) and header
breadcrumb; the RSS CTA now also links to the live feed.

### ✅ 6. Outbound feed surface expanded
`generate-rss.ts` now emits **both** `feed.xml` (RSS 2.0) and `feed.json`
(JSON Feed 1.1). `/live` and the feeds are in the sitemap and page metadata.

### ✅ 7. Weekly picks refreshed + self-healing
`THIS_WEEK` refreshed with verified 6 Jul 2026 news (Sonnet 5 default, Fable 5
restored, White House frontier standards); the prior week archived. The
freshness audit stops it from silently ageing again.

### ✅ 8. Documentation synced to reality
`CLAUDE.md` counts corrected, live-feed pipeline documented, data-file map
updated. `USE_CASE_SCHEMA.md` domain table reconciled with the validator and the
dead component reference removed.

### ✅ 9. Discoverability / SEO
`/live` carries a schema.org `DataFeed` JSON-LD block and canonical + RSS
alternates; added to `sitemap.ts` with an `hourly` change frequency.

### ⏳ 10. Accessibility & performance pass (next)
Recommended next: automated contrast + keyboard-focus audit across the new
surfaces, `next build` bundle-budget check in CI, and a decision on B7
(category accent colours — unify intentionally or restore per-category signal).

---

## How the daily/weekly update works now

1. **Every build** (`prebuild`): `aggregate-live-feed.mjs` refreshes the live
   feed → `generate-rss.ts` writes `feed.xml` + `feed.json` → use-case count.
2. **Daily news** (`/update-news`): append to `LATEST_AI_NEWS` in
   `newsLatestData.ts` (wins over the historical archive via `newsDataCombined`).
3. **Weekly** (Monday): update `THIS_WEEK` in `featuredData.ts`; archive the
   previous week.
4. **Gate**: `npm run audit:static` runs validate-data + validate-content +
   **audit:freshness** + tests + typecheck before any deploy.

Run `npm run check` for the full validate-and-build; `npm run aggregate-feed`
to refresh the live feed on demand.

> **Deployment note:** `.github/workflows/deploy.yml` (added by the project
> owner, 7 Jul 2026) builds and publishes `dist/` to `gh-pages` on every push
> to `main` and daily at 06:00 UTC — each run re-fetches the live feed on
> GitHub's networked runners. The scheduled Claude task (`/update-news`)
> curates news and pushes to `main`, which triggers that deploy; the manual
> gh-pages plumbing remains as a fallback only.
