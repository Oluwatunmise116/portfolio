import { BookACall } from "@/components/contact/book-a-call";
import { ContactForm } from "@/components/contact/contact-form";
import { Avatar } from "@/components/ui/avatar";
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
 * Two-column contact page: the pitch, booking link and social profiles on
 * the left, the form in a card on the right. Collapses to a single column
 * below `lg`, form last.
 *
 * The card uses the site's existing surface + border treatment — the same
 * one the project, principle and article cards use — rather than a new
 * colour, so nothing about the design system changes here.
 */
export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pt-32 pb-16 sm:px-8 md:pt-40 md:pb-24">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — pitch, booking, socials */}
        <div className="lg:sticky lg:top-32">
          <Avatar
            size={72}
            className="hero-rise"
            style={{ "--rise-delay": "0ms" } as React.CSSProperties}
          />

          <h1
            className="type-page-title hero-rise mt-6"
            style={{ "--rise-delay": "60ms" } as React.CSSProperties}
          >
            Let&rsquo;s build something reliable
          </h1>

          <p
            className="hero-rise mt-5 max-w-md text-lg leading-relaxed text-foreground-muted"
            style={{ "--rise-delay": "140ms" } as React.CSSProperties}
          >
            Have an embedded system, automotive diagnostics, firmware, PCB, or
            connected device project to discuss? Fill in the form and I&rsquo;ll
            get back to you, or book a call if you&rsquo;d rather talk it
            through.
          </p>

          <div
            className="hero-rise mt-8"
            style={{ "--rise-delay": "200ms" } as React.CSSProperties}
          >
            <BookACall />
          </div>

          <div
            className="hero-rise mt-10"
            style={{ "--rise-delay": "260ms" } as React.CSSProperties}
          >
            <p className="type-label text-foreground-muted">Elsewhere</p>
            <ul className="mt-3 flex flex-wrap items-center gap-1">
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

          <p className="type-meta mt-8 text-foreground-muted">
            {profile.location} · {profile.timezone}
          </p>
        </div>

        {/* Right — form card */}
        <section
          aria-label="Contact form"
          className="hero-rise rounded-2xl border border-border bg-surface p-6 sm:p-8"
          style={{ "--rise-delay": "160ms" } as React.CSSProperties}
        >
          <ContactForm />
        </section>
      </div>
    </div>
  );
}