export const articleCategories = [
  "Automotive Diagnostics",
  "Vehicle Communication",
  "Vehicle Systems",
  "Standards",
] as const;

export type ArticleCategory = (typeof articleCategories)[number];

/**
 * Articles are published on Medium; the site stores curated metadata and a
 * short original excerpt only. Internal /blog/[slug] routes render a
 * preview page whose primary action is "Continue reading on Medium", and
 * the Medium URL is the canonical source.
 */
export type Article = {
  slug: string;
  title: string;
  /** Short original excerpt written for this site (not copied from Medium). */
  excerpt: string;
  category: ArticleCategory;
  /** ISO date, yyyy-mm-dd (Medium publication date). */
  date: string;
  /**
   * Known reading time, e.g. "11 min read". Omitted when not confirmed —
   * never fabricated.
   */
  readingTime?: string;
  cover: string;
  /** Canonical Medium URL. */
  mediumUrl: string;
  featured: boolean;
};
