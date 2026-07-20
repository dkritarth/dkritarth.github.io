import React from 'react';
import { getPostBySlug, formatBlogDate } from '../blogPosts';
import { Section } from './Section';
import { AppLink } from './AppLink';
import { ContentImageGrid } from './ContentImageGrid';
import { BlogProse } from './BlogProse';

type BlogPostViewProps = {
  slug: string | null;
};

export const BlogPostView: React.FC<BlogPostViewProps> = ({ slug }) => {
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <Section id="blog" title="Post not found">
        <p className="text-ink-700">
          We couldn't find that post. It may have been moved or unpublished.
        </p>
        <AppLink href="/blog/" className="mt-4 inline-block text-sm text-ink-700 hover:text-ink-900">
          ← Blog
        </AppLink>
      </Section>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
      <AppLink href="/blog/" className="text-sm text-ink-700 hover:text-ink-900">
        ← Blog
      </AppLink>

      <header className="mt-6 border-b border-ink-200 pb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink-900 tracking-tight">
          {post.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-700">
          <time dateTime={post.date} className="tabular-nums">
            {formatBlogDate(post.date)}
          </time>
          {post.readingMinutes ? <span>· {post.readingMinutes} min read</span> : null}
        </div>
        {post.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-sm bg-ink-100 px-2 py-0.5 text-xs text-ink-700">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      <ContentImageGrid images={post.hero ? [post.hero] : []} className="mt-8" />

      <BlogProse html={post.content} />

      <hr className="border-ink-200 my-10" />
      <AppLink href="/blog/" className="text-sm text-ink-700 hover:text-ink-900">
        ← Blog
      </AppLink>
    </article>
  );
};
