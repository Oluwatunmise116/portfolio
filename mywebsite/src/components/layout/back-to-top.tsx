"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const scrollToTop = () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="inline-flex min-h-11 items-center gap-2 text-sm text-foreground-muted transition-[color,scale] duration-160 ease-out-strong hover:text-accent active:scale-[0.98]"
    >
      Back to top
      <ArrowUp aria-hidden="true" className="size-4" />
    </button>
  );
}
