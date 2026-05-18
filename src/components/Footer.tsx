import TesseractMark from "./TesseractMark";
import { BASE_PATH } from "@/lib/data";

const NAV_COLS = [
  {
    head: "Explore",
    links: [
      ["Use Cases",            "#explore"],
      ["AI Tools Directory",   `${BASE_PATH}/tools/`],
      ["AI News",              `${BASE_PATH}/news/`],
      ["Learning Paths",       `${BASE_PATH}/learn/`],
    ],
  },
  {
    head: "Reference",
    links: [
      ["AI Concepts",          `${BASE_PATH}/concepts/`],
      ["AI History",           `${BASE_PATH}/ai-history/`],
      ["AI Labs",              `${BASE_PATH}/ai-labs/`],
      ["Google AI Tools",      `${BASE_PATH}/google-ai-tools/`],
    ],
  },
  {
    head: "Elsewhere",
    links: [
      ["GitHub ↗",             "https://github.com/joaoccaldas/sintra-ai"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-violet/[0.12] pt-14 pb-8 bg-abyss">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}>
          {/* Branding */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-2.5">
            <a href={`${BASE_PATH}/`} className="flex items-center gap-2.5 text-violet-bright">
              <TesseractMark size={18} />
              <span className="font-serif font-normal text-base text-fg-1">
                Sintra <em className="italic text-violet-bright">Tesseract</em>
              </span>
            </a>
            <p className="font-sans text-[13px] leading-[1.55] text-fg-3 max-w-[280px] mt-1">
              A curated library of AI use cases, mapped across every way to think with a machine.
            </p>
            <p className="font-mono text-[11px] text-fg-4 mt-1">Open source · Free forever</p>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map(col => (
            <div key={col.head} className="flex flex-col gap-2.5">
              <h4 className="font-mono text-[10px] tracking-[0.18em] uppercase text-fg-3 m-0 mb-2">
                {col.head}
              </h4>
              {col.links.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="font-sans text-[13px] text-fg-2 hover:text-fg-1 transition-colors duration-140"
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-5 pt-6 border-t border-violet/[0.12] font-mono text-[11px] text-fg-4 tracking-[0.04em] flex-wrap">
          <span>© 2026 Sintra · Curated in the open.</span>
          <span>Built on the void.</span>
        </div>
      </div>
    </footer>
  );
}
