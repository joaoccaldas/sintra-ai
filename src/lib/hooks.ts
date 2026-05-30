"use client";

import { useState, useEffect, useCallback, useRef, RefObject, useSyncExternalStore } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

export function useScroll(): number {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const fn = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", fn);
    };
  }, []);
  return y;
}

export function useInView<T extends Element>(ref: RefObject<T>, threshold = 0.05): boolean {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return inView;
}

type Filters = { category: string; difficulty: string; q: string };

export function useUrlFilters(initial: Filters): [Filters, (next: Partial<Filters>) => void] {
  const [state, setState] = useState<Filters>(initial);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    const next: Filters = {
      category: p.get("c") || initial.category,
      difficulty: p.get("d") || initial.difficulty,
      q: p.get("q") || initial.q,
    };
    setState(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = useCallback((patch: Partial<Filters>) => {
    setState(prev => {
      const next = { ...prev, ...patch };
      const p = new URLSearchParams();
      if (next.category !== "all") p.set("c", next.category);
      if (next.difficulty !== "all") p.set("d", next.difficulty);
      if (next.q) p.set("q", next.q);
      const qs = p.toString();
      const url = qs ? `${window.location.pathname}?${qs}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
      window.history.replaceState({}, "", url);
      return next;
    });
  }, []);

  return [state, update];
}

interface ShortcutOpts {
  meta?: boolean;
  preventInInput?: boolean;
}

export function useKeyShortcut(keys: string[], handler: () => void, opts: ShortcutOpts = {}) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      const tgt = e.target as HTMLElement | null;
      const inField = tgt && (tgt.tagName === "INPUT" || tgt.tagName === "TEXTAREA" || tgt.isContentEditable);
      if (opts.preventInInput && inField && !opts.meta) return;

      const matchesKey = keys.includes(e.key);
      const matchesMeta = opts.meta ? (e.metaKey || e.ctrlKey) : true;
      if (matchesKey && matchesMeta) {
        e.preventDefault();
        handlerRef.current();
      }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [keys, opts.meta, opts.preventInInput]);
}

export function useFocusTrap<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!active || !ref.current) return;
    const root = ref.current;
    const prev = document.activeElement as HTMLElement | null;

    const focusables = () =>
      Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => !el.hasAttribute("inert"));

    const first = focusables()[0];
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const idx = items.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && idx <= 0) {
        e.preventDefault();
        items[items.length - 1].focus();
      } else if (!e.shiftKey && idx === items.length - 1) {
        e.preventDefault();
        items[0].focus();
      }
    };

    root.addEventListener("keydown", onKey);
    return () => {
      root.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [active]);

  return ref;
}

const RECENT_KEY = "sintra_recent_v1";
const RECENT_MAX = 8;

export interface RecentItem {
  id: number;
  slug: string;
  title: string;
  category: string;
}

let _recentCache: RecentItem[] = [];
let _recentRaw = "";

function readRecent(): RecentItem[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(RECENT_KEY) || "[]";
  if (raw !== _recentRaw) {
    try { _recentCache = JSON.parse(raw); } catch { _recentCache = []; }
    _recentRaw = raw;
  }
  return _recentCache;
}

const subscribers = new Set<() => void>();
function notifyRecent() { subscribers.forEach(fn => fn()); }

export function trackRecentlyViewed(item: RecentItem) {
  const prev = readRecent().filter(r => r.id !== item.id);
  const next = [item, ...prev].slice(0, RECENT_MAX);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  notifyRecent();
}

const EMPTY_RECENT: RecentItem[] = [];

export function useRecentlyViewed(): RecentItem[] {
  return useSyncExternalStore(
    cb => { subscribers.add(cb); return () => subscribers.delete(cb); },
    readRecent,
    () => EMPTY_RECENT,
  );
}
