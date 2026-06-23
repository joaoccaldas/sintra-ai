"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Search, X } from "lucide-react";
import { AI_TOOLS, TOOL_CATEGORIES, type AITool, type ToolCategory } from "@/lib/toolsData";
import { BASE_PATH } from "@/lib/constants";
import ToolModal from "./ToolModal";
import ToolDirectoryCard from "./ToolDirectoryCard";
import { ToolCompareBar, ToolCompareModal } from "./ToolCompareTray";

const MAX_COMPARE = 4;

const PRICING_LABEL: Record<AITool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
  enterprise: "Enterprise",
};

export default function ToolsDirectoryPage() {
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all">(() => {
    if (typeof window === "undefined") return "all";
    return (new URLSearchParams(window.location.search).get("category") || "all") as ToolCategory | "all";
  });
  const [activePricing, setActivePricing] = useState<AITool["pricing"] | "all">(() => {
    if (typeof window === "undefined") return "all";
    return (new URLSearchParams(window.location.search).get("pricing") || "all") as AITool["pricing"] | "all";
  });
  const [search, setSearch] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("q") || "";
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory !== "all") params.set("category", activeCategory);
    if (activePricing !== "all") params.set("pricing", activePricing);
    if (search.trim()) params.set("q", search.trim());
    const query = params.toString();
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
  }, [activeCategory, activePricing, search]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return AI_TOOLS.filter(tool => {
      if (activeCategory !== "all" && tool.category !== activeCategory) return false;
      if (activePricing !== "all" && tool.pricing !== activePricing) return false;
      if (!query) return true;
      return [tool.name, tool.tagline, tool.provider, tool.highlight, ...tool.tags]
        .some(value => value.toLowerCase().includes(query));
    });
  }, [activeCategory, activePricing, search]);

  const compareTools = useMemo(
    () => compareIds.map(id => AI_TOOLS.find(tool => tool.id === id)).filter((tool): tool is AITool => Boolean(tool)),
    [compareIds],
  );

  const toggleCompare = useCallback((id: string) => {
    setCompareIds(current => {
      if (current.includes(id)) return current.filter(value => value !== id);
      return current.length < MAX_COMPARE ? [...current, id] : current;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSearch("");
    setActiveCategory("all");
    setActivePricing("all");
  }, []);

  return (
    <div className="min-h-screen bg-abyss text-fg-1">
      <div aria-hidden="true" className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #9F8CFF, transparent 70%)" }} />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #5EEAD4, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="pt-10 pb-6">
          <a href={`${BASE_PATH}/`} className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-3 hover:text-violet-bright transition-colors group">
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Sintra
          </a>
        </div>

        <motion.header
          className="pt-6 pb-16 border-b border-violet/[0.12]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex gap-3.5 items-center mb-6">
            <span className="w-9 h-px bg-gradient-to-r from-transparent to-violet-bright" />
            <span className="eyebrow violet">AI Tools Universe</span>
          </div>
          <h1 className="font-serif font-light text-[clamp(40px,6vw,88px)] leading-[1.04] tracking-[-0.025em] text-fg-1 mb-5">
            Useful AI tools, <em className="italic text-violet-bright">mapped.</em>
          </h1>
          <p className="font-sans text-[17px] text-fg-2 max-w-2xl leading-[1.55]">
            A curated directory organized by real work, with pricing context, practical descriptions, comparison, and direct source links.
          </p>
          <div className="flex items-center gap-4 mt-8 font-mono text-[11px] text-fg-3 tracking-[0.06em] flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              {AI_TOOLS.length} tools curated
            </span>
            <span aria-hidden="true" className="text-fg-4">·</span>
            <span>{TOOL_CATEGORIES.length} categories</span>
            <span aria-hidden="true" className="text-fg-4">·</span>
            <span>Compare up to {MAX_COMPARE}</span>
          </div>
        </motion.header>

        <div className="sticky top-16 z-40 bg-abyss/95 backdrop-blur-md border-b border-violet/[0.08] py-3 -mx-6 md:-mx-8 px-6 md:px-8">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[210px] max-w-sm">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-4 pointer-events-none" />
              <input
                type="search"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Search tools, providers, or tasks…"
                aria-label="Search AI tools"
                className="w-full bg-white/[0.04] border border-hairline rounded-lg pl-8 pr-9 py-2 font-mono text-[12px] text-fg-1 placeholder:text-fg-4 outline-none focus:border-violet/60 transition-colors"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-fg-4 hover:text-fg-1"
                  aria-label="Clear tool search"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            <div className="flex gap-1.5 flex-wrap" role="group" aria-label="Pricing filter">
              {(["all", "free", "freemium", "paid", "enterprise"] as const).map(pricing => (
                <button
                  type="button"
                  key={pricing}
                  onClick={() => setActivePricing(pricing)}
                  aria-pressed={activePricing === pricing}
                  className="font-mono text-[11px] tracking-[0.06em] px-3 py-1.5 rounded-full border transition-all capitalize"
                  style={{
                    background: activePricing === pricing ? "#9F8CFF22" : "transparent",
                    borderColor: activePricing === pricing ? "#9F8CFF88" : "#ffffff18",
                    color: activePricing === pricing ? "#B6A6FF" : "var(--fg-4)",
                  }}
                >
                  {pricing === "all" ? "All pricing" : PRICING_LABEL[pricing]}
                </button>
              ))}
            </div>

            <span className="font-mono text-[11px] text-fg-4 ml-auto" role="status">{filtered.length} tools</span>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-none py-8 border-b border-violet/[0.06]" role="group" aria-label="Tool category">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            aria-pressed={activeCategory === "all"}
            className="flex-shrink-0 flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl border transition-all"
            style={{
              background: activeCategory === "all" ? "#9F8CFF22" : "transparent",
              borderColor: activeCategory === "all" ? "#9F8CFF88" : "#ffffff12",
            }}
          >
            <span className="text-xl" aria-hidden="true">🌐</span>
            <span className="font-mono text-[11px] tracking-[0.06em] whitespace-nowrap" style={{ color: activeCategory === "all" ? "#B6A6FF" : "var(--fg-4)" }}>All</span>
          </button>
          {TOOL_CATEGORIES.map(category => (
            <button
              type="button"
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              aria-pressed={activeCategory === category.id}
              title={category.desc}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl border transition-all"
              style={{
                background: activeCategory === category.id ? "#9F8CFF22" : "transparent",
                borderColor: activeCategory === category.id ? "#9F8CFF88" : "#ffffff12",
              }}
            >
              <span className="text-xl" aria-hidden="true">{category.icon}</span>
              <span className="font-mono text-[11px] tracking-[0.06em] whitespace-nowrap" style={{ color: activeCategory === category.id ? "#B6A6FF" : "var(--fg-4)" }}>{category.label}</span>
            </button>
          ))}
        </div>

        <div className="py-10 mb-20">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-[24px] text-fg-3 mb-3">No tools match these filters</p>
              <button type="button" onClick={clearFilters} className="font-mono text-[12px] text-violet-bright hover:underline">Clear filters</button>
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
                  <ToolDirectoryCard
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
        onRemove={id => setCompareIds(current => current.filter(value => value !== id))}
        onClear={() => setCompareIds([])}
        onOpenCompare={() => setCompareOpen(true)}
      />
      <ToolCompareModal tools={compareTools} open={compareOpen} onClose={() => setCompareOpen(false)} />
    </div>
  );
}
