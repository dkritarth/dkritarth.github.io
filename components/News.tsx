import React from 'react';
import { Section } from './Section';
import { formatNewsMonth, getNewsByYear } from '../constants';

export const News: React.FC = () => {
  const groups = getNewsByYear();

  return (
    <Section
      id="news"
      title="News"
      subtitle="Short updates on roles, research, awards, and milestones—newest first."
      className="bg-ink-50"
    >
      <div className="max-w-2xl space-y-10">
        {groups.map(({ year, items }) => (
          <section key={year} aria-labelledby={`news-year-${year}`}>
            <h3
              id={`news-year-${year}`}
              className="mb-4 font-serif text-2xl font-semibold text-ink-900 tabular-nums"
            >
              {year}
            </h3>
            <ul className="space-y-0 border-l-2 border-ink-200 ml-1">
              {items.map((item, idx) => (
                <li
                  key={`${year}-${item.month}-${idx}`}
                  className="relative pl-6 py-3 border-b border-ink-100 last:border-b-0"
                >
                  <span
                    className="absolute left-0 top-[1.15rem] -translate-x-[calc(50%+1px)] w-2.5 h-2.5 rounded-full bg-ink-900 ring-2 ring-ink-50"
                    aria-hidden
                  />
                  <p className="text-[15px] leading-relaxed text-ink-800">
                    {item.headline}{' '}
                    <span className="text-ink-500 font-medium tabular-nums">({formatNewsMonth(item.month)})</span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
};
