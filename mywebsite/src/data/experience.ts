import type {
  Certification,
  ExperienceEntry,
  KeyProject,
  VolunteerRole,
} from "@/types/resume";

/**
 * VERIFIED EXPERIENCE ONLY.
 *
 * Everything in this file mirrors the owner's own CV (the version dated
 * 31 October 2026). Wording follows the CV closely on purpose: add or
 * change an entry here only when the CV changes, and never pad it with
 * claims, figures or outcomes the CV does not make.
 */
export const experience: ExperienceEntry[] = [
  {
    period: "Oct. 2024 - Present",
    role: "Embedded Systems Engineer",
    organisation: "Zubi Technologies",
    location: "Maryland, Lagos, Nigeria",
    description:
      "Firmware and hardware for a connected vehicle telematics and diagnostic device, from board bring-up to a product-level unit.",
    highlights: [
      "Took the company's connected vehicle telematics and diagnostic device from board bring-up through proof of concept to a product-level unit. Wrote the low-level firmware that reads live vehicle data and fault codes and pushes them to the cloud over cellular.",
      "Reverse-engineered proprietary PIDs, CAN message IDs and manufacturer-specific diagnostic commands by logging and comparing scan-tool sessions, giving the device access to OEM data that generic OBD-II tools cannot read.",
      "Worked directly with vehicle ECUs and modules (ECM, TCM, BCM) over CAN, CAN FD, ISO-TP, UDS and OBD-II: opening diagnostic sessions, reading DIDs and DTCs, and analysing security-access exchanges.",
      "Wrote cellular IoT firmware on ESP32-S3 and STM32 using SIMCom modems, including a reusable MQTT library with Wi-Fi/GSM fallback, heartbeat and OTA hooks that other firmware projects now build on.",
      "Designed and reviewed PCB schematics and layouts, checked pin-outs and power trees against datasheets, brought up new boards and fixed faults reported from field testing, such as battery-related lockups.",
      "Wrote firmware and API documentation, prepared build and test instructions for the hardware team, and put together phased timelines and estimates for client hardware projects.",
    ],
  },
  {
    period: "Aug. 2023 - Oct. 2023",
    role: "Networking Intern",
    organisation: "Petroleum Training Institute",
    location: "Effurun, Delta State, Nigeria",
    description:
      "IT support and computer-networking tasks within the institute's technical team.",
    highlights: [
      "Provided basic IT support and assisted with computer-networking tasks.",
      "Supported team operations using Microsoft tools and learned the fundamentals of project coordination.",
    ],
  },
  {
    period: "Mar. 2022 - May 2022",
    role: "Embedded Systems and IoT Intern",
    organisation: "Autokontrol Technology",
    location: "Ilorin, Kwara State, Nigeria",
    description:
      "Training in embedded systems and IoT development, focused on microcontroller control and sensor interfacing.",
    highlights: [
      "Completed training in embedded systems and IoT development, focusing on microcontroller control and sensor interfacing.",
      "Wrote and tested firmware to control hardware; troubleshot issues and escalated larger technical problems.",
    ],
  },
];

/** Career timeline shown on the About page. */
export const timeline = [
  {
    period: "Oct. 2024 - Present",
    role: "Embedded Systems Engineer",
    organisation: "Zubi Technologies",
    description:
      "Took a connected vehicle telematics and diagnostic device from board bring-up to a product-level unit: low-level firmware, reverse engineering of manufacturer-specific vehicle data, cellular IoT connectivity, PCB design and review, and field-fault fixes.",
  },
  {
    period: "Aug. 2023 - Oct. 2023",
    role: "Networking Intern",
    organisation: "Petroleum Training Institute",
    description:
      "IT support, computer networking, and project-coordination exposure in Effurun, Delta State.",
  },
  {
    period: "Mar. 2022 - May 2022",
    role: "Embedded Systems and IoT Intern",
    organisation: "Autokontrol Technology",
    description:
      "Microcontroller control, sensor interfacing, firmware development, and embedded troubleshooting.",
  },
  {
    period: "2018 - 2024",
    role: "B.Eng. Computer Engineering",
    organisation: "University of Ilorin",
    description:
      "Second Class Honours (Upper Division). Final-year project: an IoT biometric attendance system.",
  },
];

