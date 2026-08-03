"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "print-hidden sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-220 ease-out-strong",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-320 items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="flex items-baseline gap-2 font-display text-base font-semibold tracking-tight"
        >
          {profile.name}
          <span aria-hidden="true" className="type-meta text-accent">
            /eng
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative px-3 py-2 text-sm transition-colors duration-160 ease-out-strong",
                      active
                        ? "font-medium text-foreground"
                        : "text-foreground-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-220 ease-out-strong",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          {profile.availability.available && (
            <p className="type-meta mr-2 hidden items-center gap-2 text-foreground-muted lg:flex">
              <span className="relative inline-flex size-2 rounded-full bg-success status-dot" />
              {profile.availability.label}
            </p>
          )}
          <ThemeToggle />
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
