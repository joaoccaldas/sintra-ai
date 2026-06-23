"use client";

import Header from "@/components/Header";
import HeroMinimal from "@/components/HeroMinimal";
import ContentNav from "@/components/ContentNav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

export default function Home() {
  return (
    <>
      <div className="bg-void min-h-screen">
        <Header total={USE_CASES_COUNT} />
        <main id="main-content">
          <HeroMinimal total={USE_CASES_COUNT} />
          <ContentNav />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
