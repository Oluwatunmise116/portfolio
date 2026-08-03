import type { Certification, ExperienceEntry } from "@/types/resume";

/**
 * PLACEHOLDER CONTENT — every organisation and date range below must be
 * replaced with your real history. Bracketed values are deliberate so
 * nothing here can be mistaken for a factual claim.
 */
export const experience: ExperienceEntry[] = [
  {
    period: "[2024 — Present]",
    role: "Embedded Systems Engineer",
    organisation: "[Organisation — replace]",
    location: "[Location]",
    description:
      "Firmware and hardware integration for connected vehicle devices. [Replace with a one-line description of what the team builds.]",
    highlights: [
      "[Replace with a real responsibility, e.g. led firmware for a CAN telemetry unit from bring-up to field deployment.]",
      "[Replace with a measured outcome — avoid unverifiable claims.]",
      "[Replace with a collaboration or process highlight.]",
    ],
  },
  {
    period: "[2022 — 2024]",
    role: "IoT Firmware Engineer",
    organisation: "[Organisation — replace]",
    location: "[Location]",
    description:
      "Connected-device firmware: provisioning, OTA updates, and low-power operation. [Replace with real scope.]",
    highlights: [
      "[Replace with a real project or system you owned.]",
      "[Replace with a measured outcome.]",
    ],
  },
  {
    period: "[2020 — 2022]",
    role: "Hardware Engineer",
    organisation: "[Organisation — replace]",
    location: "[Location]",
    description:
      "Schematic design, PCB layout, and prototype bring-up for sensor products. [Replace with real scope.]",
    highlights: [
      "[Replace with a real board or subsystem you designed.]",
      "[Replace with a testing or validation highlight.]",
    ],
  },
];

/** Career timeline shown on the About page. */
export const timeline = [
  {
    period: "[2024 — Present]",
    role: "Embedded Systems Engineer",
    organisation: "[Organisation — replace]",
    description:
      "Vehicle communication and connected-device firmware. [Replace with one sentence about this chapter.]",
  },
  {
    period: "[2022 — 2024]",
    role: "IoT Firmware Engineer",
    organisation: "[Organisation — replace]",
    description:
      "Device connectivity, OTA updates, and field reliability. [Replace with one sentence about this chapter.]",
  },
  {
    period: "[2020 — 2022]",
    role: "Hardware Engineer",
    organisation: "[Organisation — replace]",
    description:
      "PCB design and prototype bring-up. [Replace with one sentence about this chapter.]",
  },
  {
    period: "[2016 — 2020]",
    role: "Engineering Degree",
    organisation: "[University — replace]",
    description:
      "[Replace with your programme and focus, e.g. B.Eng. Electrical & Electronics Engineering.]",
  },
];

/**
 * PLACEHOLDER — replace with certifications you actually hold, or set to an
 * empty array to hide the section.
 */
export const certifications: Certification[] = [
  {
    year: "[Year]",
    name: "[Certification name — replace or remove]",
    issuer: "[Issuer]",
  },
  {
    year: "[Year]",
    name: "[Certification name — replace or remove]",
    issuer: "[Issuer]",
  },
];

/** PLACEHOLDER — courses and workshops for the resume page. */
export const courses = [
  "[Course or workshop — replace or remove]",
  "[Course or workshop — replace or remove]",
  "[Course or workshop — replace or remove]",
];
