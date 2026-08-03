export type NavItem = {
  label: string;
  href: string;
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
