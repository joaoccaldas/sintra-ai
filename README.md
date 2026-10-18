# Sintra AI

Sintra AI is a static, privacy-conscious AI intelligence and learning portal. It connects daily news, concepts, research, tools, models, learning paths, videos, guides, and practical use cases so visitors can move from **what changed** to **what it means** to **what to do next**.

- Live site: https://joaoccaldas.github.io/sintra-ai/
- Framework: Next.js 15 App Router
- Output: static export
- Hosting: GitHub Pages
- Primary language: English, with partial Portuguese UI localization

## Product architecture

Sintra is organized around five user intentions:

| Intent | Main routes | Purpose |
|---|---|---|
| Stay current | `/news/`, `/weekly/`, `/topics/` | Track meaningful AI developments without reading an unfiltered feed |
| Learn | `/learn/`, `/concepts/`, `/guides/`, `/videos/` | Build structured understanding and retain progress locally |
| Build | `/`, `/prompts/[slug]/`, `/collections/` | Apply AI to real tasks with copy-ready workflows |
| Compare | `/models/`, `/tools/`, `/token-calculator/` | Choose models and tools using explicit dimensions and source links |
| Research | `/research/`, `/ai-labs/`, `/ai-history/` | Understand papers, organizations, technical context, and history |

The homepage is an orientation layer, not a duplicate directory. It introduces the product, offers intent-based entry points, highlights current editorial picks, and then loads the large prompt library below the fold.

## Technology

| Layer | Technology |
|---|---|
| Framework | Next.js 15, React 18, App Router |
| Language | TypeScript |
| Styling | Tailwind CSS plus semantic CSS variables |
| Motion | Framer Motion |
| Search | Fuse.js client-side unified index |
| Content | Typed TypeScript modules plus `src/data/useCases.json` |
| Analytics | Plausible, cookieless |
| Offline | Service worker with network-first navigation |
| Deployment | Static export to `gh-pages` |

## Repository map

```text
src/
  app/                    Route entry points and metadata
  components/             Shared and page-level UI
  context/                Theme, language, sidebar, saved prompts
  data/useCases.json      Prompt and use-case corpus
  lib/                    Typed content collections and shared logic
public/                   Static assets, manifest, service worker, RSS
scripts/                  Generators, validators, tests, update helpers
docs/                     Architecture, audit decisions, debugging
```

Important files:

| Task | File |
|---|---|
| Homepage composition | `src/app/page.tsx`, `src/components/ContentNav.tsx` |
| Global navigation | `src/components/SidebarNav.tsx`, `src/components/Header.tsx` |
| Unified search | `src/lib/searchIndex.ts`, `src/components/CommandPalette.tsx` |
| Prompt data | `src/data/useCases.json`, `src/lib/data.ts` |
| News | `src/lib/newsData.ts`, `src/components/AINewsPage.tsx` |
| Models | `src/lib/modelsData.ts`, `src/app/models/ModelsClient.tsx` |
| Tools | `src/lib/toolsData.ts`, `src/components/ToolsDirectoryPage.tsx` |
| Learning | `src/lib/learningPathsData.ts`, `src/components/LearningPathsPage.tsx` |
| Concepts | `src/lib/concepts.ts` |
| Design tokens | `src/app/globals.css`, `src/app/hardening.css`, `tailwind.config.ts` |
| Static SEO | `src/app/sitemap.ts`, route metadata, JSON-LD |

## Local development

```bash
git clone https://github.com/joaoccaldas/sintra-ai.git
cd sintra-ai
npm ci
npm run dev
```

Development runs without the production `/sintra-ai` prefix. Internal links must therefore use the shared `BASE_PATH` constant from `src/lib/constants.ts`.

## Quality commands

```bash
npm run validate-data      # validate the prompt JSON schema
npm run validate-content   # validate IDs, dates, URLs, and cross-links
npm test                   # deterministic unit tests for audit helpers
npm run typecheck          # TypeScript without emitting files
npm run build              # production static export
npm run audit:static       # validation + tests + typecheck
npm run check              # complete release gate, including build
```

