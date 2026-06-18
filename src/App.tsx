/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Page, Project } from './types';
import { projectsData } from './data';

import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import HomeView from './components/HomeView';
import ProjectsView from './components/ProjectsView';
import ProjectDetailView from './components/ProjectDetailView';
import StudioView from './components/StudioView';
import ProcessView from './components/ProcessView';
import ContactView from './components/ContactView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
  
  // Custom cursor magnifier cursor state
  const [hoverType, setHoverType] = useState<'project' | 'drag' | 'none'>('none');

  // Synchronize browser address hash with active rendering state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      
      if (hash.startsWith('projects/')) {
        const slug = hash.replace('projects/', '');
        const projectExists = projectsData.find(p => p.slug === slug);
        if (projectExists) {
          setSelectedProjectSlug(slug);
          setCurrentPage('project-detail');
        } else {
          setCurrentPage('projects');
          setSelectedProjectSlug(null);
        }
      } else if (['projects', 'studio', 'process', 'contact'].includes(hash)) {
        setCurrentPage(hash as Page);
        setSelectedProjectSlug(null);
      } else {
        setCurrentPage('home');
        setSelectedProjectSlug(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial sync
    if (window.location.hash) {
      handleHashChange();
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash path manually during state routing clicks
  const navigateWithHash = (pageName: Page, slug: string | null = null) => {
    setCurrentPage(pageName);
    setSelectedProjectSlug(slug);
    
    if (pageName === 'project-detail' && slug) {
      window.location.hash = `#/.../projects/${slug}`;
    } else if (pageName === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = `#/${pageName}`;
    }
    
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const activeProject = selectedProjectSlug 
    ? projectsData.find(project => project.slug === selectedProjectSlug) 
    : null;

  return (
    <div className="relative min-h-screen bg-bone text-charcoal font-sans flex flex-col selection:bg-taupe/35 selection:text-charcoal" id="lumen-loom-app-root">
      
      {/* Subtle paper film grain texture layered across entire viewport */}
      <div className="grain-overlay" />

      {/* Modern Pointer Sprites (Mouse magnifier helper widget) */}
      <CustomCursor hoverType={hoverType} />

      {/* Clean Global Branding Header Navigation */}
      <Navigation 
        currentPage={currentPage}
        setCurrentPage={(page) => navigateWithHash(page)}
        setSelectedProjectSlug={setSelectedProjectSlug}
      />

      {/* Main Multi-Route Workspace with Quiet Slow-Fade Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + (selectedProjectSlug || '')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
            className="w-full"
          >
            {currentPage === 'home' && (
              <HomeView 
                projects={projectsData}
                setCurrentPage={(page) => navigateWithHash(page as Page)}
                setSelectedProjectSlug={(slug) => navigateWithHash('project-detail', slug)}
                onHoverState={setHoverType}
              />
            )}

            {currentPage === 'projects' && (
              <ProjectsView 
                projects={projectsData}
                setCurrentPage={(page) => navigateWithHash(page as Page)}
                setSelectedProjectSlug={(slug) => navigateWithHash('project-detail', slug)}
                onHoverState={setHoverType}
              />
            )}

            {currentPage === 'project-detail' && activeProject && (
              <ProjectDetailView 
                project={activeProject}
                setCurrentPage={(page) => navigateWithHash(page as Page)}
                setSelectedProjectSlug={(slug) => navigateWithHash('project-detail', slug)}
                onHoverState={setHoverType}
              />
            )}

            {currentPage === 'studio' && (
              <StudioView 
                onHoverState={setHoverType}
              />
            )}

            {currentPage === 'process' && (
              <ProcessView />
            )}

            {currentPage === 'contact' && (
              <ContactView />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Quietly Placed Fine-Print Footer */}
      <footer className="border-t border-taupe/15 py-12 px-6 md:px-12 bg-sand/30" id="lumen-loom-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-baseline justify-between gap-6">
          <div className="space-y-2">
            <span className="font-serif text-[17px] font-medium tracking-wide">
              Lumen <span className="italic font-light text-taupe">&amp;</span> Loom
            </span>
            <p className="font-mono text-[9px] tracking-widest text-taupe uppercase">
              RESTORATION &amp; MODERN CURATION ATELIER · 2026
            </p>
          </div>

          {/* Quick Footer Sitemap */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[10px] tracking-wider text-taupe uppercase">
            <button onClick={() => navigateWithHash('home')} className="hover:text-charcoal transition-colors">Intro</button>
            <button onClick={() => navigateWithHash('projects')} className="hover:text-charcoal transition-colors">Repertory</button>
            <button onClick={() => navigateWithHash('process')} className="hover:text-charcoal transition-colors">Process</button>
            <button onClick={() => navigateWithHash('studio')} className="hover:text-charcoal transition-colors">Studio</button>
            <button onClick={() => navigateWithHash('contact')} className="hover:text-charcoal transition-colors">Register</button>
          </div>

          <div className="text-right text-mono">
            <p className="font-mono text-[10px] tracking-wider text-taupe" id="footer-copyright-note">
              © 2026 Lumen &amp; Loom · Demo site by Bluebutter Studio · bluebutterstudio.my
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
