import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ChevronDown, ChevronUp } from 'lucide-react';
import anatomicalFront from '../assets/anatomical_front.png';
import anatomicalBack from '../assets/anatomical_back.png';

const MUSCLE_TO_BODY_ID = {
  'pectoralis major': 'chest',
  'upper pectoralis': 'chest',
  'sternal chest': 'chest',
  'chest': 'chest',
  'latissimus dorsi': 'lats',
  'lats': 'lats',
  'rhomboids': 'upper_back',
  'mid-traps': 'upper_back',
  'rhomboids & mid-traps': 'upper_back',
  'upper back': 'upper_back',
  'rear delts': 'upper_back',
  'traps': 'traps',
  'upper traps': 'traps',
  'trapezius': 'traps',
  'lower back': 'lower_back',
  'erector spinae': 'lower_back',
  'quadriceps': 'quads',
  'quadriceps femoris': 'quads',
  'quads': 'quads',
  'quadriceps & gluteus maximus': 'quads',
  'hamstrings': 'hamstrings',
  'hamstrings & glutes': 'hamstrings',
  'gluteus maximus': 'glutes',
  'glutes': 'glutes',
  'hip flexors': 'glutes',
  'calves': 'calves',
  'anterior deltoids': 'shoulders',
  'lateral deltoid': 'shoulders',
  'anterior & lateral deltoids': 'shoulders',
  'deltoids': 'shoulders',
  'shoulders': 'shoulders',
  'biceps brachii': 'biceps',
  'biceps': 'biceps',
  'triceps brachii': 'triceps',
  'triceps': 'triceps',
  'triceps lateral & medial head': 'triceps',
  'forearms': 'forearms',
  'brachialis': 'forearms',
  'grip strength': 'forearms',
  'rectus abdominis': 'abs',
  'lower rectus abdominis': 'abs',
  'abs': 'abs',
  'abdominals': 'abs',
  'core': 'abs',
  'deep core': 'abs',
  'obliques': 'obliques',
  'internal & external obliques': 'obliques',
};

const MUSCLE_VIEW = {
  chest: 'front', shoulders: 'front', biceps: 'front', forearms: 'front',
  abs: 'front', obliques: 'front', quads: 'front', calves: 'front',
  traps: 'back', upper_back: 'back', lats: 'back', triceps: 'back',
  lower_back: 'back', glutes: 'back', hamstrings: 'back',
};

const MUSCLE_LABELS = {
  chest: 'Chest', shoulders: 'Shoulders', biceps: 'Biceps', forearms: 'Forearms',
  abs: 'Abs', obliques: 'Obliques', quads: 'Quads', calves: 'Calves',
  traps: 'Traps', upper_back: 'Upper Back', lats: 'Lats', triceps: 'Triceps',
  lower_back: 'Lower Back', glutes: 'Glutes', hamstrings: 'Hamstrings',
};

function resolveMusclesToIds(muscleText) {
  if (!muscleText) return null;
  const lower = muscleText.toLowerCase().trim();
  for (const [key, id] of Object.entries(MUSCLE_TO_BODY_ID)) {
    if (lower === key || lower.includes(key)) return id;
  }
  return null;
}

