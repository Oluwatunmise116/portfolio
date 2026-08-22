"use client";

import { Moon, Sun } from "lucide-react";

/**
 * Two-state theme switch. The OS preference is the default (applied by the
 * inline script in layout.tsx); toggling stores an explicit choice.
 * Icon visibility is CSS-driven (dark: variants), so there is no hydration
 * mismatch and no flash.
 */
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const dark = !root.classList.contains("dark");
    root.classList.toggle("dark", dark);
    try {
      window.localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // Storage unavailable (private mode) — the toggle still works for the session.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className="relative inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-[color,scale] duration-160 ease-out-strong hover:text-foreground active:scale-[0.94]"
    >
      <Sun
        aria-hidden="true"
        className="absolute inset-0 m-auto size-[18px] rotate-90 opacity-0 transition-[opacity,rotate] duration-180 ease-out-strong dark:rotate-0 dark:opacity-100"
      />
      <Moon
        aria-hidden="true"
        className="absolute inset-0 m-auto size-[18px] rotate-0 opacity-100 transition-[opacity,rotate] duration-180 ease-out-strong dark:-rotate-90 dark:opacity-0"
      />
    </button>
  );
}
