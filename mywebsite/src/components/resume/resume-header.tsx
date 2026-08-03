import { ResumeDownload } from "@/components/resume/resume-download";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social-links";

export function ResumeHeader() {
  return (
    <header className="border-b border-border pb-10">
      <p className="type-label text-foreground-muted print-hidden">
        <span aria-hidden="true" className="text-accent">
          /resume
        </span>
      </p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="type-page-title">{profile.name}</h1>
          <p className="mt-2 text-lg text-foreground-muted">{profile.title}</p>
        </div>
        <div className="print-hidden">
          <ResumeDownload />
        </div>
      </div>

      <p className="mt-6 max-w-2xl text-foreground-muted">{profile.summary}</p>

      <dl className="type-meta mt-6 flex flex-wrap gap-x-8 gap-y-2 text-foreground-muted">
        <div className="flex gap-2">
          <dt>Location</dt>
          <dd className="text-foreground">{profile.location}</dd>
        </div>
        <div className="flex gap-2">
          <dt>Email</dt>
          <dd>
            <a
              href={`mailto:${profile.email}`}
              className="text-foreground transition-colors duration-160 ease-out-strong hover:text-accent"
            >
              {profile.email}
            </a>
          </dd>
        </div>
        {socialLinks.map((link) => (
          <div key={link.label} className="flex gap-2">
            <dt>{link.label}</dt>
            <dd>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground transition-colors duration-160 ease-out-strong hover:text-accent"
              >
                {link.href.replace("https://", "")}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
