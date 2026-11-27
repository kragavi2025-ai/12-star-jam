'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Calculator, Volume2 } from 'lucide-react';

export default function UKGPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 font-sans text-left">
      
      {/* Navigation */}
      <div className="flex justify-between items-center border-b border-light-sage/20 pb-4">
        <Link href="/academics" className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-600 hover:text-amber-800 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Academics Overview</span>
        </Link>
        <span className="px-3 py-1 bg-amber-500/10 text-amber-600 text-[10px] font-bold uppercase rounded-full">UKG (4.5 - 5.5 Years)</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit uppercase tracking-tight">UKG Study Program</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Preparing students for standard primary classes with sentence reading, mathematics, and expressive speaking skills.
        </p>
      </div>

      {/* Focus Areas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-white border border-light-sage/20 shadow-sm space-y-2">
          <BookOpen className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-slate-800 text-sm uppercase">Active Reading</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans mt-1">Reading short sentences, spelling sight words, and storytelling.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-light-sage/20 shadow-sm space-y-2">
          <Calculator className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-slate-800 text-sm uppercase">Math Operations</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans mt-1">Single-digit addition, counting to 100, and amount comparison.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-light-sage/20 shadow-sm space-y-2">
          <Volume2 className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-slate-800 text-sm uppercase">Speech & Show</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans mt-1">Expressing ideas in circle meetings and classroom presentations.</p>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-start pt-6">
        <Link href="/academics/ukg" className="inline-flex items-center gap-1 text-xs font-extrabold uppercase text-amber-600 hover:text-amber-800 transition-colors">
          <span>&lt; LKG Program</span>
        </Link>
      </div>

    </div>
  );
}
