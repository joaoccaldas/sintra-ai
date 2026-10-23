---
description: Research news and use-case gaps, validate a draft feature branch, and request human editorial approval before publication.
---

# /update-sintra: content proposals, verified review and production readback

This command combines the reviewed /update-news editorial process with conditional use-case improvements. It **does not self-publish**. Static live RSS/Atom aggregation is handled separately by the build.

## 1. Baseline and reuse

- Update local references, inspect main, pending PRs and production evidence.
- Work on a dedicated feature branch (not `main`); note baseline content counts via `npx tsx scripts/validate-content.ts`.
- Search existing news, guides, knowledge records, use cases, skills and tools before proposing anything new.

## 2. Curated news (only if verified)

Follow `.claude/commands/update-news.md` precisely. `scripts/update-news.mjs` only produces unverified candidate JSON, and cannot publish. A reviewer validates real primary sources and edits **only** `src/lib/newsLatestData.ts`; never append to `newsData.ts`. Label aggregated feed signals separately from editor-checked stories.

## 3. New use cases (only when there is a real content gap)

Identify a specific user task absent from `src/data/useCases.json`. Check title, synonyms, prompt and category overlap in the current repo and all active PRs. Preserve the schema in `USE_CASE_SCHEMA.md`; cite input sources, label hypothetical sample results, add tests for prompts/outcomes and link to an existing topic when relevant.

## 4. Validation and PR

- Run `npm run check` and the applicable security/content validation tasks.
- Examine generated RSS, JSON, knowledge and search exports for correct identity, provenance, locale and links. Build time does not equal publisher review time.
- Record observed vs expected and reproducible failure paths.
- Open a **draft PR** with item counts, source links, verified claims, reviewer notes and CI evidence. Never merge automatically or push to main without explicit authorization.
- Do not send a newsletter or update external channels on draft content.

## 5. After explicitly approved deployment

Only after approval and release, verify actual `/news/`, `/feed.json`, and `/api/use-cases.json` on the deployed site using item IDs and exact text/source metadata. A green workflow is not sufficient evidence of public readback. Log source failures, rejected items, deviations and rollback decisions.

On failures, stop and report the failing gate; do not bypass the review or deploy manually as a fallback without explicit authorization.
