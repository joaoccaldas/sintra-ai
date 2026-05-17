"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { USE_CASES, UseCase, DISC_COUNTS } from "@/lib/data";
import { CAROUSEL_ITEMS } from "./CategoryCarousel3D";
import UseCaseCard from "./UseCaseCard";
import ExpandedCard from "./ExpandedCard";

const CategoryCarousel3D = dynamic(() => import("./CategoryCarousel3D"), { ssr: false });

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.3, delay: Math.min(i, 12) * 0.04, ease: [0.22, 1, 0.36, 1] as const },
  }),
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.15 } },
};

export default function CategoryBrowser() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [expanded, setExpanded] = useState<UseCase | null>(null);

  const selected = CAROUSEL_ITEMS[selectedIdx];

  const cases = useMemo(
    () => USE_CASES.filter(u => u.category === selected.id),
    [selected.id]
  );

  const prev = () => setSelectedIdx(i => (i - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
  const next = () => setSelectedIdx(i => (i + 1) % CAROUSEL_ITEMS.length);

  const onTagFilter = (tag: string) => {
    // no-op for now — tags in carousel mode just show in expanded card
  };

  return (
    <section id="explore" className="relative bg-void overflow-hidden">
      {/* 3D Carousel */}
      <div className="relative h-[56vh] min-h-[360px] max-h-[520px] w-full">
        <CategoryCarousel3D selectedIndex={selectedIdx} onSelect={setSelectedIdx} />

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="carousel-arrow carousel-arrow--left"
          aria-label="Previous category"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          className="carousel-arrow carousel-arrow--right"
          aria-label="Next category"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Active category label */}
      <div className="relative z-10 text-center py-8 md:py-10 px-6 border-b border-hairline">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="eyebrow mb-2" style={{ color: selected.hex }}>
              {String(selectedIdx + 1).padStart(2, "0")} / {String(CAROUSEL_ITEMS.length).padStart(2, "0")}
            </p>
            <h2
              className="font-serif font-light text-[clamp(36px,5vw,72px)] leading-[1.03] tracking-[-0.02em] text-fg-1"
              style={{ textShadow: `0 0 60px ${selected.hex}30` }}
            >
              {selected.label}
            </h2>
            <p className="font-sans text-[15px] text-fg-3 mt-2 max-w-sm mx-auto leading-[1.5]">
              {selected.essence}
            </p>
            <span className="font-mono text-[11px] text-fg-4 tracking-[0.08em] mt-3 block">
              {DISC_COUNTS[selected.id] ?? 0} use cases
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Category dots */}
        <div className="flex justify-center gap-2 mt-5">
          {CAROUSEL_ITEMS.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setSelectedIdx(i)}
              className="w-2 h-2 rounded-full transition-all duration-200"
              style={{
                background: i === selectedIdx ? item.hex : "rgba(255,255,255,0.15)",
                transform: i === selectedIdx ? "scale(1.4)" : "scale(1)",
                boxShadow: i === selectedIdx ? `0 0 8px ${item.hex}` : "none",
              }}
              aria-label={item.label}
            />
          ))}
        </div>
      </div>

      {/* Cases grid */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-16">
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
                    onTagFilter={onTagFilter}
                    isFeatured={featured}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <ExpandedCard item={expanded} onClose={() => setExpanded(null)} />
    </section>
  );
}
