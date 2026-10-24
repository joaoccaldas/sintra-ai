"use client";

import { BookOpen, Compass, House, Menu, Wrench } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useSidebar } from "@/context/SidebarContext";
import { BASE_PATH } from "@/lib/constants";
import s from "./MobileDock.module.css";

/**
 * Small, genuinely functional mobile destinations. Community will replace
 * "More" after a moderated community route is actually available.
 */
export default function MobileDock() {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const { mobileOpen, setMobileOpen } = useSidebar();
  const pt = locale === "pt";
  const path = pathname.startsWith(BASE_PATH + "/")
    ? pathname.slice(BASE_PATH.length)
    : pathname;
  const segment = path.split("/").filter(Boolean)[0] ?? "";
  const links = [
    { id: "home", label: pt ? "Início" : "Home", href: `${BASE_PATH}/`, icon: House, active: segment === "" },
    { id: "explore", label: pt ? "Explorar" : "Explore", href: `${BASE_PATH}/news/`, icon: Compass, active: ["news", "live", "topics", "tools", "models", "research", "weekly", "ponte"].includes(segment) },
    { id: "learn", label: pt ? "Aprender" : "Learn", href: `${BASE_PATH}/learn/`, icon: BookOpen, active: ["learn", "guides", "concepts", "knowledge", "videos"].includes(segment) },
    { id: "build", label: pt ? "Construir" : "Build", href: `${BASE_PATH}/library/`, icon: Wrench, active: ["library", "prompts", "automate", "ai-labs", "collections"].includes(segment) },
  ];

  return (
    <nav className={s.dock} aria-label={pt ? "Navegação principal do celular" : "Mobile primary navigation"}>
      {links.map(({ id, label, href, icon: Icon, active }) => (
        <a key={id} href={href} className={active ? `${s.item} ${s.active}` : s.item} aria-current={active ? "page" : undefined}>
          <Icon size={21} strokeWidth={active ? 2.1 : 1.75} aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}
      <button type="button" className={s.item} onClick={() => setMobileOpen(true)}
        aria-expanded={mobileOpen} aria-label={pt ? "Mais seções" : "More sections"}>
        <Menu size={21} strokeWidth={1.75} aria-hidden="true" />
        <span>{pt ? "Mais" : "More"}</span>
      </button>
    </nav>
  );
}
