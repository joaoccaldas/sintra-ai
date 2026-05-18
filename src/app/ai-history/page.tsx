import type { Metadata } from "next";
import AIHistoryTimeline from "@/components/AIHistoryTimeline";

export const metadata: Metadata = {
  title: "AI History Timeline — Sintra Tesseract",
  description: "An interactive timeline of artificial intelligence history from ancient mathematics to agentic AI — 39 milestones across 8 eras.",
};

export default function AIHistoryPage() {
  return (
    <main className="w-full h-dvh overflow-hidden">
      <AIHistoryTimeline />
    </main>
  );
}
