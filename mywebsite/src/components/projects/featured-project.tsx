import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import type { Project } from "@/types/project";

/** Large featured project block (wireframe 1f) — image plus a spec panel. */
export function FeaturedProject({
  project,
  headingLevel = "h3",
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <article className="grid overflow-hidden rounded-sm border border-border lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <div className="relative aspect-video lg:aspect-auto lg:min-h-105">
        <Image
          src={project.image}
          alt={`Placeholder artwork for ${project.title}`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-border bg-surface p-6 md:p-8 lg:border-t-0 lg:border-l">
        <p className="type-meta flex items-center gap-3 text-foreground-muted">
          <span className="text-accent">{project.number}</span>
          FEATURED · {project.year}
        </p>
        <Heading className="type-section-title">{project.title}</Heading>
        <p className="text-sm text-foreground-muted">{project.problem}</p>

        <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-4">
          <div>
            <dt className="type-label text-foreground-muted">Role</dt>
            <dd className="mt-1 text-sm">{project.role.split("—")[0]}</dd>
          </div>
          <div>
            <dt className="type-label text-foreground-muted">Status</dt>
            <dd className="mt-1 text-sm">{project.status}</dd>
          </div>
          <div className="col-span-2">
            <dt className="type-label text-foreground-muted">Outcome</dt>
            <dd className="mt-1 text-sm text-foreground-muted">
              {project.results[0]}
            </dd>
          </div>
        </dl>

        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.technologies.slice(0, 6).map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-2">
          <LinkButton href={`/projects/${project.slug}`} variant="primary">
            View case study
            <ArrowRight aria-hidden="true" className="size-4" />
          </LinkButton>
        </div>
      </div>
    </article>
  );
}
