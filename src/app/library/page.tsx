import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromptLibrarySection from "@/components/PromptLibrarySection";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

export const metadata: Metadata = {
  title: `Prompt Library — ${USE_CASES_COUNT} AI Use Cases — Sintra Tesseract`,
  description: `Search and filter ${USE_CASES_COUNT} copy-ready AI prompts across writing, coding, finance, research, and more. Every prompt includes a sample output and recommended model.`,
  openGraph: {
    title: `Prompt Library — ${USE_CASES_COUNT} AI Use Cases`,
    description: `${USE_CASES_COUNT} copy-ready, tested AI prompts — filter by category, difficulty, and time.`,
  },
};

export default function LibraryRoute() {
  return (
    <>
      <Header total={USE_CASES_COUNT} />
      <main id="main-content" className="pt-16">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 py-10">
          <PromptLibrarySection />
        </div>
      </main>
      <Footer />
    </>
  );
}
