export const articleTopics = [
  "Embedded Systems",
  "Automotive Diagnostics",
  "OBD-II",
  "Firmware",
  "Hardware",
  "IoT",
  "Engineering Notes",
] as const;

export type ArticleTopic = (typeof articleTopics)[number];

/**
 * Structured article body. The shape deliberately mirrors what MDX would
 * produce (headings, paragraphs, code, callouts, figures) so migrating a
 * post to an .mdx file later is a copy-paste job, not a rewrite.
 */
export type ArticleSection =
  | { kind: "heading"; id: string; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "code"; language: string; code: string }
  | { kind: "callout"; title: string; text: string }
  | { kind: "figure"; src: string; alt: string; caption: string };

export type Article = {
  slug: string;
  title: string;
  summary: string;
  topic: ArticleTopic;
  /** ISO date, yyyy-mm-dd. */
  date: string;
  readingTime: string;
  cover: string;
  featured: boolean;
  sections: ArticleSection[];
};
