import { ContactForm } from "@/components/contact/contact-form";
import { Avatar } from "@/components/ui/avatar";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

/**
 * Home contact section: centered heading with a small circular portrait
 * accent, then the shared validated form. The same form component powers
 * the /contact page.
 */
export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title">
      <Container className="max-w-3xl py-20 md:py-28">
        <Reveal className="flex flex-col items-center text-center">
          <Avatar size={64} />
          <h2 id="contact-title" className="type-section-title mt-6">
            Let&rsquo;s build something reliable
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-foreground-muted">
            Have an embedded system, automotive diagnostics, firmware, PCB, or
            connected device project to discuss?
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12">
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
