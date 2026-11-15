export type ExperienceEntry = {
  /** e.g. "Oct. 2024 - Present". */
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

/** A professional project described in words only (no case-study page). */
export type KeyProject = {
  title: string;
  /** Technologies and equipment, shown as one line under the title. */
  stack: string[];
  points: string[];
};

export type VolunteerRole = {
  role: string;
  organisation: string;
  period: string;
  points: string[];
};
