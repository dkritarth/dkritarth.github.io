import React, { useEffect, useState } from 'react';
import { Section } from './Section';
import { RESEARCH_PLACEMENTS, computeDuration, getPlacementRange } from '../constants';
import type { ResearchPlacement } from '../types';
import { ContentImageGrid } from './ContentImageGrid';
import { CredlyBadgeBlock } from './CredlyBadgeBlock';
import { AppLink } from './AppLink';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

const BOLD_TERMS = [
  'OralScan',
  'OrthoScan',
  'YOLOv8',
  'YOLO',
  'GNNs',
  'ALIGNN',
  'mRehab',
  'AWS',
  'Kalman',
  'Weights & Biases',
  'MACE',
  'UMA',
  'MLIPs',
  'E(3)-equivariant',
  'eSEN',
  'Mixture-of-Linear-Experts',
  'PerovskiteOrderingGCNNs',
  'Inference Foundry',
];

function formatBoldTerms(s: string): React.ReactNode[] {
  if (!s) return [];
  const escaped = BOLD_TERMS.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const re = new RegExp(`(${escaped})`, 'g');
  return s.split(re).map((part, i) =>
    BOLD_TERMS.includes(part) ? (
      <strong key={i} className="font-semibold text-ink-900">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function formatRichLine(text: string): React.ReactNode {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let linkIdx = 0;
  const re = /(https?:\/\/[^\s)]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    nodes.push(...formatBoldTerms(text.slice(last, m.index)));
    linkIdx += 1;
    nodes.push(
      <a
        key={`link-${linkIdx}`}
        href={m[1]}
        className="text-ink-900 underline underline-offset-2 hover:no-underline break-all"
        target="_blank"
        rel="noopener noreferrer"
      >
        {m[1]}
      </a>,
    );
    last = m.index + m[0].length;
  }
  nodes.push(...formatBoldTerms(text.slice(last)));
  return <>{nodes}</>;
}

const PREVIOUS_ANCHOR = 'previous-research';

const currentPlacements = RESEARCH_PLACEMENTS.filter((p) => !p.previous);
const previousPlacements = RESEARCH_PLACEMENTS.filter((p) => p.previous);
const previousAnchors = new Set<string>([
  PREVIOUS_ANCHOR,
  ...previousPlacements.flatMap((p) => p.subprojects.map((sp) => sp.id)),
]);

const hashTargetsPrevious = () =>
  typeof window !== 'undefined' && previousAnchors.has(decodeURIComponent(window.location.hash.slice(1)));

const PlacementBlock: React.FC<{ placement: ResearchPlacement }> = ({ placement }) => {
  const range = getPlacementRange(placement);
  return (
        <div className="relative">
          {/* Placement dot */}
          <span
            className="absolute -left-[39px] top-1.5 w-3 h-3 rounded-full bg-surface border-2 border-ink-900"
            aria-hidden
          />

          {/* Placement header */}
          <h3 className="text-[17px] font-serif font-semibold text-ink-900">{placement.role}</h3>
          <p className="text-ink-700 italic text-sm mb-0.5">{placement.organization}</p>
          <p className="text-xs text-ink-500 mb-2">
            {placement.location}
            {range ? <span className="ml-2 text-ink-400">· {range}</span> : null}
          </p>
          {placement.overview && (
            <p className="text-sm text-ink-700 mb-3 max-w-2xl leading-relaxed">{placement.overview}</p>
          )}
          {placement.placementLinks && placement.placementLinks.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1">
              {placement.placementLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-ink-900 underline underline-offset-2 hover:no-underline"
                >
                  {link.label} <ArrowUpRight size={12} aria-hidden />
                </a>
              ))}
            </div>
          )}

          {/* Subprojects */}
          <div className="space-y-6 mt-4">
            {placement.subprojects.map((sp) => {
              const dur = computeDuration(sp.period);
              return (
                <div
                  key={sp.id}
                  id={sp.id}
                  className="scroll-mt-28 border border-ink-100 bg-ink-50/60 rounded-sm p-4"
                >
                  {/* Subproject header */}
                  <h4 className="font-serif text-base font-semibold text-ink-900 mb-0.5">
                    {sp.name}
                  </h4>
                  <p className="text-xs text-ink-500 mb-1 tabular-nums">
                    {sp.period}
                    {dur ? <span className="text-ink-400"> ({dur})</span> : null}
                  </p>
                  {sp.context && (
                    <p className="text-xs font-medium text-ink-600 mb-2">{sp.context}</p>
                  )}

                  {/* Narrative */}
                  <div className="space-y-1.5 text-sm leading-relaxed text-ink-700 mb-3">
                    {sp.narrative.map((p, i) => (
                      <p key={i}>{formatRichLine(p)}</p>
                    ))}
                  </div>

                  <ContentImageGrid images={sp.images ?? []} className="mb-3" />

                  {sp.collaboratorsNote && (
                    <p className="text-xs italic text-ink-500 mb-3 leading-relaxed">
                      {formatRichLine(sp.collaboratorsNote)}
                    </p>
                  )}

                  {/* Technical highlights */}
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-500 mb-1.5">
                    Technical contributions
                  </p>
                  <ul className="list-disc list-outside ml-4 space-y-1.5 mb-3 marker:text-ink-400">
                    {sp.technicalHighlights.map((item, i) => (
                      <li key={i} className="text-sm leading-relaxed text-ink-700">
                        {formatRichLine(item)}
                      </li>
                    ))}
                  </ul>

                  {/* Links */}
                  {sp.links && sp.links.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1">
                      {sp.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-ink-900 underline underline-offset-2 hover:no-underline"
                        >
                          {link.label} <ArrowUpRight size={12} aria-hidden />
                        </a>
                      ))}
                    </div>
                  )}

                  {sp.credlyBadge && (
                    <div className="mb-3">
                      <CredlyBadgeBlock badge={sp.credlyBadge} />
                    </div>
                  )}

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-ink-100">
                    {sp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-sm border border-ink-200 bg-surface px-2 py-0.5 text-[11px] font-medium text-ink-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
  );
};

const PlacementTimeline: React.FC<{ placements: ResearchPlacement[] }> = ({ placements }) => (
  <div className="relative border-l-2 border-ink-200 ml-2 pl-8 pb-2 space-y-12">
    {placements.map((placement) => (
      <PlacementBlock key={`${placement.role}-${placement.organization}`} placement={placement} />
    ))}
  </div>
);

export const Research: React.FC = () => {
  const [previousOpen, setPreviousOpen] = useState(hashTargetsPrevious);

  // Deep links such as /research/#oralscan must open the collapsed section that holds their target.
  useEffect(() => {
    const syncWithHash = () => {
      if (hashTargetsPrevious()) setPreviousOpen(true);
    };
    syncWithHash();
    window.addEventListener('popstate', syncWithHash);
    window.addEventListener('hashchange', syncWithHash);
    return () => {
      window.removeEventListener('popstate', syncWithHash);
      window.removeEventListener('hashchange', syncWithHash);
    };
  }, []);

  return (
    <Section
      id="research"
      title="Research"
      subtitle="Current PhD research at Michigan State University, followed by earlier work at the University at Buffalo."
      className="bg-surface"
    >
      <PlacementTimeline placements={currentPlacements} />

      <details
        id={PREVIOUS_ANCHOR}
        open={previousOpen}
        onToggle={(e) => setPreviousOpen((e.currentTarget as HTMLDetailsElement).open)}
        className="group mt-14 scroll-mt-28 rounded-sm border border-ink-200 bg-ink-50/60"
      >
        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-400">
          <div>
            <h3 className="text-lg font-serif font-semibold text-ink-900">Previous research</h3>
            <p className="mt-1 text-sm text-ink-700">
              University at Buffalo · digital health (OralScan, OrthoScan, mRehab) · computational materials
              (symmetry-aware GNNs, equivariant interatomic potentials)
            </p>
          </div>
          <ChevronDown
            size={20}
            className="mt-1 shrink-0 text-ink-700 transition-transform group-open:rotate-180"
            aria-hidden
          />
        </summary>
        <div className="border-t border-ink-200 px-5 pb-6 pt-8">
          <PlacementTimeline placements={previousPlacements} />
        </div>
      </details>

      <div className="mt-10 rounded-sm border border-ink-200 bg-ink-50 px-5 py-4 text-sm text-ink-700">
        Looking for papers and preprints?{' '}
        <AppLink
          href="/publications/"
          className="font-semibold text-ink-900 underline underline-offset-2 hover:no-underline"
        >
          View Publications →
        </AppLink>
      </div>
    </Section>
  );
};
