import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Dumbbell, Target, CheckCircle2, AlertTriangle, Lightbulb, Plus, Zap, Award } from 'lucide-react';
import { exerciseImageMap } from '../data/exerciseImageMap';

export const ExerciseDetailModal = ({ exercise, userLevel, onClose, onAddToWorkout }) => {
  if (!exercise) return null;

  const getExerciseVisual = (name) => {
    return exerciseImageMap[name] || '/assets/exercises/placeholder.svg';
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Intermediate':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Advanced':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop Fade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container Scale (0.96 -> 1) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#0b0c10] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8 overflow-hidden z-10"
        >
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header: Title & Badges */}
        <div className="flex flex-col sm:flex-row items-start gap-5 border-b border-white/10 pb-5">
          {/* Exercise Visual */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gray-900 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
            <img
              src={getExerciseVisual(exercise.name)}
              alt={exercise.name}
              className="w-full h-full object-contain filter drop-shadow-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/exercises/placeholder.svg';
              }}
            />
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(exercise.difficulty)}`}>
                {exercise.difficulty === 'Beginner' ? '🌱 Beginner Friendly' : exercise.difficulty}
              </span>
              {exercise.focusTag && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/30">
                  ⚡ {exercise.focusTag}
                </span>
              )}
            </div>

            <h2 className="text-2xl font-heading font-black text-white">{exercise.name}</h2>
            <p className="text-xs text-gray-300 leading-relaxed">{exercise.description}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block flex items-center gap-1">
              <Target className="w-3 h-3 text-[#ccff00]" /> Primary Muscle
            </span>
            <span className="text-xs font-bold text-white block truncate">{exercise.primaryMuscle}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block flex items-center gap-1">
              <Dumbbell className="w-3 h-3 text-cyan-400" /> Equipment
            </span>
            <span className="text-xs font-bold text-white block truncate">{exercise.equipment}</span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-400" /> Secondary
            </span>
            <span className="text-xs font-bold text-gray-300 block truncate">
              {exercise.secondaryMuscles?.length ? exercise.secondaryMuscles.join(', ') : 'None'}
            </span>
          </div>
        </div>

        {/* Instructions / Steps */}
        <div className="space-y-3">
          <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#ccff00]" /> How to Perform Step-by-Step
          </h3>
          <ol className="space-y-2 text-xs text-gray-300">
            {exercise.steps?.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5 bg-white/5 p-2.5 rounded-xl border border-white/5">
                <span className="w-5 h-5 rounded-full bg-[#ccff00]/20 text-[#ccff00] font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Mistakes & Tips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Mistakes */}
          <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Common Mistakes
            </h4>
            <ul className="space-y-1.5 text-[11px] text-gray-300 list-disc list-inside">
              {exercise.commonMistakes?.map((mistake, i) => (
                <li key={i}>{mistake}</li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" /> Pro Tips
            </h4>
            <ul className="space-y-1.5 text-[11px] text-gray-300 list-disc list-inside">
              {exercise.tips?.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>Target Muscle: <strong className="text-white">{exercise.primaryMuscle}</strong></span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-gray-300 hover:bg-white/5 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onAddToWorkout(exercise);
                onClose();
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#ccff00] text-black text-xs font-black hover:bg-lime-400 shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Add to Workout
            </button>
          </div>
        </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
