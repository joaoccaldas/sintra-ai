import type { Metadata, Viewport } from "next";
import { BASE_PATH } from "@/lib/constants";
import "./font-fallback.css";
import "./globals.css";
import "./hardening.css";
import "./ond-brand.css";
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

// Beta: no network font requests during compilation. See font-fallback.css
// and docs/RELEASE_20261024_INTEGRATION_AND_FONT_ADR.md for exact asset plan.

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
  // Temporary preview paths must not be installable as the live PWA.
  manifest: process.env.SINTRA_PREVIEW_BASE_PATH ? undefined : `${BASE_PATH}/manifest.json`,
  title: "Sintra AI — Notícias, aprendizado e IA na prática para o Brasil",
  description: `IA no Brasil primeiro, notícias do mundo com fontes, trilhas de aprendizado e ${USE_CASES_COUNT} exemplos de aplicação no trabalho e no dia a dia.`,
  keywords: [
    "inteligência artificial no Brasil",
    "notícias de IA",
    "aprender inteligência artificial",
    "IA na prática",
    "casos de uso IA",
    "IA para trabalho",
    "comunidade de inteligência artificial",
    "prompts em português",
    "AI news Brazil",
  ],
  openGraph: {
    title: "Sintra Brasil, by ond.ai | Entenda a IA. Coloque em prática.",
    description: "Brasil primeiro, depois o mundo. Notícias com fontes e aplicações práticas de inteligência artificial para aprender fazendo.",
    url: SITE_URL,
    locale: "pt_BR",
    siteName: "Sintra Brasil",
    type: "website",
    images: [{
      url: `${SITE_URL}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: "Sintra Brasil, by ond.ai. Entenda a IA. Coloque em prática.",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sintra Brasil | Inteligência que vira ação",
    description: "Notícias de inteligência artificial e casos reais para aprender fazendo.",
    images: [`${SITE_URL}/opengraph-image`],
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
      logo: `${SITE_URL}/sintra-mark.svg`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Sintra AI",
      description: "Radar brasileiro de inteligência artificial, notícias globais com fontes e aprendizado prático.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: ["pt-BR"],
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
      : "light";
    document.documentElement.dataset.theme = theme;
  } catch (_) {}
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning

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
        <link rel="icon" type="image/svg+xml" href={`${BASE_PATH}/sintra-mark.svg`} />
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
