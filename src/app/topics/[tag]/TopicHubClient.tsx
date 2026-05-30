"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, ArrowLeft } from "lucide-react";
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

const PRICING_COLOR: Record<string, string> = {
  free: "#10b981",
  freemium: "#f59e0b",
  paid: "#ef4444",
  enterprise: "#e8c089",
};

function NewsCard({ item, accent }: { item: NewsItem; accent: string }) {
  return (
    <a
      href={item.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.05] transition-all group"
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full"
          style={{ background: SIG_COLOR[item.significance] ?? "#6b7280", boxShadow: `0 0 6px ${SIG_COLOR[item.significance] ?? "#6b7280"}` }}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-[10px] text-fg-4">{item.date}</span>
            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-[0.06em]"
              style={{ background: (SIG_COLOR[item.significance] ?? "#6b7280") + "18", color: SIG_COLOR[item.significance] ?? "#6b7280" }}>
              {SIG_LABEL[item.significance]}
            </span>
          </div>
          <p className="font-serif text-[14px] text-fg-1 leading-snug group-hover:text-white transition-colors">
            {item.title}
          </p>
          <p className="font-sans text-[12px] text-fg-3 mt-1 line-clamp-2 leading-[1.5]">{item.summary}</p>
        </div>
        {item.url && (
          <ExternalLink className="shrink-0 w-3 h-3 text-fg-4 group-hover:text-fg-2 mt-1 transition-colors" />
        )}
      </div>
    </a>
  );
}

function ToolCard({ tool }: { tool: AITool }) {
  const pc = PRICING_COLOR[tool.pricing] ?? "#9F8CFF";
  return (
    <a
      href={`${BASE_PATH}/tools/${tool.id}/`}
      className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.05] transition-all group"
    >
      <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border border-white/[0.08]"
        style={{ background: pc + "14", color: pc }}>
        {tool.name[0]}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-serif text-[14px] text-fg-1 group-hover:text-white transition-colors">{tool.name}</span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full capitalize"
            style={{ background: pc + "18", color: pc }}>
            {tool.pricing}
          </span>
        </div>
        <p className="font-sans text-[12px] text-fg-3 mt-0.5 line-clamp-2 leading-[1.45]">{tool.tagline}</p>
      </div>
    </a>
  );
}

function ConceptCard({ concept }: { concept: Concept }) {
  return (
    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
      <span className="text-xl shrink-0 leading-none mt-0.5">{concept.icon}</span>
      <div>
        <div className="flex items-center gap-2">
          <span className="font-serif text-[14px] text-fg-1">{concept.term}</span>
          {concept.shortTerm && (
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.06] text-fg-4">{concept.shortTerm}</span>
          )}
        </div>
        <p className="font-sans text-[12px] text-fg-3 mt-0.5 leading-[1.45]">{concept.tagline}</p>
      </div>
    </div>
  );
}

