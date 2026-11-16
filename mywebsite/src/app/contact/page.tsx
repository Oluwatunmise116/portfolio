import { BookACall } from "@/components/contact/book-a-call";
import { BrandIcon } from "@/components/ui/brand-icon";
import { footerConfig } from "@/data/footer";
import { profile } from "@/data/profile";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Start a conversation about an embedded system, automotive diagnostics, firmware, PCB, or connected device project.",
  path: "/contact",
});

/**
 * Single-column contact page: the pitch, the booking link, and social
 * profiles. Booking is the only contact route offered here, there is no
 * form, so the column is centred and capped rather than sitting in a
 * two-column grid with an empty half.
 */
export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 pt-32 pb-16 sm:px-8 md:pt-40 md:pb-24">
      <div className="flex flex-col items-center text-center">
        <h1
          className="type-page-title hero-rise"
          style={{ "--rise-delay": "0ms" } as React.CSSProperties}
        >
          Let&rsquo;s build something reliable
        </h1>

        <p
          className="hero-rise mt-5 max-w-md text-lg leading-relaxed text-foreground-muted"
          style={{ "--rise-delay": "140ms" } as React.CSSProperties}
        >
          Have an embedded system, automotive diagnostics, firmware, PCB, or
          connected device project to discuss? Book a call and let&rsquo;s talk
          it through.
        </p>

        <div
          className="hero-rise mt-8"
          style={{ "--rise-delay": "200ms" } as React.CSSProperties}
        >
          <BookACall />
        </div>

        <div
          className="hero-rise mt-12"
          style={{ "--rise-delay": "260ms" } as React.CSSProperties}
        >
          <p className="type-label text-foreground-muted">Elsewhere</p>
          <ul className="mt-3 flex flex-wrap items-center justify-center gap-1">
            {footerConfig.socialLinks.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  title={social.platform}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground-muted transition-[color,background-color] duration-160 ease-out-strong hover:bg-surface-muted hover:text-accent"
                >
                  <BrandIcon name={social.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="type-meta mt-10 text-foreground-muted">
          {profile.location} · {profile.timezone}
        </p>
      </div>
    </div>
  );
}