/**
 * Professional projects from the CV. These are described in words only:
 * unlike the entries in projects.ts they have no photos or case-study
 * page, so they are listed on the résumé rather than in the project grid.
 */
export const keyProjects: KeyProject[] = [
  {
    title: "Connected Vehicle Telematics Device",
    stack: ["CAN", "UDS", "OBD-II", "ESP32-S3", "SIMCom cellular", "MQTT"],
    points: [
      "In-vehicle device that reads live data and manufacturer-specific DTCs from the car's ECUs and sends them to a cloud backend over 4G. I handled the firmware from the first power-on of the board to a stable product build.",
      "Handles CAN bus setup, ISO-TP multi-frame responses, and modem connection drops and reconnects, so data keeps flowing on the road.",
    ],
  },
  {
    title: "Reverse Engineering of Proprietary Vehicle Data",
    stack: ["CL2000 logger", "Launch scanner", "Python"],
    points: [
      "Captured CAN traffic while an OEM scan tool talked to the car, then compared captures in Python to find the request and response frames behind each reading.",
      "Decoded signals such as RPM, fuel level and VIN broadcasts from unknown CAN IDs, and turned the recovered diagnostic commands into firmware the telematics device runs on its own.",
    ],
  },
  {
    title: "Generator Monitoring over Modbus and J1939",
    stack: [
      "DSE4520",
      "DSE857",
      "Modbus RTU",
      "RS-485",
      "SAE J1939",
      "ESP32-S3",
    ],
    points: [
      "Read engine and electrical values from a generator controller over Modbus and over its J1939 CAN bus, matched the two sources against each other, and logged sessions for troubleshooting.",
    ],
  },
  {
    title: "Real-Time Personal Safety Tracker",
    stack: ["ESP32-C6", "A7670E", "MPU6050", "FreeRTOS"],
    points: [
      "Wearable tracker built for kidnapping response: GNSS tracking with fix-quality filtering and smoothing, an SOS button with escalation, motion alerts and MQTT over TLS.",
    ],
  },
];

/**
 * Verified certification. No issuer is listed because the issuer on the
 * certificate has not been confirmed. Do not add one speculatively.
 */
export const certifications: Certification[] = [
  {
    year: "June 2024",
    name: "Occupational and Environmental Safety, Security & Health (HSE Level 1-3)",
    issuer: "",
  },
];

/** Verified courses. */
export const courses = [
  "How Things Work: An Introduction to Physics, University of Virginia, May 2020",
  "Data Science Math Skills, Duke University, May 2020",
  "Introduction to Calculus, University of Sydney, May 2020",
  "Mechanics of Materials, Georgia Institute of Technology, May 2020",
  "Supervised Machine Learning: Regression and Classification, Stanford University / Coursera",
];

/** Professional memberships. */
export const memberships = [
  { period: "Sept. 2024 - Present", name: "Nigerian Society of Engineers" },
  {
    period: "Jan. 2024 - Present",
    name: "National Society of Black Engineers",
  },
  {
    period: "Dec. 2018 - Aug. 2024",
    name: "Computer Engineering Students' Association (Student)",
  },
];

/** Volunteering and leadership. */
export const volunteering: VolunteerRole[] = [
  {
    role: "Assistant General Secretary",
    organisation: "Computer Engineering Students' Association, Unilorin",
    period: "2023/2024",
    points: [
      "Supported association operations and community initiatives; assisted with meeting coordination, documentation, and event planning.",
    ],
  },
  {
    role: "Co-Leader",
    organisation: "Kodespot Community",
    period: "Jan. 2023 - Present",
    points: [
      "Managed and grew the community across various social media platforms.",
      "Helped organize and host both in-person and online tech events.",
    ],
  },
];
