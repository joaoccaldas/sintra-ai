import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TOPIC_HUBS, getTopicContent } from "@/lib/topicsData";
import { BASE_PATH } from "@/lib/constants";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

export const metadata: Metadata = {
  title: "AI Topic Hubs — Prompts, News & Tools by Theme | Sintra Tesseract",
  description:
    "Browse AI prompts, news, and tools organized by topic — Agents, Coding, Writing, Finance, Safety, Open Source, and more.",
  openGraph: {
    title: "AI Topic Hubs | Sintra Tesseract",
    description: "Cross-silo views of prompts, news, tools, and concepts for 17 AI topics.",
    type: "website",
  },
};

export default function TopicsIndexPage() {
  const topics = TOPIC_HUBS.map(t => {
    const { prompts, news, tools, concepts } = getTopicContent(t);
    return { ...t, counts: { prompts: prompts.length, news: news.length, tools: tools.length, concepts: concepts.length } };
  });

  return (
    <>
      <Header total={USE_CASES_COUNT} />
      <main className="pt-16 min-h-screen bg-void">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <nav className="text-xs text-fg-4 mb-6 flex items-center gap-1.5">
            <Link href="/" className="hover:text-fg-2 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-fg-2">Topics</span>
          </nav>

          <h1 className="text-3xl font-bold text-fg-1 mb-2">Topic Hubs</h1>
          <p className="text-fg-3 mb-10 text-lg">
            Cross-silo views of prompts, news, tools, and concepts — pick a theme to explore everything in one place.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map(t => (
              <Link
                key={t.slug}
                href={`/topics/${t.slug}/`}
                className="group p-5 rounded-2xl bg-steel/30 border border-white/5 hover:border-white/15 hover:bg-steel/50 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl" style={{ color: t.color }}>{t.icon}</span>
                  <span className="font-semibold text-fg-1 group-hover:text-white transition-colors">{t.label}</span>
                </div>
                <p className="text-xs text-fg-3 mb-4 line-clamp-2">{t.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {t.counts.prompts > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-fg-3">
                      {t.counts.prompts}p
                    </span>
                  )}
                  {t.counts.news > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-fg-3">
                      {t.counts.news}n
                    </span>
                  )}
                  {t.counts.tools > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-fg-3">
                      {t.counts.tools}t
                    </span>
                  )}
                  {t.counts.concepts > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-fg-3">
                      {t.counts.concepts}c
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
