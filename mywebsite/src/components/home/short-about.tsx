import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";

/** Short about preview + capabilities grid. */
export function ShortAbout() {
  return (
    <section
      aria-label="About preview"
      className="border-y border-border bg-background-subtle"
    >
      <Container className="py-20 md:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <SectionHeading
              index="02"
              eyebrow="About"
              title="Engineer first. Integrator always."
              className="mb-6"
            />
            {profile.shortAbout.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="mt-4 max-w-prose text-foreground-muted"
              >
                {paragraph}
              </p>
            ))}
            <div className="mt-8">
              <LinkButton href="/about" variant="secondary">
                More about me
                <ArrowRight aria-hidden="true" className="size-4" />
              </LinkButton>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xs lg:max-w-sm">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border">
              <Image
                src={profile.portrait.src}
                alt={profile.portrait.alt}
                fill
                sizes="(min-width: 1024px) 384px, 320px"
                className="object-cover"
              />
            </div>
            <p className="type-meta mt-3 text-foreground-muted">
              FIG. 01 — {profile.title}
            </p>
          </div>
        </div>

        <h3 className="type-label mt-16 mb-6 text-foreground-muted">
          Capabilities
        </h3>
        <ul className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <li key={group.discipline} className="bg-background p-5">
              <p className="type-meta mb-2 text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="font-medium">{group.discipline}</p>
              <p className="mt-2 text-sm text-foreground-muted">
                {group.skills.slice(0, 4).join(" · ")}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
