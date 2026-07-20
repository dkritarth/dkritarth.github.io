import type { BlogPost } from './types';

/** Build a public URL for a blog asset under `public/data/blog/<slug>/`. */
export function blogImagePath(slug: string, file: string): string {
  return `/data/blog/${slug}/${encodeURIComponent(file)}`;
}

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/**
 * Format an ISO `YYYY-MM-DD` date as e.g. `Jul 20, 2026`, without going through
 * `Date` (and its local-timezone shifting). Falls back to the raw input if the
 * string doesn't match the expected pattern.
 */
export function formatBlogDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const [, year, month, day] = match;
  const monthName = MONTH_NAMES[Number(month) - 1];
  if (!monthName) return iso;
  return `${monthName} ${Number(day)}, ${year}`;
}

/**
 * Blog posts, newest first is NOT required in this array — use `getPublishedPosts()`
 * for a sorted, non-draft list. Drop images into `public/data/blog/<slug>/` and
 * reference them with `blogImagePath(slug, file)` via the `hero` field.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'context-kernel-self-hostable-context-memory-for-llms',
    title: 'Building context-kernel: a self-hostable context-memory server for LLMs',
    date: '2026-07-20',
    tags: ['llm-tooling', 'infrastructure', 'mcp', 'cloudflare'],
    excerpt:
      'Why I built a remote MCP server for hand-curated context instead of relying on ad-hoc copy-pasted prompts, and how a two-token security model keeps a publicly reachable memory store safe.',
    readingMinutes: 5,
    content: `
      <p>
        Every LLM session I run — research notes for the Peng lab's GNN work, OralScan
        engineering decisions, PhD application context — starts the same way: I re-explain
        things the model should already know. Lab conventions, project structure, decisions
        I made three weeks ago and don't want to re-litigate. Copy-pasting the same context
        block into every new chat gets old fast, and it doesn't scale across Claude Code,
        Claude Desktop, and the web chat at once.
      </p>
      <p>
        That's the problem <strong>context-kernel</strong> solves: a small, self-hostable
        <a href="https://modelcontextprotocol.io/" target="_blank" rel="noopener">MCP</a>
        server that serves hand-curated context to whatever client asks for it, over HTTP,
        with real auth. It runs on Cloudflare Workers with KV for storage — no database to
        provision, no server to patch, and it scales to zero when I'm not using it.
      </p>
      <h2>Why not just use a vector store</h2>
      <p>
        Most "memory for LLMs" projects default to embeddings and semantic search. I didn't
        want that. Retrieval-augmented memory is great for large unstructured corpora, but
        my context is small, high-value, and I already know exactly what's in it — a few
        sections on active research projects, a journal of dated entries, and some
        environment facts. What I needed was closer to a config file the model can read on
        demand than a search index it has to guess against. So context-kernel exposes
        <code>sections</code> and a dated <code>journal</code> as plain MCP tools:
        <code>get_context</code>, <code>list_sections</code>, <code>get_meta</code>,
        <code>append_journal</code>, <code>list_journal</code>. No embeddings, no ranking,
        no surprises about what got retrieved.
      </p>
      <h2>The security model</h2>
      <p>
        A memory server that's reachable from the public internet is only as good as its
        access control. I settled on a two-token model instead of a single shared secret:
      </p>
      <ul>
        <li><strong>Bearer token</strong> for read/write tool calls from trusted clients (Claude Code, my own scripts).</li>
        <li><strong>OAuth flow</strong> for Claude Desktop and chat, so it can be authorized per-device without me distributing a raw secret.</li>
      </ul>
      <p>
        Writes also go through a manual promotion gate — anything appended via
        <code>append_journal</code> lands in a staging area first, and I promote it into the
        canonical sections myself. That one design choice has mattered more than the
        authentication layer: it means the model can propose updates to its own memory, but
        it can't silently corrupt it.
      </p>
      <h3>What's next</h3>
      <p>
        The current version is live and verified end-to-end for both auth paths. Next up is
        journal search that's still index-free — grep-style filtering by date range and
        tag — and a small CLI for editing sections without going through the API directly.
      </p>
      <hr />
      <p>
        <em>Code and setup instructions are on
        <a href="https://github.com/dkritarth/context-kernel" target="_blank" rel="noopener">GitHub</a>.
        If you're building something similar on Workers, the
        <a href="https://dkritarth.github.io/context-kernel/" target="_blank" rel="noopener">project site</a>
        has the architecture write-up.</em>
      </p>
    `,
  },
];

/** Posts with `draft` falsy, sorted by `date` descending (newest first), tie-broken by slug. */
export function getPublishedPosts(): BlogPost[] {
  return BLOG_POSTS.filter((post) => !post.draft).sort((a, b) => {
    const byDate = b.date.localeCompare(a.date);
    if (byDate !== 0) return byDate;
    return a.slug.localeCompare(b.slug);
  });
}

/** Find a single post by its `slug`, regardless of draft status. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
