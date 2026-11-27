'use client';

import React from 'react';
import { Mail, GraduationCap } from 'lucide-react';

interface FacultyMember {
  name: string;
  role: string;
  bio: string;
  credentials: string;
  email: string;
  image: string;
}

const mockFaculty: FacultyMember[] = [
  {
    name: '[Principal Name]',
    role: 'Principal & Head of School',
    bio: 'Responsible for general academic direction, Trichy campus operations, and regulatory checkpoints.',
    credentials: 'Master of Education (M.Ed.)',
    email: 'principal@12jamschool.edu.in',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=350',
  },
  {
    name: '[Lead Tutor Name 1]',
    role: 'Grade 1-2 Lead Coordinator',
    bio: 'Focuses on early childhood literacy milestones, phonetics, and motor skill tracking.',
    credentials: 'Bachelor of Primary Education (B.P.Ed.)',
    email: 'lead.g12@12jamschool.edu.in',
    image: 'https://images.unsplash.com/photo-1580894732444-8fecef2271ff?q=80&w=350',
  },
  {
    name: '[Lead Tutor Name 2]',
    role: 'Grade 3-5 Academic Lead',
    bio: 'Coordinates mathematics logical puzzles, Scratch block programming tracks and science lab panels.',
    credentials: 'B.Sc. in Child Psychology & Education',
    email: 'lead.g35@12jamschool.edu.in',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=350',
  },
  {
    name: '[Sports Coach Name]',
    role: 'Physical Training Coach',
    bio: 'Directs track meets, gross motor play trials, inter-house relays and safety audits.',
    credentials: 'Diploma in Sports Coaching & First Aid',
    email: 'sports@12jamschool.edu.in',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=350',
  }
];

export default function FacultyPage() {
  return (
    <div className="py-16 space-y-20 font-sans">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">The Educators</span>
        <h1 className="text-4xl sm:text-5xl font-black font-outfit uppercase tracking-tight text-slate-900 leading-none">
          Faculty & Staff
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl font-normal">
          Meet the group of professional primary tutors, physical athletic coaches, and administrators directing student learning at 12 JAM SCHOOL, Trichy.
        </p>
      </section>

      {/* Faculty grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockFaculty.map((member, i) => (
            <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-md transition-all text-left space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-205">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=350';
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-805 text-base font-outfit leading-tight">{member.name}</h3>
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wide block">{member.role}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{member.bio}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-200 font-medium leading-none">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>{member.credentials}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-200 font-medium leading-none">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{member.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
