import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolsDirectoryPage from "@/components/ToolsDirectoryPage";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";
import { AI_TOOLS } from "@/lib/toolsData";

export const metadata: Metadata = {
  title: "AI Tools Directory — Sintra Tesseract",
  description: `Browse ${AI_TOOLS.length} curated AI tools across image generation, coding, audio, video, and more. Compare providers, pricing, and use cases.`,
  openGraph: {
    title: "AI Tools Directory — Sintra Tesseract",
    description: `${AI_TOOLS.length} curated AI tools — compare models, providers, and use cases.`,
  },
};

export default function ToolsRoute() {
  return (
    <>
      <Header total={USE_CASES_COUNT} />
      <main className="pt-16">
        <ToolsDirectoryPage />
      </main>
      <Footer />
    </>
  );
}
