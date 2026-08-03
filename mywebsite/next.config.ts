import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The parent folder contains an unrelated lockfile (from a skills
  // installer); pin the workspace root to this project.
  turbopack: {
    root: __dirname,
  },
  images: {
    // The placeholder artwork in /public/images is authored as local SVG files.
    // Next.js refuses to serve SVG through the image optimizer unless this flag
    // is set. The CSP below keeps the served SVGs inert (no scripts).
    // TODO: once real photography/renders (JPG/AVIF) replace the SVG
    // placeholders, remove `dangerouslyAllowSVG` and `contentSecurityPolicy`.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
