import React, { useEffect } from 'react';
import { useHashRoute } from './useHashRoute';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ResearchPage } from './pages/ResearchPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { EducationPage } from './pages/EducationPage';
import { NewsPage } from './pages/NewsPage';
import { applyPageSeo } from './seoMeta';

const App: React.FC = () => {
  const page = useHashRoute();

  useEffect(() => {
    applyPageSeo(page);
    window.scrollTo(0, 0);
  }, [page]);

  switch (page) {
    case 'about':
      return <AboutPage />;
    case 'research':
      return <ResearchPage />;
    case 'projects':
      return <ProjectsPage />;
    case 'education':
      return <EducationPage />;
    case 'news':
      return <NewsPage />;
    default:
      return <HomePage />;
  }
};

export default App;
