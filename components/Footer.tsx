import React from 'react';
import { CONTACT_INFO } from '../constants';
import { getSiteUrls } from '../siteUrls';
import { Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const site = getSiteUrls();
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-serif font-bold text-white mb-6">Ready to Collaborate?</h2>
        <p className="max-w-2xl mx-auto mb-10 text-slate-400">
          Incoming PhD student at Michigan State University (Fall 2026). Open to collaborations in AI, computer vision,
          and computational science.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
          <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-3 text-white hover:text-sky-400 transition-colors">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
              <Mail size={18} />
            </div>
            <span className="text-lg font-medium">{CONTACT_INFO.email}</span>
          </a>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
              <MapPin size={18} />
            </div>
            <span className="text-lg font-medium">{CONTACT_INFO.location}</span>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} {CONTACT_INFO.name}. All rights reserved.</p>
          <p className="mt-2">
            <a href={site.hub} className="text-slate-400 hover:text-sky-400 transition-colors">
              Hub
            </a>
          </p>
          <p className="mt-2">Built with React & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
};