export type ExperienceEntry = {
  /** e.g. "2024 — Present". */
  period: string;
  role: string;
  organisation: string;
  location?: string;
  description: string;
  highlights: string[];
  link?: { label: string; href: string };
};

export type EducationEntry = {
  period: string;
  qualification: string;
  institution: string;
  detail?: string;
};

export type Certification = {
  year: string;
  name: string;
  issuer: string;
};

export type SkillGroup = {
  discipline: string;
  skills: string[];
};
