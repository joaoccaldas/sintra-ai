"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ChevronLeft, X,
  Newspaper, Calendar, Tag, Clock, FlaskConical, BookOpen,
  GraduationCap, FileText, Archive, Lightbulb,
  Wrench, Cpu, Brain, Search as SearchIcon,
  Home, Sun, Moon, Leaf, Waves, Palette, Play,
} from "lucide-react";
import TesseractMark from "./TesseractMark";
import { useSidebar } from "@/context/SidebarContext";
import { useTheme, type Theme } from "@/context/ThemeContext";
import { usePageVisits } from "@/hooks/usePageVisits";
import { BASE_PATH } from "@/lib/constants";
import { AI_NEWS } from "@/lib/newsData";
import { AI_TOOLS } from "@/lib/toolsData";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

// ── Nav tree definition ────────────────────────────────────────────────────

interface NavItem {
  href: string;
  label: string;
  Icon: React.ElementType;
  count?: number;
  pathKey: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const NAV: NavGroup[] = [
  {
    label: "Discover",
    items: [
      { href: `${BASE_PATH}/news/`,       label: "AI News",       Icon: Newspaper,    count: AI_NEWS.length, pathKey: "news" },
      { href: `${BASE_PATH}/weekly/`,     label: "Weekly Digest", Icon: Calendar,                            pathKey: "weekly" },
      { href: `${BASE_PATH}/topics/`,     label: "Topic Hubs",    Icon: Tag,                                 pathKey: "topics" },
      { href: `${BASE_PATH}/ai-history/`, label: "AI History",    Icon: Clock,                               pathKey: "ai-history" },
      { href: `${BASE_PATH}/ai-labs/`,    label: "AI Labs",       Icon: Brain,                               pathKey: "ai-labs" },
      { href: `${BASE_PATH}/research/`,   label: "Research",      Icon: FlaskConical,                        pathKey: "research" },
    ],
  },
  {
    label: "Learn",
    items: [
      { href: `${BASE_PATH}/learn/`,     label: "Learning Paths", Icon: GraduationCap, pathKey: "learn" },
      { href: `${BASE_PATH}/guides/`,    label: "Guides",         Icon: FileText,       pathKey: "guides" },
      { href: `${BASE_PATH}/resources/`, label: "Resources",      Icon: Archive,        pathKey: "resources" },
      { href: `${BASE_PATH}/concepts/`,  label: "Concepts",       Icon: Lightbulb,      pathKey: "concepts" },
      { href: `${BASE_PATH}/videos/`,    label: "Videos",         Icon: Play,           pathKey: "videos" },
    ],
  },
  {
    label: "Reference",
    items: [
      { href: `${BASE_PATH}/tools/`,           label: "AI Tools",  Icon: Wrench, count: AI_TOOLS.length, pathKey: "tools" },
      { href: `${BASE_PATH}/models/`,          label: "Models",    Icon: Cpu,                             pathKey: "models" },
      { href: `${BASE_PATH}/claude/`,          label: "Claude",    Icon: Brain,                           pathKey: "claude" },
      { href: `${BASE_PATH}/google-ai-tools/`, label: "Google AI", Icon: SearchIcon,                      pathKey: "google-ai-tools" },
    ],
  },
];

const THEMES: { id: Theme; label: string; Icon: React.ElementType }[] = [
  { id: "dark",   label: "Dark",   Icon: Moon },
  { id: "light",  label: "Light",  Icon: Sun },
  { id: "forest", label: "Forest", Icon: Leaf },
  { id: "ocean",  label: "Ocean",  Icon: Waves },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function activePathKey(pathname: string): string {
  return pathname.split("/").filter(Boolean)[0] ?? "";
}

// ── Collapsed tooltip wrapper ──────────────────────────────────────────────

function Tip({ label, children }: { label: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[11px] px-2 py-1 rounded-lg bg-steel-2 border border-hairline text-fg-1 z-50 pointer-events-none shadow-lg">
          {label}
        </span>
      )}
    </span>
  );
}

// ── Single nav link ────────────────────────────────────────────────────────

