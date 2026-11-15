import { BookACall } from "@/components/contact/book-a-call";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

/**
 * Home contact section: centered heading, then the booking link. The
 * same button powers the /contact page.
 */
export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title">
      <Container className="max-w-3xl py-20 md:py-28">
        <Reveal className="flex flex-col items-center text-center">
          <h2 id="contact-title" className="type-section-title">
            Let&rsquo;s build something reliable
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-foreground-muted">
            Have an embedded system, automotive diagnostics, firmware, PCB, or
            connected device project to discuss?
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10 flex justify-center">
          <BookACall />
        </Reveal>
      </Container>
    </section>
  );
}
