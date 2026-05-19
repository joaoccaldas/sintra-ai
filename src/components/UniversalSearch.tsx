"use client";

import { useMemo, useState } from "react";
import { Copy, Check, ArrowRight, X } from "lucide-react";
import { searchAll, KIND_META, SearchDocument, EntityKind } from "@/lib/searchIndex";
import { USE_CASES } from "@/lib/data";
import ExpandedCard from "./ExpandedCard";

const MAX_PER_KIND = 4;

interface Props {
  query: string;
  onClose: () => void;
}

export default function UniversalSearch({ query, onClose }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedUseCaseId, setExpandedUseCaseId] = useState<number | null>(null);

  const groups = useMemo(() => searchAll(query), [query]);
  const totalResults = groups.reduce((sum, g) => sum + g.docs.length, 0);

  const expandedUseCase =
    expandedUseCaseId != null
      ? (USE_CASES.find(u => u.id === expandedUseCaseId) ?? null)
      : null;

  const copyPrompt = (doc: SearchDocument) => {
    const uc = USE_CASES.find(u => u.id === doc.useCaseId);
    if (!uc) return;
    navigator.clipboard?.writeText(uc.prompt);
    setCopiedId(doc.id);
    setTimeout(() => setCopiedId(null), 1600);
  };

  if (totalResults === 0) {
    return (
      <section className="px-4 md:px-8 max-w-6xl mx-auto pb-8 pt-2">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[12px] text-fg-4">
            No results for <span className="text-fg-2">"{query}"</span>
          </p>
          <button
            onClick={onClose}
            className="font-mono text-[11px] text-fg-4 hover:text-fg-1 flex items-center gap-1.5 transition-colors"
          >
            <X size={12} /> Clear
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 md:px-8 max-w-6xl mx-auto pb-12 pt-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <p className="font-mono text-[12px] text-fg-4 tracking-[0.06em]">
          <span className="text-fg-1 font-semibold">{totalResults}</span> results for{" "}
          <span className="text-violet-bright">"{query}"</span>{" "}
          <span className="text-fg-4">across {groups.length} {groups.length === 1 ? "category" : "categories"}</span>
        </p>
        <button
          onClick={onClose}
          className="font-mono text-[11px] text-fg-4 hover:text-fg-1 flex items-center gap-1.5 transition-colors"
        >
          <X size={12} /> Clear search
        </button>
      </div>

      {/* Result groups */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {groups.map(({ kind, docs }) => (
          <ResultGroup
            key={kind}
            kind={kind}
            docs={docs}
            copiedId={copiedId}
            onCopy={copyPrompt}
            onOpenUseCase={setExpandedUseCaseId}
          />
        ))}
      </div>

      {/* Expanded use-case modal */}
      <ExpandedCard
        item={expandedUseCase}
        onClose={() => setExpandedUseCaseId(null)}
        items={USE_CASES}
      />
    </section>
  );
}

function ResultGroup({
  kind,
  docs,
  copiedId,
  onCopy,
  onOpenUseCase,
}: {
  kind: EntityKind;
  docs: SearchDocument[];
  copiedId: string | null;
  onCopy: (doc: SearchDocument) => void;
  onOpenUseCase: (id: number) => void;
}) {
  const meta = KIND_META[kind];
  const shown = docs.slice(0, MAX_PER_KIND);
  const overflow = docs.length - MAX_PER_KIND;

  return (
    <div>
      {/* Kind header */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="font-mono text-[10px] tracking-[0.14em] uppercase px-2 py-0.5 rounded-full border"
          style={{
            color: meta.color,
            borderColor: `${meta.color}40`,
            background: `${meta.color}10`,
          }}
        >
          {meta.pluralLabel}
        </span>
        <span className="font-mono text-[10px] text-fg-4">{docs.length}</span>
      </div>

      {/* Result rows */}
      <div className="space-y-1.5">
        {shown.map(doc => (
          <ResultRow
            key={doc.id}
            doc={doc}
            kind={kind}
            isCopied={copiedId === doc.id}
            onCopy={onCopy}
            onOpenUseCase={onOpenUseCase}
          />
        ))}
      </div>

      {/* Overflow link */}
      {overflow > 0 && (
        <a
          href={docs[0].href}
          className="inline-flex items-center gap-1 mt-2 ml-1 font-mono text-[10px] text-violet-bright hover:text-violet transition-colors"
        >
          +{overflow} more in {meta.pluralLabel} <ArrowRight size={10} />
        </a>
      )}
    </div>
  );
}

function ResultRow({
  doc,
  kind,
  isCopied,
  onCopy,
  onOpenUseCase,
}: {
  doc: SearchDocument;
  kind: EntityKind;
  isCopied: boolean;
  onCopy: (doc: SearchDocument) => void;
  onOpenUseCase: (id: number) => void;
}) {
  const isUseCase = kind === "use_case";

  const handleClick = () => {
    if (isUseCase && doc.useCaseId != null) {
      onOpenUseCase(doc.useCaseId);
    } else {
      window.location.href = doc.href;
    }
  };

  return (
    <div className="group flex items-start gap-2 rounded-lg border border-hairline bg-white/[0.025] hover:bg-white/[0.05] hover:border-violet/25 transition-all p-3">
      <button className="flex-1 text-left min-w-0" onClick={handleClick}>
        <p className="font-sans text-[13px] text-fg-1 leading-snug group-hover:text-white transition-colors truncate">
          {doc.title}
        </p>
        <p className="font-sans text-[11px] text-fg-4 mt-0.5 leading-snug line-clamp-2">
          {doc.summary}
        </p>
        {doc.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {doc.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-fg-4 border border-white/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </button>

      {isUseCase ? (
        <button
          onClick={() => onCopy(doc)}
          title="Copy prompt"
          className="shrink-0 flex items-center justify-center w-7 h-7 rounded border border-violet/20 text-violet-bright hover:bg-violet/10 hover:border-violet/50 transition-all mt-0.5"
        >
          {isCopied ? <Check size={11} /> : <Copy size={11} />}
        </button>
      ) : (
        <a
          href={doc.href}
          title={`Go to ${KIND_META[kind].label}`}
          className="shrink-0 flex items-center justify-center w-7 h-7 rounded border border-white/[0.08] text-fg-4 hover:text-fg-1 hover:border-white/25 transition-all mt-0.5"
        >
          <ArrowRight size={11} />
        </a>
      )}
    </div>
  );
}
