import { useEffect, useState } from 'react';
import type { SitePage } from './types';

export function parseHash(): SitePage {
  const raw = window.location.hash.slice(1);
  if (!raw || raw === '/') {
    return 'home';
  }
  if (raw.startsWith('/')) {
    const path = raw.replace(/^\//, '').split('/')[0] ?? '';
    if (!path) return 'home';
    const allowed: SitePage[] = ['about', 'research', 'projects', 'education', 'notes'];
    if (allowed.includes(path as SitePage)) {
      return path as SitePage;
    }
    return 'home';
  }
  return 'home';
}

export function useHashRoute(): SitePage {
  const [page, setPage] = useState<SitePage>(() =>
    typeof window !== 'undefined' ? parseHash() : 'home',
  );

  useEffect(() => {
    const onHash = () => setPage(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return page;
}
