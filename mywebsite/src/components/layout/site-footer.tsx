import Image from "next/image";

import { BackToTop } from "@/components/layout/back-to-top";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Container } from "@/components/ui/container";
import { footerConfig, hasAttribution, hasPhone } from "@/data/footer";

/**
 * Site footer.
 *
 * Two content rows, no dividers between them — separation comes from
 * spacing alone:
 *   row 1 — email · telephone · social links
 *   row 2 — copyright · attribution
 *
 * Everything renders from `src/data/footer.ts`. Groups with no configured
 * value (telephone, creator attribution, Behance/Dribbble) are omitted
 * rather than rendered empty.
 *
 * Colours come from the site's own design tokens so the footer reads as
 * part of the page rather than a separate block.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="print-hidden border-t border-border bg-surface">
      <Container className="py-14 md:py-20">
        {/* Row 1 — email · telephone · socials */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
          <div>
            <p className="text-sm text-foreground-muted">Email:</p>
            <a
              href={`mailto:${footerConfig.email}`}
              className="mt-1 inline-flex min-h-11 items-center text-lg font-medium break-all transition-colors duration-160 ease-out-strong hover:text-accent"
            >
              {footerConfig.email}
            </a>
          </div>

          {hasPhone && (
            <div>
              <p className="text-sm text-foreground-muted">Call Today:</p>
              <a
                href={`tel:${footerConfig.phone.href}`}
                className="mt-1 inline-flex min-h-11 items-center text-lg font-medium transition-colors duration-160 ease-out-strong hover:text-accent"
              >
                {footerConfig.phone.display}
              </a>
            </div>
          )}

          <div className="md:text-right">
            <p className="text-sm text-foreground-muted">Elsewhere:</p>
            <ul className="mt-1 flex flex-wrap items-center gap-1 md:justify-end">
              {footerConfig.socialLinks.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    title={social.platform}
                    className="inline-flex size-11 items-center justify-center rounded-full text-foreground-muted transition-[color,background-color] duration-160 ease-out-strong hover:bg-surface-muted hover:text-accent"
                  >
                    <BrandIcon name={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 2 — copyright · attribution */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mt-16">
          <p className="type-meta text-foreground-muted">
            © {year} {footerConfig.copyrightOwner}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {hasAttribution && (
              <p className="flex items-center gap-2 text-sm text-foreground-muted">
                <span>Created by</span>
                {footerConfig.creator.logo && (
                  <Image
                    src={footerConfig.creator.logo}
                    alt={footerConfig.creator.logoAlt}
                    width={40}
                    height={40}
                    className="size-10 rounded-full object-contain"
                  />
                )}
                {footerConfig.creator.url ? (
                  <a
                    href={footerConfig.creator.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center font-medium text-foreground transition-colors duration-160 ease-out-strong hover:text-accent"
                  >
                    {footerConfig.creator.name}
                  </a>
                ) : (
                  <span className="font-medium text-foreground">
                    {footerConfig.creator.name}
                  </span>
                )}
              </p>
            )}
            <BackToTop />
          </div>
        </div>
      </Container>
    </footer>
  );
}