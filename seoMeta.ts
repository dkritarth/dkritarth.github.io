/** Default and per-route copy for document title and meta description (SPA). */
export const PORTFOLIO_ORIGIN = 'https://portfolio.dkritarth.com';

export const DEFAULT_DESCRIPTION =
  'Kritarth Dandapat — incoming PhD student at Michigan State University (AI & computer vision). Portfolio: research, OralScan, GNNs, publications, CV, personal statement, and statement of purpose.';

export const SEO_BY_PAGE: Record<
  'home' | 'personal-statement' | 'statement-of-purpose',
  { title: string; description: string }
> = {
  home: {
    title: 'Kritarth Dandapat · Portfolio · AI, computer vision & PhD (MSU)',
    description: DEFAULT_DESCRIPTION,
  },
  'personal-statement': {
    title: 'Personal statement · Kritarth Dandapat',
    description:
      'Personal statement for graduate study: accelerated path, research drive, resilience, and goals in AI and computer vision — Kritarth Dandapat.',
  },
  'statement-of-purpose': {
    title: 'Statement of purpose · Kritarth Dandapat',
    description:
      'Statement of purpose: research interests in AI, computer vision, healthcare AI, and materials ML — Kritarth Dandapat, PhD applicant.',
  },
};

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

export function applyPageSeo(page: keyof typeof SEO_BY_PAGE): void {
  const { title, description } = SEO_BY_PAGE[page];
  document.title = title;

  ensureMetaName('description').setAttribute('content', description);
  ensureMetaProperty('og:title').setAttribute('content', title);
  ensureMetaProperty('og:description').setAttribute('content', description);
  ensureMetaProperty('og:url').setAttribute('content', `${PORTFOLIO_ORIGIN}/`);
  ensureMetaName('twitter:title').setAttribute('content', title);
  ensureMetaName('twitter:description').setAttribute('content', description);
}
