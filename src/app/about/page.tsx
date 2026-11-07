'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Dumbbell, 
  Target, 
  Users, 
  ShieldCheck, 
  MapPin, 
  ArrowRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { getGymSettings, generateWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/dataStore';
import { defaultGymSettings } from '@/lib/defaultData';
import { GymSettings } from '@/types';

export default function AboutPage() {
  const [settings, setSettings] = useState<GymSettings>(defaultGymSettings);

  useEffect(() => {
    getGymSettings().then(setSettings);
  }, []);

  const whatsappUrl = generateWhatsAppUrl(
    settings.whatsapp_number,
    generateGeneralEnquiryMessage()
  );

  return (
    <div className="py-16 sm:py-24 bg-[#08090b]">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="ABOUT OFF THE GRID GYM"
          title="DISCIPLINE OVER DISTRACTIONS."
          highlightedText="PURE RESULTS."
          description="Off The Grid Gym was created with a single objective: to give Ropar a raw, serious, and world-class athletic environment where lifters can execute real progressive overload without ego or clutter."
        />

        {/* Story Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-gray-300 text-sm sm:text-base leading-relaxed">
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              The Philosophy Behind <span className="text-[#00ff66]">“Off The Grid”</span>
            </h3>
            <p>
              In modern gyms, workouts often get lost in social media posturing, overcrowded waiting lines, and gimmicky machine setups that sacrifice joint health for novelty.
            </p>
            <p>
              At <strong>Off The Grid Gym Ropar</strong>, we built a sanctuary for individuals who value their time and physical capacity. Stepping into our Bal Sanda facility means tuning out the noise, challenging your personal limits, and building functional muscle and cardiovascular grit through honest effort.
            </p>
            <p>
              Whether you are an aspiring athlete striving for heavier deadlifts, a working professional carving out disciplined strength sessions, or someone embarking on their very first body recomposition journey, our gym floor provides the equipment, atmosphere, and guidance you need.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-200">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#00ff66] shrink-0" />
                <span>Heavy Dumbbells up to 40kg+</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#00ff66] shrink-0" />
                <span>Dual Squat & Power Cages</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#00ff66] shrink-0" />
                <span>Safe, Respectful Unisex Floor</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#00ff66] shrink-0" />
                <span>Open 7 Days a Week in Bal Sanda</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0e1117]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80"
                alt="Off The Grid Gym Barbells and Racks"
                className="w-full h-[450px] object-cover object-center filter contrast-110 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15">
                <div className="text-xs font-bold uppercase text-[#00ff66] tracking-wider">
                  Location Highlight
                </div>
                <div className="text-sm font-black text-white uppercase mt-0.5">
                  Bal Sanda, Rupnagar (Ropar)
                </div>
                <div className="text-[11px] text-gray-400 mt-0.5">
                  Easy accessibility with dedicated parking for two-wheelers and cars.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of OTG */}
        <div className="mt-24">
          <SectionHeader
            eyebrow="OUR FOUNDATIONAL VALUES"
            title="WHAT MAKES US"
            highlightedText="DIFFERENT"
            description="We reject generic fitness gimmicks and prioritize clinical results, hygiene, and iron discipline."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="p-7 rounded-2xl bg-[#0e1117] border border-white/10 hover:border-[#00ff66]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00ff66] mb-5">
                <Dumbbell className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white uppercase mb-2">Heavy Free Weights</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Olympic barbells, precision bumper plates, and a complete dumbbell array for benching, squatting, and deadlifting without compromise.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#0e1117] border border-white/10 hover:border-[#00ff66]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00ff66] mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white uppercase mb-2">Biomechanic Stations</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Selected plate-loaded and selectorized machines that follow natural human movement arcs, maximizing target muscle recruitment.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#0e1117] border border-white/10 hover:border-[#00ff66]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00ff66] mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white uppercase mb-2">Respectful Community</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Zero tolerance for harassment or unsafe behavior. A supportive training ground where athletes celebrate each other’s personal records.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#0e1117] border border-white/10 hover:border-[#00ff66]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00ff66] mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white uppercase mb-2">No Subscription Lock-In</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Transparent month-to-month, quarterly, or yearly admissions. No automated credit card recurring billing or predatory renewal traps.
              </p>
            </div>
          </div>
        </div>

        {/* CTA banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0d1610] via-[#102216] to-[#0d1610] border border-[#00ff66]/30 text-center">
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Ready to experience Off The Grid Gym in person?
          </h3>
          <p className="mt-2 text-sm text-gray-300 max-w-xl mx-auto">
            Visit our facility in Bal Sanda, Ropar or message us on WhatsApp to book your complimentary 1-Day Trial.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#00ff66] text-black font-black uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(0,255,102,0.3)] hover:bg-[#05e05d] transition-all"
            >
              <Flame className="w-4 h-4 fill-black" />
              <span>Message on WhatsApp</span>
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold uppercase tracking-wider text-xs transition-all"
            >
              <span>View Membership Plans</span>
              <ArrowRight className="w-4 h-4 text-[#00ff66]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

