import { ChevronDown } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

import { fieldClasses } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SelectProps = ComponentPropsWithRef<"select">;

/**
 * Native select with a custom trigger.
 *
 * Deliberately still a real `<select>`: the browser's own dropdown brings
 * correct keyboard behaviour, type-ahead, screen-reader semantics, and the
 * native wheel picker on mobile — all of which a hand-built listbox would
 * have to re-implement and would likely do worse. The option list is
 * themed via `color-scheme` and the `select option` rules in globals.css.
 */
export function Select({ className, children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          fieldClasses,
          "cursor-pointer appearance-none pr-11",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-foreground-muted"
      />
    </div>
  );
}
