import { ArrowRight } from "lucide-react";

import { ProjectRow } from "@/components/projects/project-row";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/projects";

export function SelectedWork() {
  return (
    <section aria-label="Selected work">
      <Container className="py-20 md:py-28">
        <SectionHeading
          index="01"
          eyebrow="Work"
          title="Selected work"
          description="Hardware, firmware, and vehicle-communication projects — from first schematic to field deployment."
        >
          <LinkButton href="/projects" variant="ghost">
            All projects
            <ArrowRight aria-hidden="true" className="size-4" />
          </LinkButton>
        </SectionHeading>

        <ul className="list-none">
          {projects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
