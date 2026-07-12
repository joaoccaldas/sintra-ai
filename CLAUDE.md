# Sintra Tesseract — Claude Code Context

## Project overview

Static Next.js 15 site deployed to GitHub Pages via `gh-pages` branch.
All content lives in TypeScript data files under `src/lib/` and `src/data/`.
Build: `npm run build` → output in `dist/`.
Check (validate + typecheck + build): `npm run check`.

**Current counts (Jul 2026):** 253 use cases · 445+ curated news items (509+ incl. historical archive) · 74 tools · 20 models · 54 concepts · 4 learning paths · 52 resources · 11 guides · 18 topic hubs (1 with a full playbook) · 70+ history milestones · 40–60 live-feed items (regenerated per build)

**IMPORTANT — verify counts before trusting this file.** This doc is hand-maintained and *will* drift from reality between edits. Before relying on any count or structural claim here, spot-check it: `npx tsx scripts/validate-content.ts` prints the authoritative current counts, and `git log --oneline -20` shows what's actually landed recently. Treat this file as a map, not a guarantee — the same discipline applies to any AI-authored documentation, this one included.

---

## Daily news update task

> **Scheduled daily updates run `/update-news`** (`.claude/commands/update-news.md`),
> which appends new items to **`LATEST_AI_NEWS` in `src/lib/newsLatestData.ts`**
> (the curated feed that wins over the historical archive via
> `newsDataCombined.ts`), gates on `npm run check`, deploys, and opens a GitHub
> issue on any failure. New daily items go in `newsLatestData.ts`, not the
> historical `newsData.ts`. The manual procedure below documents the schema and
> still applies for ad-hoc edits to the historical archive.
>
> **`/manage-sintra`** (`.claude/commands/manage-sintra.md`) is the broader
> reference skill — full structure, every schema, how to update each content
> type. **`/update-sintra`** (`.claude/commands/update-sintra.md`) runs news +
> use-case updates end to end, deploys, and verifies the live site actually
> matches what was just shipped — use it instead of the manual procedure below
> when you want the whole loop automated.

When asked to update the news, follow this procedure exactly:

### 1. Check what's already in the database

Read `src/lib/newsData.ts` and collect all existing `id` values.
The most recent `dateNum`/`dateDay` tells you how far the database extends.
**Always grep for key terms before adding** — many items that look new are already present.

```bash
grep -i "claude opus 4.8\|your search term" src/lib/newsData.ts
```

### 2. Search for new AI events

Search the web for significant AI news since the most recent item.
Focus on:
- New model releases or major updates (Claude, GPT, Gemini, LLaMA, Mistral, DeepSeek, Grok…)
- Record benchmark scores (SWE-bench, GPQA, ARC-AGI, MMLU, AIME…)
- Major product launches: agents, APIs, tools
- Key industry events: acquisitions, funding rounds, partnerships, policy
- Brazil-specific AI news (tag `country: "BR"`)
- Sweden-specific AI news (tag `country: "SE"`)

Only include events that are **real and verifiable** — check an official source.
Skip anything speculative or already in the database.

### 3. Add new items

Append `NewsItem` objects to `AI_NEWS` in `src/lib/newsData.ts`, before the closing `];`:

```ts
  {
    id: "kebab-case-unique-id",      // globally unique across all items
    date: "May 2026",                // "Mon YYYY"
    dateNum: 202605,                 // YYYYMM — primary sort key
    dateDay: 28,                     // optional: day for intra-month ordering
    title: "Concise factual title",
    summary:
      "2–3 sentences. Factual. Include specific numbers/benchmarks. No hype.",
    tags: ["Company", "ModelName", "Feature"],
    significance: "landmark" | "major" | "notable",
    provider: "Company Name",
    providerColor: "#hexcolor",
    url: "https://official-announcement-url",
    country: "BR",                   // optional: "BR" or "SE" for regional items
    why_it_matters: "...",           // optional practitioner insight
    what_to_try: "...",              // optional action
  },
```

**Provider colors:**
OpenAI `#10a37f` · Anthropic `#d97706` · Google `#4285f4` · Meta `#0866ff`
Microsoft `#0078d4` · Apple `#555555` · Mistral AI `#ff7000` · DeepSeek `#1a73e8`
xAI `#000000` · Nvidia `#76b900`

