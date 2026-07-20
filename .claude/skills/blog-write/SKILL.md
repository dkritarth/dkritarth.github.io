---
name: blog-write
description: Convert a raw text draft into a clean semantic-HTML blog post and register it as a new BlogPost in blogPosts.ts. Use when the author wants to publish or draft a blog post from written notes or prose.
---

# blog-write

Takes a raw text draft the author wrote — notes, stream-of-consciousness prose, a rough
writeup — and turns it into a single `BlogPost` object appended to the `BLOG_POSTS` array
in `blogPosts.ts`. Input: unstructured text. Output: a typed, semantically-marked-up blog
post ready to render at `/blog/<slug>/`.

This skill only touches `blogPosts.ts` (to append the new post) and, optionally, files
under `public/data/blog/<slug>/` (to add a hero image). It does not modify `types.ts`,
`components/BlogProse.tsx`, `seoMeta.ts`, or routing files — those are already wired up
for the `blog` page.

## Field-derivation rules

Reference: the `BlogPost` interface in `types.ts`.

- **`slug`** — kebab-case derived from the title (lowercase, spaces/punctuation to
  hyphens, no trailing hyphen). Before finalizing, read `BLOG_POSTS` in `blogPosts.ts` and
  confirm the slug isn't already used. If it collides, disambiguate (e.g. append a short
  qualifier) rather than silently overwrite.
- **`title`** — the post's title, taken from the draft or asked of the author if unclear.
- **`date`** — ISO `YYYY-MM-DD`. Ask the author for a publish date; if they don't care, use
  today's date.
- **`updated`** — omit for a new post. Only set this when later editing an existing post.
- **`tags`** — 3–4 topical, lowercase, kebab-case tags (mirror the style already in
  `BLOG_POSTS`, e.g. `'llm-tooling'`, `'infrastructure'`).
- **`excerpt`** — 1–2 sentences summarizing the post. This doubles as the meta description,
  so keep it concrete and specific, not generic marketing copy.
- **`readingMinutes`** — `ceil(word_count_of_rendered_text / 200)`, minimum `1`. Count words
  in the plain text content (stripped of tags), not the raw HTML.
- **`hero`** (optional) — only add if the author supplies or asks for a lead image. Place
  the image file under `public/data/blog/<slug>/`, then set:
  ```ts
  hero: { src: blogImagePath('<slug>', '<file>'), alt: '<descriptive alt text>' }
  ```
  `blogImagePath` is already exported from `blogPosts.ts` — import and reuse it, don't
  hand-build the path string.
- **`draft`** — set `draft: true` when the author wants to stage the post without
  publishing it. Draft posts are excluded from `getPublishedPosts()` (used by the blog list)
  and from the sitemap. Omit the field entirely (don't set `draft: false`) for a normal
  published post.

## HTML conversion rules (strict)

`content` is a single HTML string rendered via `dangerouslySetInnerHTML` by
`components/BlogProse.tsx`. That component only has CSS rules for this exact tag set —
anything else renders unstyled or breaks the layout:

```
h2, h3, p, ul, ol, li, a, blockquote, code, pre, strong, em, hr, img
```

Hard rules:

- **No `h1`.** The page title is rendered separately from `BlogPost.title`; an `h1` inside
  `content` would duplicate it. Use `h2`/`h3` for section structure.
- **No `class` or `style` attributes, no `div`/`span`/`section`/other wrapper tags.** Only
  the tags listed above. `BlogProse` applies all styling via a `[&_tag]:...` Tailwind
  wrapper — anything not in that list is a plain, unstyled element in the middle of the
  post.
- Convert freeform paragraphs to `<p>...</p>`. Convert clear section breaks / headers in
  the draft to `<h2>` (major sections) or `<h3>` (subsections).
- Convert bullet/numbered lists to `<ul><li>...</li></ul>` or `<ol><li>...</li></ol>`.
- Convert block quotations to `<blockquote><p>...</p></blockquote>`.
- Inline code or short technical tokens → `<code>...</code>`. Multi-line code blocks →
  `<pre><code>...</code></pre>`.
- Escape literal `<`, `>`, and `&` everywhere in the output — inside `<code>`/`<pre>`
  blocks especially — as `&lt;`, `&gt;`, `&amp;`.
- **External links**: `<a href="https://example.com" target="_blank" rel="noopener">text</a>`.
- **Internal site links** (paths on this same site, e.g. `/publications/`, `/research/`):
  plain `<a href="/publications/">text</a>` — no `target`/`rel`.
- Use `<strong>` for bold emphasis, `<em>` for italics, `<hr />` for a thematic break
  (e.g. before a closing note).
- `<img src="..." alt="..." />` only for images placed under `public/data/blog/<slug>/`
  and referenced via `blogImagePath(slug, file)` — don't hotlink external images.
- Keep the string readable (multi-line, indented) — it doesn't need to be minified, just
  valid and consistent with the existing entry in `BLOG_POSTS`.

## Workflow

1. **Read the draft.** Get the raw text from the author (pasted, or a file path they give
   you).
2. **Derive metadata** per the rules above: `slug` (check uniqueness against `BLOG_POSTS`
   in `blogPosts.ts` first), `title`, `date`, `tags`, `excerpt`, `readingMinutes`.
3. **Convert the body to HTML** per the strict tag-set rules above. Preserve the author's
   voice and structure — this is a transcription/formatting pass, not a rewrite. Don't
   invent claims, links, or facts not in the draft.
4. **Append the object** to the `BLOG_POSTS` array in `blogPosts.ts` (import `blogImagePath`
   already available at the top of the file if a hero is used). Keep the existing entries
   untouched; add the new object as another array element.
5. **Add the hero asset**, if any, under `public/data/blog/<slug>/` before referencing it.
6. **Verify** per the section below.

## Verify

```bash
npm run dev
```
Open `http://localhost:3000/blog/` and confirm the new post appears in the list (unless
`draft: true`, in which case it should be absent). Open `http://localhost:3000/blog/<slug>/`
and check the rendered post: heading hierarchy, links, lists, and code blocks all look
correct and nothing renders as raw/unstyled HTML.

```bash
npm run build
```
Confirms there are no TypeScript errors in `blogPosts.ts` and (for non-draft posts) that
the new `/blog/<slug>/` URL appears in the generated `dist/sitemap.xml`.

## Worked example

Draft from the author:

> Today I finally fixed the flaky CI job. Turned out the test runner was racing against a
> Docker container that hadn't finished booting. I added a health check loop before the
> test suite starts, and it's been green for a week now. Lesson: never assume a container
> is ready just because `docker run` returned.

Becomes:

```ts
{
  slug: 'fixing-the-flaky-ci-job',
  title: 'Fixing the flaky CI job',
  date: '2026-07-20',
  tags: ['ci-cd', 'docker', 'testing'],
  excerpt:
    'A flaky CI job turned out to be a race between the test runner and a Docker container that hadn\'t finished booting — fixed with a health check loop.',
  readingMinutes: 1,
  content: `
    <p>
      Today I finally fixed the flaky CI job. Turned out the test runner was racing
      against a Docker container that hadn't finished booting.
    </p>
    <p>
      I added a health check loop before the test suite starts, and it's been green for
      a week now.
    </p>
    <p>
      <strong>Lesson:</strong> never assume a container is ready just because
      <code>docker run</code> returned.
    </p>
  `,
},
```
