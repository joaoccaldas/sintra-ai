import { AI_NEWS as HISTORICAL_AI_NEWS } from "../src/lib/newsData";
import { LATEST_AI_NEWS } from "../src/lib/newsLatestData";

/**
 * Schema gate for the curated LATEST_AI_NEWS feed (src/lib/newsLatestData.ts).
 *
 * This is the guardrail for the daily news-update task: it must keep passing
 * as new items are appended over time, so it validates the SHAPE of each item
 * (required fields, unique ids, no collisions with the historical archive,
 * valid https source URL, sane date) rather than a fixed batch size or a
 * hardcoded day window. Any failure exits non-zero so the workflow halts
 * before committing or deploying — the feed never ships malformed data.
 */
const ids = new Set<string>();
const historicalIds = new Set(HISTORICAL_AI_NEWS.map(item => item.id));
const historicalUrls = new Set(
  HISTORICAL_AI_NEWS.map(item => item.url).filter((url): url is string => Boolean(url))
);
const errors: string[] = [];

for (const item of LATEST_AI_NEWS) {
  if (ids.has(item.id)) errors.push(`duplicate id inside latest batch: ${item.id}`);
  ids.add(item.id);
  if (historicalIds.has(item.id)) errors.push(`id already exists in historical archive: ${item.id}`);
  if (!/^https:\/\//.test(item.url ?? "")) errors.push(`invalid URL: ${item.id}`);
  if (item.url && historicalUrls.has(item.url)) errors.push(`source URL already exists in historical archive: ${item.id}`);

  // Date sanity: dateNum is a YYYYMM in a plausible range; optional dateDay is a valid day.
  const year = Math.floor(item.dateNum / 100);
  const month = item.dateNum % 100;
  if (year < 2020 || year > 2100 || month < 1 || month > 12) {
    errors.push(`invalid dateNum (expected YYYYMM): ${item.id} -> ${item.dateNum}`);
  }
  if (item.dateDay !== undefined && (item.dateDay < 1 || item.dateDay > 31)) {
    errors.push(`invalid dateDay: ${item.id} -> ${item.dateDay}`);
  }

  // Required content fields.
  if (!item.title.trim()) errors.push(`missing title: ${item.id}`);
  if (!item.summary.trim()) errors.push(`missing summary: ${item.id}`);
  if (!item.provider.trim()) errors.push(`missing provider: ${item.id}`);
  if (!item.tags.length) errors.push(`missing tags: ${item.id}`);
  if (!item.why_it_matters?.trim()) errors.push(`missing why_it_matters: ${item.id}`);
  if (!item.what_to_try?.trim()) errors.push(`missing what_to_try: ${item.id}`);
}

if (LATEST_AI_NEWS.length === 0) errors.push("LATEST_AI_NEWS is empty");

if (errors.length) {
  console.error(`Reviewed news checks FAILED (${errors.length}):`);
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `Reviewed news checks passed: ${LATEST_AI_NEWS.length} unique items, no historical ID or URL collisions.`
);
