import snapshot from "@/data/brNews.generated.json";

export interface BrazilianNewsSignal {
  id: string;
  title: string;
  url: string;
  source: string;
  sourceId: string;
  providerExcerpt: string;
  publishedAt: string;
  language: "pt-BR";
  coverageRegion: "BR";
  brazilImpact: boolean;
  editorialStatus: "aggregated-unverified";
}

export interface BrazilFeedSnapshot {
  schemaVersion: "1.0";
  generatedAt: string | null;
  status: "not-run" | "ok" | "degraded";
  sourceHealth: { source: string; status: "ok" | "failed" }[];
  itemCount: number;
  items: BrazilianNewsSignal[];
}

/** Build-time RSS observations, NOT signed-off original Sintra articles. */
export const BRAZIL_FEED: BrazilFeedSnapshot = snapshot as BrazilFeedSnapshot;

/** A source's location does not mean the event occurred in that location. */
export const BRAZIL_NEWS_SIGNALS = BRAZIL_FEED.items;

export function brazilSnapshotIsFresh(now = Date.now()): boolean {
  if (!BRAZIL_FEED.generatedAt) return false;
  const age = now - Date.parse(BRAZIL_FEED.generatedAt);
  return Number.isFinite(age) && age >= 0 && age <= 36 * 3_600_000;
}
