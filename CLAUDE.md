# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server at http://localhost:3000
npm run build      # vite build + postbuild SEO script (sitemap, 404.html)
npm run preview    # serve the built dist/ locally
npm run deploy     # manual deploy: build, then `wrangler deploy` to Cloudflare (CI normally does this)
```

There are no tests and no linter config in this repo.

## Architecture

**Stack:** React 19 + TypeScript + Vite, served at `dkritarth.com` by a Cloudflare Worker with static assets (`wrangler.jsonc`, Worker `dkritarth-site`, route `dkritarth.com/*`).

**Deployment is automatic:** every push to `main` runs `.github/workflows/deploy-cloudflare.yml` (npm ci, build, apply D1 migrations, `wrangler deploy`), using the `CLOUDFLARE_API_TOKEN` repo secret. Assets use `not_found_handling: single-page-application`, so every route (e.g. `/blog/<slug>/`) returns `index.html` with a 200. Only `/api/*` runs the Worker script (`worker/index.js`).

### Routing

There is no React Router. `useSiteRoute.ts` implements a custom SPA router using `window.location.pathname` and the browser `popstate` event. Navigation is done with `history.pushState` (not `<Link>` or `<Navigate>`). `parsePathname` maps `/notes` → `news` and `/education` → `about` (legacy aliases; `/education/` is rewritten to `/about/#education`), and migrates legacy hash URLs (`#/about`) to path URLs on first load. `App.tsx` scrolls to the `#hash` target after navigation; Research's collapsed "Previous research" section opens itself when the hash points inside it.

### Content data flow

All site content lives in a handful of source-of-truth files:

| File | Purpose |
|---|---|
| `constants.tsx` | All biographical, research, project, education, and skills data. Also exports `NAV_LINKS` and utility functions like `getNewsByYear()`. |
| `newsItems.ts` | `NEWS_ITEMS` array — the News/timeline page data. |
| `pengCredly.ts` | `CredlyBadge` objects for UB ELN Mentored Research micro-credentials. |
| `types.ts` | All shared TypeScript interfaces (`SitePage`, `ResearchPlacement`, `ResearchSubproject`, `Project`, `NewsItem`, `CredlyBadge`, etc.). |
| `seoMeta.ts` | Per-route titles, descriptions, canonical URLs, OG tags, and JSON-LD structured data. Applied client-side via `applyPageSeo(page)` called in `App.tsx`'s `useEffect`. |
| `siteUrls.ts` | Cross-site URLs; swaps to localhost ports when `hostname === 'localhost'`. |

When adding or updating content (new publication, news item, project, etc.), edit `constants.tsx` or `newsItems.ts` — pages read from these directly and do not have their own state.

### SEO / build pipeline

`scripts/postbuild-seo.mjs` runs after `vite build` and:
- Writes `dist/sitemap.xml` and `public/sitemap.xml`
- Writes `dist/404.html`, a legacy GitHub Pages SPA fallback. Cloudflare doesn't use it (its SPA mode serves `index.html` directly); it's kept only while GitHub Pages still answers for `www`.

If you add a new route (new `SitePage` value), update `ROUTES` in `postbuild-seo.mjs`, `PAGE_PATHS` and `SEO` in `seoMeta.ts`, the switch in `App.tsx`, and `ALLOWED_PAGES` in `useSiteRoute.ts`.

### View counters (blog views, site visits)

The site Worker (`worker/index.js`, D1 database `blog-views`, table `views`) serves counts on the same domain:

- `POST /api/views/<slug>` counts a post view, `GET /api/views/<slug>` reads it, `GET /api/views` returns `{ total, posts }` for all posts.
- `POST|GET /api/visits` is the whole-site visit counter (stored as row `_site`).

Client code is `viewCounts.ts`. `components/ViewCount.tsx` shows views on a post page, `BlogList`/`BlogCard` show the total and per-post counts, `Footer` shows site visits. Each browser counts once per post (localStorage) and once per session for site visits (sessionStorage). On localhost it only reads, never increments.

**New blog posts need no counter setup.** The Worker only accepts slugs listed as `/blog/<slug>/` in the live `sitemap.xml`, so a post starts counting once it is published (not `draft`) and deployed. Draft posts don't show a count.

Worker changes: edit `worker/index.js`. Schema changes: add a new SQL file in `worker/migrations/`. Both ship automatically on push to `main` (CI applies migrations, then deploys).

### Theming

Light/dark mode is class-based (`html.dark`). The `ink-*`, `surface` and `deep` colors in the Tailwind config (`index.html`) are CSS variables, so existing `text-ink-*` / `bg-ink-*` classes flip automatically; use `bg-surface` instead of `bg-white`, and `text-ink-50` (not `text-white`) on `bg-ink-900` buttons. Always-dark elements (footer, image overlays, code blocks) use `bg-deep` or `bg-black/*`. `theme.ts` holds the system/light/dark preference (saved in `localStorage` under `theme`); an inline script in `index.html` applies it before first paint.

### Typography

One family, Space Grotesk, is used for headings (`font-serif` class, kept for historical reasons) and body (`font-sans`). Both come from CSS variables in `index.html` (`--font-display`, `--font-body`); swap a pairing by changing them and the Google Fonts `<link>` together. Inline links use the amber `text-accent` color (variable `--accent`, darker in light mode for contrast); cards are thin-bordered `rounded-lg`/`rounded-xl` boxes.

### Static assets

Images and PDFs live under `public/data/`:
- `public/data/news/<id>/` — news timeline photos (id matches `NewsItem.id`)
- `public/data/research/<id>/` — research figures (id matches `ResearchSubproject.id`)
- `public/data/projects/<slug>/` — project screenshots (slug matches `Project.slug`)
- `public/data/CV%20-%20Kritarth%20Dandapat.pdf` and `Resume%20-%20Kritarth%20Dandapat.pdf`

`newsItems.ts` exports `newsImagePath(id, file)` and `newsMedia(file)` helpers for building correct `/data/news/...` paths.

### Components

`components/` contains shared UI pieces. `pages/` contains one file per route; each page imports directly from `constants.tsx` / `newsItems.ts` and composes components. `PageLayout` and `Header`/`Footer` provide the shell; `Section` is the standard content wrapper.
