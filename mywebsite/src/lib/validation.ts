import { z } from "zod";

export const contactReasons = [
  "Embedded firmware project",
  "Automotive diagnostics",
  "CAN or OBD-II research",
  "PCB and hardware design",
  "IoT product development",
  "Firmware architecture / OTA",
  "Engineering opportunity",
  "Technical writing",
  "General enquiry",
] as const;

/**
 * The same reasons, grouped for the dropdown so a nine-item list is
 * scannable instead of one flat run.
 *
 * `contactReasons` above stays the single source of truth for validation —
 * these groups only decide presentation. Every reason must appear exactly
 * once here; the type below enforces that each entry is a real reason, and
 * the contact-form test asserts the two lists cover each other.
 */
export const contactReasonGroups: ReadonlyArray<{
  label: string;
  reasons: ReadonlyArray<(typeof contactReasons)[number]>;
}> = [
  {
    label: "Project work",
    reasons: [
      "Embedded firmware project",
      "Automotive diagnostics",
      "CAN or OBD-II research",
      "PCB and hardware design",
      "IoT product development",
      "Firmware architecture / OTA",
    ],
  },
  {
    label: "Something else",
    reasons: ["Engineering opportunity", "Technical writing", "General enquiry"],
  },
];

export const projectTypes = [
  "Embedded firmware",
  "Automotive / CAN systems",
  "IoT product",
  "Hardware / PCB",
  "Testing & validation",
  "Not sure yet",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name looks too long."),
  email: z.email("Please enter a valid email address."),
  company: z.string().trim().max(120, "Company looks too long.").optional(),
  reason: z.enum(contactReasons, {
    error: "Please choose a reason for contacting.",
  }),
  projectType: z.union([z.enum(projectTypes), z.literal("")]).optional(),
  message: z
    .string()
    .trim()
    .min(20, "Please add a little more detail (at least 20 characters).")
    .max(4000, "Message is too long (4000 characters max)."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

/** How the message actually reached its destination. */
export type ContactDelivery = "sent" | "email-client";

/** Set this to a form endpoint (e.g. Formspree) to enable real delivery. */
const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

/** Destination address for the email-client fallback. */
export const CONTACT_EMAIL = "olabanjitunmise234@gmail.com";

function buildMailto(values: ContactFormValues): string {
  const lines = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    values.company ? `Company: ${values.company}` : null,
    `Reason: ${values.reason}`,
    values.projectType ? `Project type: ${values.projectType}` : null,
    "",
    values.message,
  ].filter(Boolean);

  const subject = `Portfolio enquiry — ${values.reason}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(lines.join("\n"))}`;
}

/**
 * Submits the contact form.
 *
 * There is deliberately NO simulated success path. Until
 * NEXT_PUBLIC_CONTACT_ENDPOINT is configured, nothing on this site can
 * actually deliver a message, so the form hands the composed enquiry to
 * the visitor's own email client and reports `"email-client"` — the UI
 * then tells them exactly what happened. Showing a "message received"
 * confirmation for a message that was never sent would be a lie to the
 * visitor and lose real enquiries.
 *
 * To enable real delivery, set NEXT_PUBLIC_CONTACT_ENDPOINT to a form
 * endpoint (Formspree or similar), or replace the fetch below with a call
 * to a Next.js route handler that relays via Resend/Nodemailer. Keep any
 * API key server-side — never prefix a secret with NEXT_PUBLIC_.
 */
export async function submitContactForm(
  values: ContactFormValues,
): Promise<{ ok: true; delivery: ContactDelivery }> {
  if (CONTACT_ENDPOINT) {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      throw new Error(`Contact endpoint responded ${response.status}`);
    }
    return { ok: true, delivery: "sent" };
  }

  // No backend configured — hand off to the visitor's email client.
  if (typeof window !== "undefined") {
    window.location.href = buildMailto(values);
  }
  return { ok: true, delivery: "email-client" };
}
