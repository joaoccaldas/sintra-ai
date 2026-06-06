"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type VisitMap = Record<string, number>;

const STORAGE_KEY = "sintra-page-visits";

function readVisits(): VisitMap {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as VisitMap;
  } catch {
    return {};
  }
}

function saveVisits(v: VisitMap) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(v)); } catch { /* quota */ }
}

/** Records a visit for the current pathname and returns the full visit map. */
export function usePageVisits(): VisitMap {
  const pathname = usePathname();
  const [visits, setVisits] = useState<VisitMap>({});

  useEffect(() => {
    const v = readVisits();
    const key = pathname ?? "/";
    v[key] = (v[key] ?? 0) + 1;
    saveVisits(v);
    setVisits({ ...v });
  }, [pathname]);

  return visits;
}
