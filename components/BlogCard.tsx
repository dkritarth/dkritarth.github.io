import React from 'react';
import type { BlogPost } from '../types';
import { formatBlogDate } from '../blogPosts';
import { AppLink } from './AppLink';

type BlogCardProps = {
  post: BlogPost;
};

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <AppLink
      href={`/blog/${post.slug}/`}
      className="block rounded-md border border-ink-200 bg-surface p-4 shadow-sm transition hover:shadow hover:border-ink-700"
    >
      <article>
        <header className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="text-[16px] font-serif font-semibold leading-snug text-ink-900 min-w-0 flex-1 hover:underline">
            {post.title}
          </h3>
          <time dateTime={post.date} className="shrink-0 text-[14px] tabular-nums text-ink-700">
            {formatBlogDate(post.date)}
            {post.readingMinutes ? ` · ${post.readingMinutes} min read` : ''}
          </time>
        </header>

        <p className="mt-2 text-[16px] leading-relaxed text-ink-700">{post.excerpt}</p>

        {post.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-ink-100 px-2 py-0.5 text-[14px] text-ink-700">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </article>
    </AppLink>
  );
};
