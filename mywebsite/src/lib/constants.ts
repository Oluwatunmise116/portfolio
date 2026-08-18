/**
 * Site-wide constants.
 *
 * TODO: set NEXT_PUBLIC_SITE_URL in .env to the production domain before
 * deploying — canonical URLs, Open Graph URLs, the sitemap and robots.txt
 * are all derived from it. The localhost fallback is intentional: it keeps
 * development working without publishing a placeholder domain.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_NAME = "Oluwatunmise John Olabanji";

export const SITE_TITLE_SUFFIX =
  "Oluwatunmise John Olabanji | Embedded Systems Engineer";

export const SITE_DESCRIPTION =
  "Embedded Systems Engineer specializing in automotive embedded systems, vehicle diagnostics, firmware, PCB development, IoT, CAN/OBD-II, connected devices, and hardware integration.";
