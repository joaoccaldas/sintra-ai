import Header from "@/components/Header";
import BrazilFirstHero from "@/components/BrazilFirstHero";
import BrazilRadar from "@/components/BrazilRadar";
import PonteGlobalTeaser from "@/components/PonteGlobalTeaser";
import HomeEditorialSections from "@/components/HomeEditorialSections";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

export default function Home() {
  return (
    <>
      <div className="bg-void min-h-screen">
        <Header total={USE_CASES_COUNT} />
        <main id="main-content">
          <BrazilFirstHero />
          <BrazilRadar />
          <PonteGlobalTeaser />
          <HomeEditorialSections />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
