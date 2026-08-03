import { Info } from "lucide-react";
import Image from "next/image";

import type { ArticleSection } from "@/types/article";

/**
 * Renders the structured article body. Each section kind maps to the same
 * element an MDX pipeline would produce, so swapping to .mdx later keeps
 * the visual design unchanged.
 */
export function ArticleContent({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="flex max-w-prose min-w-0 flex-col gap-6">
      {sections.map((section, i) => {
        switch (section.kind) {
          case "heading":
            return (
              <h2
                key={section.id}
                id={section.id}
                className="type-section-title scroll-mt-24 pt-4"
              >
                {section.text}
              </h2>
            );
          case "paragraph":
            return (
              <p key={i} className="leading-relaxed text-foreground-muted">
                {section.text}
              </p>
            );
          case "list":
            return (
              <ul key={i} className="flex list-none flex-col gap-2.5">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3 text-foreground-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-px w-4 shrink-0 bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-sm border border-border bg-background-subtle p-4 dark:bg-surface"
              >
                <code className="type-meta block text-[0.8125rem] leading-relaxed whitespace-pre">
                  {section.code}
                </code>
              </pre>
            );
          case "callout":
            return (
              <aside
                key={i}
                className="rounded-sm border border-accent/30 border-l-2 border-l-accent bg-accent-soft p-4"
              >
                <p className="flex items-center gap-2 text-sm font-medium">
                  <Info aria-hidden="true" className="size-4 text-accent" />
                  {section.title}
                </p>
                <p className="mt-2 text-sm text-foreground-muted">
                  {section.text}
                </p>
              </aside>
            );
          case "figure":
            return (
              <figure key={i}>
                <div className="relative aspect-video overflow-hidden rounded-sm border border-border">
                  <Image
                    src={section.src}
                    alt={section.alt}
                    fill
                    sizes="(min-width: 768px) 672px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="type-meta mt-2 text-foreground-muted">
                  {section.caption}
                </figcaption>
              </figure>
            );
        }
      })}
    </div>
  );
}
