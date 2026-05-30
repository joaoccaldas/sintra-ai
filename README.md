# Sintra Tesseract

A one-stop AI knowledge base — prompts, news, tools, concepts, learning paths, and history — deployed as a static site on GitHub Pages.

**Live site:** https://joaoccaldas.github.io/sintra-ai/

> **For AI coding assistants:** This README is your primary reference. Every section has actionable commands and explicit rules. `CLAUDE.md` has the news-update procedure and AI-assistant-specific context.

---

## What's in the site

| Section | URL | Content |
|---------|-----|---------|
| Prompt library | `/` → `#explore` | 149 copy-ready AI templates across 9 categories |
| AI News | `/news/` | 220+ curated news items with significance tiers |
| Tools directory | `/tools/` | 55 AI tools with pricing and detail pages |
| Concepts | `/concepts/` | 30+ core AI concepts in plain English |
| Learning paths | `/learn/` | 4 structured paths from beginner to advanced |
| Resources | `/resources/` | 43 developer resources — APIs, frameworks, videos |
| AI History | `/ai-history/` | Interactive timeline of 70+ milestones since 1950 |
| AI Labs | `/ai-labs/` | Lab profiles and model comparison matrix |
| Claude guide | `/claude/` | Anthropic models, products, capabilities |
| Google AI guide | `/google-ai-tools/` | Google I/O 2026 tools step-by-step |

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS + custom CSS variables |
| Animation | Framer Motion |
| 3D graphics | Three.js (`CategoryCarousel3D`, `AIHistoryTimeline`) |
| Language | TypeScript (strict) |
| Search | Fuse.js — unified index across all 7 content types |
| Output | **Static export** — no server, no API routes |
| Hosting | GitHub Pages (`gh-pages` branch) |
| Analytics | Plausible (cookieless, GDPR-friendly) |
| Base path | `/sintra-ai` in production, `` (empty) in dev |

---

## Local setup

```bash
git clone https://github.com/joaoccaldas/sintra-ai.git
cd sintra-ai
npm install
npm run dev        # http://localhost:3000
```

In dev mode the site runs at `localhost:3000` without the `/sintra-ai` base path — internal links resolve correctly without configuration changes.

---

## Project structure

```
sintra-ai/
├── src/
│   ├── app/                        # Next.js pages — one folder = one URL route
│   │   ├── page.tsx                # Home (/) — "use client"
│   │   ├── layout.tsx              # Root layout + global metadata + PWA manifest
│   │   ├── globals.css             # Global styles and Tailwind base
│   │   ├── sitemap.ts              # Auto-generated sitemap.xml
│   │   ├── robots.ts               # robots.txt
│   │   ├── news/page.tsx
│   │   ├── tools/page.tsx + [slug]/page.tsx
│   │   ├── prompts/[slug]/page.tsx # Individual prompt pages (SSG)
│   │   ├── learn/page.tsx
│   │   ├── resources/page.tsx
│   │   ├── ai-labs/page.tsx
│   │   ├── claude/page.tsx
│   │   ├── concepts/
│   │   │   ├── page.tsx            # Server component — exports SEO metadata
│   │   │   └── ConceptsClient.tsx  # "use client" — actual UI
│   │   ├── ai-history/
│   │   │   ├── page.tsx            # Server component — exports SEO metadata
│   │   │   └── AIHistoryClient.tsx # "use client" — actual UI
│   │   └── google-ai-tools/
│   │       ├── page.tsx            # Server component — exports SEO metadata
│   │       └── GoogleAiToolsClient.tsx
│   │
│   ├── components/                 # All React components (39 total)
│   │   ├── Header.tsx              # Top nav with 3 dropdown groups + ⌘K
│   │   ├── HeroMinimal.tsx         # Full-screen hero with particle vortex + search
│   │   ├── SiteHub.tsx             # 7 destination cards with live counts
│   │   ├── ThePulse.tsx            # Tabs: AI Signals / New Prompts / Learn
│   │   ├── PersonaEntry.tsx        # Role-based routing into prompt library
│   │   ├── CategoryBrowser.tsx     # Main prompt browser (3D carousel + panels)
│   │   ├── CategoryCarousel3D.tsx  # Three.js 3D category carousel (desktop only)
│   │   ├── FeaturedCollections.tsx # Curated prompt collections
│   │   ├── ExpandedCard.tsx        # Prompt detail panel + related prompts rail
│   │   ├── UseCaseCard.tsx         # Prompt card component
│   │   ├── CommandPalette.tsx      # ⌘K unified search (all 7 content types)
│   │   ├── UniversalSearch.tsx     # Inline search results on landing page
│   │   ├── AINewsPage.tsx          # /news page
│   │   ├── AIHistoryTimeline.tsx   # Three.js interactive history timeline
│   │   ├── NewsTicker.tsx          # Scrolling ticker in hero bottom bar
│   │   └── ...                     # See src/components/ for full list
│   │
│   ├── context/
│   │   ├── LanguageContext.tsx     # EN / PT-BR toggle
│   │   └── SavedPromptsContext.tsx # Saved prompts (localStorage)
│   │
│   └── lib/                        # All content data — edit here to update content
│       ├── data.ts                 # USE_CASES, BASE_PATH, CAT_ACCENT, DIFF_COLOR
│       ├── newsData.ts             # AI_NEWS — 220+ items (primary daily-update target)
│       ├── toolsData.ts            # AI_TOOLS — 55 tools
│       ├── concepts.ts             # CONCEPTS — 30+ AI concepts
│       ├── learningPathsData.ts    # LEARNING_PATHS — 4 paths
│       ├── resourcesData.ts        # RESOURCES — 43 developer resources
│       ├── claudeData.ts           # Claude models and Anthropic products
│       ├── timelineData.ts         # MILESTONES — AI history events
│       ├── videoData.ts            # AI_VIDEOS — curated YouTube content
│       ├── collections.ts          # COLLECTIONS — curated prompt kits
│       ├── aiLabsData.ts           # AI_LABS — lab profiles
│       ├── searchIndex.ts          # Fuse.js unified search index (7 types)
│       ├── i18n.ts                 # UI strings in EN and PT-BR
│       ├── dateUtils.ts            # relativeDate, formatDate, isNew
│       ├── launchInAI.ts           # "Open in Claude/ChatGPT/Gemini" URL builder
│       └── hooks.ts                # Shared React hooks
│
├── src/data/
│   └── useCases.json               # 149 prompt use cases (validate before committing)
│
├── public/
│   ├── feed.xml                    # RSS feed — auto-generated, do not edit manually
│   ├── manifest.json               # PWA manifest for installability
│   ├── tesseract-hero.webp         # OG image (1200×630)
│   ├── tesseract-mark.svg          # Logo / apple-touch-icon
│   └── io-texture.png              # Texture used by CategoryCarousel3D
│
├── scripts/
│   ├── generate-rss.ts             # Prebuild hook → writes public/feed.xml
│   ├── validate-data.mjs           # Schema-checks useCases.json
│   ├── update-news.mjs             # AI-assisted news update helper
│   └── enrich.py                   # Data enrichment utility
│
├── dist/                           # ⚠️ BUILD OUTPUT — never commit, never push
├── CLAUDE.md                       # AI assistant: news procedure + content guidelines
└── USE_CASE_SCHEMA.md              # Schema reference for prompt use cases
```

