import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ProjectCard } from "@/components/projects/project-card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/data/projects";

/** Home featured-project order: most representative work first. */
const FEATURED_SLUGS = [
  "vescan-vehicle-can-analyzer",
  "evade-crash-detection-device",
  "automotive-diagnostics-research",
  "ota-firmware-platform",
];

export function FeaturedProjects() {
  const featured = FEATURED_SLUGS.map((slug) =>
    projects.find((p) => p.slug === slug),
  ).filter((p): p is (typeof projects)[number] => p !== undefined);

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

        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 md:gap-y-16">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min((index % 2) * 80, 160)}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-border-strong px-6 text-sm font-semibold transition-colors duration-160 ease-out-strong hover:bg-control hover:text-control-foreground active:scale-[0.98]"
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
