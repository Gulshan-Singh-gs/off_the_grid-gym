'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getGymSettings, generateWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/dataStore';
import { defaultGymSettings } from '@/lib/defaultData';
import { GymSettings } from '@/types';

export default function FloatingWhatsApp() {
  const [settings, setSettings] = useState<GymSettings>(defaultGymSettings);
  const [showTooltip, setShowTooltip] = useState(true);

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
    <div className="fixed bottom-20 sm:bottom-6 right-5 z-40 flex flex-col items-end gap-2 group">
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#0e1217] border border-[#00ff66]/30 text-white px-3.5 py-2 rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.8)] text-xs animate-bounce duration-1000">
          <div className="flex flex-col">
            <span className="font-bold text-[#00ff66]">Have questions?</span>
            <span className="text-[11px] text-gray-300">Chat with coach on WhatsApp</span>
          </div>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-white ml-1 p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Pill */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold px-4 py-3 rounded-full shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:shadow-[0_0_35px_rgba(37,211,102,0.6)] transform hover:scale-105 transition-all duration-300"
        aria-label="Enquire via WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-30"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
        </span>
        <MessageCircle className="w-6 h-6 fill-black text-black" />
        <span className="text-xs uppercase tracking-wider hidden md:inline">
          WhatsApp Enquiry
        </span>
      </a>
    </div>
  );
}

