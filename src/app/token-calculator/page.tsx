import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TokenCalculator from "@/components/TokenCalculator";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

export const metadata: Metadata = {
  title: "AI Token & Cost Calculator — Sintra Tesseract",
  description:
    "Estimate token usage for any prompt and compare the cost of running it across Claude, GPT, Gemini, DeepSeek, and Llama. Project monthly API spend by volume.",
  keywords: [
    "AI token calculator",
    "LLM cost calculator",
    "Claude pricing",
    "GPT pricing comparison",
    "Gemini cost",
    "token estimator",
    "API cost projection",
  ],
  openGraph: {
    title: "AI Token & Cost Calculator",
    description:
      "Estimate tokens and compare model API costs across Claude, GPT, Gemini, DeepSeek, and Llama.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Token & Cost Calculator",
    description: "Estimate tokens and compare model API costs across the major providers.",
  },
};

export default function TokenCalculatorRoute() {
  return (
    <>
      <Header total={USE_CASES_COUNT} />
      <main id="main-content" className="pt-16">
        <TokenCalculator />
      </main>
      <Footer />
    </>
  );
}
