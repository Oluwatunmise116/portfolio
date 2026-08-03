import Link from "next/link";

import { BackToTop } from "@/components/layout/back-to-top";
import { Container } from "@/components/ui/container";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social-links";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="print-hidden border-t border-border bg-background-subtle">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="font-display text-base font-semibold tracking-tight">
              {profile.name}
              <span aria-hidden="true" className="type-meta ml-2 text-accent">
                /eng
              </span>
            </p>
            <p className="mt-3 max-w-sm text-sm text-foreground-muted">
              {profile.title} — firmware, vehicle communication, and connected
              hardware from schematic to deployment.
            </p>
            {profile.availability.available && (
              <p className="type-meta mt-4 flex items-center gap-2 text-foreground-muted">
                <span className="relative inline-flex size-2 rounded-full bg-success status-dot" />
                {profile.availability.label} · {profile.timezone}
              </p>
            )}
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="type-label mb-4 text-foreground-muted">Navigate</h2>
            <ul className="flex flex-col gap-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-8 items-center text-sm text-foreground-muted transition-colors duration-160 ease-out-strong hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="type-label mb-4 text-foreground-muted">Elsewhere</h2>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex min-h-8 items-center text-sm text-foreground-muted transition-colors duration-160 ease-out-strong hover:text-accent"
                >
                  Email
                </a>
              </li>
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-8 items-center text-sm text-foreground-muted transition-colors duration-160 ease-out-strong hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <p className="type-meta text-foreground-muted">
            © {year} {profile.name}. Designed and built with attention to
            detail.
          </p>
          <BackToTop />
        </div>
      </Container>
    </footer>
  );
}
