import type { Metadata } from "next";

import { X_HANDLE } from "@/data/social-links";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE_SUFFIX,
  SITE_URL,
} from "@/lib/constants";

type PageMetadataInput = {
  title?: string;
  description?: string;
  path: string;
  /** Absolute or site-relative OG image. Falls back to the shared card. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  /**
   * Override the canonical URL — used by blog previews whose canonical
   * source is the Medium article, not the internal route.
   */
  canonical?: string;
};

/**
 * Shared metadata helper so every page gets consistent titles, canonical
 * URLs, and social cards.
 * TODO: replace /images/og-card.svg with a real 1200×630 raster card once
 * branded artwork is available.
 */
export function createMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
  image = "/images/og-card.svg",
  type = "website",
  publishedTime,
  canonical,
}: PageMetadataInput): Metadata {
  const fullTitle = title
    ? `${title} | ${SITE_TITLE_SUFFIX}`
    : SITE_TITLE_SUFFIX;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: canonical ?? url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: X_HANDLE,
    },
  };
}
