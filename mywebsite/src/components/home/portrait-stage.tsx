"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import type { PortraitImage } from "@/data/portraits";

type PortraitStageProps = {
  /** The three sections the card travels through, top to bottom. */
  hero: ReactNode;
  services: ReactNode;
  about: ReactNode;
  /** Photo on the face of the card (what the hero shows). */
  front: PortraitImage;
  /** Photo on the reverse, revealed as the card turns over. */
  back: PortraitImage;
  /** Word in the circular badge pinned to the card's corner. */
  badge: ReactNode;
};

/**
 * Where the card rests beside each section, as [services, about].
 * `rotate` is the in-plane tilt and `rotateY` the turn about its vertical
 * axis, both in degrees: 150° shows the reverse, 340° is the front again,
 * angled 20° toward the text.
 */
const REST = {
  rotate: [10, 5],
  rotateY: [150, 340],
  scale: [0.88, 0.96],
} as const;

/** Horizontal shift used until the real landing spots have been measured. */
const FALLBACK_SHIFT = 300;

const SIZES = "(min-width: 1024px) 24vw, 68vw";

/**
 * Desktop-only scroll choreography for the home page's first three
 * sections.
 *
 * The portrait card sits in a layer above the sections and sticks to the
 * centre of the viewport. As the services section scrolls in, the card
 * slides to the right, tilts, and turns over to show a second photo; as
 * the about section follows, it turns back to its front and settles
 * beside the biography. Each section marks where the card should land
 * with an empty `[data-portrait-land]` element, so the layout, not a
 * hard-coded offset, decides how far it travels.
 *
 * Below the `lg` breakpoint, with reduced motion, or without JavaScript
 * the layer is inert: the hero shows its own in-flow portrait and the
 * about section its own photo.
 */
export function PortraitStage({
  hero,
  services,
  about,
  front,
  back,
  badge,
}: PortraitStageProps) {
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [shift, setShift] = useState<[number, number]>([
    FALLBACK_SHIFT,
    FALLBACK_SHIFT,
  ]);

  // How far from the viewport's centre line each landing spot sits.
  useEffect(() => {
    const measure = () => {
      const centre = document.documentElement.clientWidth / 2;
      const offsetOf = (section: HTMLElement | null) => {
        const spot = section?.querySelector("[data-portrait-land]");
        if (!spot) return FALLBACK_SHIFT;
        const rect = spot.getBoundingClientRect();
        // Hidden below `lg`, where the card does not travel anyway.
        if (rect.width === 0) return FALLBACK_SHIFT;
        return rect.left + rect.width / 2 - centre;
      };
      setShift([offsetOf(servicesRef.current), offsetOf(aboutRef.current)]);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // 0 → 1 as each section's top edge crosses the viewport, bottom to top.
  const { scrollYProgress: toServices } = useScroll({
    target: servicesRef,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress: toAbout } = useScroll({
    target: aboutRef,
    offset: ["start end", "start start"],
  });

  /** Blend rest → services → about for one transform channel. */
  const blend =
    (start: number, stops: readonly [number, number]) =>
    ([a, b]: number[]) =>
      reduceMotion
        ? start
        : start + (stops[0] - start) * a + (stops[1] - stops[0]) * b;

  // The spring gives the card a little weight: it trails the scroll
  // position slightly and settles, rather than tracking it rigidly.
  const spring = { stiffness: 500, damping: 60, mass: 1 };
  const progress = [toServices, toAbout];
  const x = useSpring(useTransform(progress, blend(0, shift)), spring);
  const rotate = useSpring(
    useTransform(progress, blend(0, REST.rotate)),
    spring,
  );
  const rotateY = useSpring(
    useTransform(progress, blend(0, REST.rotateY)),
    spring,
  );
  const scale = useSpring(useTransform(progress, blend(1, REST.scale)), spring);
  // The badge and corner marks belong to the hero pose only.
  const trimOpacity = useTransform(toServices, [0, 0.3], [1, 0]);

  return (
    <div className="relative">
      {hero}
      <div ref={servicesRef}>{services}</div>
      <div ref={aboutRef}>{about}</div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 hidden lg:block"
      >
        <div className="portrait-frame">
          <div
            className="hero-flip w-(--portrait-width)"
            style={{ "--rise-delay": "0ms" } as CSSProperties}
          >
            <motion.div
              className="relative aspect-4/5 will-change-transform"
              style={{
                x,
                rotate,
                rotateY,
                scale,
                transformPerspective: 1200,
                transformStyle: "preserve-3d",
              }}
            >
              <div className="portrait-face rounded-[2rem] border border-border bg-surface-elevated shadow-elevated">
                <Image
                  src={front.src}
                  alt=""
                  fill
                  priority
                  sizes={SIZES}
                  className="object-cover"
                  style={{ objectPosition: front.focus }}
                />
              </div>
              <div className="portrait-face portrait-face-back rounded-[2rem] border border-border bg-surface-elevated shadow-elevated">
                <Image
                  src={back.src}
                  alt=""
                  fill
                  sizes={SIZES}
                  className="object-cover"
                  style={{ objectPosition: back.focus }}
                />
              </div>

              <motion.div
                className="absolute inset-0"
                style={{ opacity: trimOpacity }}
              >
                {badge}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
