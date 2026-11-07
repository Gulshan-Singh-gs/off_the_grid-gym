'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Check, 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { MembershipPlan, GymSettings } from '@/types';
import { 
  getMembershipPlans, 
  getGymSettings, 
  generateWhatsAppUrl, 
  generatePlanEnquiryMessage 
} from '@/lib/dataStore';
import { defaultMembershipPlans, defaultGymSettings } from '@/lib/defaultData';

export default function PricingPreview() {
  const [plans, setPlans] = useState<MembershipPlan[]>(defaultMembershipPlans);
  const [settings, setSettings] = useState<GymSettings>(defaultGymSettings);

  useEffect(() => {
    getMembershipPlans().then(setPlans);
    getGymSettings().then(setSettings);

    const handleUpdate = () => {
      getMembershipPlans().then(setPlans);
      getGymSettings().then(setSettings);
    };

    window.addEventListener('otg_datastore_updated', handleUpdate);
    return () => window.removeEventListener('otg_datastore_updated', handleUpdate);
  }, []);

  return (
    <section className="py-24 bg-[#0a0c10] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="TRANSPARENT ADMISSION"
          title="MEMBERSHIP"
          highlightedText="PACKAGES"
          description="Honest, upfront pricing for Ropar lifters. No hidden admission charges, no automatic credit card rebilling. Pay directly at the gym or enquire on WhatsApp."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const isPopular = plan.is_popular;
            const planWhatsAppUrl = generateWhatsAppUrl(
              settings.whatsapp_number,
              generatePlanEnquiryMessage(plan.name, plan.price_inr)
            );

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 ${
                  isPopular
                    ? 'bg-[#0f141a] border-2 border-[#00ff66] shadow-[0_0_30px_rgba(0,255,102,0.15)] scale-[1.02]'
                    : 'bg-[#0e1117] border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Popular or Custom Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                    <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-black bg-[#00ff66] shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 fill-black" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-xl font-black uppercase text-white tracking-wide">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 min-h-[32px]">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="my-6 pb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-bold text-[#00ff66]">₹</span>
                      <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-sans">
                        {plan.price_inr.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">
                        / {plan.duration_label}
                      </span>
                    </div>

                    {plan.original_price_inr && plan.original_price_inr > plan.price_inr && (
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs line-through text-gray-500">
                          ₹{plan.original_price_inr.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] font-bold text-[#00ff66] bg-[#00ff66]/10 px-1.5 py-0.5 rounded">
                          Save ₹{(plan.original_price_inr - plan.price_inr).toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features list */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <div className="rounded-full p-0.5 bg-[#00ff66]/10 text-[#00ff66] shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Conversion CTA */}
                <div className="pt-2">
                  <a
                    href={planWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      isPopular
                        ? 'bg-[#00ff66] hover:bg-[#05e05d] text-black shadow-[0_0_20px_rgba(0,255,102,0.3)] hover:shadow-[0_0_30px_rgba(0,255,102,0.5)]'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-[#00ff66]/40'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Enquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote reassurance */}
        <div className="mt-12 text-center flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#00ff66]" />
            No Online Card Payment Required
          </span>
          <span>•</span>
          <span>Direct In-Person Payment via Cash, UPI (GPay / PhonePe)</span>
          <span>•</span>
          <Link href="/pricing" className="text-[#00ff66] hover:underline font-semibold flex items-center gap-1">
            View All Plan Details <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}

