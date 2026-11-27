'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Brush, Users } from 'lucide-react';

export default function PreKGPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 font-sans text-left">
      
      {/* Navigation */}
      <div className="flex justify-between items-center border-b border-light-sage/20 pb-4">
        <Link href="/academics" className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-600 hover:text-amber-800 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Academics Overview</span>
        </Link>
        <span className="px-3 py-1 bg-amber-500/10 text-amber-600 text-[10px] font-bold uppercase rounded-full">Pre-KG (2.5 - 3.5 Years)</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit uppercase tracking-tight">Pre-KG Program</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Nurturing curiosity with early communication, fine motor activities, and cooperative fun.
        </p>
      </div>

      {/* Focus Areas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-white border border-light-sage/20 shadow-sm space-y-2">
          <BookOpen className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-slate-800 text-sm uppercase">Alphabet & Speech</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans mt-1">Phonetic sound exploration and simple vocabulary development.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-light-sage/20 shadow-sm space-y-2">
          <Brush className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-slate-800 text-sm uppercase">Fine Motor Skills</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans mt-1">Drawing, clay modeling, and finger tracing to build motor control.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-light-sage/20 shadow-sm space-y-2">
          <Users className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-slate-800 text-sm uppercase">Social Skills</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans mt-1">Sharing sandbox playtime, group storytelling, and circle time.</p>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between pt-6">
        <Link href="/academics/pre-kg" className="inline-flex items-center gap-1 text-xs font-extrabold uppercase text-amber-600 hover:text-amber-800 transition-colors">
          <span>&lt; Play School Program</span>
        </Link>
        <Link href="/academics/ukg" className="inline-flex items-center gap-1 text-xs font-extrabold uppercase text-amber-600 hover:text-amber-800 transition-colors">
          <span>LKG Program &gt;</span>
        </Link>
      </div>

    </div>
  );
}
