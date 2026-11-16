import { ServiceAccordion } from "@/components/home/service-accordion";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { services, servicesIntro } from "@/data/services";

/**
 * "What I can build", heading, intro and the numbered capability groups
 * as an accordion.
 *
 * On desktop the content keeps to the left of a two-column grid. The
 * right column is deliberately empty: it is where the travelling portrait
 * card comes to rest while this section is on screen, and the
 * `data-portrait-land` element tells portrait-stage.tsx where that is.
 */
export function Services() {
  return (
    <section aria-labelledby="services-title">
      <Container className="grid items-center gap-x-16 py-20 md:py-28 lg:min-h-svh lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div>
          <Reveal>
            <h2 id="services-title" className="type-section-title">
              What I can build
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-foreground-muted">
              {servicesIntro}
            </p>
          </Reveal>

          <Reveal delay={140} className="mt-10 border-t border-border md:mt-14">
            <ServiceAccordion services={services} />
          </Reveal>
        </div>

        <div
          aria-hidden="true"
          data-portrait-land
          className="hidden lg:block"
        />
      </Container>
    </section>
  );
}
