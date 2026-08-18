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
    "Personal and academic embedded projects: a custom OBD-II interface board, a BLE reminder wearable, an IoT biometric attendance system, and Raspberry Pi object detection.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Projects"
        lead="Personal, academic, and independent builds across automotive interfaces, embedded devices, and IoT systems. Client and employer work is covered on the About page rather than published here."
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
