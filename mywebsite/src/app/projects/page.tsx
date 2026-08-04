import { ArrowRight } from "lucide-react";

import { ProjectFilter } from "@/components/projects/project-filter";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { PageHero } from "@/components/ui/page-hero";
import { projects } from "@/data/projects";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Projects",
  description:
    "Embedded, automotive, firmware, IoT, and hardware projects — CAN analyzers, crash detection, vehicle access, GPS tracking, and OTA infrastructure.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Projects"
        lead="Devices, vehicle systems, and infrastructure I have designed, built, and tested — each one taken from a schematic (or a standard) to something that works in the real world."
      />

      <Container className="pb-16 md:pb-24">
        <section aria-label="All projects">
          <ProjectFilter projects={projects} />
        </section>

        <aside className="mt-24 flex flex-col items-center gap-4 border-t border-border pt-14 text-center">
          <p className="max-w-md text-lg text-foreground-muted">
            Working on something in this space? I&rsquo;m open to selected
            projects and collaborations.
          </p>
          <LinkButton href="/contact" variant="primary">
            Start a conversation
            <ArrowRight aria-hidden="true" className="size-4" />
          </LinkButton>
        </aside>
      </Container>
    </>
  );
}
