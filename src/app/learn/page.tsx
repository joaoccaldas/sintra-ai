import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LearningPathsPage from "@/components/LearningPathsPage";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

export const metadata: Metadata = {
  title: "AI Learning Paths — Sintra Tesseract",
  description: "Structured learning paths for AI beginners through advanced practitioners. From first prompts to LLM pipelines and agentic systems.",
  openGraph: {
    title: "AI Learning Paths — Sintra Tesseract",
    description: "Structured AI learning paths from beginner to expert.",
  },
};

export default function LearnRoute() {
  return (
    <>
      <Header total={USE_CASES_COUNT} />
      <main className="pt-16">
        <LearningPathsPage />
      </main>
      <Footer />
    </>
  );
}
