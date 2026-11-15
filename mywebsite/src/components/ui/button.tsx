import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";

/**
 * Shared style recipe so <Button> and <LinkButton> stay identical.
 * Press feedback: scale(0.98) on :active — subtle, 160ms, transform-only.
 *
 * - primary    filled accent pill
 * - secondary  outlined pill with a condensed uppercase label; on hover
 *              the accent floods in from the bottom-left corner
 *              (`.btn-fill` in globals.css) and the label inverts
 * - ghost      text only
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
    "inline-flex min-h-12 items-center justify-center gap-2 px-7",
    "rounded-full transition-[scale,background-color,border-color,color] ease-out-strong",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    variant === "primary" &&
      "bg-accent text-sm font-semibold text-accent-foreground duration-160 hover:bg-accent-hover",
    variant === "secondary" &&
      "btn-fill border border-accent font-display text-lg tracking-wide text-accent uppercase duration-300 hover:text-accent-foreground",
    variant === "ghost" &&
      "px-2 text-sm font-semibold text-foreground-muted duration-160 hover:text-accent",
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
