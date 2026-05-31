import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import type { ContentImage } from '../types';
import { ImageLightbox } from './ImageLightbox';

type ContentImageGridProps = {
  images: ContentImage[];
  /** Extra wrapper classes */
  className?: string;
};

function gridClassName(count: number): string {
  if (count === 1) return 'grid-cols-1 max-w-2xl';
  if (count === 2) return 'grid-cols-1 sm:grid-cols-2';
  return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
}

/**
 * Responsive grid for research / project / news figures. Click any image to open a full-size lightbox.
 */
export const ContentImageGrid: React.FC<ContentImageGridProps> = ({ images, className = '' }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images?.length) return null;

  return (
    <>
      <div className={`grid gap-3 ${gridClassName(images.length)} ${className}`}>
        {images.map((img, i) => (
          <figure
            key={`${img.src}-${i}`}
            className="overflow-hidden rounded-sm border border-ink-200 bg-ink-50 shadow-sm"
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group relative block w-full cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-900"
              aria-label={`View larger: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto max-h-56 sm:max-h-64 md:max-h-72 object-cover object-center transition duration-200 group-hover:brightness-[0.97]"
                loading="lazy"
                decoding="async"
              />
              <span
                className="absolute bottom-2 right-2 flex items-center gap-1 rounded-sm bg-ink-900/75 px-2 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:opacity-90"
                aria-hidden
              >
                <ZoomIn size={12} />
                Enlarge
              </span>
            </button>
            {img.caption ? (
              <figcaption className="border-t border-ink-100 px-3 py-2 text-xs leading-snug text-ink-600">
                {img.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      <ImageLightbox
        images={images}
        openIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
};
