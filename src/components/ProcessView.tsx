/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { processSteps } from '../data';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ProcessView() {
  return (
    <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto space-y-24 md:space-y-36" id="process-view-container">

      {/* 1. PROCESS HEADER */}
      <section className="relative border-b border-taupe/15 pb-10 space-y-10">
        <div className="absolute -top-4 left-0 font-mono text-[9px] tracking-[0.25em] text-taupe uppercase">
          § 01 ADMINISTRATIVE METHODOLOGY
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-4">
          <div className="space-y-3">
            <h1 className="font-serif text-[48px] sm:text-6xl md:text-7xl text-charcoal tracking-[-0.04em] leading-[0.85] font-light italic">
              Designing with <span className="font-semibold text-charcoal block sm:inline">precision</span>
            </h1>
            <p className="text-xs md:text-sm text-taupe max-w-md font-light leading-relaxed">
              We separate our workflow into four absolute stages. This prevents creative drift, manages project timelines, and ensures structural results mirror our designs exactly.
            </p>
          </div>

          <div className="font-mono text-[10px] text-taupe tracking-wider leading-relaxed text-left lg:text-right border-l-2 lg:border-l-0 lg:border-r-2 border-taupe/15 pl-4 lg:pl-0 lg:pr-4 py-1.5 uppercase">
            <span>PROJECT TIMEFRAME: ~4 TO 9 MONTHS TOTAL</span>
            <br />
            <span>FEE COMPLETED PER COMPLETED VOLUMETRY</span>
          </div>
        </div>
      </section>

      {/* 2. CASCADING 4-STAGE DISPLAY */}
      <section className="space-y-20 md:space-y-32">
        {processSteps.map((step, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div 
              key={step.step}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
              id={`process-step-${step.step}`}
            >
              
              {/* Massive Corner Indicator Label */}
              <div className="lg:col-span-3 flex lg:flex-col justify-between items-baseline lg:border-t border-taupe/15 pt-4">
                <span className="font-mono text-5xl md:text-7xl font-light text-taupe/40 select-none">
                  {step.step}
                </span>
                
                <div className="lg:mt-4 text-right lg:text-left">
                  <span className="font-mono text-[9px] text-taupe uppercase tracking-widest block">DURATION ESTIMATE</span>
                  <span className="text-xs uppercase text-charcoal font-medium font-mono tracking-wider">{step.duration}</span>
                </div>
              </div>

              {/* Main Content Column */}
              <div className="lg:col-span-9 lg:border-t border-taupe/15 pt-4 space-y-6">
                
                <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-taupe/10 pb-4">
                  <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-light">
                    {step.title}
                  </h2>
                  <span className="font-mono text-[10px] text-taupe tracking-wider uppercase bg-sand px-3 py-1 rounded">
                    OUTCOME: {step.outcome}
                  </span>
                </div>

                <p className="text-[14px] md:text-base text-taupe leading-relaxed font-light">
                  {step.description}
                </p>

                {/* Checklist Bullet Points Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {step.details.map((detail, dIdx) => (
                    <div 
                      key={dIdx} 
                      className="flex items-start gap-3 bg-sand/15 hover:bg-sand/30 transition-colors p-4 border border-taupe/5"
                    >
                      <span className="font-mono text-xs text-taupe py-0.5 select-none">✓</span>
                      <p className="font-mono text-[11px] text-charcoal/80 leading-relaxed tracking-wide font-light">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          );
        })}
      </section>

      {/* 4. FOOTER NOTE */}
      <section className="bg-sand p-10 text-center space-y-4 border border-taupe/10">
        <span className="font-mono text-[9px] tracking-widest text-taupe uppercase block">PROCEDURAL INTEGRITY</span>
        <h3 className="font-serif text-2xl text-charcoal italic font-light">"Good architecture demands absolute precision."</h3>
        <p className="text-[12px] text-taupe max-w-md mx-auto leading-relaxed font-light">
          We maintain structured contracts with all structural and physical sub-contractors, protecting your spatial investment from common regional construction delays.
        </p>
      </section>

    </div>
  );
}
