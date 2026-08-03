import type { ComponentPropsWithRef } from "react";

import { fieldClasses } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type TextareaProps = ComponentPropsWithRef<"textarea">;

export function Textarea({ className, rows = 6, ...props }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className={cn(fieldClasses, "min-h-36 resize-y", className)}
      {...props}
    />
  );
}
