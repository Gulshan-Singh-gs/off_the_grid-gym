'use client';

import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '@/types';

interface LightboxModalProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function LightboxModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close modal"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-[#00ff66] text-white hover:text-black transition-colors"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-[#00ff66] text-white hover:text-black transition-colors"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Image Container */}
      <div className="max-w-5xl w-full flex flex-col items-center">
        <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage.image_url}
            alt={currentImage.title}
            className="w-auto h-auto max-h-[75vh] max-w-full object-contain"
          />
        </div>

        {/* Caption & Metadata */}
        <div className="mt-4 text-center max-w-2xl px-4">
          <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-[#00ff66] bg-[#00ff66]/10 border border-[#00ff66]/30 mb-1.5">
            {currentImage.category}
          </div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">
            {currentImage.title}
          </h3>
          {currentImage.caption && (
            <p className="mt-1 text-sm text-gray-400 font-normal">
              {currentImage.caption}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-2">
            Image {currentIndex + 1} of {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}

