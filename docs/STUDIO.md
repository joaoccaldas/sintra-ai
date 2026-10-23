# Sintra Studio — local editorial workflow

Studio 0.1 extends this repository's Next.js UI and existing `KnowledgeRecord` export contract. It is a local, single-user editorial tool, not a public backend or a generalized visual workflow engine.

## Run locally

Prerequisites: Node 22 or newer, `npm ci`, `yt-dlp` on PATH, and an already installed **local** Ollama model (`qwen2.5:7b` by default). No model downloads or paid services are automatically enabled.

```sh
npm run studio:worker
# In another terminal:
npm run studio:ui
```

Open http://127.0.0.1:3178/studio/ and enter the connection token printed by the worker. It is kept in browser memory only. Reconnect after a page reload. Stop both terminal processes to stop Studio. No LaunchAgent is installed.

The worker binds `127.0.0.1:4319`; the browser origin must exactly match `http://127.0.0.1:3178`. Tokens are not sent to providers. Run files and source snapshots default to `~/.sintra-studio/runs`, outside the repository and static export. One worker owns a store. Do not point two workers at the same data directory. Back up that directory before manual changes; there is no migration or automatic deletion feature.

Environment variable names (never commit values):

| Variable | Default / meaning |
| --- | --- |
| `STUDIO_MODEL` | `qwen2.5:7b`; must be installed locally, remote/cloud models rejected |
| `STUDIO_DATA_DIR` | `~/.sintra-studio/runs`; private run/snapshot location |
| `STUDIO_TOKEN` | Random on startup; optional explicit session token |
| `STUDIO_PORT` | `4319`; current browser client uses this port |
| `STUDIO_ORIGIN` | `http://127.0.0.1:3178`; exact allowed UI origin |
| `STUDIO_YTDLP` | `yt-dlp`; executable path only, no shell flags |
| `STUDIO_CAPTION_LANGUAGE` | `pt-orig`; set `en-orig` or an available caption track for another language |

The first benchmark used the video's Portuguese track. A `-orig` suffix is a provider track identifier, not a guarantee that it is the original recording language. Inspect the video/transcript before treating auto-captions or dubbing as exact speech. Unsupported/missing captions and rate limits are explicit failures; paste authorized `[mm:ss] text` or `[hh:mm:ss] text` as a labelled import when appropriate. Imported and fixture runs never become `live` merely by passing tests.

## Use the workflow

1. Create a run from a YouTube URL. Retrieve captions or import an authorized timestamped transcript.
2. Inspect segment links and the source fingerprint. Extract up to five claims with the local model. Code copies exact source passages; this proves linkage, not entailment. Revise claims if necessary.
3. Fetch a primary-source URL. Copy an exact passage from the fetched text, assess support/contradiction, explain your reasoning and identify the reviewer. All selected claims must have supported evidence before generation. Remove or revise unsupported claims rather than pretending support.
4. Generate a Portuguese article, or edit it. Every prose paragraph must cite `[[claim-id]]`. Validate the meaning of each paragraph against its evidence; syntax checks cannot establish truth.
5. Save and review. Approve the exact saved content or request revision. Any changed draft/evidence/transcript invalidates approval. Unsaved UI edits disable export.
6. Download Markdown and a review bundle with a `KnowledgeRecord` candidate, provenance, usage, approval hash and export receipt. This does not modify the canonical collection or publish. Import reviewed content through the existing repository process and run `npm run check`.

The audit-record download is intentionally available before approval so failures can be investigated. It is private working data, not an approved publication export. No raw HTML is rendered from transcript/model output. Studio loads no analytics script.

## Boundaries and observability

- Six stage states, revision numbers, events and visible errors; an interrupted running stage becomes failed on worker restart.
- Atomic per-run JSON writes with immutable revision copies under `history/`; schema validation on read; corrupt files fail visibly rather than disappearing. A corrupt store needs operator recovery from backup.
- Source content hashes and local snapshots; provider/model digest, prompt hash, measured tokens and duration where returned. Cost remains null/unknown. Hardware energy, subscriptions and total operating cost are not measured.
- One active mutation at a time. Concurrent requests receive 409; stale revisions require reload. Identical transcript re-imports do not duplicate artifacts.
- YouTube subprocess has no shell interpolation, ignores user config, requests no media download and has a 60-second timeout. Caption data is limited to 2MB/2,000 segments. Metadata can be larger; no hard on-disk quota exists yet.
- Local generation has a 30KB UTF-8 input limit and a checked 32,768-token model context, 1,800-output-token cap and 180-second timeout. Cloud models are disabled. No model tools or publication credentials are exposed.
- Evidence fetching permits only the exact primary-source hosts in `studio/providers.ts`, HTTPS and no credentials/custom port. Redirects are rejected; use the final canonical URL. This bounded allowlist is deliberately not an open URL proxy. Adding a host requires source review and regression tests.
- HTTP Host, Origin and bearer authentication are enforced. Request bodies are bounded. This is not a multi-user authorization system; a person/process with local account access can read run files and the token.
- External verification is reviewer-assisted. Automated search, independent claim entailment evaluation, visual/frame extraction, rights clearance, comprehensive accessibility audit, multilingual UI, concurrent job queues and multi-user access remain out of scope for 0.1.

## Verification

```sh
npm run test:studio
npm test
npm run typecheck
npm run check
```

The deterministic HTTP integration tests use injected provider fixtures and temporary stores. They do not certify live providers. See `STUDIO_EVALUATION.md` for the separate live benchmark, deviations, browser evidence and remaining gaps. The repository's standalone `npm run lint` still needs ESLint configuration; do not report its interactive setup prompt as a lint pass.

Owner: repository maintainer. Stable capability locator: `sintra-ai/studio`, entry `studio/server.ts`, UI `src/app/studio/`. Source authority is this repository; public knowledge authority remains `KNOWLEDGE`. Runtime data is private local working state, not a second company knowledge database. Hub identity/version readback remains pending until indexed.
