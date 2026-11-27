'use client';

import React from 'react';
import { Sparkles, Compass, Lightbulb, Heart } from 'lucide-react';

export default function WhyChoose() {
  const cards = [
    {
      icon: <Sparkles className="w-5 h-5 text-lime-accent" />,
      title: "Child-Centered Learning",
      description: "Encouraging independence, creativity and confidence at every developmental step."
    },
    {
      icon: <Compass className="w-5 h-5 text-lime-accent" />,
      title: "Joyful Exploration",
      description: "A peaceful environment designed for hands-on discovery and active sensory learning."
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-lime-accent" />,
      title: "Holistic Development",
      description: "Focusing on intellectual, emotional, social, and physical growth in harmony."
    },
    {
      icon: <Heart className="w-5 h-5 text-lime-accent" />,
      title: "Nurturing Values",
      description: "Building respect, kindness, and cooperative responsibility for a brighter tomorrow."
    }
  ];

  return (
    <section id="about" className="py-20 bg-warm-cream max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative overflow-visible">
      {/* Decorative starry background elements */}
      <div className="absolute -left-12 top-1/4 w-28 h-28 text-purple-600/10 pointer-events-none select-none hidden lg:block z-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full transform -rotate-45">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M50 15 L52 48 L85 50 L52 52 L50 85 L48 52 L15 50 L48 48 Z" fill="currentColor" fillOpacity="0.1" />
        </svg>
      </div>

      <div className="absolute -right-12 top-1/2 w-28 h-28 text-pink-500/10 pointer-events-none select-none hidden lg:block z-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full transform rotate-45">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M50 15 L52 48 L85 50 L52 52 L50 85 L48 52 L15 50 L48 48 Z" fill="currentColor" fillOpacity="0.1" />
        </svg>
      </div>

      <div className="text-center space-y-4 max-w-xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 border border-pink-200">
          <Sparkles className="w-3 h-3 text-pink-600" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-deep-forest">Our Core Foundations</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-deep-forest leading-tight">
          Why Choose Montessori?
        </h2>
        <div className="w-24 h-1 bg-gradient-pink-purple rounded-full mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {cards.map((card, index) => (
          <div 
            key={index}
            className="p-6 rounded-2xl bg-white border border-pink-100 hover:border-pink-300 shadow-sm hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300 flex flex-col items-center text-center space-y-4 hover:-translate-y-1.5 group"
          >
            {/* Circular royal purple icon area */}
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-deep-forest to-purple-900 flex items-center justify-center border border-pink-400/30 group-hover:from-pink-600 group-hover:to-purple-700 transition-all duration-300 shadow-md group-hover:shadow-pink-500/25">
              {card.icon}
            </div>
            
            {/* Heading */}
            <h3 className="font-extrabold text-deep-forest text-sm font-sans uppercase tracking-wide group-hover:text-purple-700 transition-colors">
              {card.title}
            </h3>
            
            {/* Description */}
            <p className="text-xs text-dark-text/80 leading-relaxed font-medium">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
