import { IBM_Plex_Mono, Manrope, Oswald } from "next/font/google";

/**
 * Typography system (Portavia-inspired):
 * - Oswald     → tall condensed display face for the oversized headlines
 *                (used uppercase via CSS; weights 500/600)
 * - Manrope    → clean sans-serif body copy and UI
 * - Plex Mono  → technical metadata only (protocol names, dates, CAN IDs,
 *                firmware versions — never body paragraphs)
 */
export const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-oswald",
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});
