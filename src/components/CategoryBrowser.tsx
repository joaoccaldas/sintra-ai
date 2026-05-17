"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import { USE_CASES, UseCase, DISC_COUNTS } from "@/lib/data";
import { CAROUSEL_ITEMS } from "./CategoryCarousel3D";
import UseCaseCard from "./UseCaseCard";
import ExpandedCard from "./ExpandedCard";

const CategoryCarousel3D = dynamic(() => import("./CategoryCarousel3D"), { ssr: false });

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.35, delay: Math.min(i, 12) * 0.045, ease: [0.22, 1, 0.36, 1] as const },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
};

export default function CategoryBrowser() {
  const [selectedIdx, setSelectedIdx]   = useState(0);
  const [browsingIdx, setBrowsingIdx]   = useState<number | null>(null);
  const [expanded, setExpanded]         = useState<UseCase | null>(null);

  const selected  = CAROUSEL_ITEMS[selectedIdx];
  const browsing  = browsingIdx !== null ? CAROUSEL_ITEMS[browsingIdx] : null;

  const cases = useMemo(
    () => browsing ? USE_CASES.filter(u => u.category === browsing.id) : [],
    [browsing]
  );

  const prev = () => setSelectedIdx(i => (i - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
  const next = () => setSelectedIdx(i => (i + 1) % CAROUSEL_ITEMS.length);

  // Clicking the 3D shape selects it; clicking again (already selected) opens the panel
  const handleSelect = useCallback((idx: number) => {
    if (idx === selectedIdx) {
      setBrowsingIdx(idx);
    } else {
      setSelectedIdx(idx);
    }
  }, [selectedIdx]);

  const closeBrowsing = () => setBrowsingIdx(null);

  return (
    <section id="explore" className="relative bg-void overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── 3D Carousel ─────────────────────────────────────────────── */}
        <div className="relative h-[56vh] min-h-[360px] max-h-[520px] w-full">
          <CategoryCarousel3D selectedIndex={selectedIdx} onSelect={handleSelect} />

          <button onClick={prev} className="carousel-arrow carousel-arrow--left" aria-label="Previous category">
            <ChevronLeft size={22} />
          </button>
          <button onClick={next} className="carousel-arrow carousel-arrow--right" aria-label="Next category">
            <ChevronRight size={22} />
          </button>
        </div>

        {/* ── Active category label ────────────────────────────────────── */}
        <div className="relative z-10 text-center py-8 md:py-10 px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="eyebrow mb-3" style={{ color: selected.hex }}>
                {selected.cosmicName.toUpperCase()}
              </p>
              <h2
                className="font-serif font-light text-[clamp(32px,4.5vw,64px)] leading-[1.03] tracking-[-0.02em] text-fg-1"
                style={{ textShadow: `0 0 60px ${selected.hex}30` }}
              >
                {selected.label}
              </h2>
              <p className="font-sans text-[15px] text-fg-3 mt-2 max-w-sm mx-auto leading-[1.5]">
                {selected.essence}
              </p>
              <span className="font-mono text-[11px] text-fg-4 tracking-[0.08em] mt-3 block">
                {String(selectedIdx + 1).padStart(2, "0")} / {String(CAROUSEL_ITEMS.length).padStart(2, "0")}
                &nbsp;·&nbsp;
                {DISC_COUNTS[selected.id] ?? 0} use cases
              </span>

              {/* Explore CTA */}
              <button
                onClick={() => setBrowsingIdx(selectedIdx)}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-current font-mono text-[11px] tracking-[0.1em] uppercase transition-all duration-200 hover:bg-white/5"
                style={{ color: selected.hex, borderColor: `${selected.hex}60` }}
              >
                Explore use cases →
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Dot navigator */}
          <div className="flex justify-center gap-2 mt-6">
            {CAROUSEL_ITEMS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setSelectedIdx(i)}
                className="w-2 h-2 rounded-full transition-all duration-200"
                style={{
                  background: i === selectedIdx ? item.hex : "rgba(255,255,255,0.15)",
                  transform:  i === selectedIdx ? "scale(1.4)" : "scale(1)",
                  boxShadow:  i === selectedIdx ? `0 0 8px ${item.hex}` : "none",
                }}
                aria-label={item.label}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Domain panel (full-screen overlay) ───────────────────────── */}
      <AnimatePresence>
        {browsing && (
          <motion.div
            key="domain-panel"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-void overflow-y-auto"
            style={{ paddingTop: "env(safe-area-inset-top)" }}
          >
            {/* Panel header */}
            <div
              className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-hairline bg-void/95 backdrop-blur-md"
              style={{ boxShadow: `0 1px 0 ${browsing.hex}18` }}
            >
              <button
                onClick={closeBrowsing}
                className="flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase text-fg-3 hover:text-fg-1 transition-colors"
              >
                <ArrowLeft size={14} /> Universe
              </button>

              <div className="text-center">
                <p className="font-mono text-[10px] tracking-[0.12em] uppercase" style={{ color: browsing.hex }}>
                  {browsing.cosmicName}
                </p>
                <p className="font-sans text-[13px] font-medium text-fg-1">{browsing.label}</p>
              </div>

              <button
                onClick={closeBrowsing}
                className="w-8 h-8 flex items-center justify-center rounded-full text-fg-3 hover:text-fg-1 hover:bg-white/8 transition-all"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Accent line */}
            <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${browsing.hex}60, transparent)` }} />

            {/* Cards grid */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-10 md:py-14">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout" initial={false}>
                  {cases.map((item, i) => {
                    const featured = i === 0 && cases.length >= 4;
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        custom={i}
                        variants={CARD_VARIANTS}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className={featured ? "sm:col-span-2 lg:col-span-2" : ""}
                      >
                        <UseCaseCard
                          item={item}
                          onOpen={setExpanded}
                          onTagFilter={() => {}}
                          isFeatured={featured}
                        />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ExpandedCard item={expanded} onClose={() => setExpanded(null)} />
    </section>
  );
}
