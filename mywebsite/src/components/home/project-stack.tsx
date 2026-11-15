"use client";

import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/** The few project fields a panel shows — not the whole Project record. */
export type StackProject = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  /** Short line in the chip above the title, e.g. "IoT / 2024". */
  label: string;
};

type ProjectStackProps = {
  projects: StackProject[];
};

/** How small a panel gets once the next one has fully covered it. */
const COVERED_SCALE = 0.86;

/**
 * Featured projects as a stack of full-width panels. From the `md`
 * breakpoint up, each panel sticks below the navigation while the next
 * slides up over it, and the covered panel shrinks back a little so the
 * pile reads as depth. On small screens they are an ordinary list.
 *
 * One scroll measurement drives every panel: the list's progress runs
 * 0 → 1 as it passes the sticking line, and because the panels are all
 * the same height, panel `i` is being covered during the slice
 * `i/n → (i+1)/n` of that progress.
 */
export function ProjectStack({ projects }: ProjectStackProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const [stacked, setStacked] = useState(false);

  // Matches the breakpoint at which `.stack-panel` becomes sticky.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setStacked(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: listRef,
    // 88px = the `top: 5.5rem` at which `.stack-panel` sticks.
    offset: ["start 88px", "end 88px"],
  });

  return (
    <ol ref={listRef} className="flex flex-col gap-8 md:gap-12">
      {projects.map((project, index) => (
        <StackPanel
          key={project.slug}
          project={project}
          index={index}
          total={projects.length}
          progress={scrollYProgress}
          animate={stacked && !reduceMotion}
        />
      ))}
    </ol>
  );
}

type StackPanelProps = {
  project: StackProject;
  index: number;
  total: number;
  progress: MotionValue<number>;
  animate: boolean;
};

function StackPanel({
  project,
  index,
  total,
  progress,
  animate,
}: StackPanelProps) {
  const isLast = index === total - 1;
  const scale = useTransform(
    progress,
    [index / total, (index + 1) / total],
    // The last panel has nothing to be covered by, so it never shrinks.
    [1, animate && !isLast ? COVERED_SCALE : 1],
  );

  return (
    <li className="stack-panel">
      <motion.article style={{ scale, transformOrigin: "50% 0%" }}>
        <Link
          href={`/projects/${project.slug}`}
          className="group relative block h-[min(72svh,42rem)] min-h-104 overflow-hidden rounded-[2rem] border border-border bg-surface-muted"
        >
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 1280px) 1184px, 92vw"
            className="object-cover transition-transform duration-700 ease-out-strong group-hover:scale-[1.04]"
          />
          {/* Flat scrim: the photos range from dark hardware shots to
              near-white, finely detailed schematics. 72% black keeps white
              text well above 4.5:1 on any of them and quiets the detail
              enough for the title to read cleanly. */}
          <div aria-hidden="true" className="absolute inset-0 bg-black/72" />

          <div className="relative flex h-full flex-col items-center justify-center px-6 py-10 text-center text-white">
            <p className="rounded-full bg-accent px-4 py-1 text-sm tracking-wide text-accent-foreground uppercase">
              {project.label}
            </p>
            <h3 className="mt-5 max-w-4xl font-display text-[clamp(2rem,1.2rem+3.4vw,4.5rem)] leading-[1.05] font-bold tracking-[-0.02em] text-balance uppercase">
              {project.title}
            </h3>
            <p className="mt-4 line-clamp-3 max-w-2xl leading-relaxed text-white/85">
              {project.summary}
            </p>
            <span className="mt-7 inline-flex items-center gap-2 font-display text-lg tracking-wide uppercase">
              View project
              <ArrowUpRight
                aria-hidden="true"
                className="size-5 transition-transform duration-300 ease-out-strong group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </span>
          </div>
        </Link>
      </motion.article>
    </li>
  );
}
