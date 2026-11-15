"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Avatar } from "@/components/ui/avatar";
import { contactNavItem, navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** Scroll movement smaller than this is treated as jitter, not intent. */
const DIRECTION_THRESHOLD = 6;
/** The pill never collapses this close to the top of the page. */
const COLLAPSE_AFTER = 160;

/** Shared open/close animation for the two halves of the pill. */
const SLIDE =
  "hidden transition-[grid-template-columns,opacity] duration-500 ease-spring md:grid";

/**
 * Floating pill navigation: centered near the top of the viewport, avatar
 * at the left, filled Contact button at the right. The active-page pill
 * slides between items via a shared layout animation.
 *
 * On desktop the pill gets out of the way while you read: scrolling down
 * collapses it to the avatar plus an availability note, and scrolling up
 * (or focusing it with the keyboard) opens it again.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < DIRECTION_THRESHOLD) return;
      lastY = y;
      setCollapsed(delta > 0 && y > COLLAPSE_AFTER);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A new page always starts with the full navigation showing.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setCollapsed(false);
  }

  return (
    <header
      className="print-hidden pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4"
      // Keyboard users must never land on a link that is collapsed away.
      onFocusCapture={() => setCollapsed(false)}
    >
      <div className="pointer-events-auto mt-4 flex w-full max-w-fit items-center rounded-full border border-border bg-nav py-1.5 pr-1.5 pl-2 shadow-pill backdrop-blur-md">
        {/* Avatar / wordmark */}
        <Link
          href="/"
          aria-label={`${profile.shortName} — home`}
          className="mr-1 flex shrink-0 items-center gap-2 rounded-full"
        >
          <Avatar size={36} slot="navLogo" />
        </Link>

        {/* Desktop: links + Contact. Collapses to zero width on scroll
            down. The inner wrapper's padding (cancelled by the negative
            margin) leaves room for focus rings inside the clip. */}
        <div
          className={cn(
            SLIDE,
            collapsed
              ? "grid-cols-[0fr] opacity-0"
              : "grid-cols-[1fr] opacity-100",
          )}
          inert={collapsed}
        >
          <div className="-my-1.5 flex min-w-0 items-center overflow-hidden py-1.5">
            <nav aria-label="Main navigation">
              <ul className="flex items-center">
                {navigation.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href} className="relative">
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className="roll-trigger relative z-10 inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium text-foreground"
                      >
                        <span className="roll">
                          <span className="roll-inner">
                            <span className="roll-face">{item.label}</span>
                            <span
                              aria-hidden="true"
                              className="roll-face roll-face-alt"
                            >
                              {item.label}
                            </span>
                          </span>
                        </span>
                      </Link>
                      {active && (
                        <motion.span
                          aria-hidden="true"
                          layoutId="nav-active-pill"
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 500, damping: 40 }
                          }
                          className="absolute inset-0 rounded-full bg-surface-muted"
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Filled Contact button */}
            <Link
              href={contactNavItem.href}
              className={cn(
                "mr-px ml-2 inline-flex min-h-10 shrink-0 items-center rounded-full bg-control px-6 text-sm font-medium text-control-foreground transition-[scale,opacity] duration-160 ease-out-strong hover:opacity-85 active:scale-[0.97]",
                isActive(pathname, contactNavItem.href) && "opacity-85",
              )}
            >
              {contactNavItem.label}
            </Link>
          </div>
        </div>

        {/* Desktop: what the pill shrinks to while scrolling down.
            Pressing it brings the navigation back. */}
        <div
          className={cn(
            SLIDE,
            collapsed
              ? "grid-cols-[1fr] opacity-100"
              : "grid-cols-[0fr] opacity-0",
          )}
          inert={!collapsed}
        >
          <div className="min-w-0 overflow-hidden">
            <button
              type="button"
              onClick={() => setCollapsed(false)}
              aria-label="Show navigation"
              className="flex min-h-10 items-center gap-2.5 rounded-full pr-3.5 pl-1.5 text-sm font-medium whitespace-nowrap text-foreground"
            >
              {profile.availability.available ? (
                <>
                  {profile.availability.shortLabel}
                  <span className="status-dot relative inline-flex size-2 shrink-0 rounded-full" />
                </>
              ) : (
                profile.shortName
              )}
            </button>
          </div>
        </div>

        {/* Mobile: name + menu button */}
        <span className="px-1 font-display text-base font-bold tracking-wide uppercase md:hidden">
          {profile.shortName}
        </span>
        <MobileNavigation />
      </div>
    </header>
  );
}
