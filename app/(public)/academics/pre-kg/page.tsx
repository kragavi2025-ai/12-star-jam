'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Smile, Shield } from 'lucide-react';

export default function PlaySchoolPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 font-sans text-left">
      
      {/* Navigation */}
      <div className="flex justify-between items-center border-b border-light-sage/20 pb-4">
        <Link href="/academics" className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-600 hover:text-amber-800 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Academics Overview</span>
        </Link>
        <span className="px-3 py-1 bg-amber-500/10 text-amber-600 text-[10px] font-bold uppercase rounded-full">Play School (1.5 - 2.5 Years)</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit uppercase tracking-tight">Play School Program</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          A gentle introduction to learning through sensory exploration, language, and structured social play.
        </p>
      </div>

      {/* Focus Areas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-white border border-light-sage/20 shadow-sm space-y-2">
          <Smile className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-slate-800 text-sm uppercase">Social Play</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans mt-1">Helping toddlers transition comfortably to a classroom group environment.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-light-sage/20 shadow-sm space-y-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-slate-800 text-sm uppercase">Sensory Discovery</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans mt-1">Using shape sorting, colors, and textures to build early cognitive skills.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-light-sage/20 shadow-sm space-y-2">
          <Shield className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-slate-800 text-sm uppercase">Safe Environment</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans mt-1">A highly supervised space designed for child safety and comfort.</p>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end pt-6">
        <Link href="/academics/lkg" className="inline-flex items-center gap-1 text-xs font-extrabold uppercase text-amber-600 hover:text-amber-800 transition-colors">
          <span>Pre-KG Program &gt;</span>
        </Link>
      </div>

    </div>
  );
}
