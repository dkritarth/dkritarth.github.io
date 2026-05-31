import React from 'react';
import type { NewsItem } from '../types';
import { formatNewsMonth } from '../constants';
import { ContentImageGrid } from './ContentImageGrid';
import { CredlyBadgeBlock } from './CredlyBadgeBlock';
import { NewsLinkList } from './NewsLinkList';

type NewsItemCardProps = {
  item: NewsItem;
};

export function newsItemHasMedia(item: NewsItem): boolean {
  return Boolean(
    item.summary?.trim() || item.images?.length || item.links?.length || item.credlyBadge,
  );
}

export const NewsItemCard: React.FC<NewsItemCardProps> = ({ item }) => {
  const rich = newsItemHasMedia(item);

  return (
    <li
      className={`relative pl-6 py-4 border-b border-ink-100 last:border-b-0 ${
        rich ? 'pb-5' : 'py-3'
      }`}
    >
      <span
        className="absolute left-0 top-[1.15rem] -translate-x-[calc(50%+1px)] w-2.5 h-2.5 rounded-full bg-ink-900 ring-2 ring-ink-50"
        aria-hidden
      />
      <article className={rich ? 'rounded-sm border border-ink-200 bg-white p-4 shadow-sm' : undefined}>
        <header className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h4 className="text-[15px] font-semibold leading-snug text-ink-900 min-w-0 flex-1">
            {item.headline}
          </h4>
          <time
            dateTime={`${item.year}-${String(item.month).padStart(2, '0')}`}
            className="shrink-0 text-xs font-medium tabular-nums text-ink-500"
          >
            {formatNewsMonth(item.month)} {item.year}
          </time>
        </header>

        {item.summary ? (
          <p className="mt-2 text-sm leading-relaxed text-ink-700">{item.summary}</p>
        ) : null}

        <ContentImageGrid images={item.images ?? []} className="mt-4" />

        {item.credlyBadge ? (
          <div className="mt-4">
            <CredlyBadgeBlock badge={item.credlyBadge} compact />
          </div>
        ) : null}

        <NewsLinkList links={item.links ?? []} className="mt-3" />
      </article>
    </li>
  );
};
