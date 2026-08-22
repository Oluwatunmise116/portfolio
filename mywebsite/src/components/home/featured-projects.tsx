import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ProjectCard } from "@/components/projects/project-card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  // Driven by the `featured` flag in src/data/projects.ts rather than a
  // hard-coded slug list, so removing or renaming a project can never
  // leave a dangling reference here.
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section aria-labelledby="featured-projects-title" className="bg-surface">
      <Container className="py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-16">
          <Reveal>
            <h2 id="featured-projects-title" className="type-section-title">
              Featured projects
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="max-w-xl text-lg leading-relaxed text-foreground-muted">
              These projects reflect my work across vehicle communication,
              embedded firmware, connected hardware, diagnostics, and field
              testing.
            </p>
          </Reveal>
        </div>

        {/* Bento rhythm: the lead project runs full width in a wider,
            cinematic crop; the rest fall into an even row beneath it.
            One large treatment plus several small ones reads as curated
            rather than every project competing at the same size.

            At the tablet (md-only) breakpoint the secondary row is 2-up,
            so an odd remainder would otherwise strand the last card alone
            beside an empty cell. Spanning that last card full width there
            turns it into a deliberate 1-2-1 rhythm instead of a gap; lg's
            3-up row divides the current count evenly, so it never needs it. */}
        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          {featured.map((project, index) => {
            const isLead = index === 0;
            const strandedOnTablet =
              !isLead &&
              index === featured.length - 1 &&
              (featured.length - 1) % 2 === 1;
            return (
              <Reveal
                key={project.slug}
                delay={Math.min(index * 60, 180)}
                className={
                  isLead
                    ? "md:col-span-2 lg:col-span-3"
                    : strandedOnTablet
                      ? "md:col-span-2 lg:col-span-1"
                      : undefined
                }
              >
                <ProjectCard project={project} wide={isLead} />
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-border-strong px-6 text-sm font-semibold transition-[color,background-color,scale] duration-160 ease-out-strong hover:bg-control hover:text-control-foreground active:scale-[0.98]"
          >
            Browse all projects
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-160 ease-out-strong group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
