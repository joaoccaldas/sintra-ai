import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import LiveFeedPage from "@/components/LiveFeedPage";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";
import { LIVE_FEED } from "@/lib/liveFeedData";

const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";

export const metadata: Metadata = {
  title: "Live AI Feed — The Frontier As It Ships — Sintra AI",
  description: `Every new post from ${LIVE_FEED.sourceCount} primary AI sources — labs, research, and high-signal press — aggregated fresh on every build. ${LIVE_FEED.itemCount} items right now.`,
  openGraph: {
    title: "Live AI Feed — The Frontier As It Ships — Sintra AI",
    description: `The raw pulse of AI: ${LIVE_FEED.itemCount} posts from ${LIVE_FEED.sourceCount} primary sources, no algorithm in the loop.`,
    url: `${SITE_URL}/live/`,
  },
  alternates: {
    canonical: `${SITE_URL}/live/`,
    types: { "application/rss+xml": `${SITE_URL}/feed.xml` },
  },
};

/** schema.org DataFeed describing the aggregated live feed. */
function liveJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "DataFeed",
    name: "Sintra AI — Live AI Feed",
    url: `${SITE_URL}/live/`,
    dateModified: LIVE_FEED.generatedAt,
    description: `Aggregated posts from ${LIVE_FEED.sourceCount} primary AI sources.`,
    dataFeedElement: LIVE_FEED.items.slice(0, 20).map((it) => ({
      "@type": "DataFeedItem",
      dateCreated: it.publishedAt ?? undefined,
      item: {
        "@type": "Article",
        headline: it.title,
        url: it.url,
        publisher: { "@type": "Organization", name: it.source },
      },
    })),
  };
}

export default function LivePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(liveJsonLd()) }}
      />
      <Header total={USE_CASES_COUNT} />
      <main id="main-content">
        <LiveFeedPage />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
