import { createClient } from '@supabase/supabase-js';
import { SchoolEvent, SchoolNews, SchoolAnnouncement } from '../types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = !!(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' && 
  !supabaseUrl.includes('your-project-id')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ==========================================
// DEMO / MOCK DATA FOR LOCAL FALLBACK
// ==========================================

const INITIAL_EVENTS: SchoolEvent[] = [
  {
    id: 'e1',
    title: 'Annual Science & Innovation Exhibition',
    description: 'A stellar showcase of science projects, experiments, and creative inventions developed by our Grade 1 to 5 students. Parents and visitors are invited to encourage our young innovators.',
    date: '2026-09-12',
    time: '09:00 AM - 01:00 PM',
    location: 'School Assembly Hall & Science Room',
    category: 'Academics',
    image_path: '/images/academics/science.jpeg',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'e2',
    title: 'Grade 1-5 Track & Field Meets',
    description: 'A day filled with athletics, team spirit, and high energy sports events. Students from all grades participate in running, relay, and long jump competitions.',
    date: '2026-10-05',
    time: '08:30 AM - 03:30 PM',
    location: '12 JAM Playing Field',
    category: 'Sports',
    image_path: '/images/activities/sports.jpeg',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'e3',
    title: 'Arts & Cultural Music Fest',
    description: 'Our annual arts and music exhibition highlighting students\' talents in classical vocal melody, instruments, sketching, oil painting, and paper craft work.',
    date: '2026-11-20',
    time: '04:00 PM - 07:00 PM',
    location: 'Open-Air Amphitheatre',
    category: 'Arts',
    image_path: '/images/activities/arts.jpeg',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const INITIAL_NEWS: SchoolNews[] = [
  {
    id: 'n1',
    title: 'Exploring Chennai\'s Rich Heritage: Educational Field Walk',
    summary: 'Grade 4 and Grade 5 students embarked on a curated educational walk around historic Fort St. George and Museum in Chennai.',
    description: 'To supplement their social studies and history learning module, our senior primary classes visited the historical landmarks of Chennai. Guided by local history experts, the kids explored the Fort St. George museum, noting architecture, early records, and artifacts. This field experience fosters a love for heritage preservation and helps connect classroom learning to local city history.',
    date: '2026-08-10',
    category: 'Academics',
    image_path: '/images/school/heritage-trip.jpeg',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'n2',
    title: 'Upgraded Tech Corner: Unveiling Digital Innovation Commons',
    summary: '12 JAM SCHOOL opens its new digital design space equipped with child-friendly coding tablets and science discovery blocks.',
    description: 'As part of our commitment to technology and innovation, we have renovated our computer lab into a Digital Innovation Commons. Here, students in Grade 3-5 work on basic visual scratch programming, and younger grades explore STEM toys. Our library has also received digital audio-book corners to assist in interactive reading sessions.',
    date: '2026-08-01',
    category: 'Facilities',
    image_path: '/images/facilities/tech-lab.jpeg',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'n3',
    title: '12 JAM Library Launches "Stories on Wheels" Reading Challenge',
    summary: 'A new school initiative to promote reading habits with students earning stars for every classic catalog item completed.',
    description: 'The school library has rolled out the "Stories on Wheels" campaign! We have established portable bookshelves that travel to grade lockers, enabling kids to pick short works during break intervals. A star-chart has been placed in the classrooms where Grade 1-5 students plot their reading stars. The library aims to encourage reading 50 pages a week outside classroom texts.',
    date: '2026-07-28',
    category: 'Student Life',
    image_path: '/images/facilities/library.jpeg',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const INITIAL_ANNOUNCEMENTS: SchoolAnnouncement[] = [
  {
    id: 'a1',
    title: 'Admissions Open for Academic Session 2026-27',
    description: 'Limited spaces are available in Grades 1 to 5. Visit the Admissions desk or submit your enquiry form online for personalized tours.',
    date: '2026-08-15',
    link: '/admissions',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'a2',
    title: 'First Term Parent-Teacher Advisory Meet',
    description: 'The first term Parent-Teacher consultation is scheduled for September 15. Scheduling slots will be shared on student diaries by our faculty.',
    date: '2026-09-01',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'a3',
    title: 'Inter-House Chess Competition Finals',
    description: 'The final matches for Grade 4 and 5 chess tournament will be conducted in the library room during the clubs hour this Friday.',
    date: '2026-08-20',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Helper to get local data or initialize it
function getLocalItem<T>(key: string, defaultValue: T[]): T[] {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Error fetching local storage key ' + key, e);
    return defaultValue;
  }
}

function setLocalItem<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving local storage key ' + key, e);
  }
}

// ==========================================
// DB SERVICE ACTIONS
// ==========================================

export const dbService = {
  // --- EVENTS ---
  async getEvents(includeDrafts = false): Promise<SchoolEvent[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('events').select('*').order('event_date', { ascending: true });
        const { data, error } = await query;
        if (error) throw error;
        return (data || []).map((dbItem: any) => ({
          id: dbItem.id,
          title: dbItem.title,
          description: dbItem.description,
          date: dbItem.event_date || '',
          time: dbItem.event_time || '',
          location: dbItem.location || '',
          category: 'General',
          image_path: dbItem.image_url || '/images/events/default-event.jpg',
          status: 'published' as const,
          created_at: dbItem.created_at || '',
          updated_at: dbItem.created_at || ''
        }));
      } catch (e) {
        console.error('Supabase query error, falling back to local storage', e);
      }
    }
    const events = getLocalItem<SchoolEvent>('jam_events', INITIAL_EVENTS);
    return includeDrafts ? events : events.filter(e => e.status === 'published');
  },

  async createEvent(event: Omit<SchoolEvent, 'id' | 'created_at' | 'updated_at'>): Promise<SchoolEvent> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('events')
          .insert([{
            title: event.title,
            description: event.description,
            event_date: event.date,
            event_time: event.time,
            location: event.location,
            image_url: event.image_path
          }])
          .select()
          .single();
        if (error) throw error;
        return {
          id: data.id,
          title: data.title,
          description: data.description,
          date: data.event_date || '',
          time: data.event_time || '',
          location: data.location || '',
          category: 'General',
          image_path: data.image_url || '',
          status: 'published',
          created_at: data.created_at || '',
          updated_at: data.created_at || ''
        };
      } catch (e) {
        console.error('Supabase insert error, falling back to local storage', e);
      }
    }
    const events = getLocalItem<SchoolEvent>('jam_events', INITIAL_EVENTS);
    const newEvent: SchoolEvent = {
      ...event,
      id: 'e_' + Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    events.push(newEvent);
    setLocalItem('jam_events', events);
    return newEvent;
  },

  async updateEvent(id: string, updates: Partial<Omit<SchoolEvent, 'id' | 'created_at' | 'updated_at'>>): Promise<SchoolEvent> {
    if (isSupabaseConfigured && supabase) {
      try {
        const mappedUpdates: any = {};
        if (updates.title !== undefined) mappedUpdates.title = updates.title;
        if (updates.description !== undefined) mappedUpdates.description = updates.description;
        if (updates.date !== undefined) mappedUpdates.event_date = updates.date;
        if (updates.time !== undefined) mappedUpdates.event_time = updates.time;
        if (updates.location !== undefined) mappedUpdates.location = updates.location;
        if (updates.image_path !== undefined) mappedUpdates.image_url = updates.image_path;

        const { data, error } = await supabase
          .from('events')
          .update(mappedUpdates)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return {
          id: data.id,
          title: data.title,
          description: data.description,
          date: data.event_date || '',
          time: data.event_time || '',
          location: data.location || '',
          category: 'General',
          image_path: data.image_url || '',
          status: 'published',
          created_at: data.created_at || '',
          updated_at: data.created_at || ''
        };
      } catch (e) {
        console.error('Supabase update error, falling back to local storage', e);
      }
    }
    const events = getLocalItem<SchoolEvent>('jam_events', INITIAL_EVENTS);
    const index = events.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Event not found');
    const updated: SchoolEvent = {
      ...events[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    events[index] = updated;
    setLocalItem('jam_events', events);
    return updated;
  },

  async deleteEvent(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('events').delete().eq('id', id);
        if (error) throw error;
        return true;
      } catch (e) {
        console.error('Supabase delete error, falling back to local storage', e);
      }
    }
    const events = getLocalItem<SchoolEvent>('jam_events', INITIAL_EVENTS);
    const filtered = events.filter(e => e.id !== id);
    setLocalItem('jam_events', filtered);
    return true;
  },

  // --- NEWS ---
  async getNews(includeDrafts = false): Promise<SchoolNews[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('news').select('*').order('date', { ascending: false });
        if (!includeDrafts) {
          query = query.eq('status', 'published');
        }
        const { data, error } = await query;
        if (error) throw error;
        return data as SchoolNews[];
      } catch (e) {
        console.error('Supabase query error, falling back to local storage', e);
      }
    }
    const news = getLocalItem<SchoolNews>('jam_news', INITIAL_NEWS);
    return includeDrafts ? news : news.filter(n => n.status === 'published');
  },

  async createNews(newsItem: Omit<SchoolNews, 'id' | 'created_at' | 'updated_at'>): Promise<SchoolNews> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('news')
          .insert([newsItem])
          .select()
          .single();
        if (error) throw error;
        return data as SchoolNews;
      } catch (e) {
        console.error('Supabase insert error, falling back to local storage', e);
      }
    }
    const news = getLocalItem<SchoolNews>('jam_news', INITIAL_NEWS);
    const newNews: SchoolNews = {
      ...newsItem,
      id: 'n_' + Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    news.push(newNews);
    setLocalItem('jam_news', news);
    return newNews;
  },

  async updateNews(id: string, updates: Partial<Omit<SchoolNews, 'id' | 'created_at' | 'updated_at'>>): Promise<SchoolNews> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('news')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return data as SchoolNews;
      } catch (e) {
        console.error('Supabase update error, falling back to local storage', e);
      }
    }
    const news = getLocalItem<SchoolNews>('jam_news', INITIAL_NEWS);
    const index = news.findIndex(n => n.id === id);
    if (index === -1) throw new Error('News item not found');
    const updated: SchoolNews = {
      ...news[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    news[index] = updated;
    setLocalItem('jam_news', news);
    return updated;
  },

  async deleteNews(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('news').delete().eq('id', id);
        if (error) throw error;
        return true;
      } catch (e) {
        console.error('Supabase delete error, falling back to local storage', e);
      }
    }
    const news = getLocalItem<SchoolNews>('jam_news', INITIAL_NEWS);
    const filtered = news.filter(n => n.id !== id);
    setLocalItem('jam_news', filtered);
    return true;
  },

  // --- ANNOUNCEMENTS ---
  async getAnnouncements(includeDrafts = false): Promise<SchoolAnnouncement[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('announcements').select('*').order('date', { ascending: false });
        if (!includeDrafts) {
          query = query.eq('status', 'published');
        }
        const { data, error } = await query;
        if (error) throw error;
        return data as SchoolAnnouncement[];
      } catch (e) {
        console.error('Supabase query error, falling back to local storage', e);
      }
    }
    const announcements = getLocalItem<SchoolAnnouncement>('jam_announcements', INITIAL_ANNOUNCEMENTS);
    return includeDrafts ? announcements : announcements.filter(a => a.status === 'published');
  },

  async createAnnouncement(ann: Omit<SchoolAnnouncement, 'id' | 'created_at' | 'updated_at'>): Promise<SchoolAnnouncement> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('announcements')
          .insert([ann])
          .select()
          .single();
        if (error) throw error;
        return data as SchoolAnnouncement;
      } catch (e) {
        console.error('Supabase insert error, falling back to local storage', e);
      }
    }
    const announcements = getLocalItem<SchoolAnnouncement>('jam_announcements', INITIAL_ANNOUNCEMENTS);
    const newAnn: SchoolAnnouncement = {
      ...ann,
      id: 'a_' + Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    announcements.push(newAnn);
    setLocalItem('jam_announcements', announcements);
    return newAnn;
  },

  async updateAnnouncement(id: string, updates: Partial<Omit<SchoolAnnouncement, 'id' | 'created_at' | 'updated_at'>>): Promise<SchoolAnnouncement> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('announcements')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return data as SchoolAnnouncement;
      } catch (e) {
        console.error('Supabase update error, falling back to local storage', e);
      }
    }
    const announcements = getLocalItem<SchoolAnnouncement>('jam_announcements', INITIAL_ANNOUNCEMENTS);
    const index = announcements.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Announcement not found');
    const updated: SchoolAnnouncement = {
      ...announcements[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    announcements[index] = updated;
    setLocalItem('jam_announcements', announcements);
    return updated;
  },

  async deleteAnnouncement(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('announcements').delete().eq('id', id);
        if (error) throw error;
        return true;
      } catch (e) {
        console.error('Supabase delete error, falling back to local storage', e);
      }
    }
    const announcements = getLocalItem<SchoolAnnouncement>('jam_announcements', INITIAL_ANNOUNCEMENTS);
    const filtered = announcements.filter(a => a.id !== id);
    setLocalItem('jam_announcements', filtered);
    return true;
  }
};
