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
  {
    slug: 'ai-has-changed-me',
    title: 'AI has changed me.',
    date: '2026-11-06',
    tags: ['ai', 'learning', 'coding', 'phd'],
    excerpt:
      'Speed got me hooked on AI. Then I noticed I was handing over the thinking too, and I had to change how I used it.',
    readingMinutes: 10,
    content: `
      <p>
        I'm writing this because I've noticed AI has changed how I think as well as how I
        work, and I wasn't happy about all of it. This is how I got here and what I'm doing
        differently now.
      </p>
      <p>
        I started dabbling with AI around the start of my undergrad, in fall 2023. Like most
        people, I started with <a href="https://chatgpt.com/" target="_blank" rel="noopener">ChatGPT</a>.
        It wasn't that good. It hallucinated a lot, and I still had to type most of my code
        myself.
      </p>
      <p>
        I remember it couldn't solve some of the harder object-oriented questions in one of
        my assignments. I had strong fundamentals in Java, so object-oriented programming came
        naturally to me. I could design those class structures without much trouble, and the
        model couldn't.
      </p>
      <p>
        It helped here and there. It wrote some emails and did small bits of work, but other
        than that it was pretty unusable, at least by today's standards. The next year wasn't
        much different. It was still a chatbot, just a bit smarter.
      </p>

      <h2>I always loved speed</h2>
      <p>
        Things changed for me in summer 2025, when I got access to
        <a href="https://cursor.com/" target="_blank" rel="noopener">Cursor</a>. It was the
        first proper harness for these models I'd used, and it was the first time I saw them
        move faster than I could.
      </p>
      <p>
        The code wasn't good. It was mostly slop. The codebase got complicated fast, full of
        comments and errors. But there was speed in it, and I have always loved speed.
      </p>
      <p>
        Every time I took a course on
        <a href="https://www.udemy.com/" target="_blank" rel="noopener">Udemy</a> or
        <a href="https://www.coursera.org/" target="_blank" rel="noopener">Coursera</a>, I
        finished it as fast as I could. I once finished two month-long courses in about two
        weeks by watching at 2x and grinding five to six hours a day, on top of everything
        else on my schedule. To be fair, it was an addiction. That's why I was so fond of
        Cursor, and why I gave it a real shot.
      </p>
      <p>
        As the models got smarter my workflow improved, but it didn't change much. I knew what
        had to be done, I told it exactly that, and it more or less got me the result. I knew
        how to start the server, which file to edit, what the algorithm was and what logic we
        were using. That lasted about six months, until around December 2025 or January 2026.
      </p>

      <h2>The thinking started slipping away</h2>
      <p>
        I never used ChatGPT much after that. For coding I used Cursor, and for understanding
        things I used <a href="https://gemini.google.com/" target="_blank" rel="noopener">Gemini</a>.
        I love Gemini. It's been kind of the worst model I've used for coding, but it's the
        only reason I understood my quantum computing course well enough to get a decent grade.
        No other model I tried could explain those ideas simply enough to make them click. I
        have a soft spot for it because of that.
      </p>
      <p>
        From February 2026 on, something shifted. I was still thinking about what I was doing.
        I knew how to set up nginx and Apache servers and how to lock them down. I was still
        Googling things and giving exact instructions. But the flow was slowly slipping out of
        my hands.
      </p>
      <p>
        For a reinforcement learning project we had to build some complicated algorithms, and I
        had the model write them without thinking much about it myself. In my research, one of
        my tasks was to check whether a method was actually working. I wrote a lot of tests for
        it: whether the gradient was flowing, whether we got the right value at
        <code>x = 0</code>, whether message passing in the graph happened correctly. But I
        didn't really think about the algorithm itself.
      </p>
      <p>
        I was busy with PhD applications and schoolwork, so I told myself that was fine. I
        said I was thinking about the bigger picture instead. Then I realized I wasn't doing
        that either. I was giving my thinking away to Cursor, Gemini or whatever else was open,
        and it took me a while to see it.
      </p>
      <p>
        I still understood things. I've been learning Java since seventh grade, so I didn't
        feel detached from the systems I was building. But the core part of the thinking was
        going to the models.
      </p>
      <p>
        By graduation I didn't like where this was going. I was starting my PhD in the fall,
        and I told myself, "Okay, I need to level up. I need to understand things better than
        this." That's when things changed.
      </p>

      <h2>Someone to argue with</h2>
      <p>
        By the end of my second year of undergrad I'd finished most of the common online
        courses: React, machine learning, deep learning, Android, Django, Next.js. After that I
        mostly learned from YouTube, watching people nerd out about libraries, how certain
        routines work and how they build systems.
      </p>
      <p>
        Very few of them seemed to understand AI systems deeply, though. And I had a bad habit
        of trusting a video only if it had half a million or a million views. So I ended up
        thinking about AI the way most people thought about it.
      </p>
      <p>
        The video that clicked for me was
        <a href="https://www.youtube.com/watch?v=-QFHIoCo-Ko" target="_blank" rel="noopener">Matt Pocock's walkthrough of how he uses Claude Code</a>.
        It showed me how wrong I'd been, because there are two ways to use these systems:
      </p>
      <ol>
        <li>Make them do your work.</li>
        <li>Use them to fill your head with new information, and make them do the most boring part of the work.</li>
      </ol>
      <p>
        In that video he uses his
        <a href="https://github.com/mattpocock/skills" target="_blank" rel="noopener"><code>grill-me</code> skill</a>.
        Most people, me included, work like this: send a prompt, wait, send another prompt to
        fix the bugs, send another one. We never sit down for half an hour and actually think
        about the problem.
      </p>
      <p>
        Matt sits down. The skill keeps questioning you about what you want the agent to build
        or write. You spend 40 or 45 minutes answering hard questions and making decisions you
        wouldn't even notice if you were just writing code, or just prompting an agent to write
        it. Honestly, it's the best thing I've gotten out of these systems.
      </p>
      <p>Here's what we forget about writing code ourselves. We:</p>
      <ol>
        <li>Write a little bit.</li>
        <li>Think about how to connect the rest to what we just wrote.</li>
        <li>Write that.</li>
        <li>Maybe delete it.</li>
        <li>Restructure it in our heads, and learn a lot about the system while doing that.</li>
      </ol>
      <p>
        What do we add? What do we remove? Are we using only the sign of the gradient, or its
        magnitude too? Writing the code is where we actually learn the topic.
      </p>
      <p>
        When you prompt "Make this work. Make the gradient work," you get a result, and it
        might even be a good one. But that's where the thinking stops. <code>grill-me</code>
        puts that control back in your head and makes you think. It's hard.
      </p>
      <p>
        The first time you use it, you get bored and want to say, "Fine, just do whatever you
        suggested." Don't. Argue with it. That's the best thing about these systems right now.
        You have something you can argue with 24/7, and it never gets tired of your stupid
        questions.
      </p>
      <p>
        That's how I use AI in my PhD work now. Most of the time I'm not asking it to do
        things. I'm arguing with it about a topic. Early on I'm not that familiar with an area,
        so it helps me pull information out of papers, and arguing with it for hours teaches
        me more than asking for a summary ever did.
      </p>
      <p>
        Most of what I see online treats AI as a way to get a job done faster. I want to use it
        to go deeper into the job and do more of it. That was the first thing that clicked.
      </p>

      <h2>Then let it work</h2>
      <p>
        The second thing is about what happens after you've done the thinking. We're too
        attached to the things we build and the code we write, and even to watching it all
        happen. <a href="https://www.youtube.com/@t3dotgg" target="_blank" rel="noopener">Theo Browne</a>
        changed that for me. I started watching him a lot this summer, and it shifted how I
        work.
      </p>
      <p>
        Why do we send a prompt and then sit in the thread watching it? Are we reading the
        chain of thought? Most of the time we aren't even seeing the real thing. OpenAI, for
        example,
        <a href="https://developers.openai.com/api/docs/guides/reasoning#reasoning-summaries" target="_blank" rel="noopener">shows reasoning summaries, not the raw reasoning tokens</a>.
        Watching that text scroll by doesn't mean I'm checking the work.
      </p>
      <p>
        I wait because I want to feel connected to it, and because it looks cool. That was
        another habit I had to drop. Now I send a prompt, leave the thread, think about
        something else and come back later to review. I like having five or six things going
        at once, so I keep thinking while the models work.
      </p>
      <p>
        <a href="https://t3.codes/" target="_blank" rel="noopener">T3 Code</a> is the best
        thing I've found for working this way. I honestly don't know how people use the regular
        ChatGPT or Claude apps. For me they feel slow and buggy. Finding an old chat, going back
        to argue with it or adding skills properly all feels clunky.
      </p>
      <p>
        T3 Code takes a mindset shift, though. The thread list on the left works like an inbox.
        Threads come in when they're done, and you reply when you want to. Hit Enter and the
        thread moves into the working section, out of sight until it's ready.
      </p>
      <p>
        I think more people should treat agents this way. Send the work off, move on to the
        next thing, and keep thinking. You don't stop thinking. You think deeper and broader at
        the same time.
      </p>

      <h2>Going deeper</h2>
      <p>
        Thinking broadly used to be hard because building anything took so long. Now I get to
        do both. Recently I was debugging the gradients during backpropagation for a method I'm
        trying. I had an LLM track the gradient at every step, show me where backpropagation
        flipped the sign of particular elements, and find where in the graph that happened: the
        encoder, the decoder, the processor or the transformer processor.
      </p>
      <p>
        I would never have gone that deep into a model's gradient flow before. Setting it up
        and typing the code would have taken hours, and it might not have led anywhere.
      </p>
      <p>
        Instead, I argued with an agent using <code>grill-me</code> for 15 to 20 minutes about
        exactly what needed to be done. I sent it off, and 45 minutes later it came back with
        the code. Then it sent another agent to run it on the servers and bring back the
        results and plots. I got to go deeper into the architecture than I ever would have on
        my own.
      </p>
      <p>
        Yes, some people will use this to get the work done for them and stop there. Others
        will use it to dig into topics they never would have touched without it. I'd rather be
        in the second group.
      </p>
      <p>
        AI is here to stay, whatever we think about it. I think most of us need to find where
        it fits in our lives, whether we code, work in finance or do manual work. Find the areas
        where you can go deeper, and use it for that while the plans still feel this heavily
        subsidized.
      </p>
      <p>
        I'm still figuring out what works and what doesn't. Most of what I've learned came
        from watching a small group of people who really understand harnesses and how to build
        agents properly, not from what most people online think AI can do.
      </p>
      <p>
        I still love speed. But now I slow down to understand things first, and when I do, the
        speed afterwards feels a lot more satisfying. At least for how I work right now.
      </p>
    `,
  },
  {
    slug: 'muse-and-t3code-broke-me',
    title: 'Muse and T3 Code broke me.',
    date: '2026-11-06',
    tags: ['ai', 'personal-assistants', 't3code', 'research'],
    excerpt:
      'I connected my AI assistant to WhatsApp and T3 Code. Now experiments, emails and reminders leave my head before I even get off the bus.',
    readingMinutes: 5,
    content: `
      <p>
        If you know me, you know I've spent the past month talking about my personal AI
        assistant, Jarvis. That's the name I gave
        <a href="https://muse.ai/" target="_blank" rel="noopener">Muse, Meta's AI assistant app</a>.
        It has changed how I work, and I'm writing this because I think more people should try
        using one this way.
      </p>
      <p>
        The first time I installed Muse, I deleted it after two days. It was fine. It was a
        normal chatbot at the end of the day.
      </p>
      <p>
        Then I went further. I connected my tools and email accounts, and most importantly I
        connected it to WhatsApp. Now it can text me directly in the app I already open all day
        to talk to family and friends. That changed everything about how I use it.
      </p>

      <h2>It texts me where I already am</h2>
      <p>
        We're not perfect, and we don't follow schedules 24/7. Everyone could use a personal
        assistant, or a friend, who pushes them to do the work. Getting a text on the bus that
        says, "You're on the bus now. Have a look at this," hits differently. Should I read a
        paper, listen to a podcast or prepare for my meeting? What can I do with this time?
      </p>
      <p>
        I don't think many people use these systems like this yet. They still treat them as
        chatbots. I call mine a personal assistant, but what actually makes it useful is that
        it's a very good organization tool for the things I need to get done.
      </p>
      <p>
        I connected Muse to <a href="https://t3.codes/" target="_blank" rel="noopener">T3 Code</a>
        through T3 Connect, which lets me reach my T3 Code servers remotely through my account.
        With that, Muse can read the projects registered on my lab machines and personal
        machines, and send messages to them.
      </p>
      <p>
        So I can say, "Muse, run this on this machine using Opus 5.5 at medium reasoning," and
        it sends off an experiment, even if I'm only changing a single variable.
      </p>

      <h2>Out of my head and into a thread</h2>
      <p>
        Here's a real example. After a lab meeting, we decided something like, "We've only
        tried this on one set of samples. We need to run it on more samples and different
        dates."
      </p>
      <p>
        I don't go home, open a thread, copy the notes over and kick it off on the HPC servers.
        I text Muse from the bus on the way back:
      </p>
      <blockquote>
        <p>
          Go to this machine. It should have this project registered in T3 Code. I've already
          run an experiment with this many samples. I'd like to run it on four times as many
          to get the data out of it. All the data should be here. Send this task to Opus 5.5
          and run it.
        </p>
      </blockquote>
      <p>
        And it does. People focus on the time this saves. For me the bigger deal is getting the
        task out of my head and into a thread, an inbox I can come back to when I get to work.
      </p>
      <p>
        It goes past research too. I don't read through my email inbox anymore. Muse pings me
        in a side chat when there's an email I need to reply to today.
      </p>
      <p>
        I don't fill in every internship application by hand anymore either. Another side chat
        searches for internships every day at 7:30 pm. I open it, it shows me a couple, and I
        tell it to apply to the ones it can.
      </p>
      <p>
        Some sites block bots, so it can't apply to those. For the rest, I've given it my CV,
        how I write cover letters and my own notes on how I frame sentences when I email HR.
        It runs on a cloud computer with a browser, so it can navigate the site and fill things
        in itself.
      </p>
      <p>
        If you keep a to-do list app, try moving some of it into something more personal like
        Muse or Grok Bot. And if you're a researcher or a coder, try T3 Code. For how I work, it
        feels like I get ten times more out of it than any other app I've tried.
      </p>
      <p>
        Yes, Claude and ChatGPT keep adding work features. But if you know your way around code
        and SSH, you'll get a lot out of connecting T3 Code and Muse, then your email, and maybe
        even your finances, depending on how far you want to take it.
      </p>

      <h2>I didn't ask it to check my slides</h2>
      <p>
        I've told Muse to ping me about certain things, and if I don't reply in the app, to
        text me on WhatsApp instead, because I'll never ignore a WhatsApp notification. It
        got that.
      </p>
      <p>
        After two or three weeks, it had access to my slides in Google Drive and knew my
        calendar. It knew I had a meeting at 9 am and that I'm on the bus from 7:43 to 8:15.
        One morning it texted me during that ride. It had found a few things that might be wrong
        in my research slides and offered to look up papers to check them.
      </p>
      <p>
        I never asked it to do that. It saw I had an important biweekly meeting, found the
        slides, read them and flagged the issues. Then it said it would search for papers to
        back up my point, and it did.
      </p>

      <h2>Off my head</h2>
      <p>
        I've used a to-do app called
        <a href="https://ticktick.com/" target="_blank" rel="noopener">TickTick</a> since eighth
        grade, and my friends will swear I live my life by it. I log everything in there,
        whether I had lunch or dinner, whether I slept and for how many hours. I was happy with
        it. Muse just removed a bit more friction.
      </p>
      <p>
        Every night at 8:30 pm, I tell it what I did that day, what I didn't do and how much
        time I wasted. At the end of the week, it tells me exactly what I didn't get to. After
        a couple of weeks of that kind of feedback, you stop thinking of it as a chatbot.
      </p>
      <p>
        That's what broke me. Nothing sits in my head anymore waiting to be forgotten. It all lives in a thread somewhere, and I come back to it when
        I'm ready.
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
