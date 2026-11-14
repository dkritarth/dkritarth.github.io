import React, { useEffect, useState } from 'react';
import { Section } from './Section';
import { getPublishedPosts } from '../blogPosts';
import { BlogCard } from './BlogCard';
import { cachedAllPostViews, fetchAllPostViews, formatCount } from '../viewCounts';

export const BlogList: React.FC = () => {
  const posts = getPublishedPosts();
  const [views, setViews] = useState<{ total: number; posts: Record<string, number> } | null>(
    () => cachedAllPostViews() ?? null,
  );

  useEffect(() => {
    if (cachedAllPostViews() !== undefined) return;
    let cancelled = false;
    fetchAllPostViews().then((data) => {
      if (!cancelled) setViews(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Section
      id="blog"
      title="Blog"
      subtitle="Personal reflections on the ideas, experiences, and recent events that have changed how I think."
    >
      {views ? (
        <p className="-mt-2 mb-6 text-[14px] tabular-nums text-ink-700">
          {formatCount(views.total, 'view', 'views')} across all posts
        </p>
      ) : null}
      {posts.length ? (
        <div className="max-w-4xl space-y-6">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              views={views ? (views.posts[post.slug] ?? 0) : undefined}
            />
          ))}
        </div>
      ) : (
        <p className="text-ink-700">No posts yet.</p>
      )}
    </Section>
  );
};
