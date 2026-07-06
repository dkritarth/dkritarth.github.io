import React from 'react';
import { Section } from './Section';
import { PROJECTS, COMPETITIONS } from '../constants';
import { ContentImageGrid } from './ContentImageGrid';
import { ExternalLink, FolderGit2, Medal } from 'lucide-react';

export const Projects: React.FC = () => {
  return (
    <Section
      id="projects"
      title="Selected projects"
      subtitle="Coursework and independent work in computer vision and deep learning (distinct from primary lab research)."
      className="bg-white"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        {PROJECTS.map((project, index) => (
          <article
            key={index}
            className="bg-white rounded-lg p-6 border border-ink-100 flex flex-col h-full shadow-sm hover:shadow-md hover:border-ink-200 transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-ink-50 border border-ink-200 text-ink-700 rounded-lg group-hover:bg-ink-100 transition-colors">
                <FolderGit2 size={22} aria-hidden />
              </div>
              {project.stats && (
                <div className="px-3 py-1 bg-ink-50 border border-ink-200 text-ink-700 text-xs font-semibold rounded-lg">
                  {project.stats}
                </div>
              )}
            </div>

            <h3 className="text-lg font-serif font-semibold text-ink-900 mb-2 leading-snug">{project.title}</h3>
            <p className="text-xs font-semibold text-ink-600 uppercase tracking-wide mb-4">{project.category}</p>

            <div className="flex-1 space-y-3 mb-5">
              {project.description.map((desc, i) => (
                <p key={i} className="text-ink-800 text-sm leading-relaxed">
                  {desc}
                </p>
              ))}
            </div>

            <ContentImageGrid images={project.images ?? []} className="mb-5" />

            {project.links && (
              <div className="flex flex-wrap gap-2 mb-5">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-ink-200 bg-white px-3 py-2 text-xs font-semibold text-ink-900 hover:bg-ink-50 hover:border-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-400 focus:ring-offset-2 transition-all"
                  >
                    {link.label}
                    <ExternalLink size={13} aria-hidden />
                  </a>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-ink-100">
              {project.technologies.map((tech) => (
                <span key={tech} className="text-xs text-ink-700 bg-ink-50 px-2.5 py-1 border border-ink-150 rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-serif font-semibold text-ink-900 mb-2 flex items-center gap-2">
          <Medal className="text-ink-700 shrink-0" size={20} aria-hidden />
          Competitions &amp; programs
        </h3>
        <p className="text-sm text-ink-600 mb-6 max-w-3xl">
          Innovation competitions and accelerators associated with OralScan (see full CV for team details).
        </p>
        <ul className="grid gap-4 md:grid-cols-2">
          {COMPETITIONS.map((comp, idx) => (
            <li
              key={`${comp.name}-${idx}`}
              className="bg-white p-5 rounded-lg border border-ink-100 flex flex-col gap-3 shadow-sm hover:shadow-md hover:border-ink-200 transition-all duration-200"
            >
              <div>
                <h4 className="font-semibold text-ink-900 text-[15px] leading-snug">{comp.name}</h4>
                <p className="text-xs text-ink-600 mt-2">
                  {comp.host ? <span className="font-medium text-ink-700">{comp.host}</span> : null}
                  {comp.host && ' · '}
                  <span className="text-ink-500">{comp.date}</span>
                </p>
              </div>
              <p className="text-ink-800 text-sm font-medium">{comp.role}</p>
              {comp.team ? (
                <p className="text-ink-600 text-xs leading-relaxed">
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
