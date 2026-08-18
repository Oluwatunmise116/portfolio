export type SocialLink = {
  label: string;
  href: string;
};

/** All verified, publicly reachable profiles. */
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Oluwatunmise116" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/oluwatunmise116/" },
  {
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/~0174a344f91a0c58ef",
  },
  { label: "Medium", href: "https://medium.com/@olabanjitunmise234" },
  { label: "X", href: "https://x.com/Oluwatunmise116" },
  { label: "Instagram", href: "https://www.instagram.com/oluwatunmise116/" },
];

/** The Medium profile that hosts all published articles. */
export const MEDIUM_PROFILE_URL = "https://medium.com/@olabanjitunmise234";

/** X handle used for Twitter card metadata. */
export const X_HANDLE = "@Oluwatunmise116";
