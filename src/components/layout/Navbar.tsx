'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Dumbbell, 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  MapPin, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { getGymSettings, generateWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/dataStore';
import { GymSettings } from '@/types';
import { defaultGymSettings } from '@/lib/defaultData';

export default function Navbar() {
  const [settings, setSettings] = useState<GymSettings>(defaultGymSettings);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    getGymSettings().then(setSettings);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleDataUpdate = () => {
      getGymSettings().then(setSettings);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('otg_datastore_updated', handleDataUpdate);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('otg_datastore_updated', handleDataUpdate);
    };
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Facilities', href: '/facilities' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Offers', href: '/offers', badge: 'Active' },
    { label: 'Trainers', href: '/trainers' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ];

  const whatsappUrl = generateWhatsAppUrl(
    settings.whatsapp_number,
    generateGeneralEnquiryMessage()
  );

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Notification / Announcement Bar */}
      {settings.announcement?.enabled && (
        <div className="bg-gradient-to-r from-[#0c120c] via-[#102a14] to-[#0c120c] border-b border-[#00ff66]/20 text-xs py-1.5 px-4 text-center">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-[#00ff66] bg-[#00ff66]/10 px-2 py-0.5 rounded border border-[#00ff66]/30 uppercase tracking-wider text-[10px]">
              <Sparkles className="w-3 h-3 text-[#00ff66]" />
              {settings.announcement.badge}
            </span>
            <span className="text-gray-300 hidden sm:inline">
              {settings.announcement.text}
            </span>
            <span className="text-gray-300 sm:hidden truncate max-w-[200px]">
              {settings.announcement.text}
            </span>
            {settings.announcement.link_url && (
              <Link
                href={settings.announcement.link_url}
                className="text-[#00ff66] font-medium hover:underline inline-flex items-center gap-0.5 ml-1"
              >
                Claim Offer <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-colors duration-200 border-b ${
          scrolled
            ? 'bg-[#08090b]/95 backdrop-blur-md border-white/10 shadow-2xl'
            : 'bg-[#08090b]/80 backdrop-blur-sm border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-11 h-11 rounded-lg bg-[#0e1217] border border-[#00ff66]/40 flex items-center justify-center group-hover:border-[#00ff66] group-hover:shadow-[0_0_15px_rgba(0,255,102,0.3)] transition-all">
                <Dumbbell className="w-6 h-6 text-[#00ff66] transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-sans leading-none flex items-center gap-1.5">
                  OFF THE GRID
                  <span className="w-2 h-2 rounded-full bg-[#00ff66] inline-block animate-pulse" />
                </span>
                <span className="text-[10px] tracking-widest text-gray-400 font-semibold uppercase mt-1">
                  GYM • ROPAR, PUNJAB
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                      isActive
                        ? 'text-[#00ff66] bg-white/5'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                    {link.badge && (
                      <span className="ml-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#00ff66]/20 text-[#00ff66] border border-[#00ff66]/40">
                        {link.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#00ff66] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Action Elements */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${settings.phone_number.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
                title="Call Gym Directly"
              >
                <Phone className="w-3.5 h-3.5 text-[#00ff66]" />
                <span className="hidden xl:inline">{settings.phone_number}</span>
                <span className="xl:hidden">Call</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#00ff66] hover:bg-[#05e05d] rounded-lg shadow-[0_0_20px_rgba(0,255,102,0.3)] hover:shadow-[0_0_25px_rgba(0,255,102,0.5)] transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden px-3 py-1.5 text-xs font-bold text-black bg-[#00ff66] rounded-md"
              >
                WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0a0c10] border-b border-white/10 px-4 pt-3 pb-6 space-y-2">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive
                        ? 'text-[#00ff66] bg-white/10 font-bold'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#00ff66]/20 text-[#00ff66]">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="text-xs text-gray-400 space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#00ff66]" />
                  <span>{settings.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#00ff66]" />
                  <span>Mon-Sat: {settings.opening_hours.weekdays}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${settings.phone_number.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold text-gray-200 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10"
                >
                  <Phone className="w-4 h-4 text-[#00ff66]" />
                  Call Gym
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-black bg-[#00ff66] rounded-lg shadow-[0_0_15px_rgba(0,255,102,0.3)]"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

