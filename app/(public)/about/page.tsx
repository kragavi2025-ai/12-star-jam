'use client';

import React from 'react';
import Link from 'next/link';
import { Sprout, Heart, GraduationCap, Star, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-16 space-y-20 font-sans">

      {/* Editorial Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Knowing Our Roots</span>
        <h1 className="text-4xl sm:text-5xl font-black font-outfit uppercase tracking-tight text-slate-900 leading-none">
          About 12 Star Jam School
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
          A happy beginning. A strong foundation. A brighter tomorrow.
        </p>
      </section>

      {/* Main Narrative Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-outfit">
              Play. Discover. Grow.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              At 12 Star Jam School, we make the early years meaningful through play, discovery, creativity, and caring guidance. Our children learn at their own pace while building confidence, independence, communication, and essential life skills.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed font-semibold">
              Giving every child the right start for a confident tomorrow.
            </p>

            <div className="space-y-4 pt-4">
              <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-tight">Why Parents Choose Us</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <div className="p-2 h-9 w-9 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center border border-amber-100 flex-shrink-0">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-850 text-sm">🌱 Learn Through Play</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">Children explore, create, and learn naturally.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-2 h-9 w-9 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center border border-amber-100 flex-shrink-0">
                    <Heart className="w-5 h-5 flex-shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-850 text-sm">💛 Caring Environment</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">A safe and welcoming space where every child feels valued.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-2 h-9 w-9 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center border border-amber-100 flex-shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-850 text-sm">🧠 Strong Foundations</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">Early learning that prepares children for their next stage.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-2 h-9 w-9 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center border border-amber-100 flex-shrink-0">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-850 text-sm">⭐ Every Child Matters</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">We encourage each child's curiosity, confidence, and individuality.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
            <img
              src="/images/school/classroom-about.jpeg"
              alt="12 Star Jam School classroom"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=500';
              }}
            />
          </div>
        </div>
      </section>

      {/* Chennai Campus Highlights & Layout */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="max-w-2xl space-y-4">
            <div className="text-xs font-bold tracking-widest text-amber-400 uppercase">Our Setting</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit">A Safe & Happy Place to Grow</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              A warm, welcoming campus in Chennai where children feel safe, active, and ready to learn every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">🛡️ Safe & Secure</span>
              <h3 className="font-bold text-white text-base">A Safe Place for Every Child</h3>
              <p className="text-xs text-slate-200 leading-relaxed">A secure campus with careful supervision so children can learn and play with confidence.</p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">🌿 Play & Outdoor Time</span>
              <h3 className="font-bold text-white text-base">Space to Play, Explore & Stay Active</h3>
              <p className="text-xs text-slate-200 leading-relaxed">Open play areas where children enjoy games, movement, nature, and outdoor activities.</p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">💛 Caring Environment</span>
              <h3 className="font-bold text-white text-base">A Place Where Children Feel at Home</h3>
              <p className="text-xs text-slate-200 leading-relaxed">Friendly teachers and a caring atmosphere that help children feel comfortable, confident, and happy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation block to sub-about sections */}
      <section className="max-w-3xl mx-auto px-4 text-center space-y-8">
        <h2 className="text-2xl font-extrabold text-slate-900 font-outfit uppercase">Discover More</h2>
        <div className="flex justify-center">
          <Link
            href="/about/vision-mission"
            className="p-6 w-full max-w-sm rounded-xl border border-slate-100 bg-white hover:border-amber-500 hover:shadow-md transition-all block text-slate-850 text-sm font-bold uppercase font-outfit"
          >
            Vision & Mission
          </Link>
        </div>
      </section>

    </div>
  );
}
