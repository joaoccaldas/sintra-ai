# Sintra AI debugging playbook

Use this order. It separates content failures, TypeScript failures, build failures, routing failures, and deployment failures instead of changing several layers at once.

## 1. Reproduce locally

```bash
npm ci
npm run audit:static
npm run build
npm run dev
```

Record:

- exact command;
- first error, not the final cascade;
- route and viewport;
- browser and operating system;
- current commit SHA;
- whether the issue occurs in development, static export, or both.

## 2. Failure classification

| Symptom | First command | Likely layer |
|---|---|---|
| Prompt missing or malformed | `npm run validate-data` | `useCases.json` schema |
| Dead concept or learning link | `npm run validate-content` | Content graph |
| Red TypeScript error | `npm run typecheck` | Types, imports, component contracts |
| Works in dev, fails after export | `npm run build` | Static rendering, base path, dynamic code |
| Production route returns 404 | Inspect `dist/<route>/index.html` | Static route generation or link path |
| Styles missing only in production | Search for dynamically constructed Tailwind classes | Tailwind content scanning |
| Old UI remains after deploy | Check deployed commit and service worker cache | Release or cache drift |
| Mobile control inaccessible | Keyboard/touch test and accessibility tree | Interaction semantics |
| Search opens a directory, not an item | Inspect `src/lib/searchIndex.ts` href | Search entity mapping |
| Counts disagree | Run prebuild generators and inspect generated count | Generated artifacts |

## 3. Base-path rules

Development uses an empty base path. Production uses `/sintra-ai`.

```ts
import { BASE_PATH } from "@/lib/constants";

const href = `${BASE_PATH}/news/`;
```

Never hardcode `/sintra-ai` inside source data or components. Public static files referenced in root metadata are the exception because they are emitted for the production site.

## 4. Static export rules

The application has no runtime server.

Avoid:

- API routes;
- server-side database access;
- request-time fetching;
- route behavior that depends on cookies at render time;
- dynamic routes without `generateStaticParams`.

Use build-time imports, generated files, URL query state, and browser storage.

## 5. Content graph debugging

`npm run validate-content` checks:

- duplicate IDs and slugs;
- invalid ISO dates;
- malformed HTTP URLs;
- missing related concepts;
- missing learning-path concept anchors;
- invalid model prices and context sizes;
- related tool references.

Fix the canonical data source. Do not suppress a validator unless the schema itself is intentionally changing.

## 6. Search debugging

1. Confirm the entity exists in its source collection.
2. Confirm it is included in `SEARCH_INDEX`.
3. Confirm its `href` points to the exact route or a supported filtered route.
4. Confirm the destination route reads any query parameter used by the index.
5. Test mouse click, Enter, and the secondary copy action separately.

## 7. Theme debugging

Theme state exists in two layers:

- a pre-hydration script applies `data-theme` before first paint;
- `ThemeContext` manages subsequent interaction and persistence.

When adding a theme token:

1. define the RGB token in every theme;
2. expose a semantic alias only when inline styles need it;
3. test foreground/background contrast;
4. test stored-theme reload without a flash;
5. test `prefers-contrast: more` and `prefers-reduced-motion`.

## 8. Deployment verification

After a release:

1. record the `main` commit SHA;
2. build from that exact commit;
3. publish `dist/` to `gh-pages`;
4. verify the `gh-pages` commit message contains the build date and source SHA;
5. open the homepage and at least one nested route;
6. hard-refresh once to bypass an old service worker;
7. verify the footer or status record reports the expected source version.

Do not edit generated `gh-pages` files manually.

## 9. Minimal regression journey

Before release, verify:

1. Open homepage.
2. Open and close mobile navigation using keyboard.
3. Change theme, reload, and confirm no flash.
4. Switch language on mobile and desktop.
5. Open command search with `Ctrl/Cmd + K`.
6. Search for a prompt, open it with Enter, return, and copy it explicitly.
7. Search for a tool and a concept; confirm direct routes.
8. Open a learning path from a deep link.
9. Filter news and reload; query state should remain in the URL.
10. Open the models and tools comparison pages at mobile and desktop widths.

## 10. Escalation record

For unresolved defects, create an issue containing:

```text
Commit:
Environment:
Route:
Viewport:
Expected:
Actual:
Reproduction steps:
First failing command:
Console/build output:
Suspected layer:
```

A defect without a deterministic reproduction is an observation, not yet a fixable bug.
