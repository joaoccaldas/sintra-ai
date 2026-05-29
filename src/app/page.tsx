"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeroMinimal from "@/components/HeroMinimal";
import CategoryBrowser from "@/components/CategoryBrowser";
import UniversalSearch from "@/components/UniversalSearch";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FeaturedCollections from "@/components/FeaturedCollections";
import PersonaEntry from "@/components/PersonaEntry";
import ThePulse from "@/components/ThePulse";
import SiteHub from "@/components/SiteHub";
import { USE_CASES } from "@/lib/data";

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 max-w-[1100px] mx-auto px-6 md:px-8 py-2">
      <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-fg-4 shrink-0">{label}</span>
      <span className="flex-1 h-px bg-hairline" />
    </div>
  );
}

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
          <SiteHub />
          <SectionDivider label="What's happening" />
          <ThePulse />
          <SectionDivider label="Prompt library" />
          <div id="prompts-section">
            <PersonaEntry />
            <CategoryBrowser heroSearch={heroSearch} />
          </div>
          <SectionDivider label="Collections" />
          <FeaturedCollections />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
