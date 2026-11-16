import { ArrowRight } from "lucide-react";

import { Biography } from "@/components/about/biography";
import { CareerTimeline } from "@/components/about/career-timeline";
import { EngineeringPrinciples } from "@/components/about/engineering-principles";
import { SkillsInventory } from "@/components/about/skills-inventory";
import { ToolsList } from "@/components/about/tools-list";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About",
  description:
    "Engineer first, integrator always: background, career timeline, skills, tools, and the engineering principles behind the work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="pt-32 pb-16 md:pt-40 md:pb-24">
      <Biography />

      <Reveal as="section" aria-label="Career timeline" className="mt-24 md:mt-32">
        <SectionHeading eyebrow="Timeline" title="Where the years went" />
        <CareerTimeline />
      </Reveal>

      <Reveal as="section" aria-label="Skills and capabilities" className="mt-24 md:mt-32">
        <SectionHeading
          eyebrow="Skills"
          title="Skills & capabilities"
          description="Grouped by discipline. Everything here is editable from src/data/skills.ts."
        />
        <SkillsInventory />
      </Reveal>

      <Reveal as="section" aria-label="Engineering principles" className="mt-24 md:mt-32">
        <SectionHeading eyebrow="Principles" title="How I engineer" />
        <EngineeringPrinciples />
      </Reveal>

      <Reveal as="section" aria-label="Tools and technologies" className="mt-24 md:mt-32">
        <SectionHeading eyebrow="Tools" title="On the bench" />
        <ToolsList />
      </Reveal>

      <aside className="mt-24 flex flex-col items-center gap-4 border-t border-border pt-14 text-center md:mt-32">
        <p className="max-w-md text-lg text-foreground-muted">
          The longer version lives on the résumé page, or just say hello.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <LinkButton href="/resume" variant="secondary">
            View résumé
          </LinkButton>
          <LinkButton href="/contact" variant="primary">
            Get in touch
            <ArrowRight aria-hidden="true" className="size-4" />
          </LinkButton>
        </div>
      </aside>
    </Container>
  );
}
