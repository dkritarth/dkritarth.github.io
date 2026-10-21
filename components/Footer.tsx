import React from 'react';
import { CONTACT_INFO } from '../constants';
import { GraduationCap, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-deep text-stone-300 py-14 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 text-left">
          <div>
            <p className="font-serif text-xl font-semibold text-white">{CONTACT_INFO.name}</p>
            <p className="mt-1 text-stone-400 text-[16px] max-w-md">{CONTACT_INFO.title}</p>
          </div>
          <div className="space-y-3 text-[16px]">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center gap-2 text-stone-200 hover:text-white transition-colors"
            >
              <Mail size={16} className="shrink-0 opacity-80" aria-hidden />
              {CONTACT_INFO.email}
            </a>
            {CONTACT_INFO.workEmails.map((workEmail) => (
              <a
                key={workEmail}
                href={`mailto:${workEmail}`}
                className="flex items-center gap-2 pl-6 text-stone-400 hover:text-white transition-colors"
              >
                {workEmail}
              </a>
            ))}
            <a
              id="cy-effective-orcid-url"
              href={CONTACT_INFO.orcid}
              target="orcid.widget"
              rel="me noopener noreferrer"
              className="flex items-center gap-2 text-stone-200 hover:text-white underline underline-offset-4 decoration-stone-500 transition-colors"
            >
              <img
                src="https://orcid.org/sites/default/files/images/orcid_16x16.png"
                alt="ORCID iD icon"
                width={16}
                height={16}
                className="shrink-0"
              />
              {CONTACT_INFO.orcid}
            </a>
            <a
              href={CONTACT_INFO.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-stone-200 hover:text-white transition-colors"
            >
              <GraduationCap size={16} className="shrink-0 opacity-80" aria-hidden />
              Google Scholar
            </a>
            <div className="flex items-center gap-2 text-stone-400">
              <MapPin size={16} className="shrink-0 opacity-80" aria-hidden />
              {CONTACT_INFO.location}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-700/80 text-[14px] text-stone-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p>
            &copy; {new Date().getFullYear()} {CONTACT_INFO.name}
          </p>
          <p>
            Last updated{' '}
            {new Date(__LAST_UPDATED__).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
    </footer>
  );
};
