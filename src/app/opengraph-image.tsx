import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "rgb(9,11,20)",
          backgroundImage:
            "radial-gradient(circle at 18% 22%, rgba(159,140,255,0.28) 0%, transparent 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "linear-gradient(135deg, #9F8CFF, #6E5BD9)",
            }}
          />
          <div style={{ display: "flex", fontSize: 28, color: "#F4F2EA", fontWeight: 500 }}>
            Sintra <span style={{ color: "#B6A6FF", fontStyle: "italic", marginLeft: 8 }}>AI</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            lineHeight: 1.1,
            color: "#F4F2EA",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            maxWidth: 980,
          }}
        >
          The AI one-stop shop.
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#8B8AA6", marginTop: 24 }}>
          Daily news, prompts, tools & guides — curated for signal, not noise.
        </div>
      </div>
    ),
    { ...size }
  );
}
