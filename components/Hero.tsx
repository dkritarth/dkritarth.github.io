import React from 'react';
import { Github, Instagram, Linkedin, Mail, ArrowRight, ArrowUpRight, Twitter } from 'lucide-react';
import { CONTACT_INFO, NAV_LINKS, RESEARCH_THREADS } from '../constants';
import { CvDownloadLink } from './CvDownloadLink';
import { AppLink } from './AppLink';

const PORTRAIT = '/data/my-photo.jpg';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-28 sm:pt-32 pb-16 border-b border-ink-200/80 bg-ink-50">
      <div className="max-w-6xl mx-auto px-6 md:px-10 w-full space-y-10">
        {/* Intro card: name, lead and portrait */}
        <div className="grid md:grid-cols-[1fr_minmax(220px,300px)] gap-8 md:gap-12 items-center rounded-xl border border-ink-200 p-6 md:p-10">
          <header className="space-y-4">
            <p className="text-[15px] font-medium tracking-wide text-ink-600">
              PhD research · Michigan State University
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink-900 leading-[1.1] tracking-tight">
              {CONTACT_INFO.name}
            </h1>
            <p className="text-lg md:text-xl text-ink-800 font-medium">{CONTACT_INFO.title}</p>
            <p className="text-[17px] text-ink-700 leading-[1.7] max-w-2xl">{CONTACT_INFO.landingLead}</p>
          </header>

          <figure className="hidden md:block w-full">
            <img
              src={PORTRAIT}
              alt={`${CONTACT_INFO.name}, portrait`}
              className="w-full aspect-[4/5] object-cover rounded-xl"
            />
          </figure>
        </div>

        <div className="max-w-3xl space-y-8">
          {/* Current PhD threads: titles and status only */}
          <div className="max-w-2xl space-y-3">
            <p className="text-[14px] font-medium uppercase tracking-wider text-ink-500">Current research</p>
            <ul className="grid sm:grid-cols-3 gap-3">
              {RESEARCH_THREADS.map((thread) => (
                <li key={thread.title}>
                  <AppLink
                    href="/research/"
                    className="group block h-full rounded-lg border border-ink-200 bg-surface px-4 py-3.5 text-left shadow-sm hover:shadow-md hover:border-ink-200 focus:outline-none focus:ring-2 focus:ring-ink-400 focus:ring-offset-2 transition-all duration-200"
                  >
                    <p className="text-[13px] font-medium uppercase tracking-wider text-ink-500 mb-1.5">
                      {thread.status}
                    </p>
                    <p className="text-[16px] font-medium leading-snug text-ink-900">{thread.title}</p>
                  </AppLink>
                </li>
              ))}
            </ul>
            <p className="text-[16px] text-ink-700">
              Supported by the{' '}
              <a
                href={CONTACT_INFO.geoarmor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-accent underline underline-offset-4 decoration-accent/60 hover:no-underline focus:outline-none focus:ring-2 focus:ring-ink-400 focus:ring-offset-2 rounded"
              >
                {CONTACT_INFO.geoarmor.label} <ArrowUpRight size={14} className="opacity-70" aria-hidden />
              </a>
              .
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <AppLink
              href="/research/"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-ink-900 text-ink-50 text-[15px] font-semibold tracking-wide rounded-lg hover:bg-ink-800 focus:outline-none focus:ring-2 focus:ring-ink-400 focus:ring-offset-2 transition-all duration-200"
            >
              Explore research <ArrowRight size={16} className="opacity-90" aria-hidden />
            </AppLink>
            <CvDownloadLink variant="hero" />
            <CvDownloadLink variant="hero" doc="resume" />
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="inline-flex items-center justify-center px-5 py-3 text-[15px] font-semibold text-ink-900 border border-ink-200 rounded-lg hover:bg-ink-50 focus:outline-none focus:ring-2 focus:ring-ink-400 focus:ring-offset-2 transition-all duration-200"
            >
              Get in touch
            </a>
          </div>

          <p className="max-w-2xl text-[16px] text-ink-700">
            Previously (undergraduate): digital health and computational materials at the University at Buffalo.{' '}
            <AppLink
              href="/research/#previous-research"
              className="font-semibold text-accent underline underline-offset-4 decoration-accent/60 hover:no-underline focus:outline-none focus:ring-2 focus:ring-ink-400 focus:ring-offset-2 rounded"
            >
              See previous research →
            </AppLink>
          </p>

          <nav aria-label="Site sections" className="pt-2">
            <p className="text-[14px] font-medium uppercase tracking-wider text-ink-500 mb-2">More</p>
            <ul className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[16px]">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} className="inline-flex items-center">
                  {i > 0 && <span className="text-ink-300 pr-2 select-none" aria-hidden>·</span>}
                  <AppLink
                    href={link.href}
                    className="text-ink-800 font-medium underline underline-offset-4 decoration-accent/60 hover:text-accent hover:underline-offset-4 focus:outline-none focus:ring-2 focus:ring-ink-400 focus:ring-offset-2 rounded transition-all"
                  >
                    {link.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4 pt-4 border-t border-ink-200">
            <a
              href={CONTACT_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-600 hover:text-ink-900 focus:outline-none focus:ring-2 focus:ring-ink-400 focus:ring-offset-2 rounded-lg p-1 transition-all"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href={CONTACT_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-600 hover:text-ink-900 focus:outline-none focus:ring-2 focus:ring-ink-400 focus:ring-offset-2 rounded-lg p-1 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href={CONTACT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-600 hover:text-ink-900 focus:outline-none focus:ring-2 focus:ring-ink-400 focus:ring-offset-2 rounded-lg p-1 transition-all"
              aria-label="Instagram"
            >
              <Instagram size={22} />
            </a>
            <a
              href={CONTACT_INFO.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-600 hover:text-ink-900 focus:outline-none focus:ring-2 focus:ring-ink-400 focus:ring-offset-2 rounded-lg p-1 transition-all"
              aria-label="X / Twitter"
            >
              <Twitter size={22} />
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="text-ink-600 hover:text-ink-900 focus:outline-none focus:ring-2 focus:ring-ink-400 focus:ring-offset-2 rounded-lg p-1 transition-all"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
