import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Footer } from './Footer';
import { PortfolioSiteStrip } from './PortfolioSiteStrip';

type WritingChromeProps = {
  title: string;
  children: React.ReactNode;
};

export const WritingChrome: React.FC<WritingChromeProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="sticky top-0 z-40 flex flex-col shadow-sm">
        <PortfolioSiteStrip showWritingLinks />
        <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md">
          <div className="max-w-3xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-sky-700/90">
                Portfolio · long-form
              </span>
              <a
                href="#/"
                className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 hover:text-sky-900"
              >
                <ArrowLeft size={18} aria-hidden />
                Back to portfolio home
              </a>
            </div>
          </div>
        </header>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-2">{title}</h1>
        <p className="text-sm text-slate-500 mb-10 border-b border-slate-200 pb-8">
          Source: docs in the{' '}
          <a
            href="https://github.com/Kritarth-Dandapat/my-site"
            className="text-sky-600 hover:underline"
          >
            my-site
          </a>{' '}
          repository (LaTeX originals).
        </p>
        <div className="space-y-5 text-slate-700 leading-relaxed [&_a]:text-sky-600 [&_a]:underline [&_a:hover]:text-sky-800 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-12 [&_h2]:mb-4 [&_strong]:text-slate-900">
          {children}
        </div>
      </article>

      <Footer />
    </div>
  );
};
