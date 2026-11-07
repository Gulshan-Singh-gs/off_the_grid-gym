'use client';

import { useState, useEffect } from 'react';
import { Maximize2, Camera } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import SectionHeader from '@/components/ui/SectionHeader';
import LightboxModal from '@/components/ui/LightboxModal';
import { GalleryImage, GalleryCategory, GymSettings } from '@/types';
import { getGalleryImages, getGymSettings } from '@/lib/dataStore';
import { defaultGalleryImages, defaultGymSettings } from '@/lib/defaultData';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>(defaultGalleryImages);
  const [settings, setSettings] = useState<GymSettings>(defaultGymSettings);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    getGalleryImages().then(setImages);
    getGymSettings().then(setSettings);

    const handleUpdate = () => {
      getGalleryImages().then(setImages);
      getGymSettings().then(setSettings);
    };

    window.addEventListener('otg_datastore_updated', handleUpdate);
    return () => window.removeEventListener('otg_datastore_updated', handleUpdate);
  }, []);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'freeweights', label: 'Free Weights & Dumbbells' },
    { id: 'strength', label: 'Strength & Machines' },
    { id: 'cardio', label: 'Cardio Deck' },
    { id: 'ambience', label: 'Gym Ambience' },
    { id: 'community', label: 'Turf & Community' },
  ];

  const filtered = selectedCategory === 'all'
    ? images
    : images.filter((img) => img.category === selectedCategory);

  const openLightbox = (idx: number) => {
    setCurrentIdx(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="py-16 sm:py-24 bg-[#08090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FACILITY MEDIA"
          title="OFF THE GRID"
          highlightedText="PHOTO GALLERY"
          description="Explore our training environment, high-grade equipment, and athletic community in Bal Sanda, Ropar."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#00ff66] text-black shadow-[0_0_20px_rgba(0,255,102,0.3)]'
                  : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((image, idx) => (
            <div
              key={image.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-[#151922] border border-white/10 hover:border-[#00ff66]/50 cursor-pointer shadow-xl transition-all duration-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.image_url}
                alt={image.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Category pill */}
              <div className="absolute top-3.5 left-3.5">
                <span className="px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider text-black bg-[#00ff66]">
                  {image.category}
                </span>
              </div>

              {/* Hover expand icon */}
              <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white group-hover:text-[#00ff66] opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide truncate">
                  {image.title}
                </h3>
                {image.caption && (
                  <p className="text-xs text-gray-300 truncate mt-0.5">
                    {image.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Callout */}
        <div className="mt-20 p-8 rounded-3xl bg-[#0e1117] border border-white/10 text-center max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-[#00ff66]/10 border border-[#00ff66]/30 flex items-center justify-center text-[#00ff66] mb-4">
            <InstagramIcon className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-black text-white uppercase">
            Want to see daily workout reels & community updates?
          </h4>
          <p className="text-xs text-gray-400 mt-1 max-w-md">
            Follow our verified Instagram profile <strong>{settings.instagram_handle}</strong> for workout clips, transformation highlights, and facility announcements.
          </p>
          <a
            href={settings.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 hover:bg-[#00ff66] text-white hover:text-black border border-white/10 hover:border-[#00ff66] text-xs font-black uppercase tracking-wider transition-all"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Open {settings.instagram_handle}</span>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        images={filtered}
        currentIndex={currentIdx}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setCurrentIdx((prev) => (prev + 1) % filtered.length)}
        onPrev={() => setCurrentIdx((prev) => (prev - 1 + filtered.length) % filtered.length)}
      />
    </div>
  );
}
