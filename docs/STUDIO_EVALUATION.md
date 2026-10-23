# Studio evaluation, deviations and refinement

23 October 2026. Experimental local vertical slice; not a production or autonomous-verification claim. See [runbook](STUDIO.md) and [comparison](STUDIO_COMPARISON.md).

## Demonstrated workflow

The real benchmark `https://www.youtube.com/watch?v=Q876SRB_-1M` ran through caption acquisition → local-model extraction → reviewed primary evidence → Portuguese draft → editorial correction → test approval → browser download of JSON/Markdown. A subsequent browser edit invalidated approval and disabled export. The final local run is awaiting user review. No content was published, merged or deployed.

Reviewer identity for benchmark support assessments and the approval mechanism test was **Codex test review — not user approval**. This is agent-assisted evaluation, not independent human sign-off. Claims about model or article accuracy are limited to the inspected cases.

| Observation | Result |
| --- | --- |
| Live captions | 441 nonempty timestamped segments; selected provider track `pt-orig`; first timestamp 0.1s, last 748.0s approximately |
| First extraction | Rejected: model quotation did not exactly match cited source text |
| Refined extraction | Five proposals structurally valid after deterministic quotation copying |
| Editorial review | Retained three narrowed claims with corrected segment ranges; removed two overbroad proposals. Zero proposals accepted unchanged. This is not a calibrated accuracy estimate. |
| External evidence | Three short matching passages from the fetched [Anthropic author’s article](https://claude.dev/blog/spending-your-effort/), with attributed, scoped claims and reviewer rationales |
| Draft | Three cited prose paragraphs; reviewer removed extrapolation about precision/reliability before export |
| Browser export | JSON and Markdown both downloaded; Markdown matched the JSON bundle; three facts retained; Portuguese article title; `published:false` |
| Approval regression | Browser draft edit cleared approval; export disabled; server tests separately reject stale approval hashes |
| Restart | Existing live run reopened after worker restarts; interrupted-stage recovery also tested with an isolated fixture |

Source hash: `c1`/`c2`/`c4` evidence snapshot `92ec591a84655697fb047c510eb5d5269f5a491ebb78f0db572de77fdea3f6c8`. Raw captions, source snapshots, model outputs where captured, run revisions and full logs are private local artifacts; they are not committed to the public repository. Earlier rejected model response text was not retained before output-snapshot instrumentation was added; its error, prompt hash and provider usage were retained.

Local model: `qwen2.5:7b`, digest `845dbda0ea48ed749caafd9e6037047aa19acfcfd82e704d7ca97d631a0b697e`.

| Model call | Reported input tokens | Output tokens | Observed duration |
| --- | ---: | ---: | ---: |
| Rejected extraction | 8,741 | 540 | 141.224s |
| Refined extraction | 8,746 | 295 | 106.401s |
| Portuguese generation | 491 | 242 | 42.201s |
| Total observed calls | 17,978 | 1,077 | 289.826s |

Benchmark model tokens: 19,055, including the failed attempt. A separate post-refinement context-check smoke call returned `{ok:true}` with 77 input and 6 output tokens in 15.444s; it is excluded from the benchmark totals. Currency cost remains unknown; local execution does not mean zero energy/hardware/subscription cost. Different output lengths and warm-cache effects prevent treating the duration difference as a general performance gain.

## Deviations and changes

| Expected | Actual deviation | Refinement / disposition |
| --- | --- | --- |
| Caption request succeeds | Broad subtitle request returned HTTP 429 | Single configurable language request succeeded; preserve rate-limit errors and manual import fallback. No retry loop or rate-limit bypass. |
| Bounded metadata read | Initial metadata-discovery attempt exceeded its buffer; video metadata was about 9.6MB | Removed redundant full metadata stdout query; captions and metadata are downloaded once. Metadata disk quota remains a limitation. |
| Exact model quotations | First extraction fabricated/altered quotation text | Model chooses IDs; code copies exact segment text. Segment validity still does not establish entailment. |
| Useful claim citations | Initial IDs pointed at fragments without enough context | Reviewer corrected ranges; UI now exposes every cited passage and timestamp link. Context-selection quality remains a model limitation. |
| Grounded prose | Model added a stronger reliability implication | Narrowed and attributed final wording; keep reviewer-assisted factual validation mandatory. |
| Stable approval | Prototype Boolean survived edits | Server content hash binds source, transcript, claims, evidence, mode and draft; revisions invalidate approval. |
| Durable audit | Prototype lost everything on refresh | Private atomic store, schema checks, revision copies, interrupted-job recovery and visible errors. |
| Local privacy | Existing global layout loaded analytics | Analytics component excludes Studio; browser confirmed no analytics script loaded. |
| Model context budget | Character count alone did not bound token context conservatively | Added a 30KB UTF-8 cap, checked advertised context ≥32,768, and exercised the final adapter in a live smoke call. |
| Honest failure cost | Failed provider calls could omit usage entry | Record failed-call duration and unknown token/cost fields; focused regression test added. |

## Tests and UI evidence

The Studio suite has 15 deterministic tests covering URL spoofing/schemes/credentials, malformed/reversed timestamps, JSON3 parsing, invented/orphan quotations, unsupported facts/citations, approval hashes, invalidation, identical-import idempotency, atomic restart/corruption, HTTP end-to-end fixtures, authentication, origins, stale revisions, rate limits, inert transcript injection, evidence-host restrictions, timeouts/redirects, interrupted recovery, unsafe markup, heading citation bypass and failure-usage accounting.

Mocked provider outcomes are not live-provider results. Prompt injection coverage proves the deterministic path cannot execute tools or publish; it is not a comprehensive adversarial model-resistance benchmark. No formal security audit is claimed.

Browser evidence:

- Desktop 1440×1000: local connection, saved live run, stages, edit/save, test approve and export exercised.
- Mobile 360×800 and tablet 768×1024: document width equaled viewport width, with no horizontal page overflow. Stage navigation scrolls within its own strip.
- Inspected inputs/selects/textareas had labels; keyboard Tab reached a stage button. Full screen-reader/contrast/a11y certification remains unperformed.
- Browser opening reported zero console errors and one development warning. Analytics script absent on Studio.
- Final screenshots: [desktop](images/studio-desktop.png), [mobile](images/studio-mobile.png).

Final release gate results are recorded in `STUDIO_VALIDATION.json`, including source hashes and local log hashes. The pre-existing standalone lint script prompts for configuration, so no lint pass is claimed. Baseline npm audit reported nine findings (six high, three moderate); dependency remediation remains separate from this feature and existing dependency PRs. The full release gate refreshes generated feeds; resulting generated changes are preserved locally and excluded from the feature diff.

## Remaining gates

- Human review of the real article and its source interpretation; no user approval has been inferred.
- Caption transcription/dubbing accuracy versus the audio has not been measured (no WER score). Timestamp linkage was checked, not independent transcription fidelity.
- One video is insufficient for extraction completeness, robustness or general quality claims. Evaluate held-out videos and multiple languages next.
- Verification remains reviewer-assisted; automated primary-source discovery, conflicting-source retrieval and calibrated claim entailment are not implemented.
- No frame extraction, rights clearance, authenticated collaboration, concurrent workers, automated publishing or generic workflow canvas.
- The local runtime and data are available for review; index identity/version readback is pending. Source identity is declared in `package.json` and the runbook.

Hub closeout remains pending: the append request rejected cross-project evidence IDs, and a scoped lookup found no newly indexed Sintra evidence. The earlier HoldingCo reuse assessment remains separately recorded. No cross-project citation was relabelled as proof of this implementation.

## Follow-up contention validation — 23 October 2026

Added a reproducible HTTP contention fixture to the existing Studio suite. A controlled caption provider holds one operation open; 25 competing writes all receive HTTP 409 while health and run reads remain available. After release, retrieval completes; 30 sequential edits each increment the revision once, and all 30 stale-revision attempts are rejected. Reopening the store retains the final draft and transcript, with no extra runs created by rejected writes.

Why: normal-path tests cannot establish that overlapping requests preserve state. This validates the intentional single-worker rejection policy; it is not a throughput benchmark, multi-worker safety test, soak test or real-provider load test. No model or YouTube requests are made by this fixture.

Results: 16 Studio tests and 66 total tests passed; TypeScript checking passed. GitHub validation for feature commit `c4f538cc61afb1b65ee3a8ef00ae808404d1249c` completed successfully (run 39919525478). `STUDIO_VALIDATION.json` remains the original feature-build manifest; its test-source hash/counts predate this added fixture. The feature build was not repeated for this test/documentation-only follow-up.

Next quality gates, in order:

1. Establish a held-out set of varied Portuguese/English videos; manually label representative timestamp passages and claim support before comparing model changes. Include unavailable captions, long transcripts and ambiguous/conflicting claims. Start small, then expand to at least ten videos before generalizing quality.
2. Measure claim precision, missed important claims, source entailment, reviewer correction rate, latency and model tokens per accepted claim. Preserve failed attempts in totals.
3. Test duration/resource boundaries and cancellation with isolated data, including slow/disconnected clients and metadata disk growth. Current bounded contention checks are not sustained stress evidence.
4. Improve primary-source discovery and reviewer efficiency only after the above baseline. Keep factual review and exact-content approval mandatory.
5. Obtain actual user review of the article before export is treated as human-approved; merge and deployment remain separate approval gates.
