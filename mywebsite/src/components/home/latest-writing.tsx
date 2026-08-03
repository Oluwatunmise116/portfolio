import { ArrowRight } from "lucide-react";

import { ArticleRow } from "@/components/blog/article-row";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { articles } from "@/data/articles";

export function LatestWriting() {
  const latest = [...articles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <section aria-label="Latest writing">
      <Container className="py-20 md:py-28">
        <SectionHeading
          index="04"
          eyebrow="Writing"
          title="Latest notes"
          description="Field notes on embedded systems, vehicle diagnostics, and firmware reliability."
        >
          <LinkButton href="/blog" variant="ghost">
            All writing
            <ArrowRight aria-hidden="true" className="size-4" />
          </LinkButton>
        </SectionHeading>

        <ul className="list-none">
          {latest.map((article) => (
            <ArticleRow key={article.slug} article={article} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
