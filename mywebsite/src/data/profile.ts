/**
 * Single source of truth for personal information.
 * Everything in square brackets is a placeholder — replace it here and it
 * updates across the whole site.
 */
export const profile = {
  // TODO: replace with your full name (used in the header wordmark,
  // footer, resume and metadata).
  name: "Tunmise",
  initials: "T.",
  title: "Embedded Systems & IoT Engineer",
  tagline:
    "I build embedded systems that move from schematic to the real world.",
  intro:
    "I work across embedded firmware, vehicle communication, connected devices, hardware integration, testing, and product deployment.",
  eyebrow: "Embedded Systems · Firmware · Automotive · IoT",

  // TODO: confirm or replace contact details.
  email: "zubiiot1@gmail.com",
  location: "[City, Country]",
  timezone: "WAT · UTC+1",

  availability: {
    available: true,
    label: "Available for selected projects",
  },

  /**
   * TODO: replace the placeholder portrait.
   * Drop your photo at public/images/profile/portrait.jpg (portrait
   * orientation, roughly 4:5) and change `src` below — nothing else in the
   * codebase references the portrait directly.
   */
  portrait: {
    src: "/images/profile/portrait-placeholder.svg",
    alt: "Placeholder portrait illustration of an embedded systems engineer at a workbench",
    width: 960,
    height: 1200,
  },

  /** Short professional summary used on the resume page. */
  summary:
    "Embedded systems engineer working across firmware, vehicle communication, and connected hardware. Comfortable owning a product from schematic review and board bring-up through firmware, testing, and deployment. [Replace with your own 2–3 sentence summary.]",

  shortAbout: [
    "Engineer first. Integrator always. I like the seam where hardware meets software — where a schematic decision shows up months later as a firmware constraint.",
    "Most of my work lives in vehicles and connected devices: CAN networks, diagnostics, telemetry, and the unglamorous reliability work that keeps devices alive in the field.",
  ],
} as const;
