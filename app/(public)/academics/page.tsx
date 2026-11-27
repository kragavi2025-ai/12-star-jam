'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Heart, Award, CheckCircle } from 'lucide-react';

export default function AcademicsPage() {
  return (
    <div className="py-16 space-y-20 font-sans">
      
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Educational Pillars</span>
        <h1 className="text-4xl sm:text-5xl font-black font-outfit uppercase tracking-tight text-slate-900 leading-none">
          Academics Overview
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
          A structured path of active learning, playful exploration, and warm guidance tailored for early years (Play School, Pre-KG, LKG, and UKG).
        </p>
      </section>

      {/* Main Core Columns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-outfit">
              Nurturing Young Minds Through Joyful Discovery
            </h2>
            <p className="text-slate-650 text-sm leading-relaxed">
              We believe that early childhood is the foundation of lifelong learning. Rather than using rigid learning drills or rote instruction, we encourage children to observe, touch, learn, and ask questions. In our secure, supportive environment, kids naturally build physical milestones, language fluency, and independent thinking.
            </p>
            <p className="text-slate-650 text-sm leading-relaxed">
              Our low student-to-teacher ratio ensures that every child receives personal attention, warm care, and individual focus tailored to their unique pace of growth.
            </p>
            <div className="pt-2">
              <Link href="/admissions/process" className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-600 hover:text-amber-800 transition-colors">
                <span>View Admission Process & Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xl">
            <img
              src="/images/classroom.jpg"
              alt="Preschool core learning activity hour"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=500';
              }}
            />
          </div>
        </div>
      </section>

      {/* Grade Stages overview */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Studying Path</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit uppercase">Montessori Stages</h2>
            <p className="text-slate-400 text-sm">
              We design specific academic milestones for each of our preschool levels matching child development schedules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {[
              { id: 'pre-kg', name: 'Play School', label: 'Play School Core' },
              { id: 'lkg', name: 'Pre-KG', label: 'Pre-KG Study' },
              { id: 'ukg', name: 'LKG', label: 'LKG Study' },
              { id: 'kg-1', name: 'UKG', label: 'UKG Study' }
            ].map((program) => (
              <div key={program.id} className="p-6 rounded-xl border border-slate-800 bg-slate-950 flex flex-col justify-between min-h-[220px]">
                <div className="space-y-4">
                  <span className="text-amber-400 font-bold font-outfit text-2xl">{program.name}</span>
                  <h3 className="font-bold text-white text-base">{program.label}</h3>
                  <p className="text-[11px] text-slate-350 leading-relaxed font-sans">
                    Explore core developmental outcomes, learning activities, group environments and milestone profiles.
                  </p>
                </div>
                <Link
                  href={`/academics/${program.id}`}
                  className="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-400 hover:text-amber-300 transition-colors uppercase pt-4"
                >
                  <span>Explore {program.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Focus Parameters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-outfit uppercase text-left">Academic Highlights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-3">
            <h3 className="font-bold font-outfit text-slate-800 text-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-amber-600" />
              <span>Language Expression</span>
            </h3>
            <p className="text-slate-550 text-xs leading-relaxed">
              Encouraging vocabulary, phonetic sounds, early communication skills, active listening, and simple interactive storytelling.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold font-outfit text-slate-800 text-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-amber-600" />
              <span>Sensory & Motor Skills</span>
            </h3>
            <p className="text-slate-550 text-xs leading-relaxed">
              Building coordination, pencil grip control, tracing, block counting, and shape discovery using natural Montessori methods.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold font-outfit text-slate-800 text-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-amber-600" />
              <span>Social & Caring Values</span>
            </h3>
            <p className="text-slate-550 text-xs leading-relaxed">
              Guided group games that help children build sharing instincts, empathy, friendly manners, and a warm group bond.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
