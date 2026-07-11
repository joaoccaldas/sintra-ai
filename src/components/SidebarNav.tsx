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
  Radio,
  Search as SearchIcon,
  Sun,
  Tag,
  Waves,
  Workflow,
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
      { href: `${BASE_PATH}/live/`, label: "Live Feed", Icon: Radio, pathKey: "live" },
      { href: `${BASE_PATH}/automate/`, label: "Automation Hub", Icon: Workflow, pathKey: "automate" },
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

  const activeKey = activePathKey(pathname);

  return (
    <>
      <div className="px-2 pt-3 pb-2">
        <a
          href={BASE_PATH + "/"}
          className={[
            "flex items-center gap-2 rounded-xl px-2 py-2.5 text-fg-2 hover:text-fg-1 hover:bg-white/[0.05] transition-colors",
            activeKey === "" ? "bg-violet/[0.14] text-violet-bright" : "",
          ].join(" ")}
          onClick={onNavigate}
        >
          <Home size={16} />
          {!collapsed && <span className="font-mono text-[12px] tracking-[0.08em] uppercase">Home</span>}
        </a>
      </div>

      <nav className="px-2 pb-3 space-y-3 overflow-y-auto flex-1">
        {NAV.map(group => (
          <div key={group.label}>
            {!collapsed && (
              <button
                type="button"
                onClick={() => setOpenGroups(prev => ({ ...prev, [group.label]: !prev[group.label] }))}
                className="w-full flex items-center justify-between px-2 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 hover:text-fg-2 transition-colors"
              >
                {group.label}
                {openGroups[group.label] ? <ChevronLeft size={12} className="-rotate-90" /> : <ChevronRight size={12} />}
              </button>
            )}
            <AnimatePresence initial={false}>
              {(collapsed || openGroups[group.label]) && (
                <motion.div
                  initial={collapsed ? false : { height: 0, opacity: 0 }}
                  animate={collapsed ? undefined : { height: "auto", opacity: 1 }}
                  exit={collapsed ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-0.5 overflow-hidden"
                >
                  {group.items.map(item => (
                    <div key={item.href} onClick={onNavigate}>
                      {collapsed ? (
                        <Tip label={item.label}>
                          <NavLink item={{ ...item, label: "" }} active={activeKey === item.pathKey} />
                        </Tip>
                      ) : (
                        <NavLink item={item} active={activeKey === item.pathKey} />
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      <div className="border-t border-hairline px-2 py-3">
        <div className={collapsed ? "flex flex-col gap-1" : "grid grid-cols-4 gap-1"}>
          {THEMES.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTheme(id)}
              aria-label={`Switch to ${label} theme`}
              className={[
                "flex items-center justify-center h-8 rounded-lg border transition-colors",
                theme === id
                  ? "border-violet/40 bg-violet/[0.12] text-violet-bright"
                  : "border-transparent text-fg-4 hover:text-fg-2 hover:bg-white/[0.05]",
              ].join(" ")}
            >
              <Icon size={14} />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default function SidebarNav() {
  const { collapsed, toggleCollapsed, mobileOpen, setMobileOpen } = useSidebar();

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, setMobileOpen]);

  return (
    <>
      <aside
        className={[
          "hidden lg:flex fixed left-0 top-0 bottom-0 z-40 flex-col border-r border-hairline bg-abyss/92 backdrop-blur-xl transition-[width] duration-200",
          collapsed ? "w-[var(--sidebar-w-collapsed)]" : "w-[var(--sidebar-w)]",
        ].join(" ")}
        style={{ width: collapsed ? "var(--sidebar-w-collapsed)" : "var(--sidebar-w)" }}
      >
        <div className="h-16 flex items-center gap-2 px-3 border-b border-hairline">
          <a href={BASE_PATH + "/"} className="flex items-center gap-2 min-w-0">
            <TesseractMark size={28} />
            {!collapsed && (
              <span className="font-serif text-[18px] leading-none text-fg-1 truncate">
                Sintra <em className="italic text-violet-bright">AI</em>
              </span>
            )}
          </a>
          <button
            type="button"
            onClick={toggleCollapsed}
            className="ml-auto h-8 w-8 flex items-center justify-center rounded-lg text-fg-4 hover:text-fg-1 hover:bg-white/[0.05] transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>
        <SidebarTree collapsed={collapsed} />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation"
              className="fixed inset-0 z-50 bg-black/60 lg:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-0 top-0 bottom-0 z-[60] w-[min(86vw,320px)] flex flex-col border-r border-hairline bg-abyss shadow-2xl lg:hidden"
            >
              <div className="h-16 flex items-center gap-2 px-4 border-b border-hairline">
                <TesseractMark size={28} />
                <span className="font-serif text-[18px] leading-none text-fg-1">
                  Sintra <em className="italic text-violet-bright">AI</em>
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="ml-auto h-9 w-9 flex items-center justify-center rounded-lg text-fg-4 hover:text-fg-1 hover:bg-white/[0.05] transition-colors"
                  aria-label="Close navigation"
                >
                  <X size={18} />
                </button>
              </div>
              <SidebarTree collapsed={false} onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
