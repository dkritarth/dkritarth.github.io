/**
 * Client for the view-counter Worker (workers/blog-views). Lives on the same domain
 * at /api/views and /api/visits. On localhost we only read counts, never increment,
 * so local previews don't inflate the live numbers.
 */
const API = 'https://dkritarth.com/api';

function isLocalHost(): boolean {
  const h = window.location.hostname;
  return h === 'localhost' || h === '127.0.0.1';
}

function storageGet(store: () => Storage, key: string): boolean {
  try {
    return store().getItem(key) === '1';
  } catch {
    return false;
  }
}

function storageSet(store: () => Storage, key: string): void {
  try {
    store().setItem(key, '1');
  } catch {
    /* storage blocked */
  }
}

async function call<T>(path: string, increment: boolean): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, { method: increment ? 'POST' : 'GET' });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

/** Count this browser's first view of a post (once ever), return the post's total. */
export async function recordPostView(slug: string): Promise<number | null> {
  const key = `viewed:${slug}`;
  const increment = !isLocalHost() && !storageGet(() => localStorage, key);
  const data = await call<{ views: number }>(`/views/${encodeURIComponent(slug)}`, increment);
  if (data && increment) storageSet(() => localStorage, key);
  return data ? data.views : null;
}

/** All blog view counts: total plus a per-slug map. */
export async function fetchAllPostViews(): Promise<{ total: number; posts: Record<string, number> } | null> {
  return call('/views', false);
}

/** Count one visit per browser session to the whole site, return the site total. */
export async function recordSiteVisit(): Promise<number | null> {
  const key = 'visited';
  const increment = !isLocalHost() && !storageGet(() => sessionStorage, key);
  const data = await call<{ visits: number }>('/visits', increment);
  if (data && increment) storageSet(() => sessionStorage, key);
  return data ? data.visits : null;
}

export function formatCount(n: number, one: string, many: string): string {
  return `${n.toLocaleString()} ${n === 1 ? one : many}`;
}
