import type { SkillGroup } from "@/types/resume";

/**
 * Grouped the same way as the technical-skills table on the CV, so the
 * site and the CV describe the same engineer in the same words.
 */
export const skillGroups: SkillGroup[] = [
  {
    discipline: "Vehicle Networks & Diagnostics",
    skills: [
      "CAN 2.0B",
      "CAN FD (ISO 11898)",
      "ISO-TP (ISO 15765)",
      "UDS (ISO 14229)",
      "Diagnostic sessions",
      "ReadDataByIdentifier, DIDs",
      "Security access",
      "OBD-II PIDs and DTCs",
      "SAE J1939 (PGNs, SPNs)",
      "K-Line / KWP2000",
      "ECU communication (ECM, TCM, BCM)",
    ],
  },
  {
    discipline: "CAN Reverse Engineering",
    skills: [
      "Decoding unknown CAN IDs and signals",
      "Before/after capture comparison",
      "ISO-TP multi-frame analysis",
      "Deriving OEM diagnostic commands",
      "Python log analysis",
      "CL2000 CAN logger",
      "Launch scan tools",
    ],
  },
  {
    discipline: "Industrial Protocols",
    skills: [
      "Modbus RTU",
      "Modbus TCP-to-RS-485 gateways",
      "RS-485",
      "RS-232",
      "J1939 on generator controllers",
      "Deep Sea DSE4520, DSE857",
    ],
  },
  {
    discipline: "Microcontrollers & Firmware",
    skills: [
      "Embedded C/C++",
      "ESP32",
      "STM32",
      "ESP-IDF",
      "Arduino",
      "PlatformIO",
      "STM32CubeIDE / HAL",
      "FreeRTOS",
      "Zephyr RTOS",
      "State machines",
      "DMA-based UART",
      "Power and battery management",
    ],
  },
  {
    discipline: "Connectivity & IoT",
    skills: [
      "SIMCom A7670E / A7672E",
      "SIM7600",
      "AT commands, PPP, TinyGSM",
      "MQTT and MQTT over TLS",
      "HTTP/HTTPS, JSON",
      "Wi-Fi with GSM fallback",
      "BLE (GATT server, Web Bluetooth)",
      "Ethernet (W5500)",
      "GNSS",
    ],
  },
  {
    discipline: "Firmware Updates",
    skills: [
      "OTA over Wi-Fi and cellular",
      "Dual-slot (A/B) bootloader",
      "CRC32 verification",
      "Rollback and interrupted-update recovery",
      "Flash partition planning",
      "Field-fault diagnosis",
    ],
  },
  {
    discipline: "Hardware & PCB Design",
    skills: [
      "Schematic design and review",
      "Power-tree tracing",
      "Board bring-up",
      "Datasheet and component selection",
      "KiCad",
      "EasyEDA",
      "Altium (basic)",
      "Proteus",
      "I²C, SPI, UART peripherals",
      "IMUs",
      "Load cells",
      "OLED displays",
      "Fingerprint sensors",
      "Oscilloscope and logic analyzer",
    ],
  },
  {
    discipline: "Linux, Python & Edge AI",
    skills: [
      "Raspberry Pi (headless setup, VNC)",
      "Python",
      "OpenCV",
      "YOLO (Ultralytics)",
      "NCNN export for ARM",
    ],
  },
  {
    discipline: "Software Tools",
    skills: [
      "Node.js bridge servers",
      "Postman",
      "Git",
      "VS Code",
      "Microsoft Office",
    ],
  },
];

export const engineeringPrinciples = [
  {
    title: "Design for failure, not only the happy path.",
    detail:
      "Brown-outs, lost links, corrupted flash: the field always finds the edge case. Plan the recovery path before the feature.",
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
