/** Production URLs for the site family. */
export const SITE_URLS = {
  hub: 'https://dkritarth.com',
  portfolio: 'https://dkritarth.com',
  notebook: 'https://notebook.dkritarth.com',
} as const;

function isLocalPreviewHost(): boolean {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname;
  return h === 'localhost' || h === '127.0.0.1';
}

/**
 * Cross-site navigation URLs. On localhost, uses ports from Vite env (see serve-all.sh → .env.local)
 * or defaults 8081 / 8082 / 3000.
 */
export function getSiteUrls(): { hub: string; portfolio: string; notebook: string } {
  if (!isLocalPreviewHost()) {
    return { hub: SITE_URLS.hub, portfolio: SITE_URLS.portfolio, notebook: SITE_URLS.notebook };
  }
  const hub = import.meta.env.VITE_LOCAL_HUB_PORT ?? '8081';
  const notebook = import.meta.env.VITE_LOCAL_NOTEBOOK_PORT ?? '8082';
  const portfolio = import.meta.env.VITE_LOCAL_PORTFOLIO_PORT ?? '3000';
  return {
    hub: `http://127.0.0.1:${hub}`,
    portfolio: `http://127.0.0.1:${portfolio}`,
    notebook: `http://127.0.0.1:${notebook}`,
  };
}
