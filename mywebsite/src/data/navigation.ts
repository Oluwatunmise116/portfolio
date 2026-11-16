export type NavItem = {
  label: string;
  href: string;
};

/**
 * Main pill navigation. Resume is deliberately not a main item, it is
 * reachable from the hero, the About page, and the footer.
 * Contact renders as the filled button at the right edge of the pill.
 */
export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blog" },
];

export const contactNavItem: NavItem = { label: "Contact", href: "/contact" };
