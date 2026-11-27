'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isSupabaseConfigured, supabase } from '@/lib/supabaseClient';
import { dbService } from '@/lib/db';
import { SchoolEvent, SchoolNews, SchoolAnnouncement } from '@/types';
import { Shield, LogOut, Plus, Trash2, Edit3, Calendar, Bell, Newspaper, Image, Loader2 } from 'lucide-react';

type TabType = 'events' | 'news' | 'announcements' | 'gallery';

interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category?: string;
  description?: string;
  created_at: string;
}

const mockGalleryItems: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Grade 1 Math Block study',
    image_url: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=400',
    category: 'Academics',
    description: 'Students learn additions using color blocks.',
    created_at: new Date().toISOString(),
  }
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('events');
  const [loading, setLoading] = useState(true);

  // States for lists
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [news, setNews] = useState<SchoolNews[]>([]);
  const [announcements, setAnnouncements] = useState<SchoolAnnouncement[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  // Create form state
  const [editId, setEditId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  
  // Dynamic fields
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [loc, setLoc] = useState('');
  const [cat, setCat] = useState('');
  const [time, setTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [link, setLink] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('published');
  const [important, setImportant] = useState(false);

  // File upload state for Gallery
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Verify auth on mount via Supabase session
  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window !== 'undefined') {
        if (isSupabaseConfigured && supabase) {
          try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
              router.replace('/admin/login');
            } else {
              setAuthorized(true);
            }
          } catch (err) {
            console.error('Failed to get Supabase session:', err);
            router.replace('/admin/login');
          }
        } else {
          router.replace('/admin/login');
        }
      }
    };
    checkAuth();
  }, [router]);

  // Load active tab data
  useEffect(() => {
    if (!authorized) return;
    setLoading(true);
    setFormOpen(false);
    setEditId(null);

    async function loadData() {
      try {
        if (activeTab === 'events') {
          if (isSupabaseConfigured && supabase) {
            const { data, error } = await supabase
              .from('events')
              .select('*')
              .order('event_date', { ascending: true });

            if (error) throw error;
            const mappedEvents = (data || []).map((dbItem: any) => ({
              id: dbItem.id,
              title: dbItem.title,
              description: dbItem.description || '',
              date: dbItem.event_date || '',
              time: dbItem.event_time || '',
              location: dbItem.location || '',
              category: 'General',
              image_path: dbItem.image_url || '',
              status: 'published' as const,
              created_at: dbItem.created_at || '',
              updated_at: dbItem.created_at || ''
            }));
            setEvents(mappedEvents);
          } else {
            const data = await dbService.getEvents(true);
            setEvents(data);
          }
        } else if (activeTab === 'news') {
          if (isSupabaseConfigured && supabase) {
            const { data, error } = await supabase
              .from('news')
              .select('*')
              .order('published_date', { ascending: false });
            
            if (error) throw error;
            const mappedNews = (data || []).map((dbItem: any) => ({
              id: dbItem.id,
              title: dbItem.title,
              description: dbItem.content || '',
              summary: (dbItem.content || '').substring(0, 100),
              date: dbItem.published_date || '',
              image_path: dbItem.image_url || '',
              category: 'General',
              status: 'published' as const,
              created_at: dbItem.created_at || '',
              updated_at: dbItem.created_at || ''
            }));
            setNews(mappedNews);
          } else {
            const data = await dbService.getNews(true);
            setNews(data);
          }
        } else if (activeTab === 'announcements') {
          if (isSupabaseConfigured && supabase) {
            const { data, error } = await supabase
              .from('announcements')
              .select('*')
              .order('published_date', { ascending: false });

            if (error) throw error;
            const mappedAnn = (data || []).map((dbItem: any) => ({
              id: dbItem.id,
              title: dbItem.title,
              description: dbItem.content || '',
              date: dbItem.published_date || '',
              link: '',
              status: dbItem.important ? 'published' as const : 'draft' as const,
              important: dbItem.important || false,
              image_path: dbItem.image_url || '',
              created_at: dbItem.created_at || '',
              updated_at: dbItem.created_at || ''
            }));
            setAnnouncements(mappedAnn);
          } else {
            const data = await dbService.getAnnouncements(true);
            setAnnouncements(data);
          }
        } else if (activeTab === 'gallery') {
          if (isSupabaseConfigured && supabase) {
            const { data, error } = await supabase
              .from('gallery')
              .select('*')
              .order('created_at', { ascending: false });
            
            if (error) throw error;
            setGallery((data || []) as GalleryItem[]);
          } else {
            if (typeof window !== 'undefined') {
              const stored = localStorage.getItem('jam_gallery');
              if (stored) {
                setGallery(JSON.parse(stored));
              } else {
                localStorage.setItem('jam_gallery', JSON.stringify(mockGalleryItems));
                setGallery(mockGalleryItems);
              }
            }
          }
        }
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [activeTab, authorized]);

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error('Supabase sign out error:', err);
      }
    }
    router.replace('/admin/login');
  };

  const openCreateForm = () => {
    setEditId(null);
    setTitle('');
    setDesc('');
    setDate(new Date().toISOString().split('T')[0]);
    setLoc('');
    setCat(activeTab === 'events' ? 'Academics' : activeTab === 'news' ? 'Academics' : 'Campus');
    setTime(activeTab === 'events' ? '09:00 AM' : '09:00 AM - 01:00 PM');
    setImageUrl('');
    setLink('');
    setStatus('published');
    setImportant(false);
    setImageFile(null);
    setFormError('');
    setFormSuccess('');
    setFormOpen(true);
  };

  const startEdit = (item: any) => {
    setEditId(item.id);
    setTitle(item.title);
    setDesc(item.description || item.content || item.summary || '');
    setDate(item.date || item.published_date || item.publish_date || new Date().toISOString().split('T')[0]);
    setLoc(item.location || '');
    setCat(item.category || '');
    setTime(item.time || (activeTab === 'events' ? '09:00 AM' : '09:00 AM - 01:00 PM'));
    setImageUrl(item.image_path || item.image_url || '');
    setLink(item.link || '');
    setStatus(item.status || 'published');
    setImportant(item.important || false);
    setImageFile(null);
    setFormError('');
    setFormSuccess('');
    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    setLoading(true);

    try {
      if (activeTab === 'events') {
        if (isSupabaseConfigured && supabase) {
          const item = events.find(e => e.id === id);
          if (item && item.image_path) {
            try {
              const parts = item.image_path.split('/school-media/');
              if (parts.length > 1) {
                const storagePath = decodeURIComponent(parts[1]);
                if (storagePath.startsWith('events/')) {
                  await supabase.storage
                    .from('school-media')
                    .remove([storagePath]);
                }
              }
            } catch (storageErr) {
              console.error('Failed to delete storage file:', storageErr);
            }
          }

          const { error: dbError } = await supabase
            .from('events')
            .delete()
            .eq('id', id);

          if (dbError) throw dbError;
          setEvents(events.filter(e => e.id !== id));
        } else {
          await dbService.deleteEvent(id);
          setEvents(events.filter(e => e.id !== id));
        }
      } else if (activeTab === 'news') {
        if (isSupabaseConfigured && supabase) {
          const item = news.find(n => n.id === id);
          if (item && item.image_path) {
            try {
              const parts = item.image_path.split('/school-media/');
              if (parts.length > 1) {
                const storagePath = decodeURIComponent(parts[1]);
                await supabase.storage
                  .from('school-media')
                  .remove([storagePath]);
              }
            } catch (storageErr) {
              console.error('Failed to delete storage file:', storageErr);
            }
          }

          const { error: dbError } = await supabase
            .from('news')
            .delete()
            .eq('id', id);

          if (dbError) throw dbError;
          setNews(news.filter(n => n.id !== id));
        } else {
          await dbService.deleteNews(id);
          setNews(news.filter(n => n.id !== id));
        }
      } else if (activeTab === 'announcements') {
        if (isSupabaseConfigured && supabase) {
          const item = announcements.find(a => a.id === id);
          if (item && (item as any).image_path) {
            try {
              const parts = (item as any).image_path.split('/school-media/');
              if (parts.length > 1) {
                const storagePath = decodeURIComponent(parts[1]);
                if (storagePath.startsWith('announcements/')) {
                  await supabase.storage
                    .from('school-media')
                    .remove([storagePath]);
                }
              }
            } catch (storageErr) {
              console.error('Failed to delete storage file:', storageErr);
            }
          }

          const { error: dbError } = await supabase
            .from('announcements')
            .delete()
            .eq('id', id);

          if (dbError) throw dbError;
          setAnnouncements(announcements.filter(a => a.id !== id));
        } else {
          await dbService.deleteAnnouncement(id);
          setAnnouncements(announcements.filter(a => a.id !== id));
        }
      } else if (activeTab === 'gallery') {
        if (isSupabaseConfigured && supabase) {
          const item = gallery.find(g => g.id === id);
          if (item && item.image_url) {
            try {
              const parts = item.image_url.split('/school-media/');
              if (parts.length > 1) {
                const storagePath = decodeURIComponent(parts[1]);
                await supabase.storage
                  .from('school-media')
                  .remove([storagePath]);
              }
            } catch (storageErr) {
              console.error('Failed to delete storage file:', storageErr);
            }
          }

          const { error: dbError } = await supabase
            .from('gallery')
            .delete()
            .eq('id', id);

          if (dbError) throw dbError;
          setGallery(gallery.filter(g => g.id !== id));
        } else {
          const key = 'jam_gallery';
          const filtered = gallery.filter(g => g.id !== id);
          localStorage.setItem(key, JSON.stringify(filtered));
          setGallery(filtered);
        }
      }
    } catch (err: any) {
      console.error('Delete error:', err);
      alert(err.message || 'Failed to delete record.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError('');
    setFormSuccess('');

    try {
      if (activeTab === 'events') {
        if (!title.trim()) throw new Error('Title is required.');
        if (!desc.trim()) throw new Error('Description is required.');
        if (!date) throw new Error('Event Date is required.');
        if (!time.trim()) throw new Error('Event Time is required.');
        if (!loc.trim()) throw new Error('Location is required.');
        if (!editId && !imageFile) {
          throw new Error('Please select an image file to upload.');
        }

        // Clean time for PostgreSQL TIME type
        let finalTime = time.trim();
        if (finalTime.includes('-')) {
          finalTime = finalTime.split('-')[0].trim();
        }
        // Validate time format: HH:MM or HH:MM:SS with optional AM/PM
        const timePattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?\s*(AM|PM|am|pm)?$/i;
        if (!timePattern.test(finalTime)) {
          throw new Error('Invalid format for Event Time: "' + time + '". Please specify a single time (e.g. "09:00 AM" or "14:30").');
        }

        if (isSupabaseConfigured && supabase) {
          let finalImageUrl = imageUrl;

          if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `events/${fileName}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('school-media')
              .upload(filePath, imageFile, {
                cacheControl: '3600',
                upsert: false
              });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
              .from('school-media')
              .getPublicUrl(filePath);

            finalImageUrl = publicUrl;
          }

          if (editId) {
            if (imageFile && imageUrl) {
              try {
                const parts = imageUrl.split('/school-media/');
                if (parts.length > 1) {
                  const storagePath = decodeURIComponent(parts[1]);
                  if (storagePath.startsWith('events/')) {
                    await supabase.storage
                      .from('school-media')
                      .remove([storagePath]);
                  }
                }
              } catch (storageErr) {
                console.error('Failed to delete old storage file:', storageErr);
              }
            }

            const { error: dbError } = await supabase
              .from('events')
              .update({
                title,
                description: desc,
                event_date: date,
                event_time: finalTime,
                location: loc,
                image_url: finalImageUrl
              })
              .eq('id', editId);

            if (dbError) throw dbError;
          } else {
            const { error: dbError } = await supabase
              .from('events')
              .insert([{
                title,
                description: desc,
                event_date: date,
                event_time: finalTime,
                location: loc,
                image_url: finalImageUrl
              }]);

            if (dbError) throw dbError;
          }
        } else {
          const payload = { title, description: desc, date, time: finalTime, location: loc, category: cat, image_path: imageUrl || '/images/events/default-event.jpg', status };
          if (editId) {
            await dbService.updateEvent(editId, payload);
          } else {
            await dbService.createEvent(payload);
          }
        }
      } else if (activeTab === 'news') {
        if (isSupabaseConfigured && supabase) {
          let finalImageUrl = imageUrl;

          // 1. Validation check
          if (!title.trim()) throw new Error('Title is required.');
          if (!desc.trim()) throw new Error('Content is required.');
          if (!date) throw new Error('Published date is required.');
          if (!editId && !imageFile) {
            throw new Error('Please select an image file to upload.');
          }

          // 2. Upload file if selected
          if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `news/${fileName}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('school-media')
              .upload(filePath, imageFile, {
                cacheControl: '3600',
                upsert: false
              });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
              .from('school-media')
              .getPublicUrl(filePath);

            finalImageUrl = publicUrl;
          }

          if (editId) {
             const { error: dbError } = await supabase
              .from('news')
              .update({
                title,
                content: desc,
                published_date: date,
                image_url: finalImageUrl
              })
              .eq('id', editId);

            if (dbError) throw dbError;
          } else {
             const { error: dbError } = await supabase
              .from('news')
              .insert([{
                title,
                content: desc,
                published_date: date,
                image_url: finalImageUrl
              }]);

            if (dbError) throw dbError;
          }
        } else {
          const payload = { title, summary: desc.substring(0, 100), description: desc, date, category: cat, image_path: imageUrl || '/images/news/default-news.jpg', status };
          if (editId) {
            await dbService.updateNews(editId, payload);
          } else {
            await dbService.createNews(payload);
          }
        }
      } else if (activeTab === 'announcements') {
        if (!title.trim()) throw new Error('Title is required.');
        if (!desc.trim()) throw new Error('Content is required.');
        if (!date) throw new Error('Published Date is required.');

        if (isSupabaseConfigured && supabase) {
          let finalImageUrl = imageUrl;

          if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `announcements/${fileName}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('school-media')
              .upload(filePath, imageFile, {
                cacheControl: '3600',
                upsert: false
              });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
              .from('school-media')
              .getPublicUrl(filePath);

            finalImageUrl = publicUrl;
          }

          if (editId) {
            // Delete old image if a new one is uploaded
            if (imageFile && imageUrl) {
              try {
                const parts = imageUrl.split('/school-media/');
                if (parts.length > 1) {
                  const storagePath = decodeURIComponent(parts[1]);
                  if (storagePath.startsWith('announcements/')) {
                    await supabase.storage
                      .from('school-media')
                      .remove([storagePath]);
                  }
                }
              } catch (storageErr) {
                console.error('Failed to delete old storage file:', storageErr);
              }
            }

            const { error: dbError } = await supabase
              .from('announcements')
              .update({
                title,
                content: desc,
                published_date: date,
                important: important,
                image_url: finalImageUrl
              })
              .eq('id', editId);

            if (dbError) throw dbError;
          } else {
            const { error: dbError } = await supabase
              .from('announcements')
              .insert([{
                title,
                content: desc,
                published_date: date,
                important: important,
                image_url: finalImageUrl
              }]);

            if (dbError) throw dbError;
          }
        } else {
          const payload = { title, description: desc, date, image_path: imageUrl || '/images/default.jpg', link: link || undefined, status: important ? 'published' as const : 'draft' as const };
          if (editId) {
            await dbService.updateAnnouncement(editId, payload);
          } else {
            await dbService.createAnnouncement(payload);
          }
        }
      } else if (activeTab === 'gallery') {
        if (isSupabaseConfigured && supabase) {
          let finalImageUrl = imageUrl;

          // Validate that an image is selected when creating a new gallery item
          if (!editId && !imageFile) {
            throw new Error('Please select an image file to upload.');
          }

          if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `gallery/${fileName}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('school-media')
              .upload(filePath, imageFile, {
                cacheControl: '3600',
                upsert: false
              });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
              .from('school-media')
              .getPublicUrl(filePath);

            finalImageUrl = publicUrl;
          }

          if (editId) {
            const { error: dbError } = await supabase
              .from('gallery')
              .update({
                title,
                description: desc,
                image_url: finalImageUrl
              })
              .eq('id', editId);

            if (dbError) throw dbError;
          } else {
            const { error: dbError } = await supabase
              .from('gallery')
              .insert([{
                title,
                description: desc,
                image_url: finalImageUrl
              }]);

            if (dbError) throw dbError;
          }
        } else {
          const itemsList = [...gallery];
          if (editId) {
            const idx = itemsList.findIndex(g => g.id === editId);
            if (idx !== -1) {
              itemsList[idx] = { ...itemsList[idx], title, image_url: imageUrl || 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=400', category: cat, description: desc };
            }
          } else {
            itemsList.push({
              id: 'g_' + Math.random().toString(36).substr(2, 9),
              title,
              image_url: imageUrl || 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=400',
              category: cat,
              description: desc,
              created_at: new Date().toISOString()
            });
          }
          localStorage.setItem('jam_gallery', JSON.stringify(itemsList));
          setGallery(itemsList);
        }
      }

      setFormSuccess('Saved successfully!');
      
      // Reload current tab items
      setActiveTab(activeTab);

      setTimeout(() => {
        setFormOpen(false);
      }, 800);

    } catch (err: any) {
      console.error('Save error:', err);
      setFormError(err.message || 'An error occurred during save.');
    } finally {
      setLoading(false);
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans text-left flex flex-col md:flex-row pb-12 md:pb-0">
      
      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-8">
          
          {/* Back link */}
          <Link href="/" className="inline-flex items-center text-[10px] font-bold text-slate-400 hover:text-amber-500 transition-colors uppercase tracking-widest leading-none border-b border-slate-800 pb-3 w-full">
            ← Back to Website
          </Link>

          <div className="flex items-center gap-2">
            <div className="p-2 h-10 w-10 bg-amber-500/10 text-amber-550 border border-amber-500/20 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h1 className="font-black text-sm uppercase tracking-tight text-white font-outfit leading-none">Admin Panel</h1>
              <span className="text-[9px] font-bold text-amber-450 tracking-wider uppercase block mt-1">12 JAM SCHOOL</span>
            </div>
          </div>

          <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-0 cursor-pointer transition-all flex-shrink-0 ${
                activeTab === 'events' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Events</span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-0 cursor-pointer transition-all flex-shrink-0 ${
                activeTab === 'news' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>News</span>
            </button>

            <button
              onClick={() => setActiveTab('announcements')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-0 cursor-pointer transition-all flex-shrink-0 ${
                activeTab === 'announcements' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Notices</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-0 cursor-pointer transition-all flex-shrink-0 ${
                activeTab === 'gallery' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>Gallery</span>
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 md:mt-0 px-4 py-2.5 bg-slate-950 hover:bg-red-500/10 hover:text-red-500 border border-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 justify-center cursor-pointer transition-all border-0"
        >
          <LogOut className="w-4 h-4" />
          <span>Disconnect</span>
        </button>
      </aside>

      {/* Main dashboard content */}
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        
        {/* Dash Header */}
        <section className="flex justify-between items-center gap-4 flex-wrap pb-6 border-b border-slate-900">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black font-outfit uppercase tracking-tight">
              Manage {activeTab}
            </h2>
            <p className="text-xs text-slate-500">
              Create, update, or remove {activeTab} listed on the public domain.
            </p>
          </div>
          <button
            onClick={openCreateForm}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer border-0 transition-all font-outfit shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>
              {activeTab === 'events' ? 'Create New Event' : 
               activeTab === 'news' ? 'Create New Article' :
               activeTab === 'announcements' ? '+ Add Notice' :
               `Create New ${activeTab.substring(0, activeTab.length - 1)}`}
            </span>
          </button>
        </section>

        {/* Create / Edit Form Overlay */}
        {formOpen && (
          <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 space-y-6 max-w-2xl">
            <h3 className="font-extrabold text-base font-outfit uppercase text-amber-500">
              {editId ? 'Modify Record' : 'Create Record'} Details
            </h3>

            {formError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-left">
                {formError}
              </div>
            )}
            {formSuccess && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs text-left">
                {formSuccess}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Title Heading</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title text..."
                  className="w-full px-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg outline-none text-white focus:border-amber-500"
                />
              </div>

              {activeTab !== 'gallery' && activeTab !== 'news' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Category / Tag</label>
                  <input
                    type="text"
                    required={activeTab !== 'announcements'}
                    value={cat}
                    onChange={(e) => setCat(e.target.value)}
                    placeholder="e.g. Academics, Sports"
                    className="w-full px-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg outline-none text-white focus:border-amber-500"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {activeTab !== 'gallery' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    {activeTab === 'news' || activeTab === 'announcements' ? 'Published Date' : 'Scheduled Date'}
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg outline-none text-white focus:border-amber-500 cursor-pointer"
                  />
                </div>
              )}

              {activeTab === 'events' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Event Location</label>
                    <input
                      type="text"
                      required
                      value={loc}
                      onChange={(e) => setLoc(e.target.value)}
                      placeholder="School Stadium Hall..."
                      className="w-full px-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg outline-none text-white focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Timings</label>
                    <input
                      type="text"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg outline-none text-white focus:border-amber-500"
                    />
                  </div>
                </>
              )}

              {activeTab === 'announcements' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Optional Link URL</label>
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="/admissions"
                    className="w-full px-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg outline-none text-white focus:border-amber-500"
                  />
                </div>
              )}

              {activeTab === 'gallery' || activeTab === 'news' || activeTab === 'events' || activeTab === 'announcements' ? (
                <div className="space-y-1.5 sm:col-span-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Image File (Choose File / Add File)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                      }
                    }}
                    className="w-full px-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg outline-none text-slate-400 focus:border-amber-500 cursor-pointer"
                  />
                  {editId && <span className="text-[9px] text-slate-500 block mt-0.5">Leave blank to retain existing photo.</span>}

                  {/* Selected Image/Preview Display */}
                  {imageFile ? (
                    <div className="mt-2 w-24 h-24 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                      <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : imageUrl ? (
                    <div className="mt-2 w-24 h-24 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                      <img src={imageUrl} alt="Current entry preview" className="w-full h-full object-cover" />
                    </div>
                  ) : null}
                </div>
              ) : activeTab !== 'announcements' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Image URL path</label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg outline-none text-white focus:border-amber-500"
                  />
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                {activeTab === 'news' ? 'News Content' : 'Long Description Content'}
              </label>
              <textarea
                rows={4}
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={activeTab === 'news' ? 'Type news story content...' : 'Type descriptive summary entries...'}
                className="w-full px-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg outline-none text-white focus:border-amber-500 resize-none font-sans"
              />
            </div>

            <div className="flex justify-between items-center gap-4">
              {activeTab === 'announcements' ? (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="important-checkbox"
                    checked={important}
                    onChange={(e) => setImportant(e.target.checked)}
                    className="w-3.5 h-3.5 bg-slate-950 border border-slate-800 rounded focus:ring-amber-500 text-amber-500 accent-amber-500 cursor-pointer"
                  />
                  <label htmlFor="important-checkbox" className="text-[10px] font-bold text-slate-400 uppercase tracking-wide cursor-pointer select-none">
                    Mark as Important
                  </label>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Publish Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="px-3 py-1 text-xs bg-slate-950 border border-slate-800 text-white rounded outline-none cursor-pointer"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-4 py-2 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-xs uppercase font-extrabold cursor-pointer hover:bg-slate-850 bg-transparent transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs uppercase font-black cursor-pointer border-0 transition-all font-outfit"
                >
                  Save Record
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Data list rows */}
        <section className="space-y-4">
          {loading ? (
            <div className="py-12 flex justify-center text-slate-500 items-center">
              <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            </div>
          ) : (
            <div className="border border-slate-900 bg-slate-900/30 rounded-2xl overflow-hidden">
              
              {/* Event tab rows */}
              {activeTab === 'events' && events.map((item) => (
                <div key={item.id} className="p-5 border-b border-slate-900 flex justify-between items-center gap-6 flex-wrap md:flex-nowrap hover:bg-slate-900/50 transition-colors">
                  <div className="space-y-1.5 flex gap-4 items-start">
                    <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image_path || '/images/events/default-event.jpg'} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm uppercase tracking-wide font-outfit">{item.title}</h4>
                      <p className="text-[11px] text-slate-350 leading-normal max-w-xl">{item.description}</p>
                      <div className="flex flex-wrap gap-4 text-[9px] text-slate-450 uppercase tracking-widest font-bold mt-2">
                        <span className="text-amber-450">Date: {item.date}</span>
                        <span className="text-amber-450">Time: {item.time}</span>
                        <span>Location: {item.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => startEdit(item)} className="px-3 py-1.5 border border-slate-800 hover:border-amber-500 text-slate-400 hover:text-white rounded-lg cursor-pointer bg-slate-900/80 transition-colors flex items-center gap-1.5 border-0">
                      <Edit3 className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Edit</span>
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="px-3 py-1.5 border border-slate-800 hover:border-red-500 text-slate-400 hover:text-white rounded-lg cursor-pointer bg-slate-900/80 transition-colors flex items-center gap-1.5 border-0">
                      <Trash2 className="w-4 h-4 text-red-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-red-550 text-red-500">Delete</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* News tab rows */}
              {activeTab === 'news' && news.map((item) => (
                <div key={item.id} className="p-5 border-b border-slate-900 flex justify-between items-center gap-6 flex-wrap md:flex-nowrap hover:bg-slate-900/50 transition-colors">
                  <div className="space-y-1.5 flex gap-4 items-start">
                    <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-550 rounded-lg flex-shrink-0 mt-0.5">
                      <Newspaper className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm uppercase tracking-wide font-outfit">{item.title}</h4>
                      <p className="text-[11px] text-slate-350 leading-normal max-w-xl">{item.description}</p>
                      <div className="flex flex-wrap gap-4 text-[9px] text-slate-450 uppercase tracking-widest font-bold mt-2">
                        <span className="text-amber-455 text-amber-500">Published Date: {item.date}</span>
                        <span>Category: {item.category}</span>
                        <span>Status: {item.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => startEdit(item)} className="p-2 border border-slate-800 hover:border-amber-500 text-slate-400 hover:text-white rounded-lg cursor-pointer bg-slate-900/80 transition-colors border-0">
                      <Edit3 className="w-4 h-4 text-amber-500" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 border border-slate-800 hover:border-red-500 text-slate-400 hover:text-white rounded-lg cursor-pointer bg-slate-900/80 transition-colors border-0">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Notice tab rows */}
              {activeTab === 'announcements' && announcements.map((item: any) => (
                <div key={item.id} className="p-5 border-b border-slate-900 flex justify-between items-center gap-6 flex-wrap md:flex-nowrap hover:bg-slate-900/50 transition-colors">
                  <div className="space-y-1.5 flex gap-4 items-start">
                    {item.image_path ? (
                      <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image_path} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-550 rounded-lg flex-shrink-0 mt-0.5">
                        <Bell className="w-4 h-4 text-amber-500" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-extrabold text-sm uppercase tracking-wide font-outfit">
                        {item.title}
                        {item.important && <span className="ml-2 text-[9px] bg-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded font-extrabold font-sans">IMPORTANT</span>}
                      </h4>
                      <p className="text-[11px] text-slate-355 leading-normal max-w-xl">{item.description}</p>
                      <div className="flex flex-wrap gap-4 text-[9px] text-slate-450 uppercase tracking-widest font-bold mt-2">
                        <span className="text-amber-450">Published Date: {item.date}</span>
                        <span>Important: {item.important ? "YES" : "NO"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => startEdit(item)} className="px-3 py-1.5 border border-slate-800 hover:border-amber-500 text-slate-400 hover:text-white rounded-lg cursor-pointer bg-slate-900/80 transition-colors flex items-center gap-1.5 border-0">
                      <Edit3 className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Edit</span>
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="px-3 py-1.5 border border-slate-800 hover:border-red-500 text-slate-400 hover:text-white rounded-lg cursor-pointer bg-slate-900/80 transition-colors flex items-center gap-1.5 border-0">
                      <Trash2 className="w-4 h-4 text-red-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-red-550 text-red-500">Delete</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* Gallery elements rows */}
              {activeTab === 'gallery' && gallery.map((item) => (
                <div key={item.id} className="p-5 border-b border-slate-900 flex justify-between items-center gap-6 flex-wrap md:flex-nowrap hover:bg-slate-900/50 transition-colors">
                  <div className="space-y-1.5 flex gap-4 items-start">
                    <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm uppercase tracking-wide font-outfit">{item.title}</h4>
                      <p className="text-[11px] text-slate-350 leading-normal max-w-xl">{item.description || 'No description provided.'}</p>
                      <div className="flex flex-wrap gap-4 text-[9px] text-slate-450 uppercase tracking-widest font-bold mt-2">
                        <span>Category: {item.category || 'Activities'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => startEdit(item)} className="p-2 border border-slate-800 hover:border-amber-500 text-slate-400 hover:text-white rounded-lg cursor-pointer bg-slate-900/80 transition-colors border-0">
                      <Edit3 className="w-4 h-4 text-amber-500" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 border border-slate-800 hover:border-red-500 text-slate-400 hover:text-white rounded-lg cursor-pointer bg-slate-900/80 transition-colors border-0">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Empty state */}
              {((activeTab === 'events' && events.length === 0) ||
                (activeTab === 'news' && news.length === 0) ||
                (activeTab === 'announcements' && announcements.length === 0) ||
                (activeTab === 'gallery' && gallery.length === 0)) && (
                <div className="p-8 text-center text-xs text-slate-600 uppercase tracking-widest font-bold">
                  No records listed yet. Click "Create New" above to save your first record entries.
                </div>
              )}

            </div>
          )}
        </section>

      </main>

    </div>
  );
}
