# Sintra Brasil: competitive mobile product audit and engineering gap closure

**As of:** 2026-10-23. **Code baseline:** PR #29 at `87104ea1` (stacked on #28 and #27), versus live `main` at `577d4fd`. **Status:** assessment + bounded implementation, not a claim of launch or market leadership.

## Operating thesis

**Sintra must win on useful outcomes, not news count.**
The ideal user path: Brazilian headline **→ understand original evidence → try one practical task → show a useful result → share/ask for help → return to contribute**.
Success = a verified useful AI action in the first seven days; avoid substituting raw page views, chat spam, AI text generation or invented achievements.

## Observed comparisons (externally researched, not claims of causal growth)

| Reference | Observed public mechanism | Sintra adoption, with caveats |
|---|---|---|
| WhatsApp / Instagram | Share-first mobile consumption; accessible from phones; in Brazil 2025 Instagram app installation ~91% in Mobile Time/Opinion Box survey | Explicit, user-triggered WhatsApp/native share. Don't send unsolicited messages; share actual resolved URL and honest source status |
| the news | Category-organized ~5-minute weekday email, fixed 06:06 rhythm and focused subscribe offer | Brazil-first one-screen read with source links, and *later* a separate double-opt-in digest. Do not claim newsletters send before provider integration |
| Duolingo | Simplified tabs, bite-sized active practice, motivation via actual completed lessons | First result from existing use-case catalog, visible beginner pathway, later peer-verified skill progress. Do not make streaks reward passive scrolling |
| Nubank | Public June 2026 design system update stresses interface consistency, coherent brand architecture and transition-safe typography | Ond.ai endorsed Sintra visual language, consistent mobile CTAs and accessible type. Distinct coral product accent; shared light-first brand tokens |
| Alura | AI course catalog, four-week project challenges, public learning/community support | Beginner-friendly AI case submissions and practical learning cohorts; launch with one moderated project feedback loop before ambitious forums |

**Sources and dates:** https://datareportal.com/reports/digital-2026-brazil ; https://www.mobiletime.com.br/noticias/30/04/2025/instagram-tiktok/ ; https://thenews.com.br/inscrever ; https://blog.duolingo.com/core-tabs-redesign/ ; https://blog.nubank.com.br/brand-refresh-como-renovamos-a-identidade-visual-do-nubank/ (10 Jun 2026); https://www.alura.com.br/challenges . These products are references, not endorsements, and adoption figures differ in methodology and time period.

## Actual existing product state

- **Verified:** PR #29 light-first branded Portuguese homepage, open ond.ai wave mark, PT default, Brazilian RSS radar with 2 publisher endpoints, collapsible desktop navigation and five-slot mobile dock. PR #29 CI has passed, but no full physical Android browser/performance/accessibility audit.
- **Data:** Brazil ingestion on PR #28: 50 Canaltech and 10 Agência Brasil raw feed items, 4 eligible AI headline signals in the first sampled build. This does NOT establish full Brazil coverage or independent source fact-checking.
- **HoldingCo backend:** Supabase project `ogdndkbvlebzqbnwaevm` contains 10 Sintra prefixed/shared tables with RLS enabled; no users created, no UI connected, no newsletter deliveries. Publisher RSS jobs are not persisted into the Supabase backend.
- **Main remains on the original landing.** PR #22 (AI candidate publishing gate), #23 (fabricated publication dates), #24 and #25 (upstream/downstream dedup) are separate, unmerged correctness fixes. Do not silently claim that the Brazil-first branch inherited them.
- **Production architecture:** static Next.js export under GitHub Pages; browser PT preference but not truly indexed /pt-br and /en counterparts. Auth/client may read direct RLS data when configured; editorial privileged operations require authorized backend.

## Highest-confidence engineering problems (source-inspected)

