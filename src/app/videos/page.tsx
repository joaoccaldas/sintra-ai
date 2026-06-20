import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideosClient from "./VideosClient";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";
import { YOUTUBE_VIDEOS } from "@/lib/videoData";

const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";

export const metadata: Metadata = {
  title: `AI Video Library — ${YOUTUBE_VIDEOS.length} Curated Talks | Sintra Tesseract`,
  description:
    "Curated AI video tutorials, keynotes, and lectures — from Karpathy's LLM intro to Google I/O. Structured by topic and skill level.",
  openGraph: {
    title: "AI Video Library — Sintra Tesseract",
    description: "The best AI lectures, tutorials, and keynotes — curated and categorised.",
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/videos/` },
};

// ItemList of VideoObjects so the curated talks are eligible for video rich
// results. Thumbnails come from YouTube's predictable still URL.
const videosJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: YOUTUBE_VIDEOS.map((v, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "VideoObject",
      name: v.title,
      description: v.summary,
      thumbnailUrl: `https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`,
      contentUrl: v.url,
      embedUrl: `https://www.youtube.com/embed/${v.videoId}`,
      ...(v.year ? { uploadDate: `${v.year}-01-01` } : {}),
    },
  })),
};

export default function VideosRoute() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videosJsonLd) }} />
      <Header total={USE_CASES_COUNT} />
      <main id="main-content" className="pt-16 min-h-screen bg-void">
        <VideosClient />
      </main>
      <Footer />
    </>
  );
}