**Significance guide:**
- `landmark` — changes the trajectory of the field (≤3 per year)
- `major` — significant event practitioners should know about
- `notable` — worth tracking but not world-changing

### 4. Verify the build

```bash
npm run build   # also regenerates public/feed.xml, public/feed.json, public/llms*.txt, public/api/*.json
```

### 5. Commit news files only

```bash
git add src/lib/newsData.ts public/feed.xml public/feed.json
git commit -m "chore: news update $(date -u +%Y-%m-%d)"
git push
```

Do **not** commit `dist/` — deployment is handled separately via git plumbing.

---

## Machine-readable / agent-facing layer (added Jul 2026)

Sintra is built to be queried by AI agents, not just read by people. Everything
below is a **static file generated at build time** — there is no backend, so
"API" here means a pre-built JSON file at a stable URL, not a live endpoint.

- **`scripts/generate-llms-txt.ts`** writes `public/llms.txt` (a curated,
  linked index — one line per concept/guide/topic) and `public/llms-full.txt`
  (full text of every concept, guide, and topic playbook concatenated). Follows
  the [llms.txt convention](https://llmstxt.org). Deliberately does **not**
  dump news/tools/models/use-cases — those change too often and already have
  JSON endpoints; llms-full.txt covers the stable "knowledge" content only.
- **`scripts/generate-api-json.ts`** writes `public/api/{concepts,topics,guides,tools,models,use-cases}.json`
  — a fetchable JSON mirror of every content type, each wrapped with
  `{ source, siteUrl, generatedAt, count, data }`. `use-cases.json` carries
  metadata + outcome only (not full prompt text) to stay a reasonable size —
  the full prompt lives in each item's own `/prompts/{slug}/` page as `HowTo`
  JSON-LD.
- **`TopicPlaybook`** (`src/lib/topicHubs.ts`) — an optional field on
  `TopicDef`: `whatItIs`, `designPrinciples`, `recommendedStack`,
  `bestUseCases`, `commonPitfalls`, `tips`. This is what makes a topic
  *actionable* rather than just an aggregation of prompts/news/tools/concepts
  matched by tag. **Only `generative-ui` has one populated as of Jul 2026** —
  the other 17 topics are aggregation-only. Populating more is straightforward
  (add a `playbook` object to the `TopicDef` in `TOPIC_HUBS`) but is real
  writing work, topic by topic — don't assume it's done without checking
  `grep -c "playbook:" src/lib/topicHubs.ts`.
- **`src/app/topics/[tag]/page.tsx`** emits `TechArticle` + `DefinedTerm` +
  `ItemList` (×4, one per playbook list) + `HowTo` (tips) JSON-LD when a
  playbook exists. Verify with a raw HTML fetch, not a markdown-converting
  tool (WebFetch strips `<script>` tags during HTML→markdown conversion and
  will falsely report no structured data — `curl` the page and `grep` for
  `TechArticle`/`DefinedTerm` instead).
- **`/agents/`** (`src/app/agents/page.tsx`) — documentation of all of the
  above, written for the agent reading it, with a worked "find generative UI"
  example. Update this page's endpoint table if you add or remove a JSON
  endpoint.
- **`robots.ts`** explicitly allow-lists named AI agent user-agents (GPTBot,
  ClaudeBot, PerplexityBot, Google-Extended, etc.) in addition to the `*`
  wildcard — documents intent even though the wildcard already covers it.
- Both generator scripts are wired into `prebuild`, after
  `generate-use-cases-count.ts` (they depend on `USE_CASES_COUNT`) — see
  `package.json`.

---

## Data files map

| File | Export | Count | Update cadence |
|------|--------|-------|----------------|
| `src/lib/newsData.ts` (historical) + `src/lib/newsLatestData.ts` (curated) → `src/lib/newsDataCombined.ts` | `AI_NEWS` | 445+ curated / 509+ total | Daily (curated feed) |
| `src/lib/toolsData.ts` | `AI_TOOLS` | 74 tools | Weekly |
| `src/lib/learningPathsData.ts` | `LEARNING_PATHS` | 4 paths | Monthly |
| `src/lib/resourcesData.ts` | `RESOURCES` | 52 resources | Weekly |
| `src/lib/claudeData.ts` | various | — | On Anthropic release |
| `src/lib/concepts.ts` | `CONCEPTS` | 54 concepts | As new concepts emerge |
| `src/lib/timelineData.ts` | `MILESTONES`, `ERAS` | 70+ events | Quarterly |
| `src/lib/videoData.ts` | `AI_VIDEOS` | — | As notable videos appear |
| `src/lib/collections.ts` | `COLLECTIONS` | — | When curating new kits |
| `src/lib/aiLabsData.ts` | `AI_LABS` | — | On new lab launch or major change |
| `src/lib/topicHubs.ts` | `TOPIC_HUBS` (incl. optional `playbook`) | 18 topics | As new themes emerge / playbooks get authored |
| `src/data/useCases.json` | (via `src/lib/data.ts`) | 253 use cases | Ongoing |
| `src/data/liveFeed.generated.json` | (via `src/lib/liveFeedData.ts`) | 40–60 items | Every build (auto) |
| `src/lib/featuredData.ts` | `THIS_WEEK` / `WEEKLY_ARCHIVE` | 4 picks/week | Weekly (Monday) |
| `public/llms.txt`, `public/llms-full.txt`, `public/api/*.json` | — | generated | Every build (auto, see above) |

### Live feed pipeline (auto, every build)

- **`scripts/aggregate-live-feed.mjs`** (runs first in `prebuild`) pulls ~11
  primary sources (DeepMind, OpenAI, Google AI, Hugging Face, arXiv cs.AI,
  BAIR, MIT Tech Review, TechCrunch AI, VentureBeat AI, Simon Willison,
  Hacker News), normalises + https-upgrades + dedupes + caps, and writes
  `src/data/liveFeed.generated.json`. Fault-tolerant: dead sources are skipped;
  if *all* sources fail (egress-blocked sandbox), the previous committed
  snapshot is kept rather than overwritten. Surfaced at **`/live`** and the
  homepage "Live from the frontier" strip.
- **`scripts/audit-freshness.mjs`** (in `npm run audit:static`) gates on live
  feed schema + freshness (<48h warn), weekly-picks staleness (<14d warn), and
  BASE_PATH link hygiene in editorial files.
- **`scripts/generate-rss.ts`** emits both `public/feed.xml` (RSS 2.0) and
  `public/feed.json` (JSON Feed 1.1) from the combined news feed.

---

## Key constraints

- **Static export** (`output: 'export'`). No server-side code, no API routes, no runtime fetch. "JSON API" (`/api/*.json`) means pre-built static files, not a live backend.
- **`BASE_PATH = "/sintra-ai"`** — all internal links must use this prefix via `import { BASE_PATH } from "@/lib/constants"` (re-exported from `@/lib/data` too, but prefer `constants` directly — see below).
- **Tailwind literal strings** — no dynamic class construction (`text-${color}-500` is invisible to the purger).
- **`.btn` + `hidden` conflict** — `.btn` CSS has higher specificity than Tailwind `hidden`. Never combine them; use conditional rendering.
- **`dist/` is never committed** — only deployed to `gh-pages` via git plumbing.
- **No branch protection on `main` as of Jul 2026** — a broken build can merge and deploy silently (this happened: a homepage redesign broke typecheck/build and shipped failing CI for ~10 commits before anyone noticed). Until this is fixed at the repo settings level, treat every push to `main` as production and run `npm run check` locally first, every time, no exceptions.

---

## Shared helpers & patterns worth knowing

- **`getLatestNewsDate()`** (`src/lib/newsData.ts`) — returns the most recent
  `AI_NEWS` item's date formatted as `"9 Jun 2026"` (falls back to the raw
  `date` string if `dateDay` is missing). Used for the "News updated …" /
  "Updated …" freshness badges in `ContentNav.tsx` and `AINewsPage.tsx`.
  Reuse this instead of hardcoding a date anywhere a "last updated" label is
  needed.
