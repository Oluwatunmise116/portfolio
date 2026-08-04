import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social-links";

/** Secondary contact channels shown under the form. */
export function ContactOptions() {
  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: "Email",
      value: (
        <a
          href={`mailto:${profile.email}`}
          className="transition-colors duration-160 ease-out-strong hover:text-accent"
        >
          {profile.email}
        </a>
      ),
    },
    ...socialLinks.map((link) => ({
      label: link.label,
      value: (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-160 ease-out-strong hover:text-accent"
        >
          {link.href.replace("https://", "")}
        </a>
      ),
    })),
    { label: "Location", value: profile.location },
    { label: "Timezone", value: profile.timezone },
    {
      label: "Availability",
      value: (
        <span className="inline-flex items-center gap-2">
          <span className="relative inline-flex size-2 rounded-full bg-success status-dot" />
          {profile.availability.label}
        </span>
      ),
    },
  ];

  return (
    <dl className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border pb-3"
        >
          <dt className="type-label shrink-0 text-foreground-muted">
            {row.label}
          </dt>
          {/* min-w-0 + break-all so a long profile URL wraps instead of
              forcing the page to scroll horizontally on small screens. */}
          <dd className="min-w-0 text-left text-sm break-all sm:text-right">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
