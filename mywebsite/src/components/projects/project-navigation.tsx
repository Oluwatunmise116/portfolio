import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type NavTarget = {
  href: string;
  label: string;
  title: string;
} | null;

/** Previous / next pagination used by project and article detail pages. */
export function PrevNextNavigation({
  previous,
  next,
  ariaLabel,
}: {
  previous: NavTarget;
  next: NavTarget;
  ariaLabel: string;
}) {
  return (
    <nav aria-label={ariaLabel} className="border-t border-border">
      <div className="grid sm:grid-cols-2">
        {previous ? (
          <Link
            href={previous.href}
            className="group flex flex-col gap-1 border-b border-border p-5 transition-colors duration-220 ease-out-strong hover:bg-surface-hover sm:border-r sm:border-b-0 md:p-6"
          >
            <span className="type-meta flex items-center gap-2 text-foreground-muted">
              <ArrowLeft
                aria-hidden="true"
                className="size-4 transition-transform duration-160 ease-out-strong group-hover:-translate-x-0.5"
              />
              {previous.label}
            </span>
            <span className="type-card-title transition-colors duration-160 ease-out-strong group-hover:text-accent">
              {previous.title}
            </span>
          </Link>
        ) : (
          <div aria-hidden="true" className="hidden sm:block" />
        )}

        {next && (
          <Link
            href={next.href}
            className={cn(
              "group flex flex-col items-end gap-1 p-5 text-right transition-colors duration-220 ease-out-strong hover:bg-surface-hover md:p-6",
            )}
          >
            <span className="type-meta flex items-center gap-2 text-foreground-muted">
              {next.label}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-160 ease-out-strong group-hover:translate-x-0.5"
              />
            </span>
            <span className="type-card-title transition-colors duration-160 ease-out-strong group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
