'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Compass, HelpCircle } from 'lucide-react';

export default function ClubsPage() {
  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
      
      {/* Back */}
      <Link href="/student-life" className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-600 hover:text-amber-800 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Student Life</span>
      </Link>

      <section className="text-left space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Interests & Interaction</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit uppercase tracking-tight">Clubs & Activities</h1>
        <p className="text-slate-500 text-sm max-w-2xl font-normal">
          Encouraging child interest groups, active clubs, chess boards, reading leagues, and gardening circles at 12 JAM SCHOOL, Trichy.
        </p>
      </section>

      {/* Narrative Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
        <div className="lg:col-span-8 space-y-5 text-sm text-slate-600 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-bold font-outfit text-slate-800 font-outfit">Fostering Lifelong Passions</h2>
          <p>
            Co-curricular clubs represent a vital platform helping primary study groups to learn collaborative division, respect unique hobbies, and form child bonds. Our school registers children into weekly interest blocks during friday afternoons.
          </p>
          <p>
            Students opt into standard panels such as the library reading league, chess board circle, seedling gardeners, nature scrapbooking, or choral singers. These activities prompt kids to coordinate lists, manage project stages, and present their hobbies at our final assembly meetups.
          </p>
        </div>

        <div className="lg:col-span-4 aspect-[3/4] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
          <img
            src="/images/activities/clubs.jpeg"
            alt="Students in chess club activity"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=400';
            }}
          />
        </div>
      </section>

      {/* Clubs catalog */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="p-6 rounded-xl border border-slate-100 bg-white space-y-3">
          <Compass className="w-7 h-7 text-amber-500" />
          <h3 className="font-bold text-slate-800 text-base font-outfit">Chess & Logic Table</h3>
          <p className="text-xs text-slate-550 leading-relaxed font-normal">Tactical board analysis, chess opening parameters, checkmate exercises, and inter-grade chess matches.</p>
        </div>

        <div className="p-6 rounded-xl border border-slate-105 bg-white space-y-3">
          <BookOpen className="w-7 h-7 text-amber-500" />
          <h3 className="font-bold text-slate-800 text-base font-outfit">Reading League</h3>
          <p className="text-xs text-slate-550 leading-relaxed font-normal font-sans">Earning book stars, creating story cards, and reciting highlights to class groups during review circles.</p>
        </div>

        <div className="p-6 rounded-xl border border-slate-100 bg-white space-y-3">
          <HelpCircle className="w-7 h-7 text-amber-550" />
          <h3 className="font-bold text-slate-800 text-base font-outfit">Nature Gardeners</h3>
          <p className="text-xs text-slate-550 leading-relaxed font-normal">Sowing plant seeds in compost pans, charting weekly seedling loops, and compiling leaf shapes.</p>
        </div>
      </section>

    </div>
  );
}
