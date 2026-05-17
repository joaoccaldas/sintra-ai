"use client";

import { useState, useCallback, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Disciplines from "@/components/Disciplines";
import LibraryBrowser from "@/components/LibraryBrowser";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { USE_CASES } from "@/lib/data";

export default function Home() {
  const [libCategory, setLibCategory] = useState("all");
  const nonceRef = useRef(0);
  const [nonce, setNonce] = useState(0);

  const handleDisciplineSelect = useCallback((cat: string) => {
    setLibCategory(cat);
    nonceRef.current += 1;
    setNonce(nonceRef.current);
  }, []);

  return (
    <>
      <a
        href="#library"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-3 focus:py-2 focus:rounded focus:bg-steel focus:text-fg-1 focus:outline focus:outline-violet-bright"
      >
        Skip to library
      </a>
      <div className="bg-abyss min-h-screen">
        <Header total={USE_CASES.length} />
        <main>
          <Hero total={USE_CASES.length} />
          <StatsBar />
          <Disciplines onSelect={handleDisciplineSelect} />
          <LibraryBrowser
            initialCategory={libCategory}
            initialCategoryNonce={nonce}
          />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
