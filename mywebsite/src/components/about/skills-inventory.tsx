import { Badge } from "@/components/ui/badge";
import { skillGroups } from "@/data/skills";

/** Skills grouped by discipline — edit everything in src/data/skills.ts. */
export function SkillsInventory() {
  return (
    <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((group) => (
        <section
          key={group.discipline}
          aria-label={group.discipline}
          className="bg-background p-6"
        >
          <h3 className="font-medium">{group.discipline}</h3>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {group.skills.map((skill) => (
              <li key={skill}>
                <Badge>{skill}</Badge>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
