import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Regression guard for the stale-news bug (July 2026): every news surface must
 * consume the COMBINED feed (@/lib/newsDataCombined — curated newsLatestData
 * merged over the historical archive), never @/lib/newsData directly.
 *
 * When pages imported the historical archive, daily additions to
 * newsLatestData.ts appeared only in ⌘K search while /news stayed frozen at
 * the archive's newest item. This test fails the build if that wiring returns.
 */
const ROOT = join(__dirname, "..", "..");

const NEWS_SURFACES = [
  "src/app/news/page.tsx",
  "src/app/news/archive/page.tsx",
  "src/app/news/archive/[month]/page.tsx",
  "src/app/weekly/WeeklyClient.tsx",
  "src/app/sitemap.ts",
  "src/components/AINewsPage.tsx",
  "src/components/NewsTicker.tsx",
  "src/components/ContentNav.tsx",
  "src/components/SidebarNav.tsx",
  "src/components/ThePulse.tsx",
  "src/lib/topicsData.ts",
  "src/lib/searchIndex.ts",
];

test("news surfaces import the combined feed, not the historical archive", () => {
  const offenders: string[] = [];
  for (const rel of NEWS_SURFACES) {
    const src = readFileSync(join(ROOT, rel), "utf8");
    // Type-only imports of NewsItem from newsData are fine; value imports are not.
    const valueImport = /import\s+(?!type\b)[^;]*from\s+["'](@\/lib\/newsData|\.{1,2}\/newsData)["']/;
    if (valueImport.test(src)) offenders.push(rel);
  }
  assert.deepEqual(
    offenders,
    [],
    `These news surfaces import the historical archive directly (use @/lib/newsDataCombined): ${offenders.join(", ")}`,
  );
});

test("combined feed surfaces the newest curated item", async () => {
  const { AI_NEWS: combined } = await import("../../src/lib/newsDataCombined");
  const { LATEST_AI_NEWS } = await import("../../src/lib/newsLatestData");
  const newestCurated = [...LATEST_AI_NEWS].sort(
    (a, b) => b.dateNum - a.dateNum || (b.dateDay ?? 0) - (a.dateDay ?? 0),
  )[0];
  assert.ok(newestCurated, "curated feed is empty");
  assert.ok(
    combined.some(item => item.id === newestCurated.id),
    `newest curated item (${newestCurated.id}) missing from combined feed`,
  );
});
