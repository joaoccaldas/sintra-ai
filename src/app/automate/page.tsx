import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import AutomationHubPage from "@/components/AutomationHubPage";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";
import { AUTOMATION_WORKFLOWS } from "@/lib/automationData";

const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";

export const metadata: Metadata = {
  title: "Automation Hub — AI Workflows, Agents & Operating Systems — Sintra AI",
  description: `Practical AI automation patterns for research, finance, meetings, GitHub, agents and personal AI operating systems. ${AUTOMATION_WORKFLOWS.length} reusable workflow blueprints.`,
  openGraph: {
    title: "Automation Hub — Sintra AI",
    description: "Turn AI signal into controlled workflows with tools, models, memory and approval gates.",
    url: `${SITE_URL}/automate/`,
  },
  alternates: {
    canonical: `${SITE_URL}/automate/`,
    types: { "application/rss+xml": `${SITE_URL}/feed.xml` },
  },
};

function automationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Sintra AI Automation Hub",
    url: `${SITE_URL}/automate/`,
    description: "Reusable AI automation patterns for practical work.",
    hasPart: AUTOMATION_WORKFLOWS.map((workflow) => ({
      "@type": "CreativeWork",
      name: workflow.title,
      description: workflow.summary,
      about: workflow.domain,
    })),
  };
}

export default function AutomatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(automationJsonLd()) }}
      />
      <Header total={USE_CASES_COUNT} />
      <main id="main-content">
        <AutomationHubPage />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
