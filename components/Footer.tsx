import React from 'react';
import { CONTACT_INFO } from '../constants';
import { getSiteUrls } from '../siteUrls';
import { Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const site = getSiteUrls();
  return (
    <footer className="bg-ink-900 text-stone-300 py-14 border-t border-ink-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 text-left">
          <div>
            <p className="font-serif text-xl font-semibold text-white">{CONTACT_INFO.name}</p>
            <p className="mt-1 text-stone-400 text-sm max-w-md">{CONTACT_INFO.title}</p>
          </div>
          <div className="space-y-3 text-sm">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center gap-2 text-stone-200 hover:text-white transition-colors"
            >
              <Mail size={16} className="shrink-0 opacity-80" aria-hidden />
              {CONTACT_INFO.email}
            </a>
            <div className="flex items-center gap-2 text-stone-400">
              <MapPin size={16} className="shrink-0 opacity-80" aria-hidden />
              {CONTACT_INFO.location}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-700/80 text-xs text-stone-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p>
            &copy; {new Date().getFullYear()} {CONTACT_INFO.name}
          </p>
          <p>
            <a href={site.hub} className="text-stone-400 hover:text-stone-200 transition-colors">
              Hub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
