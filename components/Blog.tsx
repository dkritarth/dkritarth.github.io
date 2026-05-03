import React from 'react';
import { Section } from './Section';
import { BLOG_POSTS } from '../constants';

export const Blog: React.FC = () => {
  return (
    <Section
      id="notes"
      title="Research notes"
      subtitle="Short context on trajectory and projects—not a separate blog."
      className="bg-ink-50"
    >
      <div className="grid md:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post, index) => (
          <article
            key={index}
            className="flex flex-col bg-white rounded-sm border border-ink-200 overflow-hidden"
          >
            <div className="p-6 flex-1">
              <div className="flex justify-between items-center gap-2 mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-700">{post.tags[0]}</span>
                <span className="text-ink-500 text-xs tabular-nums">{post.date}</span>
              </div>

              <h3 className="text-lg font-serif font-semibold text-ink-900 mb-1 leading-snug">{post.title}</h3>
              <p className="text-sm text-ink-600 mb-4">{post.subtitle}</p>

              <div className="space-y-3 text-ink-800 leading-relaxed text-sm">
                {post.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="px-6 py-3 bg-ink-50 border-t border-ink-200 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[11px] text-ink-600">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};
