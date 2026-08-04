import { ArrowRight, FileDown, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/data/profile";

/**
 * Home "About me" preview: portrait beside a short biography, selected
 * statistics (bracketed placeholders until confirmed), contact facts, and
 * a "My story" CTA into /about.
 */
export function AboutPreview() {
  return (
    <section aria-labelledby="about-preview-title">
      <Container className="py-20 md:py-28">
        <Reveal>
          <h2 id="about-preview-title" className="type-section-title">
            About me
          </h2>
        </Reveal>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
          <Reveal className="mx-auto w-full max-w-sm lg:mx-0">
            <div className="relative aspect-4/5 overflow-hidden rounded-[2rem] border border-border bg-surface-muted">
              <Image
                src={profile.portrait.src}
                alt={profile.portrait.alt}
                fill
                sizes="(min-width: 1024px) 32rem, 88vw"
                className="object-cover"
                style={{ objectPosition: profile.portrait.focus }}
              />
            </div>
          </Reveal>

          <div>
            <Reveal delay={60}>
              <p className="text-xl leading-relaxed font-medium sm:text-2xl">
                {profile.shortAbout[0]}
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground-muted">
                {profile.shortAbout[1]}
              </p>
            </Reveal>

            {/* Selected statistics — bracketed placeholders until the owner
                confirms real numbers; never publish invented metrics. */}
            <Reveal
              delay={120}
              className="mt-10 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3"
            >
              {profile.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-4xl font-medium uppercase sm:text-5xl">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-2 text-sm text-foreground-muted">
                    {stat.label}
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
              <Link
                href="/about"
                className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-control px-6 text-sm font-semibold text-control-foreground transition-transform duration-160 ease-out-strong hover:opacity-90 active:scale-[0.98]"
              >
                My story
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-160 ease-out-strong group-hover:translate-x-0.5"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
