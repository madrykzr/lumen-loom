/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import SmartImage from './SmartImage';

interface BeforeAfterSliderProps {
  beforeImg: string;
  afterImg: string;
  beforeFallback: string;
  afterFallback: string;
  onHoverState?: (isHovered: boolean) => void;
}

export default function BeforeAfterSlider({
  beforeImg,
  afterImg,
  beforeFallback,
  afterFallback,
  onHoverState
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/10] overflow-hidden select-none cursor-ew-resize border border-charcoal/5"
      onPointerDown={handlePointerDown}
      onMouseEnter={() => onHoverState?.(true)}
      onMouseLeave={() => {
        onHoverState?.(false);
      }}
      id="before-after-slider-container"
    >
      {/* "After" Image (Complete State) - Bottom Layer */}
      <div className="absolute inset-0 w-full h-full">
        <SmartImage
          src={afterImg}
          fallbackSrc={afterFallback}
          alt="Bangsar Townhouse Complete Restoration"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 right-6 bg-charcoal/80 text-bone px-3 py-1 font-mono text-[10px] tracking-widest uppercase rounded">
          After (Restoration Completed)
        </div>
      </div>

      {/* "Before" Image (Raw Uncompleted State) - Top Clipped Layer */}
      <div 
        className="absolute inset-y-0 left-0 overflow-hidden" 
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="absolute inset-0 w-full h-full" style={{ width: containerRef.current?.getBoundingClientRect().width || '100vw' }}>
          <SmartImage
            src={beforeImg}
            fallbackSrc={beforeFallback}
            alt="Bangsar Townhouse Raw Shell"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 bg-taupe/90 text-charcoal px-3 py-1 font-mono text-[10px] tracking-widest uppercase rounded">
            Before (Raw Concrete Shell)
          </div>
        </div>
      </div>

      {/* Slider Bar Divider Line */}
      <div 
        className="absolute inset-y-0 w-[2px] bg-bone cursor-ew-resize z-20 flex items-center justify-center shadow-lg"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Ring */}
        <div className="absolute w-12 h-12 rounded-full bg-bone hover:scale-110 active:scale-95 transition-transform flex items-center justify-center border border-taupe shadow-2xl z-30">
          <div className="flex items-center gap-1.5 text-charcoal">
            <span className="text-[10px] font-bold">←</span>
            <div className="w-[1px] h-3 bg-taupe/40"></div>
            <span className="text-[10px] font-bold">→</span>
          </div>
        </div>
      </div>

      {/* Instructional Badge Top Right */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-bone/95 border border-taupe/20 px-4 py-1.5 rounded-full shadow-sm pointer-events-none z-30 font-mono text-[9px] tracking-[0.15em] uppercase text-charcoal/70 flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-taupe animate-pulse"></span>
        Slide dual-handle to compare
      </div>
    </div>
  );
}
