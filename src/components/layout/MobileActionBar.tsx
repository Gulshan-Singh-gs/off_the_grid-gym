'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Navigation, Tag } from 'lucide-react';
import { getGymSettings, generateWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/dataStore';
import { defaultGymSettings } from '@/lib/defaultData';
import { GymSettings } from '@/types';

export default function MobileActionBar() {
  const [settings, setSettings] = useState<GymSettings>(defaultGymSettings);

  useEffect(() => {
    getGymSettings().then(setSettings);
    const handleUpdate = () => getGymSettings().then(setSettings);
    window.addEventListener('otg_datastore_updated', handleUpdate);
    return () => window.removeEventListener('otg_datastore_updated', handleUpdate);
  }, []);

  const whatsappUrl = generateWhatsAppUrl(
    settings.whatsapp_number,
    generateGeneralEnquiryMessage()
  );

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#08090b]/95 backdrop-blur-lg border-t border-white/10 px-3 py-2 flex items-center justify-between gap-2 shadow-[0_-5px_20px_rgba(0,0,0,0.8)]">
      {/* Call Button */}
      <a
        href={`tel:${settings.phone_number.replace(/\s+/g, '')}`}
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 border border-white/5 active:scale-95 transition-transform"
      >
        <Phone className="w-4 h-4 text-[#00ff66] mb-0.5" />
        <span className="text-[10px] font-semibold uppercase tracking-wider">Call Gym</span>
      </a>

      {/* WhatsApp Button (High visual contrast) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-[#25D366] text-black font-black active:scale-95 transition-transform shadow-[0_0_15px_rgba(37,211,102,0.4)]"
      >
        <MessageCircle className="w-4 h-4 fill-black text-black mb-0.5" />
        <span className="text-[10px] uppercase tracking-wider">WhatsApp</span>
      </a>

      {/* Directions Button */}
      <a
        href={settings.google_maps_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 border border-white/5 active:scale-95 transition-transform"
      >
        <Navigation className="w-4 h-4 text-[#00ff66] mb-0.5" />
        <span className="text-[10px] font-semibold uppercase tracking-wider">Directions</span>
      </a>

      {/* View Plans */}
      <Link
        href="/pricing"
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 border border-white/5 active:scale-95 transition-transform"
      >
        <Tag className="w-4 h-4 text-[#00ff66] mb-0.5" />
        <span className="text-[10px] font-semibold uppercase tracking-wider">Fees</span>
      </Link>
    </div>
  );
}

