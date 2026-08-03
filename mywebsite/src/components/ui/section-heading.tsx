import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Technical index label, e.g. "01". */
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
};

/**
 * Section header with an engineering-annotation flavour: a monospace index,
 * an uppercase label, then the display-face title.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 md:mb-14", className)}>
      {(index || eyebrow) && (
        <p className="type-label mb-3 flex items-center gap-3 text-foreground-muted">
          {index && (
            <span aria-hidden="true" className="text-accent">
              {index}
            </span>
          )}
          {eyebrow}
        </p>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="type-section-title">{title}</h2>
        {children}
      </div>
      {description && (
        <p className="mt-4 max-w-xl text-foreground-muted">{description}</p>
      )}
    </div>
  );
}
