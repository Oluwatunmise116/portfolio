"use client";

import { useState } from "react";

import { ProjectCard } from "@/components/projects/project-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { type Project, type ProjectCategory } from "@/types/project";
import { cn } from "@/lib/utils";

type Filter = "All" | ProjectCategory;

/**
 * Client-side category filtering. The grid is keyed by the active filter so
 * a change replays a short CSS entrance (see .filter-enter), interruption
 * simply restarts the small fade, no layout thrash.
 */
export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("All");

  // Derived from the projects actually published, so a category filter is
  // never offered that would return an empty grid.
  const filters: Filter[] = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];
  const visible =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  // Crossfades the grid swap via the native View Transitions API, scoped
  // to just the grid (see the `project-grid` view-transition-name below)
  // so the filter pills and heading don't also animate. Falls back to the
  // plain instant update in browsers without support.
  const applyFilter = (filter: Filter) => {
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      document.startViewTransition(() => setActive(filter));
    } else {
      setActive(filter);
    }
  };

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
              onClick={() => applyFilter(filter)}
              className={cn(
                "min-h-11 rounded-full border px-5 text-sm transition-[background-color,border-color,color,scale] duration-160 ease-out-strong active:scale-[0.98]",
                selected
                  ? "border-transparent bg-control font-semibold text-control-foreground"
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

      <div className="[view-transition-name:project-grid]">
        {visible.length > 0 ? (
          <ul
            key={active}
            className="mt-10 grid list-none gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3"
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
                <Button variant="secondary" onClick={() => applyFilter("All")}>
                  Show all projects
                </Button>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
