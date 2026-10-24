"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, Check, ClipboardCopy, Globe2, Lightbulb, Link2, ShieldCheck, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { BASE_PATH } from "@/lib/constants";
import { fillPontePrompt, PONTE_CASES, type PonteCase } from "@/lib/ponteGlobalData";
import s from "./PonteGlobalClient.module.css";

/**
 * Three publisher-backed guided adaptations, not automatically verified
 * newsroom stories. Visitors personalize a prompt *locally* and choose
 * whether to copy/open it. No model call, storage, sending or telemetry.
 */
export default function PonteGlobalClient() {
  const { locale } = useLanguage();
  const pt = locale === "pt";
  const [activeId,setActiveId] = useState<PonteCase["id"]>("atendimento");
  const [scenario,setScenario] = useState("");
  const [copyStatus,setCopyStatus] = useState<"idle"|"ok"|"denied">("idle");
  const selected = PONTE_CASES.find(x=>x.id===activeId) ?? PONTE_CASES[0];
  const body = pt ? selected.pt : selected.en;
  const custom = scenario.trim() || body.starterScenario;
  const prompt = fillPontePrompt(body.prompt,custom);

  function selectCase(id:PonteCase["id"]) {
    setActiveId(id);
    setScenario("");
    setCopyStatus("idle");
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopyStatus("ok");
    } catch {
      setCopyStatus("denied");
    }
  }

  return (
    <section className={s.shell} aria-label={pt ? "Ponte Global, ideias para experimentar" : "World-to-Brazil practical bridge"}>
      <div className={s.sectionHead}>
        <div>
          <p className={s.eyebrow}><Globe2 size={15} aria-hidden="true"/> {pt ? "O MUNDO INSPIRA. O BRASIL APLICA." : "WORLD IDEAS, BRAZILIAN APPLICATIONS"}</p>
          <h2>{pt ? "Uma ideia global. Um uso possível aqui." : "A global idea. A practical step at home."}</h2>
          <p>{pt
            ? "Referências internacionais com fonte original, adaptação para o Brasil e um roteiro que você personaliza e leva para testar."
            : "International references, original sources, Brazilian context and a prompt you can adapt and try."}</p>
        </div>
        <span className={s.disclosure}><ShieldCheck size={15} aria-hidden="true"/>
          {pt ? "Aplicações propostas, não resultados comprovados" : "Proposed adaptations, not proven results"}
        </span>
      </div>

      <div className={s.tabs} role="group" aria-label={pt ? "Escolha seu caso de uso" : "Choose a practical case"}>
        {PONTE_CASES.map((item,index)=> (
          <button key={item.id} type="button" onClick={()=>selectCase(item.id)}
            aria-pressed={activeId===item.id}
            className={`${s.tab} ${activeId===item.id?s.selected:""}`}>
            <span className={s.tabNumber}>0{index+1}</span>
            <span>{(pt?item.pt:item.en).shortTitle}</span>
          </button>
        ))}
      </div>

      <div className={s.grid}>
        <div className={s.story}>
          <div className={s.sourceBlock}>
            <div className={s.stepTitle}><span>01</span><Globe2 size={17} aria-hidden="true"/> {pt?"A referência internacional":"The international reference"}</div>
            <h3>{body.shortTitle}</h3>
            <p>{body.globalContext}</p>
            <a href={selected.source.url} target="_blank" rel="noopener noreferrer" className={s.sourceLink}>
              <Link2 size={15} aria-hidden="true" />
              {selected.source.publisher} · {pt?"Fonte original":"Original source"}
              <ArrowUpRight size={15} aria-hidden="true"/>
            </a>
            <small>{pt?"Fonte consultada em":"Source checked on"} 24/10/2026. {pt
              ?"O resumo desta referência não certifica a aplicação proposta."
              :"The source does not verify the proposed local application."}</small>
          </div>
          <div className={s.brazilBlock}>
            <div className={s.stepTitle}><span>02</span><Lightbulb size={17} aria-hidden="true"/> {pt?"A ponte para o Brasil":"Brazilian adaptation"}</div>
            <p>{body.brazilApplication}</p>
            <div className={s.tip}>
              <strong>{pt?"DICA PRÁTICA":"PRACTICAL TIP"}</strong>
              <p>{body.tip}</p>
            </div>
          </div>
        </div>

        <div className={s.tryCard}>
          <div className={s.stepTitle}><span>03</span><Sparkles size={17} aria-hidden="true"/> {pt?"Agora é com você":"Now try it yourself"}</div>
          <label htmlFor="ponte-scenario" className={s.label}>{pt?"Personalize um cenário":"Customize your scenario"}</label>
          <textarea id="ponte-scenario" rows={3} maxLength={280} value={scenario}
            onChange={e=>{setScenario(e.target.value);setCopyStatus("idle");}}
            placeholder={body.starterScenario}
            aria-describedby="ponte-privacy"/>
          <div className={s.inputNote}>
            <span>{scenario.length}/280</span>
            <span>{pt?"Você pode usar o exemplo fictício sugerido.":"You can use the suggested fictional example."}</span>
          </div>
          <div className={s.promptHeader}><strong>{pt?"Roteiro para copiar":"Prompt to copy"}</strong>
            <span>{pt?"EXEMPLO · NÃO EXECUTADO":"EXAMPLE · NOT EXECUTED"}</span>
          </div>
          <div className={s.promptOutput} data-testid="ponte-prompt">{prompt}</div>
          <div className={s.actions}>
            <button type="button" onClick={copy} className={s.copy}>
              {copyStatus==="ok"?<Check size={17} aria-hidden="true"/>:<ClipboardCopy size={17} aria-hidden="true"/>}
              {copyStatus==="ok"?(pt?"Copiado":"Copied"):(pt?"Copiar roteiro":"Copy prompt")}
            </button>
            {selected.labPath && <a className={s.labLink} href={`${BASE_PATH}${selected.labPath}`}>
              <BookOpen size={16} aria-hidden="true" /> {pt?"Testar no laboratório":"Try Sintra's laboratory"} <ArrowRight size={15} aria-hidden="true"/>
            </a>}
          </div>
          <p role="status" className={s.status}>{copyStatus==="denied"
            ?(pt?"O navegador bloqueou a cópia. Selecione o texto acima para copiar.":"Clipboard unavailable. Select the text above to copy."):""}</p>
          <p id="ponte-privacy" className={s.privacy}><ShieldCheck size={16} aria-hidden="true" />
            {pt
              ?"Seu cenário fica nesta página. Copiar não envia dados a modelos nem a outras pessoas. Evite incluir dados sensíveis."
              :"Your scenario stays on this page. Copying does not send it to AI models or people. Avoid sensitive information."}
          </p>
          <p className={s.caveat}>{body.caveat}</p>
        </div>
      </div>
    </section>
  );
}
