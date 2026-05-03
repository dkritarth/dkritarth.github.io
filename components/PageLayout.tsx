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
      <Header />
      <main className={variant === 'landing' ? 'flex-1' : 'flex-1 pt-24 md:pt-28 pb-16'}>{children}</main>
      <Footer />
    </div>
  );
};