`npm run check` is the required pre-release command. The `Quality` GitHub workflow runs the same command on pull requests and pushes to `main` when hosted runners are available.

## Content integrity rules

1. Every entity ID or slug must be unique within its collection.
2. Dates use `YYYY-MM-DD` unless a schema explicitly defines another format.
3. Mutable claims must carry a source URL and a verification date where the schema supports it.
4. Concept relationships must point to real concept IDs.
5. Learning steps must use `BASE_PATH` and point to valid routes or concept anchors.
6. External links must use HTTP or HTTPS.
7. New content types must be added to the unified search index and sitemap when appropriate.
8. UI labels should describe user outcomes, not only inventory counts.

## Design principles

- **Clarity before spectacle.** Motion and glow reinforce hierarchy; they do not replace it.
- **Stable navigation.** Canonical menu order never changes based on visit history.
- **Direct retrieval.** Search results open the exact entity whenever an entity route exists.
- **Keyboard parity.** Every pointer action has a keyboard equivalent.
- **Visible provenance.** Current facts should be distinguishable from editorial interpretation.
- **Progressive loading.** Large corpora are kept out of the initial homepage bundle.
- **One source of truth.** Shared paths, colors, counts, and schemas are imported rather than duplicated.

## Adding content

### Prompt or use case

Edit `src/data/useCases.json`, then run:

```bash
npm run validate-data
npm run validate-content
```

### News

Edit `src/lib/newsData.ts`. Use a unique ID, accurate event date, direct source URL, provider, significance, and concise factual summary. RSS is regenerated during `prebuild`.

### Concept

Edit `src/lib/concepts.ts`. All entries require a unique ID, difficulty, explanation, analogy, related concept IDs, and `addedAt` date. `npm run validate-content` rejects dead relationships.

### Tool or model

Edit `src/lib/toolsData.ts` or `src/lib/modelsData.ts`. Use official documentation links and update verification dates whenever pricing or capabilities change.

### Learning path

Edit `src/lib/learningPathsData.ts`. Import `BASE_PATH`; never hardcode `/sintra-ai`. Concept anchors must use canonical concept IDs.

## Deployment

Source changes land on `main`. The production site is built into `dist/` and published from the `gh-pages` branch.

The existing **Build & Deploy** workflow runs `npm run check` on pushes to
`main`, at 06:00 UTC daily, and on manual dispatch. It publishes the validated
`dist/` to `gh-pages`. Review and merge the existing pull request, then inspect
the deployment run and verify the public URLs. Do not stage a generated export
through the source checkout's Git index.


Never commit `dist/` to `main`.

## Current strategic direction

Sintra is evolving from a broad content portal into an AI mastery system:

```text
Discover → Understand → Decide → Practise → Build → Prove → Stay current
```

The implementation record and remaining roadmap live in `docs/AUDIT_IMPLEMENTATION_2026-06-23.md`.

## Power BI variance example

The existing `/knowledge/power-bi-variance-review/` brief contains LAB-FPNA-01,
a synthetic revenue example. One fixture feeds the table, CSV, DAX instructions
and `/api/workflows/power-bi-variance.json`. See
[the workflow handover](docs/POWER_BI_VARIANCE.md) for reproduction, the
HoldingCo / Finance AI Lab bridge, release checks and precise test boundaries.

## Source-backed Office replication guides

`src/lib/officeKnowledge.ts` extends the existing knowledge collection with
Claude, Microsoft 365, Excel, PowerPoint and Teams workflows and attributed
Crunched/Softcat customer stories. Existing prompt identities are linked rather
than duplicated. `KnowledgeRecord.replication` holds each guide's environment,
inputs, launch steps, practice case, acceptance cases and troubleshooting; the
existing record owns the procedure, prompt, sources and execution status.

`generate-api-json.ts` derives `/api/skills.json` and
`/skills/{knowledge-id}/SKILL.md` from those records using the existing Markdown
frontmatter helper. The browser and JSON use the same collection. Source-backed
instructions, hypothetical acceptance cases and actual app execution remain
distinct. These Office recipes are not execution-tested in the provider apps.
See `/agents/` for manual use and Claude custom-skill packaging instructions.
