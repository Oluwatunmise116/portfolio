"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { contactNavItem, navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { exitTransition, sheetVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation sheet, opened from the pill header. Keeps the original
 * accessibility behaviour: focus trap, Escape to close, body scroll lock,
 * focus returned to the trigger, and large touch targets.
 */
export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const sheetRef = useRef<HTMLDivElement>(null);
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

    const firstLink = sheetRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !sheetRef.current) return;

      // Simple focus trap: keep Tab cycling inside the sheet.
      const focusable = Array.from(
        sheetRef.current.querySelectorAll<HTMLElement>(
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

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => (open ? close() : setOpen(true))}
        className="inline-flex size-10 items-center justify-center rounded-full bg-control text-control-foreground transition-transform duration-160 ease-out-strong active:scale-[0.94]"
      >
        {open ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={sheetRef}
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
            className="fixed inset-x-0 top-0 bottom-0 z-40 flex flex-col overflow-y-auto bg-background px-6 pt-24 pb-10"
          >
            <ul className="flex flex-col">
              {navigation.map((item, index) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href} className="border-b border-border">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-16 items-center justify-between py-3 font-display text-3xl font-medium tracking-wide uppercase transition-colors duration-160 ease-out-strong",
                        active ? "text-accent" : "text-foreground",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="type-meta text-foreground-muted"
                      >
                        0{index + 1}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-col gap-5">
              <Link
                href={contactNavItem.href}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-13 items-center justify-center rounded-full bg-control px-6 text-base font-semibold text-control-foreground transition-transform duration-160 ease-out-strong active:scale-[0.98]"
              >
                {contactNavItem.label}
              </Link>
              <div className="flex items-center justify-between">
                {profile.availability.available && (
                  <p className="type-meta flex items-center gap-2 text-foreground-muted">
                    <span className="relative inline-flex size-2 rounded-full bg-success status-dot" />
                    {profile.availability.label}
                  </p>
                )}
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
