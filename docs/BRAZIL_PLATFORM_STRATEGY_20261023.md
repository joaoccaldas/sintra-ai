# Brazil-first AI platform: product strategy and evidence register

> Status: PROPOSED, not shipped. Updated 2026-10-23. Internal code name: Sintra. **Public brand not selected or cleared.** This document is a decision record for a mobile-first community transformation, not evidence of implemented functionality.

## Decision

Build Brazil's most useful evidence-backed AI learning-and-building community by connecting **discovery → understanding → practice → building → sharing → opportunity**. Compete on members who successfully apply AI, not on raw articles, scraped headlines or unverified membership counts.

**Mission (pt-BR):** "IA que você entende, usa e constrói. Junto com quem faz." 
**Mission (en):** "AI you can understand, use and build. With people who make things."
These are provisional messaging examples, not a cleared brand or final copy.

## Known repo baseline (2026-10-23)

- Repo: `joaoccaldas/sintra-ai`, main, static Next.js 15 export to GitHub Pages; `src/app`, `src/lib`, `src/components`, `src/context`, generated feed and public JSON exports.
- Existing capabilities: curated historical/near-current news, live feed aggregator, tools/model references, prompts, knowledge, guides, learning paths, concepts, downloadable skills/API-like static files, localized UI messages.
- Present routing: `src/app/page.tsx` -> `Header`, `ImmersiveHero`, `ContentNav`; 3D WebGL in hero; desktop sidebar has extensive discovery/learning/reference links.
- `LanguageContext` initializes English and switches after mount, `layout.tsx` declares `lang=en`. Translation does not equal separately indexable Brazilian Portuguese articles.
- `next.config.mjs`: `output: export`, `basePath: /sintra-ai` in production. Site is not a member application, and static JSON 'APIs' are not interactive services.
- `src/app/automate` documents patterns; never imply runnable automations without successful provider execution.
- Draft PR #14: local, reviewer-gated YouTube -> claims -> evidence -> pt-BR draft -> export Studio. PR #13 adds unexecuted 3D learning recipes, PR #9 addresses stale feed; coordinate before changing common files. No merge/deploy without review.
- Local worker / Mac-only services are **not** internet community infrastructure.

## Market grounding and segmentation

Official Brazilian survey results: Cetic.br reported ~50 million (32%) Brazilian internet users aged 10+ using generative AI in its 2025 TIC Domicílios survey; unequal rates between social classes. TIC Empresas 2025 reported AI use at 17% among surveyed businesses (from 13% in 2024). Verify population definitions when using figures.

Independent competitive scan (not an exhaustive ranking):
- Alura: AI immersions and professional education.
- IA Builders Brasil: project publishing, builders, open community, challenges and optional paid tier.
- AI Brasil: events and community network.
- Google, ChatGPT, YouTube, Instagram, WhatsApp, and large education platforms are substitutes for at least one user job.
- Unrelated `sintra.ai` already sells AI employees and a knowledge platform. **Trademark and name collision are a launch-blocking review gate; a URL availability check is not trademark clearance.**

Initial core audience **proposed**: (A) career-changers and working professionals seeking first applied AI success, (B) independent Brazilian builders, freelancers and small-business operators who ship artifacts. Educators/employers as multipliers, not a third unrelated product initially. Design for low-bandwidth Android and varying technical literacy.

Positioning: "Most useful Brazilian AI community for turning learning into proof of work."
Anti-positioning: generic news aggregator; unrestricted AI-content farm; premium-only course catalog; AI agent marketplace before trusted supply/demand exist.

## Product loop and information architecture

Public mobile navigation (max five destinations): **Início | Explorar | Aprender | Construir | Comunidade**. Compact search, locale switcher, and profile/account in header; primary CTA contextual. Desktop adapts, it must not govern the mobile information hierarchy.

Proposed page structure:
- **Início:** one-sentence outcome, choose goal [Começar | Trabalhar melhor | Criar], one verified highlight, today's practical task, editorial status.
- **Explorar:** trusted news, collections, tool comparisons, market trends, searchable evidence.
- **Aprender:** short pathways with real exercise and testable completion criteria, not simply "read".
- **Construir:** vetted prompts, reproducible workflows and project submissions; Studio stays owner/editor-only until proven safe.
- **Comunidade:** start with curated member projects, moderated discussions, monthly challenge and events; login only when contribution is required.
- **Profile:** projects, completed practices, public credibility, opt-in notifications; never invent achievement or credential.

Mobile design constraints: 320px minimum; 360/390/430 first-class; readable 16px body; minimum ~44px touch targets; no horizontal overflow; navigation understandable in under 5 seconds; useful experience with JS degraded where feasible; reduce heavy WebGL for phones, slow devices, reduced motion. Do not trade core web vitals for decorative 3D.

## First production MVP, deliberately narrow

1. Genuinely indexable Brazilian Portuguese homepage and 5 essential public sections; English locale as parallel actual pages where translated content exists.
2. A curated "comece aqui" path with a measurable action: user completes a real AI task and can download/share artifact. No account needed.
3. News and practical guides with original analysis, source links, updated/reviewed dates, author and editorial status, "what to try".
4. One sustainable community interaction: submit a public project with moderation; optional Google/Email sign-in via a separate managed backend after legal/privacy review.
5. Weekly digest **opt-in only**, with verified opt-in, unsubscribe and transparent editorial policy; WhatsApp share/referral deep links, NOT unsolicited blasts.
6. A monthly project challenge, small initially; authentic submissions with provenance, human review and helpful peer feedback.

