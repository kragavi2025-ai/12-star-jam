'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Cpu, Compass, Milestone } from 'lucide-react';

export default function TechnologyPage() {
  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
      
      {/* Back */}
      <Link href="/student-life" className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-600 hover:text-amber-800 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Student Life</span>
      </Link>

      <section className="text-left space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Future Skills</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit uppercase tracking-tight">Technology & Innovation</h1>
        <p className="text-slate-500 text-sm max-w-2xl font-normal">
          Logical coding parameters, computational block layouts, scratch animations, and interactive science tools in Trichy.
        </p>
      </section>

      {/* Narrative Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
        <div className="lg:col-span-8 space-y-5 text-sm text-slate-600 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-bold font-outfit text-slate-800 font-outfit">Computational Thinking from Early Stage</h2>
          <p>
            At 12 JAM SCHOOL, we believe kids should grow as active technology builders rather than simple screen viewers. Our digital innovation corners feature age-appropriate setups: Grade 1-2 students explore logical sequences on tactile blocks, whereas Grade 3-5 classes build Scratch scripts and animate sprite drawings.
          </p>
          <p>
            We verify that screen exposures remain highly controlled and match constructive study patterns. Students document their logic scripts on their design binders, learning parameters of angles, repeat conditions, variables, and math sorting cards.
          </p>
        </div>

        <div className="lg:col-span-4 aspect-[3/4] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
          <img
            src="/images/activities/tech.jpeg"
            alt="Students working on coding script tablet"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=400';
            }}
          />
        </div>
      </section>

      {/* Focus parts */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="p-6 rounded-xl border border-slate-105 bg-white space-y-3">
          <Cpu className="w-7 h-7 text-amber-505" />
          <h3 className="font-bold text-slate-800 text-base font-outfit">Interactive Scratch Coding</h3>
          <p className="text-xs text-slate-550 leading-relaxed font-normal font-sans">Moving canvas sprites using visual instructions. Structuring loops, delay controls, key input triggers, and basic maps.</p>
        </div>

        <div className="p-6 rounded-xl border border-slate-100 bg-white space-y-3">
          <Compass className="w-7 h-7 text-amber-500" />
          <h3 className="font-bold text-slate-800 text-base font-outfit">STEM Discovery Tools</h3>
          <p className="text-xs text-slate-550 leading-relaxed font-normal">Fractions scales, magnetic gears, balances, and digital measurement tablets used during science room modules.</p>
        </div>

        <div className="p-6 rounded-xl border border-slate-100 bg-white space-y-3">
          <Milestone className="w-7 h-7 text-amber-500" />
          <h3 className="font-bold text-slate-800 text-base font-outfit">Responsible Media Habits</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">Understanding screen-time limits, safe website search guidelines, and maintaining personal data privacy values.</p>
        </div>
      </section>

    </div>
  );
}
