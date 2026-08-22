import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  tone?: "neutral" | "accent" | "outline";
  className?: string;
};

/**
 * Small monospace tag used for technologies, categories, and statuses.
 *
 * Rectangular with a small radius rather than a full pill — reads closer
 * to a spec-sheet label than a marketing chip, which fits the site's
 * engineering register. The accent tone carries a leading tick mark
 * instead of extra colour weight, so an "active" tag stays legible
 * without competing with real accent text on the page.
 */
export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "type-meta inline-flex items-center gap-1.5 rounded-[0.3rem] px-2.5 py-1",
        tone === "neutral" && "bg-surface-muted text-foreground-muted",
        tone === "accent" && "bg-accent-soft text-accent",
        tone === "outline" && "border border-border text-foreground-muted",
        className,
      )}
    >
      {tone === "accent" && (
        <span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-accent" />
      )}
      {children}
    </span>
  );
}
