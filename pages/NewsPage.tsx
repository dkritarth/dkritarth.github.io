import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { News } from '../components/News';

export const NewsPage: React.FC = () => {
  return (
    <PageLayout>
      <News />
    </PageLayout>
  );
};
