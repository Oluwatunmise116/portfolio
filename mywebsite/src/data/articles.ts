import type { Article } from "@/types/article";

import { MEDIUM_PROFILE_URL } from "@/data/social-links";

export { MEDIUM_PROFILE_URL };

/**
 * Published Medium articles — the Medium URL is the canonical source for
 * every post. Excerpts below are short original summaries written for this
 * site, not copied article text. Reading times are only present where
 * confirmed; do not invent them.
 *
 * Covers are the real Medium artwork (public/images/blog/*.webp) at 16:9,
 * which is why the cards and hero use a 16:9 frame — a tighter crop clips
 * the titles baked into the artwork.
 */
export const articles: Article[] = [
  {
    slug: "iso-standards-rulebooks",
    title: "ISO Standards: The Rulebooks Behind How Cars Talk",
    excerpt:
      "Why vehicle communication works the same way across manufacturers: a tour of the ISO standards that govern diagnostics, transport protocols, and the wiring underneath.",
    category: "Standards",
    date: "2026-07-22",
    readingTime: "11 min read",
    cover: "/images/blog/iso-standards-rulebooks.webp",
    mediumUrl:
      "https://medium.com/@olabanjitunmise234/iso-standards-the-rulebooks-behind-how-cars-talk-2c1506bcfbb3",
    featured: true,
  },
  {
    slug: "obd2-explained",
    title: "OBD-II Explained: The Diagnostic Doorway Into Your Car's Brain",
    excerpt:
      "The 16-pin port under the dashboard is the most useful interface on a vehicle. What it exposes, how the standard services work, and why every scan tool starts here.",
    category: "Automotive Diagnostics",
    date: "2026-07-10",
    readingTime: "10 min read",
    cover: "/images/blog/obd2-explained.webp",
    mediumUrl:
      "https://medium.com/@olabanjitunmise234/obd-ii-explained-the-diagnostic-doorway-into-your-cars-brain-9e7a45cd81e4",
    featured: false,
  },
  {
    slug: "introduction-to-can-bus",
    title: "Introduction to CAN Bus: The Language of Modern Cars",
    excerpt:
      "A two-wire bus designed in the 1980s still runs nearly every modern vehicle. How CAN arbitration, framing, and error handling earned that longevity.",
    category: "Vehicle Communication",
    date: "2026-07-07",
    cover: "/images/blog/introduction-to-can-bus.webp",
    mediumUrl:
      "https://medium.com/@olabanjitunmise234/introduction-to-can-bus-the-language-of-modern-cars-9730712005ad",
    featured: false,
  },
  {
    slug: "evolution-of-communication-protocols",
    title: "The Evolution of Communication Protocols in Cars",
    excerpt:
      "From single-wire links to automotive Ethernet: how in-vehicle networking evolved, and why each protocol still has a seat in the modern car.",
    category: "Vehicle Communication",
    date: "2026-06-26",
    cover: "/images/blog/evolution-of-communication-protocols.webp",
    mediumUrl:
      "https://medium.com/@olabanjitunmise234/the-evolution-of-communication-protocols-in-cars-62a08858ae9a",
    featured: false,
  },
  {
    slug: "major-systems-inside-your-car",
    title: "Major Systems Inside Your Car: The Real Team Behind Every Drive",
    excerpt:
      "Powertrain, chassis, body, and infotainment — the electronic control units that cooperate on every drive, and how the work is divided between them.",
    category: "Vehicle Systems",
    date: "2026-06-18",
    cover: "/images/blog/major-systems-inside-your-car.webp",
    mediumUrl:
      "https://medium.com/@olabanjitunmise234/major-systems-inside-your-car-the-real-team-behind-every-drive-e4d404909d49",
    featured: false,
  },
  {
    slug: "secret-conversation-inside-your-car",
    title: "The Secret Conversation Happening Inside Your Car",
    excerpt:
      "Dozens of computers are talking constantly while you drive. An introduction to the hidden traffic on a vehicle network and why it matters.",
    category: "Vehicle Communication",
    date: "2026-06-11",
    cover: "/images/blog/secret-conversation-inside-your-car.webp",
    mediumUrl:
      "https://medium.com/@olabanjitunmise234/the-secret-conversation-happening-inside-your-car-facb8fdbea57",
    featured: false,
  },
];

export const featuredArticle: Article =
  articles.find((a) => a.featured) ?? articles[0];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function adjacentArticles(slug: string): {
  previous: Article | null;
  next: Article | null;
} {
  const index = articles.findIndex((a) => a.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? articles[index - 1] : null,
    next: index < articles.length - 1 ? articles[index + 1] : null,
  };
}

/** Human-readable date, e.g. "July 22, 2026". */
export function formatArticleDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
