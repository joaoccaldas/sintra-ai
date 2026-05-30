import type { Metadata } from "next";
import ConceptsClient from "./ConceptsClient";

export const metadata: Metadata = {
  title: "Core AI Concepts Explained | Sintra Tesseract",
  description:
    "Plain-English explanations of the most important AI concepts — from transformers and RAG to MCP, agents, fine-tuning, and prompt engineering. Filterable by difficulty.",
  keywords: [
    "AI concepts",
    "transformer explained",
    "RAG retrieval augmented generation",
    "MCP model context protocol",
    "AI agents explained",
    "prompt engineering guide",
    "fine-tuning LLM",
  ],
  openGraph: {
    title: "Core AI Concepts Explained",
    description:
      "Plain-English explanations of transformers, RAG, agents, MCP, and 20 other AI concepts — filterable by difficulty.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Core AI Concepts Explained",
    description: "Plain-English explanations of 20 AI concepts, filterable by difficulty.",
  },
};

export default function ConceptsPage() {
  return <ConceptsClient />;
}
