---
description: Reference skill for managing Sintra AI — full site structure, every content schema, and how to update each section. Load this when you need to add/edit content or aren't sure where something lives.
---

# Managing Sintra AI

Sintra AI (repo: `sintra-ai`, deployed at `joaoccaldas.github.io/sintra-ai`) is
a **static Next.js 15 export** — no backend, no database, no runtime API.
Every piece of content is a TypeScript object in a data file under `src/lib/`
or `src/data/`, compiled into static HTML/JSON at build time and pushed to
the `gh-pages` branch. If you take one thing from this doc: **there is no
"save" — there is only "edit the data file, validate, build, commit, push,
deploy."**

This skill is self-contained (assumes no prior context), but `CLAUDE.md` at
the repo root has the same information plus session-specific history —
read that too if it's available, and prefer it over this file if the two
disagree (this file is the portable/downloadable copy; `CLAUDE.md` is the
one that actually gets updated as the codebase changes).

## Before you touch anything

```bash
npx tsx scripts/validate-content.ts   # prints real current counts for every content type
git log --oneline -20                 # what actually landed recently
```

Don't trust any count or structural claim in documentation (including this
one) without checking. Docs drift; the validator and git history don't.

---

## Site structure

```
src/app/                    ← Next.js App Router — one folder per route
  page.tsx                  ← homepage: Header + HeroMinimal + ContentNav + Footer
  library/page.tsx          ← full searchable prompt library (PromptLibrarySection)
  agents/page.tsx           ← machine-readability docs for AI agents
  topics/[tag]/page.tsx     ← topic hubs (aggregated content + optional playbook)
  prompts/[slug]/page.tsx   ← individual prompt pages (HowTo JSON-LD)
  concepts/[slug]/page.tsx  ← individual concept pages (DefinedTerm JSON-LD)
  guides/[slug]/page.tsx    ← individual guide pages (Article + FAQPage JSON-LD)
  news/, tools/, models/, ai-history/, ai-labs/, learn/, resources/,
  videos/, weekly/, live/, automate/, research/, collections/,
  token-calculator/, claude/, google-ai-tools/  ← one route per content type

src/components/             ← React components
  SidebarNav.tsx             ← THE primary nav — permanent left rail (desktop),
                               drawer (mobile). Discover / Learn / Reference groups.
  Header.tsx                 ← topbar beside the sidebar (search, saved, language)
  ContentNav.tsx              ← homepage body: IntentNav, ThisWeekHub, LiveStrip,
                               LibraryTeaser, NewsletterCTA
  [Content]Card.tsx, [Content]Page.tsx  ← one pair per content type, generally

src/lib/                    ← all content data + types + helpers
src/data/                   ← large generated/JSON content (useCases.json, liveFeed.generated.json)
scripts/                    ← build-time generators + validators (see below)
public/                     ← static assets + generated feeds/API JSON
```

**Navigation is duplicated by design, not by accident** — the sidebar (always
visible on desktop), `IntentNav` (a compact recap on the homepage), and each
`/topics/{slug}/` hub all point at the same underlying content through
different lenses. If you're tempted to add a *fourth* "here's how the site is
organized" section, don't — this was cut down from three overlapping ones in
Jul 2026 specifically because it was too much. See `CLAUDE.md`'s "Recent
architecture changes" section for what was cut and why.

---

## Content types — schema and how to add one

For each type: where the data lives, the TypeScript shape, and the concrete
steps to add an item. After adding to **any** of these, always run
`npm run check` before committing.

### News — `src/lib/newsLatestData.ts` (daily) / `src/lib/newsData.ts` (historical)

```ts
{
  id: "kebab-case-unique-id",       // unique across BOTH files
  date: "Jul 2026",  dateNum: 202607,  dateDay: 10,   // dateNum is the sort key
  title: "Concise factual title",
  summary: "2-3 factual sentences with real numbers. No hype.",
  tags: ["Company", "Topic"],
  significance: "landmark" | "major" | "notable",     // landmark: ≤3/year
  provider: "Company Name",  providerColor: "#hexcolor",
  url: "https://official-source",                     // must be verifiable
  why_it_matters: "one practitioner-insight sentence", // optional
  what_to_try: "one actionable sentence",              // optional
  country: "BR" | "SE",                                // optional, regional only
}
```
Daily items go in `newsLatestData.ts`'s `LATEST_AI_NEWS` array — it wins over
the historical archive via `newsDataCombined.ts`. Never invent or pad; skip
the day if there's nothing genuinely new and verifiable. Use `/update-news`
or `/update-sintra` for the full researched-and-gated procedure.

### Use cases / prompts — `src/data/useCases.json`

