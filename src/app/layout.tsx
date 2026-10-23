import type { Metadata, Viewport } from "next";
import { BASE_PATH } from "@/lib/constants";
import { Instrument_Serif, Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./hardening.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SavedPromptsProvider } from "@/context/SavedPromptsContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import SidebarNav from "@/components/SidebarNav";
import ScrollProgress from "@/components/ScrollProgress";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import MotionProvider from "@/components/MotionProvider";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";

const editorial = Instrument_Serif({
  subsets: ["latin"], weight: "400", style: ["normal", "italic"],
  variable: "--font-instrument", display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"], variable: "--font-manrope", display: "swap",
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
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e1216" },
    { media: "(prefers-color-scheme: light)", color: "#f4efe7" },
  ],
};

export const metadata: Metadata = {
  // Preview copies must not compete with canonical GitHub Pages content.
  ...(process.env.SINTRA_PREVIEW_BASE_PATH
    ? { robots: { index: false, follow: false } }
    : {}),
  metadataBase: new URL("https://joaoccaldas.github.io"),
  applicationName: "Sintra AI",
  manifest: `${BASE_PATH}/manifest.json`,
  title: "Sintra AI — Notícias, aprendizado e IA na prática para o Brasil",
  description: `IA no Brasil primeiro, notícias do mundo com fontes, trilhas de aprendizado e ${USE_CASES_COUNT} exemplos de aplicação no trabalho e no dia a dia.`,
  keywords: [
    "AI news",
    "AI learning paths",
    "AI tools",
    "AI model comparison",
    "AI prompts",
    "ChatGPT prompts",
    "Claude prompts",
    "AI use cases",
    "prompt engineering",
    "FP&A AI",
    "finance AI prompts",
    "data analytics AI",
  ],
  openGraph: {
    title: "Sintra AI — Daily AI Intelligence, Learning & Use Cases",
    description: `Track AI developments, build practical understanding, compare tools and models, and use ${USE_CASES_COUNT} copy-ready workflows.`,
    url: SITE_URL,
    siteName: "Sintra AI",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/tesseract-hero.webp`,
        width: 1200,
        height: 630,
        alt: "Sintra AI — daily intelligence, structured learning and practical use cases",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sintra AI — Daily AI Intelligence, Learning & Use Cases",
    description: `Track AI developments, build practical understanding, and use ${USE_CASES_COUNT} copy-ready workflows.`,
    images: [`${SITE_URL}/tesseract-hero.webp`],
  },
  alternates: {
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Sintra AI",
      url: SITE_URL,
      logo: `${SITE_URL}/tesseract-mark.svg`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Sintra AI",
      description: "Radar brasileiro de inteligência artificial, notícias globais com fontes e aprendizado prático.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: ["en", "pt-BR"],
    },
  ],
};

const themeBootScript = `
(function () {
  try {
    var allowed = ["dark", "light", "forest", "ocean"];
    var saved = localStorage.getItem("sintra-theme");
    var theme = allowed.indexOf(saved) >= 0
      ? saved
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.dataset.theme = theme;
  } catch (_) {}
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${editorial.variable} ${manrope.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <link rel="preconnect" href="https://plausible.io" />
        <script
          defer
          data-domain="joaoccaldas.github.io"
          src="https://plausible.io/js/script.js"
        />
        <link rel="icon" href={`${BASE_PATH}/favicon.ico`} sizes="any" />
        <link rel="icon" type="image/svg+xml" href={`${BASE_PATH}/tesseract-mark.svg`} />
        <link rel="apple-touch-icon" href={`${BASE_PATH}/apple-touch-icon.png`} />
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
                  <SidebarNav />
                  <div className="sidebar-content-shift">{children}</div>
                </MotionProvider>
              </SavedPromptsProvider>
            </LanguageProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
