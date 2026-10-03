import React, { useEffect } from 'react';
import { useSiteRoute, useBlogSlug } from './useSiteRoute';
import { PAGE_HEADINGS } from './seoMeta';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ResearchPage } from './pages/ResearchPage';
import { PublicationsPage } from './pages/PublicationsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { NewsPage } from './pages/NewsPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { applyPageSeo } from './seoMeta';

const App: React.FC = () => {
  const page = useSiteRoute();
  const blogSlug = useBlogSlug();

  useEffect(() => {
    applyPageSeo(page, page === 'blog' ? blogSlug : null);
    const targetId = decodeURIComponent(window.location.hash.slice(1));
    if (!targetId) {
      window.scrollTo(0, 0);
      return;
    }
    // Wait for the new page (and any collapsed section it opens for this hash) to render.
    const frame = requestAnimationFrame(() =>
      requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView()),
    );
    return () => cancelAnimationFrame(frame);
  }, [page, blogSlug]);

  const content = (() => {
    switch (page) {
    case 'about':
      return <AboutPage />;
    case 'research':
      return <ResearchPage />;
    case 'publications':
      return <PublicationsPage />;
    case 'projects':
      return <ProjectsPage />;
    case 'news':
      return <NewsPage />;
    case 'blog':
      return blogSlug ? <BlogPostPage slug={blogSlug} /> : <BlogPage />;
    default:
      return <HomePage />;
    }
  })();

  return (
    <>
      <h1 className="sr-only">{PAGE_HEADINGS[page]}</h1>
      {content}
    </>
  );
};

export default App;
