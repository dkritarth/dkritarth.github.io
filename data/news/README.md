# News page media

The News timeline (`#/news`) is driven by **`newsItems.ts`**. Each milestone has a stable **`id`** used for photos and for your own reference when editing.

## Folder convention

You can use either layout:

**Per-item subfolders** (recommended for many photos per milestone):

```
public/data/news/<id>/
  hero.jpg
```

**Flat folder** (single shared directory — use `newsMedia('filename.jpg')` in code):

```
public/data/news/
  MSU-offer-letter-screenshot.png
  presenting-oralscan-ctsi-study.jpeg
```

URL paths: `/data/news/<id>/file.jpg` via `newsImagePath(id, file)` or `/data/news/file.jpg` via `newsMedia(file)`.

## Wire images in `newsItems.ts`

```ts
import { newsImagePath } from './newsItems';

{
  id: 'health-futures-2026',
  year: 2026,
  month: 4,
  headline: 'Second place ($1,000) at UB Health Futures Challenge for OralScan',
  images: [
    {
      src: newsImagePath('health-futures-2026', 'award.jpg'),
      alt: 'Health Futures Challenge award ceremony',
      caption: 'Optional caption under the photo.',
    },
  ],
  links: [ /* ... */ ],
},
```

- **`alt`** is required for accessibility.
- Omit **`images`** (or use `[]`) until files exist — otherwise the browser will request missing URLs.

## Links (websites, papers, LinkedIn)

Add a **`links`** array on any item:

```ts
links: [
  { label: 'OralScan website', href: 'https://esc-group-ub.github.io/OralScan-Website/', kind: 'website' },
  { label: 'LinkedIn post', href: 'https://www.linkedin.com/posts/YOUR_POST_ID', kind: 'linkedin' },
  { label: 'ChemRxiv preprint', href: 'https://doi.org/10.26434/...', kind: 'paper' },
  { label: 'GitHub repo', href: 'https://github.com/...', kind: 'github' },
  { label: 'Talk recording', href: 'https://youtube.com/...', kind: 'video' },
],
```

**`kind`** controls the icon on the pill button:

| `kind`     | Use for                          |
|------------|----------------------------------|
| `website`  | Project sites, lab pages, UB news (default) |
| `linkedin` | LinkedIn posts or articles       |
| `article`  | News articles, blog posts        |
| `paper`    | arXiv, ChemRxiv, DOI             |
| `github`   | Repositories                     |
| `video`    | YouTube, recordings              |

LinkedIn does not need a separate embed: link to the post, or add a **`linkedin.png`** screenshot under the item folder.

## Item IDs (reference)

| `id` | Headline topic |
|------|----------------|
| `msu-phd-2026` | Incoming MSU PhD |
| `ub-bs-2026` | Completing UB BS |
| `inference-foundry-2026` | Inference Foundry launch |
| `ta-cse341-2026` | CSE 341 TA |
| `health-futures-2026` | Health Futures Challenge |
| `mlip-uma-2025` | MLIPs / UMA work |
| `pearl-2025` | PEARL award |
| `mrehab-2025` | mRehab |
| `peng-lab-2025` | Peng lab |
| `orthoscan-2025` | OrthoScan |
| `chemrxiv-2025` | ChemRxiv paper |
| `cybersecurity-2025` | Cybersecurity C2C |
| `competitions-2024` | Innovation competitions |
| `oralscan-pi-2024` | Disability health challenge |
| `tutor-2024` | Tutoring / PAL |
| `esc-oralscan-2024` | ESC + OralScan start |
| `presentations-2025` | CTSI / SURC (January 2025) |
| `arxiv-gnn-2025` | GNN ordering paper (September 2025) |
| `nsdc-2023` | NSDC chapter |
| `credly-perovskite-gnn-2025` | Credly — perovskite GNNs (Oct 2025) |
| `credly-mlip-uma-2026` | Credly — MLIPs / UMA (May 2026) |
| `ub-our-research-spotlight-2026` | UB OUR homepage feature with Prof. Peng (May 2026) |
| `ub-start-2023` | Started at UB |

After adding files or editing `newsItems.ts`, run `npm run build` locally to verify paths.
