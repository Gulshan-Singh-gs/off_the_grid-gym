'use client';

import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Navigation, 
  Send,
  ExternalLink
} from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import SectionHeader from '@/components/ui/SectionHeader';
import { GymSettings } from '@/types';
import { 
  getGymSettings, 
  generateWhatsAppUrl, 
  generateGeneralEnquiryMessage 
} from '@/lib/dataStore';
import { defaultGymSettings } from '@/lib/defaultData';

export default function ContactPage() {
  const [settings, setSettings] = useState<GymSettings>(defaultGymSettings);

  // Form states
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('Muscle Building / Strength');
  const [preferredTime, setPreferredTime] = useState('Morning (5:30 AM – 9:00 AM)');
  const [message, setMessage] = useState('');

  useEffect(() => {
    getGymSettings().then(setSettings);
    const handleUpdate = () => getGymSettings().then(setSettings);
    window.addEventListener('otg_datastore_updated', handleUpdate);
    return () => window.removeEventListener('otg_datastore_updated', handleUpdate);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `Hello Off The Grid Gym Ropar! 👋\n\n*Name:* ${name || 'Prospective Member'}\n*Primary Fitness Goal:* ${goal}\n*Preferred Workout Time:* ${preferredTime}\n*Enquiry Message:* ${message || 'I would like to inquire about membership and schedule a visit.'}\n\nPlease let me know when I can visit the Bal Sanda gym!`;
    const url = generateWhatsAppUrl(settings.whatsapp_number, formatted);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const generalWhatsApp = generateWhatsAppUrl(
    settings.whatsapp_number,
    generateGeneralEnquiryMessage()
  );

  return (
    <div className="py-16 sm:py-24 bg-[#08090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="LOCATION & ENQUIRIES"
          title="CONNECT WITH"
          highlightedText="OFF THE GRID"
          description="Have questions about memberships, training hours, or want to drop by? Reach out directly via WhatsApp, call us, or follow directions on Google Maps."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
          {/* Contact Details Card (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0e1117] border border-white/10 p-8 sm:p-10 flex flex-col justify-between shadow-2xl">
            <div className="space-y-8">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#00ff66] bg-[#00ff66]/10 px-3 py-1 rounded-full border border-[#00ff66]/20">
                  OFFICIAL BUSINESS LOCATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-3">
                  Off The Grid Gym
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Bal Sanda, Rupnagar (Ropar), Punjab
                </p>
              </div>

              {/* Address item */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00ff66] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Physical Address
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300 mt-1 leading-relaxed">
                    {settings.address},<br />
                    {settings.city}, {settings.state} - {settings.pincode}
                  </div>
                  <a
                    href={settings.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#00ff66] font-semibold hover:underline mt-2"
                  >
                    <span>Open in Google Maps App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Operating Hours item */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00ff66] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Operating Schedule
                  </div>
                  <div className="mt-1 space-y-1.5 text-xs text-gray-300">
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

              {/* Direct Calling & WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00ff66] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Direct Contact
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300 mt-1 flex flex-col gap-1">
                    <a
                      href={`tel:${settings.phone_number.replace(/\s+/g, '')}`}
                      className="hover:text-[#00ff66] transition-colors font-mono font-medium"
                    >
                      {settings.phone_number} (Call Desk)
                    </a>
                    <a
                      href={`mailto:${settings.email}`}
                      className="hover:text-white transition-colors"
                    >
                      {settings.email}
                    </a>
                    <a
                      href={settings.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00ff66] hover:underline flex items-center gap-1 mt-1 text-xs"
                    >
                      <InstagramIcon className="w-3.5 h-3.5" />
                      <span>{settings.instagram_handle}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action */}
            <div className="pt-8">
              <a
                href={generalWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-4 rounded-xl text-xs font-black uppercase tracking-wider bg-[#25D366] hover:bg-[#20bd5a] text-black shadow-[0_0_20px_rgba(37,211,102,0.3)] flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Quick WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Quick Pre-fill WhatsApp Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0e1117] border border-white/10 p-8 sm:p-10 shadow-2xl">
            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#00ff66] bg-[#00ff66]/10 px-3 py-1 rounded-full border border-[#00ff66]/20">
                FAST DIRECT ENQUIRY
              </span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mt-2">
                Plan Your First Visit
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Fill in your details below to generate a pre-formatted WhatsApp enquiry directly with the gym owner and coaches. No waiting for email replies.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jaspreet Singh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00ff66] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Primary Goal
                  </label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66] transition-colors"
                  >
                    <option value="Muscle Building / Strength">Muscle Building / Hypertrophy</option>
                    <option value="Fat Loss & Toning">Fat Loss & Conditioning</option>
                    <option value="Powerlifting / Heavy Lifts">Powerlifting & Strength</option>
                    <option value="General Health & Mobility">General Fitness & Posture</option>
                    <option value="Personal 1-on-1 Training">Personal 1-on-1 Coaching</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Preferred Batch Time
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66] transition-colors"
                  >
                    <option value="Early Morning (5:30 AM – 7:30 AM)">Early Morning (5:30 AM – 7:30 AM)</option>
                    <option value="Mid Morning (7:30 AM – 10:00 AM)">Mid Morning (7:30 AM – 10:00 AM)</option>
                    <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                    <option value="Evening (5:00 PM – 8:00 PM)">Evening (5:00 PM – 8:00 PM)</option>
                    <option value="Late Night (8:00 PM – 10:00 PM)">Late Night (8:00 PM – 10:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Specific Questions or Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Ask about batch slots, package offers, or request a 1-day free trial workout pass..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00ff66] transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-[#00ff66] hover:bg-[#05e05d] text-black font-black uppercase tracking-wider text-xs sm:text-sm shadow-[0_0_25px_rgba(0,255,102,0.3)] hover:shadow-[0_0_35px_rgba(0,255,102,0.5)] flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Embedded Map Section */}
        <div className="mt-16 rounded-3xl overflow-hidden border border-white/10 relative min-h-[440px] bg-[#12151c] shadow-2xl">
          <iframe
            src={settings.google_maps_embed_url}
            width="100%"
            height="440"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(110%)' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Off The Grid Gym Ropar Google Maps Location"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
