import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { CustomCursor } from "@/components/layout/custom-cursor";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ThemeDock } from "@/components/layout/theme-toggle";
import { SITE_DESCRIPTION, SITE_TITLE_SUFFIX, SITE_URL } from "@/lib/constants";
import { antonio, inter, plexMono } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE_SUFFIX,
    template: `%s | ${SITE_TITLE_SUFFIX}`,
  },
  description: SITE_DESCRIPTION,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1b" },
  ],
};

/**
 * Applies the stored (or OS-preferred) theme before first paint to prevent
 * a flash of the wrong theme. Runs once, inline, before hydration.
 */
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${antonio.variable} ${inter.variable} ${plexMono.variable} flex min-h-svh flex-col antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only z-100 rounded-sm bg-accent px-4 py-2 text-sm font-medium text-accent-foreground focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3"
        >
          Skip to main content
        </a>
        <SmoothScroll />
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <ThemeDock />
        <CustomCursor />
      </body>
    </html>
  );
}
