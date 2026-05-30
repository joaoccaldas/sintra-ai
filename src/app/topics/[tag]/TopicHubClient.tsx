"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { TopicDef } from "@/lib/topicsData";
import type { UseCase } from "@/lib/data";
import type { NewsItem } from "@/lib/newsData";
import type { AITool } from "@/lib/toolsData";
import type { Concept } from "@/lib/concepts";
import { BASE_PATH } from "@/lib/data";
import ExpandedCard from "@/components/ExpandedCard";
import { TOPIC_HUBS } from "@/lib/topicsData";

interface TopicContent {
  prompts: UseCase[];
  news: NewsItem[];
  tools: AITool[];
  concepts: Concept[];
}

const SIG_COLOR: Record<string, string> = {
  landmark: "#d97706",
  major: "#9F8CFF",
  notable: "#6b7280",
};

const SIG_LABEL: Record<string, string> = {
  landmark: "Landmark",
  major: "Major",
  notable: "Notable",
};

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-xl bg-steel/30 border border-white/5 hover:border-white/15 hover:bg-steel/50 transition-all group"
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 shrink-0 w-2 h-2 rounded-full"
          style={{ background: SIG_COLOR[item.significance] ?? "#6b7280" }}
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-fg-3">{item.date}</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-fg-3">
              {SIG_LABEL[item.significance]}
            </span>
          </div>
          <p className="text-sm font-medium text-fg-1 leading-snug group-hover:text-white transition-colors">
            {item.title}
          </p>
          <p className="text-xs text-fg-3 mt-1 line-clamp-2">{item.summary}</p>
        </div>
        {item.url && (
          <ExternalLink className="shrink-0 w-3.5 h-3.5 text-fg-4 group-hover:text-fg-2 mt-0.5 transition-colors" />
        )}
      </div>
    </a>
  );
}

function ToolCard({ tool }: { tool: AITool }) {
  const pricingColor =
    tool.pricing === "free"
      ? "#10b981"
      : tool.pricing === "freemium"
      ? "#f59e0b"
      : "#ef4444";
  return (
    <a
      href={`${BASE_PATH}/tools/${tool.id}/`}
      className="flex items-start gap-3 p-3.5 rounded-xl bg-steel/30 border border-white/5 hover:border-white/15 hover:bg-steel/50 transition-all group"
    >
      <div className="shrink-0 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm font-bold" style={{ color: pricingColor }}>
        {tool.name[0]}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-fg-1 group-hover:text-white transition-colors">{tool.name}</span>
          <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: pricingColor + "22", color: pricingColor }}>
            {tool.pricing}
          </span>
        </div>
        <p className="text-xs text-fg-3 mt-0.5 line-clamp-2">{tool.tagline}</p>
      </div>
    </a>
  );
}

function ConceptCard({ concept }: { concept: Concept }) {
  return (
    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-steel/30 border border-white/5">
      <span className="text-xl shrink-0">{concept.icon}</span>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-fg-1">{concept.term}</span>
          {concept.shortTerm && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-white/10 text-fg-3">{concept.shortTerm}</span>
          )}
        </div>
        <p className="text-xs text-fg-3 mt-0.5">{concept.tagline}</p>
      </div>
    </div>
  );
}

function PromptRow({ item, onOpen }: { item: UseCase; onOpen: (u: UseCase) => void }) {
  return (
    <button
      onClick={() => onOpen(item)}
      className="w-full text-left flex items-start gap-3 p-3.5 rounded-xl bg-steel/30 border border-white/5 hover:border-white/15 hover:bg-steel/50 transition-all group"
    >
      <div className="min-w-0">
        <p className="text-sm font-medium text-fg-1 group-hover:text-white transition-colors line-clamp-1">{item.title}</p>
        <p className="text-xs text-fg-3 mt-0.5 line-clamp-2">{item.desc}</p>
      </div>
      <span className="shrink-0 text-xs text-fg-4 mt-0.5">{item.difficulty}</span>
    </button>
  );
}

