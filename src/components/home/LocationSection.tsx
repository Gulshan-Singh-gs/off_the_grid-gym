'use client';

import { 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  Navigation, 
  MessageCircle
} from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import SectionHeader from '@/components/ui/SectionHeader';
import { GymSettings } from '@/types';
import { generateWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/dataStore';

interface LocationSectionProps {
  settings: GymSettings;
}

export default function LocationSection({ settings }: LocationSectionProps) {
  const whatsappUrl = generateWhatsAppUrl(
    settings.whatsapp_number,
    generateGeneralEnquiryMessage()
  );

  return (
    <section id="location-hours" className="py-24 bg-[#08090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="LOCATION & TIMINGS"
          title="VISIT US IN"
          highlightedText="ROPAR"
          description="Centrally located in Bal Sanda, Rupnagar. Ample parking, hassle-free road access, and generous operating hours tailored for early morning and evening lifters."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Information Card (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0e1117] border border-white/10 p-8 sm:p-10 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#00ff66] bg-[#00ff66]/10 px-3 py-1 rounded-full border border-[#00ff66]/20">
                  BAL SANDA LOCATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-3">
                  OFF THE GRID GYM
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Premier Athletic & Bodybuilding Hub
                </p>
              </div>

              {/* Verified Address */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00ff66] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Address</div>
                  <div className="text-xs sm:text-sm text-gray-300 mt-0.5 leading-relaxed">
                    {settings.address},<br />
                    {settings.city}, {settings.state} - {settings.pincode}
                  </div>
                </div>
              </div>

              {/* Operating Timings */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00ff66] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Gym Hours</div>
                  <div className="text-xs sm:text-sm text-gray-300 mt-1 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Monday – Friday:</span>
                      <span className="font-mono text-white font-medium">{settings.opening_hours.weekdays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Saturday:</span>
                      <span className="font-mono text-white font-medium">{settings.opening_hours.saturday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sunday:</span>
                      <span className="font-mono text-[#00ff66] font-medium">{settings.opening_hours.sunday}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Calling & Instagram */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00ff66] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Phone & Social</div>
                  <div className="text-xs sm:text-sm text-gray-300 mt-0.5 flex flex-col gap-1">
                    <a
                      href={`tel:${settings.phone_number.replace(/\s+/g, '')}`}
                      className="hover:text-[#00ff66] transition-colors font-mono"
                    >
                      {settings.phone_number}
                    </a>
                    <a
                      href={settings.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#00ff66] hover:underline flex items-center gap-1"
                    >
                      <InstagramIcon className="w-3.5 h-3.5" />
                      <span>{settings.instagram_handle}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 space-y-3">
              <a
                href={settings.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-[#00ff66]/40 flex items-center justify-center gap-2 transition-all"
              >
                <Navigation className="w-4 h-4 text-[#00ff66]" />
                <span>Navigate via Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider bg-[#00ff66] hover:bg-[#05e05d] text-black shadow-[0_0_20px_rgba(0,255,102,0.3)] flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Embed (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 relative min-h-[420px] bg-[#12151c] shadow-2xl flex flex-col">
            <iframe
              src={settings.google_maps_embed_url}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '440px', flex: 1, filter: 'invert(90%) hue-rotate(180deg) contrast(110%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Off The Grid Gym Ropar Google Maps Location"
              className="w-full h-full"
            />
            {/* Overlay tag */}
            <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 text-xs text-white shadow-lg pointer-events-none">
              <div className="font-bold flex items-center gap-1.5 text-[#00ff66]">
                <MapPin className="w-3.5 h-3.5" />
                OFF THE GRID GYM ROPAR
              </div>
              <div className="text-[10px] text-gray-400">Bal Sanda, Rupnagar, Punjab 140001</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
