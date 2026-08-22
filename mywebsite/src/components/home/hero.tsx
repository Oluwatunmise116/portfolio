import { ArrowDown, ArrowRight, FileDown } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LinkButton } from "@/components/ui/link-button";
import { heroHoverPortrait, portraitFor } from "@/data/portraits";
import { profile } from "@/data/profile";

function rise(delay: number): CSSProperties {
  return { "--rise-delay": `${delay}ms` } as CSSProperties;
}

/** profile.specialisation is pipe-delimited; render it as the same
 *  mono "/"-separated metadata line used on project cards, so the hero
 *  reuses an established pattern instead of inventing a new one. */
const specLine = profile.specialisation
  .split("|")
  .map((s) => s.trim())
  .join("  /  ");

/** Four-corner reticle frame around the portrait — a restrained nod to
 *  measurement/targeting marks rather than a literal camera viewfinder.
 *  Purely decorative, offset outside the image so it reads as a frame
 *  around the photo rather than tracing its rounded corners. */
function PortraitReticle() {
  const corner = "M1 9V3a2 2 0 0 1 2-2h6";
  return (
    <>
      {(
        [
          "top-0 left-0 -translate-x-3 -translate-y-3",
          "top-0 right-0 translate-x-3 -translate-y-3 rotate-90",
          "right-0 bottom-0 translate-x-3 translate-y-3 rotate-180",
          "bottom-0 left-0 -translate-x-3 translate-y-3 -rotate-90",
        ] as const
      ).map((position) => (
        <svg
          key={position}
          aria-hidden="true"
          viewBox="0 0 12 12"
          className={`absolute size-4 text-accent/70 ${position}`}
        >
          <path
            d={corner}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ))}
    </>
  );
}

/**
 * Entrance delay rhythm, mirroring the design reference: the composition
 * lands in ~0.3s steps rather than a tight stagger.
 */
function slide(delay: number, direction: 1 | -1): CSSProperties {
  return {
    "--rise-delay": `${delay}ms`,
    "--slide-dir": direction,
  } as CSSProperties;
}

/**
 * Portrait-centered editorial hero. Desktop reads as:
 *
 *   [NAME]
 *   EMBEDDED   [PORTRAIT]   ENGINEER
 *                           description
 *
 * Mobile stacks: name, EMBEDDED, portrait, ENGINEER, description.
 *
 * The <h1> uses `display: contents` so both headline words are one heading
 * for assistive tech while still being placed individually on the grid —
 * the portrait sits between them visually without nesting a <div> inside
 * heading content (which would be invalid HTML).
 *
 * All entrance animation is CSS (`hero-rise`), so this stays a server
 * component and the content is visible without JavaScript.
 */
