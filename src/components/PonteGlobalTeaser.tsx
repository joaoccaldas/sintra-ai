import { ArrowUpRight, Globe2, Lightbulb, Sparkles } from "lucide-react";
import { BASE_PATH } from "@/lib/constants";

/**
 * Slim editorial bridge on the homepage, no duplicated global news feed,
 * no heavy client registry or fake social proof.
 */
export default function PonteGlobalTeaser() {
  return (
    <section aria-labelledby="ponte-home-title" className="bg-[#F7F8F5] border-b border-[#DDE5EE]">
      <div className="max-w-[1230px] mx-auto px-6 md:px-12 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-10">
        <div className="flex-1 min-w-0">
          <p className="flex items-center gap-2 text-[#B65344] text-[10px] font-bold tracking-[.13em] mb-3">
            <Globe2 size={16} aria-hidden="true" /> PONTE GLOBAL · DICAS E CASOS REAIS DE REFERÊNCIA
          </p>
          <h2 id="ponte-home-title" className="text-[#172238] text-[clamp(23px,3vw,32px)] font-semibold tracking-[-.045em] leading-[1.18]">
            O mundo inspira. <span className="font-serif font-normal italic text-[#B65344]">O Brasil aplica.</span>
          </h2>
          <p className="text-[#586376] text-[13px] md:text-[14px] leading-[1.65] mt-2 max-w-[640px]">
            Três referências internacionais, ideias adaptadas ao Brasil e roteiros para você personalizar. Fonte global e aplicação proposta claramente separadas.
          </p>
        </div>
        <a href={`${BASE_PATH}/ponte/`} className="min-h-[46px] inline-flex items-center justify-center gap-3 shrink-0 rounded-xl bg-[#172238] text-white px-5 py-3 text-[13px] font-semibold hover:bg-[#304059] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5B48D9]">
          <Lightbulb size={17} aria-hidden="true"/> Explorar ideias globais <ArrowUpRight size={17} aria-hidden="true"/>
        </a>
        <Sparkles size={19} aria-hidden="true" className="hidden xl:block text-[#5B48D9]"/>
      </div>
    </section>
  );
}
