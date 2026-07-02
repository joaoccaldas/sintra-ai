"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  BookOpen,
  Brain,
  Calculator,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cpu,
  FileText,
  FlaskConical,
  GraduationCap,
  Home,
  Leaf,
  Lightbulb,
  Moon,
  Newspaper,
  Palette,
  Play,
  Search as SearchIcon,
  Sun,
  Tag,
  Waves,
  Wrench,
  X,
} from "lucide-react";
import TesseractMark from "./TesseractMark";
import { useSidebar } from "@/context/SidebarContext";
import { useTheme, type Theme } from "@/context/ThemeContext";
import { BASE_PATH } from "@/lib/constants";
import { AI_NEWS } from "@/lib/newsDataCombined";
import { AI_TOOLS } from "@/lib/toolsData";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

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
      { href: `${BASE_PATH}/news/`, label: "AI News", Icon: Newspaper, count: AI_NEWS.length, pathKey: "news" },
      { href: `${BASE_PATH}/weekly/`, label: "Weekly Digest", Icon: Calendar, pathKey: "weekly" },
      { href: `${BASE_PATH}/topics/`, label: "Topic Hubs", Icon: Tag, pathKey: "topics" },
      { href: `${BASE_PATH}/ai-history/`, label: "AI History", Icon: Clock, pathKey: "ai-history" },
      { href: `${BASE_PATH}/ai-labs/`, label: "AI Labs", Icon: Brain, pathKey: "ai-labs" },
      { href: `${BASE_PATH}/research/`, label: "Research", Icon: FlaskConical, pathKey: "research" },
    ],
  },
  {
    label: "Learn",
    items: [
      { href: `${BASE_PATH}/learn/`, label: "Learning Paths", Icon: GraduationCap, pathKey: "learn" },
      { href: `${BASE_PATH}/guides/`, label: "Guides", Icon: FileText, pathKey: "guides" },
      { href: `${BASE_PATH}/resources/`, label: "Resources", Icon: Archive, pathKey: "resources" },
      { href: `${BASE_PATH}/concepts/`, label: "Concepts", Icon: Lightbulb, pathKey: "concepts" },
      { href: `${BASE_PATH}/videos/`, label: "Videos", Icon: Play, pathKey: "videos" },
    ],
  },
  {
    label: "Reference",
    items: [
      { href: `${BASE_PATH}/tools/`, label: "AI Tools", Icon: Wrench, count: AI_TOOLS.length, pathKey: "tools" },
      { href: `${BASE_PATH}/models/`, label: "Models", Icon: Cpu, pathKey: "models" },
      { href: `${BASE_PATH}/claude/`, label: "Claude", Icon: Brain, pathKey: "claude" },
      { href: `${BASE_PATH}/google-ai-tools/`, label: "Google AI", Icon: SearchIcon, pathKey: "google-ai-tools" },
      { href: `${BASE_PATH}/token-calculator/`, label: "Cost Calc", Icon: Calculator, pathKey: "token-calculator" },
    ],
  },
];

const THEMES: { id: Theme; label: string; Icon: React.ElementType }[] = [
  { id: "dark", label: "Dark", Icon: Moon },
  { id: "light", label: "Light", Icon: Sun },
  { id: "forest", label: "Forest", Icon: Leaf },
  { id: "ocean", label: "Ocean", Icon: Waves },
];

function activePathKey(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  return segments[0] === "sintra-ai" ? segments[1] ?? "" : segments[0] ?? "";
}

function Tip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span className="relative flex group/tip">
      {children}
      <span
        role="tooltip"
        className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[11px] px-2 py-1 rounded-lg bg-steel-2 border border-hairline text-fg-1 z-50 pointer-events-none shadow-lg opacity-0 invisible group-hover/tip:opacity-100 group-hover/tip:visible group-focus-within/tip:opacity-100 group-focus-within/tip:visible transition-opacity"
      >
        {label}
      </span>
    </span>
  );
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const { Icon } = item;
  return (
    <a
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={[
        "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-all duration-150 group relative border",
        active
          ? "bg-violet/[0.16] text-violet-bright border-violet/[0.24]"
          : "text-fg-3 hover:text-fg-1 hover:bg-white/[0.05] border-transparent",
      ].join(" ")}
    >
      <Icon size={15} className={active ? "text-violet-bright" : "text-fg-4 group-hover:text-fg-2 transition-colors"} />
      <span className="flex-1 truncate leading-none">{item.label}</span>
      {item.count !== undefined && <span className="font-mono text-[10px] text-fg-4 shrink-0">{item.count}</span>}
    </a>
  );
}

