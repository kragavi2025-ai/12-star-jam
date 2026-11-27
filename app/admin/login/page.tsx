'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isSupabaseConfigured, supabase } from '@/lib/supabaseClient';
import { Shield, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Protect page: if already logged in, redirect to /admin
  useEffect(() => {
    const checkSession = async () => {
      if (typeof window !== 'undefined' && isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            router.replace('/admin');
          }
        } catch (err) {
          console.error('Session check failed:', err);
        }
      }
    };
    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        if (data?.user) {
          router.replace('/admin');
          return;
        }
      } catch (err: any) {
        console.error('Supabase Auth failed:', err);
        setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
        setLoading(false);
        return;
      }
    } else {
      setErrorMessage('Supabase is not configured properly in environment variables.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 font-sans select-none">
      
      <div className="max-w-md w-full mb-4 text-left">
        <Link href="/" className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-amber-500 transition-colors uppercase tracking-wider">
          ← Back to Website
        </Link>
      </div>

      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Light Glows */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-600/10 rounded-full blur-2xl"></div>

        <div className="text-center space-y-2 relative z-10">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-550 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
            <Shield className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black font-outfit uppercase tracking-tight text-white mt-4">
            12 JAM SCHOOL
          </h1>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
            ADMINISTRATOR CENTER
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 flex gap-2 items-start text-xs text-left">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 relative z-10 text-left">
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Staff Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@school.com"
              className="w-full px-4 py-2.5 bg-slate-950 text-xs text-white border border-slate-800 rounded-xl outline-none focus:border-amber-500 transition-all placeholder:text-slate-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-slate-950 text-xs text-white border border-slate-800 rounded-xl outline-none focus:border-amber-500 transition-all placeholder:text-slate-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase text-xs rounded-xl tracking-wider hover:shadow-md transition-all font-outfit cursor-pointer flex items-center justify-center gap-2 border-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying credentials...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Login</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 relative z-10">
          <Link href="/" className="text-[10px] text-slate-500 hover:text-slate-200 uppercase tracking-widest font-bold font-outfit">
            Return to Public Website
          </Link>
        </div>

      </div>

    </div>
  );
}
