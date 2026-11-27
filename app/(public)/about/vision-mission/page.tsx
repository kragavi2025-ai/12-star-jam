'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Target, Eye, ShieldCheck, Heart } from 'lucide-react';

export default function VisionMissionPage() {
  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
      
      {/* Back to About */}
      <Link href="/about" className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-600 hover:text-amber-800 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to About School</span>
      </Link>

      <section className="text-left space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Core Compass</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit uppercase tracking-tight">
          Vision & Mission
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl">
          At 12 Star Jam School, our vision and mission declarations direct our institutional guidelines, academic methods, and security policies in Chennai.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
        
        {/* Vision Panel */}
        <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-6 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-amber-100 opacity-50 z-0">
            <Eye className="w-24 h-24 stroke-[1]" />
          </div>
          <div className="p-3 w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center border border-amber-100 relative z-10">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-outfit uppercase text-slate-800 relative z-10 flex items-center gap-2">
            🌱 Our Vision
          </h2>
          <p className="text-slate-650 text-sm leading-relaxed relative z-10 font-bold">
            To build a strong foundation for every child through joyful learning, confident thinking, good values, and the freedom to discover their own potential.
          </p>
        </div>

        {/* Mission Panel */}
        <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-6 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-amber-100 opacity-50 z-0">
            <Target className="w-24 h-24 stroke-[1]" />
          </div>
          <div className="p-3 w-12 h-12 bg-amber-50 text-amber-650 rounded-xl flex items-center justify-center border border-amber-100 relative z-10">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-outfit uppercase text-slate-800 relative z-10 flex items-center gap-2">
            💛 Our Mission
          </h2>
          <p className="text-slate-650 text-sm leading-relaxed relative z-10 font-bold">
            We provide a safe, caring, and engaging learning environment where children learn through play, creativity, exploration, and everyday experiences — helping them become confident, independent, kind, and ready for the next stage of life.
          </p>
        </div>

      </section>

      {/* Core Values Section */}
      <section className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white text-left space-y-8">
        <h2 className="text-2xl font-extrabold text-white font-outfit uppercase tracking-tight">Our Core Values</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-base font-outfit text-white">Trust & Security</h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              We hold child physical protection, emotional support protocols, and sanitization schedules as our primary benchmarks.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-base font-outfit text-white">Character & Inclusivity</h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Accepting unique cultural profiles, promoting polite public communication, and nurturing team player values during early schooling years.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-base font-outfit text-white">Active Discovery</h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Fostering analytical logic and research questions via interactive lab tables, libraries, and science toys.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
