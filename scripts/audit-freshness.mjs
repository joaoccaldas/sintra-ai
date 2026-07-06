#!/usr/bin/env node
/**
 * audit-freshness.mjs — content freshness & schema gate for the daily pipeline
 * ----------------------------------------------------------------------------
 * A dependency-free guard that runs in CI (`npm run audit:static`) to catch the
 * failure modes that silently degrade a "daily" site:
 *
 *   1. Live feed schema — every item has id/title/https-url/ISO-date/source.
 *   2. Live feed freshness — the snapshot isn't empty and isn't stale.
 *   3. Weekly picks freshness — THIS_WEEK.weekOf hasn't fallen behind the news.
 *   4. Link hygiene — internal hrefs use BASE_PATH, never a hardcoded
 *      "/sintra-ai/" prefix (breaks in dev) or a bare "/path" (breaks on Pages).
 *
 * Exit code 1 on any ERROR; WARN is advisory. Tune thresholds via the CONFIG
 * block below.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const CONFIG = {
  liveFeedMaxAgeHours: 48, // warn if the live feed snapshot is older than this
  weeklyPicksMaxAgeDays: 14, // warn if THIS_WEEK is older than this
  minLiveItems: 12, // error if fewer than this many live items
};

const errors = [];
const warnings = [];
const ok = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);
const pass = (m) => ok.push(m);

const ISO = /^\d{4}-\d{2}-\d{2}T/;
const read = (rel) => readFileSync(join(root, rel), "utf8");

/* ── 1 + 2. Live feed schema + freshness ────────────────────────────────── */
try {
  const feed = JSON.parse(read("src/data/liveFeed.generated.json"));

  if (!Array.isArray(feed.items) || feed.items.length < CONFIG.minLiveItems) {
    fail(`live feed has ${feed.items?.length ?? 0} items (min ${CONFIG.minLiveItems}) — aggregator likely failed`);
  } else {
    pass(`live feed carries ${feed.items.length} items from ${feed.sourceCount} sources`);
  }

  let badItems = 0;
  for (const it of feed.items ?? []) {
    const bad =
      !it.id || !it.title ||
      !(typeof it.url === "string" && it.url.startsWith("https://")) ||
      (it.publishedAt && !ISO.test(it.publishedAt)) ||
      !it.source || !it.category;
    if (bad) badItems++;
  }
  if (badItems) fail(`${badItems} live-feed item(s) fail the schema (id/title/https-url/ISO-date/source/category)`);
  else if (feed.items?.length) pass("all live-feed items pass schema validation");

  const ageH = (Date.now() - Date.parse(feed.generatedAt)) / 3.6e6;
  if (Number.isNaN(ageH)) fail(`live feed generatedAt is not a valid date: ${feed.generatedAt}`);
  else if (ageH > CONFIG.liveFeedMaxAgeHours) warn(`live feed is ${ageH.toFixed(0)}h old (threshold ${CONFIG.liveFeedMaxAgeHours}h) — rerun aggregate-live-feed`);
  else pass(`live feed is ${ageH.toFixed(0)}h old — fresh`);
} catch (e) {
  fail(`live feed missing/invalid — run \`node scripts/aggregate-live-feed.mjs\` (${e.message})`);
}

/* ── 3. Weekly picks freshness ──────────────────────────────────────────── */
try {
  const src = read("src/lib/featuredData.ts");
  // Grab the weekOf of the exported THIS_WEEK object (last weekOf in the file).
  const weekOfs = [...src.matchAll(/weekOf:\s*["']([^"']+)["']/g)].map((m) => m[1]);
  const thisWeek = weekOfs[weekOfs.length - 1];
  const parsed = thisWeek ? Date.parse(thisWeek) : NaN;
  if (Number.isNaN(parsed)) {
    warn(`could not parse THIS_WEEK.weekOf ("${thisWeek ?? "?"}") for a freshness check`);
  } else {
    const ageDays = (Date.now() - parsed) / 864e5;
    if (ageDays > CONFIG.weeklyPicksMaxAgeDays) warn(`weekly picks (THIS_WEEK.weekOf="${thisWeek}") are ${ageDays.toFixed(0)}d old (threshold ${CONFIG.weeklyPicksMaxAgeDays}d) — refresh featuredData.ts`);
    else pass(`weekly picks are ${ageDays.toFixed(0)}d old — current`);
  }
} catch (e) {
  warn(`could not read featuredData.ts (${e.message})`);
}

/* ── 4. Link hygiene in editorial data files ────────────────────────────── */
for (const relFile of ["src/lib/featuredData.ts"]) {
  try {
    const src = read(relFile);
    const hrefs = [...src.matchAll(/href:\s*["']([^"']+)["']/g)].map((m) => m[1]);
    for (const h of hrefs) {
      if (h.startsWith("/sintra-ai/")) {
        fail(`${relFile}: hardcoded base path "${h}" — use \`\${BASE_PATH}${h.replace("/sintra-ai", "")}\` so it works in dev too`);
      } else if (h.startsWith("/") && !h.startsWith("//")) {
        warn(`${relFile}: bare internal href "${h}" — prefix with \${BASE_PATH} for GitHub Pages`);
      }
    }
    if (!errors.length) pass(`${relFile} link hygiene clean`);
  } catch {
    /* file optional */
  }
}

/* ── report ─────────────────────────────────────────────────────────────── */
console.log("\nFreshness & schema audit");
for (const m of ok) console.log(`  ✓ ${m}`);
for (const m of warnings) console.warn(`  ⚠ ${m}`);
if (errors.length) {
  console.error(`\n✗ audit failed (${errors.length} error${errors.length > 1 ? "s" : ""})`);
  for (const m of errors) console.error(`  ✗ ${m}`);
  process.exit(1);
}
console.log(`\n✓ freshness audit passed${warnings.length ? ` (${warnings.length} warning${warnings.length > 1 ? "s" : ""})` : ""}`);
