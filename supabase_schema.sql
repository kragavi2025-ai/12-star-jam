-- Database Schema for 12 JAM SCHOOL Website

-- 1. Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    image_path TEXT DEFAULT '/images/events/default-event.jpg',
    status TEXT NOT NULL DEFAULT 'draft', -- 'draft' or 'published'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create Policies for events
-- Public: can only read published events
CREATE POLICY "Allow public read-only of published events" ON public.events
    FOR SELECT USING (status = 'published');

-- Admins: can perform all actions
CREATE POLICY "Allow admin full access to events" ON public.events
    ALL USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');


-- 3. CREATE NEWS TABLE
CREATE TABLE IF NOT EXISTS public.news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    category TEXT NOT NULL,
    image_path TEXT DEFAULT '/images/news/default-news.jpg',
    status TEXT NOT NULL DEFAULT 'draft', -- 'draft' or 'published'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for news
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Create Policies for news
-- Public: can only read published news
CREATE POLICY "Allow public read-only of published news" ON public.news
    FOR SELECT USING (status = 'published');

-- Admins: can perform all actions
CREATE POLICY "Allow admin full access to news" ON public.news
    ALL USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');


-- 4. CREATE ANNOUNCEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    link TEXT,
    status TEXT NOT NULL DEFAULT 'draft', -- 'draft' or 'published'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for announcements
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Create Policies for announcements
-- Public: can only read published announcements
CREATE POLICY "Allow public read-only of published announcements" ON public.announcements
    FOR SELECT USING (status = 'published');

-- Admins: can perform all actions
CREATE POLICY "Allow admin full access to announcements" ON public.announcements
    ALL USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- 5. FUNCTION TO UPDATE UPDATED_AT TIMESTAMP
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for automatic updated_at updates
CREATE TRIGGER trigger_update_events_updated_at
    BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_update_news_updated_at
    BEFORE UPDATE ON public.news
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_update_announcements_updated_at
    BEFORE UPDATE ON public.announcements
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
