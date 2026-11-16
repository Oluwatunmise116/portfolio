/**
 * Single source of truth for personal information.
 *
 * Every value here is owner-verified. Do not add professional
 * designations, statistics, or claims that cannot be independently
 * confirmed, an accurate portfolio is stronger than an impressive one.
 */
export const profile = {
  /** Full legal name, used on About, résumé, and metadata. */
  name: "Oluwatunmise John Olabanji",
  /** Short brand used in the header and hero. */
  shortName: "Tunmise",
  initials: "OO",
  title: "Embedded Systems Engineer",
  credentials: "B.Eng. Computer Engineering",
  specialisation:
    "Automotive Embedded Systems | IoT | Vehicle Diagnostics | Firmware | PCB & Hardware Integration",
  tagline:
    "I build embedded systems that connect vehicles, hardware, firmware, and the cloud.",
  taglineSupport:
    "From embedded firmware and PCB development to vehicle diagnostics, connectivity, testing, and deployment.",
  intro:
    "Embedded Systems Engineer focused on automotive embedded systems, IoT, vehicle diagnostics, firmware, PCB development, and connected hardware.",
  eyebrow: "Embedded Systems | Automotive | Firmware | IoT",

  /** Split hero headline words: [NAME] / EMBEDDED [portrait] ENGINEER. */
  heroWords: { left: "Embedded", right: "Engineer" },
  /** One-word circular badge overlapping the portrait. */
  heroBadge: "Hi",

  email: "olabanjitunmise234@gmail.com",
  location: "Lagos, Nigeria",
  timezone: "WAT | UTC+1",

  /**
   * Scheduling link shown on the contact page. `durationMinutes` matches
   * the `/30min` event in the URL, keep the two in step if the event
   * type changes. Set `url` to "" to hide the booking option entirely.
   */
  booking: {
    url: "https://calendly.com/olabanjitunmise234/30min",
    durationMinutes: 30,
  },

  availability: {
    available: true,
    label:
      "Open to embedded systems, automotive, IoT, firmware, hardware, and technical collaboration opportunities",
    /** Compact variant for tight spaces (hero strip, mobile menu). */
    shortLabel: "Available",
  },

  /**
   * The canonical portrait. Every image slot below falls back to this, so
   * the site always renders even when a slot has no dedicated photo yet.
   */
  portrait: {
    src: "/images/profile/portrait.jpg",
    alt: "Oluwatunmise John Olabanji, Embedded Systems Engineer",
    width: 1027,
    height: 1284,

    /**
     * Where the subject sits in the frame, as a CSS object-position, used
     * by the large 4:5 crops. This source is already exactly 4:5, so the
     * whole frame shows and this only matters if a ratio changes.
     */
    focus: "50% 30%",

    /**
     * Small circular avatars (nav 36px, contact 64/80px) crop to 1:1.
     * A head-and-shoulders source needs only a light zoom; a full-body
     * photo needs roughly 2.5+ or the face becomes a smudge at 36px.
     */
    avatarFocus: "50% 20%",
    avatarZoom: 1.25,
  },

  /** Professional summary used on the résumé page. */
  summary:
    "Embedded systems engineer with five years of industry experience building firmware and hardware for connected vehicles, generators and IoT devices. Most of my work sits where firmware meets the vehicle network: reading CAN, OBD-II, UDS and J1939 traffic, working out manufacturer-specific diagnostic data that isn't publicly documented, and getting that data off the machine and into the cloud over cellular. I have taken a telematics device from bare-board bring-up to a product-level unit, and I'm comfortable across ESP32 and STM32, FreeRTOS, cellular modems, OTA updates and PCB design. Interested in research and development opportunities in automotive electronics, IoT and embedded product development.",

  /** Opening statement on the About page. */
  aboutStatement:
    "I build where hardware, firmware, vehicles, and connectivity meet.",

  shortAbout: [
    "I'm an embedded systems engineer focused on developing practical automotive and IoT systems across firmware, hardware, connectivity, diagnostics, and testing.",
    "I enjoy solving the problems that appear between the schematic and the real world: noisy signals, unreliable links, protocol behaviour, hardware constraints, firmware bugs, and the validation work required to make a system dependable.",
  ],

  biography: [
    "My work sits at the intersection of embedded systems, automotive technology, IoT, and vehicle diagnostics. I work with microcontrollers, communication protocols, connected hardware, sensors, cellular and GNSS systems, and the firmware that ties them together.",
    "A major area of my interest is understanding how vehicles communicate. I work with CAN, CAN-FD, OBD-II, ISO-TP, UDS, K-Line, and ECU communication, alongside PCB development, firmware architecture, hardware debugging, OTA concepts, telemetry, and field testing. I enjoy engineering problems where the answer is not immediately obvious and must be found through measurement, logs, testing, and careful iteration.",
  ],

  /**
   * Longer About-page narrative.
   */
  aboutNarrative: [
    "I like building systems that make vehicles and connected devices smarter, more reliable, and easier to understand.",
    "My work sits at the intersection of embedded systems, automotive technology, IoT, and vehicle diagnostics. I work across firmware development, PCB design and review, hardware integration, communication protocols, debugging, testing, and product validation.",
    "I have hands-on experience with STM32, ESP32, Embedded C/C++, FreeRTOS, CAN, CAN-FD, OBD-II, ISO-TP, UDS, K-Line, UART, SPI, I2C, RS485, MQTT, GNSS, cellular connectivity, sensors, OTA concepts, and cloud-connected embedded systems.",
    "What interests me most is not a technology by itself, but what can be built with it. I enjoy understanding how hardware behaves outside the lab, how vehicles communicate, how firmware responds to edge cases, and how multiple subsystems can be integrated into one dependable product.",
    "Automotive diagnostics is one of my strongest areas of interest. I spend time analyzing CAN traffic, working with OBD-II and UDS, studying ECU communication, and understanding manufacturer-specific diagnostic behaviour. I also work on connected-device architecture, telemetry, firmware updates, sensor integration, PCB development, and hardware validation.",
    "I enjoy the part of engineering where the answer is not immediately available: debugging, testing, reading communication logs, tracing signals, understanding unexpected hardware behaviour, and turning the result into a system that works reliably in the real world.",
    "My broader experience includes embedded firmware and RTOS development, automotive CAN and ECU communication, OBD-II and UDS diagnostics, PCB and schematic development, IoT connectivity, cellular and GNSS integration, sensors and telemetry, hardware debugging, prototype development, and product validation.",
    "I am particularly interested in automotive embedded systems, connected vehicles, vehicle diagnostics, IoT products, telematics, embedded hardware, and firmware engineering. My goal is to keep growing as an engineer while building technology that solves practical problems outside the laboratory.",
  ],

  /**
   * Qualitative capability highlights shown where a statistics block used
   * to sit. These deliberately replace numeric claims: no figure appears
   * on this site unless it can be independently verified.
   */
  focusAreas: [
    {
      title: "Automotive & vehicle diagnostics",
      detail: "CAN, CAN-FD, OBD-II, ISO-TP, UDS, K-Line, ECU communication.",
    },
    {
      title: "Embedded firmware",
      detail: "STM32 and ESP32, Embedded C/C++, RTOS, drivers, debugging.",
    },
    {
      title: "Hardware & connectivity",
      detail: "PCB development, sensors, cellular, GNSS, MQTT, telemetry.",
    },
  ],
} as const;
