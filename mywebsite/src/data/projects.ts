import type { Project } from "@/types/project";

/**
 * VERIFIED PUBLIC PROJECTS ONLY.
 *
 * Every project here is personal, academic, or otherwise publicly
 * shareable. Employer-owned products and confidential system details are
 * deliberately absent — the underlying expertise is communicated through
 * the About page, Skills, Services, FAQ, and writing instead.
 *
 * Narrative fields (context, problem, testing, results, …) are optional in
 * the Project type on purpose. Add one only when the content is true; the
 * detail page renders exactly the sections that exist. Do not pad a
 * project out with invented context or metrics.
 */
export const projects: Project[] = [
  {
    slug: "obd2-interface-board",
    number: "01",
    title: "Custom OBD-II UART Interface Board",
    summary:
      "A custom interface board that connects microcontrollers to vehicle diagnostic networks.",
    description:
      "Designed a custom OBD-II interface board for connecting microcontrollers to vehicle diagnostic networks. The prototype supports automotive communication used for retrieving diagnostic information such as VINs, DTCs, and live sensor data during testing.",
    category: "Automotive",
    status: "Prototype",
    featured: true,
    image: "/images/projects/obd2-interface-board.svg",
    technologies: [
      "CAN",
      "ISO 9141",
      "KWP2000",
      "UART",
      "PCB design",
      "STM32",
      "ESP32",
      "Arduino",
    ],
    protocols: ["CAN", "ISO 9141", "KWP2000", "UART"],
    role: "Hardware and firmware development",
  },
  {
    slug: "ble-reminder-wearable",
    number: "02",
    title: "CareMini BLE Reminder Wearable",
    summary:
      "An ESP32-C3 wearable reminder prototype with BLE, an OLED interface, and a companion web control app.",
    description:
      "Developed an ESP32-C3 wearable reminder prototype with BLE communication, OLED interface, persistent local storage, vibration and buzzer alerts, button interaction, and a companion web-based control interface.",
    category: "Embedded",
    status: "Prototype",
    featured: true,
    image: "/images/projects/ble-reminder-wearable.svg",
    technologies: [
      "ESP32-C3",
      "BLE GATT",
      "FreeRTOS",
      "LittleFS",
      "OLED / I²C",
      "Vibration motor",
      "Buzzer",
    ],
    protocols: ["BLE GATT", "I²C"],
    role: "Firmware and system integration",
  },
  {
    slug: "iot-biometric-attendance",
    number: "03",
    title: "IoT Biometric Attendance System",
    summary:
      "Final-year team project combining fingerprint identification, embedded control, and a locally hosted attendance application.",
    description:
      "Final-year team project that combined fingerprint identification, embedded control, a local display, IoT communication, and a locally hosted application for attendance management.",
    category: "IoT",
    status: "Completed",
    featured: true,
    image: "/images/projects/iot-biometric-attendance.svg",
    technologies: [
      "ESP32",
      "Fingerprint sensor",
      "OLED",
      "IoT communication",
      "PHP",
      "MySQL",
    ],
    role: "Core embedded workflow, IoT/server integration, implementation and testing",
  },
  {
    slug: "raspberry-pi-object-detection",
    number: "04",
    title: "Raspberry Pi Object Detection",
    summary:
      "A camera-based object-detection build running a local YOLO workflow on a Raspberry Pi.",
    description:
      "Built an object-detection project using Raspberry Pi, Python, OpenCV, and a locally running YOLO-based workflow for camera-based detection and experimentation.",
    category: "Embedded",
    status: "Completed",
    featured: true,
    image: "/images/projects/raspberry-pi-object-detection.svg",
    technologies: [
      "Raspberry Pi",
      "Python",
      "OpenCV",
      "YOLO",
      "Computer vision",
    ],
    role: "Implementation and testing",
  },
];

export const featuredProject: Project =
  projects.find((p) => p.featured) ?? projects[0];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function adjacentProjects(slug: string): {
  previous: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}
