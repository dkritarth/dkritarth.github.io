import React, { useEffect } from 'react';
import { useHashRoute } from './useHashRoute';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ResearchPage } from './pages/ResearchPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { EducationPage } from './pages/EducationPage';
import { NotesPage } from './pages/NotesPage';
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
    case 'notes':
      return <NotesPage />;
    default:
      return <HomePage />;
  }
};

export default App;
