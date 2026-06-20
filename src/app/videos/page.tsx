import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideosClient from "./VideosClient";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";
import { YOUTUBE_VIDEOS } from "@/lib/videoData";

export const metadata: Metadata = {
  title: `AI Video Library — ${YOUTUBE_VIDEOS.length} Curated Talks | Sintra Tesseract`,
  description:
    "Curated AI video tutorials, keynotes, and lectures — from Karpathy's LLM intro to Google I/O. Structured by topic and skill level.",
  openGraph: {
    title: "AI Video Library — Sintra Tesseract",
    description: "The best AI lectures, tutorials, and keynotes — curated and categorised.",
    type: "website",
  },
};

export default function VideosRoute() {
  return (
    <>
      <Header total={USE_CASES_COUNT} />
      <main id="main-content" className="pt-16 min-h-screen bg-void">
        <VideosClient />
      </main>
      <Footer />
    </>
  );
}
