'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Maximize2 } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import LightboxModal from '@/components/ui/LightboxModal';
import { GalleryImage } from '@/types';
import { getGalleryImages } from '@/lib/dataStore';
import { defaultGalleryImages } from '@/lib/defaultData';

export default function GalleryPreview() {
  const [images, setImages] = useState<GalleryImage[]>(defaultGalleryImages);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    getGalleryImages().then(setImages);
    const handleUpdate = () => getGalleryImages().then(setImages);
    window.addEventListener('otg_datastore_updated', handleUpdate);
    return () => window.removeEventListener('otg_datastore_updated', handleUpdate);
  }, []);

  const openLightbox = (index: number) => {
    setActiveImageIdx(index);
    setLightboxOpen(true);
  };

  const previewImages = images.slice(0, 6);

  return (
    <section className="py-24 bg-[#0a0c10] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FACILITY GALLERY"
          title="THE TRAINING"
          highlightedText="GROUND"
          description="A glimpse into Off The Grid Gym’s atmospheric interior in Bal Sanda, Ropar. Modern equipment, high-octane lighting, and a focused gym floor."
        />

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewImages.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-[#151922] border border-white/10 hover:border-[#00ff66]/50 cursor-pointer shadow-lg transition-all duration-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.image_url}
                alt={img.title}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Category pill */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider text-black bg-[#00ff66]">
                  {img.category}
                </span>
              </div>

              {/* Hover expand icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white group-hover:text-[#00ff66] opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Title & Caption preview */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide truncate">
                  {img.title}
                </h3>
                {img.caption && (
                  <p className="text-[11px] text-gray-300 truncate mt-0.5">
                    {img.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Link to all photos */}
        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:border-[#00ff66]/40 transition-all"
          >
            <span>View Complete Gym Gallery</span>
            <ArrowRight className="w-4 h-4 text-[#00ff66]" />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        images={previewImages}
        currentIndex={activeImageIdx}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setActiveImageIdx((prev) => (prev + 1) % previewImages.length)}
        onPrev={() => setActiveImageIdx((prev) => (prev - 1 + previewImages.length) % previewImages.length)}
      />
    </section>
  );
}

