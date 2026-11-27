'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Calendar, User, Loader2 } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  author?: string;
  published_date: string;
  image_url?: string;
  created_at: string;
}

const mockNews: NewsItem[] = [
  {
    id: 'mock-1',
    title: 'Grade 3 scratch coders launch spatial sprites animation',
    content: 'Students in Grade 3 designed their initial keyboard layout animation using visual block commands, setting parameters of velocity and coordinates.',
    author: '[Staff Writer]',
    published_date: '2026-08-10',
    image_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=400',
    created_at: '2026-08-10',
  },
  {
    id: 'mock-2',
    title: 'New Story library blocks added to research archives',
    content: 'Over 200 physical storytelling books and audio tablets were registered to support primary language arts checkpoints.',
    author: '[Staff Writer]',
    published_date: '2026-08-12',
    image_url: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=400',
    created_at: '2026-08-12',
  }
];

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('published_date', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setNews(data);
        } else {
          setNews(mockNews);
        }
      } catch (err) {
        console.warn('Failed to fetch news from database, falling back to mock data:', err);
        setNews(mockNews);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
      
      <section className="text-left space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">The Newsroom</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit uppercase tracking-tight">Latest News</h1>
        <p className="text-slate-500 text-sm max-w-2xl font-normal">
          Explore campus milestone reports, creative project highlights, athletic victories, and student achievements at 12 JAM SCHOOL, Trichy.
        </p>
      </section>

      {loading ? (
        <div className="py-12 flex justify-center items-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {news.map((item) => (
            <div key={item.id} className="p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-md transition-all flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-105 border border-slate-200">
                  <img
                    src={item.image_url || 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=400'}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=400';
                    }}
                  />
                </div>
                
                <h3 className="font-extrabold text-slate-805 text-lg font-outfit uppercase leading-tight">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">{item.content}</p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex gap-4 text-[10px] text-slate-200 font-bold uppercase tracking-wider mt-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-505" />
                  <span>{new Date(item.published_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-amber-505" />
                  <span>{item.author || '[Staff Writer]'}</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

    </div>
  );
}
