import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ id, title, subtitle, className = '', children }) => {
  return (
    <section id={id} className={`scroll-mt-28 py-16 md:py-24 px-6 md:px-10 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 md:mb-12 text-left border-b border-ink-200 pb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-ink-900 tracking-tight">{title}</h2>
          {subtitle && <p className="mt-3 text-ink-700 max-w-3xl text-base leading-relaxed">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
};
