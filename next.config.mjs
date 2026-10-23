import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
// GitHub Pages is served from /sintra-ai, but isolated Vercel previews
// have their own domain root. Never change the Pages production path.
const isPreviewHost = process.env.VERCEL_ENV === 'preview';
const previewBasePath = process.env.SINTRA_PREVIEW_BASE_PATH;
if (previewBasePath && !/^\/sintra-ai\/preview\/[a-z0-9-]+$/.test(previewBasePath)) {
  throw new Error('Invalid SINTRA_PREVIEW_BASE_PATH. Expected an isolated /sintra-ai/preview/<slug> path.');
}
const basePath = previewBasePath || (isProd && !isPreviewHost ? '/sintra-ai' : '');

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
    NEXT_PUBLIC_PREVIEW_MODE: previewBasePath ? '1' : '0',
  },
};

export default nextConfig;
