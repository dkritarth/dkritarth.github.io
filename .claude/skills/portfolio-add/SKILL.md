---
name: portfolio-add
description: Add or update content on the Kritarth Dandapat portfolio site (news, publications, projects, research, currently, education) by editing the correct typed source-of-truth file. Use when adding a new publication, news milestone, project, research subproject, or updating bio/education content.
---

# Portfolio Add

All site content lives in a small set of typed source-of-truth files. **Edit those files, never the page components** in `pages/` — pages (`pages/*.tsx`) and shared components (`components/*.tsx`, e.g. `components/News.tsx`) read data directly from `constants.tsx` / `newsItems.ts` and have no local state of their own.

## Routing table

| Content type | Source file | Exported const | TS interface (`types.ts`) | Asset folder + helper |
|---|---|---|---|---|
| News milestone | `newsItems.ts` | `NEWS_ITEMS: NewsItem[]` | `NewsItem` | `public/data/news/<id>/` via `newsImagePath(id, file)`, or flat `public/data/news/` via `newsMedia(file)` |
| Publication | `constants.tsx` (line ~316) | `PUBLICATIONS: Publication[]` | `Publication` | none (no images) |
| Project | `constants.tsx` (line ~394) | `PROJECTS: Project[]` | `Project` | `public/data/projects/<slug>/` |
| Research placement (lab) | `constants.tsx` (line ~132) | `RESEARCH_PLACEMENTS: ResearchPlacement[]` | `ResearchPlacement` (contains `subprojects: ResearchSubproject[]`) | n/a at placement level |
| Research subproject | nested inside a `RESEARCH_PLACEMENTS[i].subprojects` | — | `ResearchSubproject` | `public/data/research/<id>/` |
| Currently (home page) | `constants.tsx` (line ~88) | `CURRENTLY: CurrentlyItem[]` | `CurrentlyItem` | none |
| Education | `constants.tsx` (line ~108) | `EDUCATION: Education[]` | `Education` | none |

Line numbers are approximate as of last edit — search for `export const <NAME>` to find the current location; do not hardcode positions when editing.

### Field checklists

**`NewsItem`** (`newsItems.ts`)
- Required: `id` (string, stable slug — must match asset folder name), `year` (number), `month` (1–12; use `6` for a mid-year/"Spring" item with unknown month), `headline` (string)
- Optional: `summary`, `images: ContentImage[]`, `links: NewsLink[]`, `credlyBadge: CredlyBadge`

**`Publication`** (`constants.tsx`)
- Required: `title`, `authors`, `venue`, `year`
- Optional: `link`, `status` (e.g. `'Submitted'`, `'In revision'`, `'In progress'`), `abstract`, `citation`, `equalContribution: string[]` (names as they appear in `authors`, e.g. `['Liu, E.', 'Dandapat, K.']`, rendered with `*`)

**`Project`** (`constants.tsx`)
- Required: `title`, `category`, `description: string[]`, `technologies: string[]`
- Optional: `stats` (e.g. `'98.72% Accuracy'`), `links: ResearchLink[]`, `slug` (must match `public/data/projects/<slug>/` if you add images), `images: ContentImage[]`

**`ResearchPlacement`** (`constants.tsx` → `RESEARCH_PLACEMENTS`)
- Required: `role`, `organization`, `location`, `subprojects: ResearchSubproject[]`
- Optional: `overview`, `placementLinks: ResearchLink[]` (lab-wide links shown under the placement header)

