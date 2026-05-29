/** Default and per-route copy for document title and meta description (SPA). */
import type { SitePage } from './types';

export const PORTFOLIO_ORIGIN = 'https://dkritarth.com';

const HOME_TITLE = 'Kritarth Dandapat · AI Researcher · Incoming PhD Student';
const HOME_DESC =
  'Kritarth Dandapat — incoming PhD student (MSU CSE, Data Mining Laboratory) and undergraduate researcher at UB. Spatiotemporal ML, DLWF, AI adversarial robustness, mobile health AI, computer vision, and computational materials science.';

const SEO: Record<SitePage, { title: string; description: string }> = {
  home: {
    title: HOME_TITLE,
    description: HOME_DESC,
  },
  about: {
    title: `About · ${HOME_TITLE}`,
    description:
      'Background, research interests, honors, certifications, and technical skills — Kritarth Dandapat, Research Assistant at UB and incoming MSU CSE PhD student in Dr. Pang-Ning Tan’s Data Mining Laboratory.',
  },
  research: {
    title: `Research · ${HOME_TITLE}`,
    description:
      'Research experience in healthcare AI (OralScan), materials ML with symmetry-aware GNNs, publications, preprints, and presentations.',
  },
  projects: {
    title: `Projects · ${HOME_TITLE}`,
    description:
      'Selected projects: PaddockPsychRL (multi-agent RL), Marine Guardian (satellite ship detection), CSRNet crowd counting, and multi-architecture emotion detection benchmarks.',
  },
  education: {
    title: `Education & experience · ${HOME_TITLE}`,
    description:
      'BS in Computer Science at UB; incoming PhD in Computer Science and Engineering at Michigan State University; teaching assistantship, tutoring, and related roles.',
  },
  news: {
    title: `News · ${HOME_TITLE}`,
    description:
      'Timeline of milestones: UB, research roles, TAship, awards, publications, and incoming MSU PhD — Kritarth Dandapat.',
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
