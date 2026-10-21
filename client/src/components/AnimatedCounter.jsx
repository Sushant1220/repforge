import React, { useEffect, useState } from 'react';

export const AnimatedCounter = ({ value, duration = 1200, prefix = '', suffix = '', formatter }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Parse numeric value if string
    const target = typeof value === 'number' ? value : parseFloat(String(value).replace(/,/g, '')) || 0;
    
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayValue(target);
      return;
    }

    let startTime = null;
    let animationFrame = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Smooth easeOutCubic curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * easeOut);

      setDisplayValue(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [value, duration]);

  const formattedStr = formatter 
    ? formatter(displayValue) 
    : displayValue.toLocaleString();

  return (
    <span>
      {prefix}{formattedStr}{suffix}
    </span>
  );
};
