import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Globe2, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PonteGlobalClient from "@/components/PonteGlobalClient";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

export const metadata: Metadata = {
  title: "Ponte Global | IA internacional aplicada no Brasil | Sintra",
  description: "Da referência internacional à aplicação brasileira. Fontes originais, dicas práticas e roteiros personalizados para atendimento, estudos e trabalho.",
  robots: { index:false, follow:false }, // Curated experiment, not an approved indexed editorial collection.
};

export default function PonteGlobalPage() {
  return (
    <div className="min-h-screen bg-[#F7F8F5] text-[#172238]">
      <Header total={USE_CASES_COUNT}/>
      <main id="main-content" className="pt-[105px] md:pt-[126px]">
        <header className="max-w-[1230px] mx-auto px-6 pb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-[13px] text-[#586376] font-semibold hover:text-[#5B48D9] focus-visible:underline">
            <ArrowLeft size={16} aria-hidden="true"/> Voltar ao início
          </Link>
          <div className="max-w-[910px] mt-10">
            <p className="inline-flex gap-2 items-center text-[11px] font-bold tracking-[.13em] text-[#B65344]">
              <Globe2 size={16} aria-hidden="true"/> SINTRA PONTE GLOBAL
            </p>
            <h1 className="text-[clamp(39px,6vw,72px)] leading-[1.07] font-semibold tracking-[-.055em] mt-5">
              O que aprendemos lá fora.<br/>
              <span className="font-serif italic font-normal text-[#B65344]">O que podemos fazer aqui.</span>
            </h1>
            <p className="max-w-[730px] text-[#586376] text-[16px] md:text-[18px] leading-[1.7] mt-6">
              Conectamos referências globais a necessidades brasileiras. Cada exemplo mostra o que vem da fonte, o que é adaptação Sintra e como você pode experimentar sem promessas inventadas.
            </p>
            <p className="inline-flex gap-2 items-start text-[12px] text-[#475569] bg-[#EDF0FD] rounded-xl p-3 mt-5">
              <ShieldCheck size={17} className="shrink-0 mt-[2px] text-[#5B48D9]" aria-hidden="true"/>
              Piloto editorial: roteiros não executados, aplicações não verificadas e nenhuma análise automática de seus dados.
            </p>
          </div>
        </header>
        <PonteGlobalClient/>
      </main>
      <Footer/>
    </div>
  );
}
