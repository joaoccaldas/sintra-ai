import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AINewsPage from "@/components/AINewsPage";
import { BASE_PATH } from "@/lib/constants";
import { exactPublicationDate } from "@/lib/publicationDates";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";
import { AI_NEWS, CURRENT_MONTH_NEWS, CURRENT_MONTH_LABEL } from "@/lib/newsDataCombined";

export const metadata: Metadata = {
  title: `${CURRENT_MONTH_LABEL} AI News — Daily Digest — Sintra Tesseract`,
  description: `${CURRENT_MONTH_NEWS.length} AI news items for ${CURRENT_MONTH_LABEL}, updated daily — model releases, benchmark records, and industry events. Browse ${AI_NEWS.length - CURRENT_MONTH_NEWS.length} more in the archive.`,
  openGraph: {
    title: `${CURRENT_MONTH_LABEL} AI News — Daily Digest — Sintra Tesseract`,
    description: `${CURRENT_MONTH_NEWS.length} AI news items for ${CURRENT_MONTH_LABEL} — model releases, benchmarks, and industry events, updated daily.`,
  },
  alternates: {
    canonical: "https://joaoccaldas.github.io/sintra-ai/news/",
    types: {
      "application/rss+xml": "/sintra-ai/feed.xml",
    },
  },
};

const SITE_URL = "https://joaoccaldas.github.io" + BASE_PATH;

function newsJsonLd() {
  const latest = [...AI_NEWS]
    .sort((a, b) => b.dateNum - a.dateNum || (b.dateDay ?? 0) - (a.dateDay ?? 0))
    .slice(0, 20);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": latest.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "NewsArticle",
        "headline": item.title,
        "description": item.summary,
        // Month-only source records must not claim publication on the first.
        ...(exactPublicationDate(item.dateNum, item.dateDay)
          ? { "datePublished": exactPublicationDate(item.dateNum, item.dateDay) }
          : {}),
        "url": item.url ?? `${SITE_URL}/news/`,
        "publisher": { "@type": "Organization", "name": item.provider },
      },
    })),
  };
}

export default function NewsRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsJsonLd()) }}
      />
      <Header total={USE_CASES_COUNT} />
      <main id="main-content" className="pt-16">
        <AINewsPage />
      </main>
      <Footer />
    </>
  );
}
