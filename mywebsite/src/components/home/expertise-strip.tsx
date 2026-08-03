import { expertiseStrip } from "@/data/skills";

/** Quiet wrapping strip of core disciplines, separated by tick marks. */
export function ExpertiseStrip() {
  return (
    <section
      aria-label="Areas of expertise"
      className="border-y border-border bg-background-subtle"
    >
      <ul className="mx-auto flex w-full max-w-320 flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-5 sm:px-8">
        {expertiseStrip.map((item) => (
          <li
            key={item}
            className="type-meta flex items-center gap-3 text-foreground-muted"
          >
            <span aria-hidden="true" className="h-3 w-px bg-accent/60" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
