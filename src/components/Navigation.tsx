/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Page } from '../types';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  setSelectedProjectSlug: (slug: string | null) => void;
}

export default function Navigation({
  currentPage,
  setCurrentPage,
  setSelectedProjectSlug
}: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { label: string; page: Page }[] = [
    { label: 'Projects', page: 'projects' },
    { label: 'Process', page: 'process' },
    { label: 'Studio', page: 'studio' },
    { label: 'Contact', page: 'contact' }
  ];

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setSelectedProjectSlug(null);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <header className="sticky top-0 z-40 bg-bone/90 backdrop-blur-md border-b border-taupe/10 py-6 px-6 md:px-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo - Serif Editorial Vibe */}
        <div 
          onClick={() => navigateTo('home')}
          className="cursor-pointer group flex items-baseline gap-2 select-none"
          id="nav-brand-logo"
        >
          <span className="font-serif text-xl md:text-2xl tracking-normal text-charcoal font-medium transition-colors">
            Lumen <span className="font-serif italic font-light text-taupe group-hover:text-charcoal transition-colors duration-300">&amp;</span> Loom
          </span>
          <span className="font-mono text-[9px] tracking-[0.25em] text-taupe hidden sm:inline uppercase">
            · Studio
          </span>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => navigateTo(item.page)}
                className={`relative py-1 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                  isActive ? 'text-charcoal' : 'text-taupe hover:text-charcoal'
                }`}
                id={`nav-link-${item.page}`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-charcoal rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Studio Metadata - Right Corner */}
        <div className="hidden lg:flex items-center gap-4 text-right">
          <span className="font-mono text-[9px] tracking-[0.2em] text-taupe uppercase">
            KL / SG ORBIT
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-taupe/50 animate-pulse"></div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-charcoal focus:outline-none p-1 hover:opacity-75 transition-opacity"
          aria-label="Toggle navigation menu"
          id="nav-mobile-toggle"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Slide-Down */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-bone border-b border-taupe/15 px-6 py-8 flex flex-col gap-6 shadow-xl animate-fade-in z-50">
          <div className="flex flex-col gap-5">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => navigateTo(item.page)}
                  className={`text-left font-serif text-2xl tracking-tight transition-colors ${
                    isActive ? 'text-charcoal italic pl-2 border-l-2 border-charcoal/30' : 'text-taupe'
                  }`}
                  id={`nav-mobile-link-${item.page}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-taupe/10 flex flex-col gap-1.5 font-mono text-[9px] tracking-[0.2em] text-taupe uppercase">
            <div>Lumen &amp; Loom Design Studio</div>
            <div>Projects fees start RM 35,000</div>
          </div>
        </div>
      )}
    </header>
  );
}