- **Lazy Fuse.js index** (`src/lib/searchIndex.ts`) — `getFuse()` builds the
  `Fuse` instance on first non-empty query instead of at module load, so the
  search index isn't constructed on every page load (only when ⌘K /
  `UniversalSearch` is actually used). **Known gap:** `CommandPalette.tsx`
  (mounted inside `Header.tsx`, which renders on every route) still does a
  top-level `import { USE_CASES } from "@/lib/data"`, which pulls the full
  455 KB `useCases.json` into every page's bundle regardless of whether that
  page needs it — this predates the Jul 2026 changes and is unfixed. Fixing it
  means giving the command palette its own lazily-built index, mirroring the
  pattern `searchIndex.ts` already uses elsewhere, instead of importing the
  raw dataset.
- **`/news` JSON-LD** (`src/app/news/page.tsx`) — emits a schema.org
  `ItemList`/`NewsArticle` block for the 20 most recent items via
  `newsJsonLd()`. Keep this in sync if `AI_NEWS`'s shape changes.

- **`src/lib/useCasesCount.generated.ts`** — `USE_CASES_COUNT`, written by
  `scripts/generate-use-cases-count.ts` on every `npm run prebuild`. Routes
  that only need the prompt count for `Header total={...}` (e.g. `/news`,
  `/topics`, `/claude`, `/models`) import this instead of `USE_CASES`, so they
  don't pull `src/data/useCases.json` into their bundle just to read `.length`.
