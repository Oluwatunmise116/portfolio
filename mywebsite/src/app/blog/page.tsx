import { ArrowUpRight } from "lucide-react";

import { ArticleCard } from "@/components/blog/article-card";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { articles, MEDIUM_PROFILE_URL } from "@/data/articles";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Blog",
  description:
    "Automotive insights and engineering notes — CAN bus, OBD-II, ISO standards, vehicle systems, and embedded engineering, published on Medium.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Automotive insights & engineering notes"
        title="Blog"
        lead="Field notes on how vehicles communicate — CAN bus, OBD-II, diagnostics standards, and the systems behind every drive. Articles are published on Medium."
      />

      <Container className="pb-16 md:pb-24">
        <section aria-label="All articles">
          <ul className="grid list-none gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <Reveal
                as="li"
                key={article.slug}
                delay={Math.min((index % 3) * 60, 180)}
              >
                <ArticleCard article={article} headingLevel="h2" />
              </Reveal>
            ))}
          </ul>
        </section>

        <aside className="mt-24 flex flex-col items-center gap-4 border-t border-border pt-14 text-center">
          <p className="max-w-md text-lg text-foreground-muted">
            New articles land on Medium first — follow there to catch the next
            one.
          </p>
          <a
            href={MEDIUM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-control px-6 text-sm font-semibold text-control-foreground transition-transform duration-160 ease-out-strong hover:opacity-90 active:scale-[0.98]"
          >
            View all on Medium
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-160 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </aside>
      </Container>
    </>
  );
}
