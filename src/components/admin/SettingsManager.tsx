'use client';

import { useState, useEffect } from 'react';
import { 
  Save, 
  MapPin, 
  Phone, 
  Clock, 
  Sparkles, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { GymSettings } from '@/types';
import { getGymSettings, updateGymSettings } from '@/lib/dataStore';
import { defaultGymSettings } from '@/lib/defaultData';

export default function SettingsManager() {
  const [settings, setSettings] = useState<GymSettings>(defaultGymSettings);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    getGymSettings().then(setSettings);
  }, []);

  const showToast = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await updateGymSettings(settings);
    setLoading(false);
    if (success) {
      showToast('success', 'Business details & gym hours successfully saved and updated site-wide!');
    } else {
      showToast('error', 'Failed to update business details.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="pb-6 border-b border-white/10">
        <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
          Gym Information & Operating Schedule
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Update the verified contact details, Google Maps references, Instagram handle, and weekly gym hours displayed on the website.
        </p>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-[#00ff66]/10 border-[#00ff66]/40 text-[#00ff66]'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          {feedback.type === 'success' ? (
            <Check className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Basic Brand Identity */}
        <div className="rounded-2xl p-6 sm:p-8 bg-[#0e1117] border border-white/10 space-y-4">
          <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#00ff66]" />
            Business Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                Gym Business Name
              </label>
              <input
                type="text"
                required
                value={settings.gym_name}
                onChange={(e) => setSettings({ ...settings, gym_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                Headline Tagline
              </label>
              <input
                type="text"
                required
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
              Short Description / Mission
            </label>
            <textarea
              rows={2}
              value={settings.short_description}
              onChange={(e) => setSettings({ ...settings, short_description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
            />
          </div>
        </div>

        {/* Contact Numbers & Channels */}
        <div className="rounded-2xl p-6 sm:p-8 bg-[#0e1117] border border-white/10 space-y-4">
          <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-white/5">
            <Phone className="w-4 h-4 text-[#00ff66]" />
            Direct Communication & Social
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                Phone Number (For Calling)
              </label>
              <input
                type="text"
                required
                value={settings.phone_number}
                onChange={(e) => setSettings({ ...settings, phone_number: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                WhatsApp Number (Digits with country code, e.g. 919888812345)
              </label>
              <input
                type="text"
                required
                value={settings.whatsapp_number}
                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                Instagram Handle
              </label>
              <input
                type="text"
                value={settings.instagram_handle}
                onChange={(e) => setSettings({ ...settings, instagram_handle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                Instagram Profile Link
              </label>
              <input
                type="url"
                value={settings.instagram_url}
                onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
              />
            </div>
          </div>
        </div>

        {/* Address & Google Maps */}
        <div className="rounded-2xl p-6 sm:p-8 bg-[#0e1117] border border-white/10 space-y-4">
          <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-white/5">
            <MapPin className="w-4 h-4 text-[#00ff66]" />
            Location & Google Maps Integration
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                Street Address
              </label>
              <input
                type="text"
                required
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                Pincode
              </label>
              <input
                type="text"
                required
                value={settings.pincode}
                onChange={(e) => setSettings({ ...settings, pincode: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
              Google Maps Short Link (For Directions button)
            </label>
            <input
              type="url"
              required
              value={settings.google_maps_url}
              onChange={(e) => setSettings({ ...settings, google_maps_url: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
              Google Maps Iframe Embed URL
            </label>
            <input
              type="text"
              required
              value={settings.google_maps_embed_url}
              onChange={(e) => setSettings({ ...settings, google_maps_embed_url: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66] font-mono text-xs"
            />
          </div>
        </div>

        {/* Operating Hours */}
        <div className="rounded-2xl p-6 sm:p-8 bg-[#0e1117] border border-white/10 space-y-4">
          <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-white/5">
            <Clock className="w-4 h-4 text-[#00ff66]" />
            Operating Timings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                Monday – Friday
              </label>
              <input
                type="text"
                required
                value={settings.opening_hours.weekdays}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    opening_hours: { ...settings.opening_hours, weekdays: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                Saturday
              </label>
              <input
                type="text"
                required
                value={settings.opening_hours.saturday}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    opening_hours: { ...settings.opening_hours, saturday: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                Sunday
              </label>
              <input
                type="text"
                required
                value={settings.opening_hours.sunday}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    opening_hours: { ...settings.opening_hours, sunday: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
              />
            </div>
          </div>
        </div>

        {/* Top Header Announcement Bar */}
        <div className="rounded-2xl p-6 sm:p-8 bg-[#0e1117] border border-white/10 space-y-4">
          <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-white/5">
            <Sparkles className="w-4 h-4 text-[#00ff66]" />
            Website Top Announcement Banner
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                Announcement Badge
              </label>
              <input
                type="text"
                value={settings.announcement?.badge || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcement: { ...settings.announcement, badge: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                Banner Announcement Text
              </label>
              <input
                type="text"
                value={settings.announcement?.text || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcement: { ...settings.announcement, text: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300 font-semibold">
              <input
                type="checkbox"
                checked={settings.announcement?.enabled || false}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcement: { ...settings.announcement, enabled: e.target.checked },
                  })
                }
                className="w-4 h-4 accent-[#00ff66]"
              />
              <span>Display Announcement Bar on Public Website</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 rounded-xl bg-[#00ff66] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#05e05d] transition-all shadow-[0_0_20px_rgba(0,255,102,0.3)] hover:shadow-[0_0_30px_rgba(0,255,102,0.5)] flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving Changes...' : 'Save All Business Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