- **`src/lib/constants.ts`** — side-effect-free types/helpers (`BASE_PATH`,
  `UseCase`, `Category`, `Difficulty`, `DIFF_COLOR`, `CAT_ACCENT`,
  `matchesUseCase`, `slugify`, …) split out of `src/lib/data.ts`. `data.ts`
  re-exports everything from `constants.ts` via `export * from "./constants"`
  for backward compatibility, but components that don't need `USE_CASES`
  itself (e.g. `Header.tsx`, `Footer.tsx`, `NewsTicker.tsx`, `AINewsPage.tsx`)
  should import from `@/lib/constants` directly.
- **`src/lib/topicHubs.ts`** — same split applied to `src/lib/topicsData.ts`:
  `TOPIC_HUBS`, `TopicDef`, `TopicPlaybook`, and `tagToTopicSlug` (used by
  `AINewsPage.tsx`, `ExpandedCard.tsx`, `app/sitemap.ts`, `generate-llms-txt.ts`,
  `generate-api-json.ts`) live here and don't need `USE_CASES`. `topicsData.ts`
  re-exports them via `export * from "./topicHubs"` and keeps only
  `getTopicContent` (which does filter `USE_CASES`).
- **`LibraryTeaser.tsx`** (homepage) — deliberately hardcodes 6 featured
  prompts instead of importing `@/lib/data`, for the same bundle-size reason
  as above. If you change the featured picks, verify the `slug`/`category`/
  `difficulty` values against the real, running-derived `USE_CASES` output
  (not the raw `useCases.json`, whose `category`/`slug` fields are recomputed
  by `data.ts` at load time) — see the pattern in git history
  (`scripts` used a one-off `tsx` script importing `data.ts` directly to
  confirm real values before hardcoding).

### Fixed: `USE_CASES`/`useCases.json` leaking into unrelated bundles

Both splits above existed because TS/webpack treats a module with top-level
side-effect computation (`USE_CASES = rawData.map(...)`) as monolithic —
importing *any* export from `data.ts` (even just `BASE_PATH`) pulled the
whole use-case dataset into the bundle. Since `Header.tsx` and `AINewsPage.tsx`
are used on nearly every page, this inflated First Load JS across the board.
After the `constants.ts`/`topicHubs.ts` extraction: `/news` dropped
488 kB → 304 kB, `/collections` and `/topics/[tag]` dropped 541 kB → 337 kB.
Pages that legitimately render prompt data (`/`, `/weekly`,
`PromptLibrarySection`-based routes) are unchanged. **This fix is partial** —
see the `CommandPalette.tsx` gap noted above; it re-introduces the same
problem site-wide via `Header.tsx`. When adding new shared helpers, default
to putting side-effect-free code in `constants.ts` / `topicHubs.ts` rather
than back in `data.ts` / `topicsData.ts`.

---

## Page patterns