---

## Available scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Dev server with hot reload at `localhost:3000` |
| `npm run build` | Production build → `dist/` (also regenerates `feed.xml`) |
| `npm run typecheck` | TypeScript check without emitting files |
| `npm run validate-data` | Schema-check `useCases.json` |
| `npm run check` | **validate-data + typecheck + build** — run before every push |

```bash
# Pre-push checklist
npm run check          # must pass — zero errors
git add <specific files>
git commit -m "..."
git push
```

---

## Non-negotiable rules

### Rule 1 — Never commit `dist/`
`dist/` is build output. It is in `.gitignore`. Never override this.

### Rule 2 — Build order matters
Running `npm run dev` then deploying corrupts production. Always run `npm run build` before deploying.

```
✅  edit → npm run check → npm run build → deploy
❌  edit → npm run dev → deploy  ← corrupts dist/
```

### Rule 3 — Static export only
No `getServerSideProps`, no `/api/*` routes, no `fetch()` at render time. All data must be TypeScript imports compiled at build time.

### Rule 4 — Tailwind classes must be literal strings
No dynamic construction: ~~`` `text-${color}-500` ``~~  
Write the full class: `"text-red-500"`, `"text-blue-500"`. Tailwind scans source text — dynamic strings produce missing styles in production.

### Rule 5 — Never combine `.btn` with `hidden`
`.btn` has higher CSS specificity than Tailwind's `hidden`. Use conditional rendering: `{show && <Button />}`.

### Rule 6 — Always use `BASE_PATH` for internal links
```ts
import { BASE_PATH } from "@/lib/data";
href={`${BASE_PATH}/news/`}   // ✅
href="/sintra-ai/news/"       // ❌ breaks in dev
```

### Rule 7 — "use client" pages need a server wrapper for SEO metadata
Next.js prohibits `export const metadata` in client components. Pattern:
```
src/app/your-page/
  page.tsx              ← server component — exports metadata, renders <YourPageClient />
  YourPageClient.tsx    ← "use client" — all interactive UI here
```
See `concepts/`, `ai-history/`, `google-ai-tools/` as working examples.

### Rule 8 — Stage specific files only
```bash
git add src/lib/newsData.ts public/feed.xml   # ✅
git add -A                                     # ⚠️ verify carefully first
```

---

## Content updates

All content lives in data files. No code changes needed to add items.

### Adding a news item

Append to `AI_NEWS` in `src/lib/newsData.ts` before the closing `];`:

```ts
{
  id: "unique-kebab-case-id",       // globally unique across all items
  date: "May 2026",                 // "Mon YYYY"
  dateNum: 202605,                  // YYYYMM — primary sort key
  dateDay: 25,                      // optional: day for intra-month ordering
  title: "Concise factual title",
  summary: "2–3 sentences. Factual. Specific numbers/benchmarks. No hype.",
  tags: ["Company", "Feature", "Topic"],
  significance: "landmark" | "major" | "notable",
  provider: "Company Name",
  providerColor: "#hexcolor",
  url: "https://direct-link-to-source",
  country: "BR",                    // optional: "BR" or "SE" for regional items
  why_it_matters: "...",            // optional
  what_to_try: "...",               // optional
},
```

