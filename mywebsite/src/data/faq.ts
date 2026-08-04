export type FaqItem = {
  question: string;
  answer: string;
};

/** Home-page FAQ accordion. Keep answers concise and honest. */
export const faqItems: FaqItem[] = [
  {
    question: "What types of embedded systems projects do you work on?",
    answer:
      "Mostly vehicle-connected and IoT devices: CAN/OBD-II tools, telemetry and tracking hardware, crash-detection devices, and connected products that need firmware, hardware, and cloud communication to work together reliably.",
  },
  {
    question: "Do you work on both hardware and firmware?",
    answer:
      "Yes. I design schematics and PCBs, bring boards up on the bench, and write the firmware that runs on them. Owning both sides is the point — most real problems live at the seam between hardware and software.",
  },
  {
    question: "What vehicle communication protocols do you support?",
    answer:
      "CAN and CAN FD, OBD-II with ISO-TP transport, UDS diagnostics, and K-Line/KWP2000 on older platforms. I also work with MQTT, GNSS/NMEA, and the usual board-level buses (UART, SPI, I²C, RS485).",
  },
  {
    question: "Can you help with automotive diagnostic research?",
    answer:
      "Yes — capturing and documenting how production vehicles implement diagnostics, from standard OBD-II services to UDS sessions and manufacturer-specific behaviour. All research is strictly read-only on the vehicle bus.",
  },
  {
    question: "Do you develop OTA update systems?",
    answer:
      "Yes. Signed images, dual-bank flashing, health-check-gated rollouts, and automatic rollback — designed so that a failed update or a power cut never bricks a device in the field.",
  },
  {
    question:
      "Are you available for collaboration or engineering opportunities?",
    answer:
      "I'm open to selected projects and engineering opportunities. The fastest way to reach me is the contact form or email — a short description of the system you're building is the ideal starting point.",
  },
];
