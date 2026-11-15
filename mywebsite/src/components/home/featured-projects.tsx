import { ArrowRight } from "lucide-react";

import {
  ProjectStack,
  type StackProject,
} from "@/components/home/project-stack";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  // Driven by the `featured` flag in src/data/projects.ts rather than a
  // hard-coded slug list, so removing or renaming a project can never
  // leave a dangling reference here.
  const featured: StackProject[] = projects
    .filter((project) => project.featured)
    .slice(0, 4)
    .map((project) => ({
      slug: project.slug,
      title: project.title,
      summary: project.summary,
      image: project.image,
      label: `${project.category} / ${project.year ?? project.status}`,
    }));

  return (
    <section aria-labelledby="featured-projects-title">
      <Container className="py-20 md:py-28">
        <Reveal>
          <h2 id="featured-projects-title" className="type-section-title">
            Featured projects
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-foreground-muted">
            These projects reflect my work across vehicle communication,
            embedded firmware, connected hardware, diagnostics, and field
            testing.
          </p>
        </Reveal>

        {/* Not wrapped in <Reveal>: its transform would turn the wrapper
            into the sticky panels' scroll container and stop them
            stacking. */}
        <div className="mt-12 md:mt-16">
          <ProjectStack projects={featured} />
        </div>

        <Reveal className="mt-14 flex justify-center">
          <LinkButton href="/projects" variant="secondary">
            Browse all projects
            <ArrowRight aria-hidden="true" className="size-4" />
          </LinkButton>
        </Reveal>
      </Container>
    </section>
  );
}
