import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AILabsPage from "@/components/AILabsPage";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";
import { AI_LABS } from "@/lib/aiLabsData";

export const metadata: Metadata = {
  title: "AI Labs & Providers — Sintra Tesseract",
  description: `Profiles of ${AI_LABS.length} leading AI research labs and providers. Strengths, models, products, and use cases at a glance.`,
  openGraph: {
    title: "AI Labs & Providers — Sintra Tesseract",
    description: `${AI_LABS.length} AI lab profiles — models, products, and strengths.`,
  },
};

export default function AILabsRoute() {
  return (
    <>
      <Header total={USE_CASES_COUNT} />
      <AILabsPage />
      <Footer />
    </>
  );
}
