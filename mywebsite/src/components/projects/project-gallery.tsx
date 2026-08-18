import Image from "next/image";

import type { Project } from "@/types/project";

export function ProjectGallery({ project }: { project: Project }) {
  const gallery = project.gallery ?? [];
  if (gallery.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {gallery.map((item) => (
        <figure key={item.src}>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border">
            <Image
              src={item.src}
              alt={item.caption}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="type-meta mt-2 text-foreground-muted">
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