export const ExerciseBodySync = ({ exercise }) => {
  const [view, setView] = useState('front');
  const [expanded, setExpanded] = useState(false);

  const primaryId = resolveMusclesToIds(exercise?.primaryMuscle);
  const secondaryIds = (exercise?.secondaryMuscles || [])
    .map(resolveMusclesToIds)
    .filter(Boolean);

  useEffect(() => {
    if (primaryId && MUSCLE_VIEW[primaryId]) {
      setView(MUSCLE_VIEW[primaryId]);
    }
  }, [primaryId]);

  const getOverlayColor = (id) => {
    if (id === primaryId) return { fill: '#C6FF00', opacity: 0.7, stroke: '#C6FF00', sw: 2.5 };
    if (secondaryIds.includes(id)) return { fill: '#28D7FF', opacity: 0.45, stroke: '#28D7FF', sw: 2 };
    return { fill: '#ccff00', opacity: 0, stroke: 'transparent', sw: 0 };
  };

  const allHighlighted = [primaryId, ...secondaryIds].filter(Boolean);
  const frontVisible = allHighlighted.filter(id => MUSCLE_VIEW[id] === 'front');
  const backVisible = allHighlighted.filter(id => MUSCLE_VIEW[id] === 'back');

  const ov = (id, paths) => {
    const c = getOverlayColor(id);
    return paths.map((d, i) => (
      <path key={i} d={d} fill={c.fill} fillOpacity={c.opacity}
        stroke={c.stroke} strokeWidth={c.sw}
        className="transition-all duration-500"
      />
    ));
  };

  return (
    <div className="bg-[#121821] border border-[#2A3442] rounded-3xl overflow-hidden shadow-xl">
      <div className="flex items-center justify-between p-4 border-b border-[#2A3442]">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[#C6FF00]/10 text-[#C6FF00] border border-[#C6FF00]/20">
            <Activity className="w-4 h-4" />
          </span>
          <div>
            <span className="text-xs font-bold text-white tracking-wide uppercase block font-heading">
              Muscle Activation Map
            </span>
            <span className="text-[10px] text-[#7E8A99]">Live sync with selected exercise</span>
          </div>
        </div>
        <button
          onClick={() => setExpanded(e => !e)}
          className="p-1.5 rounded-lg border border-[#2A3442] text-[#7E8A99] hover:text-white transition-colors lg:hidden"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      <div className={expanded ? 'block' : 'hidden lg:block'}>
        <div className="flex gap-1 p-3 border-b border-[#2A3442]">
          {['front', 'back'].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`relative flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                view === v ? 'text-black' : 'text-[#7E8A99] hover:text-white'
              }`}
            >
              {view === v && (
                <motion.div
                  layoutId="exBodyViewTab"
                  className="absolute inset-0 bg-[#C6FF00] rounded-xl"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-1.5">
                {v === 'front' ? '🧍' : '🧍‍♂️'} {v === 'front' ? 'Front' : 'Back'}
                {v === 'front' && frontVisible.length > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00] animate-pulse" />
                )}
                {v === 'back' && backVisible.length > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </span>
            </button>
          ))}
        </div>

        <div className="flex justify-center px-4 pt-3 pb-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="relative w-44 h-[320px] flex items-center justify-center"
            >
              <img
                src={view === 'front' ? anatomicalFront : anatomicalBack}
                alt={`Anatomical ${view} view`}
                className="w-full h-full object-contain filter invert-[0.9] contrast-[1.2] brightness-[1.1] pointer-events-none select-none"
              />
              <svg viewBox="0 0 440 690" className="absolute inset-0 w-full h-full">
                {view === 'front' && (
                  <g>
                    {ov('chest', [
                      'M 152,142 C 190,138 216,142 218,198 C 170,205 148,188 152,142 Z',
                      'M 288,142 C 250,138 224,142 222,198 C 270,205 292,188 288,142 Z',
                    ])}
                    {ov('shoulders', [
                      'M 148,138 C 122,145 104,175 110,215 C 138,225 158,198 152,165 Z',
                      'M 292,138 C 318,145 336,175 330,215 C 302,225 282,198 288,165 Z',
                    ])}
                    {ov('biceps', [
                      'M 110,215 C 98,245 108,282 128,282 C 145,268 145,232 138,210 Z',
                      'M 330,215 C 342,245 332,282 312,282 C 295,268 295,232 302,210 Z',
                    ])}
                    {ov('forearms', [
                      'M 126,285 C 98,335 92,385 110,390 L 132,380 C 138,335 135,298 128,285 Z',
                      'M 314,285 C 342,335 348,385 330,390 L 308,380 C 302,335 305,298 312,285 Z',
                    ])}
                    {ov('abs', [
                      'M 186,200 L 216,200 L 216,235 L 186,235 Z',
                      'M 224,200 L 254,200 L 254,235 L 224,235 Z',
                      'M 187,240 L 216,240 L 216,275 L 187,275 Z',
                      'M 224,240 L 253,240 L 253,275 L 224,275 Z',
                      'M 188,280 L 216,280 L 216,320 L 188,320 Z',
                      'M 224,280 L 252,280 L 252,320 L 224,320 Z',
                    ])}
                    {ov('obliques', [
                      'M 152,205 L 175,205 L 178,315 L 158,300 Z',
                      'M 288,205 L 265,205 L 262,315 L 282,300 Z',
                    ])}
                    {ov('quads', [
                      'M 165,340 C 145,400 152,500 185,510 C 215,510 218,400 212,340 Z',
                      'M 275,340 C 295,400 288,500 255,510 C 225,510 222,400 228,340 Z',
                    ])}
                    {ov('calves', [
                      'M 165,540 C 148,590 160,655 178,665 L 198,665 C 205,600 198,540 192,540 Z',
                      'M 275,540 C 292,590 280,655 262,665 L 242,665 C 235,600 242,540 248,540 Z',
                    ])}
                  </g>
                )}
                {view === 'back' && (
                  <g>
                    {ov('traps', [
                      'M 220,95 L 280,128 L 220,185 L 160,128 Z',
                    ])}
                    {ov('upper_back', [
                      'M 165,128 L 275,128 L 260,185 L 180,185 Z',
                    ])}
                    {ov('lats', [
                      'M 148,140 L 180,185 L 180,268 L 148,245 Z',
                      'M 292,140 L 260,185 L 260,268 L 292,245 Z',
                    ])}
                    {ov('triceps', [
                      'M 142,138 C 115,178 120,255 132,260 C 146,245 152,185 152,148 Z',
                      'M 298,138 C 325,178 320,255 308,260 C 294,245 288,185 288,148 Z',
                    ])}
                    {ov('lower_back', [
                      'M 182,265 L 258,265 L 250,332 L 190,332 Z',
                    ])}
                    {ov('glutes', [
                      'M 152,335 C 152,415 218,415 218,335 Z',
                      'M 288,335 C 288,415 222,415 222,335 Z',
                    ])}
                    {ov('hamstrings', [
                      'M 155,420 L 210,420 L 205,520 L 168,520 Z',
                      'M 285,420 L 230,420 L 235,520 L 272,520 Z',
                    ])}
                    {ov('calves', [
                      'M 162,545 C 140,595 160,655 178,665 L 198,665 C 208,600 196,545 192,545 Z',
                      'M 278,545 C 300,595 280,655 262,665 L 242,665 C 232,600 244,545 248,545 Z',
                    ])}
                  </g>
                )}
              </svg>
              {primaryId && MUSCLE_VIEW[primaryId] === view && (
                <div className="absolute inset-0 pointer-events-none rounded-2xl bg-[#C6FF00]/5 animate-pulse" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="px-4 pb-3 space-y-1.5">
          <div className="flex items-center gap-2.5 text-[11px]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6FF00] shadow-[0_0_6px_#C6FF00] flex-shrink-0" />
            <span className="text-[#B8C2CF]">
              <strong className="text-white">Primary: </strong>
              {primaryId ? MUSCLE_LABELS[primaryId] || exercise?.primaryMuscle : 'N/A'}
            </span>
          </div>
          {secondaryIds.length > 0 && (
            <div className="flex items-start gap-2.5 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#28D7FF] shadow-[0_0_6px_#28D7FF] flex-shrink-0 mt-0.5" />
              <span className="text-[#B8C2CF]">
                <strong className="text-white">Secondary: </strong>
                {secondaryIds.map(id => MUSCLE_LABELS[id]).filter(Boolean).join(', ')}
              </span>
            </div>
          )}
        </div>

        {allHighlighted.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-4 pb-4">
            {[primaryId, ...secondaryIds].filter(Boolean).map((id, i) => (
              <span key={id} className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                i === 0
                  ? 'bg-[#C6FF00]/10 border-[#C6FF00]/40 text-[#C6FF00]'
                  : 'bg-[#28D7FF]/10 border-[#28D7FF]/30 text-[#28D7FF]'
              }`}>
                {i === 0 ? '⚡' : '→'} {MUSCLE_LABELS[id] || id}
              </span>
            ))}
          </div>
        )}

        {frontVisible.length > 0 && backVisible.length > 0 && (
          <div className="px-4 pb-3 text-center">
            <p className="text-[10px] text-[#7E8A99] italic">
              Flip front/back to see all activated muscles
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
