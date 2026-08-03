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
      className="inline-flex size-10 items-center justify-center rounded-sm text-foreground-muted transition-colors duration-160 ease-out-strong hover:text-foreground active:scale-[0.96]"
    >
      <Sun aria-hidden="true" className="hidden size-[18px] dark:block" />
      <Moon aria-hidden="true" className="size-[18px] dark:hidden" />
    </button>
  );
}
