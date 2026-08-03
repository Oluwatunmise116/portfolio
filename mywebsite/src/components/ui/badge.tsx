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
        "type-meta inline-flex items-center rounded-xs px-2 py-1",
        tone === "neutral" && "bg-background-subtle text-foreground-muted",
        tone === "accent" && "bg-accent-soft text-accent",
        tone === "outline" && "border border-border text-foreground-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
