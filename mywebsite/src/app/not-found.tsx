import { ArrowLeft } from "lucide-react";

import { LinkButton } from "@/components/ui/link-button";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="grid-bg absolute inset-0" />
      <div className="relative mx-auto flex min-h-[60svh] w-full max-w-320 flex-col items-center justify-center px-5 py-24 text-center">
        <p className="type-meta text-accent">ERR 404 — NO ROUTE</p>
        <h1 className="type-page-title mt-4">
          This route seems to be disconnected.
        </h1>
        <p className="mt-4 max-w-md text-foreground-muted">
          The address may have been mistyped, or the page has been rewired to a
          new location. The bus is still up — head back to the start.
        </p>
        <svg
          aria-hidden="true"
          viewBox="0 0 320 40"
          className="mt-8 w-64 text-foreground-muted/40"
          fill="none"
        >
          <path
            d="M0 20 H90 V8 H130 V32 H170 V20 H210"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M226 20 h6 m8 0 h6 m8 0 h6 m8 0 h6 m8 0 h6 m8 0 h6"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="214" cy="20" r="3" fill="currentColor" />
        </svg>
        <div className="mt-10">
          <LinkButton href="/" variant="primary">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to Home
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
