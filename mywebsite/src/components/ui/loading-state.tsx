import { cn } from "@/lib/utils";

type LoadingStateProps = {
  label?: string;
  className?: string;
};

/** Compact inline spinner. Fast rotation reads as fast loading. */
export function LoadingState({
  label = "Loading",
  className,
}: LoadingStateProps) {
  return (
    <span
      role="status"
      className={cn("inline-flex items-center gap-2 text-sm", className)}
    >
      <span
        aria-hidden="true"
        className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
      />
      {label}
    </span>
  );
}
