'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Dumbbell, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { getGymSettings, generateWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/dataStore';
import { defaultGymSettings } from '@/lib/defaultData';
import { GymSettings } from '@/types';

export default function Footer() {
  const [settings, setSettings] = useState<GymSettings>(defaultGymSettings);
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
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
    <footer className="bg-[#050608] border-t border-white/10 text-gray-400 text-sm">
      {/* Top Banner with Local Focus */}
      <div className="bg-[#0b0e14] border-b border-white/5 py-4 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
          <span className="text-[#00ff66] font-semibold flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#00ff66]" />
            Conveniently Located in Bal Sanda, Ropar
          </span>
          <span className="text-gray-500 hidden sm:inline">•</span>
          <span className="text-gray-300">
            Open 7 Days a Week for Morning & Evening Athletes
          </span>
          <span className="text-gray-500 hidden sm:inline">•</span>
          <a
            href={settings.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00ff66] hover:underline font-medium inline-flex items-center gap-1"
          >
            Get Google Maps Directions <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#0e1217] border border-[#00ff66]/40 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-[#00ff66] -rotate-45" />
              </div>
              <span className="text-xl font-black tracking-tight text-white uppercase">
                OFF THE GRID <span className="text-[#00ff66]">GYM</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              {settings.short_description}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#00ff66]/20 border border-white/10 hover:border-[#00ff66] flex items-center justify-center text-gray-300 hover:text-[#00ff66] transition-colors"
                title="Follow on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#00ff66] border border-white/10 hover:border-[#00ff66] text-xs font-bold text-gray-300 hover:text-black transition-all flex items-center gap-1.5"
              >
                <span>WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-[#00ff66] transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#00ff66] transition-colors">
                  About Off The Grid & Culture
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-[#00ff66] transition-colors">
                  Equipments & Training Zones
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#00ff66] transition-colors">
                  Membership Plans & Fees
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-[#00ff66] transition-colors flex items-center gap-1.5">
                  Promotional Offers
                  <span className="text-[9px] px-1.5 py-0.2 bg-[#00ff66]/20 text-[#00ff66] rounded font-bold">
                    SAVE
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="hover:text-[#00ff66] transition-colors">
                  Certified Trainers
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#00ff66] transition-colors">
                  Gym Facility Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#00ff66] transition-colors">
                  Location & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
              Operating Hours
            </h3>
            <div className="space-y-3 text-xs">
              <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                <span className="block text-gray-400 font-semibold mb-0.5">
                  Monday – Friday:
                </span>
                <span className="text-white font-mono font-medium">
                  {settings.opening_hours.weekdays}
                </span>
              </div>
              <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                <span className="block text-gray-400 font-semibold mb-0.5">
                  Saturday:
                </span>
                <span className="text-white font-mono font-medium">
                  {settings.opening_hours.saturday}
                </span>
              </div>
              <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                <span className="block text-gray-400 font-semibold mb-0.5">
                  Sunday:
                </span>
                <span className="text-[#00ff66] font-mono font-medium">
                  {settings.opening_hours.sunday} (Morning Shift)
                </span>
              </div>
            </div>
          </div>

          {/* Contact & Location Details */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
              Visit The Gym
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00ff66] shrink-0 mt-0.5" />
                <span>
                  {settings.address}, {settings.city}, {settings.state} - {settings.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00ff66] shrink-0" />
                <a
                  href={`tel:${settings.phone_number.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors font-mono"
                >
                  {settings.phone_number}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00ff66] shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.email}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={settings.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-[#0e1217] hover:bg-[#151c24] text-white border border-[#00ff66]/40 hover:border-[#00ff66] rounded-lg text-xs font-semibold transition-all"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#00ff66]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} Off The Grid Gym (Ropar). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00ff66]" />
              Official Business Website
            </span>
            <span>•</span>
            <Link
              href="/admin/login"
              className="text-gray-500 hover:text-gray-300 inline-flex items-center gap-1"
            >
              <Lock className="w-3 h-3" />
              Owner Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
