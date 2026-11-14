/**
 * View counters for dkritarth.com.
 *
 *   GET  /api/views          -> { total, posts: { <slug>: count } }   (all blog posts)
 *   GET  /api/views/<slug>   -> { slug, views }
 *   POST /api/views/<slug>   -> increments, then { slug, views }
 *   GET  /api/visits         -> { visits }                            (whole site)
 *   POST /api/visits         -> increments, then { visits }
 *
 * Only slugs listed as /blog/<slug>/ in the live sitemap are counted, so random
 * POSTs can't create junk rows. Counts live in D1 (binding DB), table `views`.
 * The site-wide counter is the row `_site`; real slugs can't contain "_".
 */

const SLUG_RE = /^[a-z0-9-]{1,120}$/;
const SITE_KEY = '_site';
const SITEMAP_URL = 'https://dkritarth.com/sitemap.xml';
const ALLOWED_ORIGINS = new Set([
  'https://dkritarth.com',
  'https://www.dkritarth.com',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
]);

function corsHeaders(request) {
  const origin = request.headers.get('Origin');
  if (!origin || !ALLOWED_ORIGINS.has(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function json(request, body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...corsHeaders(request),
    },
  });
}

async function isKnownPost(slug) {
  // Cached at the edge for 5 minutes so we don't refetch the sitemap on every view.
  const res = await fetch(SITEMAP_URL, { cf: { cacheTtl: 300, cacheEverything: true } });
  if (!res.ok) return false;
  const xml = await res.text();
  return xml.includes(`/blog/${slug}/</loc>`);
}

function increment(env, key) {
  return env.DB.prepare(
    `INSERT INTO views (slug, count) VALUES (?, 1)
     ON CONFLICT(slug) DO UPDATE SET count = count + 1
     RETURNING count`,
  )
    .bind(key)
    .first();
}

async function read(env, key) {
  const row = await env.DB.prepare('SELECT count FROM views WHERE slug = ?').bind(key).first();
  return row ? row.count : 0;
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    const { pathname } = new URL(request.url);
    const method = request.method;

    // Whole-site visits
    if (/^\/api\/visits\/?$/.test(pathname)) {
      if (method === 'GET') return json(request, { visits: await read(env, SITE_KEY) });
      if (method === 'POST') return json(request, { visits: (await increment(env, SITE_KEY)).count });
      return json(request, { error: 'method not allowed' }, 405);
    }

    // All blog posts
    if (/^\/api\/views\/?$/.test(pathname)) {
      if (method !== 'GET') return json(request, { error: 'method not allowed' }, 405);
      const { results } = await env.DB.prepare('SELECT slug, count FROM views WHERE slug != ?')
        .bind(SITE_KEY)
        .all();
      const posts = {};
      let total = 0;
      for (const r of results) {
        posts[r.slug] = r.count;
        total += r.count;
      }
      return json(request, { total, posts });
    }

    // One blog post
    const match = pathname.match(/^\/api\/views\/([^/]+)\/?$/);
    if (!match) return json(request, { error: 'not found' }, 404);

    const slug = decodeURIComponent(match[1]);
    if (!SLUG_RE.test(slug)) return json(request, { error: 'bad slug' }, 400);

    if (method === 'GET') return json(request, { slug, views: await read(env, slug) });
    if (method === 'POST') {
      if (!(await isKnownPost(slug))) return json(request, { error: 'unknown post' }, 404);
      return json(request, { slug, views: (await increment(env, slug)).count });
    }
    return json(request, { error: 'method not allowed' }, 405);
  },
};
