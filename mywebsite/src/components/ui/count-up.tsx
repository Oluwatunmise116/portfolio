"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type CountUpProps = {
  /**
   * The value to display, e.g. "11", "24+", "98%", or a bracketed
   * placeholder like "[X]+". Only a leading integer animates; any prefix
   * or suffix is preserved verbatim.
   */
  value: string;
  className?: string;
  /** Total count duration in ms. */
  duration?: number;
};

/** Splits "24+" into { prefix: "", number: 24, suffix: "+" }. */
function parse(value: string): {
  prefix: string;
  number: number | null;
  suffix: string;
} {
  const match = value.match(/^(\D*?)(\d+)([\s\S]*)$/);
  if (!match) return { prefix: value, number: null, suffix: "" };
  return { prefix: match[1], number: Number(match[2]), suffix: match[3] };
}

/**
 * Runs before paint on the client so the counter can be reset to zero
 * without a visible flash of the final figure; falls back to useEffect
 * during server rendering, where layout effects do not run.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Counts a statistic up from zero the first time it scrolls into view.
 *
 * The final value is what renders on the server, so it is also what shows
 * without JavaScript, under reduced motion, and to search engines — the
 * animation only ever subtracts from a correct starting point.
 *
 * Frames are written straight to the DOM node rather than through state:
 * a counter re-rendering React 60 times a second is pure waste, and four
 * of them share the page.
 *
 * Values with no digits — the bracketed `[X]` placeholders still in
 * profile.ts — render as plain text and never animate, so this is safe to
 * use everywhere and starts working on its own once real figures land.
 */
export function CountUp({ value, className, duration = 1200 }: CountUpProps) {
  const { prefix, number, suffix } = parse(value);
  const ref = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (number === null) return;
    const node = ref.current;
    if (!node) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // leave the final value in place
    }

    const write = (n: number) => {
      node.textContent = `${prefix}${n}${suffix}`;
    };

    write(0);

    let raf = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      start ??= now;
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast start, long settle, matching the hero curve.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      write(Math.round(eased * number));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            raf = requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      write(number); // restore the true value if unmounted mid-count
    };
  }, [number, prefix, suffix, duration]);

  if (number === null) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={cn("tabular-nums", className)}>
      {/* The digits churn, so they are hidden from assistive tech and the
          settled value is exposed as static text instead. */}
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
