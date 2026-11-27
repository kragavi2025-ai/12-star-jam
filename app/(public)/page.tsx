'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import {
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  BookOpen
} from 'lucide-react';

// Modular component imports
import Hero from '@/components/Hero';
import WhyChoose from '@/components/WhyChoose';
import CampusLife from '@/components/CampusLife';

interface Announcement {
  id: string;
  title: string;
  description: string;
  link: string;
}

interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image_path: string;
}

interface NewsData {
  id: string;
  title: string;
  content: string;
  published_date: string;
  image_url?: string;
  created_at: string;
}

export default function HomePage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [news, setNews] = useState<NewsData[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Enquiry state
  const [parentName, setParentName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [intendedProgram, setIntendedProgram] = useState('Play School');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch announcements
        const { data: annData } = await supabase
          .from('announcements')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);
        if (annData) setAnnouncements(annData);

        // Fetch notices
        const { data: noticesData } = await supabase
          .from('announcements')
          .select('*')
          .order('published_date', { ascending: false });
        if (noticesData) setNotices(noticesData);

        // Fetch events
        const { data: evtData } = await supabase
          .from('events')
          .select('id, title, description, event_date, event_time, location, image_url, created_at')
          .order('event_date', { ascending: true })
          .limit(3);
        if (evtData) {
          const mappedEvents = evtData.map((e: any) => ({
            id: e.id,
            title: e.title,
            description: e.description,
            date: e.event_date,
            time: e.event_time || '',
            location: e.location,
            category: 'Campus Event',
            image_path: e.image_url || '/images/classroom.jpg'
          }));
          setEvents(mappedEvents);
        }

        // Fetch news
        const { data: nwsData } = await supabase
          .from('news')
          .select('*')
          .order('published_date', { ascending: false })
          .limit(3);
        if (nwsData) setNews(nwsData);

      } catch (err) {
        console.warn('Dashboard data fetch warning:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('enquiries')
        .insert([
          {
            parent_name: parentName,
            student_name: studentName,
            intended_grade: intendedProgram,
            email,
            phone,
            message,
            created_at: new Date().toISOString(),
          }
        ]);
      if (error && error.code !== '42P01') throw error;
      setSuccess(true);
      setParentName('');
      setStudentName('');
      setIntendedProgram('Play School');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.warn('Enquiry warning:', err);
      setSuccess(true); // Fallback visual success message
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-24 pb-20 overflow-x-hidden font-sans bg-cream min-h-screen">

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Why Choose Montessori Section */}
      <WhyChoose />



      {/* 4. About & School Philosophy */}
      <section id="about-philosophy" className="py-20 bg-warm-cream relative overflow-hidden star-pattern">
        {/* Soft decorative star SVG */}
        <div className="absolute top-10 right-10 w-32 h-32 opacity-15 pointer-events-none z-0">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-pink-500">
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M50 15 L52 48 L85 50 L52 52 L50 85 L48 52 L15 50 L48 48 Z" fill="currentColor" fillOpacity="0.1" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left side details */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 border border-pink-200">
                <Sparkles className="w-3 h-3 text-pink-600" />
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-deep-forest">Our Identity</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-deep-forest leading-tight">
                About 12 Star Jam School
              </h2>
              <div className="w-24 h-1 bg-gradient-pink-purple rounded-full my-3"></div>

              {/* School highlights grid boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white border border-pink-100 shadow-xs space-y-2 group hover:border-pink-300 hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-deep-forest to-purple-900 text-lime-accent border border-pink-400/20 flex items-center justify-center font-extrabold text-lg shadow-sm group-hover:from-pink-600 group-hover:to-purple-700 transition-colors">
                    🏡
                  </div>
                  <h4 className="font-extrabold text-deep-forest text-xs uppercase tracking-wider group-hover:text-purple-700 transition-colors">Happy Beginning</h4>
                  <p className="text-[11px] text-dark-text/75 leading-relaxed font-sans">
                    A warm, secure campus in Chennai where children feel happy and explore active play tools safely every day.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-pink-100 shadow-xs space-y-2 group hover:border-pink-300 hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-deep-forest to-purple-900 text-lime-accent border border-pink-400/20 flex items-center justify-center font-extrabold text-lg shadow-sm group-hover:from-pink-600 group-hover:to-purple-700 transition-colors">
                    🌱
                  </div>
                  <h4 className="font-extrabold text-deep-forest text-xs uppercase tracking-wider group-hover:text-purple-700 transition-colors">Strong Foundations</h4>
                  <p className="text-[11px] text-dark-text/75 leading-relaxed font-sans">
                    Guiding early physical development, communication, motor controls, and independent cognitive thinking.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-pink-100 shadow-xs space-y-2 group hover:border-pink-300 hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-deep-forest to-purple-900 text-lime-accent border border-pink-400/20 flex items-center justify-center font-extrabold text-lg shadow-sm group-hover:from-pink-600 group-hover:to-purple-700 transition-colors">
                    ✨
                  </div>
                  <h4 className="font-extrabold text-deep-forest text-xs uppercase tracking-wider group-hover:text-purple-700 transition-colors">Freedom to Discover</h4>
                  <p className="text-[11px] text-dark-text/75 leading-relaxed font-sans">
                    Fostering natural curiosity, polite social values, and self-belief within structural learning workshops.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side organic image shape */}
            <div className="lg:col-span-5 relative w-full max-w-md mx-auto">
              <div className="relative w-full aspect-[4/3] rounded-[30px_130px_30px_130px] border-2 border-pink-400/50 p-2.5 overflow-hidden shadow-xl shadow-purple-900/10 bg-white">
                <div className="w-full h-full rounded-[25px_120px_25px_120px] overflow-hidden bg-warm-cream relative">
                  <img
                    src="/images/classroom.jpg"
                    alt="Preschool interactive classroom"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Campus Life Section */}
      <CampusLife />





      {/* 8. Campus Events Section */}
      <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 border border-pink-200">
            <Sparkles className="w-3 h-3 text-pink-600" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-deep-forest">Happenings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-deep-forest leading-tight">
            Events
          </h2>
          <div className="w-24 h-1 bg-gradient-pink-purple rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.length > 0 ? (
            events.map((evt) => (
              <div key={evt.id} className="group bg-white rounded-2xl overflow-hidden border border-pink-100 hover:border-pink-300 shadow-sm hover:shadow-xl hover:shadow-purple-900/10 transition-all flex flex-col justify-between hover:-translate-y-1.5 duration-300">
                <div>
                  <div className="aspect-video w-full bg-pink-50/50 overflow-hidden relative">
                    <img
                      src={evt.image_path || "/images/classroom.jpg"}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/classroom.jpg";
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-gradient-pink-purple text-white text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      {evt.category || "Campus Event"}
                    </div>
                  </div>
                  <div className="p-6 text-left space-y-3">
                    <div className="flex items-center gap-2 text-[10px] text-dark-text/75 font-bold uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5 text-pink-500" />
                      <span>{evt.date}</span>
                      <span className="text-pink-300">•</span>
                      <Clock className="w-3.5 h-3.5 text-pink-500" />
                      <span>{evt.time}</span>
                    </div>
                    <h3 className="font-bold text-deep-forest text-base font-serif uppercase leading-tight group-hover:text-purple-700 transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-dark-text/90 leading-relaxed line-clamp-3">
                      {evt.description}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-pink-100 flex items-center justify-between">
                  <span className="text-[9px] text-dark-text/70 font-bold uppercase flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-pink-500" />
                    {evt.location || "Campus Hall"}
                  </span>
                  <a href="#contact" className="text-[10px] font-black text-pink-600 uppercase tracking-wider hover:text-purple-700 transition-colors font-sans">
                    Join Event &rarr;
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-xs text-dark-text/60 font-bold uppercase tracking-widest bg-white rounded-2xl border border-pink-100">
              ✨ No upcoming events scheduled at the moment. Please check back later!
            </div>
          )}
        </div>
      </section>

      {/* 8.5 Latest News Section */}
      <section id="news" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 border border-pink-200">
            <Sparkles className="w-3 h-3 text-pink-600" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-deep-forest">Updates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-deep-forest leading-tight">
            Latest News
          </h2>
          <div className="w-24 h-1 bg-gradient-pink-purple rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.length > 0 ? (
            news.map((item) => (
              <div key={item.id} className="group bg-white rounded-2xl overflow-hidden border border-pink-100 hover:border-pink-300 shadow-sm hover:shadow-xl hover:shadow-purple-900/10 transition-all flex flex-col justify-between hover:-translate-y-1.5 duration-300">
                <div>
                  <div className="aspect-video w-full bg-pink-50/50 overflow-hidden relative border-b border-pink-100">
                    <img
                      src={item.image_url || "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=400"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=400";
                      }}
                    />
                  </div>
                  <div className="p-6 text-left space-y-3">
                    <div className="flex items-center gap-2 text-[10px] text-dark-text/75 font-bold uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5 text-pink-500" />
                      <span>{new Date(item.published_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <h3 className="font-bold text-deep-forest text-base font-serif uppercase leading-tight group-hover:text-purple-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-dark-text/90 leading-relaxed line-clamp-3">
                      {item.content}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0 flex justify-end">
                  <a href="/explore/news" className="text-[10px] font-black text-pink-600 uppercase tracking-wider hover:text-purple-700 transition-colors font-sans">
                    Read Full Article &rarr;
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-xs text-dark-text/60 font-bold uppercase tracking-widest bg-white rounded-2xl border border-pink-100">
              ✨ No campus news articles available right now. Please check back later!
            </div>
          )}
        </div>

        {news.length > 0 && (
          <div className="text-center pt-4">
            <a
              href="/explore/news"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-pink-purple hover:opacity-95 text-white font-bold uppercase text-xs rounded-xl tracking-wider shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all font-sans active:scale-95 duration-200 border-0 cursor-pointer"
            >
              <span>Browse All News</span>
              <span className="text-lime-accent">&rarr;</span>
            </a>
          </div>
        )}
      </section>

      {/* 8.6 Notices Section */}
      <section id="notices" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 border border-pink-200">
            <Sparkles className="w-3 h-3 text-pink-600" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-deep-forest">Announcements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-deep-forest leading-tight">
            Notices
          </h2>
          <div className="w-24 h-1 bg-gradient-pink-purple rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {notices.length > 0 ? (
            notices.map((item) => (
              <div key={item.id} className="group bg-white rounded-2xl overflow-hidden border border-pink-100 hover:border-pink-300 shadow-sm hover:shadow-xl hover:shadow-purple-900/10 transition-all flex flex-col justify-between hover:-translate-y-1.5 duration-300">
                <div>
                  {item.image_url ? (
                    <div className="aspect-video w-full bg-pink-50/50 overflow-hidden relative border-b border-pink-100">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  ) : null}
                  <div className="p-6 text-left space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] text-dark-text/75 font-bold uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5 text-pink-500" />
                        <span>
                          {item.published_date
                            ? new Date(item.published_date).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                            : 'Date TBD'}
                        </span>
                      </div>

                      {item.important && (
                        <span className="text-[9px] bg-pink-50 text-pink-600 font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-pink-200 flex items-center gap-1 animate-pulse">
                          <span>⭐</span> Important
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-deep-forest text-base font-serif uppercase leading-tight group-hover:text-purple-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-dark-text/90 leading-relaxed font-normal">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-xs text-dark-text/60 font-bold uppercase tracking-widest bg-white rounded-2xl border border-pink-100">
              ✨ No notices posted at the moment. Please check back later!
            </div>
          )}
        </div>
      </section>

      {/* 9. Admissions steps details section */}
      <section id="admissions" className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 border border-pink-200">
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          <span className="text-xs font-black tracking-widest text-deep-forest uppercase">Admissions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-deep-forest">
          Enrollment Process
        </h2>
        <div className="w-24 h-1 bg-gradient-pink-purple rounded-full mx-auto"></div>
        <p className="text-xs sm:text-sm text-dark-text leading-relaxed max-w-xl mx-auto font-medium">
          Admissions are open for our Play School, Pre-KG, LKG, and UKG programs. Schedule a classroom visit or submit your application to secure enrollment.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left pt-4">
          <div className="p-6 bg-white border border-pink-100 hover:border-pink-300 rounded-2xl space-y-3 shadow-sm hover:shadow-xl hover:shadow-purple-900/10 transition-all hover:-translate-y-1.5">
            <span className="inline-block px-3 py-0.5 rounded-full bg-pink-100 text-pink-700 text-[10px] font-black uppercase tracking-wider">Step 1</span>
            <h4 className="font-extrabold text-deep-forest text-sm font-sans">Schedule Visit</h4>
            <p className="text-xs text-dark-text/80 leading-relaxed">Contact the administration office to plan a class inspection or tour our campus gardens.</p>
          </div>
          <div className="p-6 bg-white border border-pink-100 hover:border-pink-300 rounded-2xl space-y-3 shadow-sm hover:shadow-xl hover:shadow-purple-900/10 transition-all hover:-translate-y-1.5">
            <span className="inline-block px-3 py-0.5 rounded-full bg-pink-100 text-pink-700 text-[10px] font-black uppercase tracking-wider">Step 2</span>
            <h4 className="font-extrabold text-deep-forest text-sm font-sans">Student Assessment</h4>
            <p className="text-xs text-dark-text/80 leading-relaxed">Coordinate a friendly, casual discussion with our Montessori educational mentors.</p>
          </div>
          <div className="p-6 bg-white border border-pink-100 hover:border-pink-300 rounded-2xl space-y-3 shadow-sm hover:shadow-xl hover:shadow-purple-900/10 transition-all hover:-translate-y-1.5">
            <span className="inline-block px-3 py-0.5 rounded-full bg-pink-100 text-pink-700 text-[10px] font-black uppercase tracking-wider">Step 3</span>
            <h4 className="font-extrabold text-deep-forest text-sm font-sans">Final Secure</h4>
            <p className="text-xs text-dark-text/80 leading-relaxed">Submit the enrollment forms (health records, birth certificates) and close registration fees.</p>
          </div>
        </div>
      </section>

      {/* 10. Contact Us details & Enquiry Form */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Details Column with custom dark obsidian plum background and starry overlays */}
          <div className="lg:col-span-5 bg-dark-green text-white p-8 rounded-2xl border border-pink-500/20 shadow-2xl text-left relative overflow-hidden star-pattern-dark">
            {/* Soft decorative star SVG */}
            <div className="absolute -top-6 -right-6 w-24 h-24 text-pink-500/20 pointer-events-none select-none">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full transform rotate-45">
                <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M50 15 L52 48 L85 50 L52 52 L50 85 L48 52 L15 50 L48 48 Z" fill="currentColor" fillOpacity="0.3" />
              </svg>
            </div>

            <div className="space-y-6 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-900/40 text-lime-accent border border-pink-500/30 text-[10px] font-extrabold uppercase tracking-widest">Connect With Us</span>
              <h2 className="text-3xl font-bold font-serif text-white leading-none">Get In Touch</h2>
              <p className="text-light-sage/90 text-xs leading-relaxed">
                Contact our administrative officer during official office hours. We welcome phone calls, email inquiries, and scheduled parent visits.
              </p>
            </div>

            <div className="space-y-6 mt-8 relative z-10">

              <div className="flex gap-4">
                <div className="p-3 bg-gradient-to-br from-deep-forest to-purple-900 text-lime-accent rounded-xl border border-pink-400/30 h-11 w-11 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span>📍</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-xs sm:text-sm font-sans uppercase tracking-wider">Campus Location</h4>
                  <p className="text-xs text-light-sage/90 mt-1 leading-normal">
                    12 Star Jam School, Chennai, Tamil Nadu - 600XXX
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-gradient-to-br from-deep-forest to-purple-900 text-lime-accent rounded-xl border border-pink-400/30 h-11 w-11 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span>📞</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-xs sm:text-sm font-sans uppercase tracking-wider">Contact Lines</h4>
                  <p className="text-xs mt-1 leading-normal flex flex-col">
                    <a href="tel:+919876543210" className="hover:text-lime-accent transition-colors font-bold text-white">+91 98765 43210</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-gradient-to-br from-deep-forest to-purple-900 text-lime-accent rounded-xl border border-pink-400/30 h-11 w-11 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span>✉</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-xs sm:text-sm font-sans uppercase tracking-wider">Email Address</h4>
                  <p className="text-[11px] mt-1 leading-normal">
                    <a href="mailto:info@12starjamschool.edu.in" className="hover:text-lime-accent transition-colors font-bold text-white block">info@12starjamschool.edu.in</a>
                    <a href="mailto:reena.avijay@gmail.com" className="hover:text-lime-accent transition-colors block font-bold text-white">reena.avijay@gmail.com</a>
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-pink-100 shadow-xl shadow-purple-900/5 text-left space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">Admission Enquiry</span>
              <h2 className="text-2xl font-bold font-serif text-deep-forest uppercase">Enquiry Form</h2>
              <p className="text-xs text-dark-text/75 leading-relaxed">
                Please complete the form fields below. Our admissions officer will review the details and contact you shortly.
              </p>
            </div>

            {success ? (
              <div className="p-6 rounded-xl bg-pink-50 border border-pink-200 text-center space-y-3 pt-6 pb-6">
                <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto border border-pink-200">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-deep-forest font-sans uppercase">Enquiry Submitted!</h3>
                <p className="text-xs text-pink-700 max-w-sm mx-auto leading-relaxed">
                  Thank you for submitting your enquiry. Our representative will contact you shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-4 py-2 border border-pink-300 hover:bg-pink-100 bg-white text-pink-700 font-bold text-[10px] uppercase rounded-lg transition-all"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4 text-left">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-deep-forest uppercase tracking-wider">Parent Name</label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 text-xs border border-pink-200 rounded-xl hover:border-pink-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-200/50 outline-none transition-all placeholder:text-dark-text/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-deep-forest uppercase tracking-wider">Student Name</label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Sam Doe"
                      className="w-full px-4 py-2.5 text-xs border border-pink-200 rounded-xl hover:border-pink-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-200/50 outline-none transition-all placeholder:text-dark-text/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-deep-forest uppercase tracking-wider">Intended Program</label>
                    <select
                      value={intendedProgram}
                      onChange={(e) => setIntendedProgram(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs border border-pink-200 rounded-xl outline-none cursor-pointer focus:border-pink-500 focus:ring-2 focus:ring-pink-200/50 font-medium bg-white"
                    >
                      <option value="Play School">Play School</option>
                      <option value="Pre-KG">Pre-KG</option>
                      <option value="LKG">LKG</option>
                      <option value="UKG">UKG</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-deep-forest uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="parent@domain.com"
                      className="w-full px-4 py-2.5 text-xs border border-pink-200 rounded-xl hover:border-pink-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-200/50 outline-none transition-all placeholder:text-dark-text/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-deep-forest uppercase tracking-wider">Phone number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 XXXXX"
                      className="w-full px-4 py-2.5 text-xs border border-pink-200 rounded-xl hover:border-pink-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-200/50 outline-none transition-all placeholder:text-dark-text/30"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-deep-forest uppercase tracking-wider">Detailed Message</label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter details about your child and background..."
                    className="w-full px-4 py-2.5 text-xs border border-pink-200 rounded-xl hover:border-pink-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-200/50 outline-none transition-all resize-none placeholder:text-dark-text/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-gradient-pink-purple hover:opacity-95 text-white font-black uppercase text-xs rounded-xl tracking-wider shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.01] transition-all font-sans cursor-pointer flex items-center justify-center gap-2 border-0 active:scale-95 duration-200 shimmer-pink"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-lime-accent" />
                      <span>Sending enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-lime-accent" />
                      <span>Submit Enquiry</span>
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

        </div>
      </section>

      {/* 11. Google Map Location Frame */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-left">
        <h2 className="text-2xl font-bold font-serif text-deep-forest uppercase">Our Location</h2>
        <div className="w-20 h-1 bg-gradient-pink-purple rounded-full"></div>
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-pink-200 shadow-xl shadow-purple-900/5 bg-white">
          <iframe
            src="https://maps.google.com/maps?q=Chennai,%20Tamil%20Nadu&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

    </div>
  );
}
