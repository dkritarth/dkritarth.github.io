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
  {
    slug: 'claude-vs-gpt-debugging-a-flutter-wearable-crash',
    title: 'What a Flutter crash taught me about Claude vs. GPT on a language they barely know',
    date: '2026-07-21',
    tags: ['llm-comparison', 'debugging', 'flutter', 'claude'],
    excerpt:
      'A Play Store rejection led me to run the same debugging prompt through GPT-5.6 Luna and Claude Sonnet 5 on a Flutter/Kotlin codebase. Only one of them found the real bug.',
    readingMinutes: 3,
    hero: {
      src: blogImagePath(
        'claude-vs-gpt-debugging-a-flutter-wearable-crash',
        'claude-response.png',
      ),
      alt: "Claude Sonnet 5's first-shot diagnosis of the Wearable API crash, naming the exact root cause and the fix.",
    },
    content: `
      <p>
        I'm writing this because of something I found out while debugging someone else's code.
        I was given a repository for a Flutter application, and it had bugs that got it rejected
        from the Google Play Store because the app was crashing on launch. I installed it on my
        phone and it crashed there too, but on the developer's S21, the same build worked
        perfectly fine.
      </p>
      <p>
        The app is supposed to pair with a Watch and pull sensor data from it, so at first we
        didn't think much of it. When I got access to the repo, I just gave Claude a simple
        prompt to debug and find the issue. I thought this might take some time, because the
        last time I did a lot of mobile development, about a year to a year and a half ago, I
        was pretty good at it, and back then stuff like this took a while.
      </p>
      <p>
        I put the same prompt into GPT, GPT-5.6 Luna, and Claude Sonnet 5, basically the
        lower-tier models, to save on token pricing and not burn through my usage on either
        subscription. GPT, for some reason, did not understand the prompt I gave it and answered
        in a pretty weird way. It didn't quite grasp what I was trying to say. Claude, on the
        first shot, gave me a logical reason for why the issue might be happening, then guided
        me through actually debugging the app that was crashing on my phone.
      </p>
      <img src="${blogImagePath('claude-vs-gpt-debugging-a-flutter-wearable-crash', 'gpt-response.png')}" alt="GPT-5.6 Luna's response, describing a startup race around Amplify.configure() that has nothing to do with this codebase." />
      <p>
        Through ADB I pulled the logs, checked them against the code, and confirmed this was
        indeed the issue: a legacy <code>GoogleApiClient</code> hooked up to
        <code>Wearable.API</code> was getting initialized unconditionally in
        <code>MainActivity.onCreate()</code>, with no try/catch around it. On devices where the
        Wearable module itself isn't available, not just "no watch paired," that call throws and
        nothing catches it, so the process dies. The Play Store's test devices don't have a Wear
        OS watch paired, so it hit this every time. The developer's S21 happened to already have
        Wearable and Play Services state that tolerated the call, just luck of that one device's
        setup.
      </p>
      <img src="${blogImagePath('claude-vs-gpt-debugging-a-flutter-wearable-crash', 'verify-bugs.png')}" alt="Verifying the crash on-device over ADB. The pulled stack trace matches Claude's diagnosis exactly." />
      <p>
        I understand why Claude's pricing is so high, but looking at this example, it kind of
        justifies why they're charging so much, at least to some extent. My guess is OpenAI has
        trained its models heavily on JavaScript and other popular languages, while Dart and
        Flutter still aren't that big, so the data it has to draw on there is probably a lot
        thinner. Getting such different responses in the very first step, from two models that
        are both supposed to be frontier-ish, was pretty surprising.
      </p>
      <p>
        I want to thank Theo for building <a href="https://t3.chat/" target="_blank" rel="noopener">T3 Chat</a>,
        the open-source UI/UX that layers over these different harnesses. Using it has let me
        actually see the differences between models more clearly and adjust how I prompt each
        one. GPT, I've noticed, tends to be a better writer than Claude, but Claude will sit with
        a problem longer and actually land on the right answer faster, at least for how I work
        right now.
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
