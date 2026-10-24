import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MeetingActionsLab from "@/components/MeetingActionsLab";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";
import { BASE_PATH } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Laboratório de IA na prática | Sintra Brasil by ond.ai",
  description: "Experimente transformar anotações fictícias em tarefas. Revise o resultado, veja cada linha de origem e aprenda os limites da extração local por regras.",
  openGraph: {
    title: "Laboratório Sintra Brasil | Primeiro exercício prático",
    description: "Um exercício real de identificação local de tarefas, com fonte visível e revisão humana. Sem cadastro.",
  },
};

export default function LaboratorioPage() {
  return (
    <div className="min-h-screen bg-[#F7F8F5] text-[#172238]">
      <Header total={USE_CASES_COUNT} />
      <main id="main-content" className="pt-[105px] md:pt-[125px]">
        <div className="max-w-[1230px] mx-auto px-6 md:px-8 pb-5">
          <Link href={`${BASE_PATH}/`} className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#586376] hover:text-[#5B48D9] focus-visible:underline">
            <ArrowLeft size={16} aria-hidden="true" /> Voltar ao início
          </Link>
          <div className="max-w-[850px] mt-9 mb-7">
            <p className="font-bold uppercase tracking-[0.13em] text-[11px] text-[#B65344] mb-5">
              SINTRA LAB · APRENDA FAZENDO
            </p>
            <h1 className="text-[clamp(39px,6vw,72px)] font-semibold leading-[1.06] tracking-[-0.055em]">
              Das anotações para <span className="font-serif font-normal italic text-[#B65344]">a ação.</span>
            </h1>
            <p className="max-w-[670px] mt-6 text-[16px] md:text-[18px] leading-[1.7] text-[#586376]">
              Um primeiro passo prático: identifique tarefas explícitas, corrija o resultado e confira a frase original antes de copiar.
            </p>
            <div className="inline-flex gap-2 items-center mt-5 py-2.5 px-3.5 rounded-xl bg-[#EDF0FD] text-[#475467] text-[12px] leading-relaxed">
              <ShieldCheck size={17} className="text-[#5B48D9] shrink-0" aria-hidden="true"/>
              Modo local por regras: funciona agora, sem envio a um modelo de IA.
            </div>
          </div>
        </div>
        <MeetingActionsLab />
      </main>
      <Footer />
    </div>
  );
}
