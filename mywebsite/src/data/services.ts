/**
 * "What I can build" — the four numbered capability groups shown on the
 * home page. Mirrors the numbered-service rhythm of the design reference,
 * adapted to embedded/automotive engineering.
 */
export type ServiceGroup = {
  number: string;
  title: string;
  items: string[];
};

export const servicesIntro =
  "I work across hardware and software to develop reliable automotive and connected systems—from early architecture to firmware, testing, and field deployment.";

export const services: ServiceGroup[] = [
  {
    number: "01",
    title: "Embedded Firmware",
    items: [
      "STM32 and ESP32 development",
      "C and C++",
      "RTOS-based firmware",
      "Drivers and peripheral integration",
      "Bootloaders and OTA updates",
    ],
  },
  {
    number: "02",
    title: "Automotive Communication",
    items: [
      "CAN and CAN FD",
      "OBD-II and ISO-TP",
      "UDS diagnostics",
      "K-Line and KWP2000",
      "OEM command research",
    ],
  },
  {
    number: "03",
    title: "Hardware and PCB Design",
    items: [
      "Schematic development",
      "PCB design and review",
      "Power-system design",
      "Sensor integration",
      "Board bring-up and debugging",
    ],
  },
  {
    number: "04",
    title: "IoT and Connected Devices",
    items: [
      "Cellular communication",
      "MQTT telemetry",
      "GNSS integration",
      "Device-to-cloud communication",
      "Remote monitoring and firmware updates",
    ],
  },
];
