import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/** Site-wide content width: 1280px max with responsive gutters. */
export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-320 px-5 sm:px-8 lg:px-12",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
