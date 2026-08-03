"use client";

import { Button } from "@/components/ui/button";

/** Replaces the form after a successful submission. Quiet by design. */
export function ContactSuccess({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-sm border border-border bg-surface px-6 py-14 text-center">
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        className="size-12 text-success"
        fill="none"
      >
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.3"
        />
        <path
          className="check-draw"
          pathLength="1"
          d="M15 24.5 L21.5 31 L33 18.5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="type-card-title">
        Message received. Thank you for reaching out.
      </p>
      <p className="max-w-sm text-sm text-foreground-muted">
        I read everything that comes through here and usually reply within a
        couple of days.
      </p>
      <Button variant="secondary" className="mt-2" onClick={onReset}>
        Send another message
      </Button>
    </div>
  );
}
