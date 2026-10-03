import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { About } from '../components/About';
import { Timeline } from '../components/Timeline';

export const AboutPage: React.FC = () => {
  return (
    <PageLayout>
      <About />
      <Timeline />
    </PageLayout>
  );
};
