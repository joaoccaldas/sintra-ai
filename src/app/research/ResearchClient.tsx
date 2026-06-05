"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, ExternalLink, ChevronRight, Search } from "lucide-react";
import {
  RESEARCH_PAPERS,
  CATEGORY_META,
  type ResearchPaper,
  type ResearchCategory,
} from "@/lib/researchData";

const DIFFICULTY_COLOR: Record<string, string> = {
  beginner:     "text-emerald-400",
  intermediate: "text-violet-400",
  advanced:     "text-rose-400",
};

function PaperCard({
  paper,
  onClick,
}: {
  paper: ResearchPaper;
  onClick: () => void;
}) {
  const meta = CATEGORY_META[paper.category];
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      onClick={onClick}
      className="w-full text-left bg-[#1a1a2e]/60 border border-white/8 rounded-xl p-5 flex flex-col gap-3 hover:border-white/20 transition-colors"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none mt-0.5">{paper.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: meta.color + "22", color: meta.color }}
            >
              {meta.icon} {meta.label}
            </span>
            <span className={`text-xs font-medium ${DIFFICULTY_COLOR[paper.difficulty]}`}>
              {paper.difficulty}
            </span>
          </div>
          <h3 className="font-semibold text-sm text-white/90 leading-snug line-clamp-2">
            {paper.shortTitle}
          </h3>
          <p className="text-xs text-white/45 mt-0.5">
            {paper.authors} · {paper.institution} · {paper.year}
          </p>
        </div>
      </div>
      <p className="text-xs text-white/60 leading-relaxed line-clamp-3">{paper.tldr}</p>
      <div className="flex items-center justify-between pt-1 border-t border-white/6">
        <div className="flex flex-wrap gap-1">
          {paper.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] bg-white/6 text-white/40 px-1.5 py-0.5 rounded">
              {t}
            </span>
          ))}
        </div>
        <ChevronRight size={13} className="text-white/30 flex-shrink-0" />
      </div>
    </motion.button>
  );
}

function PaperDetail({
  paper,
  onClose,
}: {
  paper: ResearchPaper;
  onClose: () => void;
}) {
  const meta = CATEGORY_META[paper.category];
  return (
    <motion.div
      key={paper.id}
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "spring", stiffness: 280, damping: 30 }}
      className="fixed right-0 top-0 h-full w-full max-w-xl bg-[#0e0e1c] border-l border-white/10 shadow-2xl z-50 overflow-y-auto"
    >
      <div className="sticky top-0 bg-[#0e0e1c]/95 backdrop-blur border-b border-white/8 px-6 py-4 flex items-center gap-3">
        <span className="text-2xl">{paper.icon}</span>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-white text-sm leading-snug line-clamp-2">
            {paper.shortTitle}
          </h2>
          <p className="text-xs text-white/40">
            {paper.authors} · {paper.institution} · {paper.year}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-white/8 transition-colors text-white/50 hover:text-white flex-shrink-0"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex gap-2 flex-wrap">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: meta.color + "22", color: meta.color }}
          >
            {meta.icon} {meta.label}
          </span>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full bg-white/8 ${DIFFICULTY_COLOR[paper.difficulty]}`}>
            {paper.difficulty}
          </span>
        </div>

        <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-violet-300 uppercase tracking-wider mb-2">
            TL;DR
          </h3>
          <p className="text-sm text-white/80 leading-relaxed">{paper.tldr}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
            Why It Matters for Practitioners
          </h3>
          <p className="text-sm text-white/70 leading-relaxed">{paper.whyItMatters}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
            Key Findings
          </h3>
          <ul className="space-y-2">
            {paper.keyFindings.map((f, i) => (
              <li key={i} className="flex gap-2 text-sm text-white/65 leading-relaxed">
                <span className="text-violet-400 flex-shrink-0 font-bold mt-0.5">→</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
            Tags
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {paper.tags.map((t) => (
              <span
                key={t}
                className="text-xs bg-white/6 text-white/50 px-2 py-0.5 rounded-full border border-white/8"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {paper.url && (
          <a
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
          >
            <BookOpen size={14} />
            Read the paper
            <ExternalLink size={12} className="opacity-60" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function ResearchClient() {
  const [activeCategory, setActiveCategory] = useState<ResearchCategory | "all">("all");
  const [activePaper, setActivePaper] = useState<ResearchPaper | null>(null);
  const [query, setQuery] = useState("");

  const categories = Object.entries(CATEGORY_META) as [ResearchCategory, typeof CATEGORY_META[ResearchCategory]][];

  const filtered = useMemo(() => {
    let list = RESEARCH_PAPERS;
    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.shortTitle.toLowerCase().includes(q) ||
          p.tldr.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.institution.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, query]);

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white">
      {/* Header */}
      <div className="border-b border-white/8">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3">
            Research Digest
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Key AI Papers, Plain English
          </h1>
          <p className="text-base text-white/50 max-w-2xl">
            The foundational and frontier research that shapes every model, benchmark, and technique you encounter — explained for practitioners, not academics.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="relative mb-6 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search papers, topics…"
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
          />
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory("all")}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              activeCategory === "all"
                ? "bg-violet-600 border-violet-500 text-white"
                : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
            }`}
          >
            All ({RESEARCH_PAPERS.length})
          </button>
          {categories.map(([cat, meta]) => {
            const count = RESEARCH_PAPERS.filter((p) => p.category === cat).length;
            if (count === 0) return null;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  activeCategory === cat
                    ? "text-white border-transparent"
                    : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
                }`}
                style={
                  activeCategory === cat
                    ? { background: meta.color + "33", borderColor: meta.color + "66", color: meta.color }
                    : {}
                }
              >
                {meta.icon} {meta.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((paper) => (
              <motion.div
                key={paper.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <PaperCard paper={paper} onClick={() => setActivePaper(paper)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/30 text-sm">
            No papers match &quot;{query}&quot;
          </div>
        )}
      </div>

      {/* Scrim + Detail panel */}
      <AnimatePresence>
        {activePaper && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePaper(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <PaperDetail paper={activePaper} onClose={() => setActivePaper(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
