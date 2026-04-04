import { useEffect, useState } from 'react';

export type SitePage = 'home' | 'personal-statement' | 'statement-of-purpose';

export type ParsedHash = {
  page: SitePage;
  /** In-page id to scroll to when page is home (hash like `#about`). */
  scrollTo: string | null;
};

export function parseHash(): ParsedHash {
  const raw = window.location.hash.slice(1);
  if (!raw || raw === '/') {
    return { page: 'home', scrollTo: null };
  }
  if (raw.startsWith('/')) {
    const path = raw.replace(/^\//, '').split('/')[0] ?? '';
    if (path === 'personal-statement') {
      return { page: 'personal-statement', scrollTo: null };
    }
    if (path === 'statement-of-purpose') {
      return { page: 'statement-of-purpose', scrollTo: null };
    }
    return { page: 'home', scrollTo: null };
  }
  return { page: 'home', scrollTo: raw };
}

export function useHashRoute(): ParsedHash {
  const [parsed, setParsed] = useState<ParsedHash>(() =>
    typeof window !== 'undefined' ? parseHash() : { page: 'home', scrollTo: null }
  );

  useEffect(() => {
    const onHash = () => setParsed(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (parsed.page === 'home' && parsed.scrollTo) {
      const id = parsed.scrollTo;
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [parsed.page, parsed.scrollTo]);

  return parsed;
}
