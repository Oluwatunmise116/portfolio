import { AboutPreview } from "@/components/home/about-preview";
import { ContactSection } from "@/components/home/contact-section";
import { Faq } from "@/components/home/faq";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Hero } from "@/components/home/hero";
import { HowIWork } from "@/components/home/how-i-work";
import { LatestArticles } from "@/components/home/latest-articles";
import { Services } from "@/components/home/services";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  description:
    "Embedded Systems and IoT Engineer specialising in automotive diagnostics, firmware, CAN, OBD-II, PCB design, connected devices, and vehicle communication.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <AboutPreview />
      <FeaturedProjects />
      <HowIWork />
      <Faq />
      <LatestArticles />
      <ContactSection />
    </>
  );
}
