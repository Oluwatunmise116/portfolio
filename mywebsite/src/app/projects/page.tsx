import { ArrowRight } from "lucide-react";

import { FeaturedProject } from "@/components/projects/featured-project";
import { ProjectFilter } from "@/components/projects/project-filter";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { featuredProject, projects } from "@/data/projects";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Projects",
  description:
    "Embedded, automotive, firmware, IoT, and hardware projects — CAN analyzers, crash detection, vehicle access, GPS tracking, and OTA infrastructure.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <Container className="py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="type-label text-foreground-muted">
          <span aria-hidden="true" className="text-accent">
            /projects
          </span>
        </p>
        <h1 className="type-page-title mt-4">Projects</h1>
        <p className="mt-5 text-foreground-muted md:text-lg">
          Devices, vehicle systems, and infrastructure I have designed, built,
          and tested — each one taken from a schematic (or a standard) to
          something that works in the real world.
        </p>
      </header>

      <section aria-label="Featured project" className="mt-12 md:mt-16">
        <FeaturedProject project={featuredProject} headingLevel="h2" />
      </section>

      <section aria-label="All projects" className="mt-16 md:mt-20">
        <ProjectFilter projects={projects} />
      </section>

      <aside className="mt-20 flex flex-col items-center gap-4 border-t border-border pt-12 text-center">
        <p className="max-w-md text-foreground-muted">
          Working on something in this space? I&rsquo;m open to selected
          projects and collaborations.
        </p>
        <LinkButton href="/contact" variant="primary">
          Start a conversation
          <ArrowRight aria-hidden="true" className="size-4" />
        </LinkButton>
      </aside>
    </Container>
  );
}
