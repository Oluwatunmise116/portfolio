import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types/article";

export function FeaturedPost({ article }: { article: Article }) {
  return (
    <article className="grid overflow-hidden rounded-sm border border-border lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <div className="relative aspect-video lg:aspect-auto lg:min-h-80">
        <Image
          src={article.cover}
          alt={`Placeholder cover artwork for ${article.title}`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-border bg-surface p-6 md:p-8 lg:border-t-0 lg:border-l">
        <p className="type-meta flex flex-wrap items-center gap-3 text-foreground-muted">
          <Badge tone="accent">Featured</Badge>
          <span>{article.topic}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime}</span>
        </p>
        <h2 className="type-section-title">{article.title}</h2>
        <p className="text-sm text-foreground-muted">{article.summary}</p>
        <div className="mt-auto pt-2">
          <LinkButton href={`/blog/${article.slug}`} variant="primary">
            Read article
            <ArrowRight aria-hidden="true" className="size-4" />
          </LinkButton>
        </div>
      </div>
    </article>
  );
}
