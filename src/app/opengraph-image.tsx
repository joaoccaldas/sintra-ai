import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Original generated social card: matching ond.ai porcelain / ink / violet
 * endorsed Sintra direction, without hotlinking or embedding concept mockups.
 * Brand assets remain working identity pending clearance.
 */
export default function Image() {
  return new ImageResponse(
    <div style={{
      width: "100%", height: "100%", background: "#F7F8F5",
      display: "flex", flexDirection: "column", padding: "72px 80px",
      color: "#172238", justifyContent: "space-between",
      fontFamily: "sans-serif",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="111" height="54" viewBox="0 0 80 32" fill="none">
          <path d="M3 19 C 17 20 22 5 35 7 C 48 9 48 25 61 23 C 68 22 73 15 77 16"
            stroke="#5B48D9" strokeWidth="4.25" strokeLinecap="round"/>
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 35, fontWeight: 700, letterSpacing: "-1.5px" }}>sintra.ai</div>
          <div style={{ display: "flex", fontSize: 16, color: "#586376" }}>by ond.ai</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ color: "#B65344", fontSize: 18, letterSpacing: "2px", marginBottom: 28 }}>
          BRASIL / APRENDA · CRIE · COMPARTILHE
        </div>
        <div style={{ color: "#172238", fontSize: 78, fontWeight: 700, letterSpacing: "-3px", lineHeight: 1.05 }}>
          Entenda a IA.
        </div>
        <div style={{ color: "#B65344", fontSize: 68, letterSpacing: "-2px", marginTop: 8 }}>
          Coloque em prática.
        </div>
        <div style={{ fontSize: 21, color: "#586376", marginTop: 36 }}>
          O que mudou. Por que importa. O que fazer agora.
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", borderTop: "1px solid #DDE5EE", paddingTop: 23 }}>
        <div style={{ display: "flex", color: "#586376", fontSize: 17 }}>Inteligência que vira ação.</div>
        <div style={{ display: "flex", color: "#5B48D9", fontSize: 17 }}>Sintra Brasil</div>
      </div>
    </div>, size);
}
