import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

type PageLayoutProps = {
  children: React.ReactNode;
  /** Landing uses full-viewport hero padding; inner pages add top offset for the fixed header. */
  variant?: 'landing' | 'document';
};

export const PageLayout: React.FC<PageLayoutProps> = ({ children, variant = 'document' }) => {
  return (
    <div className="min-h-screen bg-ink-50 font-sans text-ink-900 selection:bg-stone-300/40 selection:text-ink-900 flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink-900 focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className={variant === 'landing' ? 'flex-1' : 'flex-1 pt-24 md:pt-28 pb-16'}>{children}</main>
      <Footer />
    </div>
  );
};
