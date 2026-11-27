'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function SafetyPage() {
  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
      
      {/* Back to Campus */}
      <Link href="/campus/facilities" className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-600 hover:text-amber-800 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Campus Facilities</span>
      </Link>

      <section className="text-left space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Child Protection</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit uppercase tracking-tight">Safety & Wellbeing</h1>
        <p className="text-slate-500 text-sm max-w-2xl font-normal">
          Perimeter monitoring checkpoints, weekly hygiene testing, emergency response protocols, and student physical protection parameters in Trichy.
        </p>
      </section>

      {/* Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
        <div className="lg:col-span-8 space-y-5 text-sm text-slate-600 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-bold font-outfit text-slate-800">Establishing a Protected Learning Space</h2>
          <p>
            The physical protection and emotional support of our preschool classes represent our baseline parameters. We maintain a secured perimeter gate system, allowing entrance checks only for pre-registered parents and approved visitors.
          </p>
          <p>
            Class spaces are verified for sanitation, air filters operate continuously, and sanitary hand washing cycles are checked before lunches. Our tutoring staff are fully certified in first-aid rules, ensuring immediate, safe, and professional support during minor sports injuries.
          </p>
        </div>

        <div className="lg:col-span-4 aspect-[3/4] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
          <img
            src="/images/facilities/safety.jpeg"
            alt="Protected modern school gate building"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=400';
            }}
          />
        </div>
      </section>

    </div>
  );
}
