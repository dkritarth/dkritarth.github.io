import React from 'react';
import { ArrowUpRight, FileText, Github, Linkedin, Newspaper, Play } from 'lucide-react';
import type { NewsLink, NewsLinkKind } from '../types';

const KIND_META: Record<
  NewsLinkKind,
  { icon: React.ReactNode; defaultLabel?: string }
> = {
  website: { icon: <ArrowUpRight size={14} aria-hidden /> },
  linkedin: { icon: <Linkedin size={14} aria-hidden />, defaultLabel: 'LinkedIn' },
  article: { icon: <Newspaper size={14} aria-hidden /> },
  paper: { icon: <FileText size={14} aria-hidden /> },
  github: { icon: <Github size={14} aria-hidden /> },
  video: { icon: <Play size={14} aria-hidden /> },
};

type NewsLinkListProps = {
  links: NewsLink[];
  className?: string;
};

export const NewsLinkList: React.FC<NewsLinkListProps> = ({ links, className = '' }) => {
  if (!links?.length) return null;

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {links.map((link) => {
        const kind = link.kind ?? 'website';
        const meta = KIND_META[kind];
        return (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-sm border border-ink-200 bg-white px-2.5 py-1 text-xs font-semibold text-ink-900 hover:border-ink-900 transition-colors"
            >
              {meta.icon}
              <span>{link.label || meta.defaultLabel}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};
