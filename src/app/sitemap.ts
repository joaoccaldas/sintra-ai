import type { MetadataRoute } from "next";
import { USE_CASES } from "@/lib/data";
import { AI_TOOLS } from "@/lib/toolsData";
import { TOPIC_HUBS } from "@/lib/topicHubs";
import { ARCHIVE_MONTHS } from "@/lib/newsData";

export const dynamic = "force-static";

const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const topLevel: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,               lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${SITE_URL}/tools/`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/news/`,          lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${SITE_URL}/learn/`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/claude/`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/resources/`,     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${SITE_URL}/concepts/`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/ai-history/`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/ai-labs/`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/google-ai-tools/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/models/`,          lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/weekly/`,          lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/weekly/archive/`,  lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  const promptPages: MetadataRoute.Sitemap = USE_CASES.map(u => ({
    url: `${SITE_URL}/prompts/${u.slug}/`,
    lastModified: new Date(u.dateAdded),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const toolPages: MetadataRoute.Sitemap = AI_TOOLS.map(t => ({
    url: `${SITE_URL}/tools/${t.id}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const topicPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/topics/`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    ...TOPIC_HUBS.map(t => ({
      url: `${SITE_URL}/topics/${t.slug}/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
  ];

  const newsArchivePages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/news/archive/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    ...ARCHIVE_MONTHS.map(m => ({
      url: `${SITE_URL}/news/archive/${m.slug}/`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];

  return [...topLevel, ...topicPages, ...promptPages, ...toolPages, ...newsArchivePages];
}
