import React from 'react';
import { Section } from './Section';
import { getPublishedPosts } from '../blogPosts';
import { BlogCard } from './BlogCard';

export const BlogList: React.FC = () => {
  const posts = getPublishedPosts();

  return (
    <Section
      id="blog"
      title="Blog"
      subtitle="Notes on research, engineering, and things I'm building—newest first."
    >
      {posts.length ? (
        <div className="max-w-4xl space-y-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-ink-700">No posts yet.</p>
      )}
    </Section>
  );
};
