'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Calendar, Tag, ArrowRight } from 'lucide-react';
import { PromotionalOffer, GymSettings } from '@/types';
import { 
  getPromotionalOffers, 
  getGymSettings, 
  generateWhatsAppUrl, 
  generateOfferEnquiryMessage,
  formatDisplayDate
} from '@/lib/dataStore';
import { defaultPromotionalOffers, defaultGymSettings } from '@/lib/defaultData';

export default function ActiveOfferBanner() {
  const [offers, setOffers] = useState<PromotionalOffer[]>(defaultPromotionalOffers);
  const [settings, setSettings] = useState<GymSettings>(defaultGymSettings);

  useEffect(() => {
    getPromotionalOffers(true).then(setOffers);
    getGymSettings().then(setSettings);

    const handleUpdate = () => {
      getPromotionalOffers(true).then(setOffers);
      getGymSettings().then(setSettings);
    };

    window.addEventListener('otg_datastore_updated', handleUpdate);
    return () => window.removeEventListener('otg_datastore_updated', handleUpdate);
  }, []);

  // Return null if no active non-expired offer exists
  if (!offers || offers.length === 0) return null;

  const currentOffer = offers[0];
  const offerWhatsAppUrl = generateWhatsAppUrl(
    settings.whatsapp_number,
    generateOfferEnquiryMessage(currentOffer.title, currentOffer.promo_code)
  );

  return (
    <section className="py-12 bg-gradient-to-b from-[#0a0c10] to-[#08090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0d1810] via-[#0f2115] to-[#0d1810] border border-[#00ff66]/30 p-8 sm:p-12 shadow-[0_0_50px_rgba(0,255,102,0.15)]">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ff66]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#00ff66]/20 text-[#00ff66] border border-[#00ff66]/40 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentOffer.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                {currentOffer.title}
              </h3>

              <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                {currentOffer.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-gray-300">
                <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                  <Tag className="w-3.5 h-3.5 text-[#00ff66]" />
                  <span>Discount: <strong className="text-[#00ff66]">{currentOffer.discount_text}</strong></span>
                </div>
                {currentOffer.promo_code && (
                  <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 font-mono">
                    <span>Code: <strong className="text-white tracking-widest">{currentOffer.promo_code}</strong></span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>Valid Until: <strong>{formatDisplayDate(currentOffer.valid_until)}</strong></span>
                </div>
              </div>
            </div>

            {/* Action Box */}
            <div className="shrink-0 flex flex-col items-center gap-3">
              <a
                href={offerWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-black uppercase tracking-wider text-black bg-[#00ff66] hover:bg-[#05e05d] shadow-[0_0_25px_rgba(0,255,102,0.4)] hover:shadow-[0_0_35px_rgba(0,255,102,0.6)] transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Claim Offer on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-[11px] text-gray-400">
                Mention code upon visit or during WhatsApp enquiry
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