export default function TopicHubClient({
  topic,
  content,
}: {
  topic: TopicDef;
  content: TopicContent;
}) {
  const [expandedItem, setExpandedItem] = useState<UseCase | null>(null);
  const [showAllPrompts, setShowAllPrompts] = useState(false);
  const [showAllNews, setShowAllNews] = useState(false);

  const visiblePrompts = showAllPrompts ? content.prompts : content.prompts.slice(0, 8);
  const visibleNews = showAllNews ? content.news : content.news.slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-fg-4 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-fg-2 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-fg-2">Topics</span>
        <span>/</span>
        <span style={{ color: topic.color }}>{topic.label}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl" style={{ color: topic.color }}>{topic.icon}</span>
          <h1 className="text-3xl font-bold text-fg-1">{topic.label}</h1>
        </div>
        <p className="text-fg-2 text-lg max-w-2xl">{topic.description}</p>
        {/* Stat pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {content.prompts.length > 0 && (
            <span className="text-sm px-3 py-1 rounded-full bg-white/5 text-fg-2">
              {content.prompts.length} prompt{content.prompts.length !== 1 ? "s" : ""}
            </span>
          )}
          {content.news.length > 0 && (
            <span className="text-sm px-3 py-1 rounded-full bg-white/5 text-fg-2">
              {content.news.length} news items
            </span>
          )}
          {content.tools.length > 0 && (
            <span className="text-sm px-3 py-1 rounded-full bg-white/5 text-fg-2">
              {content.tools.length} tool{content.tools.length !== 1 ? "s" : ""}
            </span>
          )}
          {content.concepts.length > 0 && (
            <span className="text-sm px-3 py-1 rounded-full bg-white/5 text-fg-2">
              {content.concepts.length} concept{content.concepts.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Content grid */}
      <div className="space-y-10">
        {/* Prompts */}
        {content.prompts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-fg-1 flex items-center gap-2">
                <span style={{ color: topic.color }}>✦</span> Prompts
              </h2>
              <Link
                href="/#prompts-section"
                className="text-xs text-fg-3 hover:text-fg-1 transition-colors"
              >
                View all library →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {visiblePrompts.map(p => (
                <PromptRow key={p.id} item={p} onOpen={setExpandedItem} />
              ))}
            </div>
            {content.prompts.length > 8 && (
              <button
                onClick={() => setShowAllPrompts(v => !v)}
                className="mt-3 text-sm text-fg-3 hover:text-fg-1 transition-colors"
              >
                {showAllPrompts ? "Show less" : `Show ${content.prompts.length - 8} more prompts`}
              </button>
            )}
          </section>
        )}

        {/* News */}
        {content.news.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-fg-1 flex items-center gap-2">
                <span style={{ color: topic.color }}>◈</span> News
              </h2>
              <Link
                href="/news/"
                className="text-xs text-fg-3 hover:text-fg-1 transition-colors"
              >
                Full timeline →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {visibleNews.map(n => (
                <NewsCard key={n.id} item={n} />
              ))}
            </div>
            {content.news.length > 6 && (
              <button
                onClick={() => setShowAllNews(v => !v)}
                className="mt-3 text-sm text-fg-3 hover:text-fg-1 transition-colors"
              >
                {showAllNews ? "Show less" : `Show ${content.news.length - 6} more news items`}
              </button>
            )}
          </section>
        )}

        {/* Tools + Concepts side by side */}
        <div className="grid md:grid-cols-2 gap-8">
          {content.tools.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-fg-1 flex items-center gap-2">
                  <span style={{ color: topic.color }}>⬡</span> Tools
                </h2>
                <Link
                  href="/tools/"
                  className="text-xs text-fg-3 hover:text-fg-1 transition-colors"
                >
                  All tools →
                </Link>
              </div>
              <div className="space-y-2">
                {content.tools.map(t => (
                  <ToolCard key={t.id} tool={t} />
                ))}
              </div>
            </section>
          )}

          {content.concepts.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-fg-1 flex items-center gap-2">
                  <span style={{ color: topic.color }}>△</span> Concepts
                </h2>
                <Link
                  href="/concepts/"
                  className="text-xs text-fg-3 hover:text-fg-1 transition-colors"
                >
                  All concepts →
                </Link>
              </div>
              <div className="space-y-2">
                {content.concepts.map(c => (
                  <ConceptCard key={c.id} concept={c} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Other topics */}
        <section>
          <h2 className="text-lg font-semibold text-fg-1 mb-4">Other Topics</h2>
          <div className="flex flex-wrap gap-2">
            {TOPIC_HUBS.filter(t => t.slug !== topic.slug).map(t => (
              <Link
                key={t.slug}
                href={`/topics/${t.slug}/`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-steel/40 border border-white/5 hover:border-white/15 text-sm text-fg-2 hover:text-fg-1 transition-all"
              >
                <span style={{ color: t.color }}>{t.icon}</span>
                {t.label}
              </Link>
            ))}
          </div>
        </section>
      </div>

      {expandedItem && (
        <ExpandedCard
          item={expandedItem}
          onClose={() => setExpandedItem(null)}
        />
      )}
    </div>
  );
}
