# Sintra AI × ond.ai: endorsed brand implementation

**Source of authority:** user-supplied *the story teller guide*, edition 1.0 (23 Oct 2026), especially pp. 5–10, 12–20, 23–24, 31, 33, 35, 40–42; two original ond.ai color and application concept boards from the user.

**State:** working brand identity, **not trademark-cleared or consumer-recognition-tested**. Sintra/ond.ai marks and `sintra.ai` spelling should not be interpreted as control over a domain. Original mark geometry from image has no signed-off vector master in this repository.

## Visual rules implemented

| Layer | Requirement | Implementation |
|---|---|---|
| Parent | Lowercase ond.ai; open, asymmetric single-current symbol, monochrome master | `SintraBrandLockup.tsx` product endorsement, monochrome SVG path; one gradient open current in homepage art |
| Product | Sintra distinct from parent; warm coral and Portuguese news literacy | `--sintra-coral` #D96B59 (decorative), `--sintra-coral-ink` #B65344 for normal text, `BrazilRadar` |
| Colors | Light-first 80% neutral, deliberate indigo/coral signals | `src/app/ond-brand.css` with porcelain #F7F8F5, ink #172238, white #FFFFFF, violet #5B48D9, line #DDE5EE |
| Type | Inter Display for clarity, EB Garamond editorial contrast, mono secondary | Next font `Inter` and `EB_Garamond` stand in for approved typography; `Geist_Mono` retained for existing technical views; legacy `--font-manrope` and `--font-instrument` variable names retained for backwards compatibility, pending semantic alias refactor |
| Interface | Human promise first, one next action, readable touch controls | Revised `BrazilFirstHero`, first-use links to existing pages; no account gate, no WebGL on homepage |
| Language | pt-BR first; translation is more than literal locale labels | Guide's Sintra-specific copy “Entenda a IA. Coloque em prática.” and narrative “O que mudou. Por que importa. O que fazer agora.”; existing browser language toggle still exists |
| Governance | Show actual evidence states, no simulated proof | `BrazilRadar` unchanged source attribution / unverified publisher signals; still requires source verification and research pipeline |
| Dark mode | An option, not the main brand | First-visit light default; old explicit saved dark/forest/ocean choices honored; lockup color adjusted in non-light themes |

## Implementation and dependencies

```
ond.ai proposed parent identity
  ├─ brand primitives -> src/app/ond-brand.css (temporary local source of truth)
  ├─ open-wave reusable component -> src/components/SintraBrandLockup*
  ├─ Sintra-specific editorial copy -> src/lib/homeExperienceCopy.ts
  ├─ light-first typography and theme -> app/layout.tsx + ThemeContext
  ├─ hero + practical CTAs -> BrazilFirstHero*
  ├─ header / desktop sidebar / mobile menu endorsement -> Header / SidebarNav
  ├─ news story presentation -> BrazilRadar.module.css
  └─ mobile nav color identity -> MobileDock.module.css
```

This is a **stacked PR** on the Brazil-first functional product slice (#28), itself stacked on mobile base (#27); it intentionally does not modify ingestion, HoldingCo Supabase, member data, email sending or world-news ranking.

## What is not proven

1. Logo SVG is an original source study made to follow the open-current grammar, **not** a pixel-perfect extraction of an approved parent asset. Do not claim licensed/trademark-cleared production identity. Obtain legal approval, canonical original SVG and design owner's opt-in before a full portfolio rollout.
2. The guide names **Inter Display**. The current `next/font/google` package uses **Inter**, which is a pragmatic close rendering but not proof of exact Inter Display typography; EB Garamond follows the guide. Test real glyphs and fonts under loaded browser conditions.
3. First-visit light theme affects all legacy pages. This PR has code/contrast-level checks; full screenshot and accessibility audits of News, Library, Tools, Knowledge and sidebar across 320px, 390px, 768px, 1440px plus dark/forest/ocean still gate adoption.
4. The global layout is still not separately indexable `/pt-br/` and `/en/`. Sintra's existing manual client locale toggle remains, and a search engine may not index complete Portuguese page content.
5. CSS variable names `--violet`, `--font-manrope`, `--font-instrument` remain as compatibility aliases. A future centralized, versioned ond.ai design package may replace them, after impact analysis across the app portfolio.
6. Existing dark-only utility colors and contrast across hundreds of legacy pages need optical and WCAG review. Brand scope alone cannot prove application-wide quality.
7. Social/community visuals in the guide are *concept art*; no user base, membership experience, sender setup or verified campaign performance has been invented.

## Brand checks and release gates

- `scripts/tests/ond-brand.test.ts` asserts required colors, light-first default, caption/coral WCAG contrast, single-path mark, pt/en text, real route links, reduced motion and component reuse.
- `npm run check` must pass, including actual generated static export, links and existing tests.
- Review on real phone and desktop at high/low contrast and 200% text zoom.
- Future identity rollout follows: **Discover → Design → Validate → Approve → Release → Learn**.
- Preserve the guide's position: *Make intelligence useful*. For Sintra in pt-BR, **“Inteligência que vira ação.”**

## References
User-supplied *the story teller guide* pp. 9–20 and 23–24; product family grammar pp. 8, 31; language pp. 33; brand approval pp. 38–42. Do not copy third-party brand images or hypothetical people from the reference concept boards as live product facts.
