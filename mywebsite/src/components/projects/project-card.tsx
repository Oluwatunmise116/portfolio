"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  headingLevel?: "h2" | "h3";
  /** Larger sizes hint for full-width featured usage. */
  wide?: boolean;
  className?: string;
};

/**
 * Image-heavy project card. Hover (pointer devices only): image scales
 * slightly and a cursor-following "View" label appears. Touch devices and
 * reduced-motion users get the always-visible arrow affordance instead —
 * no information is hover-only.
 */
export function ProjectCard({
  project,
  headingLevel: Heading = "h3",
  wide = false,
  className,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [cursorEnabled, setCursorEnabled] = useState(false);
  const [labelVisible, setLabelVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCursorEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  // Position is written directly to the DOM node — no re-render per move.
  const onPointerMove = (event: React.PointerEvent) => {
    if (!cursorEnabled || !cardRef.current || !labelRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    labelRef.current.style.transform = `translate(${event.clientX - rect.left}px, ${event.clientY - rect.top}px) translate(-50%, -50%)`;
  };

  return (
    <article
      ref={cardRef}
      onPointerMove={onPointerMove}
      onPointerEnter={() => cursorEnabled && setLabelVisible(true)}
      onPointerLeave={() => setLabelVisible(false)}
      className={cn("group relative", className)}
    >
      <Link href={`/projects/${project.slug}`} className="block rounded-2xl">
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border bg-surface-muted">
          <Image
            src={project.image}
            alt=""
            fill
            sizes={
              wide
                ? "(min-width: 1024px) 60vw, 92vw"
                : "(min-width: 1024px) 44vw, 92vw"
            }
            className="object-cover transition-transform duration-280 ease-out-strong group-hover:scale-[1.04]"
          />
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="type-label text-foreground-muted">
              {project.category}
              <span aria-hidden="true" className="mx-2 opacity-50">
                /
              </span>
              {project.year ?? project.status}
            </p>
            <Heading className="type-card-title mt-2 transition-colors duration-160 ease-out-strong group-hover:text-accent">
              {project.title}
            </Heading>
            <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-relaxed text-foreground-muted">
              {project.summary}
            </p>
            <p className="type-meta mt-3 text-foreground-muted">
              {project.technologies.slice(0, 4).join(" · ")}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-[background-color,color,transform] duration-160 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-control group-hover:text-control-foreground"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </Link>

      {/* Cursor-following label; pointer devices without reduced motion only */}
      {cursorEnabled && (
        <span
          ref={labelRef}
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-0 left-0 z-20 inline-flex items-center rounded-full bg-control px-4 py-2 text-xs font-semibold text-control-foreground transition-opacity duration-160 ease-out-strong",
            labelVisible ? "opacity-100" : "opacity-0",
          )}
        >
          View
        </span>
      )}
    </article>
  );
}
