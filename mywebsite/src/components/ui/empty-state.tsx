import { CircuitBoard } from "lucide-react";
import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 border border-dashed border-border-strong px-6 py-16 text-center">
      <CircuitBoard
        aria-hidden="true"
        className="size-6 text-foreground-muted"
      />
      <p className="type-card-title">{title}</p>
      <p className="max-w-sm text-sm text-foreground-muted">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
