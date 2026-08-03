import { timeline } from "@/data/experience";

/**
 * Editorial vertical timeline. An ordered list (chronology is meaningful),
 * with a rail + node treatment on desktop and a simple stack on mobile.
 */
export function CareerTimeline() {
  return (
    <ol className="relative flex list-none flex-col gap-10 md:gap-12 md:border-l md:border-border md:pl-10">
      {timeline.map((entry) => (
        <li key={`${entry.period}-${entry.role}`} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-2 -left-10 hidden size-2 -translate-x-1/2 rounded-full border-2 border-accent bg-background md:block"
          />
          <p className="type-meta text-accent">{entry.period}</p>
          <h3 className="type-card-title mt-2">{entry.role}</h3>
          <p className="mt-1 text-sm font-medium text-foreground-muted">
            {entry.organisation}
          </p>
          <p className="mt-2 max-w-prose text-sm text-foreground-muted">
            {entry.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
