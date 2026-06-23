# News refresh, 23 June 2026

- Added 30 reviewed AI news records covering global, European, Swedish and Brazilian developments published from 19 through 23 June 2026.
- Records follow the existing `NewsItem` schema, including provenance, significance, practitioner implications and actions to try.
- New records are stored in `src/lib/newsLatestData.ts` and merged with the append-only historical corpus by `src/lib/newsDataCombined.ts`.
- Duplicate IDs were checked before insertion. Reviewed records take precedence if a future automated update returns the same identifier.
- `scripts/validate-latest-news.ts` asserts the batch size, identifier uniqueness, date window, HTTPS sources and required editorial fields.

## Deployment note

GitHub-hosted Actions remain unavailable because of the account-level runner lock. The source feed is therefore complemented by a runnerless `gh-pages` publication until an exact static export can be produced locally or on a self-hosted runner.
