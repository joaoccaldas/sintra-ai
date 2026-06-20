import { ImageResponse } from "next/og";
import { GUIDES } from "@/lib/guidesData";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

const LEVEL_HEX: Record<string, string> = {
  beginner: "#8FE3D2",
  intermediate: "#F2C46D",
  advanced: "#F26D6D",
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  const title = guide?.title ?? "Guide";
  const tagline = guide?.tagline ?? "";
  const level = guide?.level ?? "beginner";
  const levelHex = LEVEL_HEX[level] ?? "#9F8CFF";

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
          backgroundImage: `radial-gradient(circle at 85% 15%, ${levelHex}33 0%, transparent 55%)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <div style={{ display: "flex", fontSize: 22, color: "#8B8AA6", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Sintra AI · Guide
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 14,
              color: levelHex,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "6px 14px",
              borderRadius: 999,
              border: `1px solid ${levelHex}66`,
              marginLeft: 12,
            }}
          >
            {level}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 58,
            lineHeight: 1.12,
            color: "#F4F2EA",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#8B8AA6", marginTop: 22, maxWidth: 880, lineHeight: 1.4 }}>
          {tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
