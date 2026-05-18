"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LearningPathsPage from "@/components/LearningPathsPage";
import { USE_CASES } from "@/lib/data";

export default function LearnRoute() {
  return (
    <>
      <Header total={USE_CASES.length} />
      <main className="pt-16">
        <LearningPathsPage />
      </main>
      <Footer />
    </>
  );
}
