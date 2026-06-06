"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

interface SidebarCtx {
  collapsed: boolean;
  toggleCollapsed: () => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

const Ctx = createContext<SidebarCtx>({
  collapsed: false, toggleCollapsed: () => {},
  mobileOpen: false, setMobileOpen: () => {},
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sintra-sidebar");
    if (stored === "collapsed") setCollapsed(true);
  }, []);

  // Sync to CSS variable on <html> so Header can read sidebar width
  useEffect(() => {
    const w = collapsed ? "56px" : "224px";
    document.documentElement.style.setProperty("--sidebar-w", w);
    localStorage.setItem("sintra-sidebar", collapsed ? "collapsed" : "expanded");
  }, [collapsed]);

  // Close mobile drawer on route change
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleCollapsed = useCallback(() => setCollapsed(v => !v), []);

  return (
    <Ctx.Provider value={{ collapsed, toggleCollapsed, mobileOpen, setMobileOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export function useSidebar() { return useContext(Ctx); }
