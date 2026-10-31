import React, { useMemo, useState } from 'react';
import { Section } from './Section';
import { PROJECTS, COMPETITIONS } from '../constants';
import type { Project } from '../types';
import { ImageLightbox } from './ImageLightbox';
import { Calendar, ExternalLink, FolderGit2, Github, Medal, ZoomIn } from 'lucide-react';

type Era = {
  key: string;
  heading: string;
  matches: (project: Project) => boolean;
};

/** Eras are derived from `startDate`, so new projects land in the right group automatically. */
const ERAS: Era[] = [
  {
    key: 'current',
    heading: '2026 — Current work',
    matches: (project) => Number(project.startDate.slice(0, 4)) >= 2026,
  },
  {
    key: 'earlier',
    heading: '2024–2025 — Earlier coursework & projects',
    matches: (project) => Number(project.startDate.slice(0, 4)) < 2026,
  },
];

function byStartDateDesc(a: Project, b: Project): number {
  if (a.startDate !== b.startDate) return a.startDate < b.startDate ? 1 : -1;
  return a.title.localeCompare(b.title);
}

/** Two-letter mark for the no-image placeholder, e.g. "Marine Guardian: …" → "MG". */
function titleInitials(title: string): string {
  const base = title.split(':')[0] ?? title;
  const words = base.split(/\s+/).filter(Boolean);
  const letters = words.slice(0, 2).map((word) => word[0]?.toUpperCase() ?? '');
  return letters.join('') || base.slice(0, 2).toUpperCase();
}

function isGithubLink(href: string, label: string): boolean {
  return /github\.com/i.test(href) || /github/i.test(label);
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = project.images ?? [];
  const heroImage = images[0];
  const hasImages = images.length > 0;

  return (
    <article className="overflow-hidden rounded-xl border border-ink-200 bg-surface shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="grid gap-6 p-5 md:grid-cols-5 md:gap-8 md:p-6">
        {/* Media column (~40%) */}
        <div className="md:col-span-2">
          {heroImage ? (
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg border border-ink-200 bg-ink-50 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-900"
              aria-label={`View larger: ${heroImage.alt}`}
            >
              <img
                src={heroImage.src}
                referrerPolicy="no-referrer"
                alt={heroImage.alt}
                loading="lazy"
                decoding="async"
                className="aspect-video w-full object-contain object-center transition duration-200 group-hover:brightness-[0.97]"
              />
              <span
                className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-[13px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:opacity-90"
                aria-hidden
              >
                <ZoomIn size={12} />
                {images.length > 1 ? `${images.length} images` : 'Enlarge'}
              </span>
            </button>
          ) : (
            <div
              className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-ink-200 bg-ink-50 px-4 text-center"
              aria-hidden
            >
              <FolderGit2 className="text-ink-500" size={26} />
              <span className="font-serif text-2xl font-semibold tracking-wide text-ink-700">
                {titleInitials(project.title)}
              </span>
              <span className="text-[13px] font-medium uppercase tracking-wider text-ink-500">
                {project.category}
              </span>
            </div>
          )}
        </div>

        {/* Content column */}
        <div className="flex min-w-0 flex-col md:col-span-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink-900">
              <Calendar className="shrink-0 text-ink-600" size={16} aria-hidden />
              {project.period}
            </span>
            {project.stats && (
              <span className="inline-flex items-center rounded-lg border border-ink-200 bg-ink-50 px-3 py-1 text-[13px] font-medium text-ink-700">
                {project.stats}
              </span>
            )}
          </div>

          <h3 className="mt-3 text-xl font-serif font-semibold leading-snug text-ink-900 md:text-2xl">
            {project.title}
          </h3>
          <p className="mt-2 text-[13px] font-medium uppercase tracking-wider text-ink-600">{project.category}</p>

          <div className="mt-4 space-y-3">
            {project.description.map((desc, i) => (
              <p key={i} className="text-[16px] leading-relaxed text-ink-800">
                {desc}
              </p>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-ink-150 bg-ink-50 px-2.5 py-1 text-[13px] text-ink-700"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.links && project.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.map((link) => {
                const github = isGithubLink(link.href, link.label);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-ink-900 px-4 py-2.5 text-[15px] font-semibold text-ink-50 shadow-sm transition-colors hover:bg-ink-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-900"
                  >
                    {github ? <Github size={17} aria-hidden /> : <ExternalLink size={16} aria-hidden />}
                    {link.label}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {hasImages && (
        <ImageLightbox
          images={images}
          openIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </article>
  );
};

export const Projects: React.FC = () => {
  const groups = useMemo(
    () =>
      ERAS.map((era) => ({
        ...era,
        projects: PROJECTS.filter(era.matches).sort(byStartDateDesc),
      })).filter((group) => group.projects.length > 0),
    [],
  );

  return (
    <Section
      id="projects"
      title="Selected projects"
      subtitle="Open-source and independent work, plus coursework in computer vision and deep learning (distinct from primary lab research)."
      className="bg-ink-50"
    >
      <div className="mb-14 space-y-10">
        {groups.map((group) => (
          <section key={group.key} aria-label={group.heading}>
            <div className="mb-5 flex items-center gap-4">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-ink-600">
                {group.heading}
              </h3>
              <span className="h-px flex-1 bg-ink-200" aria-hidden />
            </div>
            <div className="space-y-6">
              {group.projects.map((project) => (
                <ProjectCard key={project.slug ?? project.title} project={project} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-serif font-semibold text-ink-900 mb-2 flex items-center gap-2">
          <Medal className="text-ink-700 shrink-0" size={20} aria-hidden />
          Competitions &amp; programs
        </h3>
        <p className="text-[16px] text-ink-600 mb-6 max-w-3xl">
          Innovation competitions and accelerators associated with OralScan (see full CV for team details).
        </p>
        <ul className="grid gap-4 md:grid-cols-2">
          {COMPETITIONS.map((comp, idx) => (
            <li
              key={`${comp.name}-${idx}`}
              className="bg-surface p-5 rounded-lg border border-ink-200 flex flex-col gap-3 shadow-sm hover:shadow-md hover:border-ink-200 transition-all duration-200"
            >
              <div>
                <h4 className="font-semibold text-ink-900 text-[16px] leading-snug">{comp.name}</h4>
                <p className="text-[14px] text-ink-600 mt-2">
                  {comp.host ? <span className="font-medium text-ink-700">{comp.host}</span> : null}
                  {comp.host && ' · '}
                  <span className="text-ink-500">{comp.date}</span>
                </p>
              </div>
              <p className="text-ink-800 text-[16px] font-medium">{comp.role}</p>
              {comp.team ? (
                <p className="text-ink-600 text-[14px] leading-relaxed">
                  <span className="font-medium text-ink-700">Team: </span>
                  {comp.team}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};
