import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The parent folder contains an unrelated lockfile (from a skills
  // installer); pin the workspace root to this project.
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
