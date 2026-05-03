import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { Blog } from '../components/Blog';

export const NotesPage: React.FC = () => {
  return (
    <PageLayout>
      <Blog />
    </PageLayout>
  );
};
