import React, { useState } from 'react';
import { Section } from './Section';
import { PUBLICATIONS, PRESENTATIONS } from '../constants';
import type { Publication } from '../types';
import { ArrowUpRight, Check, ChevronDown, Copy, Mic2 } from 'lucide-react';

type FilterKey = 'all' | 'published' | 'preprint' | 'submitted';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'published', label: 'Published' },
  { key: 'submitted', label: 'Submitted / In Revision' },
  { key: 'preprint', label: 'Preprint / In Progress' },
];

function getFilterKey(pub: Publication): FilterKey {
  const s = pub.status?.toLowerCase() ?? '';
  if (s.includes('submitted') || s.includes('under review') || s.includes('revision')) return 'submitted';
  if (s.includes('preprint') || s.includes('progress')) return 'preprint';
  return 'published';
}

/** Bold names in the author string — the site owner, plus any equal-contribution co-authors. */
function AuthorList({ authors, equalContribution }: { authors: string; equalContribution?: string[] }) {
  const names = ['Dandapat,\\s*K\\.', ...(equalContribution ?? []).map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))];
  const pattern = new RegExp(`(${names.join('|')}\\*?)`);
  const parts = authors.split(pattern);
  return (
    <>
      {parts.map((part, i) =>
        names.some((n) => new RegExp(`^${n}\\*?$`).test(part)) ? (
          <strong key={i} className="font-semibold text-ink-900">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

const STATUS_STYLES: Record<string, string> = {
  submitted: 'border-amber-300 bg-amber-50 text-amber-800',
  revision: 'border-amber-300 bg-amber-50 text-amber-800',
  review: 'border-amber-300 bg-amber-50 text-amber-800',
  preprint: 'border-sky-300 bg-sky-50 text-sky-800',
};

function statusStyle(status?: string): string {
  const s = status?.toLowerCase() ?? '';
  for (const key of Object.keys(STATUS_STYLES)) {
    if (s.includes(key)) return STATUS_STYLES[key];
  }
  return 'border-ink-200 bg-ink-50 text-ink-700';
}

function CopyCitation({ citation }: { citation: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(citation);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          // clipboard unavailable — no-op
        }
      }}
      className="inline-flex items-center gap-1.5 self-start rounded-sm border border-ink-200 px-2.5 py-1 text-xs font-medium text-ink-700 transition-colors hover:border-ink-400 hover:text-ink-900"
    >
      {copied ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
      {copied ? 'Copied' : 'Copy citation'}
    </button>
  );
}

function PubCard({ pub }: { pub: Publication }) {
  const [expanded, setExpanded] = useState(false);
  const hasDetail = Boolean(pub.abstract || pub.citation);

  return (
    <div className="group rounded-sm border border-ink-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="text-[15px] font-semibold leading-snug text-ink-900 mb-2">{pub.title}</h3>
          <p className="text-sm italic text-ink-600 mb-2 leading-relaxed">
            <AuthorList authors={pub.authors} equalContribution={pub.equalContribution} />
          </p>
          {pub.equalContribution && (
            <p className="mb-2 text-xs text-ink-500">
              * {pub.equalContribution.join(' and ')} contributed equally to this work.
            </p>
          )}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="font-medium text-ink-800">{pub.venue}</span>
            <span className="text-ink-400">{pub.year}</span>
            {pub.status && (
              <span className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-xs ${statusStyle(pub.status)}`}>
                {pub.status}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {pub.link && (
            <a
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-ink-900 underline underline-offset-2 hover:no-underline"
            >
              View paper <ArrowUpRight size={14} aria-hidden />
            </a>
          )}
          {hasDetail && (
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="inline-flex items-center gap-1 text-sm font-medium text-ink-600 hover:text-ink-900"
            >
              {expanded ? 'Hide' : 'Abstract & citation'}
              <ChevronDown
                size={14}
                aria-hidden
                className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
              />
            </button>
          )}
        </div>

        {expanded && hasDetail && (
          <div className="mt-1 space-y-3 border-t border-ink-100 pt-3">
            {pub.abstract && (
              <p className="text-sm leading-relaxed text-ink-700">{pub.abstract}</p>
            )}
            {pub.citation && (
              <div className="space-y-1.5">
                <p className="rounded-sm bg-ink-50 p-3 text-xs leading-relaxed text-ink-700">{pub.citation}</p>
                <CopyCitation citation={pub.citation} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export const Publications: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filtered = PUBLICATIONS.filter(
    (p) => activeFilter === 'all' || getFilterKey(p) === activeFilter,
  );

  // Group by year, descending
  const byYear = new Map<string, Publication[]>();
  for (const pub of filtered) {
    const list = byYear.get(pub.year) ?? [];
    list.push(pub);
    byYear.set(pub.year, list);
  }
  const grouped = [...byYear.entries()].sort(([a], [b]) => Number(b) - Number(a));

  return (
    <Section
      id="publications"
      title="Publications"
      subtitle="Papers, preprints, and demo tracks. My name is highlighted in each author list."
      className="bg-white"
    >
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-10">
        {FILTERS.map((f) => {
          const count =
            f.key === 'all'
              ? PUBLICATIONS.length
              : PUBLICATIONS.filter((p) => getFilterKey(p) === f.key).length;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className={`inline-flex items-center gap-1.5 rounded-sm border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                activeFilter === f.key
                  ? 'border-ink-900 bg-ink-900 text-white'
                  : 'border-ink-200 bg-white text-ink-700 hover:border-ink-400'
              }`}
            >
              {f.label}
              <span
                className={`text-xs tabular-nums ${
                  activeFilter === f.key ? 'text-white/70' : 'text-ink-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Publication cards grouped by year */}
      {grouped.length === 0 ? (
        <p className="text-ink-600 text-sm">No publications in this category.</p>
      ) : (
        <div className="space-y-10">
          {grouped.map(([year, pubs]) => (
            <div key={year}>
              <h2 className="mb-4 font-serif text-xl font-semibold text-ink-900 border-b border-ink-200 pb-2">
                {year}
              </h2>
              <div className="space-y-4">
                {pubs.map((pub, i) => (
                  <PubCard key={i} pub={pub} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Presentations */}
      <div className="mt-16">
        <h2 className="mb-6 flex items-center gap-2 font-serif text-xl font-semibold text-ink-900 border-b border-ink-200 pb-2">
          <Mic2 className="shrink-0 text-ink-700" size={20} aria-hidden />
          Presentations
        </h2>
        <div className="space-y-3">
          {PRESENTATIONS.map((pres, idx) => (
            <div key={idx} className="rounded-sm border border-ink-200 bg-white p-5 shadow-sm">
              <h3 className="text-[15px] font-semibold leading-snug text-ink-900">{pres.event}</h3>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-sm border border-ink-100 bg-ink-50 px-2 py-0.5 text-xs font-medium text-ink-800">
                  {pres.type}
                </span>
                <span className="text-xs tabular-nums text-ink-500">{pres.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
