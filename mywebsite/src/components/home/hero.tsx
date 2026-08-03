import { ArrowRight, FileDown } from "lucide-react";

import { LinkButton } from "@/components/ui/link-button";
import { profile } from "@/data/profile";

/**
 * Centered hero (wireframe 1a). A fine coordinate grid and a single
 * oscilloscope trace sit behind the copy — quiet enough that the headline
 * stays the loudest thing on screen.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="grid-bg absolute inset-0" />
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-accent opacity-[0.18]"
        viewBox="0 0 1440 200"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          className="signal-trace"
          pathLength="1"
          d="M0 100 H240 V60 H320 V140 H420 V100 H560 L600 40 L640 160 L680 100 H860 V70 H940 V130 H1040 V100 H1200 V60 H1280 V100 H1440"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>

      <div className="relative mx-auto flex min-h-[calc(100svh-8rem)] w-full max-w-320 flex-col items-center justify-center px-5 py-20 text-center sm:px-8 md:py-28">
        <p
          className="type-label hero-rise text-foreground-muted"
          style={{ "--rise-delay": "0ms" } as React.CSSProperties}
        >
          {profile.eyebrow}
        </p>

        <h1
          className="type-display hero-rise mt-6 max-w-4xl"
          style={{ "--rise-delay": "80ms" } as React.CSSProperties}
        >
          I build embedded systems that move from{" "}
          <span className="text-accent">schematic</span> to the real world.
        </h1>

        <p
          className="hero-rise mt-6 max-w-xl text-balance text-foreground-muted md:text-lg"
          style={{ "--rise-delay": "160ms" } as React.CSSProperties}
        >
          {profile.intro}
        </p>

        <div
          className="hero-rise mt-10 flex flex-wrap items-center justify-center gap-3"
          style={{ "--rise-delay": "240ms" } as React.CSSProperties}
        >
          <LinkButton href="/projects" variant="primary">
            View selected work
            <ArrowRight aria-hidden="true" className="size-4" />
          </LinkButton>
          <LinkButton href="/about" variant="secondary">
            About me
          </LinkButton>
        </div>

        <div
          className="hero-rise mt-6 flex flex-wrap items-center justify-center gap-6"
          style={{ "--rise-delay": "300ms" } as React.CSSProperties}
        >
          <a
            href="/resume/resume-placeholder.pdf"
            download
            className="inline-flex min-h-11 items-center gap-2 text-sm text-foreground-muted underline decoration-border-strong underline-offset-4 transition-colors duration-160 ease-out-strong hover:text-accent hover:decoration-accent"
          >
            <FileDown aria-hidden="true" className="size-4" />
            Download résumé
          </a>
          {profile.availability.available && (
            <p className="type-meta flex items-center gap-2 text-foreground-muted">
              <span className="relative inline-flex size-2 rounded-full bg-success status-dot" />
              {profile.availability.label}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
