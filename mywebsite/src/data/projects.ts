import type { Project } from "@/types/project";

/**
 * VERIFIED PUBLIC PROJECTS ONLY.
 *
 * Every project here is personal, academic, or otherwise publicly
 * shareable. Employer-owned products and confidential system details are
 * deliberately absent, the underlying expertise is communicated through
 * the About page, Skills, Services, FAQ, and writing instead.
 *
 * Narrative fields (context, problem, testing, results, …) are optional in
 * the Project type on purpose. Add one only when the content is true; the
 * detail page renders exactly the sections that exist. Do not pad a
 * project out with invented context or metrics.
 */
export const projects: Project[] = [
  {
    slug: "iot-power-monitoring-device",
    number: "01",
    title: "IoT Power Monitoring Device",
    summary:
      "A custom ESP32 board that measures voltage and current, then publishes live telemetry to a cloud MQTT broker.",
    description:
      "Designed and built an ESP32-based IoT power monitoring device for measuring voltage, current, and estimated power, then publishing the data to a cloud MQTT broker. I handled both the hardware and the firmware side of the project, including schematic design, PCB layout, power circuit design, ACS712 current sensing, the voltage measurement circuit, ESP32 firmware, JSON payload formatting, Wi-Fi connectivity, and MQTT telemetry publishing.",
    category: "IoT",
    status: "Prototype",
    featured: true,
    image: "/images/projects/iot-power-monitoring-device.webp",
    technologies: [
      "ESP32",
      "MQTT",
      "Wi-Fi",
      "PCB design",
      "ACS712 current sensor",
      "LM2596 / AMS1117 power design",
      "CP2102 USB-UART",
      "JSON",
    ],
    protocols: ["MQTT", "Wi-Fi", "UART"],
    role: "Hardware and firmware development",
    responsibilities: [
      "Schematic design and PCB layout for the complete board",
      "Power design: mains-side rectification, an LM2596 buck to 5 V, and an AMS1117 3.3 V rail for the ESP32",
      "Current sensing with an ACS712 5 A Hall-effect sensor into an ESP32 ADC input",
      "Voltage measurement front end using a resistor divider with clamp diodes and filtering",
      "On-board CP2102 USB-UART programming interface with auto-reset circuitry",
      "ESP32 firmware for sampling, Wi-Fi connectivity, and MQTT publishing",
      "JSON payload formatting and telemetry published to a cloud MQTT broker",
    ],
    gallery: [
      {
        src: "/images/projects/iot-power-monitoring-device.webp",
        caption: "3D render of the assembled board layout.",
      },
      {
        src: "/images/projects/iot-power-monitoring-schematic.webp",
        caption:
          "Schematic: power design, ESP32, ACS712 current sensing, voltage divider, and CP2102 programming interface.",
      },
      {
        src: "/images/projects/iot-power-monitoring-mqtt-dashboard.webp",
        caption:
          "Live telemetry arriving on the iotpower/esp32/energy topic in the cloud MQTT broker.",
      },
    ],
  },
  {
    slug: "obd2-interface-board",
    number: "02",
    title: "Custom OBD-II UART Interface Board",
    summary:
      "A custom interface board that connects microcontrollers to vehicle diagnostic networks.",
    description:
      "Designed a custom PCB around the SparkFun OBD-II UART concept for automotive diagnostics and vehicle communication. The project involved circuit planning, schematic design, PCB layout, component placement, routing, and board optimization for a compact embedded automotive interface. The prototype supports automotive communication used for retrieving diagnostic information such as VINs, DTCs, and live sensor data during testing.",
    category: "Automotive",
    status: "Prototype",
    featured: true,
    image: "/images/projects/obd2-interface-board-schematic.webp",
    technologies: [
      "PCB design",
      "Circuit design",
      "EasyEDA",
      "STN1110",
      "CAN",
      "ISO 9141",
      "KWP2000",
      "J1850",
      "UART",
      "STM32",
      "ESP32",
      "Arduino",
    ],
    protocols: ["CAN", "ISO 9141", "KWP2000", "J1850", "UART"],
    role: "Circuit design and PCB layout",
    responsibilities: [
      "Circuit planning and schematic design around the STN1110 OBD-II interpreter",
      "CAN, ISO 9141 / K-line, L-line, and J1850 transceiver front ends",
      "Power design stepping vehicle battery voltage down to 5 V and 3.3 V rails",
      "PCB layout, component placement, and routing",
      "Board optimization for a compact embedded automotive interface",
    ],
    gallery: [
      {
        src: "/images/projects/obd2-interface-board-schematic.webp",
        caption:
          "Schematic: STN1110 controller, CAN / K-line / L-line / J1850 transceivers, comparator, power rails, and the DB9 connector.",
      },
    ],
  },
  {
    slug: "ble-reminder-wearable",
    number: "03",
    title: "BLE Medication Reminder Watch Prototype",
    summary:
      "An ESP32-C3 smart watch prototype for Alzheimer's patients, with BLE reminders, an OLED interface, and a companion web controller.",
    description:
      "Built a smart watch reminder prototype for Alzheimer's patients using an ESP32-C3, an OLED display, button input, custom firmware, and a web-based controller. The system lets a user connect to the device over Bluetooth, synchronize time, create medication or activity reminders, and test device feedback. The hardware was designed as a compact wearable assistive-device prototype, with enclosure-aware development, embedded firmware, BLE communication, and a simple web interface for device control.",
    category: "Embedded",
    status: "Prototype",
    featured: true,
    image: "/images/projects/ble-medication-reminder-watch.webp",
    technologies: [
      "ESP32-C3",
      "BLE GATT",
      "FreeRTOS",
      "LittleFS",
      "OLED / I²C",
      "Vibration motor",
      "Buzzer",
      "Web Bluetooth control app",
    ],
    protocols: ["BLE GATT", "I²C"],
    role: "Hardware, firmware, and web app development",
    responsibilities: [
      "ESP32-C3 firmware for the clock, reminder scheduling, and button interaction",
      "BLE GATT service for device connection, time synchronization, and reminder management",
      "OLED interface showing current time, date, and connection state",
      "3D-printed wearable enclosure designed around the board and display",
      "Browser-based control app for connecting to the watch, syncing time, and creating reminders",
    ],
    gallery: [
      {
        src: "/images/projects/ble-medication-reminder-watch.webp",
        caption:
          "The assembled prototype running, showing time and date on the OLED with BLE advertising.",
      },
      {
        src: "/images/projects/ble-medication-reminder-watch-enclosure-cad.webp",
        caption: "CAD model of the wearable enclosure with the display cutout.",
      },
      {
        src: "/images/projects/ble-medication-reminder-watch-enclosure.webp",
        caption: "The 3D-printed enclosure with the display fitted.",
      },
      {
        src: "/images/projects/ble-medication-reminder-watch-controller.webp",
        caption:
          "The web controller on a phone: device connection, time synchronization, and reminder entry.",
      },
    ],
    link: {
      label: "GitHub repository",
      href: "https://github.com/Oluwatunmise116/caremini-app",
    },
  },
  {
    slug: "iot-biometric-attendance",
    number: "04",
    title: "IoT Biometric Attendance System",
    summary:
      "Final-year team project pairing an AS608 fingerprint sensor with an ESP32, publishing attendance logs over MQTT.",
    description:
      "An IoT-based biometric attendance system utilizing the AS608 fingerprint sensor and ESP32 microcontroller. The fingerprint sensor provides secure and unique biometric authentication, while the ESP32 enables data processing and seamless IoT connectivity. An integrated OLED display delivers real-time user feedback, and attendance logs are transmitted to a cloud-based database via MQTT for centralized and remote monitoring. The system offers a reliable, scalable, and secure alternative to traditional attendance methods.",
    category: "IoT",
    status: "Completed",
    featured: true,
    image: "/images/projects/iot-biometric-attendance.webp",
    technologies: [
      "ESP32",
      "AS608 fingerprint sensor",
      "OLED display",
      "MQTT",
      "Cloud database",
      "3D-printed enclosure",
    ],
    protocols: ["MQTT", "Wi-Fi", "UART"],
    role: "Core embedded workflow, IoT/server integration, implementation and testing",
    responsibilities: [
      "Fingerprint enrolment and matching using the AS608 sensor over UART",
      "ESP32 firmware handling authentication, data processing, and connectivity",
      "OLED interface giving real-time feedback at the point of scan",
      "Publishing attendance logs over MQTT to a cloud database for remote monitoring",
      "3D-printed enclosure housing the board, display, and sensor",
    ],
    gallery: [
      {
        src: "/images/projects/iot-biometric-attendance.webp",
        caption:
          "The assembled unit: OLED prompting for a scan, with the AS608 sensor illuminated.",
      },
      {
        src: "/images/projects/iot-biometric-attendance-enclosure.webp",
        caption: "The 3D-printed enclosure with the display and sensor fitted.",
      },
      {
        src: "/images/projects/iot-biometric-attendance-scan.webp",
        caption: "The unit in use during testing.",
      },
    ],
  },
  {
    slug: "raspberry-pi-object-detection",
    number: "05",
    title: "Real-Time Object Detection on Raspberry Pi",
    summary:
      "A Raspberry Pi computer vision system running local YOLO inference on a live webcam feed.",
    description:
      "Built a Raspberry Pi computer vision system that performs real-time object detection using a local YOLO model and a connected webcam. The system captures live camera frames with OpenCV, runs YOLO inference locally on the Raspberry Pi, draws detection results on each frame, and displays the annotated video feed in real time.",
    category: "Embedded",
    status: "Completed",
    featured: true,
    image: "/images/projects/raspberry-pi-object-detection.webp",
    technologies: [
      "Raspberry Pi",
      "Python",
      "OpenCV",
      "YOLO",
      "Computer vision",
      "USB webcam",
    ],
    role: "Implementation and testing",
    responsibilities: [
      "Live frame capture from a USB webcam using OpenCV",
      "Running YOLO inference locally on the Raspberry Pi rather than offloading to a server",
      "Drawing detection boxes, class labels, and confidence scores onto each frame",
      "Displaying the annotated video feed in real time",
    ],
    link: {
      label: "GitHub repository",
      href: "https://github.com/Oluwatunmise116/Object-Detection",
    },
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
