'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Target, Trophy, Heart } from 'lucide-react';

export default function SportsPage() {
  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
      
      {/* Back to Student Life */}
      <Link href="/student-life" className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-600 hover:text-amber-800 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Student Life</span>
      </Link>

      <section className="text-left space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Physical Development</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit uppercase tracking-tight">Sports & Athletics</h1>
        <p className="text-slate-500 text-sm max-w-2xl font-normal">
          Physical fitness, gross motor coordination, cooperative play rules, and team building values at 12 JAM SCHOOL, Trichy.
        </p>
      </section>

      {/* Main split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
        <div className="lg:col-span-8 space-y-5 text-sm text-slate-600 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-bold font-outfit text-slate-800">Tracking Gross Motor Progression</h2>
          <p>
            For primary student ages (Pre.KG, LKG, UKG, and KG-1), physical sport runs represent an essential parameter of health, motor skill control and collaborative bonding. Our coaches manage daily sports checkouts where kids run, jump, handle soccer balls, swing racket tools, and complete relays.
          </p>
          <p>
            We host an annual Inter-House Sports Meet on our grass playing fields, prompting healthy cooperation and team identification. Tutors audit student participation to verify that kids build cooperative values, politeness during wins/losses, and physical safety actions.
          </p>
        </div>

        <div className="lg:col-span-4 aspect-[3/4] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
          <img
            src="/images/activities/sports.jpeg"
            alt="Children running track meet activity"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=400';
            }}
          />
        </div>
      </section>

      {/* Specialty Sports programs */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="p-6 rounded-xl border border-slate-100 bg-white space-y-3">
          <div className="text-amber-500 font-bold uppercase tracking-wider text-xs">Track & Field</div>
          <h3 className="font-bold text-slate-800 text-base">Running & Relays</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">Sprint practices, relay coordination runs, and hurdle lines designed under safety standard criteria.</p>
        </div>

        <div className="p-6 rounded-xl border border-slate-100 bg-white space-y-3">
          <div className="text-amber-500 font-bold uppercase tracking-wider text-xs">Skills Training</div>
          <h3 className="font-bold text-slate-800 text-base">Ball Coordination</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">Passing soccer balls, dribbling basketball units, and catching baseball shapes to grow hand-eye metrics.</p>
        </div>

        <div className="p-6 rounded-xl border border-slate-100 bg-white space-y-3">
          <div className="text-amber-500 font-bold uppercase tracking-wider text-xs">Wellness Habits</div>
          <h3 className="font-bold text-slate-800 text-base">Daily Fitness Exercises</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">Stretching routines, basic gymnastic rolls, balance beams, and posture control sessions.</p>
        </div>
      </section>

    </div>
  );
}
