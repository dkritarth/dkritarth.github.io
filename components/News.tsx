import React from 'react';
import { Section } from './Section';
import { getNewsByYear } from '../constants';
import { NewsItemCard } from './NewsItemCard';

export const News: React.FC = () => {
  const groups = getNewsByYear();

  return (
    <Section
      id="news"
      title="News"
      subtitle="Milestones with photos, project links, papers, and LinkedIn posts—newest first."
      className="bg-ink-50"
    >

      <div className="max-w-4xl space-y-10">
        {groups.map(({ year, items }) => (
          <section key={year} aria-labelledby={`news-year-${year}`}>
            <h3
              id={`news-year-${year}`}
              className="mb-4 font-serif text-2xl font-semibold text-ink-900 tabular-nums"
            >
              {year}
            </h3>
            <ul className="space-y-0 border-l-2 border-ink-200 ml-1">
              {items.map((item) => (
                <NewsItemCard key={item.id} item={item} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
};
