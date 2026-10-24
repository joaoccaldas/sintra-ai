# Sintra Brasil beta: integration and build reproducibility record

**Date:** 2026-10-24. **Review scope:** `release/sintra-br-beta-20261024`, separate from production `main` at `577d4fd`.
**Status:** integrated release candidate in draft review. Passing CI and browser evidence required; no production merge, Auth launch, email or bulk public content publication.

## Integration provenance

| Input | Working purpose | Integration method | Status |
|---|---|---|---|
| #27 → #28 → #29 → #30 | Responsive frontend, pt-BR default, Brazil-first RSS signals, endorsed ond.ai theme, first practical tasks, isolated preview + browser tests | Exact tested PR30 head used as release branch base | Applied |
| #22 | LLM news suggestions draft-only, human review and canonical editorial writer | 9 exact source files from its head as new Git tree commit | Applied |
| #23 | No fabricated publication day in news/video/RSS metadata | 7 exact source files | Applied |
| #24 | Canonical URL/ID deduplication and non-destructive potential-story review ledger | 4 exact source files | Applied |
| #25 | Stable canonical RSS permalink IDs upstream | 3 exact source files | Applied |
| #9 | Feed freshness failure on outage | Kept in separate draft; assess conflict with existing build audit before inclusion | Not included |
| #14 | Local Studio reviewer-bound approval path | Kept separate; evaluate production authorization/availability after release QA | Not included |
| #13 | Authored 3D workflows and skills | Independent large content PR, not user-journey blocker | Not included |
| HoldingCo database | Existing ond.ai Supabase schema with RLS | No database operations in this PR | Untouched |

Source files copied from the respective **existing GitHub PR heads**; their original PRs remain open and preserve independent review history. These changes did **not** overwrite or merge the `main` branch. Disjoint changed paths were checked from PR file lists, and full integrated CI is the authoritative acceptance gate.

## ADR-001: remove build-time Google Fonts network dependency for beta

**Evidence:** CI failures on 2026-10-23 in `next/font/google` loader, with `TypeError: Cannot read properties of null (reading '1')`, intermittently during cold GitHub Actions builds; issue #26.

**Alternatives:**
1. Keep `next/font/google` and retry: wrong outcome. Network dependence remains and unlimited retries would hide release defects.
2. Google-hosted CSS at browser runtime: build succeeds, but shifts the external network dependency and privacy exposure to end users and can worsen first paint.
3. Immediate font asset vendoring: can preserve exact Inter / EB Garamond, but provenance, exact OFL license, file permissions and checksum review must be complete before distributing font binaries.
4. **Chosen bounded beta fix:** platform fonts with optional already-installed Inter / EB Garamond by family name; no build-time network font fetch and no newly redistributed binary assets. This is honest fallback typography, not a pixel-identical production brand asset.

**Code:** `src/app/font-fallback.css`; root `src/app/layout.tsx` no longer imports `next/font/google`; existing CSS custom property aliases retained so all 500+ exports remain compatible.

**Tradeoff:** fonts differ on devices without the exact installed family. The logo/ond.ai hierarchy, palette, line lengths and mobile screenshots require human brand acceptance against the guide. Replace fallback with reviewed, licensed self-hosted fonts later, with SHA-256 hashes, Git permission review, caching, 3 clean repeated CI builds and before/after screenshots.

**DoD:** three independent clean PR CI builds with no remote font download, browser screenshots at 320–1440 px, text wrap/contrast/zoom review, no change to production until approved.

## Shared content quality and security

- Brazilian publisher feeds produce **source excerpts only**, sorted by headlines and date with an explicit `aggregated-unverified` status. No model or automated provider text can claim independent editorial sign-off.
- Relative and structured publication dates must have a real day; unknown day remains unknown.
- Identical headlines across different URLs are flagged as possible related stories, **not suppressed as proven same event**.
- Candidate research does not push or publish to editorial source and does not email.
- The static preview uses a no-index subpath and must not register production service workers or advertise PWA installation.
- HoldingCo Supabase Auth, editor role grants, privileged publishing, consented email and community approvals remain separate release gates; no new secrets stored in static Next code.
- External PDF, video, model and 3D skill authoring is not automatically verified.
- UI caveat: client-side EN toggle is not a true independently crawled `/en/` page; indexed locale routes remain an independent architecture issue.

## Release verification table

| Check | Observed | Expected before production |
|---|---|---|
| Combined source tests | Pending branch CI evidence | 0 failures |
| Exported route check | Pending | 513+ static files, no broken internal links |
| Six viewport browser smoke | Pending on integrated branch | Zero overflow, real links and share controls |
| Mobile PT/EN toggle | Pending integrated browser check | Full visible home sections translated, original provider headlines labeled language |
| Font reproducibility | Pending repeated clean builds | No `next/font/google` remote load; no flaky dependency |
| Auth RLS & community | Not implemented end to end | Explicit future gate; no public accounts from draft |
| Editorial publishing and newsletter | Not activated | Separate policy sign-off and readback |
| Brand trademark and vector master | Not cleared | Final approval before a public rename |
| Production deployment | Not performed | Owner-approved merge + readback + rollback plan |

## Next increments

1. Verify integrated PR test + browser suite on new `/preview/br-beta/`.
2. Remove redundant branch-specific preview deployment workflows before any eventual main merge. Retain one isolated reusable GitHub Pages review workflow or move to dedicated staging.
3. Audit site-level page templates against the ond.ai tokens, especially news/learn/library/mobile nav/200% zoom.
4. Implement the first real, budgeted AI exercise with a safe model backend, data deletion and evaluation receipts.
5. Establish true static pt-BR/en SEO routes and connected Supabase member lifecycle, plus moderation.
6. Consolidate and route canonical news to approved newsletter/article/research outputs after human review.

**Rollback:** do not force-update main. Revert the integrated release PR prior to merge; temporary preview can be removed from Pages separately without touching root. CI generated artifacts are disposable and retain no user credentials.
