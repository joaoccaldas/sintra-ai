import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090B14",
};

export const metadata: Metadata = {
  title: "Sintra Tesseract — AI Use Case Library",
  description: "A multidimensional library of AI use cases. 66 curated prompts for business, engineering, design, and research.",
  keywords: ["AI prompts", "ChatGPT", "Claude", "AI use cases", "prompt engineering"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
