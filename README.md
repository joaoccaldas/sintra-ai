# sintra-ai

A curated AI knowledge library — prompts, tools, news, and learning paths — deployed as a static site on GitHub Pages.

**Live site:** https://joaoccaldas.github.io/sintra-ai/

> **For AI coding assistants:** This README is your primary reference. Follow it exactly. Every section includes actionable commands and explicit rules. `CLAUDE.md` contains additional AI-specific context for news updates and content management.

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS + custom CSS variables |
| Animation | Framer Motion |
| Language | TypeScript (strict) |
| Output | **Static export** — no server, no API routes |
| Hosting | GitHub Pages (`gh-pages` branch) |
| Base path | `/sintra-ai` in production, `` (empty) in dev |

---

## Local setup

```bash
git clone https://github.com/joaoccaldas/sintra-ai.git
cd sintra-ai
npm install
npm run dev        # http://localhost:3000
```

In dev mode the site runs at `localhost:3000` without the `/sintra-ai` base path — internal links resolve correctly without any configuration change.

---

## Project structure

```
sintra-ai/
├── src/
│   ├── app/                  # Next.js pages — one folder = one URL route
│   │   ├── page.tsx          # Home (/)
│   │   ├── news/page.tsx     # /news
│   │   ├── tools/page.tsx    # /tools
│   │   ├── learn/page.tsx    # /learn
│   │   └── prompts/[slug]/   # Individual prompt pages
│   ├── components/           # All React components
│   ├── context/              # React context (LanguageContext)
│   └── lib/                  # All content data — edit here to update content
│       ├── newsData.ts           ← AI news timeline (add news here)
│       ├── toolsData.ts          ← AI tools directory (~55 tools)
│       ├── data.ts               ← Use-case categories, filters, LLM map
│       ├── learningPathsData.ts  ← 4 learning paths
│       ├── resourcesData.ts      ← ~43 developer resources
│       ├── claudeData.ts         ← Claude models / Anthropic products
│       └── i18n.ts               ← UI strings (EN/PT-BR)
├── src/data/
│   └── useCases.json         ← All prompt use cases (149 items)
├── public/
│   └── feed.xml              ← Auto-generated RSS (do not edit manually)
├── scripts/
│   ├── generate-rss.ts       ← Runs automatically before every build (prebuild hook)
│   └── validate-data.mjs     ← Validates useCases.json schema
├── dist/                     ← ⚠️ BUILD OUTPUT — never commit, never push to main
├── CLAUDE.md                 ← AI assistant: news update procedure + data file map
├── USE_CASE_SCHEMA.md        ← Schema reference for adding prompt use cases
└── next.config.mjs           ← Static export config (output: 'export', distDir: 'dist')
```

---

## Available scripts

| Command | What it does | When to use |
|---------|-------------|-------------|
| `npm run dev` | Start dev server with hot reload | Local development only |
| `npm run build` | Full production build → `dist/` | Before deploying or to verify changes |
| `npm run typecheck` | TypeScript check, no output | Catch type errors quickly |
| `npm run validate-data` | Validate `useCases.json` schema | After editing use cases |
| `npm run lint` | ESLint | Before committing code changes |
| `npm run check` | validate-data + typecheck + lint + build | **Run before every push** |

### The safe push checklist
```bash
npm run check     # must pass with zero errors
git add <files>   # stage specific files — never `git add -A` blindly
git commit -m "..."
git push
```

---

## ⚠️ Rules — must follow exactly

These are non-negotiable. Breaking them causes silent production failures that are hard to debug.

### Rule 1 — Never commit `dist/`
`dist/` is build output deployed separately to `gh-pages`. It is in `.gitignore`. Never override this, never `git add dist/`.

### Rule 2 — Always rebuild before deploying
`npm run dev` and `npm run build` **both write to `dist/`**. Running `npm run dev` corrupts the production static export (different build IDs, missing chunk files). If you ran `npm run dev` for any reason, run `npm run build` again before deploying.

**Correct order:**
```
edit code → npm run check → npm run build → deploy
```
**Wrong order (corrupts dist/):**
```
edit code → npm run dev → deploy   ← NEVER DO THIS
```

### Rule 3 — Static export constraints
`output: 'export'` in `next.config.mjs` means:
- No `getServerSideProps`, no `getServerProps`, no API routes (`/api/*`)
- No `fetch()` at render time — all data must be imported statically at build time
- No middleware, no edge functions

