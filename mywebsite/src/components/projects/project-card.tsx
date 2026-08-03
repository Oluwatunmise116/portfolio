import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/project";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-border bg-surface transition-colors duration-220 ease-out-strong hover:border-border-strong">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border">
        <Image
          src={project.image}
          alt={`Placeholder artwork for ${project.title}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-320 ease-out-strong group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="type-meta flex items-center justify-between text-foreground-muted">
          <span>
            <span className="text-accent">{project.number}</span> ·{" "}
            {project.category}
          </span>
          <span>{project.year}</span>
        </p>

        <h3 className="type-card-title">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors duration-160 ease-out-strong after:absolute after:inset-0 group-hover:text-accent"
          >
            {project.title}
          </Link>
        </h3>

        <p className="text-sm text-foreground-muted">{project.summary}</p>

        <ul
          className="mt-auto flex flex-wrap gap-1.5 pt-2"
          aria-label="Technologies"
        >
          {project.technologies.slice(0, 3).map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
          <li>
            <Badge tone="accent">{project.status}</Badge>
          </li>
        </ul>

        <p className="flex items-center justify-between border-t border-border pt-3 text-sm text-foreground-muted">
          View project
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-160 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </p>
      </div>
    </article>
  );
}
