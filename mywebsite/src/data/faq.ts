export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Home-page FAQ accordion. Broad automotive/IoT language only — no
 * employer product names or confidential system details.
 */
export const faqItems: FaqItem[] = [
  {
    question: "What types of embedded systems projects do you work on?",
    answer:
      "I work mainly on automotive and IoT systems, including vehicle communication, diagnostics, telemetry, tracking, sensor-based devices, embedded firmware, PCB development, and connected products that combine hardware, firmware, and cloud communication.",
  },
  {
    question: "Do you work on both hardware and firmware?",
    answer:
      "Yes. My work covers schematic and PCB development, board bring-up, firmware development, peripheral integration, debugging, and system testing. I am most effective on projects where the hardware and firmware need to be developed and validated together.",
  },
  {
    question: "What vehicle communication protocols do you work with?",
    answer:
      "CAN, CAN-FD, OBD-II, ISO-TP, UDS, K-Line, and KWP2000, together with common embedded interfaces including UART, SPI, I²C, RS485, and Modbus.",
  },
  {
    question: "Can you help with automotive diagnostic research?",
    answer:
      "Yes. I work on understanding vehicle communication, analyzing CAN traffic, documenting diagnostic behaviour, and working with standard and manufacturer-specific diagnostic services in a controlled, read-only research context.",
  },
  {
    question: "Do you work with connected embedded devices?",
    answer:
      "Yes. I have experience integrating cellular communication, GNSS, MQTT, Wi-Fi, BLE, telemetry, sensors, and remote firmware-update concepts into embedded systems.",
  },
  {
    question:
      "Are you available for collaboration or engineering opportunities?",
    answer:
      "Yes. I am open to selected embedded systems, automotive, IoT, firmware, hardware, and technical collaboration opportunities. A short description of the system, current stage, and required outcome is the best starting point.",
  },
];
