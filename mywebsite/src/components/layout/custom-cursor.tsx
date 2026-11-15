"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/** Anything the dot should react to by growing. */
const INTERACTIVE = "a, button, [role='button'], summary, label, select";
/** Regions that draw their own pointer treatment (e.g. project cards). */
const HIDDEN = "[data-cursor='hide']";

type CursorState = "idle" | "active" | "hidden";

/**
 * A small accent dot that trails the pointer and swells over anything
 * clickable. The real cursor stays visible — this is an accompaniment,
 * not a replacement, so nothing about pointing gets harder.
 *
 * Mounted only for a hover-capable fine pointer with motion allowed;
 * touch and reduced-motion visitors never get it.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<CursorState>("idle");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Stiff and heavily damped: the dot lags by a few frames, never wobbles.
  const springX = useSpring(x, { stiffness: 500, damping: 60, mass: 1 });
  const springY = useSpring(y, { stiffness: 500, damping: 60, mass: 1 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setEnabled(finePointer.matches && !reducedMotion.matches);
    update();
    finePointer.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      finePointer.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest(HIDDEN)) setState("hidden");
      else if (target?.closest(INTERACTIVE)) setState("active");
      else setState("idle");
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const shown = visible && state !== "hidden";

  return (
    <motion.div
      aria-hidden="true"
      className="print-hidden pointer-events-none fixed top-0 left-0 z-90"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="-mt-2 -ml-2 size-4 rounded-full bg-accent"
        initial={false}
        animate={{
          scale: shown ? (state === "active" ? 2.75 : 1) : 0,
          opacity: shown ? (state === "active" ? 0.3 : 0.9) : 0,
        }}
        transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
      />
    </motion.div>
  );
}
