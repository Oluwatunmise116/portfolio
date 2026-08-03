import { ContactCta } from "@/components/home/contact-cta";
import { ExpertiseStrip } from "@/components/home/expertise-strip";
import { Hero } from "@/components/home/hero";
import { LatestWriting } from "@/components/home/latest-writing";
import { SelectedWork } from "@/components/home/selected-work";
import { ShortAbout } from "@/components/home/short-about";
import { FeaturedProject } from "@/components/projects/featured-project";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredProject } from "@/data/projects";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  description:
    "Embedded systems engineer building firmware, automotive communication systems, and connected hardware — from schematic to the real world.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ExpertiseStrip />
      <SelectedWork />
      <ShortAbout />

      <section aria-label="Featured project">
        <Container className="py-20 md:py-28">
          <SectionHeading
            index="03"
            eyebrow="Featured"
            title="Currently on the bench"
            description="The project getting most of my attention right now."
          />
          <FeaturedProject project={featuredProject} headingLevel="h3" />
        </Container>
      </section>

      <LatestWriting />
      <ContactCta />
    </>
  );
}
