"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Search, X, Shuffle } from "lucide-react";
import { CATEGORIES, DIFFICULTIES, USE_CASES, UseCase, Category, Difficulty } from "@/lib/data";
import { useUrlFilters, useKeyShortcut } from "@/lib/hooks";
import UseCaseCard from "./UseCaseCard";
import UseCaseModal from "./UseCaseModal";

interface Props {
  initialCategory: string;
  initialCategoryNonce: number;
}

export default function LibraryBrowser({ initialCategory, initialCategoryNonce }: Props) {
  const [filters, setFilters] = useUrlFilters({
    category: initialCategory,
    difficulty: "all",
    q: "",
  });
  const [activeItem, setActiveItem] = useState<UseCase | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/.test(navigator.platform);

  // External category trigger (from Disciplines)
  useEffect(() => {
    if (initialCategory && initialCategory !== "all") {
      setFilters({ category: initialCategory });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategoryNonce]);

  // ⌘K + "/" focus search
  useKeyShortcut(["k", "K"], () => inputRef.current?.focus(), { meta: true });
  useKeyShortcut(["/"], () => inputRef.current?.focus(), { preventInInput: true });

  const filtered = useMemo(() => {
    return USE_CASES.filter(u => {
      if (filters.category !== "all" && u.category !== filters.category) return false;
      if (filters.difficulty !== "all" && u.difficulty !== filters.difficulty) return false;
      if (filters.q.trim()) {
        const hay = `${u.title} ${u.desc} ${u.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(filters.q.toLowerCase())) return false;
      }
      return true;
    });
  }, [filters]);

  const reset = () => setFilters({ category: "all", difficulty: "all", q: "" });
  const random = () => {
    if (!filtered.length) return;
    setActiveItem(filtered[Math.floor(Math.random() * filtered.length)]);
  };

  const hasActiveFilters = filters.category !== "all" || filters.difficulty !== "all" || filters.q;

  return (
    <section id="library" className="pt-20 md:pt-24 pb-24 md:pb-32 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Heading */}
        <div className="grid md:grid-cols-[1fr_auto] items-end gap-6 md:gap-8 mb-10 md:mb-12">
          <div>
            <span className="eyebrow block mb-3.5">The library · 01</span>
            <h2 className="font-serif font-light text-[clamp(34px,5vw,64px)] leading-[1.02] tracking-[-0.02em] text-fg-1">
              Every way to think{" "}
              <em className="italic text-violet-bright">with a machine.</em>
            </h2>
            <p className="font-sans text-base text-fg-2 max-w-md mt-3 leading-[1.55]">
              Filter by what you do, by domain, or by how far you want to go.
            </p>
          </div>
          <span className="eyebrow self-end whitespace-nowrap">
            {filtered.length} / {USE_CASES.length} shown
          </span>
        </div>

        {/* Search */}
        <div className="flex gap-3 mb-7">
          <label
            className={[
              "flex-1 flex items-center gap-3 px-4 md:px-5 py-3 rounded-[4px] transition-all duration-140 ease-out-custom",
              "border bg-white/[0.02]",
              filters.q
                ? "border-violet shadow-[0_0_0_1px_var(--violet),_0_0_32px_rgba(159,140,255,0.25)]"
                : "border-hairline focus-within:border-violet focus-within:shadow-[0_0_0_1px_var(--violet),_0_0_32px_rgba(159,140,255,0.25)]",
            ].join(" ")}
          >
            <Search size={16} className={filters.q ? "text-violet-bright" : "text-fg-3"} />
            <input
              ref={inputRef}
              type="text"
              placeholder={`Search ${USE_CASES.length} use cases…`}
              value={filters.q}
              onChange={e => setFilters({ q: e.target.value })}
              className="flex-1 bg-transparent border-0 outline-none font-sans text-[15px] text-fg-1 placeholder:text-fg-3"
              aria-label="Search use cases"
            />
            {filters.q && (
              <button
                onClick={() => setFilters({ q: "" })}
                className="text-fg-3 hover:text-fg-1 transition-colors"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
            <span
              className="hidden sm:inline font-mono text-[11px] px-2 py-0.5 rounded-[3px] bg-steel border border-hairline text-fg-3"
              aria-hidden="true"
            >
              {isMac ? "⌘" : "Ctrl"} K
            </span>
          </label>
          <button
            onClick={random}
            disabled={!filtered.length}
            className="btn btn-ghost hidden sm:inline-flex disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Pick a random use case"
          >
            <Shuffle size={14} /> Random
          </button>
        </div>

        {/* Filters */}
        <div id="by-difficulty" className="flex flex-col gap-3.5 mb-9">
          <div className="flex gap-2 flex-wrap items-center">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-fg-4 w-full md:w-[88px] shrink-0">
              Category
            </span>
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                className={`chip${filters.category === c.id ? " active" : ""}`}
                onClick={() => setFilters({ category: c.id })}
                aria-pressed={filters.category === c.id}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-fg-4 w-full md:w-[88px] shrink-0">
              Difficulty
            </span>
            {DIFFICULTIES.map(d => (
              <button
                key={d.id}
                className={`chip${filters.difficulty === d.id ? " active" : ""}`}
                onClick={() => setFilters({ difficulty: d.id })}
                aria-pressed={filters.difficulty === d.id}
              >
                {d.color && (
                  <span
                    className="w-[7px] h-[7px] rounded-full"
                    style={{ background: d.color, boxShadow: `0 0 8px ${d.color}` }}
                  />
                )}
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Count + reset */}
        <div className="font-mono text-[11px] text-fg-3 tracking-[0.04em] mb-5 flex items-center gap-3">
          Showing <b className="text-fg-1 font-medium">{filtered.length}</b> use case{filtered.length !== 1 ? "s" : ""}
          {hasActiveFilters && (
            <button
              className="chip"
              onClick={reset}
              style={{ padding: "3px 10px" }}
            >
              Reset
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.length === 0 ? (
            <div className="col-span-full p-20 px-5 text-center border border-dashed border-hairline rounded-lg">
              <p className="font-serif italic font-light text-2xl text-fg-2 m-0">
                &ldquo;Nothing here yet. The shelf is being assembled.&rdquo;
              </p>
              <button onClick={reset} className="btn btn-ghost mt-6">
                Reset filters
              </button>
            </div>
          ) : (
            filtered.map(item => (
              <UseCaseCard key={item.id} item={item} onOpen={setActiveItem} />
            ))
          )}
        </div>
      </div>

      {activeItem && (
        <UseCaseModal item={activeItem} onClose={() => setActiveItem(null)} />
      )}
    </section>
  );
}
