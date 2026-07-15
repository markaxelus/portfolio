import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json in the home dir makes Next infer the wrong
  // workspace root; pin it to this project.
  turbopack: {
    root: __dirname,
  },
  // ESLint is currently unloadable (the `minimatch` override is ESM-only and
  // breaks eslint's CommonJS resolution), and lint of the in-progress rebuild
  // isn't a deploy gate — don't let it block `next build` on Vercel.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
