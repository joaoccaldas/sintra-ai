import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SavedPromptsProvider } from "@/context/SavedPromptsContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { DesktopSidebar, MobileSidebar } from "@/components/SidebarNav";
import ScrollProgress from "@/components/ScrollProgress";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import MotionProvider from "@/components/MotionProvider";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-geist-sans",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090B14",
};

export const metadata: Metadata = {
  // Origin only (no /sintra-ai path) — Next already applies `basePath` when
  // resolving the file-convention opengraph-image routes, so including the
  // path here as well doubled it (.../sintra-ai/sintra-ai/opengraph-image).
  // All other absolute URLs in this app are built manually from SITE_URL
  // and don't depend on this resolution.
  metadataBase: new URL("https://joaoccaldas.github.io"),
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

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Sintra Tesseract",
      url: SITE_URL,
      logo: `${SITE_URL}/tesseract-mark.svg`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Sintra Tesseract",
      description: "Daily AI news, model updates, and copy-ready prompts for finance, data analytics, writing, and software teams.",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${geist.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://plausible.io" />
        <script
          defer
          data-domain="joaoccaldas.github.io"
          src="https://plausible.io/js/script.js"
        />
        <link rel="icon" href="/sintra-ai/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/sintra-ai/tesseract-mark.svg" />
        <link rel="apple-touch-icon" href="/sintra-ai/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <SidebarProvider>
            <LanguageProvider>
              <SavedPromptsProvider>
                <MotionProvider>
                  <ServiceWorkerRegister />
                  <ScrollProgress />
                  <DesktopSidebar />
                  <MobileSidebar />
                  {/* Content shifts right on desktop to clear the sidebar */}
                  <div className="sidebar-content-shift">
                    {children}
                  </div>
                </MotionProvider>
              </SavedPromptsProvider>
            </LanguageProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
