import { experience } from "@/data/experience";

export function ExperienceList() {
  return (
    <ol className="flex list-none flex-col gap-10">
      {experience.map((entry) => (
        <li key={`${entry.period}-${entry.role}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="type-card-title">{entry.role}</h3>
            <p className="type-meta text-accent">{entry.period}</p>
          </div>
          <p className="mt-1 text-sm font-medium text-foreground-muted">
            {entry.organisation}
            {entry.location ? ` · ${entry.location}` : ""}
          </p>
          <p className="mt-3 max-w-prose text-sm text-foreground-muted">
            {entry.description}
          </p>
          <ul className="mt-3 flex list-none flex-col gap-2">
            {entry.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-3 text-sm text-foreground-muted"
              >
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-px w-4 shrink-0 bg-accent"
                />
                {highlight}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
