import type { SkillGroup } from "@/types/resume";

/** Grouped so the site reads as focused rather than overloaded. */
export const skillGroups: SkillGroup[] = [
  {
    discipline: "Embedded Firmware",
    skills: [
      "C",
      "C++",
      "Python",
      "STM32",
      "ESP32",
      "Raspberry Pi",
      "FreeRTOS",
      "Zephyr RTOS",
      "Drivers",
      "Peripheral integration",
      "Debugging",
    ],
  },
  {
    discipline: "Automotive Communication",
    skills: [
      "CAN",
      "CAN-FD",
      "OBD-II",
      "ISO-TP",
      "UDS",
      "K-Line",
      "KWP2000",
      "ECU communication",
      "Automotive diagnostics",
    ],
  },
  {
    discipline: "IoT and Connectivity",
    skills: [
      "HTTP",
      "MQTT",
      "Cellular / 4G",
      "GNSS",
      "Wi-Fi",
      "Bluetooth / BLE",
      "Device-to-cloud communication",
      "OTA firmware concepts",
    ],
  },
  {
    discipline: "Hardware and PCB",
    skills: [
      "Schematic design",
      "PCB development",
      "Board bring-up",
      "Sensor integration",
      "Power systems",
      "Hardware debugging",
      "Prototype testing",
    ],
  },
  {
    discipline: "Interfaces and Protocols",
    skills: ["UART", "SPI", "I²C", "RS485", "Modbus"],
  },
  {
    discipline: "Tools",
    skills: [
      "KiCad / EasyEDA",
      "Git",
      "VS Code",
      "PlatformIO",
      "ESP-IDF",
      "Oscilloscope",
      "Logic analyzer",
      "CAN analyzer",
    ],
  },
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
  { name: "KiCad / EasyEDA", use: "Schematic capture & PCB layout" },
  { name: "PlatformIO / ESP-IDF", use: "Firmware build systems" },
  { name: "Oscilloscope & logic analyzer", use: "Signal-level debugging" },
  { name: "CAN analyzer", use: "Bus capture & diagnostics" },
  { name: "Git", use: "Version control & code review" },
  { name: "VS Code", use: "Daily editor" },
];
