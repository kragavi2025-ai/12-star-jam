'use client';

import React from 'react';
import { Sparkles, Star, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center bg-cream text-dark-text overflow-hidden pt-32 pb-16 px-4 sm:px-6 lg:px-8 star-pattern">
      {/* Decorative celestial background sparkles */}
      <div className="absolute top-12 right-12 w-32 h-32 opacity-25 pointer-events-none z-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-pink-500">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
          <path d="M50 10 L52 48 L90 50 L52 52 L50 90 L48 52 L10 50 L48 48 Z" fill="currentColor" fillOpacity="0.08" />
        </svg>
      </div>
      
      <div className="absolute -bottom-8 left-12 w-28 h-28 opacity-20 pointer-events-none z-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-purple-600 transform rotate-45">
          <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" />
          <path d="M50 15 L52 48 L85 50 L52 52 L50 85 L48 52 L15 50 L48 48 Z" fill="currentColor" fillOpacity="0.08" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Main Hero Copy */}
        <div className="lg:col-span-7 space-y-8 text-left z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/90 text-deep-forest text-[10px] font-extrabold uppercase tracking-widest border border-pink-300/60 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
            <span>Premium Montessori Education</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-serif leading-tight text-deep-forest">
            Nurturing Curiosity.<br />
            <span className="text-gradient-pink-purple font-normal italic lowercase font-serif block mt-1 tracking-normal normal-case">
              inspiring growth.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-dark-text max-w-xl leading-relaxed font-medium">
            A Montessori learning environment that celebrates natural discovery, self-confidence, and joyful creativity. Located in Chennai.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#about"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest text-white bg-gradient-pink-purple hover:opacity-95 shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 transition-all active:scale-95 duration-200 shimmer-pink"
            >
              Discover More
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-deep-forest bg-white/90 border-2 border-pink-400/70 hover:bg-pink-50 hover:border-pink-500 transition-all duration-200 shadow-xs"
            >
              Admissions Open
            </a>
          </div>

          <div className="pt-2 flex items-center gap-2 text-[11px] text-purple-700 font-bold tracking-wide">
            <span>✨</span>
            <span>Active Sensory Classrooms & Creative Discovery Gardens</span>
          </div>
        </div>

        {/* Hero Image section */}
        <div className="lg:col-span-5 relative w-full max-w-md mx-auto z-10">
          {/* Asymmetrical Lens wrapper with Accent outline */}
          <div className="relative w-full aspect-[4/5] rounded-[140px_35px_140px_35px] border-2 border-pink-400/50 p-3 overflow-hidden shadow-2xl shadow-purple-900/15 bg-white">
            <div className="w-full h-full rounded-[130px_28px_130px_28px] overflow-hidden bg-warm-cream relative">
              <img
                src="/images/hero-child.jpg"
                alt="Child engaged in Montessori learning activity"
                className="w-full h-full object-cover scale-102 hover:scale-100 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Floating dark plum circle badge with neon pink text */}
          <div className="absolute -bottom-5 -left-5 w-28 h-28 rounded-full bg-gradient-to-br from-deep-forest to-dark-green border-4 border-white flex items-center justify-center text-center text-white p-3 shadow-xl shadow-purple-950/30 z-20 hover:scale-105 transition-transform duration-300">
            <span className="text-[10px] sm:text-[11px] font-black leading-tight uppercase font-sans tracking-wider block text-lime-accent">
              Learn. ✨<br />Grow. 💫<br />Thrive. 🌟
            </span>
          </div>

          {/* Small star sparkle decoration */}
          <div className="absolute -top-6 -right-6 w-14 h-14 text-pink-500 opacity-60 pointer-events-none select-none z-0">
            <Star className="w-full h-full fill-pink-500/10 stroke-pink-500" />
          </div>
        </div>

      </div>

      {/* Passing Contrast Arrow Prompt in Hero */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer">
        <a 
          href="#about"
          className="group flex flex-col items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-pink-300/70 shadow-lg shadow-purple-900/5 hover:border-pink-500 hover:shadow-pink-500/20 transition-all active:scale-95 duration-200"
          aria-label="Scroll down to explore"
        >
          <span className="text-[9px] font-black uppercase tracking-widest text-deep-forest group-hover:text-pink-600 transition-colors">
            Scroll to Explore
          </span>
          <div className="w-5 h-5 rounded-full bg-gradient-pink-purple text-white flex items-center justify-center shadow-sm">
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </a>
      </div>

      {/* Organic Curved wave bottom border */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px] text-warm-cream fill-current">
          <path d="M0,0 C150,90 350,110 500,90 C650,70 900,10 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}
