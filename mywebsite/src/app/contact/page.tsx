import { ContactForm } from "@/components/contact/contact-form";
import { ContactOptions } from "@/components/contact/contact-options";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Start a conversation about a project, an embedded systems opportunity, or a technical problem.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-16 sm:px-8 md:py-24">
      <header className="text-center">
        <p className="type-label text-foreground-muted">
          <span aria-hidden="true" className="text-accent">
            /contact
          </span>
        </p>
        <h1 className="type-page-title mt-4 text-balance">
          Have a project, opportunity, or technical problem to discuss?
        </h1>
        <p className="mx-auto mt-5 max-w-md text-foreground-muted">
          Share a few details and I&rsquo;ll respond as soon as possible.
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
