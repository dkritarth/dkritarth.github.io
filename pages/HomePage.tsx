import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { Hero } from '../components/Hero';

export const HomePage: React.FC = () => {
  return (
    <PageLayout variant="landing">
      <Hero />
    </PageLayout>
  );
};
