import { ArrowRight } from "lucide-react";

import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { profile } from "@/data/profile";

export function ContactCta() {
  return (
    <section
      aria-label="Contact call to action"
      className="border-t border-border bg-background-subtle"
    >
      <Container className="flex flex-col items-center py-20 text-center md:py-28">
        <p className="type-label text-foreground-muted">
          <span aria-hidden="true" className="text-accent">
            05
          </span>{" "}
          Contact
        </p>
        <h2 className="type-section-title mt-4 max-w-2xl text-balance">
          Have a project, opportunity, or technical problem to discuss?
        </h2>
        <p className="mt-4 max-w-md text-foreground-muted">
          Share a few details and I&rsquo;ll respond as soon as possible.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <LinkButton href="/contact" variant="primary">
            Get in touch
            <ArrowRight aria-hidden="true" className="size-4" />
          </LinkButton>
          <a
            href={`mailto:${profile.email}`}
            className={buttonClasses("secondary")}
          >
            {profile.email}
          </a>
        </div>
      </Container>
    </section>
  );
}