### Rule 4 — Tailwind classes must be literal strings
No dynamic construction: ~~`` `text-${color}-500` ``~~  
Write the full class: `text-red-500`, `text-blue-500`, etc.  
Tailwind purges unused classes at build time by scanning source text — dynamic strings are invisible and produce missing styles in production.

### Rule 5 — Never combine `.btn` with `hidden`
The `.btn` CSS class has higher specificity than Tailwind's `hidden`. The element will remain visible. Use conditional rendering (`{show && <Button />}`) instead.

### Rule 6 — All internal links must use `BASE_PATH`
```ts
import { BASE_PATH } from "@/lib/data";
// then: href={`${BASE_PATH}/news`}
```
`BASE_PATH = "/sintra-ai"` in production, `""` in dev. Hardcoding `/sintra-ai/` breaks local development.

### Rule 7 — Stage specific files, not everything
```bash
git add src/lib/newsData.ts public/feed.xml   # ✅ specific
git add -A                                     # ⚠️ risky — check what this includes
```

---

## Content layer — how to update each section

No code changes are needed to add content. All content lives in data files under `src/lib/` and `src/data/`.

| Section | File to edit | Rebuild needed |
|---------|-------------|----------------|
| Prompt library | `src/data/useCases.json` | Yes |
| News timeline | `src/lib/newsData.ts` | Yes |
| Tools directory | `src/lib/toolsData.ts` | Yes |
| Learning paths | `src/lib/learningPathsData.ts` | Yes |
| Developer resources | `src/lib/resourcesData.ts` | Yes |
| Claude products | `src/lib/claudeData.ts` | Yes |
| UI text (EN/PT-BR) | `src/lib/i18n.ts` | Yes |

### Adding a prompt use case

1. Open `src/data/useCases.json`
2. Add a new object following the schema in `USE_CASE_SCHEMA.md`
3. Verify: `npm run validate-data`
4. Build: `npm run build`
5. Commit: `git add src/data/useCases.json public/feed.xml && git commit -m "feat: add use case — [title]"`

Key schema fields (full spec in `USE_CASE_SCHEMA.md`):
```json
{
  "domain": "Communication & Writing",
  "skill_level": "INTERMEDIATE",
  "title": "Action-oriented title",
  "prompt": "Full prompt with [placeholder] for user values",
  "tags": ["lowercase", "kebab-case"],
  "outcome": "One sentence describing what the user gets.",
  "inputs": [{ "label": "placeholder" }],
  "tools": ["Notion", "Gmail"],
  "output_kind": "templates",
  "sample_output": "Realistic markdown example of the AI response"
}
```

Valid `domain` values: `"Quick Wins"` · `"Personal Productivity"` · `"Communication & Writing"` · `"Research & Analysis"` · `"Finance & FP&A"` · `"Data & Analytics"` · `"Software Development"` · `"Creative AI"` · `"Game Development"`

### Adding news items

1. Open `src/lib/newsData.ts`
2. Append before the closing `];` of `AI_NEWS`:

```ts
{
  id: "unique-kebab-case-id",       // must be globally unique in the array
  date: "May 2026",                 // "Mon YYYY" format
  dateNum: 202605,                  // YYYYMM — primary sort key
  dateDay: 25,                      // optional: day for intra-month ordering
  title: "Concise factual title",
  summary:
    "2–3 sentences. Factual. Specific numbers. No hype. In English.",
  tags: ["Company", "Feature", "Topic"],
  significance: "landmark" | "major" | "notable",
  provider: "Company Name",
  providerColor: "#hexcolor",
  url: "https://direct-link-to-source",
  country: "BR",                    // optional: "BR" or "SE" for regional items
  why_it_matters: "One practitioner-level sentence.",   // optional
  what_to_try: "One concrete action the reader can take today.",  // optional
},
```

Significance guide:
- `landmark` — changes the trajectory of the field (maximum 3 per year)
- `major` — significant, every AI practitioner should know
- `notable` — worth tracking but not world-changing

Common provider colours: OpenAI `#10a37f` · Anthropic `#d97706` · Google `#4285f4` · Meta `#0866ff` · Microsoft `#0078d4` · Apple `#555555` · Mistral `#ff7000` · DeepSeek `#1a73e8` · xAI `#000000` · Nvidia `#76b900`

3. Build: `npm run build` (also regenerates `public/feed.xml`)
4. Commit: `git add src/lib/newsData.ts public/feed.xml && git commit -m "chore: news update $(date -u +%Y-%m-%d)"`

---

## Deployment

The site deploys to the `gh-pages` branch using git plumbing — no npm package required. This approach puts `dist/` contents at the **root** of the git tree, which is what GitHub Pages requires to serve files at `/sintra-ai/`.

