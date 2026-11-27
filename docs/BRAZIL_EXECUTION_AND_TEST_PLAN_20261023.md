# Brazil mobile-first transformation: execution plan and test contract

> DRAFT execution backlog, 2026-10-23. Owner to approve public brand, domain and production release. No implementation in this PR. Keep PR #13, #14 and #9 isolated until dependency/rebase analysis.

## Scope / ordering (reuse first)

**Baseline before modifications**: snapshot main SHA, current static exported route list, indexability/raw HTML, country/language distribution if analytics available, RUM vitals, top routes and search queries, content counts, feed freshness, test failures, active PR conflicts, dependency vulnerabilities. Report unavailable telemetry as 'not instrumented', not zero.

| PR | Slice | Repo touchpoints (proposed) | Definition of done | Reason/order |
|---|---|---|---|---|
| BR-00 | Baseline + brand clearance | docs, data-quality scripts, analytics | brand/trademark/domain risk register; 320/390/768/1440 captures; query/route inventory; no false 'live' claims | Prevent building on ambiguous assumptions |
| BR-01 | Indexable locale foundation | app routing/layout, i18n, metadata, sitemap, navigation links | actual pre-rendered pt-BR + en HTML; locale-specific lang/title/description/canonical; reciprocal hreflang, x-default; saved language UI links; static-export passes | Stop wasting Portuguese acquisition |
| BR-02 | Mobile navigation + home journey | Header, SidebarNav, ImmersiveHero, ContentNav, CSS | test 320/360/390/430/768/1440, no overflow, thumb reachable menus, task completion, no gated content; WebGL absent or lazy when appropriate | First impression and activation |
| BR-03 | Content model + editorial QA | news/guides/use cases schema + validators | locales tracked per item, no fake translations, source URL/date/reviewer, status labels, stale feed gate; rights/provenance test | Trust and useful discovery |
| BR-04 | 'First win' interactive learning | learn/guides/prompts; no backend at first | 1 pt-BR beginner workflow, exercise + evidence-based acceptance, no-account completion; 10 real user sessions | Outcome before sign-up |
| BR-05 | Community foundation | dedicated API service, profiles/projects/auth | members submit project, mod queue, approval/rejection, rate limit, RLS/ownership, content removal, audit logs | Start network effect with one contribution |
| BR-06 | Community discovery + project challenge | community search, project pages, challenge | curated public projects with author consent; unique canonical pages, reputation from verified activities; no engagement fraud | Retention and community identity |
| BR-07 | Digest + referral measurement | reviewed newsletter, preferences, share | clear opt-in/unsubscribe, dry-run, no unapproved bulk sends, referral measured by activated contributors | Low-cost distribution |
| BR-08 | Studio integration + observability | consume approved PR #14 contracts after reconciling | source -> draft -> review -> publish provenance; 2-person editorial workflow; no bypass after edits | Maintain sustainable supply |
| BR-09 | SEO/GEO and accessibility release | Search Console, structured data, sitemap, perf | coverage verified on real deployment + mobile vitals + manual editorial sampling + rollback | Scalable acquisition after utility exists |

### Required PR conventions

Each PR has: current baseline, scope, risk, competing implementation scan, screenshot/screen recording for mobile, unit/integration/e2e tests, raw HTML snapshots if SEO touched, security and abuse tests if user content touched, time/cost evidence if LLM touched, actual vs expected, rollback, explicit missing verification. No big-bang rewrite or silent route removal. Do not merge/release automatically.

### BR-01 tests (localization)

- Build-time export contains /pt-br/ and /en/ homepage and 3 selected representative content types. Check generated HTML with parser and verify body language content, title, meta, heading, canonical.
- Validate all localized pairs are bidirectional; do not emit alternate if no translated main content; default route not a JS-only Portuguese switch. Verify old indexed URLs survive or receive a well-scoped migration strategy. Static GitHub Pages may not issue HTTP 301; plan hosting-level redirects or canonical strategy before any new custom domain.
- Keyboard language selector returns to equivalent content and persists only preference where lawful. Reject accidental mixed locale navigation. RSS and machine-readable endpoints may be single-locale initially if labeled.
- Release gate: all existing unit tests and export internal-link validator green, plus new locale tests green.
- `[locale]` segment with `generateStaticParams` is an option under static export, but root <html lang> and client context need coordinated refactoring. Alternative: explicitly separate app layouts / exports. Choose based on runnable spike; avoid copying whole route tree.

### BR-02 tests (usability)

- Test with a 320px low-end Android profile and real 360/390px touch devices, offline-ish/slow network throttling, 200% font scale, accessibility keyboard/screen reader, reduced motion, images off.
- Focused tasks: find verified AI news; choose the right learning path; run an example; share a project; switch locale; return home. Capture success %, time, hesitation, rage taps and steps. Make navigation labels understandable to complete beginners.
- Ensure accessible navigation and no accidental back-forward history traps; avoid a heavy always-on canvas. Keep desktop advanced discovery through progressive disclosure.

### BR-03 editorial quality and anti-spam tests

- Every source-linked factual claim is traceable to one or more citations; reviewer-assisted does not equal fully verified. Stratified held-out cases include contradictory articles, misleading timestamps, duplicates, hallucinated quotations, provider 429/timeouts, copyright limits, localized nuance and stale links.
- Format publication data for humans and models from **one canonical record**, not repeated unverified LLM-generated variants.
- Unit token budgets by pipeline stage, local caching/extraction, semantic dedup candidate review, separate retries and publish gating. Alert on changes in cost per *accepted* article, not only tokens total.
- Corrections and takedowns must propagate to public HTML, feeds, localized variants and JSON exports.

