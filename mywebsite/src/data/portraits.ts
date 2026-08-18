import { profile } from "@/data/profile";

/**
 * A photo used in one place on the site.
 *
 * `focus` is a CSS object-position for the large 4:5 crops. `zoom` and
 * `avatarFocus` only matter for the circular avatar, which crops to 1:1
 * at 36–80px and therefore has to frame the face much more tightly.
 */
export type PortraitImage = {
  src: string;
  alt: string;
  /** Real pixel dimensions — keeps Next.js from causing layout shift. */
  width: number;
  height: number;
  focus?: string;
  avatarFocus?: string;
  zoom?: number;
};

/**
 * The surfaces that show a photo. Each can use a different image so the
 * site does not repeat one portrait six times.
 *
 * - `hero`          large 4:5, home hero (the headline portrait)
 * - `heroHover`     optional; hero cross-fades to it on hover
 * - `about`         large 4:5, /about page
 * - `aboutPreview`  large 4:5, "About me" section on the home page
 * - `avatar`        1:1 circles — mobile menu (44px), home contact
 *                   (64px), contact page (80px)
 * - `navLogo`       the 36px brand mark in the header pill
 */
export type PortraitSlot =
  | "hero"
  | "heroHover"
  | "about"
  | "aboutPreview"
  | "avatar"
  | "navLogo";

/**
 * Per-surface photos.
 *
 * TO USE A DIFFERENT PHOTO IN A SLOT:
 *   1. Save it to public/images/profile/<name>.jpg
 *   2. Point the slot's `src` at it and set `width`/`height` to the real
 *      pixels of that file.
 *   3. For `avatar`, check the 36px nav circle and adjust `avatarFocus` /
 *      `zoom` until the face fills it.
 *
 * A slot set to `undefined` (or omitted) falls back to profile.portrait,
 * so nothing breaks while photos are still being added.
 *
 * Portrait orientation reads best in the 4:5 slots, but any ratio works —
 * `object-cover` handles the difference and `focus` decides what survives
 * the crop.
 */
export const portraits: Partial<Record<PortraitSlot, PortraitImage>> = {
  // Home hero — the headline portrait.
  hero: {
    src: "/images/profile/portrait.jpg",
    alt: "Oluwatunmise John Olabanji, Embedded Systems Engineer",
    width: 1027,
    height: 1284,
    focus: "50% 30%",
  },

  // Optional: hero cross-fades to this on hover (pointer devices only).
  // Save a second shot as portrait-hover.jpg and uncomment to enable.
  // heroHover: {
  //   src: "/images/profile/portrait-hover.jpg",
  //   alt: "",
  //   width: 1027,
  //   height: 1284,
  //   focus: "50% 30%",
  // },

  // /about page — a close portrait, distinct from the hero's half-body
  // shot. Exactly 4:5, so the frame shows whole and `focus` is a no-op
  // unless the container ratio changes.
  about: {
    src: "/images/profile/portrait-about.jpg",
    alt: "Oluwatunmise John Olabanji",
    width: 4160,
    height: 5200,
    focus: "50% 30%",
  },

  // "About me" section on the home page. A seated full-length shot, so it
  // reads clearly as a different photo from the hero further up the same
  // page. Slightly wider than 4:5 (0.813); the crop is ~1.6% of width.
  aboutPreview: {
    src: "/images/profile/portrait-about-preview.jpg",
    alt: "Oluwatunmise John Olabanji",
    width: 1073,
    height: 1319,
    focus: "50% 30%",
  },

  /**
   * Brand mark in the header pill, 36px.
   *
   * `logo-source.png` (288px, transparent corners) is the editable master;
   * this WebP is the export actually served, and the same master generates
   * the favicon at src/app/icon.png. Re-export both if the master changes.
   *
   * Served as WebP rather than the PNG because the optimiser can hand the
   * 36px circle a ~1 KB variant, and never as SVG — Next.js passes SVG
   * through unoptimised, so a photo-bearing SVG would download in full on
   * every page.
   */
  navLogo: {
    src: "/images/profile/logo.webp",
    alt: "Oluwatunmise John Olabanji",
    width: 288,
    height: 288,
    // Already square and centre-cropped, so no reframing needed.
    avatarFocus: "50% 50%",
    zoom: 1,
  },

  // Circular avatars. Use the tightest head-and-shoulders shot available —
  // it has to stay recognisable at 36px.
  avatar: {
    src: "/images/profile/portrait.jpg",
    alt: "Oluwatunmise John Olabanji",
    width: 1027,
    height: 1284,
    avatarFocus: "50% 20%",
    zoom: 1.25,
  },
};

/** The canonical portrait, as a PortraitImage. */
const fallback: PortraitImage = {
  src: profile.portrait.src,
  alt: profile.portrait.alt,
  width: profile.portrait.width,
  height: profile.portrait.height,
  focus: profile.portrait.focus,
  avatarFocus: profile.portrait.avatarFocus,
  zoom: profile.portrait.avatarZoom,
};

/**
 * Resolves the photo for a surface, falling back to the canonical
 * portrait when that slot has no dedicated image.
 */
export function portraitFor(slot: PortraitSlot): PortraitImage {
  return portraits[slot] ?? fallback;
}

/** The hero's optional hover image, or null when none is configured. */
export function heroHoverPortrait(): PortraitImage | null {
  return portraits.heroHover ?? null;
}