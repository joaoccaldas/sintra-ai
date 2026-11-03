# Sintra AI: 100-step evidence-backed transformation roadmap

> **Status:** proposed tasks, not implemented. Snapshot main `577d4fd`, 2026-10-23. Companion `docs/SINTRA_FULL_WEBSITE_ARCHITECTURE_AUDIT_20261023.md` and PR #15.

## Execution contract

- **P0** blocks relevant public release; **P1** core product reliability and usefulness; **P2** subsequent optimization. These are risk-management priorities, not measured severity for every item.
- Work in reviewable feature PRs; do not merge, deploy or modify prior unmerged PRs silently. Document exact snapshot, reuse decisions, alternatives and ADRs.
- Each step requires actual vs expected, reproduction, owner, unit/integration/browser/security tests as applicable, real screenshot or data evidence, failures, rollback and verified deployment readback when public.
- Do not mistake passed mock tests for provider execution, passed build for SEO/indexing or authored workflows for tested skills.
- Critical sequence: source and brand audit → canonical data and editorial truth → localized static routes and mobile first-win → moderated community → measurable growth.
- First milestone is reliable pt-BR content and a completed meaningful task, **not** maximizing page counts or automated articles.

## Stage dependencies

| Stage | Hard dependency | Quality gate |
|---|---|---|
| Baseline and ownership (001–020) | Existing main and open PR inventory | Reproducible findings, legal brand position, security architecture |
| Content pipelines (021–050) | Source schemas and editorial owners | Provenance, source checks, actual video dates and approval integrity |
| Locale and UI (051–070) | Canonical IDs and content parity | Raw localized HTML, mobile task success, no overflow |
| Engineering (071–080) | Measured baseline and test infrastructure | Real CI/browser/security/performance passes |
| Community (081–090) | LGPD, consent, moderation and backend ADR | Direct API authorization and moderated project loop |
| Growth/launch (091–100) | Stable value proposition and active community | 4-week retained user action and canary/readback |

## Complete 100-step checklist

## 1. Baseline, governance and verification

- [ ] **SIN-001 · P0** Freeze main commit SHA and reconcile PR #9 #13 #14 #15. **Done when:** Document conflicts, owners and unmerged status.
- [ ] **SIN-002 · P0** Inventory every exported route and actual page count. **Done when:** Machine-derived route table with correct metadata and parent.
- [ ] **SIN-003 · P0** Trace source-of-truth for each content domain. **Done when:** All records map to canonical writer and consuming routes.
- [ ] **SIN-004 · P0** Capture mobile screenshots at 320 360 390 430 768. **Done when:** Before evidence shows overflows, labels and tap failures.
- [ ] **SIN-005 · P0** Crawl production raw HTML and sitemap. **Done when:** Canonical, schema, title, language and alternate checks per route.
- [ ] **SIN-006 · P0** Establish actual CI and build baseline. **Done when:** Record SHA, Node runtime, duration and reproducible failure.
- [ ] **SIN-007 · P0** Audit dependencies, licensing and secrets exposure. **Done when:** Security severity and fix/waiver owners documented.
- [ ] **SIN-008 · P0** Inventory reusable Mac agents skills and knowledge hub. **Done when:** Local scan proves reuse or reports inaccessible components.
- [ ] **SIN-009 · P0** Resolve brand name collision and trademark/domain risks. **Done when:** Brazilian legal brand clearance and domain decision.
- [ ] **SIN-010 · P0** Define baselines for editorial, performance and engagement. **Done when:** Unavailable metrics explicitly marked unmeasured.

## 2. Architecture, ownership and safety foundations

- [ ] **SIN-011 · P0** Document static content plus interactive API architecture options. **Done when:** Signed ADR and rollback plan for chosen boundary.
- [ ] **SIN-012 · P0** Assign product, editor, engineering, privacy and moderation owners. **Done when:** Approvals and escalation responsibilities named.
- [ ] **SIN-013 · P0** Create stable canonical content and cross-locale IDs. **Done when:** No source identity drift between public representations.
- [ ] **SIN-014 · P0** Version content schemas, feed schemas and APIs. **Done when:** Backwards compatibility test on existing exports.
- [ ] **SIN-015 · P0** Define truthful status labels for every content item. **Done when:** Automated, reviewed, demo, tested and stale are distinct.
- [ ] **SIN-016 · P0** Threat model source ingestion, Studio and community. **Done when:** Threat boundaries, attack cases and mitigation decisions.
- [ ] **SIN-017 · P0** Define data minimization and LGPD operational requirements. **Done when:** Purpose, consent, retention and deletion plan reviewed.
- [ ] **SIN-018 · P1** Unify CI and production Node versions. **Done when:** Same runtime and npm lockfile in build jobs.
- [ ] **SIN-019 · P1** Introduce documented ownership boundaries between modules. **Done when:** Static content never imports private server dependencies.
- [ ] **SIN-020 · P0** Implement migration and rollback pattern for user-facing routes. **Done when:** Legacy content retained and rollback drilled.

