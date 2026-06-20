/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { ArrowDown, ArrowUpRight, ArrowRight, CornerDownRight, Plus, ChevronRight, Sparkles } from 'lucide-react';
import SmartImage from './SmartImage';

// Lightweight, bulletproof count-up animation component
function CountingNumber({ value, duration = 1500, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing out quadratic
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <span>{count}{suffix}</span>;
}

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
  const [activeProjectImgIndex, setActiveProjectImgIndex] = useState(0);
  
  // Custom slider images representing Lumière Duplex Rooms
  const duplexImages = [
    {
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
      caption: "01 / Primary Living Lounge with custom hand-poured concrete plaster walls and timber beams"
    },
    {
      url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200",
      caption: "02 / The tea salon features curated low-slung oak tables and hand-spun ceramic tea-ware"
    },
    {
      url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
      caption: "03 / Master sanctuary chamber framed by floor-to-ceiling sheets of organic unbleached linen"
    }
  ];

  const handleProjectClick = (slug: string) => {
    setSelectedProjectSlug(slug);
    setCurrentPage('project-detail');
    window.scrollTo({ top: 0, behavior: 'instant' });
    onHoverState('none');
  };

  // Luxury ease configuration
  const luxTransition = { duration: 1.1, ease: [0.16, 1, 0.3, 1] };

  return (
    <div className="space-y-32 md:space-y-48 pb-24 overflow-x-hidden" id="home-view-container">
      
      {/* 1. CINEMATIC HERO (Aesthetic Match for ELYSE Video Start) */}
      <section className="px-6 md:px-12 pt-6 md:pt-10 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          {/* Left Large Branding Title Anchor */}
          <div className="lg:col-span-8 space-y-6 relative">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-mono text-[10px] tracking-[0.3em] font-semibold text-wine uppercase flex items-center gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-wine animate-pulse"></span>
              HOLISTIC LUXURY · IN PERFECT HARMONY
            </motion.div>
            
            {/* Massive Overlapping Editorial Typographical block */}
            <div className="relative select-none">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.96, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-[75px] sm:text-[110px] md:text-[145px] lg:text-[150px] xl:text-[190px] leading-[0.78] tracking-[-0.05em] text-charcoal font-light uppercase"
              >
                LUMEN
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.0, delay: 0.4 }}
                className="absolute right-0 bottom-2 text-right max-w-xs md:max-w-sm hidden sm:block"
              >
                <span className="font-serif italic text-base md:text-lg text-taupe block leading-tight">
                  "Light is the shadow of absolute integrity."
                </span>
                <span className="font-mono text-[9px] tracking-widest text-taupe uppercase block mt-1">
                  IMAN SURIA · KL STUDIO
                </span>
              </motion.div>
            </div>

            {/* Main Wide Landscape Image Showcase */}
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="aspect-[16/10] w-full bg-sand shadow-sm border border-charcoal/5 relative overflow-hidden group"
            >
              <SmartImage
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600"
                fallbackSrc="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1600"
                alt="Lumen and Loom Hero Minimalist Restored Pavilion"
                onHoverState={(isHovered) => onHoverState(isHovered ? 'project' : 'none')}
                onClick={() => handleProjectClick('bangsar-townhouse')}
              />
              <div className="absolute bottom-5 left-5 bg-charcoal/95 text-bone px-3 py-1.5 font-mono text-[9px] tracking-widest uppercase">
                BANGSAR PAVILION · RESTORATION STUDY 14
              </div>
            </motion.div>
          </div>

          {/* Right Floating Desc & Navigation Link */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="lg:col-span-4 space-y-8 lg:pb-4"
          >
            <p className="text-[14px] md:text-[15px] text-taupe leading-relaxed font-light">
              Welcome to <strong className="text-charcoal font-medium">Lumen Residences</strong>, where timeless design, wellness-infused living and regional material preservation converge to create an atmospheric sanctuary of elegance and profound rest.
            </p>

            <div className="space-y-4 pt-2">
              <button 
                onClick={() => {
                  setCurrentPage('projects');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="w-full justify-between group flex items-center gap-3 border border-charcoal/30 hover:border-wine/60 px-5 py-4 font-mono text-[11px] tracking-[0.2em] uppercase text-charcoal transition-all bg-sand/10"
              >
                <span>EXPLORE THE REPERTORY</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 border-b border-charcoal/30 pb-0.5 transition-transform duration-300 text-wine" />
              </button>

              <button 
                onClick={() => {
                  setCurrentPage('process');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="w-full justify-between group flex items-center gap-3 border border-charcoal/10 hover:border-charcoal/30 px-5 py-3 font-mono text-[10px] tracking-[0.2em] uppercase text-taupe hover:text-charcoal transition-all"
              >
                <span>OUR FOUR STAGES PROTOCOL</span>
                <CornerDownRight size={13} className="opacity-60 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Micro Scroll anchor */}
            <div className="flex items-center gap-4 text-mono pt-4 border-t border-taupe/15">
              <span className="font-mono text-[9px] tracking-[0.3em] text-taupe uppercase animate-pulse">SCROLL</span>
              <div className="h-[25px] w-[1px] bg-taupe/40 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-wine animate-bounce"></div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. THE ABOUT SECTION (Match for ELYSE Video @ 0:02) */}
      <motion.section 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={luxTransition}
        className="px-6 md:px-12 max-w-7xl mx-auto border-t border-taupe/15 pt-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Index Col */}
          <div className="lg:col-span-3">
            <div className="font-mono text-[10px] tracking-[0.25em] text-wine font-semibold uppercase sticky top-28 flex items-center gap-1.5">
              <span>(ABOUT)</span>
            </div>
          </div>

          {/* Left Text Col */}
          <div className="lg:col-span-4 space-y-6 lg:pt-1">
            <h2 className="font-serif text-[44px] md:text-[54px] lg:text-[56px] text-charcoal leading-[0.95] tracking-[-0.03em] font-light">
              Timeless <br />
              <span className="italic font-semibold text-charcoal">Design</span>, <br />
              Wellness- <br />
              Focused <br />
              <span className="font-serif font-light text-taupe italic">Living.</span>
            </h2>
            <p className="text-[14px] leading-relaxed text-taupe font-light">
              Every element of Lumen Residences reflects an absolute commitment to spatial excellence. From the physical luxury of raw plasters to thoughtfully aligned acoustic boundaries, our spaces embody a holistic approach to residence restoration.
            </p>
          </div>

          {/* Center Tall Image Col */}
          <div className="lg:col-span-5 space-y-6">
            <div className="aspect-[3/4] w-full bg-sand relative overflow-hidden shadow-md">
              <SmartImage 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200"
                fallbackSrc="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200"
                alt="Minimal room timber textures"
              />
            </div>

            <div className="flex justify-between items-start gap-4">
              <p className="text-xs text-taupe leading-relaxed font-light max-w-xs">
                Sourcing wild Malaysian timber slabs, balancing relative humidity via clay plasters, and tailoring custom natural lights.
              </p>
              <button 
                onClick={() => {
                  setCurrentPage('studio');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="px-6 py-2.5 rounded-full border border-charcoal/20 hover:border-wine hover:text-wine hover:bg-wine/5 font-mono text-[9px] tracking-widest text-charcoal uppercase transition-all whitespace-nowrap"
              >
                LEARN MORE
              </button>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 3. DYNAMIC METRIC COUNTERS SECTION (Match for ELYSE Video @ 0:04) */}
      <motion.section 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={luxTransition}
        className="bg-sand pt-20 pb-24 border-y border-taupe/15"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-taupe/15 pb-6">
            <span className="font-mono text-[9px] tracking-[0.3em] text-wine font-semibold uppercase">§ SYSTEM MEASUREMENTS</span>
            <span className="font-mono text-[10px] text-taupe tracking-wider">ANNUAL RESIDENCY LOGS · QUANTITATIVE STATS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start">
            
            {/* Major Footprint Stat - Col 1 */}
            <div className="md:col-span-5 space-y-4 border-r border-taupe/10 pr-4">
              <div className="font-mono text-8xl md:text-9xl tracking-tighter text-charcoal font-light flex items-baseline">
                <CountingNumber value={150} />
                <span className="text-2xl font-serif text-taupe italic font-light ml-2">k</span>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[11px] text-sky font-semibold uppercase block tracking-widest">SQ. FT. PATTERED</span>
                <p className="text-xs text-taupe leading-relaxed max-w-xs font-light">
                  Of meticulously designed and physically restored residential living volume since studio genesis.
                </p>
              </div>
            </div>

            {/* Middle Stats - Col 2 */}
            <div className="md:col-span-4 space-y-12 border-r border-taupe/10 pr-4">
              
              {/* Stat A */}
              <div className="space-y-2">
                <div className="font-mono text-5xl md:text-6xl text-charcoal font-light flex items-baseline">
                  <CountingNumber value={60} />
                  <span className="text-sm font-mono text-taupe font-light ml-1">%</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-wine font-semibold uppercase block tracking-widest">ORGANIC PLASTERS & SAGE RESINS</span>
                  <p className="text-xs text-taupe font-light">
                    For atmospheric tranquility, thermal regulation, and high acoustic absorption.
                  </p>
                </div>
              </div>

              {/* Stat B */}
              <div className="space-y-2">
                <div className="font-mono text-5xl md:text-6xl text-charcoal font-light flex items-baseline">
                  24/7
                </div>
                <div>
                  <span className="font-mono text-[10px] text-taupe uppercase block tracking-widest">CURATION TEAM MONITORING</span>
                  <p className="text-xs text-taupe font-light">
                    Guaranteed high construction safety, subcontractor surveillance, and zero delays.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Stat - Col 3 */}
            <div className="md:col-span-3 space-y-4">
              <div className="font-mono text-5xl md:text-6xl text-charcoal font-light flex items-baseline">
                <CountingNumber value={30} />
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-taupe uppercase block tracking-widest">RESTORED HOMES</span>
                <p className="text-xs text-taupe font-light leading-relaxed">
                  Bespoke restorations tailored completely for physical stillness, material integrity and custom organic ventilation.
                </p>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* 4. OUR PROJECTS SLIDESHOW/CAROUSEL (Match for ELYSE Video @ 0:07) */}
      <motion.section 
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={luxTransition}
        className="px-6 md:px-12 max-w-7xl mx-auto space-y-12 relative"
      >
        
        {/* Caption */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-taupe/10 pb-6">
          <div className="space-y-1">
            <span className="font-mono text-[10px] tracking-[0.25em] text-wine font-semibold uppercase block">
              (OUR PROJECTS)
            </span>
            <h2 className="font-serif text-[45px] sm:text-[56px] md:text-[68px] text-charcoal leading-[0.85] tracking-[-0.04em] font-light uppercase">
              LUMIÈRE DUPLEX
            </h2>
          </div>
          
          {/* Custom controls mimicking ELYSE */}
          <div className="flex gap-4 font-mono text-[10px] tracking-widest uppercase">
            {duplexImages.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveProjectImgIndex(idx)}
                className={`transition-colors p-2 ${activeProjectImgIndex === idx ? 'text-charcoal font-bold border-b border-wine' : 'text-taupe'}`}
              >
                (0{idx + 1})
              </button>
            ))}
          </div>
        </div>

        {/* Master Project visual slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main big image */}
          <div className="lg:col-span-9 space-y-4">
            <div className="aspect-[16/9] w-full bg-sand relative overflow-hidden border border-charcoal/5 shadow-md">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeProjectImgIndex}
                  src={duplexImages[activeProjectImgIndex].url}
                  initial={{ opacity: 0, scale: 1.05, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -20 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover"
                  alt={`Lumière Duplex chamber ${activeProjectImgIndex}`}
                />
              </AnimatePresence>
            </div>
            <p className="font-mono text-[11px] tracking-wide text-taupe italic">
              {duplexImages[activeProjectImgIndex].caption}
            </p>
          </div>

          {/* Sub descriptions mimicking Elyse bullet points */}
          <div className="lg:col-span-3 space-y-8 lg:pt-2">
            <div className="space-y-3">
              <span className="font-mono text-[9px] text-wine font-bold uppercase tracking-wider block">§ PROJECT SCOPE</span>
              <p className="text-xs text-taupe leading-relaxed font-light">
                Two-story luxury apartments featuring sunlit living spaces, private internal micro-courtyards, and custom structural joinery.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-taupe/15">
              <div className="flex justify-between text-[11px] font-mono uppercase tracking-wider text-charcoal">
                <span>LOCALITY</span>
                <span className="text-taupe">BANGSAR RIDGE, KL</span>
              </div>
              <div className="flex justify-between text-[11px] font-mono uppercase tracking-wider text-charcoal">
                <span>YEAR OF BUILD</span>
                <span className="text-taupe">2026 Restored</span>
              </div>
              <div className="flex justify-between text-[11px] font-mono uppercase tracking-wider text-charcoal">
                <span>LEAD DESIGN</span>
                <span className="text-taupe">IMAN ATELIER</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => handleProjectClick('bangsar-townhouse')}
                className="w-full text-center group flex items-center justify-center gap-3 border border-charcoal/20 hover:bg-wine hover:text-bone hover:border-wine px-5 py-3 font-mono text-[10px] tracking-[0.2em] uppercase text-charcoal transition-all"
              >
                <span>LEARN MORE</span>
                <ArrowRight size={13} className="text-wine group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 5. OUR BELIEFS / STATEMENT & ACCORDION (Match for ELYSE Video @ 0:12-0:15) */}
      <motion.section 
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={luxTransition}
        className="px-6 md:px-12 max-w-7xl mx-auto space-y-16"
      >
        
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-taupe/15 pt-20">
          <div className="lg:col-span-3">
            <span className="font-mono text-[10px] tracking-[0.25em] text-wine font-semibold uppercase block">
              (OUR BELIEFS)
            </span>
          </div>

          <div className="lg:col-span-6">
            <h2 className="font-serif text-[42px] sm:text-[54px] md:text-[62px] text-charcoal tracking-[-0.03em] leading-[0.95] uppercase font-light">
              A VISION OF <br />
              <span className="italic font-bold text-charcoal font-serif">INSPIRED LIVING</span>
            </h2>
          </div>

          <div className="lg:col-span-3 space-y-4 lg:pt-2">
            <p className="text-xs text-taupe leading-relaxed font-light">
              To inspire and nurture an enriched lifestyle that harmonizes beauty, wellness, and local cultural context, creating a silent home environment.
            </p>
            <button 
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="px-6 py-2.5 rounded-full bg-wine hover:bg-wine/90 hover:scale-[1.01] transition-all text-bone text-[9.5px] font-mono tracking-widest uppercase block text-center"
            >
              BOOK A VISIT
            </button>
          </div>
        </div>

        {/* 5 columns layout with premium staggered cascade entrance mimicking Elyse video @ 0:14 */}
        <div className="relative border-t border-taupe/15">
          <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-taupe/15">
            {[
              {
                num: "01",
                title: "HOLISTIC WELL-BEING",
                desc: "Spaces meticulously designed to nurture the mind, body, and soul through subtraction, sensory protection, and pure air drafts."
              },
              {
                num: "02",
                title: "DISCRETION & EXCLUSIVITY",
                desc: "Ultimate privacy and slow acoustic isolation as a supreme asset. Restorative zones completely shielded from urban friction."
              },
              {
                num: "03",
                title: "CULTURAL ENRICHMENT",
                desc: "Celebrating local Malaysian carpentry patterns, raw clay plasters, unpolished stone slabs, and hand-spun antique vessels."
              },
              {
                num: "04",
                title: "COMMUNITY & CONNECTION",
                desc: "A welcoming, humble threshold that organic air streams can circulate through, fostering authentic, quiet household relationships."
              },
              {
                num: "05",
                title: "SUSTAINABLE ELEGANCE",
                desc: "True sustainable craftsmanship means preserving historic facades, sourcing raw carbon-neutral materials, and building for generations."
              }
            ].map((belief, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: idx * 0.12 }}
                className="p-6 md:p-8 space-y-6 hover:bg-sand/30 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex justify-between items-baseline font-mono text-xs text-taupe">
                  <span>({belief.num})</span>
                  <Plus size={10} className="text-wine group-hover:rotate-90 transition-transform duration-350" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-semibold text-charcoal group-hover:text-wine transition-colors leading-snug">
                    {belief.title}
                  </h3>
                  <p className="text-[11.5px] leading-relaxed text-taupe/95 font-light">
                    {belief.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.section>

      {/* 6. WELLNESS-CENTERED AMENITIES (Match for ELYSE Video @ 0:17) */}
      <motion.section 
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={luxTransition}
        className="px-6 md:px-12 max-w-7xl mx-auto space-y-12"
      >
        <div className="border-t border-taupe/15 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-[9px] text-wine font-semibold uppercase tracking-widest block">§ DESIGN INTEGRATION</span>
              <h2 className="font-serif text-[42px] sm:text-[54px] md:text-[60px] text-charcoal tracking-[-0.03em] leading-[0.95] uppercase font-light">
                WELLNESS- <br />
                CENTERED <br />
                <span className="italic font-bold text-charcoal font-serif">AMENITIES</span>
              </h2>
              <p className="text-xs md:text-sm text-taupe font-light leading-relaxed max-w-sm">
                From private restorative gardens and fitness spaces to guided sensory meditation zones, our materials and layouts are tailored to foster a deep sense of environmental harmony and physical wellness.
              </p>
              
              <div className="pt-2">
                <button
                  onClick={() => {
                    setCurrentPage('process');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="px-6 py-3 rounded-full border border-charcoal/20 hover:border-wine hover:text-wine hover:bg-wine/5 font-mono text-[10px] tracking-[0.2em] text-charcoal uppercase transition-all"
                >
                  LEARN MORE
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="aspect-[3/4] w-full bg-sand relative overflow-hidden shadow-md">
                    <SmartImage 
                      src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200"
                      fallbackSrc="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200"
                      alt="Wellness yoga pavilion"
                    />
                  </div>
                  <div className="font-mono text-[10px] text-taupe uppercase tracking-wider">
                    [A] PRIVATE MEDITATION LOGS
                  </div>
                </div>

                <div className="space-y-4 sm:translate-y-8">
                  <div className="aspect-[3/4] w-full bg-sand relative overflow-hidden shadow-md">
                    <SmartImage 
                      src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200"
                      fallbackSrc="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200"
                      alt="Aesthetic spiral staircase"
                    />
                  </div>
                  <div className="font-mono text-[10px] text-taupe uppercase tracking-wider">
                    [B] ARCHITECTURAL LIGHTWAYS
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* 7. CONTACT CONVERSATION ENQUIRY CTA */}
      <motion.section 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={luxTransition}
        className="px-6 md:px-12 max-w-7xl mx-auto"
      >
        <div className="bg-sand py-20 px-8 md:px-16 text-center space-y-8 border border-taupe/10 relative overflow-hidden">
          {/* Subtle background glow mimicking video */}
          <div className="absolute inset-0 bg-gradient-to-tr from-wine/5 via-transparent to-sky/5 bg-opacity-20 pointer-events-none"></div>
          
          <div className="font-mono text-[9px] tracking-[0.25em] text-wine font-semibold uppercase relative z-10">
            ESTABLISH CONTACT
          </div>
          
          <h2 className="font-serif text-[38px] sm:text-5xl md:text-6xl text-charcoal max-w-4xl mx-auto leading-[0.95] tracking-[-0.03em] font-light italic relative z-10">
            Have a project or <span className="font-semibold text-charcoal">residential restoration</span> on your horizon?
          </h2>
          
          <p className="text-xs md:text-sm text-taupe font-light max-w-md mx-auto leading-relaxed relative z-10">
            We are accepting select commissions within Malaysia and Singapore for late 2026. Let us construct a spatial story that speaks silently.
          </p>

          <div className="pt-4 relative z-10">
            <button
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="bg-wine text-bone hover:bg-wine/90 transition-colors duration-500 font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-none shadow-md"
              id="home-contact-cta"
            >
              COMMENCE CONSULTATION
            </button>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
