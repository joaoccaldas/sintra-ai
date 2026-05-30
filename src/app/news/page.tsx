import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AINewsPage from "@/components/AINewsPage";
import { USE_CASES } from "@/lib/data";
import { AI_NEWS } from "@/lib/newsData";

export const metadata: Metadata = {
  title: "AI News Timeline — Sintra Tesseract",
  description: `${AI_NEWS.length} curated AI milestones from GPT-3 to today. Track model releases, benchmark records, and landmark industry events on one timeline.`,
  openGraph: {
    title: "AI News Timeline — Sintra Tesseract",
    description: `${AI_NEWS.length} AI milestones — model releases, benchmarks, and industry events.`,
  },
  alternates: {
    types: {
      "application/rss+xml": "/sintra-ai/feed.xml",
    },
  },
};

export default function NewsRoute() {
  return (
    <>
      <Header total={USE_CASES.length} />
      <main className="pt-16">
        <AINewsPage />
      </main>
      <Footer />
    </>
  );
}
