import { useEffect, useState } from 'react';
import type { SitePage } from './types';

const ALLOWED_PAGES: SitePage[] = ['about', 'research', 'publications', 'projects', 'education', 'news', 'blog'];

/** Migrate legacy hash URLs (`#/about`) to path URLs (`/about`). */
export function migrateHashRoute(): void {
  if (typeof window === 'undefined') return;
  const hash = window.location.hash;
  if (!hash.startsWith('#/')) return;
  const path = hash.slice(1);
  window.history.replaceState(null, '', path || '/');
}

export function parsePathname(pathname: string): SitePage {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  if (normalized === '/') return 'home';
  const segment = normalized.split('/').filter(Boolean)[0] ?? '';
  if (segment === 'notes') return 'news';
  if (ALLOWED_PAGES.includes(segment as SitePage)) {
    return segment as SitePage;
  }
  return 'home';
}

export function parseSiteRoute(): SitePage {
  if (typeof window === 'undefined') return 'home';
  return parsePathname(window.location.pathname);
}

/** Second path segment for blog detail routes (`/blog/foo/` → `foo`; `/blog/` or non-blog → null). */
export function parseBlogSlug(pathname: string): string | null {
  const segments = pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  if (segments[0] !== 'blog') return null;
  return segments[1] ? decodeURIComponent(segments[1]) : null;
}

export function parseSiteBlogSlug(): string | null {
  if (typeof window === 'undefined') return null;
  return parseBlogSlug(window.location.pathname);
}

/** Current blog slug, kept in sync with client-side navigation (`popstate`). */
export function useBlogSlug(): string | null {
  const [slug, setSlug] = useState<string | null>(() => parseSiteBlogSlug());

  useEffect(() => {
    setSlug(parseSiteBlogSlug());
    const onNavigate = () => setSlug(parseSiteBlogSlug());
    window.addEventListener('popstate', onNavigate);
    return () => window.removeEventListener('popstate', onNavigate);
  }, []);

  return slug;
}

/** Client-side navigation: push the URL and notify listeners without a full page reload. */
export function navigate(href: string): void {
  if (typeof window === 'undefined') return;
  window.history.pushState(null, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function useSiteRoute(): SitePage {
  const [page, setPage] = useState<SitePage>(() => {
    if (typeof window === 'undefined') return 'home';
    migrateHashRoute();
    return parseSiteRoute();
  });

  useEffect(() => {
    migrateHashRoute();
    setPage(parseSiteRoute());

    const onNavigate = () => setPage(parseSiteRoute());
    window.addEventListener('popstate', onNavigate);
    return () => window.removeEventListener('popstate', onNavigate);
  }, []);

  return page;
}
