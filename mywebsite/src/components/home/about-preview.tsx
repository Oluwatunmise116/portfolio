import { FileDown, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { Reveal } from "@/components/ui/reveal";
import { portraitFor } from "@/data/portraits";
import { profile } from "@/data/profile";

/**
 * Home "About me" preview: a short biography, capability areas, contact
 * facts, and a "My story" CTA into /about.
 *
 * On desktop the text keeps to the left and the travelling portrait card
 * settles into the empty right column (marked `data-portrait-land` for
 * portrait-stage.tsx). The section's own photo is shown instead wherever
 * the card does not travel: below `lg`, and for reduced-motion visitors.
 */
export function AboutPreview() {
  const previewPortrait = portraitFor("aboutPreview");

  return (
    <section aria-labelledby="about-preview-title">
      <Container className="grid items-center gap-x-16 gap-y-12 py-20 md:py-28 lg:min-h-svh lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div>
          <Reveal>
            <h2 id="about-preview-title" className="type-section-title">
              About me
            </h2>
          </Reveal>

          <Reveal delay={60}>
            <p className="mt-5 max-w-2xl text-xl leading-relaxed sm:text-2xl">
              {profile.shortAbout[0]}
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground-muted">
              {profile.shortAbout[1]}
            </p>
          </Reveal>

          {/* Capability areas, not counters. No numeric claim appears on
              this site unless it can be independently verified. */}
          <Reveal
            delay={120}
            className="mt-10 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3"
          >
            {profile.focusAreas.map((area) => (
              <div key={area.title}>
                <h3 className="type-card-title text-accent">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {area.detail}
                </p>
              </div>
            ))}
          </Reveal>

          <Reveal
            delay={160}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-foreground-muted"
          >
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-11 items-center gap-2 transition-colors duration-160 ease-out-strong hover:text-accent"
            >
              <Mail aria-hidden="true" className="size-4" />
              {profile.email}
            </a>
            <span className="inline-flex min-h-11 items-center gap-2">
              <MapPin aria-hidden="true" className="size-4" />
              {profile.location}
            </span>
            <Link
              href="/resume"
              className="inline-flex min-h-11 items-center gap-2 underline decoration-border-strong underline-offset-4 transition-colors duration-160 ease-out-strong hover:text-accent hover:decoration-accent"
            >
              <FileDown aria-hidden="true" className="size-4" />
              Résumé
            </Link>
          </Reveal>

          <Reveal delay={200} className="mt-8">
            <LinkButton href="/about" variant="secondary">
              My story
            </LinkButton>
          </Reveal>
        </div>

        {/* First on small screens, so the photo introduces the text. */}
        <div data-portrait-land className="order-first lg:order-last">
          <Reveal className="mx-auto w-full max-w-sm lg:hidden lg:motion-reduce:block">
            <div className="relative aspect-4/5 overflow-hidden rounded-[2rem] border border-border bg-surface-muted shadow-card">
              <Image
                src={previewPortrait.src}
                alt={previewPortrait.alt}
                fill
                sizes="(min-width: 1024px) 24rem, 88vw"
                className="object-cover"
                style={{ objectPosition: previewPortrait.focus }}
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
