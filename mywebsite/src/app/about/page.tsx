import { ArrowRight } from "lucide-react";

import { Biography } from "@/components/about/biography";
import { CareerTimeline } from "@/components/about/career-timeline";
import { EngineeringPrinciples } from "@/components/about/engineering-principles";
import { SkillsInventory } from "@/components/about/skills-inventory";
import { ToolsList } from "@/components/about/tools-list";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About",
  description:
    "Engineer first, integrator always — background, career timeline, skills inventory, and the engineering principles behind the work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-16 md:py-24">
      <Biography />

      <section aria-label="Career timeline" className="mt-20 md:mt-28">
        <SectionHeading
          index="01"
          eyebrow="Timeline"
          title="Where the years went"
        />
        <CareerTimeline />
      </section>

      <section aria-label="Skills inventory" className="mt-20 md:mt-28">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="Skills inventory"
          description="Grouped by discipline. Everything here is editable from src/data/skills.ts."
        />
        <SkillsInventory />
      </section>

      <section aria-label="Engineering principles" className="mt-20 md:mt-28">
        <SectionHeading
          index="03"
          eyebrow="Principles"
          title="How I engineer"
        />
        <EngineeringPrinciples />
      </section>

      <section aria-label="Tools and technologies" className="mt-20 md:mt-28">
        <SectionHeading index="04" eyebrow="Tools" title="On the bench" />
        <ToolsList />
      </section>

      <aside className="mt-20 flex flex-col items-center gap-4 border-t border-border pt-12 text-center md:mt-28">
        <p className="max-w-md text-foreground-muted">
          The longer version lives on the resume page — or just say hello.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <LinkButton href="/resume" variant="secondary">
            View resume
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
