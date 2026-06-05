import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResearchClient from "./ResearchClient";
import { USE_CASES } from "@/lib/data";

export const metadata: Metadata = {
  title: "AI Research Digest — Key Papers Explained | Sintra Tesseract",
  description:
    "Foundational and frontier AI research papers explained in plain English for practitioners. Transformers, RLHF, LoRA, SWE-bench, DeepSeek-R1, and more.",
  openGraph: {
    title: "AI Research Digest — Key Papers Explained",
    description:
      "The papers that shaped modern AI — explained for practitioners, not academics.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Research Digest",
    description: "Key AI papers in plain English.",
  },
};

export default function ResearchPage() {
  return (
    <>
      <Header total={USE_CASES.length} />
      <ResearchClient />
      <Footer />
    </>
  );
}
