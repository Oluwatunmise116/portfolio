import { IBM_Plex_Mono, Inter, Sora } from "next/font/google";

/**
 * Typography system:
 * - Sora       → display face for major headings
 * - Inter      → body copy
 * - Plex Mono  → technical metadata only (labels, numbers, tags)
 */
export const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-sora",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});