function SidebarTree({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Discover: true,
    Learn: true,
    Reference: true,
  });

  const segment = activePathKey(pathname);

  function toggleGroup(label: string) {
    if (!collapsed) setOpenGroups(groups => ({ ...groups, [label]: !groups[label] }));
  }

  function cycleTheme() {
    const currentIndex = THEMES.findIndex(item => item.id === theme);
    const next = THEMES[(currentIndex + 1) % THEMES.length];
    setTheme(next.id);
  }

  return (
    <div className="flex flex-col h-full">
      <nav aria-label="Primary" className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 space-y-0.5 scrollbar-none">
        {collapsed ? (
          <Tip label="Library">
            <a
              href={`${BASE_PATH}/`}
              aria-label={`Library, ${USE_CASES_COUNT} prompts`}
              aria-current={!segment ? "page" : undefined}
              className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all border ${!segment ? "bg-violet/[0.16] text-violet-bright border-violet/[0.24]" : "text-fg-4 hover:text-fg-1 hover:bg-white/[0.05] border-transparent"}`}
            >
              <Home size={15} />
            </a>
          </Tip>
        ) : (
          <a
            href={`${BASE_PATH}/`}
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
          const groupOpen = openGroups[group.label] !== false;
          return (
            <div key={group.label} className="pt-2">
              {collapsed ? (
                <div className="flex items-center justify-center py-2 mb-1" aria-hidden="true">
                  <span className="w-4 h-px bg-hairline" />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => toggleGroup(group.label)}
                  aria-expanded={groupOpen}
                  className="w-full flex items-center gap-1.5 px-2.5 py-1 mb-1 font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 hover:text-fg-3 transition-colors group"
                >
                  <ChevronRight size={10} className={`transition-transform duration-150 ${groupOpen ? "rotate-90" : ""}`} />
                  {group.label}
                </button>
              )}

              <AnimatePresence initial={false}>
                {(collapsed || groupOpen) && (
                  <motion.div
                    key={`${group.label}-items`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden space-y-0.5"
                  >
                    {group.items.map(item => {
                      const active = segment === item.pathKey;
                      if (collapsed) {
                        return (
                          <Tip key={item.href} label={item.label}>
                            <a
                              href={item.href}
                              onClick={onNavigate}
                              aria-label={item.count === undefined ? item.label : `${item.label}, ${item.count} items`}
                              aria-current={active ? "page" : undefined}
                              className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all border ${active ? "bg-violet/[0.16] text-violet-bright border-violet/[0.24]" : "text-fg-4 hover:text-fg-1 hover:bg-white/[0.05] border-transparent"}`}
                            >
                              <item.Icon size={15} />
                            </a>
                          </Tip>
                        );
                      }
                      return <NavLink key={item.href} item={item} active={active} />;
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      <div className={`border-t border-hairline/50 ${collapsed ? "p-2" : "p-3"}`}>
        {collapsed ? (
          <Tip label={`Theme: ${THEMES.find(item => item.id === theme)?.label ?? theme}. Activate to change.`}>
            <button
              type="button"
              onClick={cycleTheme}
              aria-label={`Current theme ${theme}. Change theme.`}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-fg-4 hover:text-fg-1 hover:bg-white/[0.05] transition-all"
            >
              <Palette size={14} />
            </button>
          </Tip>
        ) : (
          <div>
            <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-fg-4 px-1 mb-2">Theme</p>
            <div className="grid grid-cols-4 gap-1" role="group" aria-label="Color theme">
              {THEMES.map(({ id, label, Icon }) => (
                <button
                  type="button"
                  key={id}
                  onClick={() => setTheme(id)}
                  aria-pressed={theme === id}
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

export function DesktopSidebar() {
  const { collapsed, toggleCollapsed } = useSidebar();

  return (
    <aside
      aria-label="Site navigation"
      className={[
        "sidebar-rail fixed top-0 left-0 bottom-0 z-40 flex flex-col",
        "bg-abyss border-r border-hairline/60 hidden lg:flex",
        collapsed ? "w-14" : "w-56",
      ].join(" ")}
    >
      <div className={`flex items-center h-16 border-b border-hairline/50 px-3 shrink-0 ${collapsed ? "justify-center" : "gap-2 justify-between"}`}>
        <a href={`${BASE_PATH}/`} aria-label="Sintra AI home" className="flex items-center gap-2 text-violet-bright min-w-0">
          <TesseractMark size={18} />
          {!collapsed && (
            <span className="font-serif text-[15px] text-fg-1 leading-none truncate">
              Sintra <em className="italic text-violet-bright">AI</em>
            </span>
          )}
        </a>
        <button
          type="button"
          onClick={toggleCollapsed}
          className="flex items-center justify-center w-7 h-7 rounded-lg text-fg-4 hover:text-fg-1 hover:bg-white/[0.06] transition-all shrink-0"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
        >
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
      </div>
      <SidebarTree collapsed={collapsed} />
    </aside>
  );
}

export function MobileSidebar() {
  const { mobileOpen, setMobileOpen } = useSidebar();

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, setMobileOpen]);

  return (
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-void/80 backdrop-blur-sm z-[55] lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 bottom-0 w-72 bg-abyss border-r border-hairline/60 z-[60] flex flex-col lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="flex items-center justify-between h-16 border-b border-hairline/50 px-4 shrink-0">
              <a href={`${BASE_PATH}/`} className="flex items-center gap-2 text-violet-bright" onClick={() => setMobileOpen(false)}>
                <TesseractMark size={18} />
                <span className="font-serif text-[16px] text-fg-1">
                  Sintra <em className="italic text-violet-bright">AI</em>
                </span>
              </a>
              <button
                type="button"
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
