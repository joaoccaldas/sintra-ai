# Sintra → private Finance RAG: discovery-only projection

**Status: candidate; no automatic admission.** This is a small extension of Sintra's existing `KNOWLEDGE` and static JSON exports, not a new crawler, canonical database, sync service, or scheduled task.

## What can be reused now
- `/api/knowledge-index.json`: existing searchable index of curated records with review dates, source URLs and execution status.
- `/api/knowledge/{id}.json`: per-record claims and source references, to inspect manually for an approved purpose.
- `/api/workflows/power-bi-variance.json`: synthetic variance tutorial and bounded result, not a customer-tenant execution receipt.
- `/api/rag-candidates.json`: **new candidate-only metadata projection**, produced from the same knowledge collection. Its source URLs, review dates and stable IDs permit external verification without copying article text or author prompts.

## Admission contract
1. Consumer reads candidates as **untrusted discovery data** and deduplicates by `candidateId` plus source URI and source revision/fingerprint.
2. A verifier fetches an allowed first-party source, checks individual claims and whether the source is current. Sintra editorial `reviewedAt` is not verification by the consumer.
3. Rights are explicitly **UNKNOWN**. Resolve copyright, licences, retention, privacy, audience and purpose before extracting text, embedding or publishing.
4. Keep source fact, provider claim, worked synthetic example, untested workflow and verified runtime result separate.
5. Obtain explicit authorization to promote a minimal, versioned derivative to the existing canonical source/claim store. Do not promote from a public static file or bypass AUT-0001's paused state.
6. Finance RAG may retrieve a verified admitted derivative within its permissions. It must independently check numerical outputs against governed reference calculations (Nordvik).
7. Log acceptance/rejection, source ID, version, hashes, test evidence, consumer and rollback; never treat a successful build as independent verification.

## Deliberately not built
- No GitHub action, model call, new ingestion daemon or duplicate AUT-0101 sensor.
- No direct Neon/Supabase/Airtable writes, embedding generation, automatic RAG indexing, new permissions or publication approval.
- No employer/client information. Sintra's public synthetic lab cannot replace Nordvik's separate finance metric contract without explicit equivalence checks.

## Tests and rollout
`npm test`, `npm run typecheck`, `npm run check` in an isolated checkout. Confirm the new artifact is in the static export, has stable IDs and unknown rights, and never changes source review dates during rebuild. Hosted CI may remain blocked; record **NOT RUN** until actual run logs exist. Merge and publish only with owner review.

If daily operations already use AUT-0101, consume its durable outbox for new findings. Sintra's existing editorial collection and static feed are reusable **reference surfaces**, not a second canonical intake queue.
