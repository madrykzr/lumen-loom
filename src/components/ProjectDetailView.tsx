/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from '../types';
import { ArrowLeft, ArrowUpRight, Share2, CornerDownRight } from 'lucide-react';
import { useState } from 'react';
import SmartImage from './SmartImage';
import BeforeAfterSlider from './BeforeAfterSlider';

interface ProjectDetailViewProps {
  project: Project;
  setCurrentPage: (page: string) => void;
  setSelectedProjectSlug: (slug: string | null) => void;
  onHoverState: (type: 'project' | 'drag' | 'none') => void;
}

export default function ProjectDetailView({
  project,
  setCurrentPage,
  setSelectedProjectSlug,
  onHoverState
}: ProjectDetailViewProps) {
  const [copied, setCopied] = useState(false);

  // Fallback triggers for images if the local assets aren't loaded in the sandbox
  const heroFallback = 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1600';
  const beforeFallback = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600';
  const afterFallback = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600';

  const handleBack = () => {
    setSelectedProjectSlug(null);
    setCurrentPage('projects');
    window.scrollTo({ top: 0, behavior: 'instant' });
    onHoverState('none');
  };

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pb-24 space-y-20 md:space-y-32" id="project-detail-view-container">
      
      {/* 1. EDITORIAL HEADER & METRICS GRID */}
      <section className="px-6 md:px-12 pt-8 max-w-7xl mx-auto space-y-10">
        
        {/* Back Link and Metadata Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-taupe/15 pb-6 font-mono text-[10px] tracking-widest text-taupe gap-4">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-charcoal hover:opacity-70 transition-opacity"
            id="detail-back-btn"
          >
            <ArrowLeft size={14} /> Back to Repertory
          </button>
          
          <div className="flex items-center gap-4">
            <span className="uppercase text-charcoal font-medium">CASE STUDY: {project.slug.toUpperCase()}</span>
            <span>·</span>
            <span>ENTRY 01 / 01</span>
          </div>

          <button 
            onClick={handleShare}
            className="flex items-center gap-1.5 hover:text-charcoal transition-colors duration-300"
            id="detail-share-btn"
          >
            <Share2 size={12} className="text-charcoal" /> 
            {copied ? 'LINK DUPLICATED' : 'SHARE STUDY'}
          </button>
        </div>

        {/* Big Editorial Title */}
        <div className="space-y-4">
          <div className="font-mono text-[9px] tracking-[0.25em] text-taupe uppercase">
            § 01 MONOGRAPH DIRECTORY
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-6">
            <h1 className="font-serif text-[48px] sm:text-6xl md:text-7xl text-charcoal tracking-[-0.04em] leading-[0.85] font-light italic">
              {project.title}, <span className="font-semibold text-charcoal font-serif">{project.year}</span>
            </h1>
            
            <div className="font-mono text-xs text-taupe tracking-wider max-w-xs leading-relaxed border-l-2 border-taupe/15 pl-4 py-1">
              {project.type}
            </div>
          </div>
        </div>

        {/* Project Facts Matrix Block */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pt-6 border-t border-taupe/15">
          <div className="space-y-1.5">
            <span className="font-mono text-[9px] text-taupe uppercase tracking-widest block">Geographic Location</span>
            <span className="text-sm font-medium text-charcoal block">{project.location}</span>
          </div>
          
          <div className="space-y-1.5">
            <span className="font-mono text-[9px] text-taupe uppercase tracking-widest block">Interior Floor Area</span>
            <span className="text-sm font-medium text-charcoal block">{project.size}</span>
          </div>
          
          <div className="space-y-1.5">
            <span className="font-mono text-[9px] text-taupe uppercase tracking-widest block">Physical Duration</span>
            <span className="text-sm font-medium text-charcoal block">{project.duration}</span>
          </div>

          <div className="space-y-1.5">
            <span className="font-mono text-[9px] text-taupe uppercase tracking-widest block">Lead Curation</span>
            <span className="text-sm font-medium text-charcoal block">{project.leadDesigner}</span>
          </div>

          <div className="space-y-1.5 col-span-2 md:col-span-4 lg:col-span-1 border-t md:border-t-0 pt-4 md:pt-0 lg:border-l lg:border-taupe/15 lg:pl-8">
            <span className="font-mono text-[9px] text-taupe uppercase tracking-widest block">Fee Matrix reference</span>
            <span className="text-xs font-mono font-medium text-taupe block">STANDARD APARTMENT RATE</span>
          </div>
        </div>

      </section>

      {/* 2. SCROLL-PINNED SPLIT SECTION */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: SCROLL-PINED/STICKY HERO (DESKTOP ACTIVE, MOBILE STANDARD) */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 lg:h-[calc(100vh-200px)] w-full overflow-hidden border border-charcoal/5 bg-sand/25">
            <div className="w-full h-full min-h-[350px] lg:min-h-0">
              <SmartImage
                src={project.heroImage}
                fallbackSrc={heroFallback}
                alt="Bangsar Townhouse Main View"
                className="w-full h-full object-cover"
                onHoverState={(isHovered) => onHoverState(isHovered ? 'project' : 'none')}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: SCROLLING MONOGRAPH CONTENT */}
          <div className="lg:col-span-5 space-y-12">
            
            <div className="space-y-4">
              <div className="font-mono text-[9px] tracking-[0.25em] text-taupe uppercase">
                § 02 SPATIAL CHRONICLE
              </div>
              <h2 className="font-serif text-3xl text-charcoal font-light leading-snug">
                Restoring a Kuala Lumpur heritage frame.
              </h2>
            </div>

            {/* Narrative Paragraph blocks */}
            <div className="space-y-6 text-[14px] leading-relaxed text-taupe font-light">
              <p className="first-line:uppercase first-line:tracking-wider first-letter:text-4xl first-letter:font-serif first-letter:mr-2 first-letter:float-left first-letter:text-charcoal">
                {project.overview}
              </p>
              
              {project.paragraphs?.map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Asymmetric Technical Detail block */}
            <div className="border-t border-taupe/15 pt-8 space-y-6">
              <h3 className="font-serif text-2xl text-charcoal italic font-light">Envelope Customizations</h3>
              
              <div className="space-y-4">
                {project.details?.map((detail, idx) => (
                  <div key={idx} className="border-b border-taupe/10 pb-3 flex justify-between items-baseline gap-2">
                    <span className="font-mono text-[10px] uppercase text-taupe">{detail.label}</span>
                    <span className="text-xs text-charcoal font-light text-right max-w-xs">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE BEFORE/AFTER SLIDER BOX */}
      <section className="bg-sand/35 py-20 border-y border-taupe/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-6">
            <div className="space-y-2">
              <div className="font-mono text-[9px] tracking-[0.25em] text-taupe uppercase">
                § 03 COMPARATIVE ANALYSIS
              </div>
              <h2 className="font-serif text-3xl text-charcoal font-light">
                The Heritage Intervention
              </h2>
            </div>
            <p className="text-xs md:text-sm text-taupe max-w-md font-light leading-relaxed">
              Drag the center divider handle left and right to inspect the original stripped concrete and clay-brick layout (Before) compared with our custom lime wash and walnut curations (After).
            </p>
          </div>

          <div className="shadow-xl">
            <BeforeAfterSlider
              beforeImg={project.beforeImage || '/bangsar-before.jpg'}
              afterImg={project.afterImage || '/bangsar-after.jpg'}
              beforeFallback={beforeFallback}
              afterFallback={afterFallback}
              onHoverState={(isHovered) => onHoverState(isHovered ? 'drag' : 'none')}
            />
          </div>

        </div>
      </section>

      {/* 4. SPECIFICATION SHEET AND MATERIAL MATRIX */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto space-y-12">
        <div className="font-mono text-[9px] tracking-[0.25em] text-taupe uppercase text-center md:text-left">
          § 04 ATMOSPHERIC BLUEPRINT DATA
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-taupe/15 pt-8">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <h3 className="font-mono text-[11px] tracking-widest text-taupe uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-taupe"></span>
              04A / SCOPE & SERVICE
            </h3>
            <p className="text-sm font-serif text-charcoal font-light tracking-wide leading-relaxed">
              {project.specs?.scope}
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-4">
            <h3 className="font-mono text-[11px] tracking-widest text-taupe uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-taupe"></span>
              04B / PHYSICAL TEXTURES
            </h3>
            <p className="text-sm font-serif text-taupe font-light italic tracking-wide leading-relaxed">
              {project.specs?.materials}
            </p>
          </div>

          {/* Col 3 */}
          <div className="space-y-4">
            <h3 className="font-mono text-[11px] tracking-widest text-taupe uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-taupe"></span>
              04C / FF&amp;E CURATION
            </h3>
            <p className="text-sm font-serif text-charcoal font-light tracking-wide leading-relaxed">
              {project.specs?.curation}
            </p>
          </div>

        </div>

        {/* Bottom Navigation Call */}
        <div className="pt-12 border-t border-taupe/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-charcoal hover:opacity-70 transition-opacity"
          >
            ← Back to repertory
          </button>
          
          <span className="font-mono text-[9px] text-taupe tracking-wider uppercase">
            Lumen &amp; Loom Atelier, Kuala Lumpur © 2026 
          </span>
        </div>

      </section>

    </div>
  );
}
