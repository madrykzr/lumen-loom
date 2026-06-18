/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

interface SmartImageProps {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  onHoverState?: (isHovered: boolean) => void;
  onClick?: () => void;
}

export default function SmartImage({
  src,
  fallbackSrc,
  alt,
  className = '',
  onHoverState,
  onClick
}: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Reset state when raw src changes
    setCurrentSrc(src);
    setHasError(false);
    setLoaded(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setCurrentSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <div 
      className="relative overflow-hidden w-full h-full bg-sand/30"
      onMouseEnter={() => onHoverState?.(true)}
      onMouseLeave={() => onHoverState?.(false)}
      onClick={onClick}
      id={`smart-image-${alt.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <img
        src={currentSrc}
        alt={alt}
        onError={handleError}
        onLoad={() => setLoaded(true)}
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-[1.03] ${
          loaded ? 'exposure-reveal' : 'opacity-0'
        } ${className}`}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border border-taupe/30 border-t-taupe rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
