import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleContent } from "@/components/blog/article-content";
import { ShareLink } from "@/components/blog/share-link";
import { PrevNextNavigation } from "@/components/projects/project-navigation";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { adjacentArticles, articles, getArticle } from "@/data/articles";
import { profile } from "@/data/profile";
import { createMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) return {};
  return createMetadata({
    title: article.title,
    description: article.summary,
    path: `/blog/${article.slug}`,
    image: article.cover,
    type: "article",
    publishedTime: article.date,
  });
}

export default async function ArticlePage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { previous, next } = adjacentArticles(article.slug);
  const headings = article.sections.filter(
    (section) => section.kind === "heading",
  );

  return (
    <Container className="py-16 md:py-24">
      <Link
        href="/blog"
        className="group inline-flex min-h-11 items-center gap-2 text-sm text-foreground-muted transition-colors duration-160 ease-out-strong hover:text-accent"
      >
        <ArrowLeft
          aria-hidden="true"
          className="size-4 transition-transform duration-160 ease-out-strong group-hover:-translate-x-0.5"
        />
        Back to writing
      </Link>

      <header className="mt-6 max-w-3xl">
        <p className="type-meta flex flex-wrap items-center gap-3 text-foreground-muted">
          <Badge tone="accent">{article.topic}</Badge>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime}</span>
        </p>
        <h1 className="type-page-title mt-4">{article.title}</h1>
        <p className="mt-5 text-foreground-muted md:text-lg">
          {article.summary}
        </p>
        <p className="type-meta mt-6 text-foreground-muted">
          By {profile.name} — {profile.title}
        </p>
      </header>

      <div className="relative mt-10 aspect-video overflow-hidden rounded-sm border border-border md:mt-14">
        <Image
          src={article.cover}
          alt={`Placeholder cover artwork for ${article.title}`}
          fill
          priority
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,5fr)] lg:gap-16">
        <aside className="h-fit lg:sticky lg:top-24">
          {headings.length > 0 && (
            <nav aria-label="Table of contents">
              <h2 className="type-label mb-4 text-foreground-muted">
                On this page
              </h2>
              <ol className="flex list-none flex-col gap-2 border-l border-border">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className="-ml-px block border-l border-transparent py-1 pl-4 text-sm text-foreground-muted transition-colors duration-160 ease-out-strong hover:border-accent hover:text-accent"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <div className="mt-8 border-t border-border pt-4">
            <ShareLink />
          </div>
        </aside>

        <article className="min-w-0">
          <ArticleContent sections={article.sections} />
        </article>
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
