import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/types/project";

/**
 * Editorial numbered row (wireframe 1c). Desktop hover brightens the
 * thumbnail, tints the number, and nudges the arrow; on touch/mobile the
 * compact image and all metadata are simply visible — nothing hides
 * behind hover.
 */
export function ProjectRow({ project }: { project: Project }) {
  return (
    <li className="border-b border-border first:border-t">
      <Link
        href={`/projects/${project.slug}`}
        className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-3 py-5 transition-colors duration-220 ease-out-strong sm:gap-x-6 md:grid-cols-[3.5rem_minmax(0,1fr)_auto_9rem_auto] md:py-6 hover:bg-surface-hover"
      >
        <span
          aria-hidden="true"
          className="type-meta pl-1 text-foreground-muted transition-colors duration-160 ease-out-strong group-hover:text-accent md:pl-2"
        >
          {project.number}
        </span>

        <span className="min-w-0">
          <span className="type-card-title block transition-colors duration-160 ease-out-strong group-hover:text-accent">
            {project.title}
          </span>
          <span className="mt-1 block text-sm text-foreground-muted">
            {project.summary}
          </span>
          <span className="type-meta mt-2 flex flex-wrap gap-x-3 gap-y-1 text-foreground-muted md:hidden">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </span>
        </span>

        <span className="hidden flex-col items-end gap-1 md:flex">
          <span className="type-meta text-foreground-muted">
            {project.category}
          </span>
          <span className="type-meta text-foreground-muted">
            {project.year}
          </span>
          <span className="type-meta hidden max-w-44 truncate text-foreground-muted/70 xl:block">
            {project.technologies.slice(0, 3).join(" · ")}
          </span>
        </span>

        {/* Thumbnail: dimmed at rest, revealed on hover (desktop); a compact
            always-visible image inside the row on mobile */}
        <span className="relative row-start-2 col-start-2 block aspect-[4/3] w-40 overflow-hidden rounded-sm border border-border md:row-start-auto md:col-start-auto md:w-36 md:opacity-70 md:saturate-[0.6] md:transition-[opacity,filter,transform] md:duration-220 md:ease-out-strong md:group-hover:opacity-100 md:group-hover:saturate-100 md:group-hover:scale-[1.02]">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 768px) 144px, 100vw"
            className="object-cover"
          />
        </span>

        <ArrowUpRight
          aria-hidden="true"
          className="size-5 justify-self-end text-foreground-muted transition-[transform,color] duration-160 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
        />
      </Link>
    </li>
  );
}
