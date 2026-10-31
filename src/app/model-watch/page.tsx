import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";
import ModelWatchClient from "./ModelWatchClient";

export const metadata: Metadata = {
  title: "Model Watch | Changes, Prices & Source Freshness | Sintra AI",
  description: "Explore a dated snapshot of AI models, indicative API pricing and primary-source release signals. Unknown and stale data is explicitly labeled.",
};

export default function ModelWatchPage() {
  return (
    <>
      <Header total={USE_CASES_COUNT} />
      <main id="main-content" className="pt-16 min-h-screen bg-void">
        <ModelWatchClient />
      </main>
      <Footer />
    </>
  );
}
