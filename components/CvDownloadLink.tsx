import React from 'react';
import { FileDown } from 'lucide-react';
import { DOCUMENT_URLS } from '../constants';

type Variant = 'hero' | 'header' | 'headerMobile';

const base =
  'inline-flex items-center gap-1.5 font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-ink-400 focus:ring-offset-2';

const variants: Record<Variant, string> = {
  hero: 'px-6 py-3 border border-ink-200 text-ink-900 text-sm bg-white hover:bg-ink-50 hover:border-ink-300',
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
