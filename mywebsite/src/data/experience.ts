import type { Certification, ExperienceEntry } from "@/types/resume";

/**
 * VERIFIED EXPERIENCE ONLY.
 *
 * The current role is described at the level of engineering
 * responsibility. Employer name, products, client details, system names,
 * proprietary architecture, and internal outcomes are deliberately kept
 * off the public portfolio — they belong on LinkedIn or a private CV.
 */
export const experience: ExperienceEntry[] = [
  {
    period: "Oct. 2024 — Present",
    role: "Embedded Systems Engineer",
    organisation: "Embedded systems & connected products",
    location: "Lagos, Nigeria",
    description:
      "Embedded firmware, automotive communication, IoT connectivity, PCB and hardware integration, debugging, testing, and product validation.",
    highlights: [
      "Firmware development for microcontroller-based products, including drivers, peripheral integration, and debugging.",
      "Automotive communication and diagnostics work across CAN, CAN-FD, OBD-II, ISO-TP, UDS, and ECU communication.",
      "PCB and hardware integration: schematic review, board bring-up, sensor integration, and hardware debugging.",
      "Connectivity and telemetry using cellular, GNSS, and MQTT, together with testing and real-world validation.",
    ],
  },
  {
    period: "Aug. 2023 — Oct. 2023",
    role: "Networking Intern",
    organisation: "Petroleum Training Institute",
    location: "Effurun, Delta State",
    description:
      "IT support and computer-networking tasks within the institute's technical team.",
    highlights: [
      "Provided basic IT support and assisted with computer-networking tasks.",
      "Supported team operations with Microsoft productivity tools.",
      "Gained exposure to project coordination.",
    ],
  },
  {
    period: "Mar. 2022 — May 2022",
    role: "Embedded Systems and IoT Intern",
    organisation: "Autokontrol Technology",
    location: "Ilorin, Kwara State",
    description:
      "Practical training in microcontroller control, sensor interfacing, and embedded firmware.",
    highlights: [
      "Completed practical training in microcontroller control and sensor interfacing.",
      "Wrote and tested firmware for hardware control.",
      "Troubleshot embedded hardware and software issues, escalating larger technical problems when required.",
    ],
  },
];

/** Career timeline shown on the About page. */
export const timeline = [
  {
    period: "Oct. 2024 — Present",
    role: "Embedded Systems Engineer",
    organisation: "Embedded systems & connected products",
    description:
      "Embedded firmware, automotive communication, IoT connectivity, PCB and hardware integration, debugging, testing, and product validation.",
  },
  {
    period: "Aug. 2023 — Oct. 2023",
    role: "Networking Intern",
    organisation: "Petroleum Training Institute",
    description:
      "IT support, computer networking, and project-coordination exposure in Effurun, Delta State.",
  },
  {
    period: "Mar. 2022 — May 2022",
    role: "Embedded Systems and IoT Intern",
    organisation: "Autokontrol Technology",
    description:
      "Microcontroller control, sensor interfacing, firmware development, and embedded troubleshooting.",
  },
  {
    period: "2018 — 2024",
    role: "B.Eng. Computer Engineering",
    organisation: "University of Ilorin",
    description:
      "Second Class Honours (Upper Division). Final-year project: an IoT biometric attendance system.",
  },
];

/**
 * Verified certification. No issuer is listed because the issuer on the
 * certificate has not been confirmed — do not add one speculatively.
 */
export const certifications: Certification[] = [
  {
    year: "June 2024",
    name: "Occupational and Environmental Safety, Security & Health — HSE Level 1–3",
    issuer: "",
  },
];

/** Verified courses. */
export const courses = [
  "How Things Work: An Introduction to Physics — University of Virginia, May 2020",
  "Data Science Math Skills — Duke University, May 2020",
  "Introduction to Calculus — University of Sydney, May 2020",
  "Mechanics of Materials — Georgia Institute of Technology, May 2020",
  "Supervised Machine Learning: Regression and Classification — Stanford University / Coursera",
];

/** Professional memberships. */
export const memberships = [
  { period: "Sept. 2024 — Present", name: "Nigerian Society of Engineers" },
  { period: "Jan. 2024 — Present", name: "National Society of Black Engineers" },
];
