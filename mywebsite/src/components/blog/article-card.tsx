import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Article } from "@/types/article";
import { formatArticleDate } from "@/data/articles";
import { cn } from "@/lib/utils";

type ArticleCardProps = {
  article: Article;
  headingLevel?: "h2" | "h3";
  className?: string;
};

/**
 * Blog card: cover image, category + date metadata, title, excerpt, and a
 * "Read article" action. The card links to the internal preview page; the
 * external-link marker signals that the article itself lives on Medium.
 */
export function ArticleCard({
  article,
  headingLevel: Heading = "h3",
  className,
}: ArticleCardProps) {
  return (
    <article className={cn("group relative flex h-full flex-col", className)}>
      {/* 16:9 matches the source artwork exactly, the covers have their
          titles baked in, so any tighter crop clips them. */}
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-surface-muted">
        <Image
          src={article.cover}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, 92vw"
          className="object-cover transition-transform duration-280 ease-out-strong group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <p className="type-label flex flex-wrap items-center gap-x-2 text-foreground-muted">
          <span className="text-accent">{article.category}</span>
          <span aria-hidden="true" className="opacity-50">
            /
          </span>
          <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
          {article.readingTime && (
            <>
              <span aria-hidden="true" className="opacity-50">
                /
              </span>
              <span>{article.readingTime}</span>
            </>
          )}
        </p>

        <Heading className="type-card-title mt-3">
          <Link
            href={`/blog/${article.slug}`}
            className="inline-block transition-[color,scale] duration-160 ease-out-strong after:absolute after:inset-0 group-hover:text-accent active:scale-[0.99]"
          >
            {article.title}
          </Link>
        </Heading>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground-muted">
          {article.excerpt}
        </p>

        <p className="mt-auto flex items-center gap-2 pt-5 text-sm font-medium text-foreground-muted transition-colors duration-160 ease-out-strong group-hover:text-accent">
          Read article
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-160 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
          <span className="sr-only">(hosted on Medium)</span>
        </p>
      </div>
    </article>
  );
}
