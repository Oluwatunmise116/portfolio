import type { Transition, Variants } from "motion/react";

/**
 * Central motion vocabulary. All JS-driven animation in the site pulls its
 * values from here so easing/duration stay cohesive with the CSS tokens
 * defined in globals.css.
 */

/* Mirrors --ease-out-strong */
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/* Mirrors --ease-in-out-strong */
export const EASE_IN_OUT: [number, number, number, number] = [
  0.77, 0, 0.175, 1,
];

/* Mirror the --duration-* tokens in globals.css. Keep them in sync. */
export const DURATION = {
  fast: 0.16,
  base: 0.22,
  slow: 0.28,
} as const;

export const enterTransition: Transition = {
  duration: DURATION.base,
  ease: EASE_OUT,
};

/* Exits are slightly faster than entrances */
export const exitTransition: Transition = {
  duration: DURATION.fast,
  ease: EASE_OUT,
};

/** Fade + small rise. Used for content that would otherwise pop in. */
export const fadeRise: Variants = {
  hidden: { opacity: 0, transform: "translateY(8px)" },
  visible: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: enterTransition,
  },
  exit: { opacity: 0, transition: exitTransition },
};

/**
 * Mobile navigation panel.
 *
 * Scales open from its trigger rather than fading in place, the panel is
 * spawned by the hamburger in the top-right of the header pill, so the
 * component sets `transform-origin: top right` to match. A popover that
 * grows from the control that opened it reads as connected to it; one
 * that fades in centred reads as unrelated.
 *
 * Written as a single transform string so the whole thing stays on the
 * compositor. Exit is faster than entry, as everywhere else on the site.
 */
export const sheetVariants: Variants = {
  hidden: { opacity: 0, transform: "translateY(-8px) scale(0.96)" },
  visible: {
    opacity: 1,
    transform: "translateY(0px) scale(1)",
    transition: { duration: 0.24, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    transform: "translateY(-6px) scale(0.97)",
    transition: exitTransition,
  },
};
