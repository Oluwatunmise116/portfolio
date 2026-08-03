"use client";

import { Check, Link as LinkIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** Copies the article URL. Quiet confirmation, no floating share bars. */
export function ShareLink() {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — select-and-copy from the address bar instead.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-11 items-center gap-2 text-sm text-foreground-muted transition-colors duration-160 ease-out-strong hover:text-accent active:scale-[0.98]"
    >
      {copied ? (
        <Check aria-hidden="true" className="size-4 text-success" />
      ) : (
        <LinkIcon aria-hidden="true" className="size-4" />
      )}
      {copied ? "Link copied" : "Copy link"}
      <span aria-live="polite" className="sr-only">
        {copied ? "Article link copied to clipboard" : ""}
      </span>
    </button>
  );
}
