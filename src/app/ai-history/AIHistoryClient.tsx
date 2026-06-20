"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import Header from "@/components/Header";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";
import { ERAS, MILESTONES } from "@/lib/timelineData";

// The interactive timeline is a ~127kB Three.js scene built for desktop
// pointer/scroll interaction. Loading it for every mobile visitor wastes
// bandwidth and parse time on a feature they can't meaningfully use, so it's
// code-split and gated behind a viewport check; mobile gets a static list.
const AIHistoryTimeline = dynamic(() => import("@/components/AIHistoryTimeline"), {
  ssr: false,
});

function useIsMobile() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(max-width: 767px)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,
  );
}

function MobileHistoryList() {
  return (
    <div className="px-6 py-8 max-w-2xl mx-auto">
      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-4 mb-6">
        The full interactive 3D timeline is available on desktop — here's the list view
      </p>
      {ERAS.map((era) => (
        <section key={era.id} className="mb-10">
          <h2 className="text-fg-1 font-semibold text-lg mb-1 flex items-center gap-2">
            <span>{era.icon}</span> {era.label}
          </h2>
          <p className="text-fg-4 text-sm mb-4">{era.years}</p>
          <ul className="space-y-4">
            {MILESTONES.filter((m) => m.era === era.id).map((m) => (
              <li key={m.id} className="border-l-2 border-white/10 pl-4">
                <p className="text-fg-1 font-medium">
                  <span className="mr-1">{m.emoji}</span>
                  {m.title} <span className="text-fg-4 font-normal">— {m.year}</span>
                </p>
                <p className="text-fg-3 text-sm mt-1">{m.desc}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default function AIHistoryPage() {
  const isMobile = useIsMobile();

  return (
    <>
      <Header total={USE_CASES_COUNT} />
      <main
        id="main-content"
        className="w-full overflow-hidden"
        style={isMobile ? undefined : { height: "100dvh" }}
      >
        {isMobile ? <MobileHistoryList /> : <AIHistoryTimeline />}
      </main>
    </>
  );
}
