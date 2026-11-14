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
    tags: ['ai', 'learning', 'coding', 'phd', 't3code', 'personal-assistants'],
    excerpt:
      'Speed got me hooked on AI. Then I noticed I was handing over my thinking too. This is how I changed the way I use it, from arguing with agents to letting an assistant run half my day.',
    readingMinutes: 15,
    content: `
      <p>
        I'm writing this because AI has changed how I think as well as how I work, and I
        wasn't happy about all of it. This is how I got here, what I had to unlearn, and what
        my days look like now.
      </p>
      <p>
        I started dabbling with AI around the start of my undergrad, in fall 2023. Like most
        people, I started with <a href="https://chatgpt.com/" target="_blank" rel="noopener">ChatGPT</a>.
        It wasn't that good. It hallucinated a lot, and I still had to type most of my code
        myself.
      </p>
      <p>
        I remember it couldn't solve some of the harder object-oriented questions in one of my
        assignments. I had strong fundamentals in Java, so object-oriented programming came
        naturally to me. I could design those class structures without much trouble. The model
        couldn't.
      </p>
      <p>
        It helped here and there. It wrote some emails and did small bits of work, but other
        than that it was pretty unusable, at least by today's standards. The next year wasn't
        much different. It was still a chatbot, just a bit smarter.
      </p>

      <h2>I always loved speed</h2>
      <p>
        Things changed in summer 2025, when I got access to
        <a href="https://cursor.com/" target="_blank" rel="noopener">Cursor</a>. It was the
        first proper harness for these models I'd used, and the first time I watched them move
        faster than I could.
      </p>
      <p>
        The code wasn't good. Most of it was slop. The codebase got complicated fast, full of
        comments and errors. But there was speed in it, and I have always loved speed.
      </p>
      <p>
        Every time I took a course on
        <a href="https://www.udemy.com/" target="_blank" rel="noopener">Udemy</a> or
        <a href="https://www.coursera.org/" target="_blank" rel="noopener">Coursera</a>, I
        finished it as fast as I could. I once got through two month-long courses in about two
        weeks by watching at 2x and grinding five to six hours a day, on top of everything else
        on my schedule. To be fair, it was an addiction. That's why I liked Cursor so much, and
        why I gave it a real shot.
      </p>
      <p>
        As the models got smarter my workflow got better, but it didn't change much. I knew
        what had to be done, I told it exactly that, and it more or less got me the result. I
        knew how to start the server, which file to edit, what the algorithm was and what logic
        we were using. That lasted about six months, until around December 2025 or January 2026.
      </p>

      <h2>The thinking started slipping away</h2>
      <p>
        I barely touched ChatGPT after that. For coding I used Cursor, and for understanding
        things I used <a href="https://gemini.google.com/" target="_blank" rel="noopener">Gemini</a>.
        I love Gemini. It's been kind of the worst model I've used for coding, but it's the only
        reason I understood my quantum computing course well enough to get a decent grade. No
        other model I tried could explain those ideas simply enough to make them click. I have a
        soft spot for it because of that.
      </p>
      <p>
        From February 2026 on, something shifted. I was still thinking about what I was doing. I
        knew how to set up nginx and Apache servers and how to lock them down. I was still
        Googling things and giving exact instructions. But the flow was slowly slipping out of my
        hands.
      </p>
      <p>
        For a reinforcement learning project we had to build some complicated algorithms, and I
        had the model write them without thinking much about it myself. In my research, one of my
        tasks was to check whether a method actually worked. I wrote a lot of tests for it. Was
        the gradient flowing? Did we get the right value at <code>x = 0</code>? Was message
        passing in the graph happening correctly? I never really thought about the algorithm
        itself.
      </p>
      <p>
        I was busy with PhD applications and schoolwork, so I told myself that was fine. I said I
        was thinking about the bigger picture instead. Then I realized I wasn't doing that either.
        I was giving my thinking away to Cursor, Gemini or whatever else was open, and it took me
        a while to notice.
      </p>
      <p>
        I still understood things. I've been learning Java since seventh grade, so I didn't feel
        detached from what I was building. But the core of the thinking was going to the models.
      </p>
      <p>
        By graduation I didn't like where this was going. I was starting my PhD in the fall, and
        I told myself, "Okay, I need to level up. I need to understand things better than this."
        That's when things changed.
      </p>

      <h2>Someone to argue with</h2>
      <p>
        By the end of my second year of undergrad I'd finished most of the common online courses
        in React, machine learning, deep learning, Android, Django and Next.js. After that I mostly
        learned from YouTube, watching people nerd out about libraries, how certain routines work
        and how they build systems.
      </p>
      <p>
        Very few of them seemed to understand AI systems deeply, though. I also had a bad habit
        of only trusting a video if it had half a million or a million views. So I ended up
        thinking about AI the way most people thought about it.
      </p>
      <p>
        The video that clicked for me was
        <a href="https://www.youtube.com/watch?v=-QFHIoCo-Ko" target="_blank" rel="noopener">Matt Pocock's walkthrough of how he uses Claude Code</a>.
        It showed me how wrong I'd been. There are two ways to use these systems.
      </p>
      <ol>
        <li>Make them do your work.</li>
        <li>Use them to fill your head with new information, and make them do the most boring part of the work.</li>
      </ol>
      <p>
        In that video he uses his
        <a href="https://github.com/mattpocock/skills" target="_blank" rel="noopener"><code>grill-me</code> skill</a>.
        Most people, me included, work in a loop. Send a prompt, wait, send another prompt to fix
        the bugs, send another one. We never sit down for half an hour and actually think about
        the problem.
      </p>
      <p>
        Matt sits down. The skill keeps questioning you about what you want the agent to build or
        write. You spend 40 or 45 minutes answering hard questions and making decisions you
        wouldn't even notice if you were writing the code yourself, let alone prompting an agent
        to write it. Honestly, it's the best thing I've gotten out of these systems.
      </p>
      <p>Here's what we forget about writing code by hand. We:</p>
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
        When you prompt "Make this work. Make the gradient work," you get a result, and it might
        even be a good one. That's where the thinking stops. <code>grill-me</code> puts that
        control back in your head and makes you think. It's hard.
      </p>
      <p>
        The first time you use it, you get bored and want to say, "Fine, just do whatever you
        suggested." Don't. Argue with it. That's the best thing about these systems right now.
        You have something you can argue with 24/7, and it never gets tired of your stupid
        questions.
      </p>
      <p>
        That's how I use AI in my PhD work now. Most of the time I'm not asking it to do things.
        I'm arguing with it about a topic. Early on I don't know an area that well, so it helps
        me pull information out of papers, and hours of arguing teach me more than any summary
        ever did.
      </p>
      <p>
        Most of what I see online treats AI as a way to get a job done faster. I want to use it
        to go deeper into the job and do more of it. That was the first thing that clicked.
      </p>

      <h2>Then let it work</h2>
      <p>
        The second thing is about what happens after you've done the thinking. We're too attached
        to the things we build and the code we write, and even to watching it all happen.
        <a href="https://www.youtube.com/@t3dotgg" target="_blank" rel="noopener">Theo Browne</a>
        changed that for me. I started watching him a lot this summer, and it shifted how I work.
      </p>
      <p>
        Why do we send a prompt and then sit in the thread watching it? Are we reading the chain
        of thought? Most of the time we aren't even seeing the real thing. OpenAI, for example,
        <a href="https://developers.openai.com/api/docs/guides/reasoning#reasoning-summaries" target="_blank" rel="noopener">shows reasoning summaries, not the raw reasoning tokens</a>.
        Watching that text scroll by doesn't mean I'm checking the work.
      </p>
      <p>
        I waited because I wanted to feel connected to it, and because it looks cool. That was
        another habit I had to drop. Now I send a prompt, leave the thread, think about something
        else and come back later to review. I like having five or six things going at once, so I
        keep thinking while the models work.
      </p>
      <p>
        <a href="https://t3.codes/" target="_blank" rel="noopener">T3 Code</a> is the best thing
        I've found for working this way. I honestly don't know how people use the regular ChatGPT
        or Claude apps. For me they feel slow and buggy. Finding an old chat, going back to argue
        with it or adding skills properly all feels clunky.
      </p>
      <p>
        T3 Code takes a mindset shift, though. The thread list on the left works like an inbox.
        Threads come in when they're done, and you reply when you want to. Hit Enter and the
        thread moves into the working section, out of sight until it's ready.
      </p>
      <p>
        Send the work off, move on to the next thing, and keep thinking. You don't stop thinking.
        You think deeper and broader at the same time.
      </p>

      <h2 id="muse">Then Muse and T3 Code broke me</h2>
      <p>
        If you know me, you know I've spent the past month talking about my personal AI
        assistant, Jarvis. That's the name I gave
        <a href="https://muse.ai/" target="_blank" rel="noopener">Muse, Meta's AI assistant app</a>.
        It took the inbox idea out of my laptop and into the rest of my day.
      </p>
      <p>
        The first time I installed Muse, I deleted it after two days. It was fine. It was a normal
        chatbot at the end of the day.
      </p>
      <p>
        Then I went further. I connected my tools and email accounts, and most importantly I
        connected it to WhatsApp. Now it texts me in the app I already have open all day to talk
        to family and friends. That changed how I use it completely.
      </p>
      <p>
        We're not perfect, and we don't follow schedules 24/7. Everyone could use a personal
        assistant, or a friend, who pushes them to do the work. Getting a text on the bus that
        says, "You're on the bus now. Have a look at this," hits differently. Should I read a
        paper, listen to a podcast or prepare for my meeting? What can I do with this time?
      </p>
      <p>
        I don't think many people use these systems like this yet. They still treat them as
        chatbots. I call mine a personal assistant, but what makes it useful is that it's a very
        good organization tool for the things I need to get done.
      </p>
      <p>
        I connected Muse to T3 Code through T3 Connect, which lets me reach my T3 Code servers
        remotely through my account. With that, Muse can read the projects registered on my lab
        machines and personal machines, and send messages to them. So I can say, "Muse, run this
        on this machine using Opus 5.5 at medium reasoning," and it sends off an experiment, even
        if I'm only changing a single variable.
      </p>

      <h2>Out of my head and into a thread</h2>
      <p>
        Here's a real example. After a lab meeting, we decided something like, "We've only tried
        this on one set of samples. We need to run it on more samples and different dates."
      </p>
      <p>
        I don't go home, open a thread, copy the notes over and kick it off on the HPC servers. I
        text Muse from the bus on the way back.
      </p>
      <blockquote>
        <p>
          Go to this machine. It should have this project registered in T3 Code. I've already run
          an experiment with this many samples. I'd like to run it on four times as many to get
          the data out of it. All the data should be here. Send this task to Opus 5.5 and run it.
        </p>
      </blockquote>
      <p>
        And it does. People focus on the time this saves. For me the bigger deal is getting the
        task out of my head and into a thread I can come back to when I get to work.
      </p>
      <p>
        It goes past research too. I don't read through my email inbox anymore. Muse pings me in
        a side chat when there's an email I need to reply to today.
      </p>
      <p>
        I don't fill in every internship application by hand anymore either. Another side chat
        searches for internships every day at 7:30 pm. I open it, it shows me a couple, and I tell
        it to apply to the ones it can.
      </p>
      <p>
        Some sites block bots, so it can't apply to those. For the rest, I've given it my CV, how
        I write cover letters and my own notes on how I frame sentences when I email HR. It runs
        on a cloud computer with a browser, so it can navigate the site and fill things in itself.
      </p>
      <p>
        If you keep a to-do list app, try moving some of it into something more personal like
        Muse or Grok Bot. And if you're a researcher or a coder, try T3 Code. For how I work, it
        feels like I get ten times more out of it than out of any other app I've tried.
      </p>
      <p>
        Yes, Claude and ChatGPT keep adding work features. But if you know your way around code
        and SSH, you'll get a lot out of connecting T3 Code and Muse, then your email, and maybe
        even your finances, depending on how far you want to take it.
      </p>

      <h2>I didn't ask it to check my slides</h2>
      <p>
        I've told Muse to ping me about certain things, and if I don't reply in the app, to text
        me on WhatsApp instead, because I'll never ignore a WhatsApp notification. It got that.
      </p>
      <p>
        After two or three weeks, it had access to my slides in Google Drive and knew my calendar.
        It knew I had a meeting at 9 am and that I'm on the bus from 7:43 to 8:15. One morning it
        texted me during that ride. It had found a few things that might be wrong in my research
        slides and offered to look up papers to check them.
      </p>
      <p>
        I never asked it to do that. It saw I had an important biweekly meeting, found the
        slides, read them and flagged the issues. Then it said it would search for papers to back
        up my point, and it did.
      </p>

      <h2>Going deeper</h2>
      <p>
        Thinking broadly used to be hard because building anything took so long. Now I get to do
        both. Recently I was debugging the gradients during backpropagation for a method I'm
        trying. I had an LLM track the gradient at every step, show me where backpropagation
        flipped the sign of particular elements, and find where in the graph that happened. Was it
        the encoder, the decoder, the processor or the transformer processor?
      </p>
      <p>
        I would never have gone that deep into a model's gradient flow before. Setting it up and
        typing the code would have taken hours, and it might not have led anywhere.
      </p>
      <p>
        Instead, I argued with an agent using <code>grill-me</code> for 15 to 20 minutes about
        exactly what needed to be done. I sent it off, and 45 minutes later it came back with the
        code. Then it sent another agent to run it on the servers and bring back the results and
        plots. I got to go deeper into the architecture than I ever would have on my own.
      </p>
      <p>
        Yes, some people will use this to get the work done for them and stop there. Others will
        use it to dig into topics they never would have touched without it. I'd rather be in the
        second group.
      </p>
      <p>
        AI is here to stay, whatever we think about it. I think most of us need to find where it
        fits in our lives, whether we code, work in finance or do manual work. Find the areas
        where you can go deeper, and use it for that while the plans still feel this heavily
        subsidized.
      </p>

      <h2>Still figuring it out</h2>
      <p>
        I've used a to-do app called
        <a href="https://ticktick.com/" target="_blank" rel="noopener">TickTick</a> since eighth
        grade, and my friends will swear I live my life by it. I log everything in there, whether
        I had lunch or dinner, whether I slept and for how many hours. I was happy with it. Muse
        removed a bit more friction.
      </p>
      <p>
        Every night at 8:30 pm, I tell it what I did that day, what I didn't do and how much time
        I wasted. At the end of the week, it tells me exactly what I didn't get to. After a couple
        of weeks of that kind of feedback, you stop thinking of it as a chatbot. Nothing sits in my
        head anymore waiting to be forgotten. It lives in a thread somewhere, and I come back to
        it when I'm ready.
      </p>
      <p>
        I'm still figuring out what works and what doesn't. Most of what I've learned came from
        watching a small group of people who really understand harnesses and how to build agents
        properly. That has taught me far more than what most people online think AI can do.
      </p>
      <p>
        I still love speed. But now I slow down to understand things first, and when I do, the
        speed afterwards feels a lot more satisfying. At least for how I work right now.
      </p>
    `,
  },
  {
    slug: 'tokenomics-and-data',
    title: 'Tokenomics and data',
    date: '2026-11-13',
    tags: ['ai', 'tokenomics', 'data', 'privacy'],
    excerpt:
      'A $20 AI subscription buys hundreds of dollars of inference at API prices, and your chats are worth far less to AI labs than you think. A rough guide to the economics, and why you should learn these tools while they are cheap.',
    readingMinutes: 14,
    content: `
      <p>
        Hi. If you're reading this, there's a good chance I sent you this link. I wrote it for
        conversations where I'm talking about AI, metrics or the money behind it, and I can tell
        the other person isn't quite following. This is my shortcut: a summary you can read on
        your own time, so we can pick the conversation back up later.
      </p>
      <p>
        If you found this page on your own, thank you for reading. What follows is a rough summary
        of what I've learned over the past few months digging into AI companies and their
        economics. I also cover how the business side of these companies affects you, and how you
        can use it to your advantage.
      </p>
      <p>I'll cover two things: tokenomics, and your data. Here's the short version first.</p>
      <ul>
        <li>
          A $20 subscription buys hundreds of dollars of inference at API prices. That works because
          inference margins are high, most subscribers underuse their limits, and companies pay
          full price.
        </li>
        <li>
          You won't get that deal at work. Learn the tools now, while your mistakes are cheap.
        </li>
        <li>
          Don't judge a model by its sticker price. Most of what an agent reads comes from cache,
          billed at a tenth of the input price or less. Smarter models usually end up cheaper, so
          use them.
        </li>
        <li>Working outside peak hours gets you more usage. Use them.</li>
        <li>
          Your chats aren't what makes models smarter. Turn the training toggle off if you want, but
          your data isn't the product here. Your subscription is.
        </li>
      </ul>

      <h2>Part 1: Tokenomics</h2>
      <p>
        "Tokenomics" has been thrown around a lot over the past couple of months. People use it to
        talk about how many tokens they burn, what a token even is, and what tokens cost. Most
        people don't really understand it, so let me start with a simple question.
      </p>

      <h3>What does a $20 subscription actually buy you?</h3>
      <p>
        Say you pay $20 a month for <a href="https://chatgpt.com/pricing" target="_blank" rel="noopener">ChatGPT</a>
        or <a href="https://claude.com/pricing" target="_blank" rel="noopener">Claude</a>. How much
        inference do you think you get out of it? $20? $100? $200?
      </p>
      <p>
        Look at the figures people have reported for their own usage. Track which models you call
        and how many tokens you spend, then price that at API rates. A $20 subscription gets you
        roughly <strong>$400 to $700</strong> worth of API usage. My own numbers match that.
      </p>

      <h3>So how are they not losing money?</h3>
      <p>
        This is where most people get it wrong. API prices are not what it costs these companies to
        run inference. They are what the companies charge, and the companies need to make a profit.
      </p>
      <p>
        Nobody outside these companies knows the exact numbers. But analyst estimates of API margins
        are very high.
        <a href="https://cryptobriefing.com/anthropic-inference-margins-semianalysis-88-percent/" target="_blank" rel="noopener">SemiAnalysis</a>
        puts Anthropic's inference margin as high as 88%, and
        <a href="https://finance.biggo.com/news/173039423dab79be" target="_blank" rel="noopener">another estimate</a>
        puts the blended API gross margin above 90%. Take the rough version of that. If they charge
        you $100 at API rates, the compute to serve it costs them somewhere around $5 to $10.
      </p>
      <p>
        At those margins, $400 of usage at API prices costs the company about $20 to $40 to serve.
        That's close to what you pay, but not quite. Heavy users who stretch a Claude subscription
        to around $700 of usage cost $35 to $70 to serve, more than their $20. So on its own, the
        margin doesn't explain it. Three more things close the gap.
      </p>
      <ol>
        <li>
          <strong>Most people don't use their full limit.</strong> I try to max out my subscription.
          If I have limits left near the end of the week, I throw them at random tasks. Most people
          don't do that. My mom uses maybe 20% of her limit in a typical week, and some weeks she
          doesn't touch it at all because she's on vacation. Light users pay for heavy users.
        </li>
        <li>
          <strong>Companies pay full price.</strong> Many businesses can't have their data stored on
          Anthropic's or OpenAI's servers at all. They sign
          <a href="https://platform.claude.com/docs/en/manage-claude/api-and-data-retention" target="_blank" rel="noopener">zero data retention (ZDR)</a>
          contracts and pay API prices, maybe with a 20 to 30% discount depending on how big the
          contract is. If I do $400 of inference on my $20 subscription, the same work at a company
          costs that company about $400.
        </li>
        <li>
          <strong>Compute outside peak hours is nearly free for them.</strong> More on that below.
        </li>
      </ol>
      <p>
        Put together, light users and companies paying full price cover the heavy users. The subscription
        is priced for the average subscriber, not for people like me.
      </p>

      <h3>Learn it now, while it's cheap</h3>
      <p>
        That gap is the whole point. On a subsidized subscription, I have room to play. I can try a
        new model like <a href="https://www.anthropic.com/claude/fable" target="_blank" rel="noopener">Claude Fable 5.2</a>
        and burn tokens on it. I can throw it at a useless task to see what happens, and it costs
        me almost nothing. I couldn't do that at a company, where every token is billed at the full
        rate.
      </p>
      <p>
        So if you're a student, or anyone on a subsidized subscription, learn to use it well
        <em>now</em>, while it's cheap. Don't wait until your company is paying full price for
        your mistakes.
      </p>
      <p>
        Some of my friends, and plenty of people online, are still very strict about AI. They
        haven't gone deep, and they say they'll try it when they have real work to do. That's
        backwards. Try it now, so that when the real work comes, you already know what you're doing.
      </p>
      <p>
        Picture two people at the same company, each with $1,000 of inference. One has spent months
        experimenting and gets a lot of work out of that $1,000. The other is still failing, still
        writing the wrong prompts, and gets far less out of the same money. The company will notice.
        At the end of the day, AI is a tool you pay for to get more done. It's an expensive tool.
        Agent runs that go for days cost real money. But if you tune things well and set up the
        right environment, it works very well, and you need to learn how to do that.
      </p>

      <h3>My last 30 days</h3>
      <img
        src="${blogImagePath('tokenomics-and-data', 'usage-last-30-days.png')}"
        alt="Usage dashboard for the last 30 days: $3,416.35 estimated cost at API prices across 2,260 sessions. Claude Code $1,559.89, Antigravity $1,147.17, Codex $673.75, OpenCode $35.53. 14.6B processed tokens, of which 13.8B were cached input, and $22,859.31 in cache savings."
      />
      <p>
        Here's my own usage for roughly the last 30 days. At API prices, it says I spent
        <strong>$3,416.35</strong> on inference across 2,260 sessions in
        <a href="https://claude.com/product/claude-code" target="_blank" rel="noopener">Claude Code</a>,
        <a href="https://antigravity.google/" target="_blank" rel="noopener">Antigravity</a>,
        <a href="https://openai.com/codex/" target="_blank" rel="noopener">Codex</a> and
        <a href="https://opencode.ai/" target="_blank" rel="noopener">OpenCode</a>.
      </p>
      <p>
        That number looks scary, and yes, a lot of it is me burning tokens. Because I get these
        subsidies, I've been using them to learn how to use these tools as well as I can. That
        meant a lot of experiments, and some of it was wasteful. But that waste is how I learned
        to get every dollar of value out of the subscriptions we're given. Here's what I actually
        pay:
      </p>
      <ul>
        <li>
          <strong>Claude:</strong> a $20 Pro subscription. When I have more work, I add a second
          account, so $40 at most.
        </li>
        <li>
          <strong>ChatGPT:</strong> $20 a month, which OpenAI gave me free for four months as a
          student.
        </li>
        <li><strong>Gemini:</strong> a free year through a student offer.</li>
        <li><strong>OpenCode:</strong> I only use the free models when I need to test something.</li>
      </ul>
      <p>
        So I pay about $20 to $40 a month for the subsidized usage, and I get real work out of it.
        If you don't learn to do this, I think you'll get left behind.
      </p>

      <h3>The sticker price isn't what you pay</h3>
      <p>
        Every model launch comes with a headline price, like $5 per million input tokens and $20 per
        million output tokens. People see a new model cost $5 more and decide it's too expensive.
        That price is not what you actually end up paying.
      </p>
      <p>
        Look at the "Cost by type" bar in my screenshot. Fresh input cost $528 and output cost
        $669, about a third of the total. The other two thirds is caching: $1,561 of cache reads
        and $658 of cache writes. Of the roughly 14.4 billion input tokens I sent, 13.8 billion, about
        96%, were cache reads.
      </p>
      <p>
        Cache reads are cheap. On most Anthropic models a cache read costs a tenth of the normal
        input price, according to
        <a href="https://platform.claude.com/docs/en/about-claude/pricing" target="_blank" rel="noopener">Anthropic's pricing docs</a>,
        and Opus 5.5 charges a twentieth: $0.20 per million cached tokens against $4.
        <a href="https://www.requesty.ai/blog/gpt-6-sol-luna-pricing-release-api" target="_blank" rel="noopener">GPT-6 Luna</a>
        charges $0.01 per million cached tokens against $0.10 for fresh input. That's why my
        dashboard shows $22,859 in cache savings.
      </p>
      <img
        src="${blogImagePath('tokenomics-and-data', 'opus-5-5-cost.png')}"
        alt="Claude Opus 5.5 in Claude Code over the last 30 days: $1,463.21 across 3.09B tokens, $0.47 per million tokens, 96.1% cache hit. Cost by type: input $0.37, cache read $590.56, cache write $592.22, output $280.06."
      />
      <p>
        Here's one model on its own.
        <a href="https://www.anthropic.com/claude/opus" target="_blank" rel="noopener">Claude Opus 5.5</a>
        lists at $4 per million input tokens and $20 per million output tokens. Over the last 30
        days in Claude Code, I pushed 3.09 billion tokens through it, and it cost $1,463 at API
        prices. That's <strong>$0.47 per million tokens</strong>, against a $4 sticker price for
        input. The cache hit rate was 96.1%. Fresh, uncached input cost me 37 cents for the whole
        month. Nearly everything else was cache reads, cache writes and output.
      </p>
      <p>
        That's the gap between the price on the launch page and the real economics of using these
        models.
      </p>
      <p>
        Coding agents reread the same context over and over: the same files, the same instructions,
        the same conversation so far. The tools from the big labs cache around 90% of it as a matter
        of course. So don't get hung up on a model's sticker price. If it's smart enough and caching
        90% of the time, a few dollars more per million tokens barely changes your bill. A smarter
        model that finishes in fewer steps can even cost less (most of the time, it does).
      </p>
      <p>
        In my experience, using a smart model is cheaper than using a dumb one about 95% of the
        time. So please use the smarter models. They cost less, waste less electricity, give you
        better answers, and are just better to work with.
      </p>
      <p>
        Every new model release also tends to bring the price down, because the companies keep
        finding ways to run models more efficiently on their GPUs while making them smarter.
        <a href="https://techcrunch.com/2026/09/22/anthropic-releases-opus-5-5-with-lower-prices-and-fable-level-performance/" target="_blank" rel="noopener">Opus 5.5</a>
        launched at a lower price than Opus 5, and
        <a href="https://www.cnbc.com/2026/11/09/anthropic-claude-fable-5-2-mythos-5-2.html" target="_blank" rel="noopener">Fable 5.2</a>
        at a lower price than Fable 5.1. So if you're sticking with older models to "save money",
        you aren't saving anything. Use the smarter model. It's cheaper for you, it's better for
        you, and it's just the better choice.
      </p>
      <p>
        To be fair about the numbers: nobody outside these companies knows the exact margins, and
        my figures come from analyst reports, not official filings. The 90%+ figure covers inference
        alone. These companies also pay to train models, run research and pay their employees, so
        their actual profit is much lower. But inference is cheap for them, and the subscription is
        subsidized.
      </p>

      <h3>Work at 3 AM</h3>
      <p>
        There's one more layer of subsidy. Anthropic and OpenAI run their GPUs 24/7. They don't turn
        them off when traffic drops. The models stay loaded in memory and ready to serve at all
        hours.
      </p>
      <p>
        If you use these subscriptions a lot, you'll notice you get less usage during weekday work
        hours, and much more if you're working at 3 AM. Anthropic has said this outright. In March
        2026 it
        <a href="https://www.theregister.com/2026/03/26/anthropic_tweaks_usage_limits/" target="_blank" rel="noopener">tightened session limits during weekday peak hours</a>
        and recommended moving heavy work outside peak hours. Before that, it
        <a href="https://thenewstack.io/anthropic-doubles-claude-usage-outside-peak-hours/" target="_blank" rel="noopener">doubled usage outside peak hours for two weeks</a>.
      </p>
      <p>
        The reason is opportunity cost. During the day, those GPUs serve companies paying full API
        prices, and those companies get priority. At night, when San Francisco and New York aren't
        working, the GPUs sit mostly idle, and the companies don't mind you using them. Work late and
        your requests will often run faster, and you'll probably get more usage too.
      </p>

      <h2>Part 2: Data</h2>
      <p>
        I was talking to a friend recently and she asked, "Aren't you scared they're taking all your
        data?"
      </p>
      <p>
        First, you can opt out. ChatGPT has an
        <a href="https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt" target="_blank" rel="noopener">"Improve the model for everyone"</a>
        setting, and Claude has a "Help improve Claude" setting under Settings &gt; Privacy. Turn
        it off and they won't train on your chats.
      </p>
      <p>
        The bigger point is that, frankly, your individual chats aren't worth much to them, and
        they aren't building an ad profile of you. Here's why.
      </p>

      <h3>You can't pay for AI with ads</h3>
      <p>
        We still think of AI companies like the previous generation of tech companies, Meta and
        Google, which make their money from ads. To sell ads, you need data on people: what they
        like, what they don't like. You build a profile, run statistics and algorithms on it, then
        target ads precisely. That's how they make hundreds of billions of dollars.
      </p>
      <p>
        That model doesn't work for AI. When I send a message, the thread might run for 40 minutes.
        It calls other models and gets its work verified. I look at it when I send the message, and
        again when the report comes back, maybe going back and forth a bit to finish up. Most of the
        time, nobody is staring at the screen where an ad would go.
      </p>
      <p>
        And the math doesn't come close. A YouTuber earns roughly
        <a href="https://www.post-bridge.com/blog/how-much-does-youtube-pay-for-1000-views" target="_blank" rel="noopener">$2 to $10 per 1,000 views</a>
        on long videos, usually $3 to $5. A single message of mine can cost $20 to $50 at API rates.
        Some people send messages that run for days and cost hundreds or thousands of dollars. Bun,
        the JavaScript runtime, was
        <a href="https://www.developersdigest.tech/blog/bun-rust-rewrite-535k-lines" target="_blank" rel="noopener">rewritten from Zig to Rust</a>
        mostly by Claude agents, about 535,000 lines in 11 days. No ad business pays for that kind
        of inference.
      </p>
      <p>
        Yes, ChatGPT
        <a href="https://www.forbes.com/sites/anishasircar/2026/01/20/openai-brings-ads-to-chatgpt-as-costs-mount/" target="_blank" rel="noopener">now shows ads</a>
        on its Free and $8 Go plans. But those plans give you barely any usage. I see it as mostly a
        marketing move to reach people who won't pay $20, especially in poorer countries. It
        doesn't pay for the heavy work, and it isn't where the money is.
      </p>
      <p>
        So these companies will always charge you something, whether it's a subsidized subscription
        or full API prices. I don't think that changes in 10 months, or even 5 years. AI is not going
        to be free.
      </p>

      <h3>Your chats don't teach models new skills</h3>
      <p>
        Yes, the companies would like to collect data. That's why the toggle exists. Your thumbs up
        and thumbs down, and the real problems you bring, do help a little, mostly by showing them
        where the model fails. But one person's chats aren't worth much on their own. Sorry to say
        it, but most of us aren't that interesting.
      </p>
      <p>
        Human chat data was useful at one point. Conversations helped models learn to talk. That's
        part of why older models sounded stiff and odd, and today's models write fluent, natural
        English.
      </p>
      <p>
        But new capabilities don't come from people like you and me chatting. They come from
        reinforcement learning:
        <a href="https://en.wikipedia.org/wiki/Reinforcement_learning_from_human_feedback" target="_blank" rel="noopener">RLHF</a>
        (reinforcement learning from human feedback) and
        <a href="https://www.patronus.ai/guide-to-rl-environments/reinforcement-learning-with-verifiable-rewards" target="_blank" rel="noopener">RLVR</a>
        (reinforcement learning with verifiable rewards). The labs build simulated environments, and
        the model is rewarded based on how well it does the task. RLVR uses an automatic check to
        decide if the answer is correct, such as whether the tests pass or the math works out. That's how models
        learned to code, generate images, build 3D models and everything else.
      </p>
      <p>
        Most of this happens in the terminal. Look at how Claude Code or Codex actually work, and
        you'll see they run commands under the hood. When ChatGPT makes you a PDF, it doesn't open
        Word and type. It writes structured, odd commands in the
        <a href="https://en.wikipedia.org/wiki/Command-line_interface" target="_blank" rel="noopener">command line</a>
        that no human would write. When I ask it to plot some data, it doesn't open VS Code, create a
        Python file, type the code and run it. It puts the whole Python program inside a single
        terminal command, which writes the image to disk and shows it to me.
      </p>
      <p>
        These systems work very differently from how people work, and that's why they're fast. If
        the model had to create a file for every small step, all those writes would add up and slow
        it down. Your chats about how to make a PDF don't teach it any of this. Labs build this
        training data synthetically, in highly structured environments for things like computer use,
        running commands, networking and monitoring.
      </p>

      <h3>Average data makes average models</h3>
      <p>
        There's one more reason. Models do learn from huge amounts of ordinary text early in
        training. But if labs trained them on everyone's chats without filtering, the model would
        pick up average behavior. You don't want an average model. Models like
        <a href="https://www.anthropic.com/claude/fable" target="_blank" rel="noopener">Fable 5.2</a>
        and <a href="https://www.anthropic.com/claude/opus" target="_blank" rel="noopener">Opus 5.5</a>
        get better because they train on narrow, carefully built data where the model does much
        smarter things than an average user asks for. Asking it how to make a PDF won't make the
        next model better.
      </p>
      <p>
        Sorry to say it, but OpenAI didn't
        <a href="https://www.quantamagazine.org/ai-has-solved-one-of-maths-1-million-millennium-prize-problems-20260908/" target="_blank" rel="noopener">crack the Navier-Stokes problem</a>
        and a pile of other math problems by reading your chats. Maybe the data of highly skilled researchers helped, maybe. But
        certainly not yours, assuming you're part of the 99% reading this (I think I am).
      </p>
      <p>
        So you don't need to worry that they're building a bigger model out of you. That's the part
        I want people to really understand.
      </p>

      <hr />
      <h2>Found something wrong?</h2>
      <p>
        This field moves fast, and I can't keep this post updated all the time. If you spot
        something wrong, or something has changed since I wrote it,
        <a href="mailto:contact@dkritarth.com">email me</a>. I will read it and update the post so
        it stays as accurate and useful as I can make it.
      </p>
      <p>
        If I sent you this link, let's pick up where we left off. If you found it on your own and
        want to talk about any of it, email me at
        <a href="mailto:contact@dkritarth.com">contact@dkritarth.com</a>.
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
