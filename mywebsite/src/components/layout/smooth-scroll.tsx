"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Inertial page scrolling for mouse and trackpad.
 *
 * Renders nothing. It is skipped entirely — leaving plain native
 * scrolling — on touch devices, where the platform's own momentum already
 * does this better, and for anyone who has asked for reduced motion.
 *
 * `lerp: 0.1` is the amount the page catches up to the wheel target each
 * frame: lower is floatier, higher is closer to native.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      // Clicking a link cancels any glide still in progress, so it can't
      // carry over onto the page being navigated to.
      stopInertiaOnNavigate: true,
    });
    lenisRef.current = lenis;

    let frame = requestAnimationFrame(function tick(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    });

    // If the visitor turns reduced motion on mid-session, hand scrolling
    // back to the browser straight away.
    const onMotionChange = () => {
      if (reducedMotion.matches) teardown();
    };
    reducedMotion.addEventListener("change", onMotionChange);

    function teardown() {
      cancelAnimationFrame(frame);
      reducedMotion.removeEventListener("change", onMotionChange);
      lenis.destroy();
      lenisRef.current = null;
    }

    return teardown;
  }, []);

  // A route change moves the page (to the top, or to a restored position
  // on back/forward) without going through Lenis. If Lenis were still
  // easing toward a target on the previous page it would drag the new
  // page back there, so adopt wherever the browser has just put us.
  useEffect(() => {
    lenisRef.current?.scrollTo(window.scrollY, {
      immediate: true,
      force: true,
    });
  }, [pathname]);

  return null;
}
