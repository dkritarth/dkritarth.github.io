import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { BlogList } from '../components/BlogList';

export const BlogPage: React.FC = () => {
  return (
    <PageLayout>
      <BlogList />
    </PageLayout>
  );
};
