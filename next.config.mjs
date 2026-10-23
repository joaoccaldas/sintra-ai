import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
// GitHub Pages is served from /sintra-ai, but isolated Vercel previews
// have their own domain root. Never change the Pages production path.
const isPreviewHost = process.env.VERCEL_ENV === 'preview';
const basePath = isProd && !isPreviewHost ? '/sintra-ai' : '';

const nextConfig = {
  output: 'export',
  outputFileTracingRoot: fileURLToPath(new URL('.', import.meta.url)),
  distDir: 'dist',
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
