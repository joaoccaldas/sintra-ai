"use client";

import AIHistoryTimeline from "@/components/AIHistoryTimeline";
import Header from "@/components/Header";
import { USE_CASES } from "@/lib/data";

export default function AIHistoryPage() {
  return (
    <>
      <Header total={USE_CASES.length} />
      <main className="w-full overflow-hidden" style={{ height: "100dvh" }}>
        <AIHistoryTimeline />
      </main>
    </>
  );
}
