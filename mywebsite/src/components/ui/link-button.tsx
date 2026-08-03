import Link from "next/link";
import type { ReactNode } from "react";

import { buttonClasses, type ButtonVariant } from "@/components/ui/button";

type LinkButtonProps = {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  /** Set for downloads or external links. */
  download?: boolean;
  external?: boolean;
};

export function LinkButton({
  href,
  variant = "primary",
  className,
  children,
  download,
  external,
}: LinkButtonProps) {
  if (download || external) {
    return (
      <a
        href={href}
        download={download}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={buttonClasses(variant, className)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={buttonClasses(variant, className)}>
      {children}
    </Link>
  );
}
