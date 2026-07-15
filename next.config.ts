import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json in the home dir makes Next infer the wrong
  // workspace root; pin it to this project.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
