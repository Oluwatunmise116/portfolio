import { ArrowUpRight } from "lucide-react";

import { ArticleCard } from "@/components/blog/article-card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { articles, MEDIUM_PROFILE_URL } from "@/data/articles";

/** Home "Automotive Insights & Engineering Notes" — three latest posts. */
export function LatestArticles() {
  const latest = articles.slice(0, 3);

  return (
    <section aria-labelledby="latest-articles-title">
      <Container className="py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-end md:gap-16">
          <Reveal>
            <h2 id="latest-articles-title" className="type-section-title">
              Automotive insights &amp; engineering notes
            </h2>
          </Reveal>
          <Reveal delay={80} className="md:justify-self-end">
            <a
              href={MEDIUM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground-muted transition-colors duration-160 ease-out-strong hover:text-accent"
            >
              View all on Medium
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-160 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {latest.map((article, index) => (
            <Reveal key={article.slug} delay={Math.min(index * 80, 160)}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
