import type { NextConfig } from "next";

// Cloudflare Pages Static HTML Export configuration
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
