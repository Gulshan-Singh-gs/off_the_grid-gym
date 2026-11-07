'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Tag, 
  Calendar, 
  ArrowRight, 
  Flame, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { PromotionalOffer, GymSettings } from '@/types';
import { 
  getPromotionalOffers, 
  getGymSettings, 
  generateWhatsAppUrl, 
  generateOfferEnquiryMessage,
  formatDisplayDate
} from '@/lib/dataStore';
import { defaultPromotionalOffers, defaultGymSettings } from '@/lib/defaultData';

export default function OffersPage() {
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

  return (
    <div className="py-16 sm:py-24 bg-[#08090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="PROMOTIONS & DISCOUNTS"
          title="ACTIVE PROMOTIONAL"
          highlightedText="OFFERS"
          description="Take advantage of our current admissions specials, buddy discounts, and seasonal packages in Bal Sanda, Ropar."
        />

        {offers.length === 0 ? (
          <div className="max-w-xl mx-auto text-center py-16 px-6 rounded-3xl bg-[#0e1117] border border-white/10 my-12">
            <Clock className="w-12 h-12 text-[#00ff66] mx-auto mb-4" />
            <h3 className="text-xl font-black text-white uppercase">
              No Public Promotions Right Now
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed">
              All seasonal promotions have currently concluded. However, we always welcome new athletes with our standard transparent pricing!
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/pricing"
                className="px-5 py-2.5 rounded-xl bg-[#00ff66] text-black font-extrabold text-xs uppercase"
              >
                View Standard Pricing
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-xl bg-white/5 text-white font-bold text-xs uppercase border border-white/10"
              >
                Contact Front Desk
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {offers.map((offer) => {
              const offerWhatsAppUrl = generateWhatsAppUrl(
                settings.whatsapp_number,
                generateOfferEnquiryMessage(offer.title, offer.promo_code)
              );

              return (
                <div
                  key={offer.id}
                  className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0e141a] via-[#0e1117] to-[#0c0e12] border border-[#00ff66]/30 p-8 sm:p-10 shadow-2xl flex flex-col justify-between"
                >
                  <div>
                    {/* Top Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-black bg-[#00ff66] flex items-center gap-1 shadow-md">
                        <Sparkles className="w-3 h-3 fill-black" />
                        {offer.badge}
                      </span>
                      {offer.applicable_plan && (
                        <span className="text-[11px] font-semibold text-gray-400">
                          Applies to: {offer.applicable_plan}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                      {offer.title}
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {offer.description}
                    </p>

                    {/* Offer details highlight */}
                    <div className="my-6 p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-[#00ff66]" />
                          Discount Value:
                        </span>
                        <span className="font-black text-[#00ff66] text-sm">
                          {offer.discount_text}
                        </span>
                      </div>

                      {offer.promo_code && (
                        <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
                          <span className="text-gray-400">Promo Code:</span>
                          <span className="font-mono font-bold text-white tracking-widest bg-white/10 px-2 py-0.5 rounded">
                            {offer.promo_code}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          Valid Through:
                        </span>
                        <span className="font-semibold text-gray-200">
                          {formatDisplayDate(offer.valid_until)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Claim Button */}
                  <div className="pt-2">
                    <a
                      href={offerWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 px-6 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-[#00ff66] hover:bg-[#05e05d] shadow-[0_0_25px_rgba(0,255,102,0.3)] hover:shadow-[0_0_35px_rgba(0,255,102,0.5)] flex items-center justify-center gap-2 transition-all"
                    >
                      <Flame className="w-4 h-4 fill-black" />
                      <span>Claim This Offer via WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* How to Redeem Guide */}
        <div className="mt-20 max-w-4xl mx-auto p-8 rounded-3xl bg-[#0b0e14] border border-white/10">
          <h4 className="text-lg font-black text-white uppercase tracking-wide mb-4">
            How to Redeem Your Offer in Ropar:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-gray-300">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#00ff66] text-black font-black flex items-center justify-center shrink-0">
                1
              </div>
              <p>
                Click <strong>Claim This Offer</strong> to open a pre-filled WhatsApp conversation with the front desk.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#00ff66] text-black font-black flex items-center justify-center shrink-0">
                2
              </div>
              <p>
                Confirm your slot and preferred workout timing (Morning 5:30 AM or Evening).
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#00ff66] text-black font-black flex items-center justify-center shrink-0">
                3
              </div>
              <p>
                Visit Off The Grid Gym in Bal Sanda, present your promo code, and start training!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
