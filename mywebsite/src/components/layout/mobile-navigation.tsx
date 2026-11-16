"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Avatar } from "@/components/ui/avatar";
import { contactNavItem, navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { exitTransition, sheetVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation: a floating rounded panel, matching the design
 * reference, not a full-bleed sheet.
 *
 * The panel is rendered through a PORTAL to <body> on purpose. The header
 * pill carries both `backdrop-blur` and a `transform`, and either one makes
 * that pill the containing block for `position: fixed` descendants, which
 * silently collapsed this panel to the size of the pill. Portalling out
 * keeps the panel anchored to the viewport no matter what styles the
 * header grows later.
 *
 * Accessibility is unchanged: focus trap, Escape to close, body scroll
 * lock, focus returned to the trigger, and closes on navigation.
 */
export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Body scroll lock + Escape + focus management while open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const firstLink = panelRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      // Simple focus trap: keep Tab cycling inside the panel.
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const panel = (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-100 md:hidden">
          {/* Transparent click-catcher: tapping outside closes the panel
              without dimming the page, as in the reference. */}
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={close}
            className="absolute inset-0 h-full w-full cursor-default"
          />

          <motion.div
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            variants={reduceMotion ? undefined : sheetVariants}
            initial={reduceMotion ? { opacity: 0 } : "hidden"}
            animate={reduceMotion ? { opacity: 1 } : "visible"}
            exit={
              reduceMotion ? { opacity: 0, transition: exitTransition } : "exit"
            }
            // Grows from the hamburger that opened it (top-right of the
            // header pill) rather than from its own centre.
            style={{ transformOrigin: "top right" }}
            className="absolute inset-x-3 top-3 rounded-[1.75rem] border border-border bg-surface p-4 shadow-card"
          >
            {/* Top row mirrors the closed pill: avatar left, close right */}
            <div className="flex items-center justify-between">
              <Avatar size={44} />
              <button
                type="button"
                onClick={close}
                aria-label="Close navigation menu"
                className="inline-flex size-11 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform duration-160 ease-out-strong active:scale-[0.94]"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            <ul className="mt-6 flex flex-col items-center gap-1">
              {navigation.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href} className="w-full">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-13 items-center justify-center rounded-2xl text-base font-medium transition-colors duration-160 ease-out-strong",
                        active
                          ? "bg-surface-muted text-foreground"
                          : "text-foreground-muted",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href={contactNavItem.href}
              onClick={() => setOpen(false)}
              className="mt-4 flex min-h-13 items-center justify-center rounded-full bg-accent px-6 text-base font-semibold text-accent-foreground transition-transform duration-160 ease-out-strong active:scale-[0.98]"
            >
              {contactNavItem.label}
            </Link>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              {profile.availability.available && (
                <p className="type-meta flex items-center gap-2 text-foreground-muted">
                  <span className="relative inline-flex size-2 rounded-full bg-success status-dot" />
                  {profile.availability.shortLabel}
                </p>
              )}
              <ThemeToggle />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => (open ? close() : setOpen(true))}
        className="relative inline-flex size-10 items-center justify-center rounded-full bg-control text-control-foreground transition-transform duration-160 ease-out-strong active:scale-[0.94]"
      >
        <Menu
          aria-hidden="true"
          className={cn(
            "absolute inset-0 m-auto size-5 transition-[opacity,rotate] duration-140 ease-out-strong",
            open ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
          )}
        />
        <X
          aria-hidden="true"
          className={cn(
            "absolute inset-0 m-auto size-5 transition-[opacity,rotate] duration-140 ease-out-strong",
            open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
          )}
        />
      </button>

      {/* `document` is absent during SSR. The panel is closed on first
          paint either way, so both server and client render nothing here
          and hydration stays in step. */}
      {typeof document !== "undefined" &&
        createPortal(panel, document.body)}
    </div>
  );
}