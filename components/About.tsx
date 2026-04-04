import React from 'react';
import { Section } from './Section';
import { CONTACT_INFO, SKILLS, AWARDS, CERTIFICATIONS, RESEARCH_INTERESTS } from '../constants';
import { Trophy, Award } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <Section id="about" title="Academic Profile" subtitle="Background, motivation, and technical capabilities.">
      <div className="grid md:grid-cols-3 gap-12">
        
        {/* Main Narrative */}
        <div className="md:col-span-2 space-y-6 text-slate-700 leading-relaxed">
          <p className="text-lg font-serif italic text-slate-600 border-l-4 border-sky-500 pl-4 bg-sky-50/50 py-2 rounded-r-lg">
            "{CONTACT_INFO.sopSnippet}"
          </p>
          <p>
            My undergraduate research at the University at Buffalo has built a strong foundation in AI, but I am driven to move beyond applying known techniques to creating original, high-impact research. A doctoral program is the next essential step to strengthen my technical expertise and develop the independent research skills required to contribute meaningfully to the fields of AI and computational science.
          </p>
          <p>
            I have managed an accelerated academic path, on track to graduate in three years while taking 21–22 credit
            semesters. During this time, I have maintained academic excellence (3.8+ GPA) while working in two research
            labs, TAing computer architecture, and tutoring statistics. This schedule has reinforced endurance and focus
            for doctoral study.
          </p>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-3">Research interests</h3>
            <ul className="flex flex-wrap gap-2">
              {RESEARCH_INTERESTS.map((interest) => (
                <li
                  key={interest}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 shadow-sm"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm text-slate-600 mt-6">
            Long-form writing:{' '}
            <a href="#/personal-statement" className="text-sky-600 font-medium hover:underline">
              personal statement
            </a>
            {' · '}
            <a href="#/statement-of-purpose" className="text-sky-600 font-medium hover:underline">
              statement of purpose
            </a>
            .
          </p>
          
          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Trophy className="text-amber-500" size={20} /> Honors & Awards
            </h3>
            <div className="grid gap-3">
              {AWARDS.map((award, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0 mt-2"></span>
                  <span className="text-sm text-slate-700 font-medium">{award}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Award className="text-sky-600" size={20} /> Certifications & Credentials
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded text-xs font-medium text-slate-700">
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Sidebar */}
        <div className="space-y-8">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-24">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                Technical Arsenal
              </h3>
              <div className="space-y-6">
                {SKILLS.map((cat) => (
                  <div key={cat.category}>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{cat.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md font-medium border border-slate-200">
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