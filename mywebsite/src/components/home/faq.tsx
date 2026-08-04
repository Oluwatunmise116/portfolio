"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { faqItems } from "@/data/faq";
import { cn } from "@/lib/utils";

/**
 * Accessible FAQ accordion: native buttons, aria-expanded/controls, one
 * item open at a time. Height animation uses CSS grid-rows (transform-free,
 * interruptible) and collapses to instant under reduced motion via the
 * global reduced-motion rules.
 */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section aria-labelledby="faq-title" className="bg-surface">
      <Container className="max-w-4xl py-20 md:py-28">
        <Reveal>
          <h2 id="faq-title" className="type-section-title text-center">
            Frequently asked questions
          </h2>
        </Reveal>

        <div className="mt-12">
          {faqItems.map((item, index) => {
            const open = openIndex === index;
            const headerId = `${baseId}-faq-h-${index}`;
            const panelId = `${baseId}-faq-p-${index}`;
            return (
              <Reveal
                key={item.question}
                delay={Math.min(index * 40, 160)}
                className="border-t border-border last:border-b"
              >
                <h3>
                  <button
                    type="button"
                    id={headerId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-base font-semibold transition-colors duration-160 ease-out-strong hover:text-accent sm:text-lg"
                  >
                    <span>
                      <span
                        aria-hidden="true"
                        className="type-meta mr-4 text-foreground-muted"
                      >
                        0{index + 1}
                      </span>
                      {item.question}
                    </span>
                    <Plus
                      aria-hidden="true"
                      className={cn(
                        "size-5 shrink-0 text-foreground-muted transition-transform duration-220 ease-out-strong",
                        open && "rotate-45",
                      )}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  // `inert` keeps a collapsed answer out of the a11y tree
                  // and tab order while still allowing the height to
                  // animate (which `hidden` would prevent).
                  inert={!open}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-280 ease-out-strong",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 leading-relaxed text-foreground-muted">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
