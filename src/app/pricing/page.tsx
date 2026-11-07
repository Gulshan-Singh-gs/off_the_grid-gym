'use client';

import { useState, useEffect } from 'react';
import { 
  Check, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle,
  PhoneCall,
  Clock,
  ArrowRight
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { MembershipPlan, GymSettings } from '@/types';
import { 
  getMembershipPlans, 
  getGymSettings, 
  generateWhatsAppUrl, 
  generatePlanEnquiryMessage,
  generateGeneralEnquiryMessage 
} from '@/lib/dataStore';
import { defaultMembershipPlans, defaultGymSettings } from '@/lib/defaultData';

export default function PricingPage() {
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

  const generalWhatsApp = generateWhatsAppUrl(
    settings.whatsapp_number,
    generateGeneralEnquiryMessage()
  );

  const faqs = [
    {
      q: 'Are there any hidden admission or registration fees?',
      a: 'No. At Off The Grid Gym, we believe in 100% transparent pricing. The fees displayed above cover your admission, gym floor access, locker usage, and general trainer floor assistance. No surprise registration charges.',
    },
    {
      q: 'How do I pay for my membership?',
      a: 'In keeping with our straightforward policy, there is no online credit card checkout or automatic subscription renewal. You can pay in person at the front desk via UPI (Google Pay, PhonePe, Paytm), Cash, or Bank Transfer upon your physical visit.',
    },
    {
      q: 'Can I freeze or pause my membership if I travel or fall ill?',
      a: 'Yes! Our 6-Month and 12-Month membership packages come with a complimentary membership freeze option (up to 15 to 30 days) with prior notice.',
    },
    {
      q: 'Can I visit for a trial before committing to a plan?',
      a: 'Absolutely. We welcome prospective members to visit our Bal Sanda location for a complimentary 1-Day Trial workout to experience the equipment and atmosphere firsthand.',
    },
  ];

  return (
    <div className="py-16 sm:py-24 bg-[#08090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="TRANSPARENT ADMISSIONS"
          title="MEMBERSHIP PLANS &"
          highlightedText="PRICING"
          description="Straightforward, value-driven memberships for athletes in Ropar. Choose your training duration and begin your transformation today."
        />

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {plans.map((plan) => {
            const isPopular = plan.is_popular;
            const planWhatsAppUrl = generateWhatsAppUrl(
              settings.whatsapp_number,
              generatePlanEnquiryMessage(plan.name, plan.price_inr)
            );

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl flex flex-col justify-between p-7 transition-all duration-300 ${
                  isPopular
                    ? 'bg-[#0f141b] border-2 border-[#00ff66] shadow-[0_0_35px_rgba(0,255,102,0.18)] scale-[1.02]'
                    : 'bg-[#0e1117] border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Badge */}
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
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-[#00ff66]">₹</span>
                      <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-sans">
                        {plan.price_inr.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-gray-400 font-medium ml-1">
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

                  {/* Feature list */}
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

                {/* Direct Action Button */}
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

        {/* Reassurance Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-[#0b0e14] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#00ff66]/10 border border-[#00ff66]/30 flex items-center justify-center text-[#00ff66] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white uppercase">
                Zero Hidden Charges Guarantee
              </h4>
              <p className="text-xs text-gray-400 mt-0.5">
                All prices are inclusive of facility usage, locker access, and floor trainer support.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${settings.phone_number.replace(/\s+/g, '')}`}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white flex items-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#00ff66]" />
              <span>Call Front Desk</span>
            </a>
            <a
              href={generalWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#00ff66] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#05e05d] shadow-md flex items-center gap-2"
            >
              <span>Get 1-Day Pass</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Pricing FAQs */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-[#00ff66]" />
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Everything you need to know before joining Off The Grid Gym Ropar.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#0e1117] border border-white/5 hover:border-white/15 transition-colors"
              >
                <h4 className="text-sm sm:text-base font-bold text-white mb-2">
                  {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

