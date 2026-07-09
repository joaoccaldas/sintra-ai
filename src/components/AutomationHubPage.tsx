"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ExternalLink,
  Gauge,
  Layers3,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { BASE_PATH } from "@/lib/constants";
import {
  AUTOMATION_GUARDRAILS,
  AUTOMATION_PILLARS,
  AUTOMATION_STACK,
  AUTOMATION_WORKFLOWS,
} from "@/lib/automationData";

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, delay: i * 0.045, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function hrefFor(path: string): string {
  if (path.startsWith("http") || path.startsWith("#")) return path;
  return `${BASE_PATH}${path}`;
}

function SectionHead({ label, title, copy }: { label: string; title: string; copy: string }) {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-8 h-px bg-gradient-to-r from-transparent to-violet/70" />
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-violet-bright">{label}</span>
      </div>
      <h2 className="font-serif font-light text-[clamp(30px,5vw,48px)] leading-[1.05] tracking-[-0.03em] text-fg-1 mb-3">
        {title}
      </h2>
      <p className="max-w-2xl text-[14px] md:text-[15px] leading-relaxed text-fg-3">{copy}</p>
    </div>
  );
}

function PillarGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-20">
      {AUTOMATION_PILLARS.map((pillar, i) => (
        <motion.article
          key={pillar.id}
          custom={i}
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative rounded-2xl border border-white/[0.07] bg-white/[0.018] p-5 overflow-hidden"
        >
          <div className="absolute top-0 left-5 right-5 h-px" style={{ background: `linear-gradient(90deg, transparent, ${pillar.color}66, transparent)` }} />
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase mb-4" style={{ color: pillar.color }}>{pillar.label}</p>
          <h3 className="font-serif text-[19px] leading-tight text-fg-1 mb-3">{pillar.title}</h3>
          <p className="text-[13px] leading-relaxed text-fg-3 mb-4">{pillar.description}</p>
          <p className="font-mono text-[10px] leading-relaxed text-fg-4">{pillar.signal}</p>
        </motion.article>
      ))}
    </div>
  );
}

