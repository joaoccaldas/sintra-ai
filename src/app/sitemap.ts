import type { MetadataRoute } from "next";
import { USE_CASES } from "@/lib/data";
import { AI_TOOLS } from "@/lib/toolsData";
import { TOPIC_HUBS } from "@/lib/topicHubs";
import { ARCHIVE_MONTHS, AI_NEWS } from "@/lib/newsDataCombined";
import { GUIDES } from "@/lib/guidesData";
import { CONCEPTS } from "@/lib/concepts";

export const dynamic = "force-static";

const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";

/** Real publish date of the most recent news item — used as the freshness
 * signal for pages whose content tracks the news feed, instead of stamping
 * every build with `new Date()` (which falsely claims daily changes). */
function latestNewsDate(): Date {
  const latest = [...AI_NEWS].sort(
    (a, b) => b.dateNum - a.dateNum || (b.dateDay ?? 0) - (a.dateDay ?? 0)
  )[0];
  if (!latest) return new Date();
  const year = Math.floor(latest.dateNum / 100);
  const month = (latest.dateNum % 100) - 1;
  return new Date(year, month, latest.dateDay ?? 1);
}

/** Last calendar day of an archived YYYYMM month — archived months are
 * immutable, so this is a real (not fabricated) lastModified date. */
function lastDayOfMonth(dateNum: number): Date {
  const year = Math.floor(dateNum / 100);
  const month = dateNum % 100;
  return new Date(year, month, 0);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const newsDate = latestNewsDate();

  const topLevel: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,               lastModified: newsDate, changeFrequency: "daily",   priority: 1.0 },
    { url: `${SITE_URL}/tools/`,         changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/news/`,          lastModified: newsDate, changeFrequency: "daily",   priority: 0.9 },
    { url: `${SITE_URL}/learn/`,         changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/claude/`,        changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/resources/`,     changeFrequency: "weekly",  priority: 0.7 },
    { url: `${SITE_URL}/concepts/`,      changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/ai-history/`,    changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/ai-labs/`,       changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/google-ai-tools/`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/models/`,          changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/weekly/`,          lastModified: newsDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/weekly/archive/`,  changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/guides/`,          changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/token-calculator/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/videos/`,          changeFrequency: "weekly",  priority: 0.7 },
    { url: `${SITE_URL}/research/`,        changeFrequency: "weekly",  priority: 0.7 },
    { url: `${SITE_URL}/collections/`,     changeFrequency: "weekly",  priority: 0.7 },
  ];

  const guidePages: MetadataRoute.Sitemap = GUIDES.map(g => ({
    url: `${SITE_URL}/guides/${g.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const conceptPages: MetadataRoute.Sitemap = CONCEPTS.map(c => ({
    url: `${SITE_URL}/concepts/${c.id}/`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const promptPages: MetadataRoute.Sitemap = USE_CASES.map(u => ({
    url: `${SITE_URL}/prompts/${u.slug}/`,
    lastModified: new Date(u.dateAdded),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const toolPages: MetadataRoute.Sitemap = AI_TOOLS.map(t => ({
    url: `${SITE_URL}/tools/${t.id}/`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const topicPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/topics/`, changeFrequency: "weekly" as const, priority: 0.8 },
    ...TOPIC_HUBS.map(t => ({
      url: `${SITE_URL}/topics/${t.slug}/`,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
  ];

  const newsArchivePages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/news/archive/`, lastModified: newsDate, changeFrequency: "monthly" as const, priority: 0.5 },
    ...ARCHIVE_MONTHS.map(m => ({
      url: `${SITE_URL}/news/archive/${m.slug}/`,
      lastModified: lastDayOfMonth(m.dateNum),
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];

  return [...topLevel, ...topicPages, ...promptPages, ...toolPages, ...guidePages, ...conceptPages, ...newsArchivePages];
}
