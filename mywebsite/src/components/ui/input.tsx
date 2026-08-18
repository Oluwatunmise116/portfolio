import type { ComponentPropsWithRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Shared field recipe for Input, Textarea and Select so all three stay
 * identical in height, radius, and focus treatment.
 *
 * `min-h-12` keeps every control at a 48px touch target. The radius sits
 * between the site's pill buttons and its rounded-2xl cards.
 */
export const fieldClasses = cn(
  "w-full min-h-12 rounded-xl border border-border-strong bg-surface px-4 py-3 text-base text-foreground",
  "placeholder:text-foreground-muted/70",
  "transition-[border-color,box-shadow] duration-160 ease-out-strong",
  "hover:border-foreground-muted",
  "focus:border-accent focus:ring-2 focus:ring-focus-ring/30 focus:outline-none",
  "aria-invalid:border-error aria-invalid:focus:ring-error/25",
  "disabled:pointer-events-none disabled:opacity-50",
);

type InputProps = ComponentPropsWithRef<"input">;

export function Input({ className, ...props }: InputProps) {
  return <input className={cn(fieldClasses, className)} {...props} />;
}