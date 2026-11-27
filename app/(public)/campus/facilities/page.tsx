'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, ShieldAlert, CheckCircle, HelpCircle } from 'lucide-react';

export default function FacilitiesPage() {
  return (
    <div className="py-16 space-y-20 font-sans">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">The Estate</span>
        <h1 className="text-4xl sm:text-5xl font-black font-outfit uppercase tracking-tight text-slate-900 leading-none">
          Campus Facilities
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl">
          At 12 JAM SCHOOL, Trichy, our physical spaces highlight safety parameters, hygiene setups, interactive learning corners, and sporting fields.
        </p>
      </section>

      {/* Main split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-outfit">
              Secure Estate Specially Designed For Young Students
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We design facilities optimized specifically for younger primary children (Pre.KG, LKG, UKG, and KG-1). Class desks feature curved edges, tables group together for collaborative project work, and screens are locked into strict filtering firewalls.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our campus grounds include outdoor turf playgrounds, physical activity tracks, storytelling library rooms, creative fine-art workshops, and STEM science playtables.
            </p>
            <div className="pt-2">
              <Link href="/campus/safety" className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-600 hover:text-amber-800 transition-colors">
                <span>Review Safety Audits</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xl">
            <img
              src="/images/facilities/building.jpeg"
              alt="12 JAM School building design"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=500';
              }}
            />
          </div>
        </div>
      </section>

      {/* Specialty Areas Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Studying Spaces</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit uppercase">Specialist Rooms</h2>
            <p className="text-slate-400 text-sm font-normal">
              We separate learning areas to provide focused environments for quiet reading, scientific inquiry, or creative play.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Interactive Library</span>
              <h3 className="font-bold text-white text-base">Storybook Racks</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Featuring reading corners, star-reading charts, child-friendly book racks, and digital audio tablets.
              </p>
              <Link href="/campus/library" className="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-400 hover:underline uppercase pt-2">
                <span>View Library Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">STEM Playroom</span>
              <h3 className="font-bold text-white text-base">Science Labs</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Physics balance beams, magnifying blocks, magnetic gearboards, and measurement cylinders.
              </p>
              <Link href="/campus/science" className="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-400 hover:underline uppercase pt-2">
                <span>View Science Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Health & Care</span>
              <h3 className="font-bold text-white text-base">Sanitary Design</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                High standards of sanitation, clean bathrooms, drinking water testing, and first-aid rooms.
              </p>
              <Link href="/campus/safety" className="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-400 hover:underline uppercase pt-2">
                <span>View Safety Audits</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
