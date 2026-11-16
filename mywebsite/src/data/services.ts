/**
 * "What I can build", the four numbered capability groups shown on the
 * home page. Generic capability wording only: no employer products,
 * client names, or proprietary system descriptions.
 */
export type ServiceGroup = {
  number: string;
  title: string;
  items: string[];
};

export const servicesIntro =
  "I work across hardware and software to develop reliable embedded, automotive, and connected systems, from early architecture and prototyping to firmware, testing, and validation.";

export const services: ServiceGroup[] = [
  {
    number: "01",
    title: "Embedded Firmware",
    items: [
      "STM32 and ESP32 development",
      "C and C++",
      "RTOS-based firmware",
      "Drivers and peripheral integration",
      "Debugging and firmware architecture",
    ],
  },
  {
    number: "02",
    title: "Automotive Communication",
    items: [
      "CAN and CAN-FD",
      "OBD-II and ISO-TP",
      "UDS diagnostics",
      "K-Line and KWP2000",
      "ECU communication analysis",
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
      "BLE and Wi-Fi connectivity",
      "Device-to-cloud communication",
      "Remote firmware-update architecture",
    ],
  },
];
