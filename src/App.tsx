/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Compass, 
  Shield, 
  Heart, 
  Activity, 
  MapPin, 
  Mail, 
  Phone, 
  ChevronRight,
  Maximize2
} from 'lucide-react';
import SmartImage from './components/SmartImage';

// Highly elegant counting component that reacts to Intersection Event
function StatCounter({ label, value, suffix = "", delay = 0 }: { label: string; value: number; suffix?: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Nice cinematic easing out quadratic
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * value));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    const timeout = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay);

    return () => clearTimeout(timeout);
  }, [triggered, value, delay]);

  return (
    <div ref={elementRef} className="space-y-4">
      <div className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tighter text-elyse-light font-light flex items-baseline">
        <span>{count}</span>
        <span className="text-xl md:text-2xl font-serif text-elyse-taupe lowercase italic ml-1">
          {suffix}
        </span>
      </div>
      <div className="h-[1px] w-12 bg-elyse-taupe/30 block"></div>
      <p className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-elyse-taupe uppercase leading-tight">
        {label}
      </p>
    </div>
  );
}

export default function App() {
  const [cursorHoverType, setCursorHoverType] = useState<'project' | 'drag' | 'none'>('none');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'east' | 'west' | 'penthouse'>('east');

  // Input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('lumiere');

  // Track global scroll trigger for Hero Bento zoom mapping
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  // Calculate high performance interpolations for Hero Zoom
  // Central card shrinks/zooms based on pin progress [0, 0.75]
  const centralScale = useTransform(scrollYProgress, [0, 0.75], [1, 2.8]);
  
  // Outer tiles drift away and dissolve
  const bentoGlow = useTransform(scrollYProgress, [0, 0.4], [0.15, 0]);
  const siblingOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const siblingScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.85]);
  const siblingY = useTransform(scrollYProgress, [0, 0.45], [0, -40]);

  // Rounded Card radius melts to 0px at full bleed
  const customRadius = useTransform(scrollYProgress, [0.35, 0.8], ["24px", "0px"]);

  // Reveal title overlaid bottom-left
  const overlayTitleOpacity = useTransform(scrollYProgress, [0.45, 0.75], [0, 1]);
  const overlayTitleY = useTransform(scrollYProgress, [0.45, 0.75], [40, 0]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitLoading(true);
    setTimeout(() => {
      setSubmitLoading(false);
      setContactSuccess(true);
      setName('');
      setEmail('');
    }, 1200);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-elyse-dark text-elyse-light font-sans selection:bg-elyse-taupe/35 selection:text-elyse-light overflow-hidden">
      
      {/* Editorial film grain overlay for soft atmospheric aesthetic */}
      <div className="grain-overlay" />

      {/* FIXED NAV BAR - Glass translucent elegance */}
      <nav className="fixed top-0 left-0 w-full z-50 py-5 px-6 md:px-12 backdrop-blur-md bg-elyse-dark/70 border-b border-white/5 transition-all duration-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer group flex items-baseline gap-2 select-none"
          >
            <span className="font-serif text-2xl tracking-normal text-white font-medium transition-colors">
              LUMEN & LOOM
            </span>
            <span className="font-mono text-[8px] tracking-[0.3em] text-elyse-taupe uppercase hidden sm:inline">
              · STUDIO
            </span>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-10 font-mono text-[9.5px] tracking-[0.25em] text-elyse-taupe uppercase">
            <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors duration-300 pointer-events-auto">
              (ABOUT)
            </button>
            <button onClick={() => scrollToSection('portfolio')} className="hover:text-white transition-colors duration-300">
              (OUR PROJECTS)
            </button>
            <button onClick={() => scrollToSection('values')} className="hover:text-white transition-colors duration-300">
              (VALUES)
            </button>
            <button onClick={() => scrollToSection('closing')} className="hover:text-white transition-colors duration-300">
              (CONTACT)
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-2 font-mono text-[9px] tracking-widest text-[#9A9892]">
              <span className="hover:text-white cursor-pointer font-bold underline underline-offset-4 text-elyse-taupe">MY</span>
              <span>/</span>
              <span className="hover:text-white cursor-pointer opacity-70">EN</span>
            </div>
            <button
              onClick={() => scrollToSection('closing')}
              className="px-6 py-2.5 rounded-full border border-elyse-taupe/30 hover:border-white hover:bg-white hover:text-elyse-dark transition-all text-[9.5px] font-mono tracking-widest uppercase text-white shadow-lg bg-[#25272B]/50"
            >
              BOOK A TOUR
            </button>
          </div>

        </div>
      </nav>

      {/* SECTION 1 — SCROLL-PINNED HERO ZOOM (Bento to Full Bleed) */}
      <section ref={heroRef} className="relative h-[200vh] w-full bg-elyse-dark" id="hero">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

          {/* Sibling tiles backing grid (These fade/slide away on scroll) */}
          <motion.div 
            style={{ opacity: siblingOpacity, scale: siblingScale, y: siblingY }}
            className="absolute inset-0 w-full h-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-center pointer-events-none z-10 py-24"
          >
            {/* Sibling Card 1: Top-Left Luxury Detail */}
            <div className="md:col-span-3 h-[240px] rounded-[24px] overflow-hidden relative shadow-2xl border border-white/5 opacity-80 md:block hidden">
              <SmartImage 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800"
                fallbackSrc="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800"
                alt="Estate 01 Sanctuary Detail"
              />
              <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1 text-[8px] font-mono text-white tracking-widest rounded uppercase">
                ESTATE 01 · SANCTUARY
              </div>
            </div>

            {/* Empty center gap container for the Zooming Central card */}
            <div className="md:col-span-6 h-full flex items-center justify-center"></div>

            {/* Sibling Card 2: Top-Right Fine Print text details */}
            <div className="md:col-span-3 h-[240px] rounded-[24px] bg-[#121315]/80 p-8 flex flex-col justify-between border border-white/5 md:block hidden">
              <div className="font-mono text-[9px] text-elyse-taupe tracking-widest uppercase">
                LUMEN & LOOM REVELATION
              </div>
              <div className="space-y-3">
                <span className="font-serif text-3xl font-light italic leading-none text-elyse-taupe block">Timeless</span>
                <p className="text-[10px] text-elyse-taupe/70 leading-relaxed font-light">
                  A modern sculpture of pure light, wild wood, and acoustic security tailored gracefully.
                </p>
              </div>
              <div className="font-mono text-[9px] text-elyse-taupe/40 tracking-wider">
                CRAFTED 2026 EDITION
              </div>
            </div>

            {/* Sibling Card 3: Bottom-Left Stats */}
            <div className="md:col-span-4 h-[180px] rounded-[24px] bg-[#121315]/80 p-8 flex flex-col justify-between border border-white/5 md:block hidden">
              <div className="font-serif text-5xl font-light text-white tracking-tight flex items-baseline">
                150K<span className="text-xl text-elyse-taupe italic font-light ml-1">+</span>
              </div>
              <div>
                <span className="font-mono text-[8.5px] text-elyse-taupe tracking-[0.2em] uppercase block mb-1">
                  SQ. FT. PATTERED
                </span>
                <p className="text-[10px] text-elyse-taupe/65 font-light">
                  Meticulously designed volume across custom high-end estates.
                </p>
              </div>
            </div>

            {/* Empty bottom gap */}
            <div className="md:col-span-4"></div>

            {/* Sibling Card 4: Bottom-Right Image */}
            <div className="md:col-span-4 h-[180px] rounded-[24px] overflow-hidden relative shadow-2xl border border-white/5 md:block hidden">
              <SmartImage 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800"
                fallbackSrc="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800"
                alt="Atelier Lumen & Loom Dusk Interior"
              />
              <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1 text-[8px] font-mono text-white tracking-widest rounded uppercase">
                CHAMBER STUDY · SERIES 11
              </div>
            </div>
          </motion.div>

          {/* Sibling helper background glow */}
          <motion.div 
            style={{ opacity: bentoGlow }}
            className="absolute inset-0 bg-gradient-to-lg from-elyse-taupe/15 to-transparent pointer-events-none"
          />

          {/* THE CENTRAL ZOOMING CARD */}
          <motion.div 
            style={{ 
              scale: centralScale,
              borderRadius: customRadius
            }}
            className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl aspect-[16/10] bg-[#1F2124] relative shadow-[0_30px_100px_rgba(0,0,0,0.85)] border border-white/10 z-20 overflow-hidden cursor-pointer"
            onClick={() => scrollToSection('about')}
          >
            {/* High-res premium dusk home photo */}
            <div className="absolute inset-0 w-full h-full scale-[1.05] hover:scale-[1.08] transition-transform duration-1000">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600"
                alt="Lumen & Loom Residence Dusk Exterior"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-[0.75]"
              />
            </div>
            
            {/* Absolute overlay of ELYSE Title when centered */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/15 flex flex-col justify-between p-8">
              
              <div className="flex justify-between items-start">
                <span className="font-mono text-[8px] tracking-[0.3em] font-semibold text-[#D29A62]/90 uppercase flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-2.5 py-1 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D29A62] animate-pulse"></span>
                  LAUNCH REVELATION
                </span>
                
                {/* Book Tour small Pill button inside Hero */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToSection('closing');
                  }}
                  className="px-4 py-1.5 rounded-full bg-white text-elyse-dark font-mono text-[8px] font-semibold tracking-wider uppercase shadow-md hover:bg-elyse-taupe hover:text-white transition-all"
                >
                  BOOK A TOUR
                </button>
              </div>

              {/* Overlaid big elegant label */}
              <div className="space-y-2 select-none">
                <h2 className="font-serif text-5xl md:text-6xl text-white tracking-widest font-light uppercase">
                  LUMEN & LOOM
                </h2>
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-elyse-taupe tracking-widest uppercase">
                  <span>RESIDENCE 01</span>
                  <span>·</span>
                  <span>KUALA LUMPUR</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* FULL-viewport scale overlay - wordmark reveal once zoomed scale has maximized */}
          <motion.div 
            style={{ opacity: overlayTitleOpacity, y: overlayTitleY }}
            className="absolute bottom-16 left-6 md:left-16 z-30 select-none max-w-xl space-y-4 pointer-events-none"
          >
            <h1 className="font-serif text-[72px] sm:text-[98px] md:text-[130px] lg:text-[160px] leading-[0.75] tracking-[-0.04em] text-[#F5F4F0] font-light uppercase">
              LUMEN & LOOM
            </h1>
            <p className="font-serif text-lg md:text-[22px] italic text-[#BCB49F] font-light tracking-wide pl-2">
              "HOLISTIC LUXURY IN PERFECT HARMONY"
            </p>
            <div className="flex items-center gap-4 text-mono pt-4 border-t border-white/10 w-fit pl-2">
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#9A9892] uppercase animate-pulse">
                SCROLL DOWN
              </span>
              <div className="h-[20px] w-[1px] bg-white/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-[#D29A62] animate-bounce"></div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 2 — DURAL METRIC ASYMMETRIC COUNTERS */}
      <section className="bg-[#121315] py-32 md:py-48 border-y border-white/5 relative" id="stats">
        <div className="absolute inset-0 bg-radial-gradient from-elyse-taupe/5 to-transparent opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
          
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-white/5 pb-10">
            <div className="space-y-2">
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#D29A62] font-semibold uppercase block">
                § SYSTEM MEASUREMENTS
              </span>
              <h3 className="font-serif text-3xl font-light text-white tracking-wide">
                Quantitative physical specifications of absolute rest.
              </h3>
            </div>
            <span className="font-mono text-[10px] text-elyse-taupe tracking-wider">
              ANNUAL LOGS · CERTIFIED ACCREDITATIONS
            </span>
          </div>

          {/* Asymmetric Scattered Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-start">
            
            {/* Stat A - Left offset major */}
            <div className="md:col-span-5 md:pt-12 pr-4 space-y-3">
              <StatCounter label="RESTORED LIVING VOLUME" value={96} suffix="k sqft" delay={100} />
              <p className="text-xs text-elyse-taupe/70 leading-relaxed font-light max-w-xs">
                Meticulously designed sound-insulating volume featuring full structural acoustic decoupling and pure atmospheric filters.
              </p>
            </div>

            {/* Stat B - Center high offset */}
            <div className="md:col-span-4 md:translate-y-[-40px] space-y-12">
              <div className="space-y-3">
                <StatCounter label="INTEGRATED GREEN SPACES" value={45} suffix="%" delay={300} />
                <p className="text-xs text-elyse-taupe/70 font-light leading-relaxed">
                  Organic foliage buffers shielding all structural pathways from surrounding ambient municipal friction.
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/5">
                <StatCounter label="REST MEDITATION PATHWAYS" value={12} suffix="villas" delay={500} />
                <p className="text-xs text-elyse-taupe/70 font-light">
                  Tailor-designed sensory chambers built to complete physical subtraction standards.
                </p>
              </div>
            </div>

            {/* Stat C - Right bottom offset */}
            <div className="md:col-span-3 md:pt-32 space-y-4">
              <div className="font-serif text-7xl md:text-8xl text-white font-light flex items-baseline">
                <span>24</span>
                <span className="text-2xl text-elyse-taupe italic font-light">/7</span>
              </div>
              <div className="h-[1px] w-12 bg-[#D29A62]/30"></div>
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-elyse-taupe tracking-widest uppercase block">
                  CONCIERGE & MEDITATION SAGES
                </span>
                <p className="text-xs text-elyse-taupe/60 font-light leading-relaxed">
                  Guaranteed physical serenity assistance and high-security air screening logs.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3 — ABOUT EDITORIAL SPLIT LAYOUT */}
      <section className="py-24 md:py-40 max-w-7xl mx-auto px-6 md:px-12" id="about">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Text Col with massive overlapping editorial typography */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
            <div>
              <span className="font-mono text-[10.5px] tracking-[0.3em] text-[#D29A62] font-semibold uppercase block mb-6">
                (ABOUT)
              </span>
              
              {/* Overlapping dramatic typo */}
              <div className="space-y-0 relative">
                <h2 className="font-serif text-[65px] sm:text-[82px] md:text-[90px] text-white font-light leading-[0.8] tracking-[-0.04em] uppercase">
                  TIMELESS
                </h2>
                <div className="pl-6 md:pl-12">
                  <h2 className="font-serif text-[65px] sm:text-[82px] md:text-[90px] text-elyse-taupe italic font-light leading-[0.8] tracking-[-0.04em] uppercase">
                    DESIGN
                  </h2>
                </div>
                <h2 className="font-serif text-[65px] sm:text-[82px] md:text-[90px] text-white font-light leading-[0.8] tracking-[-0.04em] uppercase">
                  WELLNESS.
                </h2>
              </div>
            </div>

            <p className="text-sm md:text-base text-elyse-taupe/85 leading-relaxed font-light">
              Every cornerstone of Lumen & Loom projects reflects an absolute commitment to spatial excellence. By synthesizing raw materials, natural ventilation, and acoustic subtraction, we generate residential temples of deep restoration.
            </p>

            <button 
              onClick={() => scrollToSection('values')}
              className="group flex items-center gap-3 border-b border-white/20 hover:border-[#D29A62] pb-2 font-mono text-[11px] tracking-[0.25em] uppercase text-white transition-all w-fit"
            >
              <span>DISCOVER SYSTEM PROTOCOL</span>
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform text-[#D29A62]" />
            </button>
          </div>

          {/* Center Column: Portrait interior photo in rounded card */}
          <div className="lg:col-span-5">
            <div className="aspect-[3/4] w-full rounded-[24px] overflow-hidden border border-white/5 shadow-2xl relative group">
              <SmartImage 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200"
                fallbackSrc="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200"
                alt="Lumen & Loom Hand-poured Concrete Bath"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-8">
                <span className="font-mono text-[9px] tracking-widest text-[#F5F4F0] uppercase">
                  01 / TEA SALON OAK DETAILS
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Key materials & detailed stats */}
          <div className="lg:col-span-3 space-y-12 lg:pt-16">
            
            <div className="space-y-4">
              <span className="font-mono text-[9px] tracking-widest text-[#D29A62] font-semibold uppercase block">
                § PRIME COMPOSITIONS
              </span>
              <div className="h-[1px] bg-white/5 w-full"></div>
              <ul className="space-y-4 text-xs font-light text-elyse-taupe/80">
                <li className="flex items-start gap-2.5">
                  <Check size={12} className="text-[#D29A62] mt-0.5" />
                  <span>French lime wash and custom unbleached linen sheets</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={12} className="text-[#D29A62] mt-0.5" />
                  <span>Wild-harvested tropical hardwood joinery</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={12} className="text-[#D29A62] mt-0.5" />
                  <span>Integrated multi-tier organic oxygen scrubbers</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#121315]/75 p-6 rounded-[24px] border border-white/5 space-y-4">
              <span className="font-serif text-lg italic text-[#F5F4F0] font-light block">
                "Serenity is the physical shadow of spatial integrity."
              </span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-elyse-taupe/20">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400" 
                    alt="Iman Atelier"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-mono text-[8px] tracking-wider text-white block uppercase">IMAN ATELIER</span>
                  <span className="font-mono text-[7.5px] tracking-wider text-[#9A9892] block uppercase">DEVELOPMENT PRINCIPAL</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4 — PORTFOLIO / PROJECTS CAROUSEL (Lumiére Duplex Highlight) */}
      <section className="bg-[#121315] py-24 md:py-40 border-y border-white/5" id="portfolio">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-3">
              <span className="font-mono text-[10.5px] tracking-[0.3em] text-[#D29A62] font-semibold uppercase block">
                (OUR PROJECTS)
              </span>
              <h2 className="font-serif text-[42px] sm:text-[54px] md:text-[68px] leading-[0.85] text-[#F5F4F0] font-light uppercase tracking-tighter">
                LUMIÈRIAN HOMES
              </h2>
            </div>

            <div className="flex gap-3 font-mono text-[10.5px]">
              <button 
                onClick={() => setActiveTab('east')}
                className={`px-5 py-2 rounded-full border transition-all ${
                  activeTab === 'east' 
                    ? 'bg-white text-elyse-dark border-white' 
                    : 'text-elyse-taupe border-white/5 hover:border-white/20'
                }`}
              >
                (EAST SANCTUARY)
              </button>
              <button 
                onClick={() => setActiveTab('west')}
                className={`px-5 py-2 rounded-full border transition-all ${
                  activeTab === 'west' 
                    ? 'bg-white text-elyse-dark border-white' 
                    : 'text-elyse-taupe border-white/5 hover:border-white/20'
                }`}
              >
                (WEST PAVILION)
              </button>
              <button 
                onClick={() => setActiveTab('penthouse')}
                className={`px-5 py-2 rounded-full border transition-all ${
                  activeTab === 'penthouse' 
                    ? 'bg-white text-elyse-dark border-white' 
                    : 'text-elyse-taupe border-white/5 hover:border-white/20'
                }`}
              >
                (THE PENTHOUSE)
              </button>
            </div>
          </div>

          {/* Project Details Panel with Staggered horizontal layout */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              
              {/* Left Photo Card */}
              <div className="lg:col-span-4 space-y-4">
                <div className="aspect-[4/5] w-full rounded-[24px] overflow-hidden border border-white/5 shadow-xl relative group">
                  <SmartImage 
                    src={
                      activeTab === 'east' 
                        ? 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800'
                        : activeTab === 'west'
                          ? 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800'
                          : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800'
                    }
                    fallbackSrc="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800"
                    alt="Lumen & Loom Left Chambers"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex justify-between items-end">
                    <span className="font-mono text-[9px] tracking-wider text-white">CHAMBER VIEW</span>
                    <Maximize2 size={12} className="text-[#D29A62]" />
                  </div>
                </div>
                <p className="font-mono text-[9.5px] italic text-[#9A9892] pl-2 block">
                  {activeTab === 'east' ? '01 / The linen sleeping sanctuary designed for thermal regulation.' : '02 / Timber breeze corridors filtering direct sunlight.'}
                </p>
              </div>

              {/* Centered Meta Column */}
              <div className="lg:col-span-4 text-center space-y-6 px-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mx-auto bg-elyse-dark">
                  <Sparkles size={14} className="text-[#D29A62]" />
                </div>
                
                <div className="space-y-2">
                  <span className="font-mono text-[9.5px] text-[#D29A62] tracking-[0.2em] uppercase block">
                    {activeTab === 'east' ? 'BANGSAR EXCLUSIVES' : activeTab === 'west' ? 'DAMANSARA GLADES' : 'MONT KIARA CROWN'}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl text-white font-medium uppercase tracking-tight">
                    {activeTab === 'east' ? 'LUMIÈRE DUPLEX' : activeTab === 'west' ? 'WEST COURT VILLAS' : 'THE CROWN SANCTUARY'}
                  </h3>
                </div>

                <p className="text-xs text-elyse-taupe/80 leading-relaxed font-light max-w-sm mx-auto">
                  {activeTab === 'east' 
                    ? 'Two levels of organic air filtration, wild timber textures, and private internal rock gardens tucked quietly underneath high-rise ceiling voids.' 
                    : 'A stunning low-rise tropical courtyard bungalow designed with lava stone walls, continuous glass thresholds, and local craftsmanship detail.'}
                </p>

                <div className="pt-2">
                  <button 
                    onClick={() => scrollToSection('closing')}
                    className="px-6 py-2.5 rounded-full bg-white hover:bg-elyse-taupe hover:text-white transition-all text-elyse-dark font-mono text-[9px] tracking-widest uppercase font-medium shadow-md"
                  >
                    LEARN MORE
                  </button>
                </div>
              </div>

              {/* Right Photo Card */}
              <div className="lg:col-span-4 space-y-4">
                <div className="aspect-[4/5] w-full rounded-[24px] overflow-hidden border border-white/5 shadow-xl relative group">
                  <SmartImage 
                    src={
                      activeTab === 'east' 
                        ? 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800'
                        : activeTab === 'west'
                          ? 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800'
                          : 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800'
                    }
                    fallbackSrc="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800"
                    alt="Lumen & Loom Right Chambers"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex justify-between items-end">
                    <span className="font-mono text-[9px] tracking-wider text-white">RESTORATIVE SPA ZONE</span>
                    <Maximize2 size={12} className="text-[#D29A62]" />
                  </div>
                </div>
                <p className="font-mono text-[9.5px] italic text-[#9A9892] pl-2 block text-right">
                  {activeTab === 'east' ? '02 / Polished travertine bath structure aligned with natural dusk winds.' : '04 / Deep earth-textured private dipping pools.'}
                </p>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* SECTION 5 — VALUES (Semi-transparent glass stagger reveal) */}
      <section className="relative py-32 md:py-48 bg-elyse-dark" id="values">
        
        {/* Soft focus atmospheric background photo */}
        <div className="absolute inset-0 w-full h-full opacity-15 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600" 
            alt="Soft blurred interior background"
            className="w-full h-full object-cover blur-md"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Dynamic spotlight reflection */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#D29A62]/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
          
          {/* Section top info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-white/5 pb-10">
            <div className="lg:col-span-8">
              <span className="font-mono text-[10.5px] tracking-[0.3em] text-[#D29A62] font-semibold uppercase block mb-3">
                (OUR COVENANT & VALUES)
              </span>
              <h2 className="font-serif text-[42px] sm:text-[52px] leading-tight text-[#F5F4F0] font-light uppercase">
                FIVE CORNERSTONES OF <span className="font-serif italic font-light text-elyse-taupe">LUMEN & LOOM LIVING</span>
              </h2>
            </div>
            
            <div className="lg:col-span-4 lg:pt-6">
              <p className="text-xs text-elyse-taupe/80 leading-relaxed font-light">
                To construct and foster a transcendent style of living that treats silence, structural discretion, and local materials as supreme luxury items.
              </p>
            </div>
          </div>

          {/* Staggered Glass Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                num: "01",
                icon: <Heart size={16} className="text-[#D29A62]" />,
                title: "HOLISTIC WELL-BEING",
                desc: "Every spatial dynamic is optimized to support circadian balance and clean breathing loops."
              },
              {
                num: "02",
                icon: <Shield size={16} className="text-[#D29A62]" />,
                title: "DISCRETION & SHIELD",
                desc: "Complete acoustic isolating barriers and visual buffers ensure maximum household sanctuary privacy."
              },
              {
                num: "03",
                icon: <Compass size={16} className="text-[#D29A62]" />,
                title: "CULTURAL ENRICHMENT",
                desc: "Integrating seasoned wild Malaysian timber structures, stone masonry, and hand-molded items."
              },
              {
                num: "04",
                icon: <Activity size={16} className="text-[#D29A62]" />,
                title: "ATMOSPHERIC SERENITY",
                desc: "Pure airflow circulation and low-emissivity glass to guarantee balanced thermal zones."
              },
              {
                num: "05",
                icon: <Sparkles size={16} className="text-[#D29A62]" />,
                title: "SUSTAINABLE INTEGRITY",
                desc: "Sourcing regional zero-carbon-footprint stone blocks and planting local structural forests."
              }
            ].map((valueItem, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/10 rounded-[24px] p-6 flex flex-col justify-between h-[280px] hover:border-[#D29A62]/40 transition-all duration-300 group cursor-pointer shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-elyse-taupe/60">({valueItem.num})</span>
                  <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#D29A62]/10 transition-colors">
                    {valueItem.icon}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-serif text-lg font-medium text-white tracking-wide uppercase leading-tight group-hover:text-[#D29A62] transition-colors">
                    {valueItem.title}
                  </h4>
                  <p className="text-[11.5px] leading-relaxed text-elyse-taupe/80 font-light">
                    {valueItem.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 6 — CLOSING & CTA ENQUIRY FORM */}
      <section className="relative min-h-screen flex items-center justify-center bg-elyse-dark border-t border-white/5 py-24" id="closing">
        
        {/* Full bleed closing dusk image */}
        <div className="absolute inset-0 w-full h-full scale-[1.01] opacity-25 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600" 
            alt="Closing Lumen & Loom dusk glass house"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          
          {/* Left Column - Big Title & branding details */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <span className="font-mono text-[10.5px] tracking-[0.3em] text-[#D29A62] font-semibold uppercase block">
              § COMMENCE ENQUIRY
            </span>
            
            <h2 className="font-serif text-[45px] sm:text-[62px] lg:text-[76px] leading-[0.85] text-[#F5F4F0] font-light uppercase tracking-tighter">
              A SILENT <br />
              <span className="font-serif italic font-light text-elyse-taupe">SANCTUARY</span> <br />
              AWAITS
            </h2>
            
            <div className="space-y-4 max-w-md">
              <p className="text-sm text-elyse-taupe/85 leading-relaxed font-light">
                We are accepting select private commissions within Malaysia and Singapore for late 22026/2027 handover dates. Reach out to coordinate an on-site sensory walk.
              </p>
              
              <div className="space-y-2 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 text-xs text-elyse-taupe font-mono">
                  <MapPin size={13} className="text-[#D29A62]" />
                  <span>BANGSAR RIDGE STUDIO, KUALA LUMPUR</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-elyse-taupe font-mono">
                  <Mail size={13} className="text-[#D29A62]" />
                  <span>CONCIERGE@LUMENANDLOOM.MY</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-elyse-taupe font-mono">
                  <Phone size={13} className="text-[#D29A62]" />
                  <span>+60 (3) 8802 9100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card Form */}
          <div className="lg:col-span-6">
            <div className="bg-[#121315]/90 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 md:p-10 shadow-2xl relative">
              
              <AnimatePresence mode="wait">
                {!contactSuccess ? (
                  <motion.form 
                    key="form"
                    onSubmit={handleBookingSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="space-y-1">
                      <h3 className="font-serif text-2xl font-light text-white">
                        Request Private Curation
                      </h3>
                      <p className="text-[11.5px] text-elyse-taupe/70 font-mono uppercase tracking-wider">
                        ESTABLISH PRE-ACCREDITED RESIDENCE REGISTRATION
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[8px] tracking-[0.2em] text-[#9A9892] uppercase block">
                          YOUR FAMILY NAME / NAME
                        </label>
                        <input 
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Iman Suria"
                          className="w-full bg-white/5 border border-white/10 focus:border-[#D29A62] text-sm text-white px-4 py-3 rounded-xl focus:outline-none transition-all placeholder:text-elyse-taupe/30"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[8px] tracking-[0.2em] text-[#9A9892] uppercase block">
                          SECURE EMAIL ADDRESS
                        </label>
                        <input 
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. iman@atelier.com"
                          className="w-full bg-white/5 border border-white/10 focus:border-[#D29A62] text-sm text-white px-4 py-3 rounded-xl focus:outline-none transition-all placeholder:text-elyse-taupe/30"
                        />
                      </div>

                      {/* Interest Choice */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[8px] tracking-[0.2em] text-[#9A9892] uppercase block">
                          ESTATE OF INTEREST
                        </label>
                        <select 
                          value={interest}
                          onChange={(e) => setInterest(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 focus:border-[#D29A62] text-xs text-white px-4 py-3.5 rounded-xl focus:outline-none transition-all cursor-pointer"
                        >
                          <option value="lumiere" className="bg-[#121315] text-white">LUMIÈRE DUPLEX (EAST SANCTUARY)</option>
                          <option value="west" className="bg-[#121315] text-white">WEST COURT VILLAS (DAMANSARA)</option>
                          <option value="crown" className="bg-[#121315] text-white">THE CROWN SANCTUARY (MONT KIARA)</option>
                        </select>
                      </div>
                    </div>

                    <p className="text-[10px] text-elyse-taupe/65 font-light">
                      By submitting, you agree to secure material checks and validation of spatial matching metrics.
                    </p>

                    <button
                      type="submit"
                      disabled={submitLoading}
                      className="w-full py-4 rounded-xl bg-white hover:bg-[#D29A62] text-elyse-dark hover:text-white transition-all font-mono text-[11px] font-semibold tracking-widest uppercase shadow-xl flex items-center justify-center gap-3 border-none"
                    >
                      {submitLoading ? (
                        <div className="w-5 h-5 border border-elyse-dark/30 border-t-elyse-dark rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>SUBMIT PRE-QUALIFICATION</span>
                          <ChevronRight size={13} />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    className="space-y-6 text-center py-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-[#D29A62]/10 border border-[#D29A62]/30 flex items-center justify-center mx-auto text-[#D29A62]">
                      <Check size={26} />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-serif text-3xl font-light text-white">
                        Enquiry Commenced
                      </h4>
                      <p className="text-xs text-elyse-taupe leading-relaxed font-light max-w-sm mx-auto">
                        Thank you. Your request is registered under the Lumen & Loom physical vetting protocol. An organic concierge agent will reach out in 24 hours.
                      </p>
                    </div>

                    <button 
                      onClick={() => setContactSuccess(false)}
                      className="px-6 py-2.5 rounded-full border border-white/10 hover:border-white transition-colors text-[9px] font-mono tracking-widest uppercase text-elyse-taupe"
                    >
                      SUBMIT ANOTHER REQUEST
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-16 px-6 md:px-12 bg-[#121315] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-baseline justify-between gap-8">
          
          <div className="space-y-3">
            <span className="font-serif text-2xl font-light tracking-wide text-white block">
              LUMEN & LOOM
            </span>
            <span className="font-mono text-[8px] tracking-[0.3em] text-elyse-taupe uppercase block">
              HOLISTIC COVENANT · LUXURY BY DESIGN
            </span>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[9.5px] tracking-widest text-[#9A9892] uppercase">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">
              (TOP)
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">
              (ABOUT)
            </button>
            <button onClick={() => scrollToSection('portfolio')} className="hover:text-white transition-colors">
              (PORTFOLIO)
            </button>
            <button onClick={() => scrollToSection('values')} className="hover:text-white transition-colors">
              (VALUES)
            </button>
            <button onClick={() => scrollToSection('closing')} className="hover:text-white transition-colors">
              (Curator)
            </button>
          </div>

          <div className="text-right text-[#9A9892] font-mono text-[9px] tracking-wider leading-relaxed">
            <p>© 2026 Lumen & Loom · Deep Luxe Digital Experience · Kuala Lumpur</p>
            <p className="opacity-40">All architectural plans certified green sustainable.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
