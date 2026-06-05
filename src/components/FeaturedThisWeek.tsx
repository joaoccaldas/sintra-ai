"use client";

import { motion } from "framer-motion";
import { ArrowRight, Newspaper, Lightbulb, BookOpen, FlaskConical, type LucideProps } from "lucide-react";
import { THIS_WEEK, type FeaturedItem, type FeaturedItemType } from "@/lib/featuredData";
import { BASE_PATH } from "@/lib/data";
import { type ForwardRefExoticComponent, type RefAttributes } from "react";

type LucideIcon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

// ── Icon per item type ────────────────────────────────────────────────────

const TYPE_ICON: Record<FeaturedItemType, LucideIcon> = {
  news:   Newspaper,
  prompt: Lightbulb,
  guide:  BookOpen,
  paper:  FlaskConical,
  tool:   Lightbulb,
};

const TYPE_LABEL: Record<FeaturedItemType, string> = {
  news:   "This week's story",
  prompt: "Prompt to try",
  guide:  "Read this",
  paper:  "Paper to know",
  tool:   "Tool spotlight",
};

// ── Single pick card ──────────────────────────────────────────────────────

function PickCard({ item, index }: { item: FeaturedItem; index: number }) {
  const Icon = TYPE_ICON[item.type];

  /* Resolve href — internal anchors get BASE_PATH prepended if needed */
  const href =
    item.href.startsWith("http") || item.href.startsWith("#")
      ? item.href
      : `${BASE_PATH}${item.href}`;

  const isExternal = item.href.startsWith("http");

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onClick={
        item.href === "#library"
          ? (e) => {
              e.preventDefault();
              document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
            }
          : undefined
      }
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-200"
    >
      {/* Type label + badge */}
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.14em] uppercase text-fg-4">
          <Icon size={10} />
          {TYPE_LABEL[item.type]}
        </span>
        {item.badge && (
          <span
            className="font-mono text-[9px] tracking-[0.08em] uppercase px-1.5 py-0.5 rounded-full border"
            style={{
              color: item.badgeColor ?? "#9F8CFF",
              borderColor: (item.badgeColor ?? "#9F8CFF") + "44",
              background: (item.badgeColor ?? "#9F8CFF") + "12",
            }}
          >
            {item.badge}
          </span>
        )}
      </div>

      {/* Title */}
      <p className="font-serif text-[14px] text-fg-1 leading-[1.35] group-hover:text-white transition-colors line-clamp-2">
        {item.title}
      </p>

      {/* Editorial why */}
      <p className="font-mono text-[10px] text-fg-4 leading-[1.5] line-clamp-2">
        {item.why}
      </p>

      {/* CTA */}
      <span className="mt-auto flex items-center gap-1 font-mono text-[9px] tracking-[0.10em] uppercase text-fg-4 group-hover:text-violet-bright transition-colors">
        Read <ArrowRight size={9} className="group-hover:translate-x-0.5 transition-transform" />
      </span>
    </motion.a>
  );
}

// ── Main component ────────────────────────────────────────────────────────

/**
 * FeaturedThisWeek — editorial pick of 4 items curated each Monday.
 * Update src/lib/featuredData.ts to change the picks.
 */
export default function FeaturedThisWeek() {
  return (
    <div className="mb-16">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-6 h-px bg-gradient-to-r from-transparent to-violet/60" />
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4">
          This week
        </span>
        <span className="font-mono text-[10px] text-fg-4 opacity-40">· {THIS_WEEK.weekOf}</span>
        <span className="flex-1 h-px bg-hairline" />
      </div>

      {/* Editorial note */}
      <p className="font-sans text-[13px] text-fg-3 leading-[1.6] mb-5 max-w-2xl">
        {THIS_WEEK.editorial}
      </p>

      {/* 4-column picks grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {THIS_WEEK.items.map((item, i) => (
          <PickCard key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}
