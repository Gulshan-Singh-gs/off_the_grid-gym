'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import ActiveOfferBanner from '@/components/home/ActiveOfferBanner';
import FacilitiesPreview from '@/components/home/FacilitiesPreview';
import PricingPreview from '@/components/home/PricingPreview';
import TrainersPreview from '@/components/home/TrainersPreview';
import GalleryPreview from '@/components/home/GalleryPreview';
import LocationSection from '@/components/home/LocationSection';
import { getGymSettings } from '@/lib/dataStore';
import { defaultGymSettings } from '@/lib/defaultData';
import { GymSettings } from '@/types';

export default function HomePage() {
  const [settings, setSettings] = useState<GymSettings>(defaultGymSettings);

  useEffect(() => {
    getGymSettings().then(setSettings);
    const handleUpdate = () => getGymSettings().then(setSettings);
    window.addEventListener('otg_datastore_updated', handleUpdate);
    return () => window.removeEventListener('otg_datastore_updated', handleUpdate);
  }, []);

  return (
    <div className="flex flex-col">
      <HeroSection settings={settings} />
      <StatsSection />
      <ActiveOfferBanner />
      <FacilitiesPreview />
      <PricingPreview />
      <TrainersPreview />
      <GalleryPreview />
      <LocationSection settings={settings} />
    </div>
  );
}
