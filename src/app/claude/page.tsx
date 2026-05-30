import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClaudePage from "@/components/ClaudePage";
import { USE_CASES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Claude Models & Products — Sintra Tesseract",
  description: "Comprehensive guide to Anthropic's Claude model family: Haiku, Sonnet, and Opus. Capabilities, pricing, context windows, and use case recommendations.",
  openGraph: {
    title: "Claude Models & Products — Sintra Tesseract",
    description: "Claude Haiku, Sonnet, Opus — capabilities, pricing, and when to use each.",
  },
};

export default function ClaudeRoute() {
  return (
    <>
      <Header total={USE_CASES.length} />
      <main className="pt-16">
        <ClaudePage />
      </main>
      <Footer />
    </>
  );
}
