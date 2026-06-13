import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SavedPromptsProvider } from "@/context/SavedPromptsContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { DesktopSidebar, MobileSidebar } from "@/components/SidebarNav";
import ScrollProgress from "@/components/ScrollProgress";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090B14",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: "/sintra-ai/manifest.json",
  title: "Sintra Tesseract — Daily AI News & Use Case Library",
  description: `Daily AI news, model updates, and ${USE_CASES_COUNT} copy-ready prompts for finance, data analytics, writing, and software teams. Stay current, then ship the work.`,
  keywords: [
    "AI news", "AI news digest", "daily AI updates",
    "AI prompts", "ChatGPT prompts", "Claude prompts",
    "AI use cases", "prompt engineering",
    "FP&A AI", "finance AI prompts", "data analytics AI",
    "productivity prompts", "copy-ready AI templates",
  ],
  openGraph: {
    title: "Sintra Tesseract — Daily AI News & Use Case Library",
    description: `Daily AI news and model updates, plus ${USE_CASES_COUNT} copy-ready prompts for finance, analytics & knowledge work.`,
    url: SITE_URL,
    siteName: "Sintra Tesseract",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/tesseract-hero.webp`,
        width: 1200,
        height: 630,
        alt: "Sintra Tesseract — Daily AI News & Use Case Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sintra Tesseract — Daily AI News & Use Case Library",
    description: `Daily AI news and model updates, plus ${USE_CASES_COUNT} copy-ready prompts for finance, analytics & knowledge work.`,
    images: [`${SITE_URL}/tesseract-hero.webp`],
  },
  alternates: {
    types: {
      "application/rss+xml": [
        { url: `${SITE_URL}/feed.xml`, title: "Sintra Tesseract — AI News Feed" },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          defer
          data-domain="joaoccaldas.github.io"
          src="https://plausible.io/js/script.js"
        />
        <link rel="apple-touch-icon" href="/sintra-ai/tesseract-mark.svg" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <SidebarProvider>
            <LanguageProvider>
              <SavedPromptsProvider>
                <ScrollProgress />
                <DesktopSidebar />
                <MobileSidebar />
                {/* Content shifts right on desktop to clear the sidebar */}
                <div className="sidebar-content-shift">
                  {children}
                </div>
              </SavedPromptsProvider>
            </LanguageProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
