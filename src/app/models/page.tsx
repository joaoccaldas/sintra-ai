import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ModelsClient from "./ModelsClient";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";
import { AI_MODELS } from "@/lib/modelsData";

export const metadata: Metadata = {
  title: `AI Model Comparison — Pricing, Benchmarks & Capabilities | Sintra Tesseract`,
  description: `Compare ${AI_MODELS.length} frontier AI models side-by-side: API pricing, context windows, MMLU/GPQA/SWE-bench scores, and capability flags. Updated May 2026.`,
  keywords: [
    "AI model comparison",
    "GPT-4o vs Claude vs Gemini",
    "LLM pricing comparison",
    "AI benchmark scores 2026",
    "best AI model for coding",
    "ChatGPT API price",
    "Claude API price",
    "Gemini 2.5 Pro benchmarks",
  ],
  openGraph: {
    title: "AI Model Comparison — Pricing, Benchmarks & Capabilities",
    description: `Compare ${AI_MODELS.length} frontier models: pricing, context windows, and benchmark scores in one table.`,
    type: "website",
  },
};

export default function ModelsPage() {
  return (
    <>
      <Header total={USE_CASES_COUNT} />
      <main className="pt-16 min-h-screen bg-void">
        <ModelsClient />
      </main>
      <Footer />
    </>
  );
}
