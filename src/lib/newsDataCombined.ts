import { AI_NEWS as HISTORICAL_AI_NEWS, type NewsItem } from "./newsData";
import { LATEST_AI_NEWS } from "./newsLatestData";
import { LIVE_ITEMS, type LiveFeedItem } from "./liveFeedData";

/**
 * Canonical news feed consumed by the application.
 *
 * Three sources, merged in priority order (first writer wins per id/title):
 *   1. LATEST_AI_NEWS   — hand-reviewed current items (highest quality).
 *   2. HISTORICAL_AI_NEWS — the append-only historical corpus.
 *   3. Live feed         — the build-time aggregated feed (aggregate-live-feed.mjs),
 *      converted to news items so the site keeps surfacing fresh headlines
 *      automatically between manual curation passes. This is what keeps
 *      /news current without any API key or human in the loop.
 */

const MONTH_ABBR = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * Only higher-signal categories are promoted into the editorial /news surface.
 * Research (arXiv firehose) and Community (Hacker News) stay in the live-signals
 * ticker but would dilute the news archive, so they're excluded here.
 */
const LIVE_NEWS_CATEGORIES = new Set(["Labs", "Press", "Open Source", "Practitioner"]);
const LIVE_NEWS_MAX = 18; // cap promoted live items so the archive stays curated-feeling

const slugify = (s: string): string =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64);

const normTitle = (s: string): string =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function liveItemToNews(it: LiveFeedItem): NewsItem | null {
  if (!it.title || !it.url || !it.publishedAt) return null;
  const d = new Date(it.publishedAt);
  if (Number.isNaN(d.getTime())) return null;
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth() + 1;
  const day = d.getUTCDate();
  return {
    id: `live-${slugify(it.title)}`,
    date: `${MONTH_ABBR[month - 1]} ${year}`,
    dateNum: year * 100 + month,
    dateDay: day,
    title: it.title,
    summary: it.summary || `${it.source} — ${it.category}`,
    tags: Array.from(new Set([it.source, it.category, "Live"])),
    significance: "notable",
    provider: it.source,
    providerColor: it.color || "#6366f1",
    url: it.url,
  };
}

const liveNews: NewsItem[] = LIVE_ITEMS
  .filter((it) => LIVE_NEWS_CATEGORIES.has(it.category))
  .map(liveItemToNews)
  .filter((x): x is NewsItem => x !== null)
  .sort((a, b) => b.dateNum - a.dateNum || (b.dateDay ?? 0) - (a.dateDay ?? 0))
  .slice(0, LIVE_NEWS_MAX);

const byId = new Map<string, NewsItem>();
const seenTitles = new Set<string>();
for (const item of [...LATEST_AI_NEWS, ...HISTORICAL_AI_NEWS, ...liveNews]) {
  const t = normTitle(item.title);
  if (byId.has(item.id) || seenTitles.has(t)) continue;
  byId.set(item.id, item);
  seenTitles.add(t);
}

export const AI_NEWS: NewsItem[] = [...byId.values()];
export type { NewsItem } from "./newsData";

/** Alias kept for component compatibility. */
export const NEWS_ITEMS = AI_NEWS;

export const NEWS_TAGS: string[] = Array.from(
  new Set(AI_NEWS.flatMap((item) => item.tags))
).sort();

export const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Formatted date of the most recent item, e.g. "23 Jun 2026". */
export function getLatestNewsDate(): string {
  const latest = [...AI_NEWS].sort(
    (a, b) => b.dateNum - a.dateNum || (b.dateDay ?? 0) - (a.dateDay ?? 0)
  )[0];
  if (!latest) return "";
  if (!latest.dateDay) return latest.date;
  const month = MONTH_NAMES[(latest.dateNum % 100) - 1];
  const year = Math.floor(latest.dateNum / 100);
  return `${latest.dateDay} ${month} ${year}`;
}

export function monthLabel(dateNum: number): string {
  const month = MONTH_NAMES[(dateNum % 100) - 1];
  const year = Math.floor(dateNum / 100);
  return `${month} ${year}`;
}

export function monthSlug(dateNum: number): string {
  const year = Math.floor(dateNum / 100);
  const month = String(dateNum % 100).padStart(2, "0");
  return `${year}-${month}`;
}

export function monthFromSlug(slug: string): number {
  const [year, month] = slug.split("-").map(Number);
  return year * 100 + month;
}

export const CURRENT_MONTH_NUM = Math.max(...AI_NEWS.map((item) => item.dateNum));
export const CURRENT_MONTH_LABEL = monthLabel(CURRENT_MONTH_NUM);

export const CURRENT_MONTH_NEWS: NewsItem[] = AI_NEWS
  .filter((item) => item.dateNum === CURRENT_MONTH_NUM)
  .sort((a, b) => (b.dateDay ?? 1) - (a.dateDay ?? 1));

export interface ArchiveMonth {
  dateNum: number;
  slug: string;
  label: string;
  count: number;
}

export const ARCHIVE_MONTHS: ArchiveMonth[] = (() => {
  const counts = new Map<number, number>();
  AI_NEWS.forEach((item) => {
    if (item.dateNum !== CURRENT_MONTH_NUM) {
      counts.set(item.dateNum, (counts.get(item.dateNum) ?? 0) + 1);
    }
  });
  return [...counts.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([dateNum, count]) => ({
      dateNum,
      slug: monthSlug(dateNum),
      label: monthLabel(dateNum),
      count,
    }));
})();

export function getNewsForMonth(dateNum: number): NewsItem[] {
  return AI_NEWS
    .filter((item) => item.dateNum === dateNum)
    .sort((a, b) => (b.dateDay ?? 1) - (a.dateDay ?? 1));
}
