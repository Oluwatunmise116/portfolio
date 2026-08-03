"use client";

import { useState } from "react";

import { ArticleRow } from "@/components/blog/article-row";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import {
  articleTopics,
  type Article,
  type ArticleTopic,
} from "@/types/article";
import { cn } from "@/lib/utils";

type Filter = "All" | ArticleTopic;

/** Topic filtering over the chronological article list. */
export function TopicFilter({ articles }: { articles: Article[] }) {
  const [active, setActive] = useState<Filter>("All");

  // Only offer topics that actually have articles, plus "All".
  const availableTopics = articleTopics.filter((topic) =>
    articles.some((a) => a.topic === topic),
  );
  const filters: Filter[] = ["All", ...availableTopics];

  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  const visible =
    active === "All" ? sorted : sorted.filter((a) => a.topic === active);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter articles by topic"
        className="flex flex-wrap gap-2"
      >
        {filters.map((filter) => {
          const selected = filter === active;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(filter)}
              className={cn(
                "min-h-10 rounded-sm border px-4 text-sm transition-[background-color,border-color,color] duration-160 ease-out-strong active:scale-[0.98]",
                selected
                  ? "border-accent bg-accent-soft font-medium text-accent"
                  : "border-border text-foreground-muted hover:border-border-strong hover:text-foreground",
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} article{visible.length === 1 ? "" : "s"} shown
      </p>

      {visible.length > 0 ? (
        <ul key={active} className="mt-8 list-none">
          {visible.map((article, i) => (
            <ArticleRow
              key={article.slug}
              article={article}
              className="filter-enter"
              style={{ "--enter-index": i } as React.CSSProperties}
            />
          ))}
        </ul>
      ) : (
        <div className="mt-8">
          <EmptyState
            title="Nothing under this topic yet"
            description="Notes on this topic are still in draft. Try another topic, or check back soon."
            action={
              <Button variant="secondary" onClick={() => setActive("All")}>
                Show all articles
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}
