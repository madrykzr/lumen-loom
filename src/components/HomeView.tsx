/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { ArrowUpRight, ArrowRight, CornerDownRight } from 'lucide-react';
import SmartImage from './SmartImage';

interface HomeViewProps {
  projects: Project[];
  setCurrentPage: (page: string) => void;
  setSelectedProjectSlug: (slug: string | null) => void;
  onHoverState: (type: 'project' | 'drag' | 'none') => void;
}

export default function HomeView({
  projects,
  setCurrentPage,
  setSelectedProjectSlug,
  onHoverState
}: HomeViewProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse drag handers for custom scroll carousel
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    onHoverState('drag');
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    onHoverState('none');
  };

  const handleMouseUp = () => {
    setIsDown(false);
    onHoverState('none');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleProjectClick = (slug: string) => {
    setSelectedProjectSlug(slug);
    setCurrentPage('project-detail');
    window.scrollTo({ top: 0, behavior: 'instant' });
    onHoverState('none');
  };

  return (
    <div className="space-y-24 md:space-y-40 pb-20 overflow-x-hidden" id="home-view-container">
      
      {/* 1. EDITORIAL HERO */}
      <section className="px-6 md:px-12 pt-6 md:pt-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-8 mt-4 lg:mt-12 order-2 lg:order-1">
            <div className="font-mono text-[10px] tracking-[0.25em] text-taupe uppercase flex items-center gap-2">
              <span>§ 01 INTRODUCTION</span>
              <div className="w-8 h-[1px] bg-taupe/30"></div>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[42px] xl:text-5xl 2xl:text-6xl text-charcoal tracking-[-0.04em] leading-[0.9] font-light">
              We compose <span className="italic font-semibold font-serif text-charcoal block sm:inline">homes</span> that feel <span className="italic font-semibold font-serif text-taupe block sm:inline">quiet &amp; loom-spun.</span>
            </h1>
            
            <p className="text-[14px] md:text-base text-taupe leading-relaxed font-light max-w-md">
              Lumen & Loom is an interior design atelier shaping silent luxury spaces between Kuala Lumpur and Singapore. We believe in subtraction, raw textures, and the slow movement of diurnal light.
            </p>

            <div className="pt-4">
              <button 
                onClick={() => {
                  setCurrentPage('projects');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="group flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-charcoal hover:opacity-75 transition-all"
                id="home-explore-projects-btn"
              >
                <span>EXPLORE THE REPERTORY</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Right Hero Image Column */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="aspect-[16/11] w-full bg-sand/30 shadow-sm border border-charcoal/5 group relative">
              <SmartImage
                src="/hero.jpg"
                fallbackSrc="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1600"
                alt="Lumen and Loom Hero Minimalist Living Room"
                onHoverState={(isHovered) => onHoverState(isHovered ? 'project' : 'none')}
                onClick={() => handleProjectClick('bangsar-townhouse')}
              />
              <div className="absolute top-4 right-4 bg-bone/90 backdrop-blur-sm border border-charcoal/10 px-3 py-1 font-mono text-[9px] tracking-widest uppercase">
                HERO PREVIEW · BANGSAR
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. PHILOSOPHY PARAGRAPH WITH ARCHITECTURAL DETAIL */}
      <section className="bg-sand/35 py-20 md:py-32 border-y border-taupe/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Corner segment numbering */}
            <div className="lg:col-span-3">
              <div className="font-mono text-[10px] tracking-[0.25em] text-taupe uppercase sticky top-28">
                § 02 STATEMENT OF ETHOS
              </div>
            </div>

            {/* Core ethos layout */}
            <div className="lg:col-span-8 lg:col-start-4 space-y-10">
              <h2 className="font-serif text-[38px] sm:text-5xl md:text-6xl text-charcoal leading-[0.95] tracking-[-0.03em] font-light italic max-w-3xl">
                A room succeeds not through decoration, but through <span className="font-semibold not-italic text-charcoal">absolute material integrity</span> and the manipulation of <span className="font-semibold text-charcoal">tropical light.</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[14px] leading-relaxed text-taupe font-light pt-4 border-t border-taupe/20">
                <p>
                  We reject fast-paced trends. We design backdrops for quiet routines: studying how daylight refracts across clay plaster at 4:00 PM, sourcing reclaimed teak that survives generations, and building bespoke built-ins that silence architectural visual noise.
                </p>
                <p>
                  Working with clay plasters, unpolished stone slabs, and sheer organic linens, we invite Malaysian nature into daily interior life. Our spatial design allows warm breezes to circulate, wood oils to breathe, and minds to settle.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between border-b border-taupe/15 pb-12">
                <div className="font-mono text-[11px] text-taupe tracking-wider">
                  FEES START AT RM 35,000 PER PROJECT
                </div>
                <button
                  onClick={() => {
                    setCurrentPage('studio');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider uppercase text-charcoal hover:underline"
                >
                  STUDIO BIOMETRY <CornerDownRight size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SELECTED PROJECTS DRAGGABLE CAROUSEL */}
      <section className="space-y-8 select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-baseline justify-between">
          <div className="space-y-1">
            <div className="font-mono text-[10px] tracking-[0.25em] text-taupe uppercase flex items-center gap-2">
              <span>§ 03 FEATURED SPACES</span>
              <span className="w-6 h-[1.5px] bg-taupe/30"></span>
            </div>
            <h2 className="font-serif text-[42px] sm:text-5xl md:text-6xl text-charcoal tracking-[-0.03em] leading-[0.95] italic font-light">
              The <span className="font-semibold text-charcoal">Selected Portfolio</span>
            </h2>
          </div>
          
          <div className="font-mono text-[10px] text-taupe tracking-widest md:block hidden">
            ← DRAG / SCROLL TO NAVIGATE →
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex overflow-x-auto gap-8 px-6 md:px-12 pb-8 cursor-grab scroll-smooth no-scrollbar select-none active:cursor-grabbing"
          id="home-carousel-track"
        >
          {projects.map((project, index) => {
            const hasRealImage = project.slug === 'bangsar-townhouse';
            
            return (
              <div 
                key={project.slug}
                onClick={() => handleProjectClick(project.slug)}
                className="flex-shrink-0 w-[280px] sm:w-[360px] md:w-[420px] space-y-4 group select-none cursor-pointer"
              >
                {/* Visual Area */}
                <div className="aspect-[3/4] w-full border border-charcoal/5 relative overflow-hidden bg-sand/20">
                  {hasRealImage ? (
                    <SmartImage
                      src={project.heroImage}
                      fallbackSrc={project.imageUrl}
                      alt={project.title}
                      onHoverState={(isHovered) => onHoverState(isHovered ? 'project' : 'none')}
                    />
                  ) : (
                    // Elegant architecture schematic abstract gradient box
                    <div className="w-full h-full flex flex-col justify-between p-8 bg-gradient-to-br from-sand/40 to-taupe/20 relative">
                      {/* Geometric grid lines representing layout */}
                      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-[0.08] pointer-events-none">
                        <div className="border-r border-b border-charcoal"></div>
                        <div className="border-r border-b border-charcoal"></div>
                        <div className="border-r border-b border-charcoal"></div>
                        <div className="border-b border-charcoal"></div>
                        <div className="border-r border-b border-charcoal"></div>
                        <div className="border-r border-b border-charcoal"></div>
                        <div className="border-r border-b border-charcoal"></div>
                        <div className="border-b border-charcoal"></div>
                      </div>
                      
                      <div className="flex justify-between items-start font-mono text-[10px] text-taupe tracking-widest z-10">
                        <span>LUMEN & LOOM DB</span>
                        <span>0{index + 1} / 0{projects.length}</span>
                      </div>

                      <div className="space-y-1.5 z-10">
                        <span className="font-mono text-[9px] tracking-widest text-taupe uppercase block">
                          RESIDENCE / CONCEPTUAL
                        </span>
                        <span className="font-serif text-2xl text-charcoal italic tracking-tight font-light block">
                          {project.title}
                        </span>
                      </div>

                      <div className="flex justify-between items-baseline z-10 font-mono text-[10px] text-taupe">
                        <span>{project.location}</span>
                        <span>{project.year}</span>
                      </div>
                    </div>
                  )}

                  {/* Absolute Badge */}
                  <div className="absolute top-4 left-4 bg-charcoal text-bone px-2 py-0.5 font-mono text-[8px] tracking-[0.2em] uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    READ STUDY →
                  </div>
                </div>

                {/* Sub Caption */}
                <div className="flex justify-between items-baseline font-mono text-[10px] tracking-[0.12em] text-taupe px-1">
                  <span>0{index + 1} / 0{projects.length} · {project.title}</span>
                  <span className="text-charcoal font-medium">{project.year}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. PROCESS BLUEPRINT BLOCK */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="border-t border-taupe/15 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-4 space-y-6">
              <div className="font-mono text-[10px] tracking-[0.25em] text-taupe uppercase flex items-center gap-2">
                <span>§ 04 THE SYSTEM</span>
                <span className="w-6 h-[1.5px] bg-taupe/30"></span>
              </div>
              
              <h2 className="font-serif text-[42px] sm:text-5xl md:text-6xl text-charcoal tracking-[-0.03em] leading-[0.95] italic font-light">
                How we <span className="font-semibold text-charcoal">realize quietude</span>.
              </h2>
              
              <p className="text-[14px] text-taupe font-light leading-relaxed">
                We believe meticulous planning and site hygiene prevent aesthetic friction. Our four-step workflow ensures structural reality mirrors creative intent perfectly.
              </p>

              <button
                onClick={() => {
                  setCurrentPage('process');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="group flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-charcoal hover:underline pt-4"
              >
                DETAILED LOGISTICS <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                
                {[
                  { id: '01', title: 'Consult', detail: 'Appraising lightwell volumes and architectural orientation study.' },
                  { id: '02', title: 'Concept', detail: 'Physical timber trays, hand-plasters and bespoke joinery sketching.' },
                  { id: '03', title: 'Construct', detail: 'Meticulous on-site management with custom local craftsmen.' },
                  { id: '04', title: 'Curate', detail: 'Soft linen textiles layer, custom light alignment, hand-spun clay vessels.' }
                ].map((item) => (
                  <div key={item.id} className="border-l border-taupe/20 pl-6 py-2 space-y-2">
                    <span className="font-mono text-xs text-taupe font-light">STAGE {item.id}</span>
                    <h3 className="font-serif text-2xl text-charcoal italic font-light">{item.title}</h3>
                    <p className="text-xs text-taupe/80 leading-relaxed font-light">{item.detail}</p>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CONTACT CONVERSATION ENQUIRY CTA */}
      <section className="px-6 md:px-12 pb-12 max-w-7xl mx-auto">
        <div className="bg-sand py-20 px-8 md:px-16 text-center space-y-8 border border-taupe/10">
          <div className="font-mono text-[9px] tracking-[0.25em] text-taupe uppercase">
            ESTABLISH CONTACT
          </div>
          
          <h2 className="font-serif text-[38px] sm:text-5xl md:text-6xl text-charcoal max-w-4xl mx-auto leading-[0.95] tracking-[-0.03em] font-light italic">
            Have a project or <span className="font-semibold text-charcoal">residential restoration</span> on your horizon?
          </h2>
          
          <p className="text-xs md:text-sm text-taupe font-light max-w-md mx-auto leading-relaxed">
            We are accepting select commissions within Malaysia and Singapore for late 2026. Let us construct a spatial story that speaks silently.
          </p>

          <div className="pt-4">
            <button
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="bg-charcoal text-bone hover:bg-taupe hover:text-charcoal transition-colors duration-500 font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-none shadow-md"
              id="home-contact-cta"
            >
              COMMENCE CONSULTATION
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
