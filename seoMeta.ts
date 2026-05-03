/** Default and per-route copy for document title and meta description (SPA). */
import type { SitePage } from './types';

export const PORTFOLIO_ORIGIN = 'https://kritarth-dandapat.github.io';

const HOME_TITLE = 'Kritarth Dandapat · Research Assistant · University at Buffalo';
const HOME_DESC =
  'Kritarth Dandapat — Research Assistant at the University at Buffalo; BS in Computer Science in progress. Incoming PhD in Computer Science at Michigan State University (Fall 2026). AI, computer vision, healthcare AI, and materials ML.';

const SEO: Record<SitePage, { title: string; description: string }> = {
  home: {
    title: HOME_TITLE,
    description: HOME_DESC,
  },
  about: {
    title: `About · ${HOME_TITLE}`,
    description:
      'Background, research interests, honors, certifications, and technical skills — Kritarth Dandapat, Research Assistant at UB; BS in progress; incoming PhD at MSU (Fall 2026).',
  },
  research: {
    title: `Research · ${HOME_TITLE}`,
    description:
      'Research experience in healthcare AI (OralScan), materials ML with symmetry-aware GNNs, publications, preprints, and presentations.',
  },
  projects: {
    title: `Projects · ${HOME_TITLE}`,
    description:
      'Selected coursework and independent projects in computer vision and deep learning; competitions and challenges.',
  },
  education: {
    title: `Education & experience · ${HOME_TITLE}`,
    description:
      'BS in Computer Science at UB (in progress); upcoming PhD at MSU; teaching assistantship, tutoring, and related roles.',
  },
  notes: {
    title: `Research notes · ${HOME_TITLE}`,
    description:
      'Short notes on trajectory, OralScan, and materials ML workflows — Kritarth Dandapat.',
  },
};

export function applyPageSeo(page: SitePage): void {
  const { title, description } = SEO[page];
  document.title = title;

  ensureMetaName('description').setAttribute('content', description);
  ensureMetaProperty('og:title').setAttribute('content', title);
  ensureMetaProperty('og:description').setAttribute('content', description);
  ensureMetaProperty('og:url').setAttribute('content', `${PORTFOLIO_ORIGIN}/`);
  ensureMetaName('twitter:title').setAttribute('content', title);
  ensureMetaName('twitter:description').setAttribute('content', description);
}

function ensureMetaName(name: string): HTMLMetaElement {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  return el;
}

function ensureMetaProperty(property: string): HTMLMetaElement {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  return el;
}
