import React, { useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ContentImage } from '../types';

type ImageLightboxProps = {
  images: ContentImage[];
  openIndex: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  openIndex,
  onClose,
  onIndexChange,
}) => {
  const hasMultiple = images.length > 1;
  const current = openIndex !== null ? images[openIndex] : null;

  const goPrev = useCallback(() => {
    if (openIndex === null) return;
    onIndexChange((openIndex - 1 + images.length) % images.length);
  }, [openIndex, images.length, onIndexChange]);

  const goNext = useCallback(() => {
    if (openIndex === null) return;
    onIndexChange((openIndex + 1) % images.length);
  }, [openIndex, images.length, onIndexChange]);

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasMultiple) goPrev();
      if (e.key === 'ArrowRight' && hasMultiple) goNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [openIndex, onClose, goPrev, goNext, hasMultiple]);

  if (openIndex === null || !current) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink-900/90 backdrop-blur-sm cursor-zoom-out"
        onClick={onClose}
        aria-label="Close image viewer"
      />

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-3 pointer-events-none">
        <div className="pointer-events-auto flex w-full items-center justify-center gap-2 sm:gap-4">
          {hasMultiple ? (
            <button
              type="button"
              onClick={goPrev}
              className="shrink-0 rounded-sm border border-white/30 bg-ink-900/60 p-2 text-white hover:bg-ink-900/80 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} aria-hidden />
            </button>
          ) : (
            <span className="w-10 shrink-0 sm:w-11" aria-hidden />
          )}

          <figure className="min-w-0 flex-1 flex flex-col items-center">
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[min(85vh,900px)] w-auto max-w-full object-contain rounded-sm shadow-2xl"
            />
            {current.caption ? (
              <figcaption className="mt-3 max-w-2xl text-center text-sm text-stone-200 leading-relaxed px-2">
                {current.caption}
              </figcaption>
            ) : (
              <figcaption className="sr-only">{current.alt}</figcaption>
            )}
          </figure>

          {hasMultiple ? (
            <button
              type="button"
              onClick={goNext}
              className="shrink-0 rounded-sm border border-white/30 bg-ink-900/60 p-2 text-white hover:bg-ink-900/80 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={22} aria-hidden />
            </button>
          ) : (
            <span className="w-10 shrink-0 sm:w-11" aria-hidden />
          )}
        </div>

        {hasMultiple ? (
          <p className="pointer-events-auto text-xs text-stone-300 tabular-nums">
            {openIndex + 1} / {images.length}
          </p>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 rounded-sm border border-white/30 bg-ink-900/70 p-2 text-white hover:bg-ink-900 transition-colors pointer-events-auto"
        aria-label="Close"
      >
        <X size={22} aria-hidden />
      </button>
    </div>
  );
};
