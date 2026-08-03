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

export const DURATION = {
  fast: 0.16,
  base: 0.22,
  slow: 0.32,
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

/** Mobile navigation sheet. Enters from the top edge it belongs to. */
export const sheetVariants: Variants = {
  hidden: { opacity: 0, transform: "translateY(-8px)" },
  visible: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    transform: "translateY(-6px)",
    transition: exitTransition,
  },
};
