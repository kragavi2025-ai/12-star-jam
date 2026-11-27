'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Calendar, MapPin, Loader2, Clock } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_path?: string;
  created_at: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('event_date', { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) {
          const mapped = data.map((d: any) => ({
            id: d.id,
            title: d.title,
            description: d.description,
            date: d.event_date || '',
            time: d.event_time || '',
            location: d.location || '',
            image_path: d.image_url || '',
            created_at: d.created_at || ''
          }));
          setEvents(mapped);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.warn('Failed to fetch events from database:', err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans bg-cream min-h-screen">
      
      <section className="text-left space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#B58A3D]">Calendar Events</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif uppercase tracking-tight">Events</h1>
        <p className="text-slate-500 text-sm max-w-2xl font-normal leading-relaxed">
          Check out our student showcase meets, athletic relays, parent portfolio conferences and campus walks at 12 JAM SCHOOL.
        </p>
      </section>

      {loading ? (
        <div className="py-12 flex justify-center items-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <section>
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              {events.map((event) => (
                <div key={event.id} className="group bg-white rounded-2xl overflow-hidden border border-[#D5E2D5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between hover:-translate-y-1 duration-300">
                  <div>
                    {event.image_path && (
                      <div className="aspect-video w-full bg-cream overflow-hidden relative">
                        <img 
                          src={event.image_path} 
                          alt={event.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div className="p-6 text-left space-y-3">
                      <div className="flex items-center gap-2 text-[10px] text-dark-text/75 font-bold uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5 text-[#B58A3D]" strokeWidth={2.5} />
                        <span>
                          {event.date ? new Date(event.date).toLocaleDateString(undefined, { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          }) : 'Date TBD'}
                        </span>
                        {event.time && (
                          <>
                            <span className="text-[#8FA88F]">•</span>
                            <Clock className="w-3.5 h-3.5 text-[#B58A3D]" strokeWidth={2.5} />
                            <span>{event.time}</span>
                          </>
                        )}
                      </div>
                      
                      <h3 className="font-bold text-deep-forest text-base font-serif uppercase leading-tight hover:text-[#4A7057] transition-colors">
                        {event.title}
                      </h3>
                      
                      <p className="text-xs text-dark-text/80 leading-relaxed font-normal">
                        {event.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6 pt-0 border-t border-[#F2F6F2] flex items-center justify-between mt-auto">
                    <span className="text-[9px] text-dark-text/70 font-bold uppercase flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#B58A3D]" strokeWidth={2.5} />
                      {event.location || "Campus Hall"}
                    </span>
                    <a href="/#contact" className="text-[10px] font-extrabold text-[#B58A3D] hover:text-[#4A7057] uppercase tracking-wider transition-colors font-sans">
                      Join Event
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-xs text-dark-text/60 font-bold uppercase tracking-widest bg-white rounded-2xl border border-light-sage/20">
              🌱 No scheduled events at the moment. Please check back later!
            </div>
          )}
        </section>
      )}

    </div>
  );
}
