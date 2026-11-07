'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import PricingManager from '@/components/admin/PricingManager';
import OffersManager from '@/components/admin/OffersManager';
import SettingsManager from '@/components/admin/SettingsManager';
import TrainersManager from '@/components/admin/TrainersManager';
import GalleryManager from '@/components/admin/GalleryManager';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('pricing');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('otg_admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push('/admin/login');
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#08090b] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#00ff66] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
            Checking Owner Authorization...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#08090b] text-[#f3f4f6]">
      <AdminHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === 'pricing' && <PricingManager />}
        {activeTab === 'offers' && <OffersManager />}
        {activeTab === 'settings' && <SettingsManager />}
        {activeTab === 'trainers' && <TrainersManager />}
        {activeTab === 'gallery' && <GalleryManager />}
      </main>
    </div>
  );
}

