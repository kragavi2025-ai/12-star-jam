'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, ChevronDown, Facebook, Instagram, Youtube } from 'lucide-react';

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === '/' && href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.replace('/#', '#');
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', targetId);
        setIsOpen(false);
      }
    }
  };

  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    {
      label: 'About Us',
      dropdown: [
        { label: 'About 12 Star', href: '/about' },
        { label: 'Vision & Mission', href: '/about/vision-mission' },
      ],
    },
    {
      label: 'Academics',
      dropdown: [
        { label: 'Academic Overview', href: '/academics' },
        { label: 'Play School', href: '/academics/pre-kg' },
        { label: 'Pre-KG', href: '/academics/lkg' },
        { label: 'LKG', href: '/academics/ukg' },
        { label: 'UKG', href: '/academics/kg-1' },
      ],
    },
    {
      label: 'Admissions',
      dropdown: [
        { label: 'Admissions Process', href: '/admissions/process' },
        { label: 'Admission Enquiry', href: '/admissions/process#enquiry' },
      ],
    },
    {
      label: 'Gallery',
      dropdown: [
        { label: 'Photo Gallery', href: '/explore/gallery' },
        { label: 'School Events', href: '/#events' },
      ],
    },
    { label: 'Contact Us', href: '/contact' },
  ];

  const toggleMobileDropdown = (label: string) => {
    if (activeMobileDropdown === label) {
      setActiveMobileDropdown(null);
    } else {
      setActiveMobileDropdown(label);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans shadow-md">
      {/* 1. Top narrow utility bar in Dark forest green background */}
      <div className="bg-deep-forest text-white text-[11px] font-bold py-2 px-4 border-b border-medium-green/30 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center sm:flex-row flex-col gap-2">
          {/* Leftside note */}
          <div className="hidden md:flex items-center gap-1.5 text-lime-accent">
            <span>⭐</span>
            <span className="tracking-wide">12 Star Jam School — Chennai</span>
          </div>

          {/* Main utility link */}
          <div className="flex gap-5 sm:gap-6 items-center flex-wrap justify-center">
            <a href="tel:+919876543210" className="hover:text-lime-accent transition-colors flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>+91 98765 43210</span>
            </a>
            <a href="mailto:info@12starjamschool.edu.in" className="hover:text-lime-accent transition-colors flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-gold" />
              <span>info@12starjamschool.edu.in</span>
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 items-center">
            <a href="#" className="hover:text-lime-accent transition-colors" aria-label="Facebook">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="hover:text-lime-accent transition-colors" aria-label="Instagram">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="hover:text-lime-accent transition-colors" aria-label="YouTube">
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar - Light warm cream from reference image */}
      <div className={`bg-warm-cream/95 backdrop-blur-md transition-all duration-300 border-b border-light-sage/40 ${scrolled ? 'py-2.5 shadow' : 'py-3.5'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Logo & School Name */}
          <Link href="/" className="flex items-center gap-3.5 group flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="12 Star Jam School Logo"
              className="w-12 h-12 rounded-full object-contain border border-gold/40 shadow-sm"
              onError={(e) => {
                // Fallback to jpeg logo if png is not loaded yet
                (e.target as HTMLImageElement).src = '/images/logo/logo.jpeg';
              }}
            />
            <div className="flex flex-col text-left">
              <span className="text-base sm:text-lg font-black tracking-tight text-deep-forest font-serif uppercase leading-none group-hover:text-medium-green transition-colors">
                12 Star
              </span>
              <span className="text-[10px] text-dark-text font-bold uppercase tracking-wider mt-0.5 leading-none">
                Jam School
              </span>
              <span className="text-[9px] text-gold font-bold tracking-widest uppercase mt-0.5 leading-none">
                Chennai
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 mr-2">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group/dropdown py-2"
              >
                {item.dropdown ? (
                  <>
                    <button className="px-2.5 py-1.5 text-[11px] xl:text-[12px] font-extrabold uppercase tracking-wider text-dark-text hover:text-deep-forest flex items-center gap-1.5 focus:outline-none cursor-pointer">
                      <span>{item.label}</span>
                      <ChevronDown className="w-3 h-3 text-medium-green transition-transform duration-200 group-hover/dropdown:rotate-180" />
                    </button>

                    {/* Desktop Dropdown - Dark Green Background, White Text, Lime/Gold Accents, Contrast-Safe */}
                    <div className="absolute left-0 mt-2 w-56 rounded-xl bg-dark-green border border-medium-green/50 shadow-2xl opacity-0 invisible translate-y-2 group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
                      <div className="py-2 flex flex-col">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            onClick={(e) => subItem.href.startsWith('/#') && handleScrollTo(e as any, subItem.href)}
                            className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white hover:text-lime-accent hover:bg-deep-forest transition-colors block text-left"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href || '#'}
                    onClick={(e) => item.href?.startsWith('/#') && handleScrollTo(e, item.href)}
                    className="px-2.5 py-1.5 text-[11px] xl:text-[12px] font-extrabold uppercase tracking-wider text-dark-text hover:text-deep-forest transition-colors block"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3.5 flex-shrink-0">
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-deep-forest border border-deep-forest hover:bg-deep-forest hover:text-white transition-all shadow-sm active:scale-95 duration-200"
            >
              Admin Login
            </Link>
            <Link
              href="/admissions/process"
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white bg-gradient-pink-purple hover:shadow-lg hover:shadow-pink-500/30 hover:scale-105 transition-all shadow-md active:scale-95 duration-200"
            >
              Admission
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex lg:hidden items-center justify-center p-2 rounded-lg text-deep-forest hover:bg-light-sage/40 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Warm Cream background) */}
      <div
        className={`fixed inset-0 z-40 bg-dark-green/35 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 bottom-0 w-80 max-w-full bg-warm-cream shadow-2xl p-6 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top of mobile navigation */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-light-sage/40">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-deep-forest uppercase tracking-widest font-serif block">12 Star Navigation</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-deep-forest hover:bg-light-sage/40 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links list */}
          <div className="flex-1 overflow-y-auto space-y-2 text-left">
            {navItems.map((item) => (
              <div key={item.label} className="block">
                {item.dropdown ? (
                  <div className="block">
                    <button
                      onClick={() => toggleMobileDropdown(item.label)}
                      className="w-full flex items-center justify-between py-2.5 text-xs font-extrabold uppercase tracking-wider text-dark-text hover:text-deep-forest border-b border-light-sage/20 text-left focus:outline-none"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-medium-green transition-transform duration-200 ${activeMobileDropdown === item.label ? 'rotate-180' : ''
                          }`}
                      />
                    </button>

                    {/* Collapsible Dropdown Menu in Mobile: Dark green card inside the drawer */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${activeMobileDropdown === item.label ? 'max-h-80 opacity-100 mt-1 mb-2' : 'max-h-0 opacity-0'
                        }`}
                    >
                      <div className="bg-dark-green rounded-xl py-1.5 px-3 flex flex-col border border-medium-green/20 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            onClick={(e) => {
                              if (subItem.href.startsWith('/#')) {
                                handleScrollTo(e as any, subItem.href);
                              } else {
                                setIsOpen(false);
                              }
                            }}
                            className="py-2 text-[10px] font-bold uppercase tracking-wider text-white hover:text-lime-accent active:text-gold transition-colors block text-left"
                          >
                            • &nbsp; {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href || '#'}
                    onClick={(e) => {
                      if (item.href?.startsWith('/#')) {
                        handleScrollTo(e, item.href);
                      } else {
                        setIsOpen(false);
                      }
                    }}
                    className="block py-2.5 text-xs font-extrabold uppercase tracking-wider text-dark-text hover:text-deep-forest border-b border-light-sage/20"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full inline-flex items-center justify-center py-3 rounded-full text-xs font-bold uppercase tracking-widest text-deep-forest border border-deep-forest hover:bg-deep-forest hover:text-white transition-all font-outfit shadow-sm"
            >
              Admin Login
            </Link>
            <Link
              href="/admissions/process"
              onClick={() => setIsOpen(false)}
              className="mt-3 w-full inline-flex items-center justify-center py-3 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-gradient-pink-purple shadow-md shadow-pink-500/20 hover:shadow-pink-500/30 transition-all font-outfit"
            >
              Admission
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