Significance: `landmark` (≤3/year, changes the field) · `major` (practitioners must know) · `notable` (worth tracking)

Provider colours: OpenAI `#10a37f` · Anthropic `#d97706` · Google `#4285f4` · Meta `#0866ff` · Microsoft `#0078d4` · Mistral `#ff7000` · DeepSeek `#1a73e8` · xAI `#000000` · Nvidia `#76b900`

```bash
npm run build
git add src/lib/newsData.ts public/feed.xml
git commit -m "chore: news update $(date -u +%Y-%m-%d)"
```

### Adding a prompt use case

See `USE_CASE_SCHEMA.md` for the full field spec.

```bash
# 1. Edit src/data/useCases.json
npm run validate-data   # must pass
npm run build
git add src/data/useCases.json public/feed.xml
git commit -m "feat: add use case — [title]"
```

---

## Deployment

The site deploys to `gh-pages` using git plumbing — `dist/` contents are committed as the root of the git tree, which is what GitHub Pages requires.

```bash
# 1. Build
npm run build

# 2. Deploy (run as one block)
TREE=$(git --work-tree=dist add -f -A && git --work-tree=dist write-tree)
PARENT=$(git rev-parse refs/remotes/origin/gh-pages)
COMMIT=$(echo "deploy: $(date -u +%Y-%m-%d)" | git commit-tree $TREE -p $PARENT)
git push origin $COMMIT:refs/heads/gh-pages
git reset HEAD    # unstage dist files from working index
```

Pages propagates in 1–3 minutes. `git reset HEAD` cleans up the index so `git status` stays clean.

---

## Component architecture

### Landing page render order
```
Header
HeroMinimal          ← particle vortex, search bar, news ticker at bottom
  └─ UniversalSearch ← inline results for hero search (Fuse.js, 7 types)
SiteHub              ← 7 destination cards with live data counts
ThePulse             ← tabs: AI Signals (news) / New Prompts / Learn
PersonaEntry         ← role picker routing to relevant category
CategoryBrowser      ← main prompt library
  ├─ desktop: CategoryCarousel3D   ← Three.js 3D selector
  ├─ mobile:  2D category grid     ← via useIsMobile() hook
  └─ ExpandedCard                  ← detail panel + RelatedRail (tag-matched prompts)
FeaturedCollections  ← curated prompt kits
Footer
```

### Unified search
`src/lib/searchIndex.ts` exports a single Fuse.js index over 7 types. Both `CommandPalette` (⌘K) and `UniversalSearch` call `searchAll(query)` from it.

### Navigation groups (Header.tsx)
- **Discover** → AI News · AI History · AI Labs
- **Learn** → Learning Paths · Resources · Concepts
- **Reference** → AI Tools · Claude · Google AI

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| GitHub Pages 404 | Files at `dist/index.html` not root | Use `git --work-tree=dist add -f -A` |
| Wrong styles in production | `dist/` built with `npm run dev` | Re-run `npm run build`, redeploy |
| Missing Tailwind classes | Dynamic class construction | Use full literal class strings |
| TypeScript error after data edit | Schema mismatch | `npm run typecheck` to find it |
| `validate-data` fails | Bad field in `useCases.json` | Check `USE_CASE_SCHEMA.md` |
| News item not appearing | Duplicate `id` | Every `id` must be globally unique |
| Internal link 404 in production | Hardcoded path without `BASE_PATH` | `${BASE_PATH}/path/` from `@/lib/data` |
| Page missing OG/Twitter metadata | `"use client"` page.tsx | Add server wrapper + `*Client.tsx` split |
| `git status` dirty after deploy | Deploy script left dist staged | Run `git reset HEAD` |

---

## Quick reference

| Task | File |
|------|------|
| Add news | `src/lib/newsData.ts` + `public/feed.xml` (auto) |
| Add use case | `src/data/useCases.json` |
| Add tool | `src/lib/toolsData.ts` |
| Add AI concept | `src/lib/concepts.ts` |
| Add history milestone | `src/lib/timelineData.ts` |
| Change hero text | `src/lib/i18n.ts` + `src/components/HeroMinimal.tsx` |
| Change nav links | `src/components/Header.tsx` → `NAV_GROUPS` |
| Change landing hub cards | `src/components/SiteHub.tsx` |
| Change "The Pulse" tabs | `src/components/ThePulse.tsx` |
| Change category colours | `src/lib/data.ts` → `CAT_ACCENT` |
| Change prompt card layout | `src/components/UseCaseCard.tsx` |
| Change prompt detail panel | `src/components/ExpandedCard.tsx` |
| Add a page with SEO | `src/app/route/page.tsx` (server) + `*Client.tsx` |
| Base path constant | `src/lib/data.ts` → `BASE_PATH` |