### Client component with SEO metadata
Next.js prohibits `export const metadata` in `"use client"` files.
Pattern for interactive pages that need OG/Twitter tags:

```
src/app/your-route/
  page.tsx              ← server component: exports metadata, renders <YourRouteClient />
  YourRouteClient.tsx   ← "use client": all interactive UI
```

Working examples: `src/app/concepts/`, `src/app/ai-history/`, `src/app/google-ai-tools/`, `src/app/topics/[tag]/`

### Mobile vs desktop components
Use `useSyncExternalStore` for responsive switching without hydration mismatch:

```ts
function useIsMobile() {
  return useSyncExternalStore(
    cb => {
      const mq = window.matchMedia("(max-width: 767px)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,   // server snapshot
  );
}
```

Used across the codebase (e.g. `Header.tsx`, `HeroMinimal.tsx`) to branch
rendering by viewport without a hydration mismatch.

### Deployment sequence
```bash
npm run build
git fetch origin gh-pages
TREE=$(git --work-tree=dist add -f -A && git --work-tree=dist write-tree)
PARENT=$(git rev-parse refs/remotes/origin/gh-pages)
COMMIT=$(echo "deploy: $(date -u +%Y-%m-%d)" | git commit-tree $TREE -p $PARENT)
git push origin $COMMIT:refs/heads/gh-pages
git reset HEAD   # clean up the index
```

A GitHub Action (`.github/workflows/deploy.yml`, "Build & Deploy") also runs
this automatically on every push to `main` — check its status
(`gh api` or the Actions tab) before assuming a push shipped. **It has failed
silently before** (see the "No branch protection" note above); don't trust
that a push went live without checking the Action result or `gh-pages`'s
latest commit message.

---

## Component overview (key files)

| Component | Purpose |
|-----------|---------|
| `SidebarNav.tsx` | **The primary navigation chrome** — permanent left rail on desktop (`lg:` and up), collapsible, with Discover / Learn / Reference groups; becomes a slide-out drawer on mobile. Also hosts the theme switcher (dark/light/forest/ocean). |
| `Header.tsx` | Top bar next to the sidebar on desktop (search, saved prompts, language toggle) — collapses to a hamburger + logo + those same controls on mobile, where the sidebar is hidden. **Do not** re-add a logo/wordmark here at `lg:` and up — the sidebar already shows it; duplicating it was a real bug shipped and fixed in Jul 2026. |
| `HeroMinimal.tsx` | Full-screen hero — parallax violet bloom (CSS gradient), scroll-driven fade, stat tiles, news ticker. Its own scroll-linked opacity logic means a naive full-page screenshot mid-scroll can make it look blank — that's a capture artifact, not a bug; verify with a fresh unscrolled load. |
| `ContentNav.tsx` | Homepage content below the hero: `IntentNav` (the one on-page "how the site is organized" recap — Track/Automate/Learn/Build), `ThisWeekHub` (editorial picks + latest news, tabbed), `LiveStrip`, `LibraryTeaser` (6 featured prompts + link to `/library/`), `NewsletterCTA`. Trimmed in Jul 2026 from a much longer page — see "Recent architecture changes" below before re-adding a full-width section here. |
| `PromptLibrarySection.tsx` | The full, searchable/filterable prompt library — category rail, search, difficulty filter + sort, paginated card grid. Lives at the dedicated **`/library/`** route (`src/app/library/page.tsx`), not embedded in the homepage. |
| `LibraryTeaser.tsx` | Homepage-only: 6 hardcoded featured prompts (not a `USE_CASES` import — see bundle-size note above) linking out to `/library/`. |
| `ExpandedCard.tsx` | Prompt detail slide-up panel with related-prompts rail; hosts the "Try free" runner. |
| `PromptRunner.tsx` | "Try free — no login" menu: copies the filled prompt to the clipboard, then deep-links to free, no-login AI tools (`src/lib/freeAiRunners.ts` — Perplexity/DuckDuckGo prefill via `?q=`, LMArena/Perchance are paste-based). No backend, API key, or account. Mounted in `ExpandedCard.tsx` and `app/prompts/[slug]/PromptPageClient.tsx`, beside the login-required `launchInAI` deep link. |
| `CommandPalette.tsx` | ⌘K unified search across all content types (Fuse.js). See the bundle-size gap noted above — it imports `USE_CASES` directly rather than lazily. |
| `UniversalSearch.tsx` | Inline search results on landing page (same index as ⌘K). |
| `PersonaEntry.tsx` | Role-based entry routing (routes `sintra:persona` custom event). |
| `FeaturedCollections.tsx` | Curated prompt collections with expandable panels. |
| `AIHistoryTimeline.tsx` | Three.js interactive timeline (full-screen, desktop-heavy). |
| `NewsTicker.tsx` | Horizontal scrolling news ticker pinned to hero bottom (110s loop, pauses on hover, duplicated set marked `aria-hidden`). |
| `TopicHubClient.tsx` (`src/app/topics/[tag]/`) | Renders a topic hub: the `PlaybookSection` (when `topic.playbook` exists) first, then aggregated prompts/news/tools/concepts by tag match. |

