'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Hash, Edit3, Compass } from 'lucide-react';

export default function LKGPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 font-sans text-left">
      
      {/* Navigation */}
      <div className="flex justify-between items-center border-b border-light-sage/20 pb-4">
        <Link href="/academics" className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-600 hover:text-amber-800 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Academics Overview</span>
        </Link>
        <span className="px-3 py-1 bg-amber-500/10 text-amber-600 text-[10px] font-bold uppercase rounded-full">LKG (3.5 - 4.5 Years)</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit uppercase tracking-tight">LKG Program</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Building foundational reading, basic math logic, and creative nature observations.
        </p>
      </div>

      {/* Focus Areas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-white border border-light-sage/20 shadow-sm space-y-2">
          <Edit3 className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-slate-800 text-sm uppercase">Early Writing</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans mt-1">Letter tracing, alphabet recognition, and sight word exercises.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-light-sage/20 shadow-sm space-y-2">
          <Hash className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-slate-800 text-sm uppercase">Number Logic</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans mt-1">Counting up to 50, identifying patterns, and sorting quantities.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-light-sage/20 shadow-sm space-y-2">
          <Compass className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-slate-800 text-sm uppercase">Primary Science</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans mt-1">Exploring seasons, weather cycles, seedlings, and living things.</p>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between pt-6">
        <Link href="/academics/lkg" className="inline-flex items-center gap-1 text-xs font-extrabold uppercase text-amber-600 hover:text-amber-800 transition-colors">
          <span>&lt; Pre-KG Program</span>
        </Link>
        <Link href="/academics/kg-1" className="inline-flex items-center gap-1 text-xs font-extrabold uppercase text-amber-600 hover:text-amber-800 transition-colors">
          <span>UKG Program &gt;</span>
        </Link>
      </div>

    </div>
  );
}
