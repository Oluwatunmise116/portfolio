import Link from "next/link";

import { EducationList } from "@/components/resume/education-list";
import { ExperienceList } from "@/components/resume/experience-list";
import { ResumeDownload } from "@/components/resume/resume-download";
import { ResumeHeader } from "@/components/resume/resume-header";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import {
  certifications,
  courses,
  keyProjects,
  memberships,
  volunteering,
} from "@/data/experience";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Resume",
  description:
    "Professional experience, key projects, education, certifications, memberships, and technical skills, with a downloadable PDF.",
  path: "/resume",
});

function SideSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-label={title}>
      <h2 className="type-label mb-4 text-foreground-muted">{title}</h2>
      {children}
    </section>
  );
}

export default function ResumePage() {
  const selected = projects.slice(0, 4);

  return (
    <Container className="pt-32 pb-16 md:pt-40 md:pb-24 print:pt-0">
      <ResumeHeader />

      <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,3fr)] lg:gap-20">
        {/* Main column */}
        <div className="flex min-w-0 flex-col gap-14">
          <section aria-label="Experience">
            <h2 className="type-label mb-6 text-foreground-muted">
              Experience
            </h2>
            <ExperienceList />
          </section>

          <section aria-label="Key projects">
            <h2 className="type-label mb-6 text-foreground-muted">
              Key projects
            </h2>
            <ul className="flex list-none flex-col gap-8">
              {keyProjects.map((project) => (
                <li key={project.title}>
                  <h3 className="type-card-title">{project.title}</h3>
                  <p className="type-meta mt-1 text-accent">
                    {project.stack.join(", ")}
                  </p>
                  <ul className="mt-3 flex list-none flex-col gap-2">
                    {project.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm text-foreground-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-px w-4 shrink-0 bg-accent"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="Personal and academic projects">
            <h2 className="type-label mb-6 text-foreground-muted">
              Personal and academic projects
            </h2>
            <ul className="flex list-none flex-col gap-5">
              {selected.map((project) => (
                <li
                  key={project.slug}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border pb-4"
                >
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="transition-colors duration-160 ease-out-strong hover:text-accent print:no-underline"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <p className="mt-1 max-w-prose text-sm text-foreground-muted">
                      {project.summary}
                    </p>
                  </div>
                  <p className="type-meta text-foreground-muted">
                    {project.year}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="Volunteering and leadership">
            <h2 className="type-label mb-6 text-foreground-muted">
              Volunteering and leadership
            </h2>
            <ul className="flex list-none flex-col gap-8">
              {volunteering.map((entry) => (
                <li key={entry.role + entry.organisation}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="type-card-title">{entry.role}</h3>
                    <p className="type-meta text-accent">{entry.period}</p>
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground-muted">
                    {entry.organisation}
                  </p>
                  <ul className="mt-3 flex list-none flex-col gap-2">
                    {entry.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm text-foreground-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-px w-4 shrink-0 bg-accent"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Side column */}
        <div className="flex flex-col gap-12">
          <div className="print-hidden lg:sticky lg:top-28 lg:z-10 lg:-mt-2 lg:border-b lg:border-border lg:bg-background lg:pb-4">
            <ResumeDownload compact />
          </div>

          <SideSection title="Technical skills">
            <div className="flex flex-col gap-5">
              {skillGroups.map((group) => (
                <div key={group.discipline}>
                  <h3 className="text-sm font-medium">{group.discipline}</h3>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <li key={skill}>
                        <Badge>{skill}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </SideSection>

          <SideSection title="Education">
            <EducationList />
          </SideSection>

          {certifications.length > 0 && (
            <SideSection title="Certifications">
              <ul className="flex list-none flex-col gap-4">
                {certifications.map((cert) => (
                  <li key={cert.name}>
                    <p className="type-meta text-accent">{cert.year}</p>
                    <p className="mt-1 text-sm font-medium">{cert.name}</p>
                    {/* Issuer is omitted rather than guessed when it has
                        not been confirmed on the certificate itself. */}
                    {cert.issuer && (
                      <p className="text-sm text-foreground-muted">
                        {cert.issuer}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </SideSection>
          )}

          {memberships.length > 0 && (
            <SideSection title="Memberships">
              <ul className="flex list-none flex-col gap-3">
                {memberships.map((membership) => (
                  <li key={membership.name}>
                    <p className="type-meta text-accent">{membership.period}</p>
                    <p className="mt-1 text-sm font-medium">
                      {membership.name}
                    </p>
                  </li>
                ))}
              </ul>
            </SideSection>
          )}

          <SideSection title="Courses & workshops">
            <ul className="flex list-none flex-col gap-2">
              {courses.map((course) => (
                <li key={course} className="text-sm text-foreground-muted">
                  {course}
                </li>
              ))}
            </ul>
          </SideSection>
        </div>
      </div>
    </Container>
  );
}
