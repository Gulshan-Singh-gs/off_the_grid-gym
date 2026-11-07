'use client';

import Link from 'next/link';
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  Flame, 
  Clock, 
  ChevronDown 
} from 'lucide-react';
import { GymSettings } from '@/types';
import { generateWhatsAppUrl } from '@/lib/dataStore';

interface HeroSectionProps {
  settings: GymSettings;
}

export default function HeroSection({ settings }: HeroSectionProps) {
  const trialWhatsAppUrl = generateWhatsAppUrl(
    settings.whatsapp_number,
    `Hello Off The Grid Gym Ropar! 👋\n\nI want to claim a 1-Day Free Trial Workout Pass and check out the gym facilities at Bal Sanda. Please let me know what time works best for a visit!`
  );

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#08090b] pt-8 pb-20">
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 z-0">
        {/* Background Image with Dark Gradient Overlay */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=85"
          alt="Off The Grid Gym Interior Atmosphere"
          className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-125 scale-105"
        />
        {/* Dynamic Vignette & Grid */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-[#08090b]/60 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient opacity-80" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      </div>

      {/* Central Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        {/* Official Brand Emblem */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-black/90 border border-[#00ff66]/40 p-2 shadow-[0_0_30px_rgba(0,255,102,0.25)] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.webp"
              alt="Off The Grid Gym Emblem"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Location & Status Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff66] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00ff66]"></span>
          </span>
          <MapPin className="w-3.5 h-3.5 text-[#00ff66]" />
          <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
            BAL SANDA, ROPAR • UNISEX FITNESS CENTER
          </span>
        </div>

        {/* Main Athletic Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white font-sans leading-[0.95]">
          TRAIN OFF THE GRID.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00ff66] to-[#00ff66]">
            BUILD REAL POWER.
          </span>
        </h1>

        {/* Subtitle / Value Proposition */}
        <p className="mt-6 text-base sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-normal">
          Ropar’s premier strength and transformation ground. Biomechanically precise machines, Olympic free weights, dedicated cardio deck, and certified trainers focused on your physical peak.
        </p>

        {/* Conversion Action Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={trialWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm sm:text-base font-black uppercase tracking-wider text-black bg-[#00ff66] hover:bg-[#05e05d] rounded-xl shadow-[0_0_30px_rgba(0,255,102,0.4)] hover:shadow-[0_0_40px_rgba(0,255,102,0.6)] transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <Flame className="w-5 h-5 fill-black" />
            <span>Claim Free 1-Day Trial Pass</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          <Link
            href="/facilities"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-bold uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/15 hover:border-[#00ff66]/50 transition-all backdrop-blur-sm"
          >
            <span>Explore Facilities</span>
          </Link>
        </div>

        {/* Feature Highlights Pills */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
            <Zap className="w-5 h-5 text-[#00ff66] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Heavy Iron</div>
              <div className="text-[11px] text-gray-400">Up to 40kg+ Dumbbells</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
            <Clock className="w-5 h-5 text-[#00ff66] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">7 Days Open</div>
              <div className="text-[11px] text-gray-400">5:30 AM to 10:00 PM</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
            <ShieldCheck className="w-5 h-5 text-[#00ff66] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Unisex Gym</div>
              <div className="text-[11px] text-gray-400">Safe, Clean & Guided</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
            <MapPin className="w-5 h-5 text-[#00ff66] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Bal Sanda</div>
              <div className="text-[11px] text-gray-400">Prime Ropar Location</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex justify-center">
          <Link
            href="#facilities-overview"
            className="text-gray-500 hover:text-[#00ff66] transition-colors animate-bounce p-2"
            aria-label="Scroll to content"
          >
            <ChevronDown className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  );
}

