import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/data/profile";

/**
 * Engineering-proof section: four working principles plus the capability
 * areas from profile.ts.
 *
 * There are deliberately no counters here. The design reference uses
 * testimonials and numeric results; this site has neither verified
 * testimonials nor verified figures, and a qualitative statement of
 * capability is stronger than a number that cannot be substantiated.
 */
const principles = [
  {
    title: "Test on real hardware early",
    detail:
      "Simulation flatters. Real buses, real sensors, and real power supplies expose the truth long before deployment does.",
  },
  {
    title: "Design for failure paths",
    detail:
      "Brown-outs, lost links, corrupted flash — the field always finds the edge case. The recovery path is designed before the feature.",
  },
  {
    title: "Make debugging observable",
    detail:
      "Structured logs, status LEDs, diagnostic frames. A device that can explain itself is fixed in hours, not weeks.",
  },
  {
    title: "Treat documentation as part of the product",
    detail:
      "A wiring diagram or register map that lives only in one engineer's head is technical debt with interest.",
  },
];

export function HowIWork() {
  return (
    <section aria-labelledby="how-i-work-title">
      <Container className="py-20 md:py-28">
        <Reveal>
          <h2 id="how-i-work-title" className="type-section-title">
            How I work
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {principles.map((principle, index) => (
            <Reveal
              key={principle.title}
              delay={Math.min(index * 60, 180)}
              className="rounded-2xl border border-border bg-surface-elevated p-7 shadow-card md:p-9"
            >
              <p aria-hidden="true" className="type-label text-accent">
                0{index + 1}
              </p>
              <h3 className="type-card-title mt-3">{principle.title}</h3>
              <p className="mt-3 leading-relaxed text-foreground-muted">
                {principle.detail}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 grid gap-8 border-t border-border pt-10 sm:grid-cols-3">
          {profile.focusAreas.map((area) => (
            <div key={area.title}>
              <h3 className="type-card-title">{area.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {area.detail}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
