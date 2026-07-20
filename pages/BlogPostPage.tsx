import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { BlogPostView } from '../components/BlogPostView';

type BlogPostPageProps = {
  slug: string | null;
};

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug }) => {
  return (
    <PageLayout>
      <BlogPostView slug={slug} />
    </PageLayout>
  );
};
