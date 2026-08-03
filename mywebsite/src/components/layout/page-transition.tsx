import type { ReactNode } from "react";

/**
 * Route-level transition wrapper. Used by app/template.tsx, which remounts
 * on every navigation, so the CSS mount animation (.page-enter) doubles as
 * a page transition — no JavaScript, interruption-safe, reduced-motion aware.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
