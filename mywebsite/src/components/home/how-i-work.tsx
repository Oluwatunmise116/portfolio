import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

/**
 * Engineering-proof section. The design reference uses testimonials +
 * results here; this site has no verified testimonials, so it shows four
 * working principles plus indicators that are either computed from real
 * data (protocol count, active projects) or bracketed placeholders the
 * owner must confirm. Nothing here is invented.
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
  // Derived safely from existing data — not invented figures.
  const protocolCount = new Set(
    skillGroups
      .filter((g) =>
        ["Vehicle Communication", "Interfaces & Protocols"].includes(
          g.discipline,
        ),
      )
      .flatMap((g) => g.skills),
  ).size;
  const activeProjects = projects.filter(
    (p) => p.status === "Active" || p.status === "Research",
  ).length;
  // Read from profile.stats rather than restated, so this section and the
  // About preview can never quote different numbers for the same fact.
  const vehiclePlatforms =
    profile.stats.find((s) => s.label === "Vehicle platforms tested")?.value ??
    "[X]";

  const indicators = [
    { value: String(protocolCount), label: "Communication protocols used" },
    { value: String(activeProjects), label: "Active engineering projects" },
    // Owner-confirmed; kept in sync with profile.stats so the two sections
    // never disagree about the same fact.
    { value: vehiclePlatforms, label: "Vehicle platforms tested" },
    // TODO: replace with a confirmed value, or delete this entry.
    { value: "[X]", label: "Boards tested — replace with confirmed value" },
  ];

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
              className="rounded-2xl border border-border bg-surface p-7 md:p-9"
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

        <Reveal className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-10 lg:grid-cols-4">
          {indicators.map((indicator) => (
            <div key={indicator.label}>
              <p className="font-display text-4xl font-medium uppercase sm:text-5xl">
                <CountUp value={indicator.value} />
              </p>
              <p className="mt-2 text-sm text-foreground-muted">
                {indicator.label}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