function PromptRow({ item, onOpen, accent }: { item: UseCase; onOpen: (u: UseCase) => void; accent: string }) {
  return (
    <button
      onClick={() => onOpen(item)}
      className="w-full text-left flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.05] transition-all group"
    >
      <span className="shrink-0 w-1 h-1 rounded-full mt-2" style={{ background: accent }} />
      <div className="min-w-0 flex-1">
        <p className="font-serif text-[14px] text-fg-1 group-hover:text-white transition-colors line-clamp-1">{item.title}</p>
        <p className="font-sans text-[12px] text-fg-3 mt-0.5 line-clamp-1 leading-[1.45]">{item.desc}</p>
      </div>
      <span className="shrink-0 font-mono text-[10px] text-fg-4 capitalize mt-0.5">{item.difficulty}</span>
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
    <div className="min-h-screen bg-abyss text-fg-1">
      {/* Ambient glow */}
      <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: `radial-gradient(circle, ${topic.color}, transparent 70%)` }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 pt-10 pb-24">
        {/* Back nav + breadcrumb */}
        <div className="flex items-center gap-4 mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-3 hover:text-violet-bright transition-colors group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            Home
          </Link>
          <span className="text-fg-4">/</span>
          <Link href="/topics/" className="font-mono text-[11px] text-fg-4 hover:text-fg-2 transition-colors">Topics</Link>
          <span className="text-fg-4">/</span>
          <span className="font-mono text-[11px]" style={{ color: topic.color }}>{topic.label}</span>
        </div>

        {/* Accent bar */}
        <div className="h-[3px] w-20 rounded-full mb-8"
          style={{ background: `linear-gradient(90deg, ${topic.color}, transparent)` }} />

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl" style={{ color: topic.color }}>{topic.icon}</span>
            <h1 className="font-serif font-light text-[clamp(28px,4vw,52px)] leading-[1.06] tracking-[-0.02em] text-fg-1">
              {topic.label}
            </h1>
          </div>
          <p className="font-sans text-[16px] text-fg-2 leading-[1.6] max-w-2xl mb-5">{topic.description}</p>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-2">
            {content.prompts.length > 0 && (
              <span className="font-mono text-[11px] px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-fg-3">
                {content.prompts.length} prompt{content.prompts.length !== 1 ? "s" : ""}
              </span>
            )}
            {content.news.length > 0 && (
              <span className="font-mono text-[11px] px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-fg-3">
                {content.news.length} news items
              </span>
            )}
            {content.tools.length > 0 && (
              <span className="font-mono text-[11px] px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-fg-3">
                {content.tools.length} tool{content.tools.length !== 1 ? "s" : ""}
              </span>
            )}
            {content.concepts.length > 0 && (
              <span className="font-mono text-[11px] px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-fg-3">
                {content.concepts.length} concept{content.concepts.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-12">
          {/* Prompts */}
          {content.prompts.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="eyebrow flex items-center gap-2">
                  <span style={{ color: topic.color }}>✦</span> Prompts
                </h2>
                <Link href="/#prompts-section" className="font-mono text-[11px] text-fg-4 hover:text-fg-1 transition-colors">
                  Full library →
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {visiblePrompts.map(p => (
                  <PromptRow key={p.id} item={p} onOpen={setExpandedItem} accent={topic.color} />
                ))}
              </div>
              {content.prompts.length > 8 && (
                <button
                  onClick={() => setShowAllPrompts(v => !v)}
                  className="mt-4 font-mono text-[11px] text-fg-3 hover:text-fg-1 transition-colors"
                >
                  {showAllPrompts ? "Show less" : `Show ${content.prompts.length - 8} more prompts`}
                </button>
              )}
            </section>
          )}

          {/* News */}
          {content.news.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="eyebrow flex items-center gap-2">
                  <span style={{ color: topic.color }}>◈</span> News
                </h2>
                <Link href="/news/" className="font-mono text-[11px] text-fg-4 hover:text-fg-1 transition-colors">
                  Full timeline →
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {visibleNews.map(n => (
                  <NewsCard key={n.id} item={n} accent={topic.color} />
                ))}
              </div>
              {content.news.length > 6 && (
                <button
                  onClick={() => setShowAllNews(v => !v)}
                  className="mt-4 font-mono text-[11px] text-fg-3 hover:text-fg-1 transition-colors"
                >
                  {showAllNews ? "Show less" : `Show ${content.news.length - 6} more news items`}
                </button>
              )}
            </section>
          )}

          {/* Tools + Concepts side by side */}
          {(content.tools.length > 0 || content.concepts.length > 0) && (
            <div className="grid md:grid-cols-2 gap-10">
              {content.tools.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="eyebrow flex items-center gap-2">
                      <span style={{ color: topic.color }}>⬡</span> Tools
                    </h2>
                    <Link href="/tools/" className="font-mono text-[11px] text-fg-4 hover:text-fg-1 transition-colors">
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
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="eyebrow flex items-center gap-2">
                      <span style={{ color: topic.color }}>△</span> Concepts
                    </h2>
                    <Link href="/concepts/" className="font-mono text-[11px] text-fg-4 hover:text-fg-1 transition-colors">
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
          )}

          {/* Other topics */}
          <section className="border-t border-hairline pt-10">
            <h2 className="eyebrow block mb-5">Other Topics</h2>
            <div className="flex flex-wrap gap-2">
              {TOPIC_HUBS.filter(t => t.slug !== topic.slug).map(t => (
                <Link
                  key={t.slug}
                  href={`/topics/${t.slug}/`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] hover:border-white/[0.16] text-[13px] text-fg-2 hover:text-fg-1 transition-all font-sans"
                >
                  <span style={{ color: t.color }}>{t.icon}</span>
                  {t.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
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
