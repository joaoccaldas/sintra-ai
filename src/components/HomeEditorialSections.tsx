import { LIVE_FEED, LIVE_ITEMS } from "@/lib/liveFeedData";
import { USE_CASES } from "@/lib/data";
import HomeEditorialClient from "./HomeEditorialClient";

/**
 * Server-only data selection. The large canonical use-case and news registries
 * never cross the client module boundary: just three headlines and two titles.
 */
export default function HomeEditorialSections() {
  const world = LIVE_ITEMS
    .filter(item => item.url.startsWith("https://") && item.title.trim().length > 0)
    .sort((a,b) => Date.parse(b.publishedAt ?? "1970-01-01") - Date.parse(a.publishedAt ?? "1970-01-01"))
    .slice(0,3)
    .map(({ id, title, url, source, category }) => ({ id, title, url, source, category }));

  const slugs = ["meeting-notes-to-action-items", "quick-insights-from-spreadsheets"];
  const exercises = slugs
    .map(slug => USE_CASES.find(item => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map(({slug,title}) => ({slug,title}));

  return <HomeEditorialClient world={world} exercises={exercises} refreshedAt={LIVE_FEED.generatedAt} />;
}
