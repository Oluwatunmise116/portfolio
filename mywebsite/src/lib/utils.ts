/** Join class names, dropping falsy values. Kept dependency-free on purpose. */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/** Format an ISO date (yyyy-mm-dd) for display, e.g. "12 Mar 2026". */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
