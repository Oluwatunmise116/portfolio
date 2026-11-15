"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import type { ServiceGroup } from "@/data/services";
import { cn } from "@/lib/utils";

type ServiceAccordionProps = {
  services: ServiceGroup[];
};

/**
 * Capability groups as an accordion: a condensed uppercase
 * heading per group, its list of specifics underneath. One group is open
 * at a time, starting with the first.
 *
 * Same accessible pattern as the FAQ: native buttons with
 * aria-expanded/controls, and a CSS grid-rows height animation that the
 * global reduced-motion rules collapse to instant.
 */
export function ServiceAccordion({ services }: ServiceAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div>
      {services.map((service, index) => {
        const open = openIndex === index;
        const headerId = `${baseId}-service-h-${index}`;
        const panelId = `${baseId}-service-p-${index}`;
        return (
          <div key={service.number} className="border-b border-border">
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-160 ease-out-strong hover:text-accent md:py-6"
              >
                <span className="font-display text-2xl uppercase md:text-[2rem] md:leading-tight">
                  {service.title}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-6 shrink-0 transition-transform duration-400 ease-spring",
                    open && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              // `inert` keeps a collapsed list out of the a11y tree and tab
              // order while still allowing the height to animate (which
              // `hidden` would prevent).
              inert={!open}
              className={cn(
                "grid transition-[grid-template-rows] duration-400 ease-spring",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <ul className="flex flex-col gap-2.5 pb-7 text-foreground-muted">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-baseline gap-3">
                      <span
                        aria-hidden="true"
                        className="size-1.5 shrink-0 -translate-y-0.5 rounded-full bg-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
