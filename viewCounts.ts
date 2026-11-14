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

/**
 * In-memory cache for this page load. Header/Footer and pages remount on every
 * client-side navigation; without this they would refetch and re-render each time.
 * Each entry holds the request promise and, once settled, its value.
 */
type Entry<T> = { promise: Promise<T>; value?: T; settled: boolean };
const cache = new Map<string, Entry<unknown>>();

function cached<T>(key: string, load: () => Promise<T>): Entry<T> {
  let entry = cache.get(key) as Entry<T> | undefined;
  if (!entry) {
    const e: Entry<T> = { settled: false, promise: undefined as unknown as Promise<T> };
    e.promise = load().then((v) => {
      e.value = v;
      e.settled = true;
      return v;
    });
    entry = e;
    cache.set(key, entry);
  }
  return entry;
}

/** Already-loaded value for a cache key, or undefined if not loaded yet. */
function peek<T>(key: string): T | undefined {
  const entry = cache.get(key) as Entry<T> | undefined;
  return entry?.settled ? entry.value : undefined;
}

type AllViews = { total: number; posts: Record<string, number> };

/** Count this browser's first view of a post (once ever), return the post's total. */
export function recordPostView(slug: string): Promise<number | null> {
  return cached(`post:${slug}`, async () => {
    const key = `viewed:${slug}`;
    const increment = !isLocalHost() && !storageGet(() => localStorage, key);
    const data = await call<{ views: number }>(`/views/${encodeURIComponent(slug)}`, increment);
    if (data && increment) storageSet(() => localStorage, key);
    return data ? data.views : null;
  }).promise;
}

export function cachedPostView(slug: string): number | null | undefined {
  return peek<number | null>(`post:${slug}`);
}

/** All blog view counts: total plus a per-slug map. */
export function fetchAllPostViews(): Promise<AllViews | null> {
  return cached('all', () => call<AllViews>('/views', false)).promise;
}

export function cachedAllPostViews(): AllViews | null | undefined {
  return peek<AllViews | null>('all');
}

/** Count one visit per browser session to the whole site, return the site total. */
export function recordSiteVisit(): Promise<number | null> {
  return cached('visits', async () => {
    const key = 'visited';
    const increment = !isLocalHost() && !storageGet(() => sessionStorage, key);
    const data = await call<{ visits: number }>('/visits', increment);
    if (data && increment) storageSet(() => sessionStorage, key);
    return data ? data.visits : null;
  }).promise;
}

export function cachedSiteVisits(): number | null | undefined {
  return peek<number | null>('visits');
}

export function formatCount(n: number, one: string, many: string): string {
  return `${n.toLocaleString()} ${n === 1 ? one : many}`;
}
