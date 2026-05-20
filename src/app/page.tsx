"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeroMinimal from "@/components/HeroMinimal";
import NewsTicker from "@/components/NewsTicker";
import CategoryBrowser from "@/components/CategoryBrowser";
import UniversalSearch from "@/components/UniversalSearch";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { USE_CASES } from "@/lib/data";

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
          <NewsTicker />
          {heroSearch.query && (
            <UniversalSearch query={heroSearch.query} onClose={clearSearch} />
          )}
          <CategoryBrowser heroSearch={heroSearch} />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
