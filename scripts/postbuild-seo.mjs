#!/usr/bin/env node
/**
 * After `vite build`: GitHub Pages SPA 404 + sitemap with all path routes.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dist = join(root, 'dist');

const ORIGIN = 'https://dkritarth.com';
const ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about/', priority: '0.9', changefreq: 'monthly' },
  { path: '/research/', priority: '0.9', changefreq: 'weekly' },
  { path: '/publications/', priority: '0.95', changefreq: 'weekly' },
  { path: '/projects/', priority: '0.85', changefreq: 'monthly' },
  { path: '/education/', priority: '0.8', changefreq: 'monthly' },
  { path: '/news/', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog/', priority: '0.7', changefreq: 'weekly' },
];

const lastmod = new Date().toISOString().slice(0, 10);

/**
 * Extract published (non-draft) blog posts from `blogPosts.ts` without importing the TS module.
 * Scans each `slug: '...'` occurrence and reads the `date`/`updated`/`draft` fields in the segment
 * up to the next `slug:` (or end of file). Returns `{ slug, lastmod }` for the sitemap.
 */
function readBlogPosts() {
  let source;
  try {
    source = readFileSync(join(root, 'blogPosts.ts'), 'utf8');
  } catch {
    return [];
  }
  const slugRe = /slug:\s*'([^']+)'/g;
  const marks = [];
  let m;
  while ((m = slugRe.exec(source)) !== null) {
    marks.push({ slug: m[1], index: m.index });
  }
  return marks
    .map((mark, i) => {
      const end = i + 1 < marks.length ? marks[i + 1].index : source.length;
      const segment = source.slice(mark.index, end);
      if (/draft:\s*true/.test(segment)) return null;
      const updated = /updated:\s*'(\d{4}-\d{2}-\d{2})'/.exec(segment);
      const date = /date:\s*'(\d{4}-\d{2}-\d{2})'/.exec(segment);
      return { slug: mark.slug, lastmod: updated?.[1] ?? date?.[1] ?? lastmod };
    })
    .filter(Boolean);
}

const blogPosts = readBlogPosts();

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${ORIGIN}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
).join('\n')}
${blogPosts
  .map(
    (p) => `  <url>
    <loc>${ORIGIN}/blog/${p.slug}/</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const spa404 = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Redirecting…</title>
    <script>
      sessionStorage.setItem('gh_pages_redirect', location.href);
      location.replace(${JSON.stringify(ORIGIN + '/')});
    </script>
  </head>
  <body>
    <p>Redirecting…</p>
  </body>
</html>
`;

mkdirSync(dist, { recursive: true });
writeFileSync(join(dist, 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(join(dist, '404.html'), spa404, 'utf8');
writeFileSync(join(root, 'public', 'sitemap.xml'), sitemap, 'utf8');

console.log('postbuild-seo: wrote dist/sitemap.xml, dist/404.html, public/sitemap.xml');
