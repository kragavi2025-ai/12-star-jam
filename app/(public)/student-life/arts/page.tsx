'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Music, Palette } from 'lucide-react';

export default function ArtsPage() {
  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
      
      {/* Back */}
      <Link href="/student-life" className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-600 hover:text-amber-800 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Student Life</span>
      </Link>

      <section className="text-left space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Creative Outflow</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit uppercase tracking-tight">Arts & Creativity</h1>
        <p className="text-slate-600 text-sm max-w-2xl font-normal">
          Fine arts, painting, paper crafts, choir ensembles and school instrumental blocks in Trichy.
        </p>
      </section>

      {/* Narrative Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
        <div className="lg:col-span-8 space-y-5 text-sm text-slate-600 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-bold font-outfit text-slate-800 font-outfit">Cultivating Fine Aesthetic Logic</h2>
          <p>
            Creative work represents a key cognitive tool that helps preschool classes (Pre.KG, LKG, UKG, KG-1) visualize, map and represent abstract questions. Our class schedules include weekly sessions at our painting desks and music tables. Students explore watercolor fields, charcoal sketching, craft constructs, and instrument tunes.
          </p>
          <p>
            Instructors guide children to design paintings, sketches, and paper sculptures which are mounted on our open-air amphitheatre panels for class collections. Our choir group organizes vocal choruses and recorders to develop musical ear pitch and cooperative tempo.
          </p>
        </div>

        <div className="lg:col-span-4 aspect-[3/4] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
          <img
            src="/images/activities/arts.jpeg"
            alt="Students painting watercolor sketches"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400';
            }}
          />
        </div>
      </section>

      {/* Focus areas */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="p-6 rounded-xl border border-slate-100 bg-white space-y-3">
          <Palette className="w-7 h-7 text-amber-500" />
          <h3 className="font-bold text-slate-800 text-base font-outfit">Visual Fine Arts</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">Watercolor techniques, color blending formulas, oil pastel details, and sketch perspectives.</p>
        </div>

        <div className="p-6 rounded-xl border border-slate-100 bg-white space-y-3">
          <Music className="w-7 h-7 text-amber-500" />
          <h3 className="font-bold text-slate-800 text-base font-outfit">Music & Choir</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">Melody pitch classes, recorder tutorials, rhythm sticks, and choral sing-alongs.</p>
        </div>

        <div className="p-6 rounded-xl border border-slate-100 bg-white space-y-3">
          <Layers className="w-7 h-7 text-amber-550" />
          <h3 className="font-bold text-slate-800 text-base font-outfit">Clay & Craft Shapes</h3>
          <p className="text-xs text-slate-550 leading-relaxed font-normal">Paper sculpting, origami boxes, clay modeling, and structural frame building.</p>
        </div>
      </section>

    </div>
  );
}
// Add wrapper to support missing icon
const Layers = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);
