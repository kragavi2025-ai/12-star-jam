'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Bell, Calendar, Loader2 } from 'lucide-react';

interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  publish_date: string;
  importance: 'low' | 'medium' | 'high';
  created_at: string;
}

const mockAnnouncements: AnnouncementItem[] = [
  {
    id: 'mock-1',
    title: 'Admissions Enquiry Placements for 2026-27 Open',
    content: 'Enquiry forms are now registered for admission into Grade 1 through 5. Physical walks are scheduled on Tuesdays.',
    publish_date: '2026-08-15',
    importance: 'high',
    created_at: '2026-08-15',
  },
  {
    id: 'mock-2',
    title: 'Term-1 Parent Portfolio Reviews Schedule',
    content: 'Review meetings will start on the third floor administrative block. Portfolios are distributed by homeroom tutors.',
    publish_date: '2026-08-17',
    importance: 'medium',
    created_at: '2026-08-17',
  }
];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const { data, error } = await supabase
          .from('announcements')
          .select('*')
          .order('publish_date', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setAnnouncements(data);
        } else {
          setAnnouncements(mockAnnouncements);
        }
      } catch (err) {
        console.warn('Failed to fetch announcements from database, falling back to mock data:', err);
        setAnnouncements(mockAnnouncements);
      } finally {
        setLoading(false);
      }
    }
    fetchAnnouncements();
  }, []);

  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
      
      <section className="text-left space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Official Notices</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit uppercase tracking-tight">Announcements</h1>
        <p className="text-slate-500 text-sm max-w-2xl font-normal">
          Keep updated with regular schedules, administrative notifications, term parameters, and calendar audits at 12 JAM SCHOOL, Trichy.
        </p>
      </section>

      {loading ? (
        <div className="py-12 flex justify-center items-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <section className="space-y-6 text-left">
          {announcements.map((item) => (
            <div key={item.id} className="p-6 rounded-2xl bg-white border border-slate-105 shadow-xs flex gap-4 items-start hover:border-slate-200 transition-all">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20 mt-0.5">
                <Bell className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-extrabold text-slate-805 text-base font-outfit uppercase leading-tight">{item.title}</h3>
                  {item.importance === 'high' && (
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[9px] font-bold uppercase tracking-wide border border-red-200">Urgent</span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans font-medium">{item.content}</p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-2">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span>{new Date(item.publish_date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

    </div>
  );
}
