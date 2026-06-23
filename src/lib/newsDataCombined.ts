import { AI_NEWS as HISTORICAL_AI_NEWS, type NewsItem } from "./newsData";
import { LATEST_AI_NEWS } from "./newsLatestData";

/**
 * Canonical news feed consumed by the application.
 * Reviewed current items win when an identifier already exists in the
 * historical append-only corpus.
 */
const byId = new Map<string, NewsItem>();
for (const item of [...LATEST_AI_NEWS, ...HISTORICAL_AI_NEWS]) {
  if (!byId.has(item.id)) byId.set(item.id, item);
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
