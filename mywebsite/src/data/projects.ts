import type { Project } from "@/types/project";

/**
 * PLACEHOLDER PORTFOLIO CONTENT.
 * These six projects are editable examples that match the wireframe. The
 * narrative fields describe plausible scope, but every metric is a bracketed
 * placeholder — replace them with facts before publishing. Images live in
 * public/images/projects/ and are generated placeholders; swap them for real
 * photos with the same file names, or update the paths here.
 */
export const projects: Project[] = [
  {
    slug: "vescan-vehicle-can-analyzer",
    number: "01",
    title: "VESCAN Vehicle CAN Analyzer",
    summary:
      "A handheld CAN bus analyzer for capturing, decoding, and logging vehicle network traffic in the field.",
    description:
      "VESCAN is a portable diagnostics tool built around a dual-CAN microcontroller. It captures raw frames from a vehicle's OBD-II port, decodes known broadcast messages live, and logs full traces to an SD card for offline analysis. [Replace with your own project description.]",
    category: "Automotive",
    year: "2025",
    status: "Active",
    featured: true,
    image: "/images/projects/vescan.svg",
    gallery: [
      {
        src: "/images/projects/vescan-schematic.svg",
        caption: "Transceiver front-end schematic detail (placeholder image)",
      },
      {
        src: "/images/projects/vescan-bench.svg",
        caption:
          "Bench capture against a simulated vehicle bus (placeholder image)",
      },
      {
        src: "/images/projects/vescan-enclosure.svg",
        caption: "Handheld enclosure and connector layout (placeholder image)",
      },
    ],
    technologies: ["STM32", "C", "CAN FD", "OBD-II", "FreeRTOS", "SD logging"],
    role: "Hardware & firmware — [replace with your actual role]",
    duration: "[Duration — e.g. 8 months]",
    context:
      "Workshop diagnostics tools are either cheap dongles that hide the raw bus or lab equipment that never leaves the bench. VESCAN aims at the gap: a field tool that shows the actual frames.",
    problem:
      "Capture and decode CAN and CAN FD traffic reliably from unknown vehicles, without disturbing the bus, in a device that survives a glovebox.",
    constraints: [
      "Listen-only default mode — the tool must never disturb an unknown vehicle bus.",
      "Powered from the OBD-II port: survive load dump, cranking dips, and reverse polarity.",
      "Sustained logging at high bus load without dropping frames.",
      "[Replace with a real constraint from your build.]",
    ],
    responsibilities: [
      "Schematic design and PCB layout for the dual-transceiver front end.",
      "Firmware architecture: capture pipeline, ring buffers, SD card writer.",
      "OBD-II request scheduling and UDS session handling.",
      "Field test procedure and trace-comparison tooling.",
    ],
    hardware: {
      title: "Hardware architecture",
      blocks: [
        {
          label: "OBD-II interface",
          detail: "Protected 16-pin connector, automotive TVS",
        },
        {
          label: "CAN transceivers ×2",
          detail: "CAN 2.0B + CAN FD, listen-only switchable",
        },
        { label: "STM32 MCU", detail: "Dual FDCAN peripherals, DMA capture" },
        { label: "microSD + RTC", detail: "Timestamped trace logging" },
        {
          label: "Power stage",
          detail: "12 V vehicle rail → 3.3 V, transient protected",
        },
      ],
    },
    firmware: {
      title: "Firmware architecture",
      blocks: [
        { label: "Capture ISR + DMA", detail: "Zero-copy frame intake" },
        {
          label: "Ring buffer core",
          detail: "Back-pressure aware, drop counters",
        },
        { label: "Decoder task", detail: "DBC-style signal decoding" },
        { label: "Logger task", detail: "Batched SD writes, wear-aware" },
        { label: "UI / shell", detail: "Live view + command console" },
      ],
    },
    protocols: ["CAN 2.0B", "CAN FD", "OBD-II (ISO 15031)", "UDS (ISO 14229)"],
    process: [
      "Started with a breadboard capture rig and a recorded set of real bus traces.",
      "Locked the frame-intake path first — everything else negotiates around it.",
      "Two board revisions: rev A proved capture, rev B fixed power-path issues found on cars.",
      "Built a replay harness so firmware changes could be regression-tested against saved traces.",
    ],
    testing: [
      "Replay harness with recorded traces at stepped bus loads.",
      "Long-run soak logging to catch buffer and filesystem edge cases.",
      "Electrical checks for cranking dips and load-dump transients.",
      "[Replace with a real test campaign you ran.]",
    ],
    challenges: [
      "Sustaining SD write throughput during traffic bursts without losing frames.",
      "Keeping the analyzer strictly silent in listen-only mode across error states.",
      "[Replace with a real challenge from your build.]",
    ],
    results: [
      "[Replace with measured outcome — e.g. sustained capture rate at X% bus load.]",
      "[Replace with measured outcome — e.g. hours of field logging without frame loss.]",
    ],
    lessons: [
      "Design the failure counters first; you cannot debug what you did not count.",
      "Real vehicles are noisier than any bench simulation — test on cars early.",
    ],
  },
  {
    slug: "evade-crash-detection-device",
    number: "02",
    title: "EVADE Crash Detection Device",
    summary:
      "An in-vehicle device that detects collision events from IMU and vehicle data, then reports over cellular with GNSS position.",
    description:
      "EVADE fuses accelerometer, gyroscope, and vehicle-speed data to classify crash events, then delivers an alert with position over a cellular link — designed to keep working when the vehicle electrical system does not. [Replace with your own project description.]",
    category: "Embedded",
    year: "2024",
    status: "Prototype",
    featured: false,
    image: "/images/projects/evade.svg",
    gallery: [
      {
        src: "/images/projects/evade-schematic.svg",
        caption: "IMU and backup-power schematic detail (placeholder image)",
      },
      {
        src: "/images/projects/evade-bench.svg",
        caption: "Impact-profile playback on the test rig (placeholder image)",
      },
      {
        src: "/images/projects/evade-enclosure.svg",
        caption:
          "Prototype enclosure with antenna placement (placeholder image)",
      },
    ],
    technologies: ["ESP32", "C", "IMU", "GNSS", "Cellular", "MQTT", "FreeRTOS"],
    role: "Firmware & system design — [replace with your actual role]",
    duration: "[Duration]",
    context:
      "Emergency-response time depends on knowing that a crash happened and where. Aftermarket vehicles rarely carry that capability.",
    problem:
      "Distinguish genuine crash signatures from potholes and hard braking, and deliver the alert even with degraded power and network conditions.",
    constraints: [
      "Must ride out complete loss of vehicle power during an event (supercap backup).",
      "False-positive rate low enough that alerts stay meaningful.",
      "Cellular coverage cannot be assumed at the moment of the event.",
      "[Replace with a real constraint.]",
    ],
    responsibilities: [
      "Sensor selection and IMU placement study.",
      "Event-detection pipeline: threshold pre-filter plus severity classification.",
      "Store-and-forward alert delivery over MQTT with retry budget.",
      "Backup power design and brown-out-safe event persistence.",
    ],
    hardware: {
      title: "Hardware architecture",
      blocks: [
        {
          label: "6-axis IMU",
          detail: "High-g range, hardware wake interrupt",
        },
        { label: "ESP32 MCU", detail: "Detection pipeline + comms" },
        {
          label: "Cellular modem",
          detail: "LTE-M fallback 2G, external antenna",
        },
        { label: "GNSS receiver", detail: "Position + speed cross-check" },
        {
          label: "Supercap backup",
          detail: "Rides through power loss at impact",
        },
      ],
    },
    firmware: {
      title: "Firmware architecture",
      blocks: [
        {
          label: "Sampling task",
          detail: "High-rate IMU intake, pre-trigger buffer",
        },
        {
          label: "Detector",
          detail: "Two-stage: fast threshold, then classifier",
        },
        { label: "Event store", detail: "Flash-persisted, power-loss safe" },
        { label: "Uplink task", detail: "MQTT store-and-forward with retries" },
        {
          label: "Supervisor",
          detail: "Watchdog, self-test, health reporting",
        },
      ],
    },
    protocols: ["MQTT", "NMEA (GNSS)", "I²C / SPI (sensors)"],
    process: [
      "Collected drive data first — weeks of normal-driving IMU logs before writing the detector.",
      "Built a playback rig that replays recorded impact and pothole profiles into the firmware.",
      "Iterated detection thresholds against the recorded corpus, not intuition.",
      "Prototype installs on test vehicles for real-world shakedown.",
    ],
    testing: [
      "Recorded-profile playback for repeatable detector regression tests.",
      "Power-cut testing at the moment of simulated impact.",
      "Network-loss injection to verify store-and-forward behaviour.",
      "[Replace with a real test campaign.]",
    ],
    challenges: [
      "Separating severe-pothole signatures from low-speed collision signatures.",
      "Guaranteeing the event record survives when power dies mid-write.",
      "[Replace with a real challenge.]",
    ],
    results: [
      "[Replace with measured outcome — e.g. detection performance on the recorded corpus.]",
      "[Replace with measured outcome — e.g. alert delivery latency in field trials.]",
    ],
    lessons: [
      "Data beats cleverness: the recorded-drive corpus was worth more than any algorithm tweak.",
      "Design the power-loss story before the happy path — it changes the architecture.",
    ],
  },
  {
    slug: "securedrive-vehicle-access",
    number: "03",
    title: "SecureDrive Vehicle Access System",
    summary:
      "A keyless vehicle access and immobiliser system with encrypted BLE credentials and a hardened relay control board.",
    description:
      "SecureDrive lets an authorised phone unlock and start a vehicle over Bluetooth LE, with challenge-response authentication, an immobiliser interlock, and a fallback path for dead-phone scenarios. [Replace with your own project description.]",
    category: "Hardware",
    year: "2024",
    status: "Completed",
    featured: false,
    image: "/images/projects/securedrive.svg",
    gallery: [
      {
        src: "/images/projects/securedrive-schematic.svg",
        caption:
          "Relay driver and interlock schematic detail (placeholder image)",
      },
      {
        src: "/images/projects/securedrive-bench.svg",
        caption:
          "Authentication timing capture on the bench (placeholder image)",
      },
      {
        src: "/images/projects/securedrive-enclosure.svg",
        caption: "Installed control unit, harness side (placeholder image)",
      },
    ],
    technologies: [
      "ESP32",
      "C",
      "BLE",
      "AES",
      "PCB design",
      "Automotive relays",
    ],
    role: "Hardware & firmware — [replace with your actual role]",
    duration: "[Duration]",
    context:
      "Aftermarket vehicle security ranges from trivially-cloned RF fobs to expensive OEM systems. The goal was a modern, phone-based credential done properly.",
    problem:
      "Authenticate a phone to a vehicle controller securely over BLE, drive ignition-critical relays safely, and never lock a legitimate owner out.",
    constraints: [
      "Replay and relay attacks must be addressed at the protocol level.",
      "Ignition-path relays must fail safe — never cut power to a moving vehicle.",
      "Fallback entry path required for dead phone or dead battery.",
      "[Replace with a real constraint.]",
    ],
    responsibilities: [
      "Control-board schematic and layout: relay drivers, sense inputs, protection.",
      "Challenge-response authentication protocol over BLE GATT.",
      "Immobiliser state machine with explicit fail-safe transitions.",
      "Install documentation and harness pinout for fitters.",
    ],
    hardware: {
      title: "Hardware architecture",
      blocks: [
        { label: "ESP32 module", detail: "BLE + crypto, secure boot" },
        {
          label: "Relay stage",
          detail: "Driven high-side, ignition interlock",
        },
        {
          label: "Sense inputs",
          detail: "Ignition, door, engine-run detection",
        },
        {
          label: "Secure element",
          detail: "Key storage [replace if different]",
        },
        {
          label: "Power stage",
          detail: "12 V automotive rail, transient protected",
        },
      ],
    },
    firmware: {
      title: "Firmware architecture",
      blocks: [
        { label: "BLE service", detail: "GATT, bonded transport" },
        { label: "Auth engine", detail: "Nonce challenge-response, AES-CCM" },
        {
          label: "Vehicle state machine",
          detail: "Locked / armed / run, fail-safe",
        },
        {
          label: "Relay controller",
          detail: "Interlocked outputs, self-check",
        },
        { label: "Audit log", detail: "Flash-persisted access events" },
      ],
    },
    protocols: ["Bluetooth LE (GATT)", "AES-CCM", "UART (diagnostics)"],
    process: [
      "Threat-modelled the credential flow before any code — replay, relay, and cloning cases.",
      "Bench mule: a harness with real relays, ignition switch, and dash lamps.",
      "State machine reviewed as a document before implementation.",
      "Staged rollout: bench → test vehicle → [replace with your rollout].",
    ],
    testing: [
      "Protocol fuzzing on the BLE interface.",
      "Interlock testing: verified no relay transition can occur while engine-run is sensed.",
      "Lockout drills for the fallback entry path.",
      "[Replace with a real test campaign.]",
    ],
    challenges: [
      "Making the fail-safe story provable rather than probable.",
      "BLE connection latency vs. the walk-up unlock experience.",
      "[Replace with a real challenge.]",
    ],
    results: [
      "[Replace with measured outcome — e.g. unlock latency from approach.]",
      "[Replace with measured outcome — e.g. field installs and support record.]",
    ],
    lessons: [
      "Write the state machine down first; the diagram found bugs the code review missed.",
      "Security features live or die by their recovery paths.",
    ],
  },
  {
    slug: "wearable-gps-tracker",
    number: "04",
    title: "Wearable GPS Tracking Device",
    summary:
      "A compact, low-power wearable tracker with GNSS positioning, cellular reporting, and multi-day battery life.",
    description:
      "A wrist-worn tracker that balances positioning accuracy against battery life with adaptive duty-cycling: frequent fixes while moving, deep sleep while still, and geofence-triggered reporting. [Replace with your own project description.]",
    category: "IoT",
    year: "2023",
    status: "Completed",
    featured: false,
    image: "/images/projects/wearable-gps.svg",
    gallery: [
      {
        src: "/images/projects/wearable-gps-schematic.svg",
        caption: "Power-tree schematic detail (placeholder image)",
      },
      {
        src: "/images/projects/wearable-gps-bench.svg",
        caption:
          "Current-profile capture across duty cycles (placeholder image)",
      },
      {
        src: "/images/projects/wearable-gps-enclosure.svg",
        caption: "Wearable enclosure and charging contacts (placeholder image)",
      },
    ],
    technologies: [
      "nRF52 / ESP32",
      "C",
      "GNSS",
      "LTE-M",
      "MQTT",
      "Power design",
    ],
    role: "Firmware & hardware integration — [replace with your actual role]",
    duration: "[Duration]",
    context:
      "Trackers for people and assets fail in the same way: dead battery, no data. The engineering problem is fundamentally a power budget.",
    problem:
      "Deliver useful position updates for days on a wearable-sized battery, across GNSS-hostile environments and patchy cellular coverage.",
    constraints: [
      "Wearable enclosure limits battery capacity and antenna performance.",
      "GNSS cold starts are power-expensive; fix strategy must be adaptive.",
      "Reports must queue gracefully through coverage gaps.",
      "[Replace with a real constraint.]",
    ],
    responsibilities: [
      "Power-tree design and sleep-current optimisation.",
      "Motion-aware duty cycling from accelerometer wake events.",
      "GNSS fix strategy: assisted data, hot-start budget, fix quality gates.",
      "Uplink protocol with batched, delay-tolerant reporting.",
    ],
    hardware: {
      title: "Hardware architecture",
      blocks: [
        { label: "MCU + BLE", detail: "Low-power core, accelerometer wake" },
        {
          label: "GNSS receiver",
          detail: "Hot-start optimised, backup domain",
        },
        { label: "LTE-M modem", detail: "PSM/eDRX power modes" },
        { label: "Accelerometer", detail: "Motion wake, still detection" },
        { label: "Battery + PMIC", detail: "Fuel gauge, charge contacts" },
      ],
    },
    firmware: {
      title: "Firmware architecture",
      blocks: [
        { label: "Power manager", detail: "State-driven duty cycling" },
        { label: "Fix engine", detail: "Quality-gated GNSS sessions" },
        { label: "Report queue", detail: "Flash-backed, delay tolerant" },
        { label: "Uplink task", detail: "Batched MQTT over LTE-M" },
        { label: "OTA client", detail: "Dual-bank firmware updates" },
      ],
    },
    protocols: ["MQTT", "NMEA (GNSS)", "BLE (provisioning)"],
    process: [
      "Built the power model in a spreadsheet before the schematic.",
      "Measured every sleep state with a current profiler; the datasheet is a rumour.",
      "Firmware states mapped one-to-one to power states for auditability.",
      "Wear trials with logged battery curves against the model.",
    ],
    testing: [
      "Current profiling per state, tracked per firmware release.",
      "Coverage-gap simulation for the report queue.",
      "GNSS performance walks: urban canyon, indoors, open sky.",
      "[Replace with a real test campaign.]",
    ],
    challenges: [
      "Antenna detuning on the wrist versus the bench.",
      "Modem wake-up costs dominating the power budget.",
      "[Replace with a real challenge.]",
    ],
    results: [
      "[Replace with measured outcome — e.g. battery life across usage profiles.]",
      "[Replace with measured outcome — e.g. fix success rates by environment.]",
    ],
    lessons: [
      "The power budget is the product spec; everything else negotiates with it.",
      "Measure on-body, not on-bench — the body changes the RF story.",
    ],
  },
  {
    slug: "ota-firmware-platform",
    number: "05",
    title: "OTA Firmware Management Platform",
    summary:
      "A device-side OTA update system: signed images, dual-bank flashing, staged rollouts, and automatic rollback.",
    description:
      "The device half of a fleet update pipeline — a bootloader and update client that verify signed firmware images, flash to an inactive bank, and roll back automatically if the new image fails its health checks. [Replace with your own project description.]",
    category: "Firmware",
    year: "2023",
    status: "Active",
    featured: false,
    image: "/images/projects/ota-platform.svg",
    gallery: [
      {
        src: "/images/projects/ota-platform-schematic.svg",
        caption: "Flash partition map, dual-bank layout (placeholder image)",
      },
      {
        src: "/images/projects/ota-platform-bench.svg",
        caption:
          "Power-cut torture rig during flash writes (placeholder image)",
      },
      {
        src: "/images/projects/ota-platform-enclosure.svg",
        caption: "Fleet test devices on the update wall (placeholder image)",
      },
    ],
    technologies: [
      "C",
      "ESP-IDF",
      "Bootloader",
      "Ed25519 signing",
      "MQTT",
      "CI",
    ],
    role: "Firmware architecture — [replace with your actual role]",
    duration: "[Duration]",
    context:
      "A fleet you cannot update is a fleet you will physically visit. OTA is the difference between a product and a science project.",
    problem:
      "Update remote devices safely: no bricking on power loss, no rollout of a bad image to the whole fleet, no unsigned code ever executing.",
    constraints: [
      "Power can fail at any byte of the flash write.",
      "Bandwidth-constrained links: delta-friendly, resumable transfers.",
      "Bootloader itself must be minimal and effectively frozen.",
      "[Replace with a real constraint.]",
    ],
    responsibilities: [
      "Dual-bank partition scheme and boot selection logic.",
      "Signature verification chain from bootloader to application.",
      "Health-check contract: an image must prove itself or be rolled back.",
      "Staged rollout controls and fleet status reporting.",
    ],
    hardware: {
      title: "System architecture",
      blocks: [
        {
          label: "Build & sign",
          detail: "CI produces signed, versioned images",
        },
        { label: "Update service", detail: "Staged rollout, cohort targeting" },
        { label: "Device client", detail: "Resumable download, verify, flash" },
        { label: "Bootloader", detail: "Bank selection, signature check" },
        { label: "Health monitor", detail: "Confirm-or-rollback window" },
      ],
    },
    firmware: {
      title: "Update state machine",
      blocks: [
        { label: "Idle / poll", detail: "Manifest check, cohort match" },
        { label: "Download", detail: "Chunked, resumable, verified" },
        { label: "Flash inactive bank", detail: "Power-loss safe writes" },
        { label: "Trial boot", detail: "Watchdog-guarded first boot" },
        { label: "Confirm / rollback", detail: "Health checks decide" },
      ],
    },
    protocols: ["MQTT", "HTTPS (image fetch)", "Ed25519 signatures"],
    process: [
      "Wrote the failure-mode matrix first: every state × power loss × link loss.",
      "Torture rig that cuts power at randomised offsets during flash writes.",
      "Canary cohort in the rollout design from day one.",
      "Version-skew tests: every supported old version updating to every new one.",
    ],
    testing: [
      "Thousands of automated power-cut cycles across update states.",
      "Corrupted-image and wrong-signature rejection tests.",
      "Rollback drills from deliberately broken images.",
      "[Replace with a real test campaign.]",
    ],
    challenges: [
      "Keeping the bootloader small enough to trust and never update.",
      "Designing health checks that catch real regressions without false rollbacks.",
      "[Replace with a real challenge.]",
    ],
    results: [
      "[Replace with measured outcome — e.g. fleet update success rate.]",
      "[Replace with measured outcome — e.g. recovery record across power-cut tests.]",
    ],
    lessons: [
      "Rollback is the feature; the update is just the transport.",
      "If the failure-mode matrix is boring, the design is probably right.",
    ],
  },
  {
    slug: "automotive-diagnostics-research",
    number: "06",
    title: "Automotive Diagnostics Research",
    summary:
      "Ongoing research into OBD-II, UDS, and proprietary diagnostic protocols across production vehicles.",
    description:
      "A rolling research project: capturing and documenting how production vehicles actually implement diagnostics — standard OBD-II services, UDS sessions, and manufacturer-specific extensions — to build better tooling on top. [Replace with your own project description.]",
    category: "Research",
    year: "2022 — ongoing",
    status: "Research",
    featured: false,
    image: "/images/projects/diagnostics-research.svg",
    gallery: [
      {
        src: "/images/projects/diagnostics-research-schematic.svg",
        caption: "Capture-rig wiring diagram (placeholder image)",
      },
      {
        src: "/images/projects/diagnostics-research-bench.svg",
        caption:
          "Session trace annotated for service discovery (placeholder image)",
      },
      {
        src: "/images/projects/diagnostics-research-enclosure.svg",
        caption: "Vehicle capture kit in its field case (placeholder image)",
      },
    ],
    technologies: ["Python", "CAN", "UDS", "OBD-II", "K-Line", "Wireshark"],
    role: "Independent research — [replace with your actual role]",
    duration: "Ongoing",
    context:
      "The gap between the diagnostics standards and what vehicles actually do is where useful tools are built — and where most tools break.",
    problem:
      "Systematically map real-world diagnostic behaviour across vehicles: which services respond, how sessions are gated, and where implementations diverge from the standards.",
    constraints: [
      "Strictly non-intrusive: read-only sessions on vehicles, no write services.",
      "Findings must be reproducible from saved traces.",
      "Vehicle access is opportunistic — capture everything, once.",
      "[Replace with a real constraint.]",
    ],
    responsibilities: [
      "Capture methodology and rig design.",
      "Trace annotation tooling and a queryable findings database.",
      "Cross-vehicle comparison of service implementations.",
      "Write-ups feeding the blog's diagnostics series.",
    ],
    hardware: {
      title: "Capture rig",
      blocks: [
        { label: "OBD-II breakout", detail: "Pin-selectable, protected" },
        { label: "CAN interface", detail: "Dual channel, hardware timestamps" },
        { label: "K-Line adapter", detail: "Older-vehicle coverage" },
        { label: "Capture laptop", detail: "Scripted sessions, raw logging" },
      ],
    },
    firmware: {
      title: "Analysis pipeline",
      blocks: [
        { label: "Raw traces", detail: "Timestamped capture archive" },
        {
          label: "Session parser",
          detail: "ISO-TP reassembly, service decode",
        },
        { label: "Findings DB", detail: "Vehicle × service × behaviour" },
        { label: "Reports", detail: "Comparisons and write-ups" },
      ],
    },
    protocols: [
      "OBD-II (ISO 15031)",
      "UDS (ISO 14229)",
      "ISO-TP (ISO 15765-2)",
      "K-Line (ISO 9141)",
    ],
    process: [
      "Standardised a capture checklist so every vehicle session is comparable.",
      "Built ISO-TP reassembly tooling early; raw frames hide the story.",
      "Each finding is documented with the trace excerpt that proves it.",
    ],
    testing: [
      "Parser regression suite over the trace archive.",
      "Cross-checks of decoded values against dashboard readings.",
      "[Replace with a real validation step.]",
    ],
    challenges: [
      "Manufacturer-specific services with zero public documentation.",
      "Keeping captures comparable across very different vehicles.",
      "[Replace with a real challenge.]",
    ],
    results: [
      "[Replace with concrete outputs — e.g. number of vehicles documented.]",
      "Feeds the OBD-II and UDS articles in the writing section.",
    ],
    lessons: [
      "Standards describe the treaty; traces describe the war.",
      "Tooling that preserves raw data always pays for itself later.",
    ],
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
