/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/sintra-ai' : '';

const nextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
