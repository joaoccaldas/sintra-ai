"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AINewsPage from "@/components/AINewsPage";
import { USE_CASES } from "@/lib/data";

export default function NewsRoute() {
  return (
    <>
      <Header total={USE_CASES.length} />
      <main className="pt-16">
        <AINewsPage />
      </main>
      <Footer />
    </>
  );
}