| Priority | Evidence | Problem | Correct response |
|---|---|---|---|
| P0 | `ContentNav.tsx` imported from `app/page.tsx` | A 447-line client homepage component imports newsDataCombined + huge historical datasets/tools/models/guides/learning/video even though the new hero needs none of that | Replace homepage with small server-rendered sections and source-only validated real records; retain older code for safe later deletion |
| P0 | `SidebarNav.tsx` imports full `AI_NEWS` and `AI_TOOLS` just to display record counts | Global initial bundle can pull deep registries | Remove counts and imports from persistent client nav; use light build-generated stats if desired later |
| P1 | `BackToTop.tsx` uses bottom-6 at every width | Fixed control can cover the 70px thumb dock | Offset only on mobile with safe-area |
| P1 | `MobileDock.module.css` white background independent of dark theme | Explicit dark/forest/ocean choices can have poor visual semantics | Provide theme-specific dock/background/selected state |
| P1 | Root homepage has many separate nav and dense editorial areas | Three goal cards, double news sections, live strip, 6 generic use cases, old RSS CTA are too much above a useful outcome | First primary action + Brazil news + 3 global signals + 2 canonical prompts + clear community-not-yet-live note |
| P1 | `BrazilRadar` and RSS aggregation | Country of publisher ≠ local impact; screenshots might show English/global articles under Brazil header | Disclose provider-only status; do not call ranked signals editor-verified news; independent editorial workflow next |
| P1 | Newsletter UI | Configurable POST endpoint but no confirmed email sender, double-opt-in or unsubscribe integration | Label unavailable; keep contact invitation separate from subscription until approved |
| P1 | Brand | Old navigation tesseract assets and copy persist on non-home pages; separate CSS theme systems | Token migration + real browser golden screenshots on all key page templates, not a global blind CSS overwrite |
| P1 | JS performance | PR #27 prior homepage 517kB First Load JS vs 636kB old; still heavy | Server page and remove client registry imports, measure result in CI before claiming numeric improvement |
| P0 | SEO/locale | Existing static html lang pt-BR when PT default, but EN toggle is post-hydration | Real `/pt-br/` and `/en/` pages, correct canonical/hreflang and rendered localized BODY; preserve redirects |
| P0 | Safety | PR #22–25 date and publisher identity fixes remain separate | Rebase/reconcile feature stack before approved production promotion |
| P0 | Auth/operations | HoldingCo RLS foundation not connected to runtime | Signed user-specific RLS/IDOR tests, verified auth redirect allowlist, moderation and legal/consent policy before public membership |

## Changes in this PR: immediate gap closure

1. `app/page.tsx` returns to a **server component**, importing no giant `ContentNav`.
2. `HomeEditorialSections.tsx` uses **real build-time feed** and **canonical `USE_CASES` records** only on the server: three world publisher headlines, two truthful first-win exercises. Static output renders without personalized login or live external fetch.
3. Single 46px primary CTA scrolls to `#pratique`; no fabricated rewards, rankings or publication status.
4. Explicit user-triggered native share with WhatsApp fallback using **the page actually being viewed**, preserving preview vs production URLs.
5. Existing mobile dock stays thumb-reachable, dark/forest/ocean states improve, and BackToTop is raised above dock.
6. Sidebar no longer loads `AI_NEWS` and `AI_TOOLS` just for cosmetic counts, preventing unnecessary persistent client-side imports.
7. Community block transparently says registration/contribution workflows are not yet public, links editorial suggestions to user-designated `konamundo@gmail.com`, without newsletter signup spoofing or unsolicited outgoing emails.
8. New tests cover server/client boundary, canonical exercises, voluntary sharing, dark dock and mobile overlap. Static Next build remains the arbiter.

## Next engineering acceptance gates

**Mobile UI**: screenshot and interaction tests at 320/360/390/430/768/1440 px with light/dark, keyboard tab order, 200% zoom, low-end Android, long Portuguese headlines and native WhatsApp flow.

**Performance**: compare First Load JS of '/' against PR #29 same build runner and clean-lock install; p75 LCP <=2.5 s, INP <=200 ms, CLS <=0.1 in eventual field samples. Browser trace should show no hydration/canvas required to read actual content. A bundle decrease is not automatically a Core Web Vitals improvement.

**Data**: monthly duplicate-source regression corpus, confidence and publisher attribution, original date precision, publisher rights, source uptime, clearly marked unavailable state. Distinguish "source published" / "fetched" / "reviewed" / "page built" / "translated".

**Community**: real Supabase auth sessions with deep links, RLS checks as member/visitor/editor, no client role escalation, member draft->submitted->reviewed->published, report and appeal queue, protection from spam, deletion, LGPD policy, no product-wide access granted by shared identity.

**Editor**: existing Studio #14 should feed a revision-bound content packet with clear tests/evidence and locale review; event dedup from #24/#25; no direct News table writes by model agent. Create newsletters/article/social variations from **approved** content revision, not unverified RSS snippets.

**Brand**: Guide *the story teller guide* is design contract; source assets and the proposed mark are not trademark-cleared. Keep all exported PDF/mockup people and claims marked as concepts.

## Commercial expansion after first-win retention

- Free: Brazil/world news, simple applied examples, public projects and moderated replies.
- Paid B2B: guided training, team learning analytics, verified industry workbooks and partner workshops.
- Ambassador program: documented contributor credentials/peer-reviews and local cohorts, never paid endorsements disguised as measured qualifications.
- Editorial distribution: consented daily/weekly digest, WhatsApp share links and short video scripts grounded in approved claims; no spam automation.
- Funding narrative: initial user cohorts with completed real outcomes, organic sharing conversion and repeat creator contributions; no assumption of instant virality or guarantees of wealth.

**North Star:** weekly unique people completing a meaningful, reproducible AI task. Supporting diagnostics: task completion time, return to useful action in 7/28 days, % news items with evidence, human correction time per article, share→qualified visit rate, moderation queue latency, unit cost per accepted article. Measurements not yet available must show `unmeasured`, not invented.
