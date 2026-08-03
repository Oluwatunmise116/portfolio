import { ArrowRight } from "lucide-react";

import { FeaturedPost } from "@/components/blog/featured-post";
import { TopicFilter } from "@/components/blog/topic-filter";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { articles, featuredArticle } from "@/data/articles";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Writing",
  description:
    "Field notes on embedded systems, automotive diagnostics, OBD-II, firmware reliability, hardware, and IoT.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <Container className="py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="type-label text-foreground-muted">
          <span aria-hidden="true" className="text-accent">
            /writing
          </span>
        </p>
        <h1 className="type-page-title mt-4">Writing</h1>
        <p className="mt-5 text-foreground-muted md:text-lg">
          Field notes from the bench — vehicle diagnostics, firmware
          reliability, and the practical side of building connected hardware.
        </p>
      </header>

      <section aria-label="Featured article" className="mt-12 md:mt-16">
        <FeaturedPost article={featuredArticle} />
      </section>

      <section aria-label="All articles" className="mt-16 md:mt-20">
        <TopicFilter articles={articles} />
      </section>

      <aside className="mt-20 flex flex-col items-center gap-4 border-t border-border pt-12 text-center">
        <p className="max-w-md text-foreground-muted">
          No newsletter yet — if something here is useful, the contact page is
          the best way to continue the conversation.
        </p>
        <LinkButton href="/contact" variant="secondary">
          Get in touch
          <ArrowRight aria-hidden="true" className="size-4" />
        </LinkButton>
      </aside>
    </Container>
  );
}