export function Hero() {
  const portrait = portraitFor("hero");
  const hoverPortrait = heroHoverPortrait();

  return (
    // overflow-x-clip: the headline halves start 150px outside their
    // columns, which would widen the page for the first second of the
    // entrance. `clip` contains that without creating a scroll container
    // (which `hidden` would, breaking sticky descendants).
    <section className="relative overflow-x-clip">
      {/* Faint blueprint grid behind the composition — an engineering
          detail, not decoration for its own sake, and masked to an
          ellipse so it reads as depth rather than a rectangle. */}
      <div
        aria-hidden="true"
        className="bg-technical-grid pointer-events-none absolute inset-0"
      />
      <div className="relative mx-auto flex min-h-svh w-full max-w-[90rem] flex-col justify-center px-5 pt-28 pb-10 sm:px-8 lg:px-12 lg:pt-32">
        {/* Eyebrow — what this engineer builds, before anything else loads */}
        <p
          className="hero-rise type-meta mb-6 flex items-center justify-center gap-2.5 text-center text-foreground-muted lg:mb-8"
          style={rise(240)}
        >
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
          {profile.eyebrow}
        </p>

        <div className="grid grid-cols-1 items-center gap-x-6 gap-y-5 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-x-8">
          {/* Name — row 1 on mobile, above the left word on desktop */}
          <p
            className="hero-rise col-start-1 row-start-1 text-center text-xs font-semibold tracking-[0.2em] text-foreground-muted uppercase sm:text-sm lg:pr-3 lg:text-right"
            style={rise(320)}
          >
            {profile.shortName}
          </p>

          {/* The two halves converge on the portrait: the left word travels
              in from the right, the right word from the left. */}
          <h1 className="contents">
            <span
              className="type-hero hero-slide col-start-1 row-start-2 block text-center lg:row-start-2 lg:pr-2 lg:text-right"
              style={slide(100, 1)}
            >
              {profile.heroWords.left}
            </span>
            <span
              className="type-hero hero-slide col-start-1 row-start-4 block text-center lg:col-start-3 lg:row-start-2 lg:pl-2 lg:text-left"
              style={slide(100, -1)}
            >
              {profile.heroWords.right}
            </span>
          </h1>

          {/* Portrait — between the words on mobile, centre column on desktop */}
          <div
            className="hero-zoom relative z-10 col-start-1 row-start-3 mx-auto w-[min(68vw,17rem)] lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:w-[clamp(13rem,18vw,17rem)]"
            style={rise(0)}
          >
            <div className="group relative aspect-4/5 overflow-hidden rounded-[2rem] border border-border bg-surface-elevated shadow-elevated">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                priority
                sizes="(min-width: 1024px) 21vw, 68vw"
                className="object-cover"
                style={{ objectPosition: portrait.focus }}
              />
              {/* Optional second portrait: cross-fades in on hover, pointer
                  devices only. Absent (and harmless) when no heroHover
                  slot is configured in src/data/portraits.ts. */}
              {hoverPortrait && (
                <Image
                  src={hoverPortrait.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 21vw, 68vw"
                  className="portrait-hover object-cover"
                  style={{ objectPosition: hoverPortrait.focus }}
                />
              )}
            </div>

            {/* Reticle frame — a measurement/targeting mark around the
                portrait rather than on it; a restrained engineering
                detail that also acts as a visual anchor for the composition. */}
            <PortraitReticle />

            {/* Circular accent badge, lower-left overlap */}
            <div
              aria-hidden="true"
              className="hero-pop absolute -bottom-4 -left-4 flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-card sm:size-20 lg:-left-7"
              style={rise(700)}
            >
              <span className="font-display text-lg font-medium uppercase sm:text-xl">
                {profile.heroBadge}
              </span>
            </div>
          </div>

          {/* Supporting statement: a stronger claim (tagline) first, the
              specifics (support line + spec strip) trailing it — two
              tiers of typographic weight instead of one flat paragraph. */}
          <div
            className="hero-rise col-start-1 row-start-5 mx-auto mt-1 max-w-sm text-center lg:col-start-3 lg:row-start-3 lg:mx-0 lg:max-w-none lg:text-left"
            style={rise(440)}
          >
            <p className="text-lg leading-snug font-medium text-foreground sm:text-xl">
              {profile.tagline}
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground-muted">
              {profile.taglineSupport}
            </p>
            <p className="type-meta mt-5 border-t border-border pt-4 text-foreground-muted lg:max-w-xs">
              {specLine}
            </p>
          </div>
        </div>

        {/* CTA row: primary action first, résumé second — the hero should
            point somewhere before it points everywhere. */}
        <div
          className="hero-rise mt-10 flex flex-wrap items-center justify-center gap-4 lg:mt-14"
          style={rise(500)}
        >
          <LinkButton href="/projects" variant="primary">
            See my work
            <ArrowRight aria-hidden="true" className="size-4" />
          </LinkButton>
          <LinkButton href="/resume" variant="secondary">
            <FileDown aria-hidden="true" className="size-4" />
            Résumé
          </LinkButton>
        </div>

        {/* Meta strip: availability, scroll cue, theme */}
        <div
          className="hero-rise mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          style={rise(560)}
        >
          {profile.availability.available && (
            <p className="type-meta flex items-center gap-2 text-foreground-muted">
              <span className="relative inline-flex size-2 rounded-full bg-success status-dot" />
              {profile.availability.shortLabel}
            </p>
          )}
          <span className="type-meta hidden items-center gap-2 text-foreground-muted sm:inline-flex">
            <ArrowDown aria-hidden="true" className="size-3.5" />
            Scroll
          </span>
          <ThemeToggle />
        </div>
      </div>
    </section>
  );
}