### Orphaned components (not imported anywhere — verify before editing)

These files exist in `src/components/` but are not referenced by any page or
other component (confirmed via `grep -rn "<name>" src/`). They're kept for
potential future use but receive **zero traffic** on the live site — don't
spend time polishing them, and don't assume CLAUDE.md history that calls
them "active" is current:

- `ThePulse.tsx` — tabbed "AI Signals · New Prompts · Learn" module, never mounted
- `CategoryBrowser.tsx` — an earlier standalone version of the prompt library.
  Superseded by `PromptLibrarySection.tsx` (now hosted at `/library/`, and
  teased on the homepage via `LibraryTeaser.tsx`), which owns the category
  rail, search, filter, and sort UI. Apply library UI changes to
  `PromptLibrarySection.tsx`, not this file.
- `FeaturedThisWeek.tsx` — an earlier version of `ContentNav.tsx`'s
  `ThisWeekHub`. Still references a dead `#library` anchor; don't fix that
  in isolation, it's dead code — either delete it or replace it wholesale
  if it's ever revived.

`CategoryCarousel3D.tsx`, `Tesseract3D.tsx`, and `ParticleVortex.tsx` (the old
Three.js category carousel, ~480kB) were removed entirely — the flat grid in
`PromptLibrarySection.tsx` replaced it, and the only thing worth keeping
(`CAROUSEL_ITEMS`) already lives in `src/lib/carouselData.ts`. If a 3D
carousel is wanted again, write it fresh against `carouselData.ts` rather
than restoring these files. `AIStackJourney.tsx` (a 6-layer scroll-story
homepage section, added and removed within Jul 2026 without ever
successfully deploying — see below) was deleted outright rather than left
orphaned, since it never shipped live.

---

## Recent architecture changes (Jul 2026) — read this before touching the homepage or nav

A homepage redesign ("command center" sidebar) landed on `main` in a broken
state — `layout.tsx` importing named exports `SidebarNav.tsx` no longer
provided, a `Set.length` vs `.size` typo, a context method name mismatch —
and shipped **~10 failing/cancelled CI runs in a row** before anyone noticed,
because there was no branch protection requiring the build to pass. Fixed,
then the homepage itself was found to be carrying three redundant
"here's how the site is organized" sections at once (the sidebar,
a 6-layer `AIStackJourney` scroll story, and `IntentNav`'s 4-pillar grid) —
`AIStackJourney` was cut, `StatsBar` (redundant with the hero's own stat
tiles) was cut, and three one-per-content-type teaser modules
(`AutomationPreview`, `TodayInHistory`, `LearningPathsStrip`) were cut in
favor of keeping only the two highest-value/most-frequently-updated ones
(`ThisWeekHub`, `LiveStrip`). The full prompt library moved off the homepage
entirely to a new `/library/` route, replaced by `LibraryTeaser`'s 6-card
preview. Separately, a machine-readable/agent-facing layer was added
(see above) with `generative-ui` as the one fully-populated topic playbook.

**Before making further homepage or nav changes**, check `git log --oneline`
for this period's commits and read the diffs — this file summarizes the
*current state*, but the commit messages explain the *reasoning*, which
matters if you're deciding whether to re-add something that was cut.