## 3. News ingestion and canonical data quality

- [ ] **SIN-021 · P0** Reconcile update-news script and Claude command write target. **Done when:** One reviewed canonical writer, no divergent archives.
- [ ] **SIN-022 · P0** Separate source signals, editor summaries and full articles. **Done when:** No aggregated item silently receives verified label.
- [ ] **SIN-023 · P0** Remove invented NewsArticle first-of-month dates. **Done when:** No precise publication date inferred from month-only record.
- [ ] **SIN-024 · P0** Store actual publish, retrieve, review and export timestamps. **Done when:** Each field validated and semantically separate.
- [ ] **SIN-025 · P0** Deduplicate URL/title/event claims across incoming sources. **Done when:** Held-out double-source stories resolved with review.
- [ ] **SIN-026 · P1** Monitor every RSS, Atom and HN adapter separately. **Done when:** Per-source status, count, 429, timeout and retries.
- [ ] **SIN-027 · P1** Add source-quorum and degraded-feed policy. **Done when:** Few working sources cannot present false broad coverage.
- [ ] **SIN-028 · P1** Test XML parsing and encoding against malformed fixtures. **Done when:** Parser handles tags, entities, redirects and injection safely.
- [ ] **SIN-029 · P1** Separate news freshness from generated snapshot freshness. **Done when:** Cards display independent publication and review dates.
- [ ] **SIN-030 · P1** Verify GitHub Pages feed after daily action completes. **Done when:** Live URL readback and hash match run artifact.

## 4. Knowledge, catalogs and reusable schema

- [ ] **SIN-031 · P0** Fact-check stratified sample of historic curated news. **Done when:** Claims trace to primary source and corrections logged.
- [ ] **SIN-032 · P1** Inventory tools, models, prompts, skills, guides and topics. **Done when:** Fresh counts and duplicate clusters reproduced.
- [ ] **SIN-033 · P1** Normalize record schema and generate multiple projections. **Done when:** One authoritative record, no hand-copied derived text.
- [ ] **SIN-034 · P1** Extend knowledge provenance and execution status fields. **Done when:** Claim source IDs and limitations validated by schema.
- [ ] **SIN-035 · P1** Define canonical topic/tag ontology across pt-BR and en. **Done when:** Stable mappings, synonyms and testable cross-links.
- [ ] **SIN-036 · P1** Mark use-case sample output as illustrative. **Done when:** No examples mistaken for executed results.
- [ ] **SIN-037 · P1** Move learning from click progress to useful assessed outcomes. **Done when:** One learner artifact evaluated against criteria.
- [ ] **SIN-038 · P1** Benchmark search ranking and scoped retrieval quality. **Done when:** Held-out relevance, false matches, latency measured.
- [ ] **SIN-039 · P1** Measure llms-full and JSON duplication and token budget. **Done when:** Track cost per useful answer and output sizes.
- [ ] **SIN-040 · P2** Deprecate obsolete content with reversible URL migration. **Done when:** No broken links or lost provenance.

## 5. Videos, summarization and editorial Studio

- [ ] **SIN-041 · P0** Remove invented video uploadDate from approximate year. **Done when:** Schema only uses exact verified video publication dates.
- [ ] **SIN-042 · P0** Audit all video sources and summary factual claims. **Done when:** Availability, rights and primary-source support recorded.
- [ ] **SIN-043 · P1** Define YouTube transcript/timecode input and failure contracts. **Done when:** No-captions, privacy, unavailable and multilingual handled.
- [ ] **SIN-044 · P1** Reconcile Studio PR #14 with main and source contracts. **Done when:** Reuse matrix, no second unreviewed pipeline.
- [ ] **SIN-045 · P1** Evaluate Studio against held-out real pt-BR/en videos. **Done when:** Timestamp and correction rate measured by reviewers.
- [ ] **SIN-046 · P1** Preserve deterministic quotations and anchored citations. **Done when:** Hallucinated exact quotes blocked in regression tests.
- [ ] **SIN-047 · P1** Verify external facts and counter-evidence before drafting. **Done when:** Unsupported video claims cannot pass publication.
- [ ] **SIN-048 · P1** Produce timestamped lesson summaries in Brazilian Portuguese. **Done when:** Human review and chapter/source anchors confirmed.
- [ ] **SIN-049 · P1** Bind approvals to content revision through every export. **Done when:** Editing invalidates approval in unit and browser checks.
- [ ] **SIN-050 · P2** Add Studio job observability with costs/latency/error codes. **Done when:** Visible traces exclude secrets and private media.

