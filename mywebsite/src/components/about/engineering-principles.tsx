import { engineeringPrinciples } from "@/data/skills";

export function EngineeringPrinciples() {
  return (
    <ol className="grid list-none gap-6 md:grid-cols-2 lg:gap-8">
      {engineeringPrinciples.map((principle, i) => (
        <li key={principle.title} className="border-t-2 border-accent/60 pt-4">
          <p className="type-meta text-foreground-muted">
            P-{String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="type-card-title mt-2">{principle.title}</h3>
          <p className="mt-2 text-sm text-foreground-muted">
            {principle.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}
