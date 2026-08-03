import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { cn, formatDate } from "@/lib/utils";
import type { Article } from "@/types/article";

/** Chronological editorial row for the writing list. */
export function ArticleRow({
  article,
  className,
  style,
}: {
  article: Article;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <li
      className={cn("border-b border-border first:border-t", className)}
      style={style}
    >
      <Link
        href={`/blog/${article.slug}`}
        className="group relative flex flex-col gap-1.5 py-5 pr-10 transition-colors duration-220 ease-out-strong hover:bg-surface-hover md:grid md:grid-cols-[8rem_minmax(0,1fr)_auto_auto] md:items-center md:gap-x-6 md:py-6 md:pr-2"
      >
        <time
          dateTime={article.date}
          className="type-meta text-foreground-muted"
        >
          {formatDate(article.date)}
        </time>

        <span className="min-w-0">
          <span className="type-card-title block transition-colors duration-160 ease-out-strong group-hover:text-accent">
            {article.title}
          </span>
          <span className="mt-1 block text-sm text-foreground-muted">
            {article.summary}
          </span>
        </span>

        <span className="type-meta flex items-center gap-3 text-foreground-muted">
          <span>{article.topic}</span>
          <span aria-hidden="true" className="text-foreground-muted/50">
            ·
          </span>
          <span>{article.readingTime}</span>
        </span>

        <ArrowUpRight
          aria-hidden="true"
          className="absolute top-6 right-2 size-5 text-foreground-muted transition-[transform,color] duration-160 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent md:static md:justify-self-end"
        />
      </Link>
    </li>
  );
}
