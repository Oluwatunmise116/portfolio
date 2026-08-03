"use client";

import { useState } from "react";

import { ProjectCard } from "@/components/projects/project-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import {
  projectCategories,
  type Project,
  type ProjectCategory,
} from "@/types/project";
import { cn } from "@/lib/utils";

type Filter = "All" | ProjectCategory;

/**
 * Client-side category filtering. The grid is keyed by the active filter so
 * a change replays a short CSS entrance (see .filter-enter) — interruption
 * simply restarts the small fade, no layout thrash.
 */
export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("All");

  const filters: Filter[] = ["All", ...projectCategories];
  const visible =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2"
      >
        {filters.map((filter) => {
          const selected = filter === active;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(filter)}
              className={cn(
                "min-h-10 rounded-sm border px-4 text-sm transition-[background-color,border-color,color] duration-160 ease-out-strong active:scale-[0.98]",
                selected
                  ? "border-accent bg-accent-soft font-medium text-accent"
                  : "border-border text-foreground-muted hover:border-border-strong hover:text-foreground",
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} project{visible.length === 1 ? "" : "s"} shown
      </p>

      {visible.length > 0 ? (
        <ul
          key={active}
          className="mt-8 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((project, i) => (
            <li
              key={project.slug}
              className="filter-enter"
              style={{ "--enter-index": i } as React.CSSProperties}
            >
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8">
          <EmptyState
            title="No projects in this category yet"
            description="Work in this area is on the bench but not written up. Try another category, or check back soon."
            action={
              <Button variant="secondary" onClick={() => setActive("All")}>
                Show all projects
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}
