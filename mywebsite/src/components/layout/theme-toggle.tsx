"use client";

import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

/**
 * Two-state theme switch, drawn as a small sliding toggle. The OS
 * preference is the default (applied by the inline script in layout.tsx);
 * toggling stores an explicit choice.
 *
 * The knob position is CSS-driven (`dark:` variants), so there is no
 * hydration mismatch and no flash. The visible track is only 40×20, so
 * the button itself is padded out to a 44px touch target around it.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
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
      className={cn(
        "group inline-flex min-h-11 min-w-11 items-center justify-center rounded-full",
        className,
      )}
    >
      <span className="relative block h-5 w-10 rounded-full bg-accent transition-[scale] duration-160 ease-out-strong group-active:scale-[0.94]">
        <span className="absolute top-[3px] left-[3px] size-3.5 rounded-full bg-background transition-transform duration-400 ease-spring dark:translate-x-5" />
      </span>
    </button>
  );
}

/**
 * The switch pinned to the bottom centre of every page, so the theme can
 * be changed from anywhere without scrolling back to the top.
 *
 * Desktop only: on a phone it would float over the text being read, and
 * the mobile menu already carries its own switch.
 */
export function ThemeDock() {
  return (
    <div className="print-hidden pointer-events-none fixed inset-x-0 bottom-3 z-40 hidden justify-center md:flex">
      <ThemeToggle className="pointer-events-auto" />
    </div>
  );
}
