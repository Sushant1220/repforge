import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MUSCLE_GROUPS } from '../data/muscleExercises';
import { Target, Sparkles } from 'lucide-react';
import anatomicalFront from '../assets/anatomical_front.png';
import anatomicalBack from '../assets/anatomical_back.png';

export const HumanBodyMap = ({ selectedMuscle, onSelectMuscle }) => {
  const [view, setView] = useState('front'); // 'front' | 'back'
  const [hoveredMuscle, setHoveredMuscle] = useState(null);

  // Front body parts
  const frontMuscles = [
    { id: 'chest', label: 'Chest', icon: '⚡' },
    { id: 'shoulders', label: 'Shoulders', icon: '🏋️' },
    { id: 'biceps', label: 'Biceps', icon: '💪' },
    { id: 'forearms', label: 'Forearms', icon: '✊' },
    { id: 'abs', label: 'Abs', icon: '🔥' },
    { id: 'obliques', label: 'Obliques', icon: '🌀' },
    { id: 'quads', label: 'Quads', icon: '🦵' },
    { id: 'calves', label: 'Calves', icon: '🦶' }
  ];

  // Back body parts
  const backMuscles = [
    { id: 'traps', label: 'Traps', icon: '🦅' },
    { id: 'upper_back', label: 'Upper Back', icon: '🛡️' },
    { id: 'lats', label: 'Lats', icon: '🦅' },
    { id: 'triceps', label: 'Triceps', icon: '🦾' },
    { id: 'lower_back', label: 'Lower Back', icon: '🪵' },
    { id: 'glutes', label: 'Glutes', icon: '🍑' },
    { id: 'hamstrings', label: 'Hamstrings', icon: '🦵' },
    { id: 'calves', label: 'Calves', icon: '🦶' }
  ];

  const currentMuscles = view === 'front' ? frontMuscles : backMuscles;

  const isSelected = (id) => selectedMuscle === id;
  const isHovered = (id) => hoveredMuscle === id;

  const getOverlayOpacity = (id) => {
    if (isSelected(id)) return 0.65;
    if (isHovered(id)) return 0.45;
    return 0; // invisible when unselected
  };

  const getStrokeColor = (id) => {
    if (isSelected(id)) return '#ccff00';
    if (isHovered(id)) return '#a3e635';
    return 'transparent';
  };

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-6 border border-white/10 space-y-6 bg-gradient-to-b from-[#12141c] via-[#0b0c10] to-[#07080b] select-none relative overflow-hidden shadow-2xl">
      {/* Background glow accents */}
      <div className="absolute -top-16 -left-16 w-56 h-56 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Front/Back Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/20">
              <Target className="w-4 h-4" />
            </span>
            <h3 className="text-base font-heading font-black text-white uppercase tracking-wider">
              Anatomical Muscle Map
            </h3>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Click any muscle group on the anatomical figure
          </p>
        </div>

        {/* View Switcher Toggle */}
        <div className="flex items-center p-1 rounded-2xl bg-black/80 border border-white/10 shadow-inner w-full sm:w-auto relative">
          <button
            onClick={() => setView('front')}
            className={`relative flex-1 sm:flex-none px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 z-10 ${
              view === 'front' ? 'text-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            {view === 'front' && (
              <motion.div
                layoutId="activeViewTab"
                className="absolute inset-0 bg-[#ccff00] rounded-xl shadow-[0_0_15px_rgba(204,255,0,0.4)] z-[-1]"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <span>🧍‍♂️</span> Front View
          </button>
          <button
            onClick={() => setView('back')}
            className={`relative flex-1 sm:flex-none px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 z-10 ${
              view === 'back' ? 'text-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            {view === 'back' && (
              <motion.div
                layoutId="activeViewTab"
                className="absolute inset-0 bg-[#ccff00] rounded-xl shadow-[0_0_15px_rgba(204,255,0,0.4)] z-[-1]"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <span>🧍‍♂️</span> Back View
          </button>
        </div>
      </div>

      {/* Selected Muscle Indicator Badge */}
      <div className="text-center relative z-10">
        {(hoveredMuscle || selectedMuscle) ? (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/40 text-[#ccff00] text-xs font-extrabold shadow-[0_0_15px_rgba(204,255,0,0.2)] animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Targeting: <strong>{MUSCLE_GROUPS[hoveredMuscle || selectedMuscle]?.name}</strong></span>
          </div>
        ) : (
          <span className="text-xs text-gray-400 italic">Tap any muscle region to highlight</span>
        )}
      </div>

      {/* Realistic 3D Anatomical Image + Interactive SVG Overlay */}
      <div className="flex items-center justify-center py-2 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative w-64 h-[440px] sm:w-72 sm:h-[480px] flex items-center justify-center group overflow-hidden rounded-2xl"
          >
            {/* Base Anatomical Reference Image */}
            <img
              src={view === 'front' ? anatomicalFront : anatomicalBack}
              alt={`Anatomical ${view} view`}
              className="w-full h-full object-contain filter invert-[0.92] contrast-[1.25] brightness-[1.15] transition-all duration-300 pointer-events-none select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
            />

          {/* Interactive SVG Overlay (ViewBox 440 x 690 mapped onto the image) */}
          <svg
            viewBox="0 0 440 690"
            className="absolute inset-0 w-full h-full"
          >
            {/* ================= FRONT VIEW MUSCLE OVERLAYS ================= */}
            {view === 'front' && (
              <g className="transition-all duration-200">
                {/* 1. CHEST */}
                <g
                  onClick={() => onSelectMuscle('chest')}
                  onMouseEnter={() => setHoveredMuscle('chest')}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  className="cursor-pointer"
                >
                  <path
                    d="M 152,142 C 190,138 216,142 218,198 C 170,205 148,188 152,142 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('chest')}
                    stroke={getStrokeColor('chest')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                  <path
                    d="M 288,142 C 250,138 224,142 222,198 C 270,205 292,188 288,142 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('chest')}
                    stroke={getStrokeColor('chest')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                </g>

                {/* 2. SHOULDERS */}
                <g
                  onClick={() => onSelectMuscle('shoulders')}
                  onMouseEnter={() => setHoveredMuscle('shoulders')}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  className="cursor-pointer"
                >
                  <path
                    d="M 148,138 C 122,145 104,175 110,215 C 138,225 158,198 152,165 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('shoulders')}
                    stroke={getStrokeColor('shoulders')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                  <path
                    d="M 292,138 C 318,145 336,175 330,215 C 302,225 282,198 288,165 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('shoulders')}
                    stroke={getStrokeColor('shoulders')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                </g>

                {/* 3. BICEPS */}
                <g
                  onClick={() => onSelectMuscle('biceps')}
                  onMouseEnter={() => setHoveredMuscle('biceps')}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  className="cursor-pointer"
                >
                  <path
                    d="M 110,215 C 98,245 108,282 128,282 C 145,268 145,232 138,210 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('biceps')}
                    stroke={getStrokeColor('biceps')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                  <path
                    d="M 330,215 C 342,245 332,282 312,282 C 295,268 295,232 302,210 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('biceps')}
                    stroke={getStrokeColor('biceps')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                </g>

                {/* 4. FOREARMS */}
                <g
                  onClick={() => onSelectMuscle('forearms')}
                  onMouseEnter={() => setHoveredMuscle('forearms')}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  className="cursor-pointer"
                >
                  <path
                    d="M 126,285 C 98,335 92,385 110,390 L 132,380 C 138,335 135,298 128,285 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('forearms')}
                    stroke={getStrokeColor('forearms')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                  <path
                    d="M 314,285 C 342,335 348,385 330,390 L 308,380 C 302,335 305,298 312,285 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('forearms')}
                    stroke={getStrokeColor('forearms')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                </g>

                {/* 5. ABS (6-Pack Grid) */}
                <g
                  onClick={() => onSelectMuscle('abs')}
                  onMouseEnter={() => setHoveredMuscle('abs')}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  className="cursor-pointer"
                >
                  <path d="M 186,200 L 216,200 L 216,235 L 186,235 Z" fill="#ccff00" fillOpacity={getOverlayOpacity('abs')} stroke={getStrokeColor('abs')} strokeWidth="1.5" />
                  <path d="M 224,200 L 254,200 L 254,235 L 224,235 Z" fill="#ccff00" fillOpacity={getOverlayOpacity('abs')} stroke={getStrokeColor('abs')} strokeWidth="1.5" />
                  <path d="M 187,240 L 216,240 L 216,275 L 187,275 Z" fill="#ccff00" fillOpacity={getOverlayOpacity('abs')} stroke={getStrokeColor('abs')} strokeWidth="1.5" />
                  <path d="M 224,240 L 253,240 L 253,275 L 224,275 Z" fill="#ccff00" fillOpacity={getOverlayOpacity('abs')} stroke={getStrokeColor('abs')} strokeWidth="1.5" />
                  <path d="M 188,280 L 216,280 L 216,320 L 188,320 Z" fill="#ccff00" fillOpacity={getOverlayOpacity('abs')} stroke={getStrokeColor('abs')} strokeWidth="1.5" />
                  <path d="M 224,280 L 252,280 L 252,320 L 224,320 Z" fill="#ccff00" fillOpacity={getOverlayOpacity('abs')} stroke={getStrokeColor('abs')} strokeWidth="1.5" />
                </g>

                {/* 6. OBLIQUES */}
                <g
                  onClick={() => onSelectMuscle('obliques')}
                  onMouseEnter={() => setHoveredMuscle('obliques')}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  className="cursor-pointer"
                >
                  <path
                    d="M 152,205 L 175,205 L 178,315 L 158,300 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('obliques')}
                    stroke={getStrokeColor('obliques')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                  <path
                    d="M 288,205 L 265,205 L 262,315 L 282,300 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('obliques')}
                    stroke={getStrokeColor('obliques')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                </g>

                {/* 7. QUADS */}
                <g
                  onClick={() => onSelectMuscle('quads')}
                  onMouseEnter={() => setHoveredMuscle('quads')}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  className="cursor-pointer"
                >
                  <path
                    d="M 165,340 C 145,400 152,500 185,510 C 215,510 218,400 212,340 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('quads')}
                    stroke={getStrokeColor('quads')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                  <path
                    d="M 275,340 C 295,400 288,500 255,510 C 225,510 222,400 228,340 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('quads')}
                    stroke={getStrokeColor('quads')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                </g>

                {/* 8. CALVES */}
                <g
                  onClick={() => onSelectMuscle('calves')}
                  onMouseEnter={() => setHoveredMuscle('calves')}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  className="cursor-pointer"
                >
                  <path
                    d="M 165,540 C 148,590 160,655 178,665 L 198,665 C 205,600 198,540 192,540 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('calves')}
                    stroke={getStrokeColor('calves')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                  <path
                    d="M 275,540 C 292,590 280,655 262,665 L 242,665 C 235,600 242,540 248,540 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('calves')}
                    stroke={getStrokeColor('calves')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                </g>
              </g>
            )}

            {/* ================= BACK VIEW MUSCLE OVERLAYS ================= */}
            {view === 'back' && (
              <g className="transition-all duration-200">
                {/* 1. TRAPS */}
                <g
                  onClick={() => onSelectMuscle('traps')}
                  onMouseEnter={() => setHoveredMuscle('traps')}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  className="cursor-pointer"
                >
                  <path
                    d="M 220,95 L 280,128 L 220,185 L 160,128 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('traps')}
                    stroke={getStrokeColor('traps')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                </g>

                {/* 2. UPPER BACK */}
                <g
                  onClick={() => onSelectMuscle('upper_back')}
                  onMouseEnter={() => setHoveredMuscle('upper_back')}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  className="cursor-pointer"
                >
                  <path
                    d="M 165,128 L 275,128 L 260,185 L 180,185 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('upper_back')}
                    stroke={getStrokeColor('upper_back')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                </g>

                {/* 3. LATS */}
                <g
                  onClick={() => onSelectMuscle('lats')}
                  onMouseEnter={() => setHoveredMuscle('lats')}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  className="cursor-pointer"
                >
                  <path
                    d="M 148,140 L 180,185 L 180,268 L 148,245 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('lats')}
                    stroke={getStrokeColor('lats')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                  <path
                    d="M 292,140 L 260,185 L 260,268 L 292,245 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('lats')}
                    stroke={getStrokeColor('lats')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                </g>

                {/* 4. TRICEPS */}
                <g
                  onClick={() => onSelectMuscle('triceps')}
                  onMouseEnter={() => setHoveredMuscle('triceps')}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  className="cursor-pointer"
                >
                  <path
                    d="M 142,138 C 115,178 120,255 132,260 C 146,245 152,185 152,148 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('triceps')}
                    stroke={getStrokeColor('triceps')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                  <path
                    d="M 298,138 C 325,178 320,255 308,260 C 294,245 288,185 288,148 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('triceps')}
                    stroke={getStrokeColor('triceps')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                </g>

                {/* 5. LOWER BACK */}
                <g
                  onClick={() => onSelectMuscle('lower_back')}
                  onMouseEnter={() => setHoveredMuscle('lower_back')}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  className="cursor-pointer"
                >
                  <path
                    d="M 182,265 L 258,265 L 250,332 L 190,332 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('lower_back')}
                    stroke={getStrokeColor('lower_back')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                </g>

                {/* 6. GLUTES */}
                <g
                  onClick={() => onSelectMuscle('glutes')}
                  onMouseEnter={() => setHoveredMuscle('glutes')}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  className="cursor-pointer"
                >
                  <path
                    d="M 152,335 C 152,415 218,415 218,335 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('glutes')}
                    stroke={getStrokeColor('glutes')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                  <path
                    d="M 288,335 C 288,415 222,415 222,335 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('glutes')}
                    stroke={getStrokeColor('glutes')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                </g>

                {/* 7. HAMSTRINGS */}
                <g
                  onClick={() => onSelectMuscle('hamstrings')}
                  onMouseEnter={() => setHoveredMuscle('hamstrings')}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  className="cursor-pointer"
                >
                  <path
                    d="M 155,420 L 210,420 L 205,520 L 168,520 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('hamstrings')}
                    stroke={getStrokeColor('hamstrings')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                  <path
                    d="M 285,420 L 230,420 L 235,520 L 272,520 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('hamstrings')}
                    stroke={getStrokeColor('hamstrings')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                </g>

                {/* 8. CALVES */}
                <g
                  onClick={() => onSelectMuscle('calves')}
                  onMouseEnter={() => setHoveredMuscle('calves')}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  className="cursor-pointer"
                >
                  <path
                    d="M 162,545 C 140,595 160,655 178,665 L 198,665 C 208,600 196,545 192,545 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('calves')}
                    stroke={getStrokeColor('calves')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                  <path
                    d="M 278,545 C 300,595 280,655 262,665 L 242,665 C 232,600 244,545 248,545 Z"
                    fill="#ccff00"
                    fillOpacity={getOverlayOpacity('calves')}
                    stroke={getStrokeColor('calves')}
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:fill-opacity-50"
                  />
                </g>
              </g>
            )}
          </svg>
        </motion.div>
      </AnimatePresence>
      </div>

      {/* Quick Select Muscle Pill Buttons */}
      <div className="space-y-2 border-t border-white/10 pt-4 relative z-10">
        <div className="flex items-center justify-between text-xs text-gray-400 font-semibold px-1">
          <span>Quick Select ({view === 'front' ? 'Front' : 'Back'} Parts):</span>
          <span className="text-[#ccff00] font-bold">{currentMuscles.length} Muscle Groups</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {currentMuscles.map(m => {
            const active = isSelected(m.id);
            return (
              <button
                key={m.id}
                onClick={() => onSelectMuscle(m.id)}
                onMouseEnter={() => setHoveredMuscle(m.id)}
                onMouseLeave={() => setHoveredMuscle(null)}
                className={`px-3 py-2.5 min-h-[44px] rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  active
                    ? 'bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.35)] scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 hover:border-[#ccff00]/40'
                }`}
              >
                <span>{m.icon}</span>
                <span className="truncate">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