## 6. Internationalization and SEO architecture

- [ ] **SIN-051 · P0** Create actual static pt-BR and en content routes. **Done when:** Raw HTML meaningful in each language, not client toggle.
- [ ] **SIN-052 · P0** Localize html language, canonical, title and description. **Done when:** Automated DOM checks on representative route types.
- [ ] **SIN-053 · P0** Generate reciprocal hreflang including self references. **Done when:** Only genuinely translated pairs listed.
- [ ] **SIN-054 · P0** Plan and test static GitHub Pages legacy URL migration. **Done when:** No unplanned search 404 or redirect loop.
- [ ] **SIN-055 · P0** Bind translated pages to same canonical record and revision. **Done when:** Missing translation explicitly labeled rather than faked.
- [ ] **SIN-056 · P1** Professionally edit initial Brazilian language onboarding. **Done when:** Comprehension and cultural fit verified by native users.
- [ ] **SIN-057 · P1** Correct RSS, sitemap and JSON language labels. **Done when:** Public exports state their actual locale accurately.
- [ ] **SIN-058 · P1** Validate video/news/guide structured data against sources. **Done when:** No fabricated author, uploadDate or publication day.
- [ ] **SIN-059 · P1** Publish original Portuguese pillar content with real exercises. **Done when:** Every guide contains supported facts and runnable action.
- [ ] **SIN-060 · P1** Instrument search coverage and qualified content conversion. **Done when:** Indexed pages and first-use actions measured.

## 7. Product structure, mobile UI, brand and visuals

- [ ] **SIN-061 · P0** Select final public identity only after clearance. **Done when:** Sign-off on naming, URLs, visual system and migration.
- [ ] **SIN-062 · P0** Redesign top-level menu as five jobs to be done. **Done when:** Início, Explorar, Aprender, Construir, Comunidade tested.
- [ ] **SIN-063 · P0** Offer first-use experience without mandatory account. **Done when:** Newcomer can complete relevant AI action.
- [ ] **SIN-064 · P0** Make homepage understandable without expensive 3D scene. **Done when:** Low-end Android and reduced-motion usable.
- [ ] **SIN-065 · P1** Define type, spacing, color, focus and motion design tokens. **Done when:** Shared UI complies with contrast and responsive rules.
- [ ] **SIN-066 · P1** Audit and consolidate the two hero implementations. **Done when:** Reuse rationale and no accidental feature regression.
- [ ] **SIN-067 · P1** Consolidate navigation/search/locale behavior across routes. **Done when:** Back/home, keyboard and touch operate consistently.
- [ ] **SIN-068 · P1** Standardize card/article/video/tool/project components. **Done when:** Evidence, CTA and loading states reusable across pages.
- [ ] **SIN-069 · P1** Implement transparent unavailable, pending and failed states. **Done when:** No nonfunctional CTA implying completed automation.
- [ ] **SIN-070 · P1** Test phones, zoom, accessibility and translated long text. **Done when:** No overflow, lost focus or unreadable controls.

## 8. Top-grade software engineering and performance

- [ ] **SIN-071 · P0** Resolve security dependency findings before launch. **Done when:** Each advisory fixed or explicitly mitigated/tested.
- [ ] **SIN-072 · P0** Repair lint command and make lint a CI gate. **Done when:** Real lint execution produces reliable pass/fail.
- [ ] **SIN-073 · P0** Define unit, integration, contract and E2E test coverage. **Done when:** Every critical journey includes negative cases.
- [ ] **SIN-074 · P1** Introduce Playwright screenshot regression and a11y checks. **Done when:** Real browser artifacts at required viewports.
- [ ] **SIN-075 · P1** Measure p75 Core Web Vitals and low-end device latency. **Done when:** Track LCP INP CLS and device limitations.
- [ ] **SIN-076 · P1** Profile JS/search bundles and split expensive dependencies. **Done when:** Measured reduction in transferred JS or main-thread time.
- [ ] **SIN-077 · P1** Render Three.js only when beneficial and affordable. **Done when:** Trace GPU/CPU, reduced-data and static fallback.
- [ ] **SIN-078 · P1** Add deterministic build and malformed-source chaos fixtures. **Done when:** Tests reproduce timeout, retry and stale source failure.
- [ ] **SIN-079 · P1** Add trace IDs, alerting and privacy-safe error logging. **Done when:** Can diagnose failure without collecting private prompts.
- [ ] **SIN-080 · P0** Define release quality gate and tested rollback checklist. **Done when:** No deployment without auditable evidence and owner review.

