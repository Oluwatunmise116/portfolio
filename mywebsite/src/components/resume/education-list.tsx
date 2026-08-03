import { education } from "@/data/education";

export function EducationList() {
  return (
    <ul className="flex list-none flex-col gap-6">
      {education.map((entry) => (
        <li key={`${entry.period}-${entry.qualification}`}>
          <p className="type-meta text-accent">{entry.period}</p>
          <h3 className="mt-1 text-sm font-medium">{entry.qualification}</h3>
          <p className="mt-1 text-sm text-foreground-muted">
            {entry.institution}
          </p>
          {entry.detail && (
            <p className="mt-1 text-sm text-foreground-muted">{entry.detail}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
