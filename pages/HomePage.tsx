import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { Hero } from '../components/Hero';
import { Currently } from '../components/Currently';

export const HomePage: React.FC = () => {
  return (
    <PageLayout variant="landing">
      <Hero />
      <Currently />
    </PageLayout>
  );
};
