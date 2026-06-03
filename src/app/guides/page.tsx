import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuidesClient from "./GuidesClient";
import { USE_CASES } from "@/lib/data";

export const metadata: Metadata = {
  title: "AI Guides & Playbooks — Sintra Tesseract",
  description: "Practical guides on building with AI: agents, RAG pipelines, model selection, fine-tuning, and cost optimization.",
  openGraph: {
    title: "AI Guides & Playbooks — Sintra Tesseract",
    description: "Practical how-to guides for AI practitioners.",
  },
};

export default function GuidesRoute() {
  return (
    <>
      <Header total={USE_CASES.length} />
      <main className="pt-16">
        <GuidesClient />
      </main>
      <Footer />
    </>
  );
}
