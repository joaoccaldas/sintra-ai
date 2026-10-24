# Sintra Model Pilot: architectural decision and evaluation receipt

**Date:** 2026-10-24. **Source:** first-win local lab PR #32, integrated beta PR #31 and real HolderCo/Supabase docs. **Stage:** model gateway coded behind disabled flag, not a publicly available model feature.

## Why this architecture?

1. **Keep local deterministic processing** as a genuine private, zero-provider-cost option, not a fake demonstration. Its recall on conversational notes is limited, but every source line can be inspected.
2. **Add a separate trusted Edge Function**, `sintra-meeting-actions`, not a secret-bearing browser client. Supabase's current `@supabase/server@1.9.2` authenticates user JWTs. Edge `verify_jwt=true` must remain on.
3. **Fail closed before any paid call:** `SINTRA_MODEL_ENABLED=true` and a server-only `SINTRA_ANTHROPIC_API_KEY` are both required. Neither is defined in the frontend.
4. **Atomic daily quotas** on HoldingCo: max five model calls per authenticated user and 100 total per day. Private RLS-protected tables, admin-only quota RPC, no notes stored in the quota ledger.
5. **Fixed model and output budget:** Claude Haiku 5.5 with at most 900 output tokens, 4,000 input characters and 15s upstream timeout. Model ID `claude-haiku-5-5` is version-pinned; review price/tokenization changes periodically.
6. **Evidence filter, not blind model trust:** proposed actions must cite the exact original source line, provide 1-based location, and cannot assign owners/deadlines unless those fields appear explicitly in the same line. Every accepted result remains `needs-review`. Unsupported proposals are rejected.
7. **Default deployment stance:** staging only; no signup launch or client model mode without working Auth redirect allowlist, privacy terms, errors/429 handling and real provider-key approval. Do not claim end-to-end execution from unit tests.

## Alternatives rejected/deferred

| Option | Why not for now |
|---|---|
| API key in static GitHub Pages | Credentials become retrievable, infinite abuse/spend risk |
| Open unauthenticated proxy | Anonymous abuse, no durable quotas or consent/account provenance |
| Let the LLM decide when an action is approved | Source quote can support intent but never substitutes human review |
| Cache meeting text for debugging | Unnecessary private data retention and compliance risk |
| Implement full agent orchestration before measuring | Additional latency, cost and failure modes with no demonstrated gain |
| Rely on in-memory rate limit | Edge instances scale independently; does not enforce global quotas |
| Use claimed 100% accuracy from mocked outputs | Synthetic fixtures only prove wiring and validation, not real model quality |

## Pilot stages and hard gates

- Stage A: **synthetic corpus** with 14 labeled fictional PT/EN inputs. CLI `npx tsx scripts/bench-meeting-actions.ts` prints precision/recall/F1 of the existing rules. This is a baseline on fictional examples, not a population generalization.
- Stage B: submit offline JSON provider proposals to the *same exact line validator*; compare line-level scores, explicitly rejected unsupported metadata, max request budget. No provider request required for offline validation.
- Stage C: deploy only an authenticated, feature-flag-off Edge Function to HoldingCo. Anonymous call must fail; enabled mode returns 503 unless separately configured; no provider bill.
- Stage D: after key + user consent + approved privacy text, test actual provider on a handful of **fictional** cases behind authentication, inspect token usage/latency and prompt-injection cases; no personal user data or live open rollout.
- Stage E: after sample quality and costs are justified, build optional UI mode with account login, opt-in provider submission, quotas, error surfaces and result review/copy gates.

**Pilot decision:** no model calls are activated today, no provider credentials are assumed, and the existing local lab continues to work without internet. Make model-supported claims only after a real authenticated provider call with observed response, citation verification and cost metrics.

## Risks to verify
- `@supabase/server` wrapper auth and CORS on real deployed edge runtime (not merely source tests).
- Shared HoldingCo user identity does not grant Sintra roles or permissions by itself.
- Revoked sessions and stale JWTs may remain live for token lifetime. Sensitive controls must revalidate user and permissions.
- Atomic quota RPC is `SECURITY DEFINER` and exists only to support service-to-service calls: revoke EXECUTE from public/anon/authenticated; restrict search_path; never expose the elevated key.
- External model policy for personal or confidential notes is unresolved; no real user uploads until terms/consent are clear.
- Contract JSON compliance is not semantic grounding. Source-line equality and explicit field checks reduce, but cannot eliminate, unsupported paraphrases.
- Model price and tokens evolve; recheck published pricing and assert daily maximum charges before enabling.

## References
https://supabase.com/docs/guides/functions/auth
https://supabase.com/docs/guides/security/product-security
https://platform.claude.com/docs/en/build-with-claude/structured-outputs
https://platform.claude.com/docs/en/models/haiku-5-5/overview

## Evidence placeholders (do not pre-mark pass)
- [ ] CI validation on full feature branch
- [ ] Private table RLS and role grants checked after migration
- [ ] Edge Function deployed with JWT auth, default disabled
- [ ] Unauthorized runtime request fails
- [ ] Synthetic baseline generated with actual numbers
- [ ] Real authenticated model call and token accounting
- [ ] End-user opt-in UI and LLM mode comparison

## Verified implementation receipt · 24 October 2026

- **HoldingCo SQL migration `20261024022728_sintra_model_pilot_quota`: APPLIED**. Two new tables under `sintra_internal`, both RLS enabled. Anonymous and authenticated roles have neither quota table SELECT nor quota RPC EXECUTE; `service_role` alone may execute the atomic reservation function. No member account was created.
- **Edge Function `sintra-meeting-actions`: DEPLOYED version 2**, `verify_jwt=true`, behind `SINTRA_MODEL_ENABLED` feature gate and server-only `SINTRA_ANTHROPIC_API_KEY`. Anonymous GET returned **HTTP 401** after the deployment. No public model mode is activated and no real provider call was tested.
- **Security correction:** v2 uses a maximum **6 KB streaming request reader** even when the HTTP Content-Length header is omitted/forged. This guards memory before JSON parsing. Added UTF-8/invalid JSON/limit tests.
- **Synthetic baseline, 14 labeled fictional cases:** initially 17 TP / 1 FP / 1 FN; canonical task article-normalization corrected false duplicate, after 17 TP / **0 FP** / **1 FN**. Current precision 100%, recall 94.4%, F1 approximately 97.1% **on this synthetic dataset only**. Missing narrative `Joana ficou responsável...` remains deliberate baseline limitation.
- **GitHub CI PASS:** release branch feature PR full validation https://github.com/joaoccaldas/sintra-ai/actions/runs/40054666588: **133 tests**, zero failed; Next static export 514 HTML files, 11,236 links, homepage first-load JS 124 KB. Evaluation https://github.com/joaoccaldas/sintra-ai/actions/runs/40054662231: synthetic baseline JSON artifact and **133 tests** passed.
- **Remaining open:** no user Auth UI, no approved model secret/flag configuration, no real provider inference or cost/latency/quality comparison, no personal-data processing approval, no public model frontend. Existing local lab remains the only user-facing mode.
