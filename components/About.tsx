import React from 'react';
import { Section } from './Section';
import { CONTACT_INFO, SKILLS, AWARDS, CERTIFICATIONS, RESEARCH_INTERESTS } from '../constants';
import { Trophy, Award, ExternalLink } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <Section
      id="about"
      title="About"
      subtitle="Background, research interests, honors, and technical background."
    >
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-6 text-ink-800 leading-relaxed">
          <blockquote className="text-lg font-serif italic text-ink-700 border-l-[3px] border-ink-900 pl-5 py-1 bg-ink-100/50">
            {CONTACT_INFO.sopSnippet}
          </blockquote>
          <p>
            My undergraduate research at the University at Buffalo has built a strong foundation in AI, but I am driven
            to move beyond applying known techniques to creating original, high-impact research. A doctoral program is
            the next essential step to strengthen my technical expertise and develop the independent research skills
            required to contribute meaningfully to the fields of AI and computational science.
          </p>
          <p>
            I have managed an accelerated academic path, on track to graduate in three years while taking 21–22 credit
            semesters. During this time, I have maintained academic excellence (3.8+ GPA) while working in two research
            labs, TAing computer architecture, and tutoring statistics. This schedule has reinforced endurance and focus
            for doctoral study.
          </p>

          <div className="rounded-sm border border-ink-200 bg-ink-50/80 p-5">
            <h3 className="text-base font-semibold text-ink-900 mb-2 font-sans">Inference Foundry</h3>
            <p className="text-sm text-ink-700 mb-2">
              <span className="font-medium text-ink-900">{CONTACT_INFO.inferenceFoundry.startLabel}.</span>{' '}
              {CONTACT_INFO.inferenceFoundry.description}
            </p>
            <a
              href={CONTACT_INFO.inferenceFoundry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-ink-900 underline underline-offset-2 hover:no-underline"
            >
              GitHub organization <ExternalLink size={14} aria-hidden />
            </a>
          </div>

          <div className="mt-8">
            <h3 className="text-base font-semibold text-ink-900 mb-3 font-sans">Research interests</h3>
            <ul className="flex flex-wrap gap-2">
              {RESEARCH_INTERESTS.map((interest) => (
                <li
                  key={interest}
                  className="px-3 py-1.5 bg-white border border-ink-200 text-sm text-ink-800 rounded-sm"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-base font-semibold text-ink-900 mb-4 flex items-center gap-2 font-sans">
              <Trophy className="text-amber-800" size={18} aria-hidden />
              Honors &amp; awards
            </h3>
            <div className="grid gap-2">
              {AWARDS.map((award, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-white border border-ink-100 rounded-sm">
                  <span className="w-1.5 h-1.5 bg-ink-800 rounded-full shrink-0 mt-2" aria-hidden />
                  <span className="text-sm text-ink-800">{award}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-base font-semibold text-ink-900 mb-4 flex items-center gap-2 font-sans">
              <Award className="text-ink-700" size={18} aria-hidden />
              Certifications
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-ink-50 border border-ink-100 rounded-sm text-xs text-ink-800 leading-snug"
                >
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-sm border border-ink-200 sticky top-24 shadow-sm">
            <h3 className="text-base font-semibold text-ink-900 mb-5 font-sans border-b border-ink-100 pb-3">
              Skills &amp; tools
            </h3>
            <div className="space-y-5">
              {SKILLS.map((cat) => (
                <div key={cat.category}>
                  <h4 className="text-[11px] font-semibold text-ink-500 uppercase tracking-wide mb-2">{cat.category}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-ink-50 text-ink-800 text-xs rounded-sm border border-ink-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
