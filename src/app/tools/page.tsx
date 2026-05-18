"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolsDirectoryPage from "@/components/ToolsDirectoryPage";
import { USE_CASES } from "@/lib/data";

export default function ToolsRoute() {
  return (
    <>
      <Header total={USE_CASES.length} />
      <main className="pt-16">
        <ToolsDirectoryPage />
      </main>
      <Footer />
    </>
  );
}
