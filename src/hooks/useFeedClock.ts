"use client";

import { useEffect, useState } from "react";
import { LIVE_FEED } from "@/lib/liveFeedData";

/** Static export and first client render share a clock; update only after hydration. */
export function useFeedClock(): number {
  const [now, setNow] = useState(() => Date.parse(LIVE_FEED.generatedAt));
  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  return now;
}
