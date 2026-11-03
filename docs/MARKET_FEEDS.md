# Markets & Economy — 3 November 2026

Extends the existing ond.ai Feeds bridge and Sintra build-time resolver. The public consumer accepts only 15 series: ECB EUR/USD, EUR/SEK, EUR/BRL and World Bank GDP growth, consumer inflation and unemployment for Sweden, Brazil, the US and euro area. Stock/index adapters remain private; they are not silently redistributed.

## Flow and authority

The Feeds public projection is an optional `markets` member in the existing `sintra-ai.json` snapshot. Native Connections has a separate opt-in; existing news-only publishing stays unchanged until enabled. One verified snapshot commit triggers the existing repository_dispatch build. No local bearer token, bookmark, private channel or arbitrary endpoint enters the public contract.

Sintra resolves each series through validated Feeds data, direct free-provider collection, and the last valid local/deployed public snapshot. Freshness checks use per-series retrieval dates (36 hours currency, 7 days annual macro); observation dates remain independent. Annual data is not claimed to be monthly/live. Invalid IDs, units/providers, dates, oversized histories, duplicate dates, nonfinite values and latest/history disagreement are rejected. Output uses allowlisted metadata and source links, not arbitrary payload labels. No usable series renders Unavailable, not fabricated zero. Fetches have deadlines and 2 MB response limits. Primary shared snapshot schema failures cause provider fallback; a partial fresh snapshot can still serve its valid series.

The static `/markets/` page has currency cards, country macro cards, indicator/period selection, pointer and keyboard date inspection, explicit units, calculated endpoint change (% vs percentage points), source links, CSV export and an accessible table. No new chart dependency. It uses existing Sintra theme tokens. Static `/api/markets.json` exposes the same public contract and is in the agent manifest. No runtime browser fetch or credentials.

## Source and reuse conditions

- ECB reuse conditions: https://www.ecb.europa.eu/services/using-our-site/disclaimer/html/index.en.html — attribute ECB, preserve accuracy, identify derived calculations. Reference rates are not executable trading quotes.
- World Bank indicator pages explicitly label CC BY 4.0: https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG , https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG , https://data.worldbank.org/indicator/SL.UEM.TOTL.ZS . Attribute original national/OECD/World Bank, IMF and ILO sources. https://datacatalog.worldbank.org/public-licenses . Inspected 3 November 2026.
- `scripts/resolve-market-feed.mjs` fixes provider domains and metadata; stock/index data needs separate redistribution clearance before extending the allowlist.

## Verification and prerequisites

`npm ci --ignore-scripts`, then `npm run check` (prebuild generates ignored market JSON). Python 3.9+ and Swift tools are required separately for the Feeds producer. For a nonpublishing producer/consumer integration preview, set `ONDAI_MARKET_SNAPSHOT` to the allowlisted producer JSON; never point it at raw private data. Clear the override to exercise direct fallback before deployment.

PASS: 65 Sintra tests (52 TS and 13 resolver tests), TypeScript, production export, 515 HTML pages and 20,389 internal links. Production prebuild consumed all 15 projected Feeds series with 918 observations; an independent direct-provider run resolved all 15. Resolver tests cover malformed input, unit/provider boundaries, time validation, partial fallback, stale annual observations, outage empty state and response-size limit. Chart math tests check reference-date windows, percentage points and zero denominators. Feeds producer: 47 Python tests and Swift release build.

Browser check: currency/macro category switch, inflation selection, 5Y window, keyboard date selection (2024 to 2025) and table values match. At 390 CSS px, document width was 390 (no horizontal page overflow). Screenshot stored in the local release output, not Git. Desktop visual review uses the current Sintra theme. CSV control is implemented; automated browser download acceptance was not yet run. Full screen-reader/contrast audit and independent acceptance not claimed.

Known baseline: npm audit reports 4 dependency findings in existing locked dependencies (Next, postcss, postcss-selector-parser, zod). No dependency versions were changed here. They are outside this bounded data/UI change and not claimed fixed.

## Release and rollback

Review source SHAs in the release receipt before merging the Sintra change and enabling Feeds `include_markets`. Existing owner-only feeds/admin APIs remain private. The public exception is limited to the 15 listed source series and derived display values. Source completion is not live delivery. Verify an actual GitHub build says 15 shared series, successful Pages deployment, published JSON, rendered controls and no proprietary series. Do not enable paused ChatGPT tasks as part of release.

Rollback: disable the separate market switch and revert the Sintra consumer commit if necessary. Existing news bridge/fallback remains available. Market fallback can keep the page populated even with the native publisher off. Prior source observation dates must never be advanced merely because a snapshot was rebuilt. Workflow/test recipes are agent-authored and executed, not independently certified.
