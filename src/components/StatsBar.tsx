import { USE_CASES, DISCIPLINES } from "@/lib/data";

export default function StatsBar() {
  const total = USE_CASES.length;
  const tags  = new Set(USE_CASES.flatMap(u => u.tags)).size;
  const cats  = DISCIPLINES.length;

  const items = [
    { n: String(total).padStart(2, "0"), em: true,  label: "Curated use cases", desc: "From a single prompt to a multi-agent pipeline." },
    { n: String(cats),                   em: false, label: "Disciplines",       desc: "Marketing, engineering, ops, research, design, leadership." },
    { n: String(tags),                   em: false, label: "Unique tags",       desc: "Spanning tools, techniques, and domains." },
  ];

  return (
    <section className="relative py-14 bg-abyss border-y border-violet/[0.12]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-violet/[0.12]">
          {items.map(({ n, em, label, desc }) => (
            <div key={label} className="bg-abyss px-6 md:px-8 py-4 flex flex-col gap-2">
              <span className="font-serif font-light text-5xl md:text-[64px] leading-none tracking-[-0.03em] text-fg-1">
                {em ? <em className="italic text-violet-bright">{n}</em> : n}
              </span>
              <span className="eyebrow">{label}</span>
              <span className="font-sans text-[13px] text-fg-2 leading-[1.5]">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
