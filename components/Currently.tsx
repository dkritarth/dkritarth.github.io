import React from 'react';
import { Section } from './Section';
import { AppLink } from './AppLink';
import { CURRENTLY } from '../constants';
import { ArrowUpRight } from 'lucide-react';

export const Currently: React.FC = () => {
  return (
    <Section id="currently" title="Currently" subtitle="What I'm actively working on right now." className="bg-white">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CURRENTLY.map((item) => {
          const linkClass =
            'mt-1 inline-flex items-center gap-1 self-start text-sm font-semibold text-ink-900 underline underline-offset-2 hover:no-underline';
          return (
            <div
              key={item.title}
              className="flex flex-col gap-2 rounded-lg border border-ink-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-ink-200 transition-all duration-200"
            >
              <h3 className="text-[15px] font-semibold text-ink-900">{item.title}</h3>
              <p className="text-sm leading-relaxed text-ink-700">{item.description}</p>
              {item.link &&
                (item.link.href.startsWith('/') ? (
                  <AppLink href={item.link.href} className={linkClass}>
                    {item.link.label} <ArrowUpRight size={14} aria-hidden />
                  </AppLink>
                ) : (
                  <a href={item.link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {item.link.label} <ArrowUpRight size={14} aria-hidden />
                  </a>
                ))}
            </div>
          );
        })}
      </div>
    </Section>
  );
};
