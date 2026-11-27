'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Activity, Smile, GraduationCap, Palette, Cpu } from 'lucide-react';

export default function StudentLifePage() {
  return (
    <div className="py-16 space-y-20 font-sans">
      
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Beyond Books</span>
        <h1 className="text-4xl sm:text-5xl font-black font-outfit uppercase tracking-tight text-slate-900 leading-none">
          Student Life
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl">
          At 12 JAM SCHOOL, Trichy, student childhood is celebrated. We provide a balanced environment where student groups explore sports, arts, active clubs, and computer rooms.
        </p>
      </section>

      {/* Intro Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-outfit">
              Holistic Support Built for Active Childhoods
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our campus space does not confine study parameters purely to desktop tables. Daily routines ensure kids transition from mathematical sorting to playground sports tracks, painting desks, music blocks, and reading corners. This regular change keeps students active, focused, and emotionally happy.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Tutors instruct child teams to design quarterly showcases that display drawings, code animations, science tools, and cooperative projects.
            </p>
            <div className="pt-2">
              <Link href="/admissions" className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-600 hover:text-amber-800 transition-colors">
                <span>Join Our Active Family</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xl">
            <img
              src="/images/activities/overview.jpeg"
              alt="Grade 1-5 students during outdoor activities"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=500';
              }}
            />
          </div>
        </div>
      </section>

      {/* Four Sub-channels section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Co-Curricular Pillars</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit uppercase">Specialist Activities</h2>
            <p className="text-slate-400 text-sm">
              We design physical, creative, and technological programs to nurture varied child talents. Explore our specialty study lines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
            
            <Link href="/student-life/sports" className="p-6 rounded-xl border border-slate-800 bg-slate-950 hover:border-amber-450 hover:bg-slate-850/50 transition-all flex flex-col justify-between min-h-[200px] group">
              <div className="space-y-3">
                <Activity className="w-8 h-8 text-amber-400" />
                <h3 className="font-extrabold text-white text-base">Sports & Games</h3>
                <p className="text-xs text-slate-200 leading-relaxed">Athletics tracks, physical training guidelines, and cooperative team values.</p>
              </div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider group-hover:underline">Explore &gt;</span>
            </Link>

            <Link href="/student-life/arts" className="p-6 rounded-xl border border-slate-800 bg-slate-950 hover:border-amber-450 hover:bg-slate-850/50 transition-all flex flex-col justify-between min-h-[200px] group">
              <div className="space-y-3">
                <Palette className="w-8 h-8 text-amber-400" />
                <h3 className="font-extrabold text-white text-base">Arts & Music</h3>
                <p className="text-xs text-slate-200 leading-relaxed">Oil painting studio desks, choirs, vocal tracks, and craft exhibitions.</p>
              </div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider group-hover:underline">Explore &gt;</span>
            </Link>

            <Link href="/student-life/clubs" className="p-6 rounded-xl border border-slate-800 bg-slate-950 hover:border-amber-450 hover:bg-slate-850/50 transition-all flex flex-col justify-between min-h-[200px] group">
              <div className="space-y-3">
                <Smile className="w-8 h-8 text-amber-400" />
                <h3 className="font-extrabold text-white text-base">Clubs & Fun</h3>
                <p className="text-xs text-slate-200 leading-relaxed">Reading guilds, science experiment circles, and gardening desks.</p>
              </div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider group-hover:underline">Explore &gt;</span>
            </Link>

            <Link href="/student-life/technology" className="p-6 rounded-xl border border-slate-800 bg-slate-950 hover:border-amber-450 hover:bg-slate-850/50 transition-all flex flex-col justify-between min-h-[200px] group">
              <div className="space-y-3">
                <Cpu className="w-8 h-8 text-amber-400" />
                <h3 className="font-extrabold text-white text-base">Tech & Design</h3>
                <p className="text-xs text-slate-200 leading-relaxed">Scratch code rooms, smart library tablets, and logic calculations.</p>
              </div>
              <span className="text-[10px] font-bold text-amber-450 uppercase tracking-wider group-hover:underline">Explore &gt;</span>
            </Link>

          </div>
        </div>
      </section>

    </div>
  );
}
