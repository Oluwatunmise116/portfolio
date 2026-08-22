import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";

/**
 * Shared style recipe so <Button> and <LinkButton> stay identical.
 * Press feedback: scale(0.98) on :active — subtle, 160ms, transform-only.
 *
 * Note: Tailwind v4's `scale-*` utilities set the standalone CSS `scale`
 * property, not `transform` — a `transition-[transform,...]` list silently
 * does not animate it. The property list below names `scale` explicitly.
 */
export function buttonClasses(
  variant: ButtonVariant = "primary",
  className?: string,
): string {
  return cn(
    "inline-flex min-h-12 items-center justify-center gap-2 px-6 text-sm font-semibold",
    "rounded-full transition-[scale,background-color,border-color,color] duration-160 ease-out-strong",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    variant === "primary" &&
      "bg-accent text-accent-foreground hover:bg-accent-hover",
    variant === "secondary" &&
      "border border-border-strong bg-transparent text-foreground hover:bg-control hover:border-transparent hover:text-control-foreground",
    variant === "ghost" && "px-2 text-foreground-muted hover:text-accent",
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, className)}
      {...props}
    >
      {children}
    </button>
  );
}
