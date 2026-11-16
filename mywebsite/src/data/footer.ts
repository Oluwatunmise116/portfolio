import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social-links";
import type { BrandIconName } from "@/components/ui/brand-icon";

/**
 * Footer configuration.
 *
 * Single source for everything the footer renders. Contact details and
 * profile URLs are read from profile.ts / social-links.ts rather than
 * restated here, so there is still exactly one place to change each fact.
 *
 * RULE: anything without a real value stays empty and is hidden at render
 * time. Nothing here is invented, and no link ever points at a generic
 * platform homepage.
 */

export type FooterSocial = {
  platform: string;
  /** Matches the `label` in src/data/social-links.ts. */
  sourceLabel: string;
  icon: BrandIconName;
  ariaLabel: string;
};

/**
 * Ordered social list. `Behance` and `Dribbble` are intentionally present
 * but resolve to no URL, they are design-portfolio platforms the owner
 * does not use. They stay configured so adding one later is a single edit
 * to social-links.ts, and they are hidden until then.
 */
const socialDefinitions: FooterSocial[] = [
  {
    platform: "X",
    sourceLabel: "X",
    icon: "x",
    ariaLabel: "Visit my X profile",
  },
  {
    platform: "Instagram",
    sourceLabel: "Instagram",
    icon: "instagram",
    ariaLabel: "Visit my Instagram profile",
  },
  {
    platform: "GitHub",
    sourceLabel: "GitHub",
    icon: "github",
    ariaLabel: "View my GitHub profile",
  },
  {
    platform: "LinkedIn",
    sourceLabel: "LinkedIn",
    icon: "linkedin",
    ariaLabel: "Visit my LinkedIn profile",
  },
  {
    platform: "Medium",
    sourceLabel: "Medium",
    icon: "medium",
    ariaLabel: "Read my articles on Medium",
  },
  {
    platform: "Upwork",
    sourceLabel: "Upwork",
    icon: "upwork",
    ariaLabel: "View my Upwork profile",
  },
  {
    platform: "Behance",
    sourceLabel: "Behance",
    icon: "behance",
    ariaLabel: "View my Behance portfolio",
  },
  {
    platform: "Dribbble",
    sourceLabel: "Dribbble",
    icon: "dribbble",
    ariaLabel: "View my Dribbble portfolio",
  },
];

export const footerConfig = {
  email: profile.email,

  /**
   * TODO: no telephone number has been supplied, so the "Call Today"
   * group is hidden. To enable it, fill both fields, `display` is what
   * the visitor reads, `href` must be a normalised tel: value with no
   * spaces, brackets, or punctuation beyond a leading "+".
   * e.g. { display: "+234 801 234 5678", href: "+2348012345678" }
   */
  phone: {
    display: "",
    href: "",
  },

  copyrightOwner: profile.name,

  /**
   * Third-party creator credit. This is the owner's own portfolio, so it
   * is off by default. Set `showAttribution: true` and fill `creator` to
   * credit a designer or studio; `url` and `logo` are both optional.
   */
  showAttribution: false,
  creator: {
    name: "",
    url: "",
    /** Path under /public, e.g. "/images/creator-logo.svg". */
    logo: "",
    /** Empty alt marks the logo decorative; set only if it carries info. */
    logoAlt: "",
  },

  /** Only platforms with a real URL in social-links.ts are rendered. */
  socialLinks: socialDefinitions
    .map((definition) => {
      const match = socialLinks.find(
        (link) => link.label === definition.sourceLabel,
      );
      return match ? { ...definition, url: match.href } : null;
    })
    .filter((entry): entry is FooterSocial & { url: string } => entry !== null),
} as const;

/** True when the phone group has both halves and can be rendered. */
export const hasPhone =
  footerConfig.phone.display !== "" && footerConfig.phone.href !== "";

/** True when a creator credit is configured and enabled. */
export const hasAttribution =
  footerConfig.showAttribution && footerConfig.creator.name !== "";