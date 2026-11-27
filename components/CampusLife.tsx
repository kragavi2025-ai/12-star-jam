'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function CampusLife() {
  const items = [
    { label: 'Beautiful Campus', img: '/images/campus.jpg' },
    { label: 'Outdoor Learning', img: '/images/outdoor-learning.jpg' },
    { label: 'Practical Life Activities', img: '/images/practical-life.jpg' },
    { label: 'Joyful Classrooms', img: '/images/classroom.jpg' }
  ];

  return (
    <section id="campus" className="py-20 bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative overflow-visible">
      {/* Decorative starry background elements */}
      <div className="absolute -left-10 -top-8 w-24 h-24 text-purple-600/10 pointer-events-none select-none hidden lg:block z-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full transform -rotate-12">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M50 15 L52 48 L85 50 L52 52 L50 85 L48 52 L15 50 L48 48 Z" fill="currentColor" fillOpacity="0.1" />
        </svg>
      </div>

      <div className="absolute -right-8 -bottom-10 w-24 h-24 text-pink-500/10 pointer-events-none select-none hidden lg:block z-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full transform rotate-12">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M50 15 L52 48 L85 50 L52 52 L50 85 L48 52 L15 50 L48 48 Z" fill="currentColor" fillOpacity="0.1" />
        </svg>
      </div>

      <div className="text-center space-y-4 max-w-xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 border border-pink-200">
          <Sparkles className="w-3 h-3 text-pink-600" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-deep-forest">Our Environment</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-deep-forest leading-tight">
          Campus Life
        </h2>
        <div className="w-24 h-1 bg-gradient-pink-purple rounded-full mx-auto"></div>
      </div>

      {/* 4 columns of photos with pink/purple label badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 relative z-10">
        {items.map((item, idx) => (
          <div 
            key={idx}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md border border-pink-100 bg-warm-cream flex flex-col justify-end p-3 hover:shadow-2xl hover:shadow-purple-900/15 transition-all duration-300 hover:-translate-y-1.5"
          >
            <img 
              src={item.img} 
              alt={item.label} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Soft dark purple gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-green/85 via-purple-950/20 to-transparent z-0"></div>
            
            {/* Overlay label with pink-purple hover gradient */}
            <div className="relative z-10 w-full bg-deep-forest/90 backdrop-blur-md border border-pink-400/30 rounded-xl py-2.5 px-3 text-center transition-all duration-300 group-hover:bg-gradient-pink-purple group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-pink-500/30">
              <span className="text-[10px] sm:text-[11px] text-white font-black uppercase tracking-wider block truncate">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