**Defer:** public open-ended chat, unlimited user-generated prompt feeds, financial token rewards, monetized rankings, AI-generated community bots masquerading as members, native apps, generalized skill marketplace, automatic publishing of unreviewed news.

## Editorial and automation operating system

Pipeline: Source adapters -> deterministic extraction, timestamps, dedup and source IDs -> structured evidence packet -> LLM classification/synthesis where needed -> deterministic schema/citation checks -> human reviewer -> versioned editorial publish -> distribution -> measurement -> correction loop.

Per content item: `source_url`, `source_published_at`, `retrieved_at`, `claim_id`, `claim_support`, `author`, `reviewed_at`, `locale`, `version`, `status`, `editorial_disclosure`, `canonical_id`.
Status must distinguish **live, preview, proposed, stale, failed, test/demo**.
Dedup by URL canonicalization + content digest; semantic matching is candidate generation only, not automatic factual collapsing.
Never use language-model confidence scores as independent evidence.
No automatic execution, external email or publication without explicit bounded authorization and auditable policy.
Keep Studio reviewer-bound exports; edited content invalidates approval.

Cost/performance baseline each stage: input/output tokens per accepted item, model/provider, retry rate, human minutes, verified claims per final published item, duplicate suppression, errors, p50/p95 latency. First optimize exact deterministic retrieval, cache and extractive context before introducing additional LLM stages.

## Technical architecture and boundaries

- Preserve static Next.js content pipeline and public corpus. Add real locale routes as statically generated content with stable IDs; don't install a new CMS until editing bottlenecks are measured.
- Use `/pt-br/...` and `/en/...` under existing deployment base path during migration. On a validated custom domain the same paths work without repo prefix. URL language is canonical, not a browser-only post-hydration toggle. Each localized page renders its own HTML content, metadata, `<html lang>` and reciprocal `hreflang` (including itself); pair only genuinely translated articles. No auto-redirect from search on IP.
- Separate interactive membership API from static site with a modular service: managed auth, Postgres, row-level permission policy, moderation queue, audit trail, rate limits, abuse detection and export/delete requests. Vendor decision must follow cost, local compatibility, data residency, account permissions and operational readiness review. No local worker exposed publicly.
- Community entities: `users`, `profiles`, `projects`, `project_versions`, `comments`, `reactions`, `moderation_cases`, `events`, `challenges`, `submissions`, `consents`, `audit_events`. Design for portability and subject-deletion propagation.
- LGPD: data minimization, purpose-bound consent, accessible policy and rights workflow; vet third-party trackers and hosted processors before collecting account data.
- Current `llms.txt` and static JSON exports remain useful as structured artifacts, **not substitutes** for crawlable unique content, originality, provenance, internal links, correct canonicals, or performance. Google's official 2026 guidance explicitly advises focusing on quality rather than GEO tricks.

## North-star and measurement plan

**North-star (proposed):** weekly active members who complete a *meaningful verified learning, building, or contribution action*. A page view, email open, automated post or empty "like" does not qualify.

Activation = new member's first completed useful action within 7 days. Retention = activated users who return with another meaningful action in week 4. Organic distribution = nonpaid branded/nonbranded qualified traffic, referral activated members, and original-source citations. Editorial = claim support pass rate, time-to-correct, review minutes and error rate. Trust & safety = spam acceptance %, first-response hours, reports per 1k contributions. Unit economics = operating cost per active contributor, token cost per accepted publication, newsletter cost per engaged subscriber.

**Proposed experiment gates, not externally established benchmarks:**
- Baseline before launch; target 50 initial user tests across devices/skill levels, including beginners.
- First-task completion >= 60% in moderated usability tests; independent accessibility audit.
- Core Web Vitals at 75th percentile: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 on mobile field data when volume allows.
- Zero unsupported factual claims in a manually checked small release sample; all published high-impact news visibly source-linked.
- No unauthenticated write paths, no public PII leakage, no default-open moderation.
- Track activation and four-week retention before scaling acquisition.

## Sources and confidence

- Repo inspection (2026-10-23): `src/app/page.tsx`, `src/app/layout.tsx`, `src/components/SidebarNav.tsx`, `src/context/LanguageContext.tsx`, `next.config.mjs`, `package.json`, open PRs. **High confidence** for observed repository code; runtime/browser performance not remeasured in this work.
- Brazil survey: https://cetic.br/pt/noticia/50-milhoes-de-brasileiros-ja-usam-ia-mas-potenciais-beneficios-continuam-limitados-as-camadas-de-maior-renda-e-escolaridade/ and https://cetic.br/pt/noticia/uso-de-inteligencia-artificial-por-empresas-brasileiras-avanca-e-atinge-17-aponta-pesquisa-do-cetic-br/ (**high confidence** survey claims within definitions).
- Google localized sites: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites and https://developers.google.com/search/docs/specialty/international/localized-versions (**high confidence** official guidance).
- Google AI discovery guidance: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide (**high confidence** on Google's published guidance, not rankings guarantee).
- Competition examples: https://iabuildersbrasil.com/ ; https://somos.aibrasil.ai/ ; https://www.alura.com.br/imersao-ia ; https://sintra.ai/ (**medium confidence** on self-described claims, not audited membership).
- Positioning, navigation, proposed tech/milestones and numeric gates are **hypotheses and recommendations** needing actual user testing.

## Non-goals and go/no-go gate

**No claim to be 'largest' or 'top' before a defined comparable metric and independent measurement.**
Public launch requires legal brand clearance, localized HTML/SEO tests, mobile usability and field metrics, editorial audit, working opt-in/privacy flow, community security/moderation, and red/green evidence for each acceptance criterion. Existing content should not be deleted or redirected until parity and URL migration tests pass.
