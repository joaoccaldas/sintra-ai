import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SavedPromptsProvider } from "@/context/SavedPromptsContext";
import { USE_CASES } from "@/lib/data";

const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090B14",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sintra Tesseract — AI Use Case Library",
  description: `${USE_CASES.length} copy-ready AI prompts for finance, data analytics, writing, and software teams. Find the right prompt, copy it, ship the work.`,
  keywords: [
    "AI prompts", "ChatGPT prompts", "Claude prompts",
    "AI use cases", "prompt engineering",
    "FP&A AI", "finance AI prompts", "data analytics AI",
    "productivity prompts", "copy-ready AI templates",
  ],
  openGraph: {
    title: "Sintra Tesseract — AI Use Case Library",
    description: `${USE_CASES.length} copy-ready AI prompts for finance, analytics & knowledge work.`,
    url: SITE_URL,
    siteName: "Sintra Tesseract",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/tesseract-hero.webp`,
        width: 1200,
        height: 630,
        alt: "Sintra Tesseract — AI Use Case Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sintra Tesseract — AI Use Case Library",
    description: `${USE_CASES.length} copy-ready AI prompts for finance, analytics & knowledge work.`,
    images: [`${SITE_URL}/tesseract-hero.webp`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>
          <SavedPromptsProvider>{children}</SavedPromptsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
