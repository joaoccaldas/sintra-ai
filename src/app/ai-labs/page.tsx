"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AILabsPage from "@/components/AILabsPage";
import { USE_CASES } from "@/lib/data";

export default function AILabsRoute() {
  return (
    <>
      <Header total={USE_CASES.length} />
      <AILabsPage />
      <Footer />
    </>
  );
}
