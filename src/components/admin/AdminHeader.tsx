'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dumbbell, LogOut, ExternalLink, Database, CheckCircle2 } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';

interface AdminHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AdminHeader({ activeTab, onTabChange }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem('otg_admin_authenticated');
    sessionStorage.removeItem('otg_admin_user');
    router.push('/admin/login');
  };

  const tabs = [
    { id: 'pricing', label: 'Membership Pricing' },
    { id: 'offers', label: 'Promotional Offers' },
    { id: 'settings', label: 'Gym Info & Hours' },
    { id: 'trainers', label: 'Trainer Profiles' },
    { id: 'gallery', label: 'Gallery Media' },
  ];

  return (
    <header className="bg-[#0b0e14] border-b border-white/10 sticky top-0 z-40">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-black border border-[#00ff66]/40 p-1 flex items-center justify-center overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.webp"
                alt="Off The Grid Gym Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-base font-black text-white uppercase tracking-tight">
                OFF THE GRID <span className="text-[#00ff66]">DASHBOARD</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] text-gray-400 font-semibold ml-2 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                Ropar Owner Console
              </span>
            </div>
          </div>

          {/* Database connection badge & actions */}
          <div className="flex items-center gap-3">
            {isSupabaseConfigured ? (
              <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-[#00ff66] bg-[#00ff66]/10 px-3 py-1 rounded-full border border-[#00ff66]/20 font-bold">
                <Database className="w-3.5 h-3.5" />
                Supabase Live
              </span>
            ) : (
              <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 font-bold" title="Changes persist locally in browser. Add Supabase keys to .env.local to persist globally in PostgreSQL.">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Live Demo Mode
              </span>
            )}

            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white border border-white/10 inline-flex items-center gap-1.5 transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#00ff66]" />
            </Link>

            <button
              onClick={handleLogout}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/20 inline-flex items-center gap-1.5 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[#00ff66] text-black shadow-[0_0_15px_rgba(0,255,102,0.3)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

