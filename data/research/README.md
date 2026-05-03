# Research & project images

This site serves static files from the `public/` folder. Anything you put here is available at the **same path in the URL** (e.g. `public/data/research/oralscan/photo.jpg` → `https://yoursite.com/data/research/oralscan/photo.jpg`).

## Research page (`#/research`)

Each block under a lab is a **subproject** in `constants.tsx` → `RESEARCH_PLACEMENTS` → `subprojects[]`. Every subproject has an **`id`** (e.g. `oralscan`, `perovskite-gnn`, `mlip-uma-alchemical`).

### Folder convention

```
public/data/research/<subproject-id>/
  hero.jpg
  diagram.png
  team.webp
```

Use lowercase filenames without spaces (use `-` or `_`).

### Wire images in code

In `constants.tsx`, on that subproject object, add an **`images`** array:

```ts
{
  id: 'oralscan',
  name: 'OralScan',
  // ...other fields...
  images: [
    {
      src: '/data/research/oralscan/demo.webp',
      alt: 'OralScan capture flow on a smartphone',
      caption: 'Optional short caption shown below the image.',
    },
    {
      src: '/data/research/oralscan/lab-setup.jpg',
      alt: 'ESC lab prototype setup',
    },
  ],
},
```

- **`src`**: must start with `/` and match the file under `public/`.
- **`alt`**: required for accessibility.
- **`caption`**: optional; shown under the image.

If **`images`** is omitted or `[]`, nothing is rendered for that section.

### Subproject IDs (reference)

| Folder name (`public/data/research/…`) | `id` in `constants.tsx` |
|----------------------------------------|---------------------------|
| `oralscan/` | `oralscan` |
| `orthoscan/` | `orthoscan` |
| `mrehab/` | `mrehab` |
| `perovskite-gnn/` | `perovskite-gnn` |
| `mlip-uma-alchemical/` | `mlip-uma-alchemical` |

Lab-wide links (not photos) use **`placementLinks`** on the placement object—see the Peng lab ELN profile link for an example.

---

## Selected projects page (`#/projects`)

Coursework projects live in `PROJECTS` in `constants.tsx`. Each entry should have a **`slug`** (already set for the three templates):

| `slug` | Folder under `public/` |
|--------|-------------------------|
| `marine-guardian` | `public/data/projects/marine-guardian/` |
| `people-counting-csrnet` | `public/data/projects/people-counting-csrnet/` |
| `human-emotion-detection` | `public/data/projects/human-emotion-detection/` |

Add images the same way:

```ts
{
  slug: 'marine-guardian',
  title: 'Marine Guardian: …',
  images: [
    { src: '/data/projects/marine-guardian/architecture.png', alt: 'Model architecture diagram' },
  ],
},
```

---

## Image tips

- Prefer **WebP** or compressed **JPEG**; keep large heroes under ~400KB when possible.
- **`git add`** new files under `public/data/…` so they deploy with the site.
- After editing `constants.tsx`, run `npm run build` locally to verify paths.
