import React from 'react';

type BlogProseProps = {
  html: string;
};

const PROSE_CLASSNAME = [
  'max-w-none',
  '[&_h2]:font-serif [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-semibold [&_h2]:text-ink-900 [&_h2]:mt-8 [&_h2]:mb-3',
  '[&_h3]:font-serif [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink-900 [&_h3]:mt-6 [&_h3]:mb-2',
  '[&_p]:text-ink-800 [&_p]:leading-relaxed [&_p]:my-4',
  '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ul]:space-y-1',
  '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_ol]:space-y-1',
  '[&_li]:text-ink-800',
  '[&_a]:underline [&_a]:text-ink-900 [&_a]:hover:text-ink-700',
  '[&_blockquote]:border-l-2 [&_blockquote]:border-ink-200 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-ink-700 [&_blockquote]:my-6',
  '[&_code]:font-mono [&_code]:text-sm [&_code]:bg-ink-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded-sm',
  '[&_pre]:bg-ink-900 [&_pre]:text-ink-50 [&_pre]:p-4 [&_pre]:rounded-sm [&_pre]:overflow-x-auto [&_pre]:my-6',
  '[&_pre_code]:bg-transparent [&_pre_code]:text-ink-50 [&_pre_code]:p-0',
  '[&_img]:rounded-sm [&_img]:my-6',
  '[&_hr]:border-ink-200 [&_hr]:my-8',
  '[&_strong]:font-semibold [&_strong]:text-ink-900',
  '[&_em]:italic',
].join(' ');

/** Renders sanitized-at-source semantic HTML from a `BlogPost.content` field with an editorial look. */
export const BlogProse: React.FC<BlogProseProps> = ({ html }) => {
  return <div className={PROSE_CLASSNAME} dangerouslySetInnerHTML={{ __html: html }} />;
};
