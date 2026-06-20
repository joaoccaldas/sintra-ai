import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResourcesPage from "@/components/ResourcesPage";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

export const metadata: Metadata = {
  title: "Developer Resources — Sintra Tesseract",
  description: "Curated developer resources: AI APIs, SDKs, research papers, frameworks, evaluation tools, and MCP servers. Stay sharp in the AI ecosystem.",
  openGraph: {
    title: "Developer Resources — Sintra Tesseract",
    description: "Curated AI developer resources — APIs, SDKs, papers, frameworks, and evals.",
  },
};

export default function ResourcesRoute() {
  return (
    <>
      <Header total={USE_CASES_COUNT} />
      <main id="main-content" className="pt-16">
        <ResourcesPage />
      </main>
      <Footer />
    </>
  );
}
