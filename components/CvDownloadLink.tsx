import React from 'react';
import { FileDown } from 'lucide-react';
import { DOCUMENT_URLS } from '../constants';

type Variant = 'hero' | 'header' | 'headerMobile';

const base =
  'inline-flex items-center gap-1.5 font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-900';

const variants: Record<Variant, string> = {
  hero: 'px-5 py-2.5 border border-ink-300 text-ink-900 text-sm hover:border-ink-900 hover:bg-white',
  header:
    'ml-1 border border-ink-900 text-ink-900 px-3 py-1.5 text-sm hover:bg-ink-900 hover:text-white',
  headerMobile:
    'justify-center border border-ink-900 text-ink-900 px-4 py-3 mt-3 hover:bg-ink-900 hover:text-white w-full',
};

export const CvDownloadLink: React.FC<{ variant: Variant }> = ({ variant }) => {
  const isMobile = variant === 'headerMobile';
  return (
    <a
      href={DOCUMENT_URLS.cv}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${isMobile ? 'flex' : ''}`}
      title="Full academic CV (PDF)"
    >
      <FileDown size={isMobile ? 18 : 15} aria-hidden />
      {variant === 'hero' ? 'CV (PDF)' : 'CV'}
    </a>
  );
};
