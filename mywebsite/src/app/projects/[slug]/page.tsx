import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { PrevNextNavigation } from "@/components/projects/project-navigation";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { adjacentProjects, getProject, projects } from "@/data/projects";
import { createMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return createMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.image,
  });
}

function DetailSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="border-t border-border pt-8">
      <h2 id={id} className="type-label mb-4 text-foreground-muted">
        {title}
      </h2>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex list-none flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-foreground-muted">
          <span
            aria-hidden="true"
            className="mt-2.5 h-px w-4 shrink-0 bg-accent"
          />
          <span className="text-[0.9375rem]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectDetailPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const { previous, next } = adjacentProjects(project.slug);

  return (
    <Container className="py-16 md:py-24">
      <Link
        href="/projects"
        className="group inline-flex min-h-11 items-center gap-2 text-sm text-foreground-muted transition-colors duration-160 ease-out-strong hover:text-accent"
      >
        <ArrowLeft
          aria-hidden="true"
          className="size-4 transition-transform duration-160 ease-out-strong group-hover:-translate-x-0.5"
        />
        All projects
      </Link>

      <header className="mt-6 max-w-3xl">
        <p className="type-meta flex flex-wrap items-center gap-3 text-foreground-muted">
          <span className="text-accent">{project.number}</span>
          <span>{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
          <Badge tone="accent">{project.status}</Badge>
        </p>
        <h1 className="type-page-title mt-4">{project.title}</h1>
        <p className="mt-5 text-foreground-muted md:text-lg">
          {project.summary}
        </p>
      </header>

      <div className="relative mt-10 aspect-video overflow-hidden rounded-sm border border-border md:mt-14">
        <Image
          src={project.image}
          alt={`Placeholder hero artwork for ${project.title}`}
          fill
          priority
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,5fr)] lg:gap-16">
        {/* Fact sheet — sticky on desktop */}
        <aside className="h-fit lg:sticky lg:top-24">
          <dl className="flex flex-col gap-5 rounded-sm border border-border bg-surface p-6">
            <div>
              <dt className="type-label text-foreground-muted">Role</dt>
              <dd className="mt-1 text-sm">{project.role}</dd>
            </div>
            {project.duration && (
              <div>
                <dt className="type-label text-foreground-muted">Duration</dt>
                <dd className="mt-1 text-sm">{project.duration}</dd>
              </div>
            )}
            <div>
              <dt className="type-label text-foreground-muted">Status</dt>
              <dd className="mt-1 text-sm">{project.status}</dd>
            </div>
            <div>
              <dt className="type-label text-foreground-muted">Technologies</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <li key={tech}>
                      <Badge>{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="type-label text-foreground-muted">Protocols</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-1.5">
                  {project.protocols.map((protocol) => (
                    <li key={protocol}>
                      <Badge tone="outline">{protocol}</Badge>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </aside>

        {/* Narrative */}
        <div className="flex min-w-0 flex-col gap-10">
          <section aria-label="Overview">
            <p className="max-w-prose text-lg leading-relaxed">
              {project.description}
            </p>
          </section>

          <DetailSection id="context" title="Context">
            <p className="max-w-prose text-foreground-muted">
              {project.context}
            </p>
          </DetailSection>

          <DetailSection id="problem" title="Problem">
            <p className="max-w-prose text-foreground-muted">
              {project.problem}
            </p>
          </DetailSection>

          <DetailSection id="constraints" title="Constraints">
            <BulletList items={project.constraints} />
          </DetailSection>

          <DetailSection id="responsibilities" title="Responsibilities">
            <BulletList items={project.responsibilities} />
          </DetailSection>

          <DetailSection id="hardware" title="Architecture">
            <div className="flex flex-col gap-8">
              <ArchitectureDiagram diagram={project.hardware} />
              <ArchitectureDiagram diagram={project.firmware} />
            </div>
          </DetailSection>

          <DetailSection id="process" title="Process">
            <BulletList items={project.process} />
          </DetailSection>

          <DetailSection id="testing" title="Testing">
            <BulletList items={project.testing} />
          </DetailSection>

          <DetailSection id="challenges" title="Challenges">
            <BulletList items={project.challenges} />
          </DetailSection>

          <DetailSection id="results" title="Results">
            <BulletList items={project.results} />
          </DetailSection>

          <DetailSection id="lessons" title="Lessons learned">
            <BulletList items={project.lessons} />
          </DetailSection>
        </div>
      </div>

      <section
        aria-label="Project gallery"
        className="mt-16 border-t border-border pt-8"
      >
        <h2 className="type-label mb-6 text-foreground-muted">Gallery</h2>
        <ProjectGallery project={project} />
      </section>

      <div className="mt-16">
        <PrevNextNavigation
          ariaLabel="Adjacent projects"
          previous={
            previous
              ? {
                  href: `/projects/${previous.slug}`,
                  label: "Previous project",
                  title: previous.title,
                }
              : null
          }
          next={
            next
              ? {
                  href: `/projects/${next.slug}`,
                  label: "Next project",
                  title: next.title,
                }
              : null
          }
        />
      </div>
    </Container>
  );
}
