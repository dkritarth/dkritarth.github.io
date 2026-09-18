import React from 'react';
import { Github, Instagram, Linkedin, Mail, ArrowRight, ExternalLink, Twitter, Stethoscope, Atom, BarChart3 } from 'lucide-react';
import { CONTACT_INFO, NAV_LINKS } from '../constants';
import { CvDownloadLink } from './CvDownloadLink';
import { AppLink } from './AppLink';

const PORTRAIT = '/data/my-photo.jpg';

const RESEARCH_DOMAINS = [
  {
    icon: <Stethoscope size={18} aria-hidden />,
    title: 'Healthcare AI',
    description: 'Geriatric oral screening · stroke rehab · orthodontic remote monitoring',
    detail: 'OralScan, OrthoScan, mRehab',
  },
  {
    icon: <Atom size={18} aria-hidden />,
    title: 'Materials ML',
    description: 'Symmetry-aware GNNs · equivariant MLIPs · universal atom models',
    detail: 'Peng Research Lab, UB',
  },
  {
    icon: <BarChart3 size={18} aria-hidden />,
    title: 'Spatiotemporal ML',
    description: 'Deep learning-based weather forecasting · AI adversarial robustness',
    detail: 'MSU Data Mining Laboratory (PhD)',
  },
];

export const Hero: React.FC = () => {
  return (
    <section className="relative flex items-center pt-28 sm:pt-32 pb-16 overflow-hidden border-b border-ink-200/80 bg-ink-50">
      {/* Banner blurred background texture */}
      <div
        className="hidden"
        style={{
          backgroundImage: "url('/data/DK banner.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(12px)',
          opacity: 0.07,
          transform: 'scale(1.05)',
        }}
      />
      <div className="hidden" />

      <div className="max-w-6xl mx-auto px-6 md:px-10 w-full relative z-10 grid md:grid-cols-[1fr_minmax(260px,340px)] gap-12 lg:gap-16 items-center">
        <div className="space-y-8">
          <header className="space-y-3">
            <p className="text-sm font-semibold tracking-wide text-ink-700 uppercase">
              AI research · Michigan State University
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-semibold text-ink-900 leading-[1.15] tracking-tight">
              {CONTACT_INFO.name}
            </h1>
            <p className="text-lg md:text-xl text-ink-700 font-sans font-normal max-w-xl">
              {CONTACT_INFO.title}
            </p>
          </header>

          <p className="text-base md:text-[1.05rem] text-ink-800 leading-relaxed max-w-2xl border-l-[3px] border-ink-900 pl-5">
            {CONTACT_INFO.landingLead}
          </p>

          {/* Research domain cards */}
          <div className="grid sm:grid-cols-3 gap-3 max-w-2xl">
            {RESEARCH_DOMAINS.map((domain) => (
              <AppLink
                key={domain.title}
                href="/research/"
                className="group rounded-lg border border-ink-100 bg-white px-4 py-3.5 text-left shadow-sm hover:shadow-md hover:border-ink-200 focus:outline-none focus:ring-2 focus:ring-ink-400 focus:ring-offset-2 transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-2 text-ink-700 group-hover:text-ink-900 transition-colors">
                  {domain.icon}
                  <span className="text-xs font-semibold uppercase tracking-wide">{domain.title}</span>
                </div>
                <p className="text-[12px] leading-snug text-ink-700 mb-2">{domain.description}</p>
                <p className="text-[11px] text-ink-500 leading-snug font-medium">{domain.detail}</p>
              </AppLink>
            ))}
          </div>

          <div className="max-w-2xl rounded-lg border border-ink-100 bg-white px-5 py-4 text-[15px] leading-relaxed text-ink-800 shadow-sm hover:shadow-md hover:border-ink-200 transition-all duration-200">
            <p className="font-semibold text-ink-900">Inference Foundry</p>
            <p className="mt-2 text-ink-700">
              {CONTACT_INFO.inferenceFoundry.startLabel}. {CONTACT_INFO.inferenceFoundry.description}
            </p>
            <a
              href={CONTACT_INFO.inferenceFoundry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ink-900 underline underline-offset-2 hover:text-ink-700 hover:no-underline focus:outline-none focus:ring-2 focus:ring-ink-400 focus:ring-offset-2 rounded transition-all"
            >
              inference-foundry.rweb.site <ExternalLink size={14} className="opacity-70" aria-hidden />
            </a>
          </div>

          <div className="flex flex-wrap gap-3">
            <AppLink
              href="/research/"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-ink-900 text-white text-sm font-semibold tracking-wide rounded-lg hover:bg-ink-800 focus:outline-none focus:ring-2 focus:ring-ink-400 focus:ring-offset-2 transition-all duration-200"
            >
              Explore research <ArrowRight size={16} className="opacity-90" aria-hidden />
            </AppLink>
            <CvDownloadLink variant="hero" />
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-ink-900 border border-ink-200 rounded-lg hover:bg-ink-50 focus:outline-none focus:ring-2 focus:ring-ink-400 focus:ring-offset-2 transition-all duration-200"
            >
              Get in touch
            </a>
          </div>

          <nav aria-label="Site sections" className="pt-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500 mb-2">More</p>
            <ul className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} className="inline-flex items-center">
                  {i > 0 && <span className="text-ink-300 pr-2 select-none" aria-hidden>·</span>}
                  <AppLink
                    href={link.href}
                    className="text-ink-800 font-medium underline underline-offset-2 hover:text-ink-900 hover:underline-offset-4 focus:outline-none focus:ring-2 focus:ring-ink-400 focus:ring-offset-2 rounded transition-all"
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

        <figure className="relative hidden md:block mx-auto w-full max-w-sm">
          <div className="aspect-[4/5] relative border border-ink-200 bg-ink-100 shadow-md hover:shadow-lg rounded-lg overflow-hidden transition-shadow duration-200">
            <img
              src={PORTRAIT}
              alt={`${CONTACT_INFO.name}, portrait`}
              className="w-full h-full object-cover grayscale-[15%]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/90 via-ink-900/50 to-transparent px-5 pt-16 pb-5 text-left">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/80 mb-1">
                Research areas
              </p>
              <p className="text-sm text-white leading-snug font-sans">
                Spatiotemporal ML · DLWF · AI robustness · Computer vision · Materials ML
              </p>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
};
