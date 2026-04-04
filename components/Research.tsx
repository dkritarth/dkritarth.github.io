import React from 'react';
import { Section } from './Section';
import { RESEARCH_EXPERIENCE, PUBLICATIONS, PRESENTATIONS } from '../constants';
import { FileText, ArrowUpRight, Mic2 } from 'lucide-react';

const BOLD_TERMS = ['OralScan', 'YOLOv8', 'GNNs', 'ALIGNN', 'mRehab', 'wandb'];

function formatBoldTerms(s: string): React.ReactNode[] {
  if (!s) return [];
  const escaped = BOLD_TERMS.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const re = new RegExp(`(${escaped})`, 'g');
  return s.split(re).map((part, i) =>
    BOLD_TERMS.includes(part) ? (
      <strong key={i} className="text-slate-900">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function formatBullet(text: string): React.ReactNode {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let linkIdx = 0;
  const re = /(https?:\/\/[^\s]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const before = text.slice(last, m.index);
    nodes.push(...formatBoldTerms(before));
    const href = m[1];
    linkIdx += 1;
    nodes.push(
      <a
        key={`link-${linkIdx}-${m.index}`}
        href={href}
        className="text-sky-600 hover:underline break-all"
        target="_blank"
        rel="noopener noreferrer"
      >
        {href}
      </a>
    );
    last = m.index + m[0].length;
  }
  nodes.push(...formatBoldTerms(text.slice(last)));
  return <>{nodes}</>;
}

export const Research: React.FC = () => {
  return (
    <Section id="research" title="Research Experience" subtitle="Deep dives into Healthcare AI and Material Science.">
      
      <div className="space-y-12">
        {RESEARCH_EXPERIENCE.map((exp, index) => (
          <div key={index} className="group relative bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
             {/* Timeline connector for larger screens */}
             <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-500 to-transparent -ml-8 rounded-full opacity-20"></div>
            
            <div className="flex flex-col md:flex-row gap-6 justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{exp.role}</h3>
                <p className="text-sky-700 font-medium text-lg">{exp.organization}</p>
              </div>
              <div className="text-slate-500 font-mono text-sm whitespace-nowrap bg-slate-50 px-3 py-1 rounded-full self-start md:self-center border border-slate-100">
                {exp.period}
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {exp.description.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-2 w-1.5 h-1.5 bg-sky-500 rounded-full shrink-0"></span>
                  <span className="leading-relaxed">{formatBullet(item)}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
              {exp.technologies?.map(tech => (
                <span key={tech} className="px-3 py-1 bg-sky-50 text-sky-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mt-16">
        {/* Publications */}
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <FileText className="text-sky-600" /> Publications & Preprints
          </h3>
          <div className="space-y-4">
            {PUBLICATIONS.map((pub, index) => (
              <div key={index} className="flex flex-col gap-3 p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-sky-200 transition-colors">
                <div>
                  <h4 className="text-base font-semibold text-slate-900 mb-1 leading-snug">
                    {pub.title}
                  </h4>
                  <p className="text-slate-600 text-sm mb-2 italic">{pub.authors}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded">{pub.venue}</span>
                    <span className="text-slate-500 border-l pl-2 border-slate-300">{pub.year}</span>
                  </div>
                  {pub.status && (
                     <div className="mt-2 inline-block text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                       {pub.status}
                     </div>
                  )}
                </div>
                {pub.link && (
                  <a 
                    href={pub.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="self-start text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1 uppercase tracking-wide"
                  >
                    View Paper <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Presentations */}
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Mic2 className="text-sky-600" /> Research Presentations
          </h3>
          <div className="space-y-4">
            {PRESENTATIONS.map((pres, index) => (
              <div key={index} className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                 <h4 className="text-base font-semibold text-slate-900">{pres.event}</h4>
                 <div className="mt-2 flex justify-between items-center text-sm text-slate-600">
                    <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded font-medium text-xs">{pres.type}</span>
                    <span className="font-mono text-xs">{pres.date}</span>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </Section>
  );
};