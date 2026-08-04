import Link from "next/link";

import { BackToTop } from "@/components/layout/back-to-top";
import { Container } from "@/components/ui/container";
import { contactNavItem, navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social-links";

/**
 * Footer: name wordmark, main navigation + resume, social links (real
 * profiles from src/data/social-links.ts), email, copyright, back-to-top.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="print-hidden border-t border-border bg-surface">
      <Container className="py-14 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-2xl font-semibold tracking-wide uppercase">
              {profile.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              {profile.tagline}
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 inline-flex min-h-11 items-center text-sm font-medium underline decoration-border-strong underline-offset-4 transition-colors duration-160 ease-out-strong hover:text-accent hover:decoration-accent"
            >
              {profile.email}
            </a>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="type-label mb-4 text-foreground-muted">Navigate</h2>
            <ul className="flex flex-col gap-1">
              {[...navigation, contactNavItem, { label: "Resume", href: "/resume" }].map(
                (item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-9 items-center text-sm text-foreground-muted transition-colors duration-160 ease-out-strong hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div>
            <h2 className="type-label mb-4 text-foreground-muted">Elsewhere</h2>
            <ul className="flex flex-col gap-1">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-9 items-center text-sm text-foreground-muted transition-colors duration-160 ease-out-strong hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <p className="type-meta text-foreground-muted">
            © {year} {profile.name}. All rights reserved.
          </p>
          <BackToTop />
        </div>
      </Container>
    </footer>
  );
}