## 9. Community accounts, projects and engagement

- [ ] **SIN-081 · P0** Define scoped moderated community MVP and policies. **Done when:** Project contribution and reporting rules reviewed.
- [ ] **SIN-082 · P0** Choose managed member API and database with portability. **Done when:** ADR evaluates LGPD, RLS, abuse, costs and ops.
- [ ] **SIN-083 · P0** Implement secure profile and draft/project permissions. **Done when:** Ownership, direct REST authz and IDOR tests pass.
- [ ] **SIN-084 · P0** Build moderated submission-to-public project flow. **Done when:** Reviewer actions and immutable project revisions evidenced.
- [ ] **SIN-085 · P1** Implement reporting, appeals, deletion and personal export. **Done when:** Legal rights and abuse handling tested end-to-end.
- [ ] **SIN-086 · P1** Launch one evidence-based monthly builder challenge. **Done when:** Real submitted project and useful feedback verified.
- [ ] **SIN-087 · P1** Award reputation only for reviewed, non-vanity actions. **Done when:** No paid badges presented as proof of skill.
- [ ] **SIN-088 · P1** Track seven-day first useful action with privacy controls. **Done when:** Event schema, dedup and bot exclusions validated.
- [ ] **SIN-089 · P1** Measure four-week action retention and moderation workload. **Done when:** Cohort dashboard, backlog age and abuse metrics.
- [ ] **SIN-090 · P2** Pilot mentors, local events and chapter groups conditionally. **Done when:** Only scale on moderation capacity and retention evidence.

## 10. Publishing operations, growth, business and launch

- [ ] **SIN-091 · P1** Publish transparent editorial and AI assistance policy. **Done when:** Public sources, attribution, correction and sponsor disclosures.
- [ ] **SIN-092 · P1** Enable opt-in digest with provider and unsubscribe checks. **Done when:** Confirmed consent, delivery, retries and removal verified.
- [ ] **SIN-093 · P1** Build voluntary social and WhatsApp distribution templates. **Done when:** Accurate preview, sources, no unsolicited sending.
- [ ] **SIN-094 · P1** Recruit founding Brazilian contributors and run interviews. **Done when:** 20–30 opt-in projects or interviews with evidence of outcomes.
- [ ] **SIN-095 · P1** Pilot education, SME and professional partner channels. **Done when:** Measure referred activated members rather than views.
- [ ] **SIN-096 · P2** Pilot paid workshop or sponsorship without pay-to-win. **Done when:** Transparent economics and sponsorship separation.
- [ ] **SIN-097 · P1** Create weekly product/editorial reliability decision cadence. **Done when:** Signals, thresholds, owner actions and evidence archived.
- [ ] **SIN-098 · P0** Require independent privacy, security and content launch review. **Done when:** No unresolved critical authorization or editorial failures.
- [ ] **SIN-099 · P0** Release canary with live-site readback and rollback drill. **Done when:** Verify actual pt-BR pages, feeds, member flows and telemetry.
- [ ] **SIN-100 · P1** Evaluate scale decisions using measured four-week cohorts. **Done when:** Decision memo includes confidence, limitations and alternatives.

## Milestones and tracking

**Batch A (critical repair):** SIN-001–030 and SIN-041–042. Capture reproducible baseline and fix unsafe structured dates/dual news writer.

**Batch B (content and pt-BR):** SIN-031–060. Build typed provenance, Studio evaluation, real pt-BR/en indexing.

**Batch C (first-win product):** SIN-061–080. Consolidate mobile system and establish engineering quality/performance gates.

**Batch D (community):** SIN-081–090. Ship restricted, moderated project contribution; collect real retention.

**Batch E (launch):** SIN-091–100. Human-reviewed digest and partner experiments, canary after launch approvals.

Every completed checkbox requires a GitHub PR/commit, reviewer, test outputs, artifacts, remaining limitations and a rollback note. No user metrics, live performance or cost reductions have yet been measured by this audit.
