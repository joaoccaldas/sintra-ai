"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Search, Scale, Check } from "lucide-react";
import { AI_TOOLS, TOOL_CATEGORIES, type AITool, type ToolCategory } from "@/lib/toolsData";
import { BASE_PATH } from "@/lib/constants";
import ToolModal from "./ToolModal";
import { ToolCompareBar, ToolCompareModal } from "./ToolCompareTray";

const MAX_COMPARE = 4;

const PRICING_COLOR: Record<string, string> = {
  free:       "#10b981",
  freemium:   "#6ee7a0",
  paid:       "#9F8CFF",
  enterprise: "#e8c089",
};

const PRICING_LABEL: Record<string, string> = {
  free:       "Free",
  freemium:   "Freemium",
  paid:       "Paid",
  enterprise: "Enterprise",
};

function ToolCard({ tool, onOpen, isComparing, onToggleCompare, compareDisabled }: {
  tool: AITool;
  onOpen: (t: AITool) => void;
  isComparing: boolean;
  onToggleCompare: () => void;
  compareDisabled: boolean;
}) {
  const cat = TOOL_CATEGORIES.find(c => c.id === tool.category);
  return (
    <button
      onClick={() => onOpen(tool)}
      className={`group relative flex flex-col gap-3 rounded-xl border p-5 transition-all duration-200 hover:scale-[1.015] hover:shadow-lg bg-[#0d0a1c] text-left w-full ${
        isComparing ? "border-violet/60" : "border-violet/[0.12] hover:border-violet/40"
      }`}
    >
      {/* Compare toggle */}
      <span
        role="checkbox"
        aria-checked={isComparing}
        aria-label={isComparing ? `Remove ${tool.name} from comparison` : `Add ${tool.name} to comparison`}
        title={compareDisabled && !isComparing ? `You can compare up to ${MAX_COMPARE} tools at once` : "Add to comparison"}
        onClick={e => { e.stopPropagation(); if (!compareDisabled || isComparing) onToggleCompare(); }}
        className={`absolute top-3 right-3 z-10 flex items-center justify-center w-6 h-6 rounded-full border transition-all cursor-pointer ${
          isComparing
            ? "bg-violet border-violet text-fg-on-violet"
            : `bg-[#0d0a1c]/80 border-white/15 text-fg-4 hover:text-violet-bright hover:border-violet/40 ${compareDisabled ? "opacity-30 cursor-not-allowed" : ""}`
        }`}
      >
        {isComparing ? <Check size={11} /> : <Scale size={11} />}
      </span>

      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-serif text-[16px] text-fg-1 leading-none">{tool.name}</h3>
            {tool.status === "beta" && (
              <span className="font-mono text-[8px] px-1.5 py-0.5 rounded-full border border-amber-500/40 text-amber-400 bg-amber-500/10 uppercase tracking-[0.08em]">Beta</span>
            )}
          </div>
          <p className="font-sans text-[12px] text-fg-4">{tool.provider}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 pr-7">
          <span className="font-mono text-[9px] px-2 py-0.5 rounded-full border uppercase tracking-[0.08em]"
            style={{ color: PRICING_COLOR[tool.pricing], borderColor: PRICING_COLOR[tool.pricing] + "44", background: PRICING_COLOR[tool.pricing] + "12" }}>
            {PRICING_LABEL[tool.pricing]}
          </span>
          <ExternalLink size={11} className="text-fg-4 group-hover:text-violet-bright transition-colors" />
        </div>
      </div>

      {/* Tagline */}
      <p className="font-sans text-[13px] text-fg-2 leading-[1.5]">{tool.tagline}</p>

      {/* Highlight */}
      <p className="font-sans text-[12px] text-fg-3 leading-[1.4] line-clamp-2">{tool.highlight}</p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-hairline/50 mt-auto">
        <span className="font-mono text-[10px] text-fg-4">
          {cat?.icon} {cat?.label}
        </span>
        <span className="font-mono text-[10px] text-fg-4">{tool.priceNote}</span>
      </div>
    </button>
  );
}

export default function ToolsDirectoryPage() {
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all">(() => {
    if (typeof window === "undefined") return "all";
    return (new URLSearchParams(window.location.search).get("category") || "all") as ToolCategory | "all";
  });
  const [activePricing, setActivePricing] = useState<string>(() => {
    if (typeof window === "undefined") return "all";
    return new URLSearchParams(window.location.search).get("pricing") || "all";
  });
  const [search, setSearch] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("q") || "";
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory !== "all") params.set("category", activeCategory);
    if (activePricing  !== "all") params.set("pricing",  activePricing);
    if (search)                   params.set("q",        search);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [activeCategory, activePricing, search]);

  const filtered = useMemo(() => {
    return AI_TOOLS.filter(t => {
      if (activeCategory !== "all" && t.category !== activeCategory) return false;
      if (activePricing !== "all" && t.pricing !== activePricing) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!t.name.toLowerCase().includes(q) && !t.tagline.toLowerCase().includes(q) && !t.provider.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [activeCategory, activePricing, search]);

  const compareTools = useMemo(
    () => compareIds.map(id => AI_TOOLS.find(t => t.id === id)).filter((t): t is AITool => !!t),
    [compareIds]
  );

  const toggleCompare = useCallback((id: string) => {
    setCompareIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < MAX_COMPARE ? [...prev, id] : prev
    );
  }, []);

  return (
    <div className="min-h-screen bg-abyss text-fg-1">
      {/* Ambient */}
      <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #9F8CFF, transparent 70%)" }} />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #5EEAD4, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Back */}
        <div className="pt-10 pb-6">
          <a href={`${BASE_PATH}/`}
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-3 hover:text-violet-bright transition-colors group">
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Sintra
          </a>
        </div>

        {/* Hero */}
        <motion.header className="pt-6 pb-16 border-b border-violet/[0.12]"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <div className="inline-flex gap-3.5 items-center mb-6">
            <span className="w-9 h-px bg-gradient-to-r from-transparent to-violet-bright" />
            <span className="eyebrow violet">AI Tools Universe</span>
          </div>
          <h1 className="font-serif font-light text-[clamp(40px,6vw,88px)] leading-[1.04] tracking-[-0.025em] text-fg-1 mb-5">
            Every AI tool,{" "}
            <em className="italic" style={{
              backgroundImage: "linear-gradient(180deg, #F4F2EA 0%, #9F8CFF 100%)",
              WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>mapped.</em>
          </h1>
          <p className="font-sans text-[17px] text-fg-2 max-w-xl leading-[1.55]">
            A curated directory of the best AI tools across every category — with honest pricing, real descriptions, and direct links.
          </p>
          <div className="flex items-center gap-4 mt-8 font-mono text-[11px] text-fg-3 tracking-[0.06em]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {AI_TOOLS.length} tools curated
            </span>
            <span className="text-fg-4">·</span>
            <span>{TOOL_CATEGORIES.length} categories</span>
          </div>
        </motion.header>

        {/* Filters */}
        <div className="sticky top-16 z-40 bg-abyss/95 backdrop-blur-md border-b border-violet/[0.08] py-3 -mx-6 md:-mx-8 px-6 md:px-8">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-4 pointer-events-none" />
              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tools…"
                className="w-full bg-white/[0.04] border border-hairline rounded-lg pl-8 pr-3 py-1.5 font-mono text-[12px] text-fg-1 placeholder:text-fg-4 outline-none focus:border-violet/60 transition-colors"
              />
            </div>

            {/* Pricing filter */}
            <div className="flex gap-1.5 flex-wrap">
              {(["all", "free", "freemium", "paid", "enterprise"] as const).map(p => (
                <button key={p} onClick={() => setActivePricing(p)}
                  className="font-mono text-[10px] tracking-[0.06em] px-2.5 py-1 rounded-full border transition-all capitalize"
                  style={{
                    background:  activePricing === p ? "#9F8CFF22" : "transparent",
                    borderColor: activePricing === p ? "#9F8CFF88" : "#ffffff18",
                    color:       activePricing === p ? "#B6A6FF"   : "#6b6a8a",
                  }}>
                  {p === "all" ? "All pricing" : PRICING_LABEL[p]}
                </button>
              ))}
            </div>

            {filtered.length !== AI_TOOLS.length && (
              <span className="font-mono text-[11px] text-fg-4 ml-auto">{filtered.length} results</span>
            )}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-4 overflow-x-auto scrollbar-none py-8 border-b border-violet/[0.06]" style={{ scrollbarWidth: "none" }}>
          <button
            onClick={() => setActiveCategory("all")}
            className="flex-shrink-0 flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl border transition-all"
            style={{
              background:  activeCategory === "all" ? "#9F8CFF22" : "transparent",
              borderColor: activeCategory === "all" ? "#9F8CFF88" : "#ffffff12",
            }}
          >
            <span className="text-xl">🌐</span>
            <span className="font-mono text-[10px] tracking-[0.06em] whitespace-nowrap" style={{ color: activeCategory === "all" ? "#B6A6FF" : "#6b6a8a" }}>All</span>
          </button>
          {TOOL_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              title={cat.desc}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl border transition-all"
              style={{
                background:  activeCategory === cat.id ? "#9F8CFF22" : "transparent",
                borderColor: activeCategory === cat.id ? "#9F8CFF88" : "#ffffff12",
              }}
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="font-mono text-[10px] tracking-[0.06em] whitespace-nowrap" style={{ color: activeCategory === cat.id ? "#B6A6FF" : "#6b6a8a" }}>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="py-10 mb-20">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-[24px] text-fg-3 mb-3">No tools found</p>
              <button onClick={() => { setSearch(""); setActiveCategory("all"); setActivePricing("all"); }}
                className="font-mono text-[12px] text-violet-bright hover:underline">Clear filters</button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${activePricing}-${search}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filtered.map(tool => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    onOpen={setSelectedTool}
                    isComparing={compareIds.includes(tool.id)}
                    onToggleCompare={() => toggleCompare(tool.id)}
                    compareDisabled={compareIds.length >= MAX_COMPARE}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
      <ToolModal tool={selectedTool} onClose={() => setSelectedTool(null)} />

      <ToolCompareBar
        tools={compareTools}
        onRemove={id => setCompareIds(prev => prev.filter(x => x !== id))}
        onClear={() => setCompareIds([])}
        onOpenCompare={() => setCompareOpen(true)}
      />
      <ToolCompareModal tools={compareTools} open={compareOpen} onClose={() => setCompareOpen(false)} />
    </div>
  );
}
