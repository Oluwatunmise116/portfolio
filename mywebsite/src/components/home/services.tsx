import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { services, servicesIntro } from "@/data/services";

/**
 * "What I can build" — four numbered capability groups. Large index
 * number, condensed heading, stacked list; one group per row on mobile,
 * ruled rows on desktop.
 */
export function Services() {
  return (
    <section aria-labelledby="services-title" className="bg-surface">
      <Container className="py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-16">
          <Reveal>
            <h2 id="services-title" className="type-section-title">
              What I can build
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="max-w-xl text-lg leading-relaxed text-foreground-muted">
              {servicesIntro}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-20">
          {services.map((service, index) => (
            <Reveal
              key={service.number}
              delay={Math.min(index * 60, 180)}
              className="grid gap-4 border-t border-border py-8 last:border-b sm:grid-cols-[5rem_minmax(0,1fr)] md:grid-cols-[7rem_minmax(0,1fr)_minmax(0,1fr)] md:gap-8 md:py-12"
            >
              <span aria-hidden="true" className="type-index">
                {service.number}
              </span>
              <h3 className="type-card-title self-start md:pt-2">
                {service.title}
              </h3>
              <ul className="flex flex-col gap-2 text-foreground-muted sm:col-start-2 md:col-start-3 md:pt-2">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-border pb-2 last:border-0 last:pb-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
