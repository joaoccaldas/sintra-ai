import type { Metadata } from "next";
import AIHistoryClient from "./AIHistoryClient";

export const metadata: Metadata = {
  title: "AI History Timeline — 70 Years of Milestones | Sintra Tesseract",
  description:
    "Explore the full history of artificial intelligence from 1950 to today — from Turing's test to GPT-5 and beyond. An interactive timeline of 70+ landmark moments.",
  openGraph: {
    title: "AI History Timeline — 70 Years of Milestones",
    description:
      "Explore the full history of AI from 1950 to today. An interactive timeline of landmark breakthroughs, models, and industry milestones.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI History Timeline — 70 Years of Milestones",
    description: "An interactive timeline of 70+ landmark moments in artificial intelligence.",
  },
};

export default function AIHistoryPage() {
  return <AIHistoryClient />;
}
