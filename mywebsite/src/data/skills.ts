import type { SkillGroup } from "@/types/resume";

export const skillGroups: SkillGroup[] = [
  {
    discipline: "Embedded Development",
    skills: [
      "C",
      "C++",
      "Python",
      "ESP-IDF",
      "STM32",
      "ESP32",
      "FreeRTOS",
      "Zephyr RTOS",
    ],
  },
  {
    discipline: "Vehicle Communication",
    skills: [
      "CAN",
      "CAN FD",
      "OBD-II",
      "UDS",
      "K-Line",
      "Automotive diagnostics",
    ],
  },
  {
    discipline: "Connectivity",
    skills: [
      "MQTT",
      "Cellular communication",
      "GNSS",
      "Wi-Fi",
      "Bluetooth",
      "OTA updates",
    ],
  },
  {
    discipline: "Hardware",
    skills: [
      "Schematic design",
      "PCB development",
      "Sensor integration",
      "Hardware debugging",
      "Power systems",
      "Prototype testing",
    ],
  },
  {
    discipline: "Interfaces & Protocols",
    skills: ["UART", "SPI", "I²C", "RS485", "Modbus"],
  },
  {
    discipline: "Tools",
    skills: [
      "Git",
      "Oscilloscope",
      "Logic analyzer",
      "CAN analyzer",
      "Altium Designer",
      "PlatformIO",
      "VS Code",
    ],
  },
];

/** Compact strip shown under the home hero. */
export const expertiseStrip = [
  "Embedded Firmware",
  "Automotive Communication",
  "IoT Systems",
  "PCB & Hardware Integration",
  "OTA Firmware",
  "Device Testing",
  "CAN & CAN FD",
  "OBD-II & UDS",
];

export const engineeringPrinciples = [
  {
    title: "Design for failure, not only the happy path.",
    detail:
      "Brown-outs, lost links, corrupted flash — the field always finds the edge case. Plan the recovery path before the feature.",
  },
  {
    title: "Make debugging observable.",
    detail:
      "Structured logs, status LEDs, diagnostic frames. A device that can explain itself is fixed in hours, not weeks.",
  },
  {
    title: "Test on real hardware early.",
    detail:
      "Simulation flatters. Real buses, real sensors, and real power supplies expose the truth long before deployment does.",
  },
  {
    title: "Documentation is part of the product.",
    detail:
      "A wiring diagram or register map that lives only in one engineer's head is technical debt with interest.",
  },
  {
    title: "Reliability beats unnecessary complexity.",
    detail:
      "The clever solution that fails at 2 a.m. is worse than the boring one that doesn't. Complexity must earn its place.",
  },
];

export const toolsList = [
  { name: "Altium Designer", use: "Schematic capture & PCB layout" },
  { name: "PlatformIO / ESP-IDF", use: "Firmware build systems" },
  { name: "Oscilloscope & logic analyzer", use: "Signal-level debugging" },
  { name: "CAN analyzer", use: "Bus capture & diagnostics" },
  { name: "Git", use: "Version control & code review" },
  { name: "VS Code", use: "Daily editor" },
];
