/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Project } from '../types';
import { LayoutGrid, List, CornerDownRight, ArrowUpRight } from 'lucide-react';
import SmartImage from './SmartImage';

interface ProjectsViewProps {
  projects: Project[];
  setCurrentPage: (page: string) => void;
  setSelectedProjectSlug: (slug: string | null) => void;
  onHoverState: (type: 'project' | 'drag' | 'none') => void;
}

export default function ProjectsView({
  projects,
  setCurrentPage,
  setSelectedProjectSlug,
  onHoverState
}: ProjectsViewProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [conceptualDetail, setConceptualDetail] = useState<string | null>(null);

  // Group unique locations for modern filter buttons
  const locations = ['all', 'Kuala Lumpur', 'Singapore'];

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(p => p.location.includes(selectedFilter));

  const handleProjectSelect = (slug: string) => {
    // We only have the full Case Study page for Bangsar Townhouse
    if (slug === 'bangsar-townhouse') {
      setSelectedProjectSlug(slug);
      setCurrentPage('project-detail');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      // Toggle conceptual expand inline
      setConceptualDetail(conceptualDetail === slug ? null : slug);
    }
    onHoverState('none');
  };

  return (
    <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto space-y-16" id="projects-view-container">
      
      {/* 1. ARCHIVE HEADER WITH CORNER NUMBERS */}
      <div className="relative border-b border-taupe/15 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        
        {/* Section marker */}
        <div className="absolute -top-4 left-0 font-mono text-[9px] tracking-[0.25em] text-taupe uppercase">
          § 01 GALLERY REPERTORY
        </div>

        <div className="space-y-3">
          <h1 className="font-serif text-[48px] sm:text-6xl md:text-7xl text-charcoal tracking-[-0.04em] leading-[0.85] font-light italic">
            Selected <span className="font-semibold text-charcoal block sm:inline font-serif">Residences</span>
          </h1>
          <p className="text-xs md:text-sm text-taupe max-w-md font-light leading-relaxed">
            A chronological survey of restored architectural frameworks, custom millwork installations and curated residential interiors.
          </p>
        </div>

        {/* Layout Filter & Controls panel */}
        <div className="flex flex-wrap items-center gap-6 font-mono text-[10px] tracking-widest text-charcoal">
          
          {/* Location filter */}
          <div className="flex items-center gap-2">
            <span className="text-taupe uppercase text-[9px]">LOCATIONS:</span>
            <div className="flex gap-2">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedFilter(loc)}
                  className={`px-3 py-1 border transition-colors ${
                    selectedFilter === loc 
                      ? 'bg-charcoal text-bone border-charcoal' 
                      : 'border-taupe/25 text-taupe hover:text-charcoal hover:border-taupe'
                  }`}
                  id={`filter-${loc.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {loc.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="h-4 w-[1px] bg-taupe/20 hidden sm:block"></div>

          {/* Grid vs List toggle */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 border transition-colors ${
                viewMode === 'grid' ? 'bg-charcoal text-bone border-charcoal' : 'border-taupe/20 text-taupe hover:text-charcoal'
              }`}
              title="Grid Layout"
              id="projects-grid-toggle"
            >
              <LayoutGrid size={13} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 border transition-colors ${
                viewMode === 'list' ? 'bg-charcoal text-bone border-charcoal' : 'border-taupe/20 text-taupe hover:text-charcoal'
              }`}
              title="Digest List Layout"
              id="projects-list-toggle"
            >
              <List size={13} />
            </button>
          </div>

        </div>
      </div>

      {/* 2. GALLERY PRESENTATION */}
      {viewMode === 'grid' ? (
        
        /* MASONRY ASYMMETRIC GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 pt-4">
          {filteredProjects.map((project, index) => {
            const isBangsar = project.slug === 'bangsar-townhouse';
            
            // Asymmetrical visual sizing across grid for design rhythm
            const isBroadCard = index % 3 === 0;

            return (
              <div
                key={project.slug}
                onClick={() => handleProjectSelect(project.slug)}
                className={`space-y-6 group cursor-pointer ${
                  isBroadCard ? 'lg:col-span-2 lg:pr-12' : 'lg:col-span-1'
                }`}
                id={`project-tile-${project.slug}`}
              >
                {/* Image / Gradient Container */}
                <div className={`relative border border-charcoal/5 overflow-hidden bg-sand/20 ${
                  isBroadCard ? 'aspect-[16/10]' : 'aspect-[4/5]'
                }`}>
                  
                  {isBangsar ? (
                    <SmartImage
                      src={project.heroImage}
                      fallbackSrc={project.imageUrl}
                      alt={project.title}
                      onHoverState={(isHovered) => onHoverState(isHovered ? 'project' : 'none')}
                    />
                  ) : (
                    /* High-craft Custom Gradient Block representing Brand Muted Colors */
                    <div className="w-full h-full flex flex-col justify-between p-8 md:p-12 bg-gradient-to-tr from-sand/35 via-bone to-taupe/20 relative transition-transform duration-500 hover:scale-[1.015]">
                      
                      {/* Geometric architecture divider line */}
                      <div className="absolute inset-x-8 top-1/2 h-[1px] bg-taupe/15"></div>
                      <div className="absolute left-[40%] inset-y-8 w-[1px] bg-taupe/15"></div>

                      <div className="flex justify-between items-start font-mono text-[9px] text-taupe tracking-widest z-10">
                        <span>RESIDENCE NO. 0{index + 1}</span>
                        <span>{project.size}</span>
                      </div>

                      <div className="z-10">
                        <span className="font-mono text-[8px] text-taupe tracking-[0.25em] uppercase block mb-1">
                          {project.type}
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl text-charcoal italic font-light tracking-tight">
                          {project.title}
                        </h2>
                      </div>

                      <div className="flex justify-between items-end z-10 font-mono text-[9px] text-taupe">
                        <span>{project.location}</span>
                        <span>{project.year}</span>
                      </div>
                    </div>
                  )}

                  {/* Absolute subtle visual hint of interactable study */}
                  <div className="absolute bottom-4 right-4 bg-charcoal/90 text-bone border-none px-3 py-1 font-mono text-[8px] tracking-[0.2em] uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {isBangsar ? 'View Study Study →' : 'Reveal Scope (Concept) ↴'}
                  </div>
                </div>

                {/* Main description footer text */}
                <div className="space-y-2 px-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif text-xl md:text-2xl font-light text-charcoal group-hover:text-taupe transition-colors duration-300">
                      {project.title}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest text-taupe">{project.year}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-[11px] text-taupe font-mono tracking-widest">
                    <span>{project.location}</span>
                    <span className="uppercase text-[9px] text-taupe/65 font-medium">{project.duration}</span>
                  </div>

                  {/* Conceptual Drawer Details Expand Inline */}
                  {conceptualDetail === project.slug && (
                    <div className="mt-4 p-5 bg-sand/30 border border-taupe/15 space-y-4 animate-fade-in cursor-default" onClick={(e) => e.stopPropagation()}>
                      <p className="text-xs text-taupe leading-relaxed font-light">
                        <strong>Overview:</strong> {project.overview}
                      </p>
                      <p className="text-xs text-taupe leading-relaxed font-light">
                        <strong>Spatial Approach:</strong> {project.approach}
                      </p>
                      <div className="pt-2 flex justify-between items-center text-[9px] uppercase font-mono text-taupe border-t border-taupe/10">
                        <span>LEAD: {project.leadDesigner}</span>
                        <span className="text-charcoal">CONCEPT STAGE DONE · NO PHYSICAL STUDY</span>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        
        /* DETAILED LIST LAYOUT */
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-12 gap-4 font-mono text-[9px] tracking-widest text-taupe border-b border-taupe/10 pb-3 uppercase px-4">
            <span className="col-span-1">ID</span>
            <span className="col-span-4">REPERTORY NAME</span>
            <span className="col-span-3">PROJECT LAYER</span>
            <span className="col-span-2">LOCATION</span>
            <span className="col-span-1">YEAR</span>
            <span className="col-span-1 text-right">ACTION</span>
          </div>

          {filteredProjects.map((project, index) => {
            const isBangsar = project.slug === 'bangsar-townhouse';
            return (
              <div
                key={project.slug}
                onClick={() => handleProjectSelect(project.slug)}
                className="grid grid-cols-12 gap-4 items-center border-b border-taupe/10 py-5 hover:bg-sand/30 transition-colors duration-300 px-4 cursor-pointer group"
                id={`project-list-${project.slug}`}
              >
                <span className="col-span-1 font-mono text-xs text-taupe">0{index + 1}</span>
                
                <span className="col-span-4 font-serif text-lg md:text-xl text-charcoal group-hover:text-taupe transition-colors duration-300">
                  {project.title} <span className="font-mono text-[9px] tracking-[0.2em] text-taupe font-light">/ {project.size}</span>
                </span>
                
                <span className="col-span-3 font-mono text-[10px] tracking-wider text-taupe uppercase truncate">
                  {project.type}
                </span>
                
                <span className="col-span-2 font-mono text-[11px] tracking-wider text-taupe">
                  {project.location}
                </span>
                
                <span className="col-span-1 font-mono text-xs text-taupe">
                  {project.year}
                </span>

                <span className="col-span-1 text-right font-mono text-[10px] tracking-wider text-charcoal">
                  {isBangsar ? (
                    <span className="inline-flex items-center gap-1 group-hover:underline">
                      STUDY <ArrowUpRight size={12} />
                    </span>
                  ) : (
                    <span className="text-taupe/60 italic text-[9px]">
                      CONCEPT
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. LOWER METRIC BLOCK */}
      <div className="border-t border-taupe/15 pt-12 flex flex-col sm:flex-row items-baseline justify-between gap-6 text-center sm:text-left">
        <p className="font-mono text-[9px] tracking-[0.25em] text-taupe uppercase">
          LUMEN &amp; LOOM CO. ALL IMAGES DOCUMENTED PERMISSION APPRECIATED.
        </p>
        <span className="font-mono text-xs text-taupe">
          TOTAL ENTRIES: 06 // ACTIVE STUDIES: 01
        </span>
      </div>

    </div>
  );
}
