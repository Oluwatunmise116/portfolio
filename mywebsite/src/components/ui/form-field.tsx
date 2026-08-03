import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  /** Error message; when set, render it under the field with the error id. */
  error?: string;
  /** id used by aria-describedby on the control: `${htmlFor}-error`. */
  hint?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Field wrapper: visible label, required/optional marker, and a field-level
 * error slot announced to screen readers.
 */
export function FormField({
  label,
  htmlFor,
  required,
  error,
  hint,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}{" "}
        {required ? (
          <span aria-hidden="true" className="text-accent">
            *
          </span>
        ) : (
          <span className="font-normal text-foreground-muted">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${htmlFor}-hint`} className="text-sm text-foreground-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${htmlFor}-error`} className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
