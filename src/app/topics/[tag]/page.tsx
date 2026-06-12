import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopicHubClient from "./TopicHubClient";
import { TOPIC_HUBS, getTopicContent } from "@/lib/topicsData";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

export function generateStaticParams() {
  return TOPIC_HUBS.map(t => ({ tag: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const topic = TOPIC_HUBS.find(t => t.slug === tag);
  if (!topic) return {};
  const { prompts, news, tools } = getTopicContent(topic);
  return {
    title: `${topic.label} — AI Prompts, News & Tools | Sintra Tesseract`,
    description: `${topic.description} Browse ${prompts.length} prompts, ${news.length} news items, and ${tools.length} tools on one page.`,
    openGraph: {
      title: `${topic.label} — AI Hub`,
      description: topic.description,
      type: "website",
    },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const topic = TOPIC_HUBS.find(t => t.slug === tag);
  if (!topic) notFound();

  const content = getTopicContent(topic);

  return (
    <>
      <Header total={USE_CASES_COUNT} />
      <main className="pt-16 min-h-screen bg-void">
        <TopicHubClient topic={topic} content={content} />
      </main>
      <Footer />
    </>
  );
}
