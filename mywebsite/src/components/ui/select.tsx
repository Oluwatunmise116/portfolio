import { ChevronDown } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

import { fieldClasses } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SelectProps = ComponentPropsWithRef<"select">;

/** Native select styled to match the other fields — no custom dropdown. */
export function Select({ className, children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(fieldClasses, "appearance-none pr-10", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-foreground-muted"
      />
    </div>
  );
}
