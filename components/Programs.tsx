'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Programs() {
  const programs = [
    {
      id: 'play-school',
      title: 'Play School',
      age: '1.5 – 2.5 Years',
      img: '/images/program-toddler.jpg'
    },
    {
      id: 'pre-kg',
      title: 'Pre-KG',
      age: '2.5 – 3.5 Years',
      img: '/images/program-primary.jpg'
    },
    {
      id: 'lkg',
      title: 'LKG',
      age: '3.5 – 4.5 Years',
      img: '/images/program-lower-elementary.jpg'
    },
    {
      id: 'ukg',
      title: 'UKG',
      age: '4.5 – 5.5 Years',
      img: '/images/program-upper-elementary.jpg'
    }
  ];

  return (
    <section id="programs" className="bg-warm-cream py-20 relative overflow-hidden star-pattern">
      {/* Decorative star background */}
      <div className="absolute -left-8 top-1/3 w-28 h-28 text-pink-500/10 pointer-events-none select-none hidden lg:block z-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M50 15 L52 48 L85 50 L52 52 L50 85 L48 52 L15 50 L48 48 Z" fill="currentColor" fillOpacity="0.1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 border border-pink-200">
            <Sparkles className="w-3 h-3 text-pink-600" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-deep-forest">Montessori Levels</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-deep-forest leading-tight">
            Our Programs
          </h2>
          <div className="w-24 h-1 bg-gradient-pink-purple rounded-full mx-auto"></div>
        </div>

        {/* 4 Cards representing preschool/elementary program levels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog) => (
            <div 
              key={prog.id}
              className="group bg-white rounded-2xl overflow-hidden border border-pink-100 hover:border-pink-300 shadow-sm flex flex-col justify-between hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300 p-3.5 pb-6 text-center hover:-translate-y-1.5"
            >
              <div className="space-y-4">
                <div className="aspect-[4/3] w-full rounded-xl bg-pink-50/50 overflow-hidden relative border border-pink-100">
                  <img 
                    src={prog.img} 
                    alt={prog.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-1.5 block">
                  <h3 className="font-bold text-deep-forest text-base font-serif uppercase tracking-tight group-hover:text-purple-700 transition-colors">
                    {prog.title}
                  </h3>
                  <span className="inline-block px-3 py-0.5 rounded-full bg-pink-100/80 text-pink-700 text-xs font-bold tracking-wide">
                    {prog.age}
                  </span>
                  {/* Gradient pink-purple divider */}
                  <div className="w-10 h-0.5 bg-gradient-pink-purple rounded-full mx-auto mt-2 opacity-60 group-hover:opacity-100 group-hover:w-16 transition-all duration-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