function WorkflowCard({ workflow, index }: { workflow: (typeof AUTOMATION_WORKFLOWS)[number]; index: number }) {
  return (
    <motion.a
      href={hrefFor(workflow.href)}
      custom={index}
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -2 }}
      className="group rounded-2xl border border-white/[0.07] bg-white/[0.018] hover:bg-white/[0.04] hover:border-white/[0.14] transition-all duration-200 p-5 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: workflow.color }}>{workflow.domain}</span>
        <span className="font-mono text-[9px] tracking-[0.10em] uppercase rounded-full border px-2 py-0.5 text-fg-4 border-white/[0.10] bg-white/[0.03]">
          {workflow.maturity}
        </span>
      </div>
      <div>
        <h3 className="font-serif text-[21px] leading-tight text-fg-1 group-hover:text-white transition-colors mb-3">{workflow.title}</h3>
        <p className="text-[13px] leading-relaxed text-fg-3">{workflow.summary}</p>
      </div>
      <div className="rounded-xl border border-violet/[0.12] bg-violet/[0.035] px-4 py-3">
        <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-violet-bright mb-1">Outcome</p>
        <p className="text-[13px] leading-relaxed text-fg-2">{workflow.outcome}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-fg-4 mb-2">Loop</p>
          <ol className="space-y-1.5">
            {workflow.steps.map((step) => (
              <li key={step} className="flex items-start gap-2 text-[12px] leading-snug text-fg-3">
                <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-violet-bright" />
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-fg-4 mb-2">Tools</p>
          <div className="flex flex-wrap gap-1.5">
            {workflow.tools.map((tool) => (
              <span key={tool} className="font-mono text-[10px] rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-fg-3">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
      <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.10em] uppercase text-fg-4 group-hover:text-violet-bright transition-colors">
        Open related resources <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
      </span>
    </motion.a>
  );
}

function StackMap() {
  return (
    <div className="relative mb-20">
      <div className="absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-violet/60 via-cyan-ice/30 to-transparent hidden md:block" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {AUTOMATION_STACK.map((layer, i) => (
          <motion.article
            key={layer.id}
            custom={i}
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.018] p-5 md:ml-10"
          >
            <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 mb-2">Layer {String(i + 1).padStart(2, "0")}</p>
            <h3 className="font-serif text-[20px] leading-tight text-fg-1 mb-2">{layer.label}</h3>
            <p className="text-[13px] leading-relaxed text-fg-3 mb-4">{layer.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {layer.examples.map((example) => (
                <span key={example} className="font-mono text-[10px] rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-fg-3">
                  {example}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export default function AutomationHubPage() {
  const reduced = useReducedMotion() ?? false;

  return (
    <div className="bg-void min-h-screen overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 md:px-8 pt-28 pb-24">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_50%_0%,rgba(159,140,255,0.16),transparent_60%)] pointer-events-none" />
        <motion.header
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-violet/[0.24] bg-violet/[0.08] px-3 py-1.5 mb-6">
            <Workflow size={13} className="text-violet-bright" />
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-violet-bright">Automation Hub</span>
          </div>
          <h1 className="font-serif font-light text-[clamp(44px,8vw,86px)] leading-[0.96] tracking-[-0.045em] text-fg-1 max-w-4xl mb-6">
            Turn AI signal into <em className="italic text-violet-bright">systems that work</em>.
          </h1>
          <p className="max-w-2xl text-[16px] md:text-[18px] leading-relaxed text-fg-3 mb-8">
            Sintra&apos;s automation layer connects live intelligence, prompts, models, tools, memory and approval gates into practical workflows for work, learning and building.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#workflows" className="inline-flex items-center gap-2 rounded-xl border border-violet/40 bg-violet/[0.12] px-4 py-2.5 font-mono text-[11px] tracking-[0.10em] uppercase text-violet-bright hover:bg-violet/[0.18] transition-colors">
              Explore workflows <ArrowRight size={13} />
            </a>
            <a href={`${BASE_PATH}/live/`} className="inline-flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.03] px-4 py-2.5 font-mono text-[11px] tracking-[0.10em] uppercase text-fg-3 hover:text-fg-1 hover:border-white/[0.20] transition-colors">
              Start from live signal <ExternalLink size={13} />
            </a>
          </div>
        </motion.header>

        <section aria-labelledby="automation-loop" className="relative">
          <SectionHead
            label="Operating loop"
            title="A simple system: sense, reason, act, learn."
            copy="Professional AI automation is not random agents clicking buttons. It is a controlled loop with sources, judgment, actions and memory."
          />
          <PillarGrid />
        </section>

        <section id="workflows" aria-labelledby="workflow-library" className="relative mb-20">
          <SectionHead
            label="Workflow library"
            title="Reusable automation patterns for real work."
            copy="Each workflow is framed as an operating pattern, not a toy demo: what it reads, how it reasons, what it produces and where humans stay in control."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {AUTOMATION_WORKFLOWS.map((workflow, i) => (
              <WorkflowCard key={workflow.id} workflow={workflow} index={i} />
            ))}
          </div>
        </section>

        <section aria-labelledby="automation-stack" className="relative">
          <SectionHead
            label="Architecture"
            title="The stack behind useful AI automation."
            copy="Sintra organizes automation from the human interface down to models, tools, memory and governance so builders can see where every piece belongs."
          />
          <StackMap />
        </section>

        <section aria-labelledby="guardrails" className="relative rounded-3xl border border-violet/[0.16] bg-gradient-to-br from-violet/[0.08] to-transparent p-6 md:p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet/[0.26] bg-violet/[0.10] text-violet-bright shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-violet-bright mb-2">Trust layer</p>
              <h2 className="font-serif text-[28px] leading-tight text-fg-1 mb-2">Automation needs brakes, not just engines.</h2>
              <p className="text-[14px] leading-relaxed text-fg-3 max-w-2xl">
                The professional version of AI automation is visible, reversible and auditable. These guardrails should exist before workflows touch customers, money, files or production systems.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {AUTOMATION_GUARDRAILS.map((guardrail, i) => (
              <motion.div
                key={guardrail}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
              >
                <CheckCircle2 size={15} className="text-violet-bright mb-3" />
                <p className="text-[12px] leading-relaxed text-fg-3">{guardrail}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-3">
          <a href={`${BASE_PATH}/models/`} className="group rounded-2xl border border-white/[0.07] bg-white/[0.018] p-5 hover:bg-white/[0.04] transition-colors">
            <Gauge size={18} className="text-violet-bright mb-4" />
            <h3 className="font-serif text-[20px] text-fg-1 mb-2">Choose the model</h3>
            <p className="text-[13px] leading-relaxed text-fg-3 mb-4">Compare model cost, capability and fit before wiring a workflow.</p>
            <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.10em] uppercase text-fg-4 group-hover:text-violet-bright">Open models <ArrowRight size={10} /></span>
          </a>
          <a href={`${BASE_PATH}/tools/`} className="group rounded-2xl border border-white/[0.07] bg-white/[0.018] p-5 hover:bg-white/[0.04] transition-colors">
            <Bot size={18} className="text-violet-bright mb-4" />
            <h3 className="font-serif text-[20px] text-fg-1 mb-2">Choose the tools</h3>
            <p className="text-[13px] leading-relaxed text-fg-3 mb-4">Find the execution surfaces: email, code, research, media, data and agents.</p>
            <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.10em] uppercase text-fg-4 group-hover:text-violet-bright">Open tools <ArrowRight size={10} /></span>
          </a>
          <a href={`${BASE_PATH}/learn/`} className="group rounded-2xl border border-white/[0.07] bg-white/[0.018] p-5 hover:bg-white/[0.04] transition-colors">
            <Layers3 size={18} className="text-violet-bright mb-4" />
            <h3 className="font-serif text-[20px] text-fg-1 mb-2">Learn the system</h3>
            <p className="text-[13px] leading-relaxed text-fg-3 mb-4">Move from AI user to automation operator through structured paths.</p>
            <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.10em] uppercase text-fg-4 group-hover:text-violet-bright">Open learning <ArrowRight size={10} /></span>
          </a>
        </section>
      </div>
    </div>
  );
}
