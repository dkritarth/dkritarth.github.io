import React from 'react';
import type { ContentImage } from '../types';

type ContentImageGridProps = {
  images: ContentImage[];
  /** Extra wrapper classes */
  className?: string;
};

/**
 * Responsive grid for research / project figures. Images must exist under `public/` at the given `src` paths.
 */
export const ContentImageGrid: React.FC<ContentImageGridProps> = ({ images, className = '' }) => {
  if (!images?.length) return null;

  return (
    <div
      className={`grid gap-3 sm:grid-cols-2 ${images.length === 1 ? 'sm:grid-cols-1 max-w-xl' : ''} ${className}`}
    >
      {images.map((img, i) => (
        <figure key={`${img.src}-${i}`} className="overflow-hidden rounded-sm border border-ink-200 bg-ink-50">
          <img
            src={img.src}
            alt={img.alt}
            className="w-full object-cover object-center max-h-72"
            loading="lazy"
            decoding="async"
          />
          {img.caption ? (
            <figcaption className="border-t border-ink-100 px-3 py-2 text-xs leading-snug text-ink-600">
              {img.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
};