```ts
{
  domain: "Finance & FP&A",  section: "...",           // groups shown in the UI
  title: "...",  prompt: "...",  // the actual copy-paste prompt text
  skill_level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT",
  tags: [...],  best_for: "...",  outcome: "one sentence — what you get",
  inputs: [{ label: "..." }],  tools: ["Claude", "ChatGPT"],
  est_time: "30 minutes",  output_kind: "analysis"|"code"|"visual"|"spec"|"templates"|"table"|"deck"|"plan",
  sample_output: "realistic example output, not lorem ipsum",
  dateAdded: "2026-07-10",  related_tools: ["claude", "chatgpt"],
}
```
Validated by `scripts/validate-data.mjs` (schema) — domain must be one of a
fixed list (see the script for the current list), titles must be globally
unique. **Before adding a batch**, check whether similar content already
exists — this repo has twice ended up with near-duplicate use cases added
independently in the same area (once caught by dedup before merge, don't
assume it won't happen again). Grep by topic keyword, not just exact title.

### Concepts (glossary) — `src/lib/concepts.ts`

```ts
{
  id: "kebab-case",  term: "Full Display Name",  shortTerm: "ABBR",  // optional
  category: ConceptCategory,  tagline: "≤12 words, plain English",
  body: "~100-150 words, Markdown, **bold** key terms",
  analogy: "≤50 words, zero jargon, real-world comparison",
  icon: "🧠",  difficulty: 1 | 2 | 3,   // 1 anyone, 2 needs context, 3 technical
  related: ["other-concept-id", ...],   // 2-4 recommended
  addedAt: "2026-07-10",  learnMore: "https://...",  // optional
}
```
Individual pages at `/concepts/{id}/` emit `DefinedTerm` JSON-LD automatically
— no extra work needed there.

### Topic hubs & playbooks — `src/lib/topicHubs.ts`

```ts
{
  slug: "...",  label: "...",  icon: "◆",  color: "#hex",
  description: "one sentence",
  matchTags: ["tag1", "tag2"],   // case-insensitive partial match against
                                  // prompts/news/tools/concepts tags — this is
                                  // how the aggregated lists on the hub page
                                  // get populated, automatically
  playbook: {                    // OPTIONAL — only 1 of 18 topics has one (Jul 2026)
    whatItIs: "1-2 sentence real definition, no marketing language",
    designPrinciples: ["non-negotiable principle", ...],
    recommendedStack: ["specific tool/framework/model", ...],
    bestUseCases: ["concrete scenario", ...],
    commonPitfalls: ["specific failure mode seen in practice", ...],
    tips: ["small immediately-actionable tip", ...],
  },
}
```
A topic **without** a playbook is just an aggregation view (still useful —
it's a live filtered feed of everything tagged that way). A topic **with**
a playbook is an actionable brief an agent or person can act on directly —
see `/topics/generative-ui/` for the one fully worked example. Adding a
playbook is genuine writing work: be specific and technically accurate,
not generic ("use good practices" is worthless; "constrain generation to a
fixed component vocabulary, validate with Zod before render" is not).
Playbooks render via `PlaybookSection` in `TopicHubClient.tsx` and get
emitted as `TechArticle`/`DefinedTerm`/`ItemList`/`HowTo` JSON-LD in
`topics/[tag]/page.tsx`, and are included in `/llms.txt`, `/llms-full.txt`,
and `/api/topics.json` automatically on the next build — no extra wiring.

### Guides — `src/lib/guidesData.ts`

```ts
{
  id: "...",  slug: "...",  emoji: "⚡",  color: "#hex",
  title: "...",  tagline: "...",  estimatedRead: "8 min",
  level: "beginner" | "intermediate" | "advanced",
  sections: [{ heading: "...", body: "...", tip: "..." /* optional */ }],
  relatedLinks: [{ label: "...", href: "..." }],   // optional
}
```
Each section becomes both a page heading and a Q&A pair in the guide's
`FAQPage` JSON-LD — write `heading` as something a person would actually ask.

### Tools — `src/lib/toolsData.ts`

```ts
{
  id: "...",  name: "...",  tagline: "...",  description: "...",
  category: ToolCategory,  pricing: "free"|"freemium"|"paid"|"enterprise",
  priceNote: "...",  url: "https://...",  provider: "...",
  tags: [...],  status: "available"|"beta"|"waitlist",  highlight: "...",
}
```

### Models — `src/lib/modelsData.ts`

```ts
{
  id: "...",  name: "...",  apiId: "...",  provider: "...",  providerColor: "#hex",
  releaseDate: "Jul 2026",  releaseDateNum: 202607,
  tier: ModelTier,  contextWindow: 200 /* thousands */,  outputLimit: 8 /* thousands, or null */,
  inputPrice: 3.00,  outputPrice: 15.00,  priceNote: "...",  // USD/1M tokens, null if unknown
  mmlu: 88, gpqa: 75, sweBench: 70, mathAime: 90,           // 0-100, null if unreported
  multimodal: true,  extendedThinking: true,  webSearch: false,  codeExecution: true,  openSource: false,
  speed: ModelSpeed,  bestFor: ["coding", "..."],  highlight: "...",
  docsUrl: "https://...",  status: "available"|"preview"|"deprecated",  lastVerified: "2026-07-10",
}
```
Only fill in benchmark numbers you can verify against an official source —
`null` is correct and expected for anything unreported.

### AI Labs — `src/lib/aiLabsData.ts`
`{ id, name, tagline, emoji, color, type: "frontier"|"open-source"|"enterprise"|"specialized", founded, hq, website, focus: [...], description, models: [...], products: [...], api: { available, endpoint?, sdks? }, strengths: [...], useCases: [...] }`

### History milestones — `src/lib/timelineData.ts`
`{ id, era, year, yearNum, title, emoji, by?, desc, significance, tags: [...], links?: [{ label, url }] }`

### Learning paths — `src/lib/learningPathsData.ts`
`{ id, title, tagline, emoji, color, level, audience, totalDuration, steps: [{ type: "concept"|"use-case"|"tool"|"page"|"read", label, desc, href, duration, icon }] }`

### Resources — `src/lib/resourcesData.ts`
`{ id, name, tagline, url, category, tags: [...], free: boolean, highlight? }`

### Videos — `src/lib/videoData.ts`
`{ id, videoId, title, channel, summary, url, tags: [...], duration?, year? }`

### Collections — `src/lib/collections.ts`
`{ id, title, tagline, icon, color, category?, difficulty?, tag?, limit }` — a
**filter definition**, not a hand-picked list; it pulls matching use cases
live from `USE_CASES` by the given category/difficulty/tag at render time.

### Weekly picks — `src/lib/featuredData.ts`
`THIS_WEEK.items`: `{ type: "news"|"prompt"|"guide"|"tool"|"paper", title, why /* 1-sentence editorial voice */, href, badge?, badgeColor? }` — hand-curated, update every Monday, one of each type ideally.

---

## Validation & build pipeline

```bash
npm run validate-data      # scripts/validate-data.mjs — useCases.json schema
npm run validate-content   # validate-content.ts + validate-latest-news.ts — cross-content graph checks, prints real counts
npm run audit:freshness    # live feed schema + staleness, weekly-picks staleness, link hygiene
npm test                   # scripts/tests/*.test.ts
npm run typecheck          # tsc --noEmit
npm run build              # next build — also regenerates feeds, API JSON, llms.txt
npm run check              # audit:static (all of the above except build) + build — THE gate, run before every commit
```

If `npm run check` fails, **do not commit** — fix the failure or revert.
There is no branch protection enforcing this on `main` as of Jul 2026 (a real
gap — see `CLAUDE.md`), so this is a discipline you have to hold yourself to,
not something CI will catch for you before it's already live.

## Deployment

Push to `main` triggers `.github/workflows/deploy.yml` ("Build & Deploy")
automatically. **Verify it actually succeeded** — it has failed silently
before (~10 runs in a row once, unnoticed). If the Action isn't available or
you need to deploy manually:

```bash
npm run build
git fetch origin gh-pages
TREE=$(git --work-tree=dist add -f -A && git --work-tree=dist write-tree)
PARENT=$(git rev-parse refs/remotes/origin/gh-pages)
COMMIT=$(echo "deploy: $(date -u +%Y-%m-%d)" | git commit-tree $TREE -p $PARENT)
git push origin $COMMIT:refs/heads/gh-pages
git reset HEAD
```

Then verify: `git log --oneline -1 origin/gh-pages` should show a `deploy:`
commit referencing your just-pushed `main` SHA, and fetching the live URL
should reflect your change (WebFetch converts HTML to markdown and strips
`<script>` tags, so it will falsely report missing JSON-LD — use `curl` +
`grep` for structured-data checks instead).

## The agent-readability layer

Sintra is built to be queried by AI agents as well as read by people —
`/llms.txt`, `/llms-full.txt`, `/api/{concepts,topics,guides,tools,models,use-cases}.json`,
and schema.org JSON-LD on topic/concept/guide/prompt pages. Full detail in
`CLAUDE.md`'s "Machine-readable / agent-facing layer" section and in
`/agents/` itself (`src/app/agents/page.tsx`) — read the live page, it's
written to be the canonical explanation and kept current.

## Known technical debt (don't be surprised by these)

- **Bundle bloat**: `CommandPalette.tsx` (in `Header.tsx`, on every route)
  imports the full use-case dataset directly — every page ships ~460 KB it
  mostly doesn't need. Unfixed as of Jul 2026.
- **No branch protection**: pushes to `main` can fail CI and still be "live"
  in the sense that nothing blocks the merge — only the deploy step itself
  fails. Always run `npm run check` locally first.
- **Solo editorial pipeline**: content is AI-researched with human spot
  review, no named editorial team, no public methodology page yet.