### Full deploy sequence
```bash
# Step 1: build
npm run build

# Step 2: deploy (run as one block)
git fetch origin gh-pages
TMPDIR=$(mktemp -d)
export GIT_INDEX_FILE="$TMPDIR/index"
git --work-tree=dist add -f -A
TREE=$(git write-tree)
unset GIT_INDEX_FILE
PARENT=$(git rev-parse origin/gh-pages)
COMMIT=$(echo "deploy: $(date -u +%Y-%m-%d)" | git commit-tree $TREE -p $PARENT)
git push origin $COMMIT:refs/heads/gh-pages
rm -rf $TMPDIR
echo "Deployed: $COMMIT"
```

GitHub Pages propagates in 1–3 minutes after the push.

### Why `git --work-tree=dist add -f -A` and not `git add dist/`?
- `git add dist/` stages files under a `dist/` subdirectory in the tree → GitHub Pages serves a 404 because `index.html` is at `dist/index.html` instead of `index.html`
- `git --work-tree=dist add -f -A` stages files with `dist/` as the root → `index.html` is at the root → Pages serves correctly

---

## Branch workflow

```
main                      ← stable, always deployable
└── feature/your-task     ← branch from main, PR back to main
```

```bash
git checkout main
git pull origin main
git checkout -b feature/your-task
# ... make changes ...
npm run check                        # must pass
git push -u origin feature/your-task
# open PR on GitHub → review → merge to main → deploy
```

**Never push directly to `main`** — always via a PR so changes can be reviewed before going live.

---

## Common task recipes

### Add news + deploy
```bash
# 1. Edit src/lib/newsData.ts (add items before ];)
npm run build
git add src/lib/newsData.ts public/feed.xml
git commit -m "chore: news update $(date -u +%Y-%m-%d)"
git push
# then run the deploy block above
```

### Add use cases + deploy
```bash
# 1. Edit src/data/useCases.json
npm run validate-data   # schema check
npm run build
git add src/data/useCases.json public/feed.xml
git commit -m "feat: add N use cases — [category]"
git push
# then run the deploy block above
```

### Fix a component + deploy
```bash
# 1. Edit src/components/SomeComponent.tsx
npm run dev             # preview locally at localhost:3000
# verify the fix in browser
npm run check           # typecheck + lint + build — MUST pass
# note: check already runs build, so dist/ is now correct
git add src/components/SomeComponent.tsx
git commit -m "fix: [description]"
git push
# then run the deploy block above
```

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| GitHub Pages shows 404 | Files deployed under `dist/` subdirectory | Use `git --work-tree=dist add -f -A`, not `git add dist/` |
| Deployed site has wrong/missing styles | `dist/` was generated by `npm run dev` | Run `npm run build`, redeploy |
| Component styles missing in production | Dynamic Tailwind class construction | Replace with full literal class strings |
| TypeScript build error after data edit | Schema mismatch | Run `npm run typecheck` to locate the issue |
| `npm run validate-data` fails | Missing required field or wrong type in `useCases.json` | Check `USE_CASE_SCHEMA.md` for the field spec |
| News item not showing in filtered view | Duplicate `id` in `newsData.ts` | Every `id` must be unique across all items |
| Internal link broken in production but fine locally | Missing `BASE_PATH` prefix | Use `${BASE_PATH}/path` from `@/lib/data` |
| Merge conflict on `dist/` | Someone committed `dist/` to source branch | Remove `dist/` from the commit, ensure `.gitignore` is respected |

---

## Key files quick reference

| Task | File(s) |
|------|---------|
| Add news | `src/lib/newsData.ts` + `public/feed.xml` (auto) |
| Add use case | `src/data/useCases.json` |
| Add tool | `src/lib/toolsData.ts` |
| Change homepage hero text | `src/lib/i18n.ts` + `src/components/HeroMinimal.tsx` |
| Change category colours | `src/lib/data.ts` → `CAT_ACCENT` |
| Change difficulty colours | `src/lib/data.ts` → `DIFF_COLOR` |
| Add a new page | `src/app/your-route/page.tsx` |
| Change navigation links | `src/components/Header.tsx` |
| Change footer | `src/components/Footer.tsx` |
| Change news page filters | `src/components/AINewsPage.tsx` |
| Modify prompt card layout | `src/components/UseCaseCard.tsx` |
| Modify prompt detail modal | `src/components/ExpandedCard.tsx` |
| Base path constant | `src/lib/data.ts` → `BASE_PATH` |
