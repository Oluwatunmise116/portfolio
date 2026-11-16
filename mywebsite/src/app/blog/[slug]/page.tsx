import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PrevNextNavigation } from "@/components/projects/project-navigation";
import { Container } from "@/components/ui/container";
import {
  adjacentArticles,
  articles,
  formatArticleDate,
  getArticle,
} from "@/data/articles";
import { profile } from "@/data/profile";
import { createMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) return {};
  return createMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    image: article.cover,
    type: "article",
    publishedTime: article.date,
    // The Medium article is the canonical source for every post.
    canonical: article.mediumUrl,
  });
}

/**
 * Article preview page (Strategy A): metadata, cover, and the original
 * site excerpt, with a prominent "Continue reading on Medium" action.
 * Full article bodies are never copied here, Medium is canonical.
 */
export default async function ArticlePreviewPage(
  props: PageProps<"/blog/[slug]">,
) {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { previous, next } = adjacentArticles(article.slug);

  return (
    <Container className="max-w-4xl pt-32 pb-16 md:pt-40 md:pb-24">
      <Link
        href="/blog"
        className="group inline-flex min-h-11 items-center gap-2 text-sm text-foreground-muted transition-colors duration-160 ease-out-strong hover:text-accent"
      >
        <ArrowLeft
          aria-hidden="true"
          className="size-4 transition-transform duration-160 ease-out-strong group-hover:-translate-x-0.5"
        />
        All articles
      </Link>

      <header className="mt-8">
        <p className="type-label flex flex-wrap items-center gap-x-3 gap-y-1 text-foreground-muted">
          <span className="text-accent">{article.category}</span>
          <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
          {article.readingTime && <span>{article.readingTime}</span>}
        </p>
        <h1 className="type-page-title mt-5">{article.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
          {article.excerpt}
        </p>
        <p className="type-meta mt-6 text-foreground-muted">
          By {profile.name}, {profile.title} · Published on Medium
        </p>
      </header>

      <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl border border-border md:mt-12">
        <Image
          src={article.cover}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 56rem, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface-elevated p-10 text-center shadow-card">
        <p className="max-w-md text-foreground-muted">
          The full article is published on Medium, the canonical home for all
          of my writing.
        </p>
        <a
          href={article.mediumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-control px-7 text-sm font-semibold text-control-foreground transition-transform duration-160 ease-out-strong hover:opacity-90 active:scale-[0.98]"
        >
          Continue reading on Medium
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-160 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      <div className="mt-16">
        <PrevNextNavigation
          ariaLabel="Adjacent articles"
          previous={
            previous
              ? {
                  href: `/blog/${previous.slug}`,
                  label: "Previous article",
                  title: previous.title,
                }
              : null
          }
          next={
            next
              ? {
                  href: `/blog/${next.slug}`,
                  label: "Next article",
                  title: next.title,
                }
              : null
          }
        />
      </div>
    </Container>
  );
}
