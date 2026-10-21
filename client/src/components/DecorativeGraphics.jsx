import React from 'react';

/**
 * Subtle SVG Tech Grid Overlay for Card Backgrounds
 */
export const GridPatternOverlay = ({ className = 'opacity-10' }) => (
  <svg
    className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="none"
  >
    <defs>
      <pattern id="tech-grid" width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#tech-grid)" className="text-[#ccff00]" />
  </svg>
);

/**
 * Animated Ambient Glow Orbs
 */
export const GlowingOrbs = ({ color = 'neon' }) => {
  const isNeon = color === 'neon';
  return (
    <>
      <div
        className={`absolute -top-12 -left-12 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isNeon ? 'bg-[#ccff00]/10' : 'bg-cyan-500/10'
        }`}
      />
      <div
        className={`absolute -bottom-12 -right-12 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isNeon ? 'bg-emerald-500/10' : 'bg-purple-500/10'
        }`}
      />
    </>
  );
};

/**
 * Reusable Circular SVG Progress Gauge
 */
export const CircularProgressRing = ({
  size = 72,
  strokeWidth = 6,
  progress = 75,
  color = '#ccff00',
  trackColor = '#242733',
  label = '',
  sublabel = ''
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{ filter: `drop-shadow(0 0 4px ${color}66)` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
        {label && <span className="text-xs font-black text-white font-heading leading-none">{label}</span>}
        {sublabel && <span className="text-[9px] text-gray-400 font-medium leading-none mt-0.5">{sublabel}</span>}
      </div>
    </div>
  );
};

/**
 * Decorative Tech Corner Accents
 */
export const CornerTechAccents = () => (
  <>
    <span className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#ccff00]/40 rounded-tl-sm pointer-events-none" />
    <span className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#ccff00]/40 rounded-tr-sm pointer-events-none" />
    <span className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#ccff00]/40 rounded-bl-sm pointer-events-none" />
    <span className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#ccff00]/40 rounded-br-sm pointer-events-none" />
  </>
);
