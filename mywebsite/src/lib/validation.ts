import { z } from "zod";

export const contactReasons = [
  "Project collaboration",
  "Embedded systems opportunity",
  "Automotive research",
  "Firmware consultation",
  "Speaking or writing",
  "General enquiry",
] as const;

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

/**
 * Simulated async submission — this site is frontend-only for now.
 *
 * TODO: connect a real backend here. Options:
 *  - A Next.js route handler (src/app/api/contact/route.ts) that relays to
 *    Resend / Nodemailer.
 *  - Formspree: POST to https://formspree.io/f/<form-id>.
 *  - Any serverless function.
 * Keep secrets in server-side env vars — never expose API keys to the client.
 */
export async function submitContactForm(
  values: ContactFormValues,
): Promise<{ ok: true }> {
  // Artificial network delay so loading states are visible during development.
  await new Promise((resolve) => setTimeout(resolve, 900));

  if (process.env.NODE_ENV === "development") {
    console.info("[contact] simulated submission", values);
  }

  return { ok: true };
}
