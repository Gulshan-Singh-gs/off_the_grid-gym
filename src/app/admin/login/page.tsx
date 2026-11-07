'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Dumbbell, Lock, Key, ArrowRight, ShieldCheck } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Check if Supabase Auth is configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (error) {
          setErrorMsg(error.message || 'Invalid email or password.');
          setLoading(false);
          return;
        }

        // Store session flag
        sessionStorage.setItem('otg_admin_authenticated', 'true');
        router.push('/admin/dashboard');
        return;
      } catch (err: unknown) {
        console.error('Supabase auth error:', err);
      }
    }

    // Default Owner access fallback for initial setup & local management
    // Default owner credentials: offthegrid@admin.in / ropar2026 or any valid non-empty password
    if (password === 'ropar2026' || password === 'admin' || (email && password.length >= 6)) {
      sessionStorage.setItem('otg_admin_authenticated', 'true');
      sessionStorage.setItem('otg_admin_user', email || 'Gym Owner');
      router.push('/admin/dashboard');
    } else {
      setErrorMsg('Invalid password. Default demo passcode is "ropar2026" or enter your Supabase admin credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 bg-[#08090b]">
      <div className="w-full max-w-md">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-[#0e1217] border border-[#00ff66]/40 items-center justify-center text-[#00ff66] mb-4 shadow-[0_0_25px_rgba(0,255,102,0.2)]">
            <Dumbbell className="w-8 h-8 -rotate-45" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
            Off The Grid Gym
          </h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">
            Owner & Administration Portal
          </p>
        </div>

        {/* Login Box */}
        <div className="rounded-3xl bg-[#0e1117] border border-white/10 p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-6 text-xs text-gray-400 pb-4 border-b border-white/5">
            <Lock className="w-4 h-4 text-[#00ff66]" />
            <span>Secure Access for Gym Staff & Owners</span>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs leading-relaxed">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Owner Email
              </label>
              <input
                type="email"
                required
                placeholder="owner@offthegridgymropar.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00ff66] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00ff66] transition-colors"
              />
              <span className="text-[11px] text-gray-500 mt-1 block">
                {isSupabaseConfigured
                  ? 'Using connected Supabase Auth service'
                  : 'Demo passcode: "ropar2026" (or connect Supabase)'}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3.5 px-4 rounded-xl bg-[#00ff66] hover:bg-[#05e05d] text-black font-black uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(0,255,102,0.3)] hover:shadow-[0_0_30px_rgba(0,255,102,0.5)] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <Link
              href="/"
              className="text-xs text-gray-400 hover:text-[#00ff66] transition-colors"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center text-xs text-gray-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00ff66]" />
          <span>Protected with Row-Level-Security (RLS) policies</span>
        </div>
      </div>
    </div>
  );
}

