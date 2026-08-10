/**
 * Single source of truth for personal information.
 * Everything in square brackets is a placeholder — replace it here and it
 * updates across the whole site.
 */
export const profile = {
  // TODO: replace with your full name (used in the header, footer, resume
  // and metadata).
  name: "Tunmise",
  initials: "T",
  title: "Embedded Systems & IoT Engineer",
  credentials: "B.Eng Computer Engineering · GMNSE",
  tagline:
    "I build intelligent hardware and firmware for vehicles and connected devices.",
  taglineSupport:
    "From PCB and firmware to diagnostics, connectivity, testing, and deployment.",
  intro:
    "Embedded Systems & IoT Engineer specialising in automotive diagnostics, firmware, PCB design, connected devices, and vehicle communication.",
  eyebrow: "Embedded Systems · Firmware · Automotive · IoT",

  /** Split hero headline words: [NAME] / EMBEDDED [portrait] ENGINEER. */
  heroWords: { left: "Embedded", right: "Engineer" },
  /** One-word circular badge overlapping the portrait. */
  heroBadge: "Hi",

  // TODO: confirm or replace contact details.
  email: "olabanjitunmise234@gmail.com",
  location: "Lagos, Nigeria",
  timezone: "WAT · UTC+1",

  availability: {
    available: true,
    label: "Available for selected projects",
  },

  /**
   * TODO: replace the stand-in portrait.
   * Overwrite public/images/profile/portrait.jpg with your own photo —
   * nothing else in the codebase references the portrait directly.
   * Any portrait-orientation photo works; it does not need to be 4:5.
   *
   * `hoverSrc` is optional: when provided, the hero cross-fades to it on
   * hover (pointer devices only).
   */
  portrait: {
    src: "/images/profile/portrait.jpg",
    hoverSrc: undefined as string | undefined,
    alt: "Tunmise, embedded systems and IoT engineer",
    width: 2419,
    height: 3225,

    /**
     * Where the subject sits in the frame, as a CSS object-position.
     * Used for the large 4:5 crops (hero, About, About preview) so the
     * subject stays centred when the photo is taller than the frame.
     */
    focus: "58% 42%",

    /**
     * Small circular avatars (nav, contact) crop to 1:1 at 36–80px. A
     * full-body photo centre-cropped into a 36px circle leaves the face a
     * few pixels wide, so those circles zoom to the face instead.
     * `avatarFocus` is the face centre; `avatarZoom` is the scale factor.
     */
    avatarFocus: "58% 47%",
    avatarZoom: 2.6,
  },

  /** Short professional summary used on the resume page. */
  summary:
    "Embedded systems engineer working across firmware, vehicle communication, and connected hardware. Comfortable owning a product from schematic review and board bring-up through firmware, testing, and deployment. [Replace with your own 2–3 sentence summary.]",

  /** Opening statement on the About page. */
  aboutStatement: "Engineer first. Integrator always.",

  shortAbout: [
    "I'm an embedded systems engineer who enjoys working at the point where hardware, firmware, vehicles, and connectivity meet.",
    "My work focuses on developing practical systems that can survive testing, deployment, unreliable networks, electrical noise, and real-world use.",
  ],

  biography: [
    "I build embedded systems at the intersection of hardware, firmware, automotive communication, and connectivity. My work includes vehicle diagnostics, CAN and OBD-II research, PCB development, cellular devices, OTA firmware, hardware testing, and field deployment.",
    "I like the seam where hardware meets software — where a schematic decision shows up months later as a firmware constraint. Most of my work lives in vehicles and connected devices: CAN networks, diagnostics, telemetry, and the unglamorous reliability work that keeps devices alive in the field.",
  ],

  /**
   * Selected statistics for the About preview. These are owner-confirmed
   * figures — do not change them without confirmation, and never publish
   * an unverified claim here. The leading number counts up on scroll
   * (see components/ui/count-up.tsx); any suffix is preserved verbatim.
   */
  stats: [
    { value: "5", label: "Years of experience" },
    { value: "20+", label: "Completed engineering projects" },
    { value: "10+", label: "Vehicle platforms tested" },
  ],
} as const;
