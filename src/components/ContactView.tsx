/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone, Calendar, ArrowRight } from 'lucide-react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: 'Kuala Lumpur',
    area: '',
    budget: 'RM 35,000 - RM 50,000',
    description: '',
    scheduleDiscovery: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const budgets = [
    'RM 35,000 - RM 50,000 (Standard Residence)',
    'RM 50,000 - RM 85,000 (Penthouse & Villa Scope)',
    'RM 85,000 - RM 150,000 (Comprehensive Renovation)',
    'RM 150,000+ (Full Custom Architecture / Styling)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please fill in your primary Name and Email contact credentials.');
      return;
    }
    setIsSubmitting(true);
    
    // Simulate high-craft database submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto space-y-16 md:space-y-28" id="contact-view-container">

      {/* 1. CONTACT INTRO HEADER */}
      <section className="relative border-b border-taupe/15 pb-10 space-y-10">
        <div className="absolute -top-4 left-0 font-mono text-[9px] tracking-[0.25em] text-taupe uppercase">
          § 01 ATELIER REGISTRATION
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-4">
          <div className="space-y-3">
            <h1 className="font-serif text-[48px] sm:text-6xl md:text-7xl text-charcoal tracking-[-0.04em] leading-[0.85] font-light italic">
              Begin a <span className="font-semibold text-charcoal block sm:inline">conversation</span>
            </h1>
            <p className="text-xs md:text-sm text-taupe max-w-md font-light leading-relaxed">
              We curate a very limited number of residential spaces each year. Let us know the initial characteristics of your home, and we will set up an atmospheric light consult.
            </p>
          </div>

          <div className="font-mono text-xs text-taupe tracking-wider leading-relaxed text-left lg:text-right border-l-2 lg:border-l-0 lg:border-r-2 border-taupe/15 pl-4 lg:pl-0 lg:pr-4 py-1 uppercase">
            <span>DIRECT MAIL: ATELIER@LUMENLOOM.COM</span>
            <br />
            <span>COMMISSIONS ACCEPTED GLOBALLY</span>
          </div>
        </div>
      </section>

      {/* 2. FORM & ADDRESS SPLIT ELEMENT */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: ENQUIRY FORM PANEL */}
        <div className="lg:col-span-7 bg-sand/20 p-6 md:p-10 border border-taupe/10 shadow-sm">
          {isSuccess ? (
            
            /* SUCCESS FEEDBACK BLOCK */
            <div className="space-y-6 py-12 text-center animate-fade-in" id="contact-success-panel">
              <div className="w-12 h-12 rounded-full bg-charcoal text-bone flex items-center justify-center mx-auto text-xl">
                ✓
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-taupe tracking-widest uppercase block">
                  REGISTRATION COMPLETED
                </span>
                <h3 className="font-serif text-3xl text-charcoal italic font-light">
                  Enquiry Logged
                </h3>
              </div>
              <p className="text-xs text-taupe leading-relaxed font-light max-w-md mx-auto">
                Thank you, <strong>{formData.name}</strong>. Your residential credentials have been synchronized with the Lumen &amp; Loom schedule logs. Creative Director <strong>Iman Suria</strong> will review your site parameters and light characteristics. Our concierge will email you within 3 working days.
              </p>
              <div className="pt-6 font-mono text-[9px] uppercase tracking-wider text-taupe border-t border-taupe/10">
                LUMEN &amp; LOOM ARCHITECTURAL PROTOCOL
              </div>
            </div>

          ) : (
            
            /* INTERACTIVE ENQUIRY FORM */
            <form onSubmit={handleSubmit} className="space-y-6" id="contact-enquiry-form">
              
              <div className="space-y-4">
                <span className="font-mono text-[10px] text-taupe tracking-widest uppercase block border-b border-taupe/15 pb-2">
                  01 / CLIENT IDENTIFICATION
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] tracking-widest text-taupe uppercase block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Iman Shah / Clara Lim"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-bone hover:border-taupe focus:border-charcoal border border-taupe/20 px-4 py-3 font-sans text-xs text-charcoal rounded-none focus:outline-none transition-colors"
                      id="form-input-name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] tracking-widest text-taupe uppercase block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="shah@domain.my"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-bone hover:border-taupe focus:border-charcoal border border-taupe/20 px-4 py-3 font-sans text-xs text-charcoal rounded-none focus:outline-none transition-colors"
                      id="form-input-email"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <span className="font-mono text-[10px] text-taupe tracking-widest uppercase block border-b border-taupe/15 pb-2">
                  02 / SPACE CHARACTERISTICS
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] tracking-widest text-taupe uppercase block">
                      Geographic Location
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bangsar, Kuala Lumpur"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-bone hover:border-taupe focus:border-charcoal border border-taupe/20 px-4 py-3 font-sans text-xs text-charcoal rounded-none focus:outline-none transition-colors"
                      id="form-input-location"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] tracking-widest text-taupe uppercase block">
                      Floor Area (SQFT, estimate)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1,800 sqft apartment"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full bg-bone hover:border-taupe focus:border-charcoal border border-taupe/20 px-4 py-3 font-sans text-xs text-charcoal rounded-none focus:outline-none transition-colors"
                      id="form-input-area"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[9px] tracking-widest text-taupe uppercase block">
                    Estimated Spatial Budget *
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-bone hover:border-taupe focus:border-charcoal border border-taupe/20 px-4 py-3 font-sans text-xs text-charcoal rounded-none focus:outline-none transition-colors"
                    id="form-input-budget"
                  >
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <span className="font-mono text-[10px] text-taupe tracking-widest uppercase block border-b border-taupe/15 pb-2">
                  03 / CREATIVE SCOPE DETAILS
                </span>
                <div className="space-y-1">
                  <label className="font-mono text-[9px] tracking-widest text-taupe uppercase block">
                    What routines do you wish this home to shelter?
                  </label>
                  <textarea
                    rows={4}
                    placeholder="We wish to strip down our apartment, maximize natural sunlight in the central airwell, and design bespoke walnut modular bookshelves with cozy meditation nooks..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-bone hover:border-taupe focus:border-charcoal border border-taupe/20 px-4 py-3 font-sans text-xs text-charcoal rounded-none focus:outline-none resize-none transition-colors"
                    id="form-input-description"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="form-checkbox-discovery"
                    checked={formData.scheduleDiscovery}
                    onChange={(e) => setFormData({ ...formData, scheduleDiscovery: e.target.checked })}
                    className="w-3.5 h-3.5 border-taupe focus:ring-0 checked:bg-charcoal accent-charcoal rounded-none"
                  />
                  <label htmlFor="form-checkbox-discovery" className="font-mono text-[9px] text-taupe uppercase tracking-wider select-none leading-none pt-0.5">
                    REQUEST SITE LIGHT STUDY
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-charcoal text-bone hover:bg-taupe hover:text-charcoal transition-colors duration-300 px-6 py-3 font-mono text-[10px] tracking-[0.2em] uppercase rounded-none inline-flex items-center gap-2"
                  id="form-submit-btn"
                >
                  {isSubmitting ? 'TRANSMITTING...' : 'SEND INQUIRY'}
                  {!isSubmitting && <Send size={12} />}
                </button>
              </div>

            </form>
          )}
        </div>

        {/* RIGHT COLUMN: ATELIER DETAILS & PHYSICAL ADDRESS */}
        <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-28">
          
          <div className="space-y-4">
            <span className="font-mono text-[9px] text-taupe uppercase tracking-widest block">§ ATELIER LOCATIONS</span>
            
            <div className="space-y-2">
              <h2 className="font-serif text-2xl text-charcoal italic font-light">The Kuala Lumpur Office</h2>
              <div className="text-xs text-taupe font-sans leading-relaxed space-y-1 block font-light">
                <p className="font-medium text-charcoal flex items-center gap-2"><MapPin size={14} className="text-taupe" /> Lumen &amp; Loom Atelier</p>
                <p>No. 24, Lorong Kurau,</p>
                <p>Taman Bukit Pantai, Bangsar,</p>
                <p>59100 Kuala Lumpur, Malaysia</p>
              </div>
            </div>

            <div className="pt-4 space-y-2 border-t border-taupe/15">
              <h2 className="font-serif text-xl text-charcoal italic font-light">Singapore Outpost</h2>
              <p className="text-xs text-taupe font-sans font-light">
                Lorong 24A, Geylang Heritage Houses, Singapore (By scheduled appt only)
              </p>
            </div>
          </div>

          {/* Quick Contacts */}
          <div className="space-y-3 pt-6 border-t border-taupe/15 font-mono text-[10px] tracking-wider text-taupe">
            <div className="flex items-center gap-3">
              <Mail size={13} className="text-taupe" />
              <span>COMMISSIONS: ATELIER@LUMENLOOM.COM</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={13} className="text-taupe" />
              <span>PHONE: +60 3-2287 4010</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={13} className="text-taupe" />
              <span>MONDAY — FRIDAY (09:00 - 18:00 MYT)</span>
            </div>
          </div>

          {/* Visual Map graphic Card */}
          <div className="border border-taupe/15 p-6 bg-sand/30 space-y-4">
            <div className="flex justify-between items-center font-mono text-[9px] text-taupe">
              <span>SATELLITE COORDINATES</span>
              <span className="text-taupe">BANGSAR RIDGE</span>
            </div>
            
            {/* Visual Minimal Vector Line grid map rendering quiet luxury feel */}
            <div className="h-28 border border-taupe/10 relative overflow-hidden bg-bone flex items-center justify-center">
              <div className="absolute inset-0 opacity-[0.12] grid grid-cols-6 grid-rows-4 pointer-events-none">
                <div className="border-r border-b border-charcoal"></div>
                <div className="border-r border-b border-charcoal"></div>
                <div className="border-r border-b border-charcoal"></div>
                <div className="border-r border-b border-charcoal"></div>
                <div className="border-r border-b border-charcoal"></div>
                <div className="border-b border-charcoal"></div>
                
                <div className="border-r border-b border-charcoal"></div>
                <div className="border-r border-b border-charcoal"></div>
                <div className="border-r border-b border-charcoal"></div>
                <div className="border-r border-b border-charcoal text-center flex items-center justify-center text-red-500 font-bold"></div>
              </div>
              
              {/* Core Map Markers */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-charcoal animate-pulse"></div>
                <span className="font-mono text-[8px] text-charcoal tracking-widest bg-sand border border-taupe/20 px-2 py-0.5 rounded">ATELIER</span>
              </div>
              
              <div className="absolute right-10 top-6 font-mono text-[7px] text-taupe leading-none">
                JALAN BANGSAR →
              </div>
              <div className="absolute left-6 bottom-4 font-mono text-[7px] text-taupe leading-none">
                ← BUKIT PANTAI
              </div>
            </div>

            <p className="font-mono text-[8.5px] text-taupe leading-relaxed uppercase">
              Street parking is plentiful on Lorong Kurau. Ring keybell for entry check.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}