function NavLink({
  item, active, collapsed, visits,
}: {
  item: NavItem; active: boolean; collapsed: boolean; visits: number;
}) {
  const { Icon } = item;
  return (
    <a
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={[
        "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-all duration-150 group relative",
        active
          ? "bg-violet/[0.16] text-violet-bright border border-violet/[0.24]"
          : "text-fg-3 hover:text-fg-1 hover:bg-white/[0.05] border border-transparent",
      ].join(" ")}
    >
      <Icon size={15} className={active ? "text-violet-bright" : "text-fg-4 group-hover:text-fg-2 transition-colors"} />
      {!collapsed && (
        <span className="flex-1 truncate leading-none">{item.label}</span>
      )}
      {!collapsed && item.count !== undefined && (
        <span className="font-mono text-[10px] text-fg-4 shrink-0">{item.count}</span>
      )}
      {!collapsed && visits > 1 && (
        <span className="w-1 h-1 rounded-full bg-violet/50 shrink-0" title={`Visited ${visits} times`} />
      )}
    </a>
  );
}

// ── Inner sidebar tree (shared by desktop & mobile) ────────────────────────

function SidebarTree({
  collapsed, onNavigate,
}: {
  collapsed: boolean; onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const visits = usePageVisits();
  const { theme, setTheme } = useTheme();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Discover: true, Learn: true, Reference: true,
  });

  const segment = activePathKey(pathname);

  function toggleGroup(label: string) {
    if (collapsed) return;
    setOpenGroups(g => ({ ...g, [label]: !g[label] }));
  }

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 space-y-0.5 scrollbar-none">
        {/* Home */}
        {collapsed ? (
          <Tip label="Library">
            <a href={`${BASE_PATH}/`}
              aria-current={!segment ? "page" : undefined}
              className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all ${!segment ? "bg-violet/[0.16] text-violet-bright border border-violet/[0.24]" : "text-fg-4 hover:text-fg-1 hover:bg-white/[0.05] border border-transparent"}`}>
              <Home size={15} />
            </a>
          </Tip>
        ) : (
          <a href={`${BASE_PATH}/`}
            aria-current={!segment ? "page" : undefined}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-all duration-150 border ${!segment ? "bg-violet/[0.16] text-violet-bright border-violet/[0.24]" : "text-fg-3 hover:text-fg-1 hover:bg-white/[0.05] border-transparent"}`}
            onClick={onNavigate}
          >
            <Home size={15} className={!segment ? "text-violet-bright" : "text-fg-4"} />
            <span className="flex-1 truncate">Library</span>
            <span className="font-mono text-[10px] text-fg-4">{USE_CASES_COUNT}</span>
          </a>
        )}

        {NAV.map(group => {
          // Sort items by visit count descending
          const sorted = [...group.items].sort((a, b) => {
            const av = visits[`${BASE_PATH}/${a.pathKey}/`] ?? 0;
            const bv = visits[`${BASE_PATH}/${b.pathKey}/`] ?? 0;
            return bv - av;
          });
          const groupOpen = openGroups[group.label] !== false;

          return (
            <div key={group.label} className="pt-2">
              {/* Group header */}
              {collapsed ? (
                <div className="flex items-center justify-center py-2 mb-1">
                  <span className="w-4 h-px bg-hairline" />
                </div>
              ) : (
                <button
                  onClick={() => toggleGroup(group.label)}
                  className="w-full flex items-center gap-1.5 px-2.5 py-1 mb-1 font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 hover:text-fg-3 transition-colors group"
                >
                  <ChevronRight size={10}
                    className={`transition-transform duration-150 ${groupOpen ? "rotate-90" : ""}`} />
                  {group.label}
                </button>
              )}

              {/* Items */}
              <AnimatePresence initial={false}>
                {(collapsed || groupOpen) && (
                  <motion.div
                    key={group.label + "-items"}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden space-y-0.5"
                  >
                    {sorted.map(item => {
                      const v = visits[`${BASE_PATH}/${item.pathKey}/`] ?? 0;
                      if (collapsed) {
                        return (
                          <Tip key={item.href} label={item.label}>
                            <a
                              href={item.href}
                              onClick={onNavigate}
                              aria-current={segment === item.pathKey ? "page" : undefined}
                              className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all border ${segment === item.pathKey ? "bg-violet/[0.16] text-violet-bright border-violet/[0.24]" : "text-fg-4 hover:text-fg-1 hover:bg-white/[0.05] border-transparent"}`}
                            >
                              <item.Icon size={15} />
                            </a>
                          </Tip>
                        );
                      }
                      return (
                        <NavLink
                          key={item.href}
                          item={item}
                          active={segment === item.pathKey}
                          collapsed={false}
                          visits={v}
                        />
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Theme switcher */}
      <div className={`border-t border-hairline/50 p-2 ${collapsed ? "" : "p-3"}`}>
        {collapsed ? (
          <Tip label="Theme">
            <button className="flex items-center justify-center w-9 h-9 rounded-lg text-fg-4 hover:text-fg-1 hover:bg-white/[0.05] transition-all">
              <Palette size={14} />
            </button>
          </Tip>
        ) : (
          <div>
            <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-fg-4 px-1 mb-2">Theme</p>
            <div className="grid grid-cols-4 gap-1">
              {THEMES.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setTheme(id)}
                  title={label}
                  className={[
                    "flex flex-col items-center gap-1 py-1.5 rounded-lg border text-[9px] font-mono transition-all",
                    theme === id
                      ? "bg-violet/[0.18] border-violet/[0.4] text-violet-bright"
                      : "border-transparent text-fg-4 hover:border-hairline hover:text-fg-2 hover:bg-white/[0.04]",
                  ].join(" ")}
                >
                  <Icon size={12} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Desktop sidebar ────────────────────────────────────────────────────────

export function DesktopSidebar() {
  const { collapsed, toggleCollapsed } = useSidebar();

  return (
    <aside
      className={[
        "sidebar-rail fixed top-0 left-0 bottom-0 z-40 flex flex-col",
        "bg-abyss border-r border-hairline/60",
        "hidden lg:flex",
        collapsed ? "w-14" : "w-56",
      ].join(" ")}
    >
      {/* Logo + collapse toggle */}
      <div className={`flex items-center h-16 border-b border-hairline/50 px-3 shrink-0 ${collapsed ? "justify-center" : "gap-2 justify-between"}`}>
        {!collapsed && (
          <a href={`${BASE_PATH}/`} className="flex items-center gap-2 text-violet-bright min-w-0">
            <TesseractMark size={18} />
            <span className="font-serif text-[15px] text-fg-1 leading-none truncate">
              Sintra <em className="italic text-violet-bright">AI</em>
            </span>
          </a>
        )}
        {collapsed && (
          <a href={`${BASE_PATH}/`} className="text-violet-bright">
            <TesseractMark size={18} />
          </a>
        )}
        <button
          onClick={toggleCollapsed}
          className="flex items-center justify-center w-7 h-7 rounded-lg text-fg-4 hover:text-fg-1 hover:bg-white/[0.06] transition-all shrink-0"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
      </div>

      <SidebarTree collapsed={collapsed} />
    </aside>
  );
}

// ── Mobile drawer ──────────────────────────────────────────────────────────

export function MobileSidebar() {
  const { mobileOpen, setMobileOpen } = useSidebar();

  return (
    <AnimatePresence>
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-void/80 backdrop-blur-sm z-[55] lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 bottom-0 w-72 bg-abyss border-r border-hairline/60 z-[60] flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between h-16 border-b border-hairline/50 px-4 shrink-0">
              <a href={`${BASE_PATH}/`} className="flex items-center gap-2 text-violet-bright" onClick={() => setMobileOpen(false)}>
                <TesseractMark size={18} />
                <span className="font-serif text-[16px] text-fg-1">
                  Sintra <em className="italic text-violet-bright">AI</em>
                </span>
              </a>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-fg-3 hover:text-fg-1 hover:bg-white/[0.07] transition-all"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>
            <SidebarTree collapsed={false} onNavigate={() => setMobileOpen(false)} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
