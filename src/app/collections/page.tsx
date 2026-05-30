import type { Metadata } from "next";
import CollectionsClient from "./CollectionsClient";

export const metadata: Metadata = {
  title: "Curated AI Prompt Collections | Sintra Tesseract",
  description:
    "Hand-picked AI prompt collections for common workflows — grab a full toolkit for writing, coding, finance, research, and more.",
  openGraph: {
    title: "Curated AI Prompt Collections",
    description: "Hand-picked prompt kits for every workflow — copy a full toolkit, not just a single prompt.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Curated AI Prompt Collections",
    description: "Hand-picked prompt kits for every workflow.",
  },
};

export default function CollectionsPage() {
  return <CollectionsClient />;
}
