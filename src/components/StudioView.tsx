/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PressItem } from '../types';
import { studioPhilosophy, pressItems } from '../data';
import { ArrowUpRight } from 'lucide-react';
import SmartImage from './SmartImage';

interface StudioViewProps {
  onHoverState: (type: 'project' | 'drag' | 'none') => void;
}

export default function StudioView({ onHoverState }: StudioViewProps) {
  // Graceful Southeast Asian female professional fallback portrait 
  const portraitFallback = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800';

  return (
    <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto space-y-24 md:space-y-40" id="studio-view-container">
      
      {/* 1. STUDIO ESSENCE INTRO */}
      <section className="relative border-b border-taupe/15 pb-16 space-y-10">
        <div className="absolute -top-4 left-0 font-mono text-[9px] tracking-[0.25em] text-taupe uppercase">
          § 01 ATELIER BIOMETRY
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <h1 className="font-serif text-[48px] sm:text-6xl md:text-7xl text-charcoal tracking-[-0.04em] leading-[0.85] font-light italic">
              Silent design from <br />
              <span className="font-semibold text-charcoal">within</span> Kuala Lumpur.
            </h1>
            
            <p className="font-mono text-xs text-taupe tracking-wider uppercase">
              ESTABLISHED IN 2020 · MALAYSIA &amp; SINGAPORE
            </p>
          </div>

          {/* Philosophy Text Blocks */}
          <div className="lg:col-span-7 space-y-8 text-[14px] leading-relaxed text-taupe font-light">
            <p className="text-xl font-serif text-charcoal font-light leading-relaxed">
              {studioPhilosophy.intro}
            </p>
            
            {studioPhilosophy.paragraphs.map((p, idx) => (
              <p key={idx} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

        </div>
      </section>

      {/* 2. THE FOUNDER / PRINCIPAL SECTION */}
      <section className="bg-sand/35 py-12 px-6 md:p-16 border border-taupe/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="aspect-[3/4] max-w-sm mx-auto border border-charcoal/5 shadow-md bg-bone">
              <SmartImage
                src="/iman-portrait.jpg"
                fallbackSrc={portraitFallback}
                alt="Iman Suria Principal Designer Portrait"
                onHoverState={(isHovered) => onHoverState(isHovered ? 'project' : 'none')}
              />
            </div>
          </div>

          {/* Bio Description / Background Column */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-taupe uppercase tracking-widest block">§ STUDIO PRINCIPAL</span>
              <h2 className="font-serif text-[38px] sm:text-5xl md:text-6xl text-charcoal font-light leading-[0.95] tracking-[-0.03em] italic">
                Iman Suria <span className="font-semibold text-charcoal block sm:inline">Creative Director</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm text-taupe leading-relaxed font-light">
              <p>
                Iman Suria founded Lumen &amp; Loom in 2020 after a decade of honing her craft in prestigious architectural environments. Educated at the Bartlett School of Architecture (London), she researched modern minimalist restoration techniques under renowned European preservationists.
              </p>
              <p>
                Following her studies, she relocated to Singapore, working as senior associate at SCDA Architects where she supervised the material compositions and spatial designs for high-end boutique hotels across East Asia.
              </p>
              <p className="italic text-charcoal font-serif">
                “I design environments where the mind is given room to listen. Quiet space brings order to the chaos of modern living.”
              </p>
            </div>

            {/* Micro credentials list */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-taupe/20 font-mono text-[10px] uppercase tracking-widest text-taupe">
              <div>
                <span className="text-charcoal block mb-1">Bartlett, UCL</span>
                <span>BA(HONS) ARCHITECTURE, LONDON</span>
              </div>
              <div>
                <span className="text-charcoal block mb-1">SCDA Architects</span>
                <span>SENIOR DESIGNER (2015 - 2020)</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. PRESS LAURELS & AWARDS TABLE */}
      <section className="space-y-8">
        <div className="space-y-1">
          <div className="font-mono text-[9px] tracking-[0.25em] text-taupe uppercase">
            § 03 MONOGRAPH PRESS &amp; LAURELS
          </div>
          <h2 className="font-serif text-3xl text-charcoal font-light">
            Recognitions &amp; Publications
          </h2>
        </div>

        {/* Tabular List of Awards */}
        <div className="border-t border-taupe/15 pt-4 space-y-1.5">
          <div className="grid grid-cols-12 gap-4 font-mono text-[9px] tracking-widest text-taupe border-b border-taupe/10 pb-3 uppercase px-4">
            <span className="col-span-4">PUBLICATION / ASSOCIATE</span>
            <span className="col-span-6">CERTIFICATE LAUREL</span>
            <span className="col-span-2 text-right">YEAR</span>
          </div>

          {pressItems.map((item, idx) => (
            <div 
              key={idx}
              className="grid grid-cols-12 gap-4 py-4.5 border-b border-taupe/10 items-baseline px-4 hover:bg-sand/20 transition-colors duration-300"
            >
              <span className="col-span-4 font-serif text-[15px] text-charcoal italic">{item.publication}</span>
              <span className="col-span-6 font-mono text-[10px] tracking-widest uppercase text-taupe">{item.award}</span>
              <span className="col-span-2 text-right font-mono text-xs text-taupe">{item.year}</span>
            </div>
          ))}
        </div>

        {/* Inquiry block prompt */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-sand/30 p-8 border border-taupe/15 gap-4">
          <span className="font-mono text-[10px] text-taupe tracking-wider text-center sm:text-left">
            INTERESTED IN INVENTORIAL OR PRESS ACADEMIC INTERVIEWS?
          </span>
          <a 
            href="#contact" 
            className="font-mono text-[11px] text-charcoal tracking-widest uppercase underline flex items-center gap-1.5"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('nav-link-contact')?.click();
            }}
          >
            ATELIER CONTACT INQUIRY <ArrowUpRight size={13} />
          </a>
        </div>

      </section>

    </div>
  );
}
