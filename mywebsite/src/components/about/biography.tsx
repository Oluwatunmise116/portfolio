import { FileDown, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { profile } from "@/data/profile";

/**
 * About opener: oversized editorial statement, portrait, and first-person
 * narrative pulled from src/data/profile.ts.
 */
export function Biography() {
  return (
    <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-20">
      <div>
        <h1 className="type-page-title max-w-3xl">
          {profile.aboutStatement}
        </h1>

        <div className="mt-10 flex max-w-prose flex-col gap-5 text-lg leading-relaxed text-foreground-muted">
          {profile.biography.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-foreground-muted">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-11 items-center gap-2 transition-colors duration-160 ease-out-strong hover:text-accent"
          >
            <Mail aria-hidden="true" className="size-4" />
            {profile.email}
          </a>
          <span className="inline-flex min-h-11 items-center gap-2">
            <MapPin aria-hidden="true" className="size-4" />
            {profile.location} · {profile.timezone}
          </span>
          <Link
            href="/resume"
            className="inline-flex min-h-11 items-center gap-2 underline decoration-border-strong underline-offset-4 transition-colors duration-160 ease-out-strong hover:text-accent hover:decoration-accent"
          >
            <FileDown aria-hidden="true" className="size-4" />
            View résumé
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-sm lg:sticky lg:top-28">
        <div className="relative aspect-4/5 overflow-hidden rounded-[2rem] border border-border bg-surface-muted shadow-card">
          <Image
            src={profile.portrait.src}
            alt={profile.portrait.alt}
            fill
            priority
            sizes="(min-width: 1024px) 24rem, 88vw"
            className="object-cover"
            style={{ objectPosition: profile.portrait.focus }}
          />
        </div>
        <p className="type-meta mt-4 text-foreground-muted">
          {profile.title}
        </p>
        <p className="type-meta mt-1 text-foreground-muted">
          {profile.credentials}
        </p>
      </div>
    </div>
  );
}
