// Typed accessor for the build-time live feed (scripts/aggregate-live-feed.mjs).
// The JSON is regenerated on every `npm run prebuild`, so the site always ships
// with a fresh snapshot of the frontier without any runtime fetch.

import raw from "@/data/liveFeed.generated.json";

export interface LiveFeedItem {
  id: string;
  title: string;
  url: string;
  summary: string;
  publishedAt: string | null;
  source: string;
  category: string;
  color: string;
}

export interface LiveFeed {
  generatedAt: string;
  sourceCount: number;
  sources: string[];
  itemCount: number;
  items: LiveFeedItem[];
}

export const LIVE_FEED: LiveFeed = raw as LiveFeed;
export const LIVE_ITEMS: LiveFeedItem[] = LIVE_FEED.items;

/** Distinct categories present in the feed, in a stable editorial order. */
const CATEGORY_ORDER = ["Labs", "Research", "Open Source", "Press", "Practitioner", "Community"];
export const LIVE_CATEGORIES: string[] = CATEGORY_ORDER.filter((c) =>
  LIVE_ITEMS.some((i) => i.category === c)
);

/** Relative "3h ago" / "2d ago" label for a feed item. */
export function liveAge(iso: string | null): string {
  if (!iso) return "";
  const ms = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

/** Feed freshness in hours, for the "updated Xh ago" badge. */
export function liveFeedAgeHours(): number {
  return Math.floor((Date.now() - new Date(LIVE_FEED.generatedAt).getTime()) / 3.6e6);
}
