import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopicHubClient from "./TopicHubClient";
import { TOPIC_HUBS, getTopicContent } from "@/lib/topicsData";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";

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
    alternates: { canonical: `https://joaoccaldas.github.io/sintra-ai/topics/${topic.slug}/` },
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
  const { playbook } = topic;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: topic.label,
        description: topic.description,
        url: `${SITE_URL}/topics/${topic.slug}/`,
        about: {
          "@type": "DefinedTerm",
          name: topic.label,
          description: playbook?.whatItIs ?? topic.description,
        },
        ...(playbook && {
          hasPart: [
            {
              "@type": "ItemList",
              name: "Design Principles",
              itemListElement: playbook.designPrinciples.map((text, i) => ({
                "@type": "ListItem", position: i + 1, name: text,
              })),
            },
            {
              "@type": "ItemList",
              name: "Recommended Stack",
              itemListElement: playbook.recommendedStack.map((text, i) => ({
                "@type": "ListItem", position: i + 1, name: text,
              })),
            },
            {
              "@type": "ItemList",
              name: "Best Use Cases",
              itemListElement: playbook.bestUseCases.map((text, i) => ({
                "@type": "ListItem", position: i + 1, name: text,
              })),
            },
            {
              "@type": "ItemList",
              name: "Common Pitfalls",
              itemListElement: playbook.commonPitfalls.map((text, i) => ({
                "@type": "ListItem", position: i + 1, name: text,
              })),
            },
            {
              "@type": "HowTo",
              name: `${topic.label} — Tips`,
              step: playbook.tips.map((text) => ({ "@type": "HowToStep", text })),
            },
          ],
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Topics", item: `${SITE_URL}/topics/` },
          { "@type": "ListItem", position: 3, name: topic.label, item: `${SITE_URL}/topics/${topic.slug}/` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header total={USE_CASES_COUNT} />
      <main id="main-content" className="pt-16 min-h-screen bg-void">
        <TopicHubClient topic={topic} content={content} />
      </main>
      <Footer />
    </>
  );
}
