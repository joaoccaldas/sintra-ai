---
description: Evidence-backed daily AI news research, with a reviewed editorial PR and no direct production publishing.
---

# /update-news: ONE curated writer; NEVER autonomous publication

This command curates verified items only into `src/lib/newsLatestData.ts`.
`src/lib/newsData.ts` is the historical archive. `src/data/liveFeed.generated.json` is automatically aggregated signals, not evidence that each headline was independently checked.

## Procedure

1. **Discover:** Check main and competing PRs changing both news collections or generators. Work on a dedicated feature branch, never production main.
2. **Deduplicate:** Inspect both historical and latest news IDs, titles and URLs; check related knowledge records. Duplicates must not be appended.
3. **Research:** Optionally run `node scripts/update-news.mjs` with `ANTHROPIC_API_KEY` to generate draft-only JSON. Its output is unverified and intentionally never edits repo files.
4. **Verify:** Independently open each publisher source to confirm dates, quantities, entities, and meaningful assertions; inspect contradictions and provenance. If uncertain, reject. Do not paraphrase unverified research as confirmed. Respect publisher rights and quotations.
5. **Write:** After factual review, edit `src/lib/newsLatestData.ts` only; include unique ID, actual published date and optional known day, title, summary, tags, significance, provider, #RRGGBB, HTTPS source, why_it_matters and what_to_try, plus optional BR/SE country. Never write the historical archive.
6. **Validate:** Run `npm run check`, inspect news, RSS and JSON output plus duplicate/failure tests. Passing shape checks does not independently verify sources.
7. **Review:** Open a draft PR showing primary source links, confidence/limitations, expected vs actual tests, CI run and screenshots/raw HTML. Require explicit editor approval. Do not direct-push main, automatically merge, deploy or send external email.
8. **After authorization:** Verify actual deployed HTML and feed item IDs/source URLs. CI success alone is not a deployment proof.
9. **Report:** Log accepted/rejected stories, failed sources, duplicate cases, approval and live readback. A quiet day with zero verified items is a valid result.

## Fail closed
If provider research fails, source evidence is unavailable, the schema/build fails, approval is stale or source attribution is uncertain: do not publish. Treat aggregated feed signals as separate from editorial facts.
