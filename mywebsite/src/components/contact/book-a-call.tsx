import { ArrowUpRight, CalendarClock } from "lucide-react";

import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/**
 * "Book a call" button on the contact page.
 *
 * A direct link to the scheduling page rather than Calendly's embed
 * widget: the embed pulls ~100 KB of third-party JavaScript plus an
 * iframe onto a page most visitors will use the form on, and the iframe's
 * accessibility and theming are outside this codebase's control. A plain
 * anchor costs nothing, works without JavaScript, and lands the visitor
 * in the same booking flow.
 *
 * Renders nothing when `profile.booking.url` is empty.
 */
export function BookACall({ className }: { className?: string }) {
  const { url, durationMinutes } = profile.booking;
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex min-h-12 items-center gap-2.5 rounded-full bg-control px-6 text-sm font-semibold text-control-foreground",
        "transition-transform duration-160 ease-out-strong hover:opacity-90 active:scale-[0.98]",
        className,
      )}
    >
      <CalendarClock aria-hidden="true" className="size-4" />
      Book a {durationMinutes}-minute call
      <ArrowUpRight
        aria-hidden="true"
        className="size-4 transition-transform duration-160 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
      <span className="sr-only">(opens the scheduling page in a new tab)</span>
    </a>
  );
}