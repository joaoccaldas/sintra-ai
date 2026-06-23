import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ModelsClient from "./ModelsClient";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";
import { AI_MODELS } from "@/lib/modelsData";

const latestVerification = AI_MODELS
  .map(model => model.lastVerified)
  .sort((a, b) => b.localeCompare(a))[0];

const verificationLabel = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(`${latestVerification}T00:00:00Z`));

export const metadata: Metadata = {
  title: "AI Model Comparison — Pricing, Benchmarks & Capabilities | Sintra AI",
  description: `Compare ${AI_MODELS.length} AI models side by side: API pricing, context windows, benchmark scores, and capability flags. Data verified through ${verificationLabel}.`,
  keywords: [
    "AI model comparison",
    "LLM pricing comparison",
    "AI benchmark scores 2026",
    "best AI model for coding",
    "AI context window comparison",
    "ChatGPT API price",
    "Claude API price",
    "Gemini API price",
  ],
  openGraph: {
    title: "AI Model Comparison — Pricing, Benchmarks & Capabilities",
    description: `Compare ${AI_MODELS.length} models across pricing, context windows, benchmarks, and capabilities. Verified through ${verificationLabel}.`,
    type: "website",
  },
};

export default function ModelsPage() {
  return (
    <>
      <Header total={USE_CASES_COUNT} />
      <main id="main-content" className="pt-16 min-h-screen bg-void">
        <ModelsClient />
      </main>
      <Footer />
    </>
  );
}
