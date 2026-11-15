import { AboutPreview } from "@/components/home/about-preview";
import { ContactSection } from "@/components/home/contact-section";
import { Faq } from "@/components/home/faq";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Hero, PortraitTrim } from "@/components/home/hero";
import { HowIWork } from "@/components/home/how-i-work";
import { LatestArticles } from "@/components/home/latest-articles";
import { PortraitStage } from "@/components/home/portrait-stage";
import { Services } from "@/components/home/services";
import { portraitFor } from "@/data/portraits";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      {/* The first three sections share one stage: on desktop the hero
          portrait travels down through them as the page scrolls. */}
      <PortraitStage
        hero={<Hero />}
        services={<Services />}
        about={<AboutPreview />}
        front={portraitFor("hero")}
        back={portraitFor("aboutPreview")}
        badge={<PortraitTrim />}
      />
      <FeaturedProjects />
      <HowIWork />
      <Faq />
      <LatestArticles />
      <ContactSection />
    </>
  );
}
