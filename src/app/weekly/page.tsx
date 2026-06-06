import type { Metadata } from "next";
import WeeklyClient from "./WeeklyClient";

export const metadata: Metadata = {
  title: "Weekly AI Digest — Sintra Tesseract",
  description:
    "The week's most significant AI developments in newsletter format: top stories, model releases, funding rounds, policy moves, and a prompt to try.",
  openGraph: {
    title: "Weekly AI Digest — Sintra Tesseract",
    description:
      "The week's most significant AI developments: top stories, model releases, funding, policy, and a prompt to try.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function WeeklyPage() {
  return <WeeklyClient />;
}
