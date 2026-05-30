"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeroMinimal from "@/components/HeroMinimal";
import CategoryBrowser from "@/components/CategoryBrowser";
import UniversalSearch from "@/components/UniversalSearch";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ThePulse from "@/components/ThePulse";
import { USE_CASES } from "@/lib/data";
import { AI_NEWS } from "@/lib/newsData";
import { AI_TOOLS } from "@/lib/toolsData";
import { AI_MODELS } from "@/lib/modelsData";
import { CONCEPTS } from "@/lib/concepts";

export default function Home() {
  const [heroSearch, setHeroSearch] = useState({ query: "", version: 0 });

  const handleHeroSearch = (q: string) => {
    setHeroSearch(prev => ({ query: q, version: prev.version + 1 }));
  };

  const clearSearch = () => setHeroSearch({ query: "", version: 0 });

  return (
    <>
      <a
        href="#explore"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-3 focus:py-2 focus:rounded focus:bg-steel focus:text-fg-1 focus:outline focus:outline-violet-bright"
      >
        Skip to library
      </a>
      <div className="bg-void min-h-screen">
        <Header total={USE_CASES.length} />
        <main>
          <HeroMinimal total={USE_CASES.length} onSearch={handleHeroSearch} />
          {heroSearch.query && (
            <UniversalSearch query={heroSearch.query} onClose={clearSearch} />
          )}
          <ThePulse />

          {/* ── Stat strip ─────────────────────────────────────────── */}
          <div className="w-full max-w-[860px] mx-auto px-6 md:px-8 mb-2">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-4 border-t border-b border-hairline">
              {[
                { n: USE_CASES.length,  label: "prompts" },
                { n: AI_TOOLS.length,   label: "tools" },
                { n: AI_NEWS.length,    label: "news items" },
                { n: AI_MODELS.length,  label: "models" },
                { n: CONCEPTS.length,   label: "concepts" },
              ].map(({ n, label }) => (
                <span key={label} className="flex items-baseline gap-1.5">
                  <span className="font-mono text-[15px] font-medium text-fg-1 tabular-nums">{n}</span>
                  <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-fg-4">{label}</span>
                </span>
              ))}
            </div>
          </div>

          <div id="explore">
            <CategoryBrowser heroSearch={heroSearch} />
          </div>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
