"use client";

import Header from "@/components/Header";
import HeroMinimal from "@/components/HeroMinimal";
import ContentNav from "@/components/ContentNav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { USE_CASES } from "@/lib/data";

export default function Home() {
  return (
    <>
      <a
        href="#explore"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-3 focus:py-2 focus:rounded focus:bg-steel focus:text-fg-1 focus:outline focus:outline-violet-bright"
      >
        Skip to content
      </a>
      <div className="bg-void min-h-screen">
        <Header total={USE_CASES.length} />
        <main>
          <HeroMinimal total={USE_CASES.length} />
          <ContentNav />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
