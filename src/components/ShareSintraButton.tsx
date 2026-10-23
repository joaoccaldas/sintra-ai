"use client";

import { Share2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./ShareSintraButton.module.css";

/**
 * No tracking, login, automatic messaging, or address book access.
 * Explicit user interaction opens the device-native share sheet or WhatsApp.
 */
export default function ShareSintraButton() {
  const { locale } = useLanguage();
  const pt = locale === "pt";

  async function share() {
    const url = window.location.href.split("#")[0];
    const text = pt
      ? "Conheça o Sintra Brasil: entenda IA e coloque em prática."
      : "Explore Sintra Brasil: understand AI and put it to work.";
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: "Sintra Brasil", text, url });
        return;
      } catch (error) {
        // Cancel is expected; never redirect someone who dismissed the share sheet.
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    const target = "https://wa.me/?text=" + encodeURIComponent(text + " " + url);
    window.open(target, "_blank", "noopener,noreferrer");
  }

  return (
    <button className={styles.button} type="button" onClick={share}
      aria-label={pt ? "Compartilhar Sintra Brasil" : "Share Sintra Brasil"}>
      <Share2 size={16} aria-hidden="true" />
      {pt ? "Compartilhar" : "Share"}
    </button>
  );
}
