import React, { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { CredlyBadge } from '../types';

const CREDLY_EMBED_SCRIPT = 'https://cdn.credly.com/assets/utilities/embed.js';

function ensureCredlyEmbedScript(): void {
  if (typeof document === 'undefined') return;
  if (document.querySelector(`script[src="${CREDLY_EMBED_SCRIPT}"]`)) return;
  const script = document.createElement('script');
  script.src = CREDLY_EMBED_SCRIPT;
  script.async = true;
  document.body.appendChild(script);
}

type CredlyBadgeBlockProps = {
  badge: CredlyBadge;
  /** Optional heading override (e.g. project name on About page) */
  title?: string;
  compact?: boolean;
};

export const CredlyBadgeBlock: React.FC<CredlyBadgeBlockProps> = ({ badge, title, compact = false }) => {
  useEffect(() => {
    ensureCredlyEmbedScript();
  }, [badge.badgeId]);

  return (
    <div
      className={`rounded-sm border border-ink-200 bg-ink-50/80 ${compact ? 'p-3' : 'p-4 md:p-5'}`}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-700">
        {title ?? 'UB ELN · Mentored Research (Credly)'}
      </p>
      {badge.issued ? (
        <p className="mb-3 text-sm text-ink-600">Issued {badge.issued}</p>
      ) : null}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div
          className="credly-badge-embed shrink-0"
          data-iframe-width="150"
          data-iframe-height="270"
          data-share-badge-id={badge.badgeId}
          data-share-badge-host="https://www.credly.com"
        />
        <ul className="flex flex-col gap-2 text-sm">
          <li>
            <a
              href={badge.publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-ink-900 underline underline-offset-2 hover:no-underline"
            >
              View verified badge on Credly
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </li>
          {badge.projectOutcomeUrl ? (
            <li>
              <a
                href={badge.projectOutcomeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-ink-900 underline underline-offset-2 hover:no-underline"
              >
                {badge.projectOutcomeLabel ?? 'Project outcome (UB Box)'}
                <ArrowUpRight size={14} aria-hidden />
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};