### BR-05 permissions/security checklist

- Anonymous users can browse; no anonymous write. Private drafts and reports never leave authenticated scope. RLS by user / role enforced on data layer (not just UI). Admin moderation is explicit.
- Server-side payload length/schema checks, CSP/CORS/CSRF where relevant, output encoding for markdown, upload validation/virus scan policy, rate limits, captcha only when justified, IP abuse handling and escalation, deletion/export workflows, consent receipts, processor records.
- Full adversarial tests: bypass via direct REST calls, IDOR, owner changes, duplicate webhooks, mass registrations, spam, prompt injection in project descriptions, secret leakage through logs, PII in public pages.
- High-risk community content remains pending review; no hidden AI-generated personas as real users.

## North-star event taxonomy (privacy-minimal)

Instrumentation to implement after privacy review. Every event has `event_id`, `occurred_at`, `environment`, `session_pseudonym`, `locale`, `device_class`, `route_id`, `experiment_id` (optional). No raw prompts, sensitive conversation content or emails in telemetry.

- `page_view`, `search_submitted`, `search_result_opened`, `source_opened`
- `learning_started`, `learning_artifact_created`, `learning_completed_verified`
- `project_draft_created`, `project_submitted`, `project_approved`, `feedback_posted`
- `newsletter_opt_in_confirmed`, `digest_click`, `referral_visit`, `referral_activated`
- `mod_flag_created`, `mod_case_resolved`, `content_correction_published`

Primary reporting: weekly active verified actors, 7-day first-win activation, 4-week action retention, 28-day learning completion, moderation queue age, supported-claim pass %, organic activated users, cost/accepted editorial artifact, provider errors, p95 stage latency.
Test event idempotency and exclude bots/staff/tests from community and conversion claims.

## 30 / 60 / 90-day delivery hypotheses

**Days 0–30:** business identity/name gate, user interviews (n >= 15 across beginners/builders), brand messaging tests, instrument baseline, localized landing and essential public pages, stripped-down mobile navigation, first learning action, review news status. *Exit: observed first-win user success and audited SEO export.*

**Days 31–60:** moderated projects and privacy-safe accounts, inaugural challenge, opt-in digest, member interviews (n >= 15 more), evidence-first publication from owner-only Studio. *Exit: working contribution flow, tested moderation and repeat member action.*

**Days 61–90:** referral mechanics, expert-led weekly office hours (if operator confirmed), partnerships, cohort/community programming, refine based on real retention and support burden. *Exit: growth-loop evidence without sacrificing content quality; decide whether to scale before monetization.*

These are planning horizons, not promises of future autonomous/background execution.

## Growth and monetization experiment order

1. Start with SEO pillar pages that answer real Brazilian job-to-be-done queries: 'como usar IA no trabalho', 'automatizar planilhas', 'IA para pequenos negócios', 'criar agente sem código', 'qual modelo usar e por quê'. Each must include a reproducible exercise or original comparison.
2. Distribute **human-reviewed** 1-3 high-signal weekly stories + one action via Instagram, YouTube Shorts and voluntary WhatsApp shares; avoid distributing scraped recycled article volume.
3. Recruit 20–30 founding contributors across careers and regions with tangible artifacts, feedback, community recognition and moderated project nights. Publish case studies only with permission.
4. Pilot partners in technical education, incubators and small-business associations only after retention data supports value.
5. Monetization after trustworthy engagement: sponsor disclosures, opt-in premium workshops, recruiting introductions and qualified employer/program partnerships. No undisclosed rankings/pay-to-win credibility.

## Research and unresolved decisions

- **Public brand legal/domain check: OPEN**. Existing sintra.ai is a documented collision, not a conclusion about infringement. Need independent trademark review and handle validation before publishing under a distinct brand.
- **User research: NOT RUN**. Personas are hypotheses, not measured segment fit.
- **SEO audit: code inspected, production Search Console NOT INSPECTED**. No traffic or ranking claims.
- **Performance: UI code inspected, live Lighthouse/CrUX NOT TESTED in this PR**. No claimed load improvements.
- **Community vendor/hosting: NOT SELECTED**. Existing GitHub Pages supports content, not authenticated writes. Evaluate separate API managed solutions by total cost, data governance, RLS support, security operations.
- **Newsletter provider: NOT SELECTED**. No bulk send approval.
- **Content rights:** original analysis/quotations review needed, including source licenses and consent for creator contributions.
- **Funding/commercial strategy:** measure operational margin and quality before revenue projections.

## Evidence and references

Repo: https://github.com/joaoccaldas/sintra-ai ; PR #14 https://github.com/joaoccaldas/sintra-ai/pull/14 ; PR #13 https://github.com/joaoccaldas/sintra-ai/pull/13 ; PR #9 https://github.com/joaoccaldas/sintra-ai/pull/9

Official Google internationalization: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites ; https://developers.google.com/search/docs/specialty/international/localized-versions

Official Google AI content discovery: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

Brazil evidence: https://cetic.br/pt/noticia/50-milhoes-de-brasileiros-ja-usam-ia-mas-potenciais-beneficios-continuam-limitados-as-camadas-de-maior-renda-e-escolaridade/

**Interpretation rule:** User-facing reports distinguish inspected code, executed tests, 3rd-party documented claims, hypotheses and pending verification. Do not turn proposed metrics into actual achievements.
