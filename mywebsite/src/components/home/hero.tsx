import { ArrowDown, ArrowRight, FileDown, Hand } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";

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

/**
 * Decoration that sits around the hero portrait: a four-corner reticle —
 * a restrained nod to measurement/targeting marks, offset outside the
 * photo so it frames it rather than tracing its rounded corners — and the
 * circular greeting badge overlapping the lower-left corner.
 *
 * Shared by the in-flow mobile portrait and the desktop travelling card
 * (see portrait-stage.tsx), so it is positioned against whichever
 * `relative` box it is dropped into. Purely decorative.
 */
export function PortraitTrim() {
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

      {/* Greeting badge: alternates between the word and a waving hand. */}
      <div
        aria-hidden="true"
        className="hero-pop absolute -bottom-6 -left-6 size-20 overflow-hidden rounded-full bg-accent text-accent-foreground shadow-card sm:size-24 lg:-bottom-8 lg:-left-12 lg:size-28"
        style={rise(700)}
      >
        <div className="badge-swap">
          <span className="text-2xl font-light sm:text-3xl lg:text-4xl">
            {profile.heroBadge}
          </span>
          <span>
            <Hand
              className="badge-wave size-8 sm:size-10 lg:size-12"
              strokeWidth={1.5}
            />
          </span>
        </div>
      </div>
    </>
  );
}

/**
 * Entrance delay rhythm: the composition lands in ~0.3s steps rather
 * than a tight stagger.
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
 *   NAME
 *   EMBEDDED   [PORTRAIT]   ENGINEER
 *                           description
 *
 * Mobile stacks: name, EMBEDDED, portrait, ENGINEER, description.
 *
 * On desktop the portrait itself is not rendered here. The grid only
 * leaves a gap of the right size, exactly centred in a viewport-tall
 * section, and the travelling card from portrait-stage.tsx sits over that
 * gap. That is why everything except the headline grid is positioned
 * absolutely at `lg`: any other in-flow content would push the gap off
 * centre and the card would no longer line up with it.
 *
 * The <h1> uses `display: contents` so both headline words are one heading
 * for assistive tech while still being placed individually on the grid.
 *
 * All entrance animation is CSS, so this stays a server component and the
 * content is visible without JavaScript.
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
      <div className="relative mx-auto flex min-h-svh w-full max-w-[90rem] flex-col justify-center px-5 pt-28 pb-24 sm:px-8 lg:h-svh lg:min-h-(--hero-min-height) lg:px-12 lg:py-0">
        {/* Eyebrow — what this engineer builds, before anything else loads */}
        <p
          className="hero-rise type-label mb-6 flex items-center justify-center gap-2.5 text-center text-foreground-muted lg:absolute lg:inset-x-12 lg:top-28 lg:mb-0"
          style={rise(240)}
        >
          <span
            aria-hidden="true"
            className="size-1.5 shrink-0 rounded-full bg-accent"
          />
          {profile.eyebrow}
        </p>

        <div className="grid grid-cols-1 items-center gap-x-6 gap-y-5 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-x-8 lg:gap-y-3">
          {/* Name — row 1 on mobile, above the left word on desktop */}
          <p
            className="hero-slide col-start-1 row-start-1 text-center font-display text-2xl uppercase lg:self-end lg:text-left lg:text-[2rem]"
            style={slide(300, 1)}
          >
            {profile.shortName}
          </p>

          {/* The two halves converge on the portrait: the left word travels
              in from the right, the right word from the left. */}
          <h1 className="contents">
            <span
              className="type-hero hero-slide col-start-1 row-start-2 block text-center lg:text-left"
              style={slide(300, 1)}
            >
              {profile.heroWords.left}
            </span>
            <span
              className="type-hero hero-slide col-start-1 row-start-4 block text-center lg:col-start-3 lg:row-start-2 lg:text-right"
              style={slide(300, -1)}
            >
              {profile.heroWords.right}
            </span>
          </h1>

          {/* Desktop: an empty gap the travelling card sits over. */}
          <div
            aria-hidden="true"
            className="col-start-2 row-span-3 row-start-1 hidden aspect-4/5 w-(--portrait-width) lg:block"
          />

          {/* Mobile and tablet: the portrait in the flow, between the words. */}
          <div
            className="hero-flip relative z-10 col-start-1 row-start-3 mx-auto w-[min(68vw,17rem)] lg:hidden"
            style={rise(0)}
          >
            <div className="group relative aspect-4/5 overflow-hidden rounded-[2rem] border border-border bg-surface-elevated shadow-elevated">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                priority
                sizes="(min-width: 1024px) 24vw, 68vw"
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
                  sizes="(min-width: 1024px) 24vw, 68vw"
                  className="portrait-hover object-cover"
                  style={{ objectPosition: hoverPortrait.focus }}
                />
              )}
            </div>
            <PortraitTrim />
          </div>

          {/* Supporting statement: a stronger claim (tagline) first, the
              specifics (support line + spec strip) trailing it — two
              tiers of typographic weight instead of one flat paragraph. */}
          <div
            className="hero-slide col-start-1 row-start-5 mx-auto mt-1 max-w-sm text-center lg:col-start-3 lg:row-start-3 lg:mt-0 lg:mr-0 lg:max-w-88 lg:self-start lg:text-right"
            style={slide(300, -1)}
          >
            <p className="text-lg leading-snug text-foreground sm:text-xl">
              {profile.tagline}
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground-muted">
              {profile.taglineSupport}
            </p>
            <p className="type-meta mt-5 border-t border-border pt-4 text-foreground-muted">
              {specLine}
            </p>
          </div>
        </div>

        {/* Actions and status. One strip pinned to the bottom of the hero
            on desktop: primary action first, résumé second — the hero
            should point somewhere before it points everywhere. */}
        <div
          className="hero-rise mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 lg:absolute lg:inset-x-12 lg:bottom-20 lg:mt-0"
          style={rise(500)}
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <LinkButton href="/projects" variant="primary">
              See my work
              <ArrowRight aria-hidden="true" className="size-4" />
            </LinkButton>
            <LinkButton href="/resume" variant="secondary">
              <FileDown aria-hidden="true" className="size-4" />
              Résumé
            </LinkButton>
          </div>
          {profile.availability.available && (
            <p className="type-meta flex items-center gap-2 text-foreground-muted">
              <span className="status-dot relative inline-flex size-2 rounded-full bg-success" />
              {profile.availability.shortLabel}
            </p>
          )}
          <span className="type-meta hidden items-center gap-2 text-foreground-muted sm:inline-flex">
            <ArrowDown aria-hidden="true" className="size-3.5" />
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
