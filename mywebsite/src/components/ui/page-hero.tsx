import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  /** Oversized editorial page title, rendered uppercase. */
  title: string;
  /** Small mono eyebrow above the title. */
  eyebrow?: string;
  /** Lead paragraph under the title. */
  lead?: string;
  className?: string;
  children?: ReactNode;
};

/**
 * Interior page opener: clears the fixed pill navigation and sets the
 * oversized condensed title every page shares. Entrance uses the same CSS
 * rise as the home hero (visible without JS, disabled under reduced motion).
 */
export function PageHero({
  title,
  eyebrow,
  lead,
  className,
  children,
}: PageHeroProps) {
  return (
    <Container className={cn("pt-32 pb-14 md:pt-40 md:pb-20", className)}>
      {eyebrow && (
        <p
          className="type-label hero-rise mb-4 text-foreground-muted"
          style={{ "--rise-delay": "0ms" } as React.CSSProperties}
        >
          {eyebrow}
        </p>
      )}
      <h1
        className="type-page-title hero-rise"
        style={{ "--rise-delay": "60ms" } as React.CSSProperties}
      >
        {title}
      </h1>
      {lead && (
        <p
          className="hero-rise mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted"
          style={{ "--rise-delay": "140ms" } as React.CSSProperties}
        >
          {lead}
        </p>
      )}
      {children}
    </Container>
  );
}
