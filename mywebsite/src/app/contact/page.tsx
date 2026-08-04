import { ContactForm } from "@/components/contact/contact-form";
import { ContactOptions } from "@/components/contact/contact-options";
import { Avatar } from "@/components/ui/avatar";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Start a conversation about an embedded system, automotive diagnostics, firmware, PCB, or connected device project.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 pt-32 pb-16 sm:px-8 md:pt-40 md:pb-24">
      <header className="flex flex-col items-center text-center">
        <Avatar
          size={80}
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
          className="hero-rise mx-auto mt-5 max-w-md text-lg text-foreground-muted"
          style={{ "--rise-delay": "140ms" } as React.CSSProperties}
        >
          Have an embedded system, automotive diagnostics, firmware, PCB, or
          connected device project to discuss?
        </p>
      </header>

      <section aria-label="Contact form" className="mt-12">
        <ContactForm />
      </section>

      <section
        aria-label="Other ways to reach me"
        className="mt-16 border-t border-border pt-10"
      >
        <h2 className="type-label mb-6 text-foreground-muted">
          Other channels
        </h2>
        <ContactOptions />
      </section>
    </div>
  );
}
