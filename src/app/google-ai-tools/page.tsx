import type { Metadata } from "next";
import GoogleAiToolsClient from "./GoogleAiToolsClient";

export const metadata: Metadata = {
  title: "Google I/O 2026 AI Tools Guide — Step-by-Step | Sintra Tesseract",
  description:
    "Complete guide to every new Google AI tool launched at I/O 2026 — Gemini 3.5 Flash, Gemini Omni, Antigravity 2.0, Gemini Spark, AI Mode, and more. Step-by-step instructions for each.",
  keywords: [
    "Google I/O 2026",
    "Gemini 3.5 Flash",
    "Gemini Omni",
    "Antigravity 2.0",
    "Gemini Spark",
    "Google AI Mode",
    "Android XR glasses",
    "Google AI tools guide",
    "WebMCP",
    "Google AI Ultra",
  ],
  openGraph: {
    title: "Google I/O 2026 AI Tools — Step-by-Step Guide",
    description:
      "Every Google AI tool from I/O 2026 explained with access guides and real use cases: Gemini 3.5 Flash, Omni, Antigravity, Spark, and more.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Google I/O 2026 AI Tools — Step-by-Step Guide",
    description:
      "Gemini 3.5 Flash, Gemini Omni, Antigravity 2.0, Gemini Spark, AI Mode — full access and usage guide.",
  },
};

export default function GoogleAiToolsPage() {
  return <GoogleAiToolsClient />;
}
