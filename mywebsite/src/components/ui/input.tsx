import type { ComponentPropsWithRef } from "react";

import { cn } from "@/lib/utils";

export const fieldClasses = cn(
  "w-full rounded-sm border border-border-strong bg-surface px-3.5 py-2.5 text-base text-foreground",
  "placeholder:text-foreground-muted/60",
  "transition-[border-color,box-shadow] duration-160 ease-out-strong",
  "hover:border-foreground-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-focus-ring/30",
  "aria-invalid:border-error aria-invalid:focus:ring-error/25",
  "disabled:pointer-events-none disabled:opacity-50",
);

type InputProps = ComponentPropsWithRef<"input">;

export function Input({ className, ...props }: InputProps) {
  return <input className={cn(fieldClasses, className)} {...props} />;
}
