import { Antonio, IBM_Plex_Mono, Inter } from "next/font/google";

/**
 * Typography system:
 * - Antonio    → tall, tightly condensed display face for the oversized
 *                uppercase headlines and section titles (400 for labels
 *                and list headings, 700 for titles)
 * - Inter      → body copy and UI
 * - Plex Mono  → technical metadata only (protocol names, dates, CAN IDs,
 *                firmware versions — never body paragraphs)
 *
 * Antonio and Inter are both variable fonts, so no weight list is needed.
 */
export const antonio = Antonio({
  subsets: ["latin"],
  variable: "--font-antonio",
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
