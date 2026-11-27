'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowUp, Sparkles } from 'lucide-react';

export default function ScrollContrastArrow() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const [isScrolling, setIsScrolling] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;

      setScrollProgress(progress);
      setShowScrollTop(progress > 55);

      if (currentScrollY > lastScrollY + 2) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY - 2) {
        setScrollDirection('up');
      }

      lastScrollY = currentScrollY;
      setIsScrolling(true);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 700);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleArrowClick = () => {
    if (showScrollTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Scroll to next logical section (approx 1 viewport or to #about)
      const nextSection = document.getElementById('about');
      if (nextSection && window.scrollY < 400) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
      }
    }
  };

  // SVG circular progress calculation
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {/* 1. Sleek Right-Edge Vertical Passing Arrow Rail (Visible on md and larger) */}
      <div
        className={`fixed right-3 sm:right-5 top-28 bottom-28 w-6 pointer-events-none z-40 hidden md:flex flex-col items-center justify-between transition-opacity duration-500 ${isScrolling ? 'opacity-90' : 'opacity-40 hover:opacity-80'
          }`}
        aria-hidden="true"
      >
        {/* Vertical gradient trail line */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-pink-400/20 via-purple-500/40 to-pink-500/20 rounded-full" />

        {/* Dynamic Passing Contrast Arrow that glides up and down along the rail */}
        <div
          className="absolute transform -translate-x-1/2 transition-transform duration-150 ease-out flex flex-col items-center"
          style={{
            top: `${Math.min(95, Math.max(5, scrollProgress))}%`,
            left: '50%',
          }}
        >
          {/* Luminous passing glow badge */}
          <div className="relative p-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/40 border border-white/60">
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${scrollDirection === 'up' ? 'rotate-180' : 'rotate-0'
                }`}
            />
          </div>

          {/* Passing Arrow trail stream effect when actively scrolling */}
          {isScrolling && (
            <div className="flex flex-col items-center -space-y-1.5 mt-1 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 opacity-80" />
              <span className="w-1 h-1 rounded-full bg-purple-400 opacity-50" />
            </div>
          )}
        </div>
      </div>

      {/* 2. Floating High-Contrast Circular Action Arrow Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
        <button
          onClick={handleArrowClick}
          aria-label={showScrollTop ? 'Scroll to top of page' : 'Scroll down page'}
          className={`group relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#180327] border-2 border-pink-400/80 text-white flex items-center justify-center cursor-pointer shadow-2xl transition-all duration-300 active:scale-90 hover:scale-110 ${isScrolling
              ? 'shadow-pink-500/40 ring-4 ring-pink-500/20'
              : 'shadow-purple-950/30'
            }`}
        >
          {/* Circular SVG Scroll Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5">
            <circle
              cx="24"
              cy="24"
              r={radius}
              className="text-pink-900/30"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="24"
              cy="24"
              r={radius}
              className="text-pink-500 transition-all duration-150"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="url(#pinkPurpleGradient)"
              fill="transparent"
            />
            <defs>
              <linearGradient id="pinkPurpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF2A85" />
                <stop offset="100%" stopColor="#9333EA" />
              </linearGradient>
            </defs>
          </svg>

          {/* Animated Contrast Arrow in center */}
          <div className="relative z-10 flex flex-col items-center justify-center text-pink-300 group-hover:text-white transition-colors">
            {showScrollTop ? (
              <ArrowUp className="w-5 h-5 text-lime-accent group-hover:-translate-y-0.5 transition-transform duration-200" />
            ) : (
              <div className="flex flex-col items-center">
                <ChevronDown className="w-5 h-5 text-lime-accent group-hover:translate-y-0.5 transition-transform duration-200" />
              </div>
            )}
          </div>

          {/* Hover Tooltip Pill */}
          <span className="absolute right-15 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-[#180327] text-white text-[10px] font-black uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-pink-400/40 shadow-lg">
            {showScrollTop ? 'Back to Top' : `Scroll (${Math.round(scrollProgress)}%)`}
          </span>
        </button>
      </div>
    </>
  );
}
