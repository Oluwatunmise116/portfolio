"use client";

import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, type ContactDelivery } from "@/lib/validation";

/**
 * Replaces the form after a successful submission.
 *
 * The copy depends on what actually happened. When no backend is
 * configured the message was handed to the visitor's email client, not
 * delivered — saying "message received" there would be false, and the
 * visitor would never follow up on an enquiry that never arrived.
 */
export function ContactSuccess({
  delivery,
  onReset,
}: {
  delivery: ContactDelivery;
  onReset: () => void;
}) {
  const sent = delivery === "sent";

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface px-6 py-14 text-center">
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

      {sent ? (
        <>
          <p className="type-card-title">
            Message received. Thank you for reaching out.
          </p>
          <p className="max-w-sm text-sm text-foreground-muted">
            I read everything that comes through here and usually reply within
            a couple of days.
          </p>
        </>
      ) : (
        <>
          <p className="type-card-title">Your email client should now be open</p>
          <p className="max-w-md text-sm leading-relaxed text-foreground-muted">
            Your message has been composed with the details you entered — send
            it from there and it will reach me. If nothing opened, email me
            directly at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-foreground underline decoration-border-strong underline-offset-4 transition-colors duration-160 ease-out-strong hover:text-accent hover:decoration-accent"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </>
      )}

      <Button variant="secondary" className="mt-2" onClick={onReset}>
        Write another message
      </Button>
    </div>
  );
}
