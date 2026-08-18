export const projectCategories = [
  "Automotive",
  "Embedded",
  "IoT",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectStatus = "Completed" | "Active" | "Prototype" | "Research";

export type ArchitectureBlock = {
  /** Short label shown inside the diagram node, e.g. "STM32F4 MCU". */
  label: string;
  /** One-line description under the label. */
  detail: string;
};

export type ArchitectureDiagram = {
  title: string;
  /** Rendered as connected nodes in an HTML/CSS diagram. */
  blocks: ArchitectureBlock[];
};

/**
 * Only `slug`, `number`, `title`, `summary`, `category`, `status`,
 * `technologies`, `role` and `image` are required.
 *
 * Every narrative field below is OPTIONAL by design: the detail page
 * renders a section only when its data exists. This exists so a project
 * can be published with exactly what is true about it, rather than
 * padded out with invented context, metrics, or architecture.
 */
export type Project = {
  slug: string;
  /** Editorial index, e.g. "01". */
  number: string;
  title: string;
  /** One-sentence summary used in lists and cards. */
  summary: string;
  category: ProjectCategory;
  status: ProjectStatus;
  technologies: string[];
  role: string;
  image: string;
  featured?: boolean;

  /** Longer paragraph used on the detail page. */
  description?: string;
  year?: string;
  duration?: string;
  gallery?: { src: string; caption: string }[];
  context?: string;
  problem?: string;
  constraints?: string[];
  responsibilities?: string[];
  hardware?: ArchitectureDiagram;
  firmware?: ArchitectureDiagram;
  protocols?: string[];
  process?: string[];
  testing?: string[];
  challenges?: string[];
  results?: string[];
  lessons?: string[];
  /** Only set when a real, public repository or demo exists. */
  link?: { label: string; href: string };
};
