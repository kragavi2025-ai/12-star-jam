export interface SchoolEvent {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "09:00 AM - 01:00 PM"
  location: string;
  category: string;
  image_path: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface SchoolNews {
  id: string;
  title: string;
  summary: string;
  description: string;
  date: string; // YYYY-MM-DD
  category: string;
  image_path: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface SchoolAnnouncement {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  link?: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface EnquiryForm {
  parentName: string;
  studentName: string;
  intendedGrade: string;
  email: string;
  phone: string;
  message: string;
}
