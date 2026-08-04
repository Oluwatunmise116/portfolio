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

/**
 * Floating pill navigation: centered near the top of the viewport, avatar
 * at the left, filled Contact button at the right. The active-page pill
 * slides between items via a shared layout animation. Shrinks slightly
 * once the page is scrolled.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="print-hidden pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4">
      <div
        className={cn(
          "pointer-events-auto mt-4 flex w-full max-w-fit items-center gap-1 rounded-full border border-border bg-surface/90 shadow-pill backdrop-blur-md transition-[padding,margin] duration-220 ease-out-strong",
          scrolled ? "mt-2.5 py-1 pr-1 pl-1.5" : "py-1.5 pr-1.5 pl-2",
        )}
      >
        {/* Avatar / wordmark */}
        <Link
          href="/"
          aria-label={`${profile.name} — home`}
          className="mr-1 flex shrink-0 items-center gap-2 rounded-full"
        >
          <Avatar size={36} />
        </Link>

        {/* Desktop items */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative z-10 inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium transition-colors duration-160 ease-out-strong",
                      active
                        ? "text-foreground"
                        : "text-foreground-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
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

        {/* Filled Contact button (desktop) */}
        <Link
          href={contactNavItem.href}
          className={cn(
            "ml-1 hidden min-h-10 items-center rounded-full bg-control px-5 text-sm font-semibold text-control-foreground transition-[transform,opacity] duration-160 ease-out-strong hover:opacity-85 active:scale-[0.97] md:inline-flex",
            isActive(pathname, contactNavItem.href) && "opacity-85",
          )}
        >
          {contactNavItem.label}
        </Link>

        {/* Mobile: name + menu button */}
        <span className="px-1 font-display text-sm font-semibold tracking-wide uppercase md:hidden">
          {profile.name}
        </span>
        <MobileNavigation />
      </div>
    </header>
  );
}
