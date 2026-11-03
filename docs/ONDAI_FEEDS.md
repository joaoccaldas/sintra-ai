# Shared feed with independent fallback

`npm run aggregate-feed` and `prebuild` now call `scripts/resolve-live-feed.mjs`.

1. Read the ond.ai Feeds snapshot from `https://raw.githubusercontent.com/joaoccaldas/sintra-ai/ondai-feeds-data/sintra-ai.json` (or `ONDAI_FEED_URL`; local builds can set `ONDAI_FEED_SNAPSHOT`). Validate nonempty items, schema and collection freshness within 36 hours.
2. If unavailable, stale or malformed, run the unchanged `aggregate-live-feed.mjs` collector.
3. If collection fails, retain a validated last-good snapshot with its original collection time. If none exists, fail the build explicitly.

`delivery.mode` records `ondai-feeds`, `sintra-collector` or `last-good`; delivery time does not renew publication/collection dates. Keep the existing 06:00 UTC fallback build. New `repository_dispatch: ondai-feed-updated` events use the same existing validation/deployment job.

The Mac publisher defaults off. It uses the owner's existing GitHub CLI authentication and publishes only the reviewed Sintra channel. Local API tokens, custom channels and market data never enter the public snapshot. Approve the exact consumer SHA and scoped public excerpt exception before merging and enabling the publisher. The data branch and end-to-end live primary path have not been published or verified by this implementation.

Run `npm run test:shared-feed`, `npm test`, `npm run typecheck`, and `npm run check`. Tests cover primary success, stale primary fallback, malformed content, preserved cache and total failure with no valid snapshot. Actual prebuild fallback collected 57 stories from 10 sources on 3 November 2026. Live sources may rate limit or change.

Rollback: disable Mac publishing and revert this consumer change. The original collector is preserved. Do not delete historical snapshots as part of rollback.
