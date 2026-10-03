import React, { useState } from 'react';
import { Section } from './Section';
import { EDUCATION, PROFESSIONAL_EXPERIENCE, RESEARCH_PLACEMENTS, computeDuration, getPlacementRange } from '../constants';
import { GraduationCap, Briefcase, Microscope, Scroll } from 'lucide-react';
import { AppLink } from './AppLink';
import { DiplomaModal } from './DiplomaModal';

export const Timeline: React.FC = () => {
  const [diplomaOpen, setDiplomaOpen] = useState(false);

  return (
    <Section
      id="education"
      title="Education & experience"
      subtitle="Degrees, research positions, teaching and tutoring, and related roles."
      className="bg-ink-50"
    >
      <div className="grid lg:grid-cols-2 gap-14">
        <div>
          <h3 className="text-base font-semibold text-ink-900 mb-6 flex items-center gap-2 border-b border-ink-200 pb-3 font-sans">
            <GraduationCap className="text-ink-700 shrink-0" size={20} aria-hidden />
            Education
          </h3>
          <div className="space-y-8 relative border-l-2 border-ink-200 ml-2 pl-8 pb-2">
            {EDUCATION.map((edu, idx) => {
              const dur = computeDuration(edu.period);
              const isUB = edu.institution.includes('University at Buffalo');
              return (
                <div key={idx} className="relative">
                  <span className="absolute -left-[39px] top-1.5 w-3 h-3 rounded-full bg-surface border-2 border-ink-900" aria-hidden />
                  <h4 className="text-[17px] font-serif font-semibold text-ink-900">{edu.degree}</h4>
                  <p className="text-ink-700 italic text-sm mb-1">{edu.institution}</p>
                  <p className="text-sm text-ink-600 mb-3">
                    {edu.period}{dur ? <span className="text-ink-400"> ({dur})</span> : null} · {edu.location}
                  </p>
                  <ul className="space-y-1.5">
                    {edu.details.map((detail, i) => (
                      <li key={i} className="text-sm text-ink-800 bg-surface p-2.5 rounded-sm border border-ink-100">
                        {detail}
                      </li>
                    ))}
                  </ul>
                  {isUB && (
                    <button
                      type="button"
                      onClick={() => setDiplomaOpen(true)}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 underline underline-offset-2 hover:no-underline"
                    >
                      <Scroll size={14} aria-hidden />
                      View Diploma
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold text-ink-900 mb-6 flex items-center gap-2 border-b border-ink-200 pb-3 font-sans">
            <Briefcase className="text-ink-700 shrink-0" size={20} aria-hidden />
            Teaching &amp; other experience
          </h3>
          <div className="space-y-9 relative border-l-2 border-ink-200 ml-2 pl-8 pb-2">
            {PROFESSIONAL_EXPERIENCE.map((job, idx) => {
              const dur = computeDuration(job.period);
              return (
                <div key={idx} className="relative">
                  <span
                    className="absolute -left-[39px] top-1.5 w-3 h-3 rounded-full bg-surface border-2 border-ink-500"
                    aria-hidden
                  />
                  <h4 className="text-[17px] font-serif font-semibold text-ink-900">{job.role}</h4>
                  <p className="text-ink-800 font-medium text-sm mb-1">{job.organization}</p>
                  <p className="text-sm text-ink-600 mb-3">
                    {job.period}{dur ? <span className="text-ink-400"> ({dur})</span> : null} · {job.location}
                  </p>
                  <ul className="list-disc list-outside ml-4 space-y-1.5 marker:text-ink-400">
                    {job.description.map((desc, i) => (
                      <li key={i} className="text-sm text-ink-800 leading-relaxed">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-14">
        <h3 className="text-base font-semibold text-ink-900 mb-6 flex items-center gap-2 border-b border-ink-200 pb-3 font-sans">
          <Microscope className="text-ink-700 shrink-0" size={20} aria-hidden />
          Research positions
        </h3>
        <ul className="grid gap-4 md:grid-cols-3">
          {RESEARCH_PLACEMENTS.map((placement) => {
            const range = getPlacementRange(placement);
            return (
              <li
                key={`${placement.role}-${placement.organization}`}
                className="bg-surface p-5 rounded-sm border border-ink-100 flex flex-col gap-1.5"
              >
                <h4 className="text-[17px] font-serif font-semibold text-ink-900">{placement.role}</h4>
                <p className="text-sm italic text-ink-700">{placement.organization}</p>
                {range ? <p className="text-xs text-ink-500">{range}</p> : null}
                {placement.overview ? (
                  <p className="text-sm text-ink-800 leading-relaxed">{placement.overview}</p>
                ) : null}
                <AppLink
                  href={placement.previous ? '/research/#previous-research' : '/research/'}
                  className="mt-1 text-sm font-semibold text-ink-900 underline underline-offset-2 hover:no-underline self-start"
                >
                  {placement.previous ? 'See previous research →' : 'See current research →'}
                </AppLink>
              </li>
            );
          })}
        </ul>
      </div>

      <DiplomaModal isOpen={diplomaOpen} onClose={() => setDiplomaOpen(false)} />
    </Section>
  );
};
