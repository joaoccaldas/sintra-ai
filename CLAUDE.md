# Sintra Tesseract — Claude Code Context

## Project overview

Static Next.js 15 site deployed to GitHub Pages via `gh-pages` branch.
All content lives in TypeScript data files under `src/lib/` and `src/data/`.
Build: `npm run build` → output in `dist/`.
Check (validate + typecheck + build): `npm run check`.

**Current counts (May 2026):** 149 use cases · 220 news items · 55 tools · 30 concepts · 4 learning paths · 43 resources · 70+ history milestones

---

## Daily news update task

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
npm run build   # also regenerates public/feed.xml
```

### 5. Commit news files only

```bash
git add src/lib/newsData.ts public/feed.xml
git commit -m "chore: news update $(date -u +%Y-%m-%d)"
git push
```

Do **not** commit `dist/` — deployment is handled separately via git plumbing.

---

## Data files map

| File | Export | Count | Update cadence |
|------|--------|-------|----------------|
| `src/lib/newsData.ts` | `AI_NEWS` | 220+ items | Daily |
| `src/lib/toolsData.ts` | `AI_TOOLS` | 55 tools | Weekly |
| `src/lib/learningPathsData.ts` | `LEARNING_PATHS` | 4 paths | Monthly |
| `src/lib/resourcesData.ts` | `RESOURCES` | 43 resources | Weekly |
| `src/lib/claudeData.ts` | various | — | On Anthropic release |
| `src/lib/concepts.ts` | `CONCEPTS` | 30+ concepts | As new concepts emerge |
| `src/lib/timelineData.ts` | `MILESTONES`, `ERAS` | 70+ events | Quarterly |
| `src/lib/videoData.ts` | `AI_VIDEOS` | — | As notable videos appear |
| `src/lib/collections.ts` | `COLLECTIONS` | — | When curating new kits |
| `src/lib/aiLabsData.ts` | `AI_LABS` | — | On new lab launch or major change |
| `src/data/useCases.json` | (via `src/lib/data.ts`) | 149 use cases | Ongoing |

---

## Key constraints

- **Static export** (`output: 'export'`). No server-side code, no API routes, no runtime fetch.
- **`BASE_PATH = "/sintra-ai"`** — all internal links must use this prefix via `import { BASE_PATH } from "@/lib/data"`.
- **Tailwind literal strings** — no dynamic class construction (`text-${color}-500` is invisible to the purger).
- **`.btn` + `hidden` conflict** — `.btn` CSS has higher specificity than Tailwind `hidden`. Never combine them; use conditional rendering.
- **`dist/` is never committed** — only deployed to `gh-pages` via git plumbing.

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

Working examples: `src/app/concepts/`, `src/app/ai-history/`, `src/app/google-ai-tools/`

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

Used in `CategoryBrowser.tsx` to swap the Three.js carousel for a 2D grid on mobile.

### Deployment sequence
```bash
npm run build
TREE=$(git --work-tree=dist add -f -A && git --work-tree=dist write-tree)
PARENT=$(git rev-parse refs/remotes/origin/gh-pages)
COMMIT=$(echo "deploy: $(date -u +%Y-%m-%d)" | git commit-tree $TREE -p $PARENT)
git push origin $COMMIT:refs/heads/gh-pages
git reset HEAD   # clean up the index
```

---

## Component overview (key files)

| Component | Purpose |
|-----------|---------|
| `Header.tsx` | Nav with 3 dropdown groups (Discover / Learn / Reference) + ⌘K |
| `HeroMinimal.tsx` | Full-screen hero, particle vortex, search bar, news ticker |
| `SiteHub.tsx` | 7 destination cards with live counts — orients new visitors |
| `ThePulse.tsx` | Tabbed module: AI Signals · New Prompts · Learn |
| `CategoryBrowser.tsx` | Main prompt library — 3D carousel (desktop) + 2D grid (mobile) |
| `ExpandedCard.tsx` | Prompt detail slide-up panel with related-prompts rail |
| `CommandPalette.tsx` | ⌘K unified search across all 7 content types (Fuse.js) |
| `UniversalSearch.tsx` | Inline search results on landing page (same index as ⌘K) |
| `PersonaEntry.tsx` | Role-based entry routing (routes `sintra:persona` custom event) |
| `FeaturedCollections.tsx` | Curated prompt collections with expandable panels |
| `AIHistoryTimeline.tsx` | Three.js interactive timeline (full-screen, desktop-heavy) |
| `NewsTicker.tsx` | Horizontal scrolling news ticker pinned to hero bottom |
