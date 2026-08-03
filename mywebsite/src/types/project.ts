export const projectCategories = [
  "Embedded",
  "Automotive",
  "Firmware",
  "IoT",
  "Hardware",
  "Research",
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

export type Project = {
  slug: string;
  /** Editorial index, e.g. "01". */
  number: string;
  title: string;
  /** One-sentence summary used in lists and cards. */
  summary: string;
  /** Longer paragraph used on the detail page. */
  description: string;
  category: ProjectCategory;
  year: string;
  status: ProjectStatus;
  featured: boolean;
  image: string;
  gallery: { src: string; caption: string }[];
  technologies: string[];
  role: string;
  duration?: string;
  context: string;
  problem: string;
  constraints: string[];
  responsibilities: string[];
  hardware: ArchitectureDiagram;
  firmware: ArchitectureDiagram;
  protocols: string[];
  process: string[];
  testing: string[];
  challenges: string[];
  results: string[];
  lessons: string[];
};
