import type { Article } from "@/types/article";

/**
 * PLACEHOLDER ARTICLES — editable examples demonstrating the article
 * template (headings, code, callouts, figures). Replace the bodies with
 * real writing, or migrate posts to MDX (the section shape maps 1:1).
 */
export const articles: Article[] = [
  {
    slug: "obd2-explained",
    title: "OBD-II Explained: The Diagnostic Doorway Into Your Car's Brain",
    summary:
      "What the 16-pin port under your dashboard actually exposes, how the standard services work, and why every scan tool starts here.",
    topic: "OBD-II",
    date: "2026-06-12",
    readingTime: "9 min read",
    cover: "/images/blog/obd2-explained.svg",
    featured: true,
    sections: [
      {
        kind: "paragraph",
        text: "Every car built in the last two decades carries a small trapezoid connector within reach of the driver's seat. It is the single most useful interface on the vehicle — and most drivers never touch it. [Placeholder body — replace with your own writing.]",
      },
      {
        kind: "heading",
        id: "what-the-port-exposes",
        text: "What the port actually exposes",
      },
      {
        kind: "paragraph",
        text: "OBD-II is not one protocol but a family: a connector standard, several physical layers, and a set of diagnostic services. On modern vehicles the physical layer is almost always CAN at 500 kbit/s on pins 6 and 14.",
      },
      {
        kind: "list",
        items: [
          "Service 01 — live data: RPM, coolant temperature, sensor values.",
          "Service 03 — stored diagnostic trouble codes (DTCs).",
          "Service 09 — vehicle information, including the VIN.",
        ],
      },
      {
        kind: "heading",
        id: "a-first-request",
        text: "A first request on the bus",
      },
      {
        kind: "code",
        language: "text",
        code: "TX  7DF  02 01 0C 00 00 00 00 00   # Service 01, PID 0C (engine RPM)\nRX  7E8  04 41 0C 1A F8 00 00 00   # 0x1AF8 / 4 = 1726 rpm",
      },
      {
        kind: "callout",
        title: "Functional vs. physical addressing",
        text: "0x7DF is a broadcast — every emissions-relevant ECU hears it. Responses arrive on 0x7E8–0x7EF, one per ECU. Physical addressing (0x7E0…) targets a single module.",
      },
      {
        kind: "heading",
        id: "beyond-the-standard",
        text: "Beyond the standard",
      },
      {
        kind: "paragraph",
        text: "OBD-II covers the legislated minimum. The interesting behaviour — coding, adaptations, module-level diagnostics — lives in UDS and manufacturer-specific services, which is where the next article picks up.",
      },
    ],
  },
  {
    slug: "understanding-can-bus",
    title: "Understanding CAN Bus in Modern Vehicles",
    summary:
      "Why a 1980s two-wire bus still runs every modern vehicle, and the properties that make CAN hard to replace.",
    topic: "Automotive Diagnostics",
    date: "2026-04-28",
    readingTime: "11 min read",
    cover: "/images/blog/understanding-can-bus.svg",
    featured: false,
    sections: [
      {
        kind: "paragraph",
        text: "CAN was designed when car electronics meant an engine controller and little else. Forty years later it carries almost everything. That longevity is not an accident. [Placeholder body — replace with your own writing.]",
      },
      {
        kind: "heading",
        id: "arbitration",
        text: "Arbitration: politeness in hardware",
      },
      {
        kind: "paragraph",
        text: "Every node can transmit whenever the bus is idle. Collisions are resolved bit-by-bit: a dominant zero beats a recessive one, so the lowest identifier always wins without destroying either message. Priority is free, deterministic, and enforced by physics.",
      },
      {
        kind: "heading",
        id: "error-handling",
        text: "Error handling that assumes failure",
      },
      {
        kind: "list",
        items: [
          "Every receiver checks every frame — CRC, form, stuffing.",
          "Error counters push misbehaving nodes off the bus automatically.",
          "A single flipped bit triggers retransmission in microseconds.",
        ],
      },
      {
        kind: "callout",
        title: "Why diagnostics tools must be quiet",
        text: "An analyzer that transmits carelessly participates in arbitration and error signalling. Listen-only mode is not a nicety — it is the difference between observing a bus and disturbing it.",
      },
      { kind: "heading", id: "can-fd", text: "CAN FD and what comes next" },
      {
        kind: "paragraph",
        text: "CAN FD raises payloads to 64 bytes and switches to a faster bit rate for the data phase. It buys the ecosystem another decade while automotive Ethernet grows into the backbone role.",
      },
    ],
  },
  {
    slug: "reliable-ota-updates",
    title: "Building Reliable OTA Updates for Embedded Devices",
    summary:
      "Dual banks, signed images, health checks, and the failure-mode matrix that keeps a fleet alive when an update goes wrong.",
    topic: "Firmware",
    date: "2026-03-10",
    readingTime: "12 min read",
    cover: "/images/blog/reliable-ota-updates.svg",
    featured: false,
    sections: [
      {
        kind: "paragraph",
        text: "The scariest moment in embedded product development is pressing the button that updates devices you can no longer physically reach. [Placeholder body — replace with your own writing.]",
      },
      { kind: "heading", id: "the-contract", text: "The update contract" },
      {
        kind: "list",
        items: [
          "Power can fail at any byte — the device must still boot something.",
          "Only signed images execute, ever.",
          "A new image must prove itself or be rolled back automatically.",
        ],
      },
      { kind: "heading", id: "dual-bank", text: "Dual-bank flashing" },
      {
        kind: "code",
        language: "text",
        code: "+------------+------------------+------------------+\n| bootloader |  bank A (active) |  bank B (target)  |\n+------------+------------------+------------------+\n              boot flag decides; trial boots are\n              watchdog-guarded and revert on failure",
      },
      {
        kind: "callout",
        title: "The bootloader is frozen",
        text: "Everything above the bootloader can be replaced remotely. The bootloader itself cannot — so it stays tiny, boring, and reviewed line by line.",
      },
      {
        kind: "heading",
        id: "health-checks",
        text: "Health checks decide, not hope",
      },
      {
        kind: "paragraph",
        text: "A trial boot has a fixed window to confirm: peripherals up, link established, application heartbeat. Miss the window and the bootloader falls back to the previous bank. Rollback is the feature; the update is just the transport.",
      },
    ],
  },
  {
    slug: "schematic-to-field-testing",
    title: "From Schematic to Field Testing",
    summary:
      "The path a hardware product actually takes — and the review gates that catch problems while they are still cheap.",
    topic: "Hardware",
    date: "2026-02-02",
    readingTime: "8 min read",
    cover: "/images/blog/schematic-to-field.svg",
    featured: false,
    sections: [
      {
        kind: "paragraph",
        text: "Every board that reaches the field passes through the same gates: schematic review, layout review, bring-up, validation, and field trial. Skipping one does not save time; it moves the cost downstream and multiplies it. [Placeholder body — replace with your own writing.]",
      },
      {
        kind: "heading",
        id: "bring-up",
        text: "Bring-up is a checklist, not a vibe",
      },
      {
        kind: "list",
        items: [
          "Power rails first, unpopulated loads, current-limited supply.",
          "Clocks and reset behaviour before any firmware.",
          "One peripheral at a time, with the scope attached.",
        ],
      },
      {
        kind: "figure",
        src: "/images/blog/schematic-to-field.svg",
        alt: "Placeholder diagram of hardware development stages from schematic to field",
        caption:
          "The gates between a schematic and a fielded product. (Placeholder figure)",
      },
      {
        kind: "heading",
        id: "field-trials",
        text: "What field trials are actually for",
      },
      {
        kind: "paragraph",
        text: "The bench proves the design works. The field proves the design works when it is hot, vibrating, poorly powered, and operated by someone who never read the manual. Both proofs are required.",
      },
    ],
  },
  {
    slug: "iot-unreliable-networks",
    title: "Designing IoT Devices for Unreliable Networks",
    summary:
      "Store-and-forward queues, idempotent uplinks, and backoff strategies for devices that must assume the link is down.",
    topic: "IoT",
    date: "2025-12-15",
    readingTime: "10 min read",
    cover: "/images/blog/iot-unreliable-networks.svg",
    featured: false,
    sections: [
      {
        kind: "paragraph",
        text: "Demo devices live on office Wi-Fi. Real devices live in basements, moving vehicles, and countries with patchy coverage. Design for the second group and the first takes care of itself. [Placeholder body — replace with your own writing.]",
      },
      {
        kind: "heading",
        id: "assume-offline",
        text: "Offline is the default state",
      },
      {
        kind: "paragraph",
        text: "Invert the mental model: the device is offline, and connectivity is a temporary gift. Every reading goes into a persistent queue first; the uplink drains the queue when the gift arrives.",
      },
      { kind: "heading", id: "idempotency", text: "Idempotent uplinks" },
      {
        kind: "callout",
        title: "Deduplicate at the server",
        text: "A device that cannot know whether its last message arrived must be free to send it again. Sequence numbers plus server-side deduplication make retries harmless.",
      },
      {
        kind: "list",
        items: [
          "Exponential backoff with jitter — a fleet reconnecting in sync is a DDoS you built yourself.",
          "Cap the queue by policy: drop oldest, or summarise, but decide deliberately.",
          "Timestamp at capture, not at transmission.",
        ],
      },
    ],
  },
  {
    slug: "wiring-diagrams-lessons",
    title: "What Vehicle Wiring Diagrams Can Teach an Embedded Engineer",
    summary:
      "Automotive wiring documentation is a masterclass in communicating complex systems — worth stealing from for firmware docs.",
    topic: "Engineering Notes",
    date: "2025-11-03",
    readingTime: "6 min read",
    cover: "/images/blog/wiring-diagrams.svg",
    featured: false,
    sections: [
      {
        kind: "paragraph",
        text: "A vehicle wiring diagram documents thousands of connections across dozens of subsystems, maintained over decades, readable by a technician under time pressure. Firmware documentation should be so lucky. [Placeholder body — replace with your own writing.]",
      },
      {
        kind: "heading",
        id: "conventions",
        text: "Conventions carry the load",
      },
      {
        kind: "list",
        items: [
          "Consistent wire colour codes — the same signal looks the same everywhere.",
          "Connector pinouts documented once, referenced everywhere.",
          "Grid references so 'where does this go' is a lookup, not a search.",
        ],
      },
      {
        kind: "heading",
        id: "for-firmware",
        text: "Stealing the ideas for firmware",
      },
      {
        kind: "paragraph",
        text: "The firmware equivalents are naming conventions that never break, interface contracts documented at the boundary, and diagrams that show data flow the way a harness drawing shows current flow. Documentation is part of the product.",
      },
    ],
  },
];

export const featuredArticle: Article =
  articles.find((a) => a.featured) ?? articles[0];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function adjacentArticles(slug: string): {
  previous: Article | null;
  next: Article | null;
} {
  const index = articles.findIndex((a) => a.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? articles[index - 1] : null,
    next: index < articles.length - 1 ? articles[index + 1] : null,
  };
}