**`ResearchSubproject`** (nested in a placement's `subprojects[]`)
- Required: `id` (must match `public/data/research/<id>/` if you add images), `name`, `period`, `narrative: string[]`, `technicalHighlights: string[]`, `technologies: string[]`
- Optional: `context`, `links: ResearchLink[]`, `credlyBadge: CredlyBadge`, `collaboratorsNote`, `images: ContentImage[]`

**`CurrentlyItem`** (`constants.tsx` → `CURRENTLY`)
- Required: `title`, `description`
- Optional: `link: ResearchLink` (`{ label, href }`)

**`Education`** (`constants.tsx` → `EDUCATION`)
- Required: `degree`, `institution`, `location`, `period`, `details: string[]`

**`ContentImage`** (shared, used by News/Research/Projects)
- Required: `src` (must start with `/`, matching the file's actual path under `public/`), `alt` (required for accessibility)
- Optional: `caption`

**`NewsLink`** (News only)
- Required: `label`, `href`
- Optional: `kind: NewsLinkKind` — one of `'website' | 'linkedin' | 'article' | 'paper' | 'github' | 'video'` (controls the pill icon; defaults to `website`-like styling if omitted)

**`ResearchLink`** (Research/Projects/Currently) — just `{ label, href }`, no `kind`.

**`CredlyBadge`** — `{ badgeId, publicUrl, issued?, projectOutcomeUrl?, projectOutcomeLabel? }`, used for UB ELN "Mentored Research" micro-credentials on News items or Research subprojects.

## Conventions

- **id/slug ↔ asset folder**: A News item's `id`, a Research subproject's `id`, and a Project's `slug` must exactly match the folder name under `public/data/{news,research,projects}/<id-or-slug>/` when that item has images. Use lowercase, hyphen- or underscore-separated names, no spaces.
- **Images**: Add a `ContentImage` object — `{ src: '/data/<section>/<id>/<file>', alt: '...', caption?: '...' }`. For News, prefer the helper functions over hand-writing paths:
  - `newsImagePath(id, file)` → `/data/news/<id>/<file>` (per-item subfolder; recommended when a milestone has its own photos)
  - `newsMedia(file)` → `/data/news/<file>` (flat shared folder; several existing items use this, e.g. `MSU-offer-letter-screenshot.png`)
  - Research and Projects have no helper — write the `/data/research/<id>/...` or `/data/projects/<slug>/...` path literally.
  - Omit `images` (or use `[]`) until the files actually exist — the browser will 404 on missing images otherwise.
  - `alt` is required for every image (accessibility).
- **Sort order**: `getNewsByYear()` (in `constants.tsx`) groups `NEWS_ITEMS` by `year` descending, then sorts items within a year by `month` descending, then by `id` alphabetically as a tiebreaker. You don't need to pre-sort `NEWS_ITEMS` in the array itself — insert new items anywhere; the grouping function handles ordering. `PUBLICATIONS`, `PROJECTS`, `RESEARCH_PLACEMENTS`, and `EDUCATION` render in array order as written, so insert new entries where you want them to appear (typically newest-first).
- **Publication `status`**: freeform string, but keep it consistent with existing values already in use — `'Submitted'`, `'In revision'`, `'In progress'`, or a short description like `'Contributed benchmarking and revisions'`.

## Workflow

1. **Identify the content type** (news / publication / project / research placement or subproject / currently / education) from the routing table above.
2. **Open the right file** — `newsItems.ts` for news, `constants.tsx` for everything else. Search for the exported const name (e.g. `grep -n "export const PUBLICATIONS" constants.tsx`) rather than assuming a line number.
3. **Append or update the object** with all required fields from the checklist above; fill in optional fields as relevant. For a new research subproject, nest it inside the correct placement's `subprojects` array (or add a new placement object if it's a new lab/organization).
4. **Add matching assets**, if any: create `public/data/news/<id>/`, `public/data/research/<id>/`, or `public/data/projects/<slug>/` and drop images there (prefer WebP or compressed JPEG, keep heroes under ~400KB). Wire them via `images: [{ src, alt, caption? }]` using the exact path convention above. Remember to `git add` new files under `public/data/` so they deploy.
5. **Verify** the id/slug matches the folder name exactly, and that every image referenced in code has a corresponding file on disk (and vice versa — no orphaned files needed, but no missing files either).

## Verify

- `npm run dev` — start the dev server at `http://localhost:3000` and eyeball the relevant page (News, Publications, Projects, Research, or Home for Currently/Education).
- `npm run build` — runs `vite build` + the postbuild SEO script; confirms there are no TypeScript errors (missing required fields, wrong types) and no broken build. This repo has no test suite and no linter configured, so `npm run build` is the primary correctness gate.
- If you added a new `SitePage` route (not covered by this skill's content types), also update `ROUTES` in `scripts/postbuild-seo.mjs`, `PAGE_PATHS`/`SEO` in `seoMeta.ts`, the switch in `App.tsx`, and `ALLOWED_PAGES` in `useSiteRoute.ts` — see the project `CLAUDE.md` for details.
