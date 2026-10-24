"use client";

import { useEffect } from "react";
import { BASE_PATH } from "@/lib/constants";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    // A temporary preview must never install a worker or claim production scope.
    if (process.env.NEXT_PUBLIC_PREVIEW_MODE === "1") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register(`${BASE_PATH}/sw.js`, { scope: `${BASE_PATH}/` });
  }, []);

  return null;
}
