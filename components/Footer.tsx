'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Youtube, Quote } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-green text-light-sage/80 border-t border-medium-green/30 font-sans relative overflow-hidden">
      {/* Decorative Celestial Stars overlays on footer margins */}
      <div className="absolute bottom-8 right-8 w-28 h-28 text-pink-500/10 pointer-events-none select-none hidden lg:block z-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M50 15 L52 48 L85 50 L52 52 L50 85 L48 52 L15 50 L48 48 Z" fill="currentColor" fillOpacity="0.2" />
        </svg>
      </div>

      <div className="absolute top-10 left-10 w-24 h-24 text-purple-400/10 pointer-events-none select-none hidden lg:block z-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" />
          <path d="M50 10 L52 48 L90 50 L52 52 L50 90 L48 52 L10 50 L48 48 Z" fill="currentColor" fillOpacity="0.2" />
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-3 space-y-6 text-left">
            <div className="block">
              <div>
                <span className="block text-xl font-bold text-white font-serif uppercase tracking-wider">
                  12 Star Jam School
                </span>
                <span className="text-[10px] text-gold font-bold tracking-widest uppercase block mt-1">
                  Play School
                </span>
              </div>
            </div>
            <p className="text-xs text-light-sage/90 max-w-sm leading-relaxed text-left">
              At 12 Star Jam School, Chennai, we nurture young minds in a safe, natural and inspiring environment to help them become confident, compassionate and capable individuals.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-deep-forest hover:bg-medium-green text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-deep-forest hover:bg-medium-green text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-deep-forest hover:bg-medium-green text-white transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h3 className="text-xs font-bold text-gold uppercase tracking-wider font-sans">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs text-left text-white/90">
              <li>
                <a href="#hero" className="hover:text-lime-accent transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-lime-accent transition-colors">About Us</a>
              </li>
              <li>
                <a href="/academics" className="hover:text-lime-accent transition-colors">Academics</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-lime-accent transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#admissions" className="hover:text-lime-accent transition-colors">Admissions</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-lime-accent transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Useful Links Column */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h3 className="text-xs font-bold text-gold uppercase tracking-wider font-sans">
              Useful Links
            </h3>
            <ul className="space-y-2.5 text-xs text-left text-white/90">
              <li>
                <a href="#events" className="hover:text-lime-accent transition-colors">School Calendar</a>
              </li>
              <li>
                <a href="#" className="hover:text-lime-accent transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-lime-accent transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-lime-accent transition-colors">Admin Login</Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h3 className="text-xs font-bold text-gold uppercase tracking-wider font-sans">
              Contact Us
            </h3>
            <ul className="space-y-3.5 text-xs text-left text-white/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="leading-tight">
                  12 Star Jam School, Chennai, Tamil Nadu - 600XXX
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-lime-accent transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="mailto:info@12starjamschool.edu.in" className="hover:text-lime-accent transition-colors break-all">info@12starjamschool.edu.in</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span>Mon – Fri: 08:30 AM – 03:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Quote Column - Far Right quote matching screenshot */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <div className="bg-deep-forest border border-medium-green/45 p-6 rounded-2xl relative overflow-hidden shadow-md">
              <Quote className="absolute -top-1 -left-1 w-12 h-12 text-white/5 pointer-events-none" />
              <p className="text-[11px] text-white italic leading-relaxed relative z-10 font-serif">
                "Education is a natural process carried out by the child and is not acquired by listening to words but by experiences in the environment."
              </p>
              <p className="text-[9px] text-gold font-bold uppercase tracking-wider mt-3 text-right block relative z-10">
                — Maria Montessori
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Legals */}
      <div className="bg-deep-forest/40 border-t border-medium-green/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-white/70">
          <p>© 2024 12 Star Jam School, Chennai. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-lime-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-lime-accent transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
