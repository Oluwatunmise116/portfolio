import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  tone?: "neutral" | "accent" | "outline";
  className?: string;
};

/** Small monospace tag used for technologies, categories, and statuses. */
export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "type-meta inline-flex items-center rounded-full px-2.5 py-1",
        tone === "neutral" && "bg-surface-muted text-foreground-muted",
        tone === "accent" && "bg-accent-soft text-accent",
        tone === "outline" && "border border-border text-foreground-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
