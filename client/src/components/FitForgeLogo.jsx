import React from 'react';
import { motion } from 'framer-motion';
import repforgeOfficial from '../assets/repforge-official-logo.jpg';
import repforgeFavicon from '../assets/repforge-favicon.png';

export const FitForgeLogo = ({ variant = 'full', size = 'md', className = '', onClick }) => {
  // Icon sizes for square cropped badge
  const iconSizes = {
    sm: 'w-10 h-10',
    md: 'w-[76px] h-[76px] sm:w-[80px] sm:h-[80px]',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
    xl: 'w-28 h-28',
    hero: 'w-36 h-36 sm:w-48 sm:h-48'
  };

  if (variant === 'image-only') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        onClick={onClick}
        className={`relative group cursor-pointer ${className}`}
      >
        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#ccff00] to-lime-400 opacity-40 blur-lg group-hover:opacity-80 transition-all duration-300 animate-logo-glow" />
        <div className="relative rounded-2xl bg-[#0b0c10] border-2 border-[#ccff00]/60 p-2 overflow-hidden shadow-[0_0_30px_rgba(204,255,0,0.3)]">
          <img
            src={repforgeOfficial}
            alt="RepForge Logo"
            className="w-full max-w-xs sm:max-w-md h-auto object-contain rounded-xl"
          />
        </div>
      </motion.div>
    );
  }

  if (variant === 'icon') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        onClick={onClick}
        className={`relative flex-shrink-0 cursor-pointer group ${className}`}
      >
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#ccff00] to-lime-400 opacity-50 blur-md group-hover:opacity-100 transition-all duration-300 animate-logo-glow" />
        <div className={`relative ${iconSizes[size] || iconSizes.md} rounded-2xl bg-[#0b0c10] border-2 border-[#ccff00]/70 overflow-hidden flex items-center justify-center p-1 shadow-[0_0_25px_rgba(204,255,0,0.4)] group-hover:scale-105 transition-transform`}>
          <img
            src={repforgeFavicon}
            alt="RepForge Skull Favicon Mascot"
            className="w-full h-full object-contain filter drop-shadow-md rounded-xl"
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      onClick={onClick}
      className={`flex items-center gap-[18px] cursor-pointer group select-none ${className}`}
    >
      {/* Official Skull Mascot Badge (76px - 80px) */}
      <div className="relative flex-shrink-0">
        <div className="absolute -inset-1.5 rounded-2xl bg-[#ccff00] opacity-40 blur-md group-hover:opacity-90 transition-all duration-300 animate-logo-glow" />
        <div className={`relative ${iconSizes[size] || iconSizes.md} rounded-2xl bg-[#0b0c10] border-2 border-[#ccff00]/80 overflow-hidden flex items-center justify-center p-1 shadow-[0_0_25px_rgba(204,255,0,0.45)] group-hover:scale-105 transition-transform`}>
          <img
            src={repforgeOfficial}
            alt="RepForge Skull Logo"
            className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(204,255,0,0.5)] rounded-xl"
          />
        </div>
      </div>

      {/* Official Brand Text: RepForge */}
      <div className="flex flex-col min-w-0">
        <span className="font-heading font-black text-2xl sm:text-[26px] tracking-tight text-white leading-none group-hover:text-white transition-colors">
          RepForge
        </span>
        <span className="text-[9px] font-black text-[#ccff00] uppercase tracking-[0.18em] leading-tight mt-1.5 opacity-95">
          POWERLIFTING &amp; FITNESS SAAS
        </span>
      </div>
    </motion.div>
  );
};

export const RepForgeLogo = FitForgeLogo;



