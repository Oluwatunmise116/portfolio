import { ArrowDown, FileDown } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { heroHoverPortrait, portraitFor } from "@/data/portraits";
import { profile } from "@/data/profile";

function rise(delay: number): CSSProperties {
  return { "--rise-delay": `${delay}ms` } as CSSProperties;
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
      <div className="mx-auto flex min-h-svh w-full max-w-[90rem] flex-col justify-center px-5 pt-28 pb-10 sm:px-8 lg:px-12 lg:pt-32">
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
            <div className="group relative aspect-4/5 overflow-hidden rounded-[2rem] border border-border bg-surface-muted shadow-card">
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

          {/* Supporting description */}
          <p
            className="hero-rise col-start-1 row-start-5 mx-auto mt-1 max-w-xs text-center text-[0.95rem] leading-relaxed text-foreground-muted lg:col-start-3 lg:row-start-3 lg:mx-0 lg:pl-2 lg:text-left"
            style={rise(440)}
          >
            {profile.intro}
          </p>
        </div>

        {/* Bottom strip: availability, résumé, theme */}
        <div
          className="hero-rise mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:mt-16"
          style={rise(560)}
        >
          {profile.availability.available && (
            <p className="type-meta flex items-center gap-2 text-foreground-muted">
              <span className="relative inline-flex size-2 rounded-full bg-success status-dot" />
              {profile.availability.shortLabel}
            </p>
          )}
          <a
            href="/resume"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground-muted underline decoration-border-strong underline-offset-4 transition-colors duration-160 ease-out-strong hover:text-accent hover:decoration-accent"
          >
            <FileDown aria-hidden="true" className="size-4" />
            View résumé
          </a>
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
