'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { X, Search, Loader2 } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
  description?: string;
  created_at: string;
}

const mockGallery: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Grade 1 Math Block study',
    image_url: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=400',
    category: 'Academics',
    description: 'Students learn additions using color blocks.',
    created_at: '2026-08-01',
  },
  {
    id: 'g-2',
    title: 'Outdoor Sports Track Meet',
    image_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=400',
    category: 'Activities',
    description: 'Relay runs during physical wellness classes.',
    created_at: '2026-08-02',
  },
  {
    id: 'g-3',
    title: 'Science Experiment Gear Table',
    image_url: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=400',
    category: 'Campus',
    description: 'Magnification blocks study cell structures.',
    created_at: '2026-08-03',
  },
  {
    id: 'g-4',
    title: 'Paint Exhibition desks',
    image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400',
    category: 'Arts',
    description: 'Watercolors hanging in the school play block.',
    created_at: '2026-08-04',
  }
];

const categories = ['All', 'Academics', 'Activities', 'Campus', 'Arts'];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setItems(data);
        } else {
          setItems(mockGallery);
        }
      } catch (err) {
        console.warn('Failed to fetch gallery, using mock images:', err);
        setItems(mockGallery);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => (item.category || 'Activities').toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
      
      <section className="text-left space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Visual Portfolio</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit uppercase tracking-tight">Media Gallery</h1>
        <p className="text-slate-500 text-sm max-w-2xl font-normal">
          Walkthrough our study rooms, outdoor campus sectors, interest club schedules and visual arts showcases at 12 JAM SCHOOL, Trichy.
        </p>
      </section>

      {/* Category selector */}
      <section className="flex flex-wrap items-center gap-3 text-left">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-extrabold uppercase rounded-full border cursor-pointer transition-all font-outfit ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 border-amber-500'
                : 'bg-white text-slate-700 border-slate-105 hover:border-slate-205'
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {loading ? (
        <div className="py-12 flex justify-center items-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group rounded-2xl overflow-hidden border border-slate-100 bg-white cursor-pointer hover:shadow-md transition-all relative flex flex-col justify-between"
            >
              <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=400';
                  }}
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 bg-white/90 rounded-full text-slate-800 shadow-lg">
                    <Search className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest block">{item.category || 'Activities'}</span>
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm leading-tight uppercase font-outfit truncate">{item.title}</h4>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-slate-950/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white cursor-pointer transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-4xl w-full space-y-4 text-left">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="w-full h-full object-contain mx-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=900';
                }}
              />
            </div>
            <div className="space-y-1 select-text">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">{selectedImage.category || 'Activities'}</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-outfit uppercase">{selectedImage.title}</h2>
              {selectedImage.description && (
                <p className="text-slate-400 text-xs sm:text-sm font-sans font-medium">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
 