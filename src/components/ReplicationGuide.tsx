import { BASE_PATH } from "@/lib/constants";
import type { KnowledgeRecord } from "@/lib/knowledgeData";

export default function ReplicationGuide({ record }: { record: KnowledgeRecord }) {
  const guide = record.replication;
  if (!guide) return null;
  return (
    <section id="replicate" className="scroll-mt-24 rounded-2xl border border-hairline bg-steel p-5 sm:p-7 mb-10">
      <p className="font-mono text-[10px] uppercase tracking-wider text-violet-bright mb-3">Replication skill · v{guide.version}</p>
      <h2 className="font-serif text-3xl text-fg-1 mb-3">Replicate this workflow</h2>
      <p className="text-sm leading-relaxed text-fg-2 mb-4">{guide.useWhen}</p>
      <dl className="grid sm:grid-cols-2 gap-4 text-sm mb-6">
        <div><dt className="text-xs text-fg-4 mb-1">Where you work</dt><dd className="text-fg-2">{guide.environment}</dd></div>
        <div><dt className="text-xs text-fg-4 mb-1">Allow for your first pilot</dt><dd className="text-fg-2">{guide.timeEstimate}</dd></div>
      </dl>
      <h3 className="font-serif text-xl text-fg-1 mb-3">Bring these inputs</h3>
      <dl className="space-y-3 mb-6">{guide.inputs.map(input => <div key={input.name}><dt className="text-sm font-medium text-fg-1">{input.name}</dt><dd className="text-sm leading-relaxed text-fg-3">{input.detail}</dd></div>)}</dl>
      <h3 className="font-serif text-xl text-fg-1 mb-3">Start here</h3>
      <ol className="list-decimal pl-5 text-sm leading-relaxed text-fg-2 space-y-3 mb-6">{guide.launch.map(step => <li key={step}>{step}</li>)}</ol>
      <div className="rounded-xl border border-hairline bg-void p-4 sm:p-5 mb-6">
        <h3 className="font-serif text-xl text-fg-1 mb-3">Try a small practice case</h3>
        <p className="text-sm leading-relaxed text-fg-2 mb-3">{guide.practice.task}</p>
        {guide.practice.resourceUrl && <a href={`${BASE_PATH}${guide.practice.resourceUrl}`} download className="inline-block text-sm text-violet-bright underline underline-offset-4 mb-3">Download the existing sample data ↓</a>}
        <p className="text-sm leading-relaxed text-fg-3"><span className="font-medium text-fg-1">Expected result: </span>{guide.practice.expected}</p>
        <p className="text-xs leading-relaxed text-fg-4 mt-3">This is a suggested acceptance case. It has not been run in {guide.environment} by Sintra.</p>
      </div>
      <details className="border-y border-hairline py-4 mb-5">
        <summary className="cursor-pointer text-sm text-fg-1">Test the difficult cases</summary>
        <dl className="space-y-4 mt-4">{guide.acceptanceTests.map(test => <div key={test.scenario}><dt className="text-sm font-medium text-fg-1">{test.scenario}</dt><dd className="text-sm leading-relaxed text-fg-3">{test.expected}</dd></div>)}</dl>
      </details>
      <details className="border-b border-hairline pb-4 mb-6">
        <summary className="cursor-pointer text-sm text-fg-1">If it does not work</summary>
        <dl className="space-y-4 mt-4">{guide.troubleshooting.map(issue => <div key={issue.symptom}><dt className="text-sm font-medium text-fg-1">{issue.symptom}</dt><dd className="text-sm leading-relaxed text-fg-3">{issue.action}</dd></div>)}</dl>
      </details>
      <div className="flex flex-wrap gap-5 text-sm">
        <a href={`${BASE_PATH}/skills/${record.id}/SKILL.md`} download className="text-violet-bright underline underline-offset-4">Download skill instructions (.md) ↓</a>
        <a href="#procedure" className="text-fg-3 underline underline-offset-4">Follow the full procedure →</a>
      </div>
      <p className="text-xs leading-relaxed text-fg-4 mt-4">Use the steps and prompt in the named app. The download is a portable instruction file; it does not install a Copilot feature or grant access. Review the host-specific installation guidance on the LLM access page. ChatGPT, Codex and Claude support different skill locations and distribution paths.</p>
    </section>
  );
}
