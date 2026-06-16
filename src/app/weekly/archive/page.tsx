"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Newspaper, Lightbulb, BookOpen, FlaskConical, Wrench } from "lucide-react";
import { WEEKLY_ARCHIVE, THIS_WEEK, type WeeklyFeature, type FeaturedItemType } from "@/lib/featuredData";
import { BASE_PATH } from "@/lib/constants";

const TYPE_ICON: Record<FeaturedItemType, React.ElementType> = {
  news: Newspaper, prompt: Lightbulb, guide: BookOpen, paper: FlaskConical, tool: Wrench,
};

const TYPE_LABEL: Record<FeaturedItemType, string> = {
  news: "Story", prompt: "Prompt", guide: "Guide", paper: "Paper", tool: "Tool",
};

function DigestCard({ digest, index, isCurrent }: { digest: WeeklyFeature; index: number; isCurrent?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] as const }}
      className={[
        "group rounded-2xl border p-7 transition-all duration-200",
        isCurrent
          ? "border-violet/40 bg-violet/[0.06] hover:border-violet/60"
          : "border-white/[0.08] bg-white/[0.015] hover:border-white/15 hover:bg-white/[0.03]",
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {isCurrent && (
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.14em] uppercase px-2 py-0.5 rounded-full bg-violet/20 border border-violet/40 text-violet-bright">
                <span className="w-1 h-1 rounded-full bg-violet-bright animate-pulse" />
                This Week
              </span>
            )}
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-fg-4">
              Week of {digest.weekOf}
            </span>
          </div>
          <p className="font-sans text-[13px] text-fg-3 leading-[1.55] max-w-xl">{digest.editorial}</p>
        </div>
        {isCurrent && (
          <a href={`${BASE_PATH}/weekly/`}
            className="shrink-0 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.08em] uppercase px-4 py-2 rounded-lg bg-violet/20 border border-violet/40 text-violet-bright hover:bg-violet/30 transition-colors">
            Read <ArrowRight size={11} />
          </a>
        )}
      </div>

      {/* 4 picks grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 border-t border-white/[0.06]">
        {digest.items.map((item, i) => {
          const Icon = TYPE_ICON[item.type];
          return (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="w-6 h-6 rounded-md bg-violet/10 border border-violet/20 flex items-center justify-center shrink-0 mt-0.5">
                <Icon size={11} className="text-violet-bright" />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[8px] tracking-[0.14em] uppercase text-fg-4 block mb-0.5">
                  {TYPE_LABEL[item.type]}
                  {item.badge && (
                    <span className="ml-1.5 px-1 py-0.5 rounded border font-mono text-[7px]"
                      style={{ color: item.badgeColor ?? "#9F8CFF", borderColor: (item.badgeColor ?? "#9F8CFF") + "44", background: (item.badgeColor ?? "#9F8CFF") + "12" }}>
                      {item.badge}
                    </span>
                  )}
                </span>
                <p className="font-serif text-[12px] text-fg-2 leading-[1.35]">{item.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.article>
  );
}

export default function WeeklyArchivePage() {
  const all: (WeeklyFeature & { isCurrent?: boolean })[] = [
    { ...THIS_WEEK, isCurrent: true },
    ...[...WEEKLY_ARCHIVE].reverse(),
  ];

  return (
    <div className="min-h-screen bg-abyss text-fg-1">
      {/* Ambient */}
      <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 left-1/3 w-[500px] h-[500px] rounded-full opacity-[0.035]"
          style={{ background: "radial-gradient(circle, var(--violet), transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-[820px] mx-auto px-6 md:px-8 pt-24 pb-32">

        {/* Back */}
        <a href={`${BASE_PATH}/weekly/`}
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-3 hover:text-violet-bright transition-colors group mb-10 block">
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform inline" />
          Weekly Digest
        </a>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-9 h-px bg-gradient-to-r from-transparent to-violet-bright" />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-fg-4">Archive · {all.length} issues</span>
          </div>
          <h1 className="font-serif font-light text-[clamp(32px,5vw,60px)] leading-[1.08] tracking-[-0.02em] text-fg-1 mb-4">
            Past Digests
          </h1>
          <p className="font-sans text-[15px] text-fg-2 max-w-md leading-[1.6]">
            Every week&apos;s editor&apos;s picks and top stories, archived. Updated every Monday.
          </p>
        </motion.div>

        {/* Digest list */}
        <div className="flex flex-col gap-5">
          {all.map((digest, i) => (
            <DigestCard key={digest.weekOf} digest={digest} index={i} isCurrent={digest.isCurrent} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-14 pt-8 border-t border-hairline/50 flex flex-wrap items-center gap-4">
          <a href={`${BASE_PATH}/news/`}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.08em] uppercase text-fg-3 hover:text-violet-bright transition-colors">
            Full news archive <ArrowRight size={11} />
          </a>
          <span className="text-fg-4 font-mono text-[11px]">·</span>
          <a href={`${BASE_PATH}/`}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.08em] uppercase text-fg-3 hover:text-violet-bright transition-colors">
            Back to Sintra <ArrowRight size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}
