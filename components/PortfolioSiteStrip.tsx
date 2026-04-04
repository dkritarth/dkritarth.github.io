import React from 'react';
import { getSiteUrls } from '../siteUrls';

type PortfolioSiteStripProps = {
  /** Include hash links for PS / SOP (portfolio host only). */
  showWritingLinks?: boolean;
};

/**
 * Top-of-viewport strip: makes it obvious you are on the portfolio site
 * and groups “other sites” separately from in-page nav below.
 */
export const PortfolioSiteStrip: React.FC<PortfolioSiteStripProps> = ({ showWritingLinks = true }) => {
  const site = getSiteUrls();
  return (
    <div className="bg-slate-900 text-slate-300 text-xs border-b border-black/20">
      <div className="max-w-7xl mx-auto px-6 py-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p className="m-0 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-sm px-2 py-0.5 bg-sky-500 text-white font-bold tracking-wide text-[11px] uppercase shadow-sm">
            Portfolio
          </span>
          <span className="text-slate-500 hidden sm:inline">CV, research &amp; projects</span>
        </p>
        <nav
          className="flex flex-wrap items-center gap-x-0.5 gap-y-1"
          aria-label="Other sites and long-form writing"
        >
          <span className="text-slate-500 uppercase tracking-wider text-[10px] mr-1 pr-2 border-r border-slate-600 shrink-0">
            Elsewhere
          </span>
          <a
            href={site.hub}
            className="px-2 py-1 rounded hover:bg-slate-800 hover:text-white transition-colors"
          >
            Hub
          </a>
          <span className="text-slate-600 px-0.5" aria-hidden>
            ·
          </span>
          <a
            href={site.notebook}
            className="px-2 py-1 rounded hover:bg-slate-800 hover:text-white transition-colors"
          >
            Notebook
          </a>
          <span className="text-slate-600 px-0.5" aria-hidden>
            ·
          </span>
          <a
            href={`${site.hub}/configs/`}
            className="px-2 py-1 rounded hover:bg-slate-800 hover:text-white transition-colors"
          >
            Configs
          </a>
          {showWritingLinks && (
            <>
              <span className="text-slate-600 px-1 hidden sm:inline" aria-hidden>
                |
              </span>
              <span className="text-slate-500 uppercase tracking-wider text-[10px] mr-1 pl-1 sm:pl-2 border-l border-slate-600 sm:border-l-0 sm:pl-0 sm:ml-1 shrink-0">
                Writing
              </span>
              <a
                href="#/personal-statement"
                className="px-2 py-1 rounded hover:bg-slate-800 hover:text-white transition-colors hidden sm:inline"
              >
                Personal statement
              </a>
              <a
                href="#/personal-statement"
                className="px-2 py-1 rounded hover:bg-slate-800 hover:text-white transition-colors sm:hidden"
              >
                PS
              </a>
              <span className="text-slate-600 px-0.5" aria-hidden>
                ·
              </span>
              <a
                href="#/statement-of-purpose"
                className="px-2 py-1 rounded hover:bg-slate-800 hover:text-white transition-colors hidden sm:inline"
              >
                Statement of purpose
              </a>
              <a
                href="#/statement-of-purpose"
                className="px-2 py-1 rounded hover:bg-slate-800 hover:text-white transition-colors sm:hidden"
              >
                SOP
              </a>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};
