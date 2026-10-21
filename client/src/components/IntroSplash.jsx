import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const IntroSplash = ({ onComplete }) => {
  const videoRef = useRef(null);
  // phases: 'loading' | 'playing' | 'blink' | 'done'
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => {
      setPhase('playing');
      video.play().catch(() => startBlink());
    };

    const onEnded = () => startBlink();

    // Fallback: if video can't load in 4s, go straight to blink
    const fallback = setTimeout(() => {
      if (phase === 'loading') startBlink();
    }, 4000);

    video.addEventListener('canplay', onCanPlay, { once: true });
    video.addEventListener('ended', onEnded, { once: true });

    return () => {
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('ended', onEnded);
      clearTimeout(fallback);
    };
  }, []);

  const startBlink = () => {
    if (videoRef.current) videoRef.current.pause();
    setPhase('blink');
    // Single blink: 600ms total
    setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 600);
  };



  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black overflow-hidden">

      {/* ── VIDEO ── */}
      <video
        ref={videoRef}
        src="/assets/video/intro.mp4"
        className="w-full h-full object-cover"
        muted
        playsInline
        autoPlay
        preload="auto"
      />

      {/* Dark vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/45 pointer-events-none" />

      {/* ── BRAND TOP ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: phase === 'playing' ? 1 : 0, y: phase === 'playing' ? 0 : -12 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2"
      >
        <span className="text-[#C6FF00] text-[11px] font-black tracking-[0.5em] uppercase font-mono"
          style={{ textShadow: '0 0 20px rgba(198,255,0,0.9)' }}>
          ⚡ REPFORGE
        </span>
      </motion.div>

      {/* ── BOTTOM TAGLINE ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: phase === 'playing' ? 1 : 0, y: phase === 'playing' ? 0 : 20 }}
        transition={{ delay: 1.0, duration: 0.8, ease: 'easeOut' }}
        className="absolute bottom-24 left-0 right-0 text-center px-6 pointer-events-none"
      >
        <h1
          className="text-5xl sm:text-7xl font-black text-white tracking-tight leading-none"
          style={{ fontFamily: 'system-ui, sans-serif', textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}
        >
          FORGE YOUR{' '}
          <span
            className="text-[#C6FF00]"
            style={{ textShadow: '0 0 40px rgba(198,255,0,0.9), 0 0 80px rgba(198,255,0,0.4)' }}
          >
            LIMITS
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'playing' ? 0.65 : 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="text-white/65 text-xs sm:text-sm mt-3 tracking-[0.3em] uppercase font-semibold"
        >
          Smart Fitness · Nutrition · Progress
        </motion.p>
      </motion.div>



      {/* ── SCANLINE FILM EFFECT ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)',
          backgroundSize: '100% 3px',
        }}
      />

      {/* ── BLINK FLASH OVERLAY (single flash) ── */}
      <AnimatePresence>
        {phase === 'blink' && (
          <motion.div
            className="absolute inset-0 bg-white pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 0.55,
              times: [0, 0.4, 1],
              ease: 'easeOut',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── LOADING indicator (while video loads) ── */}
      {phase === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-[#C6FF00]/30 border-t-[#C6FF00] rounded-full animate-spin" />
            <span className="text-[#C6FF00]/60 text-xs tracking-widest uppercase font-mono">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};
