import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { HumanBodyMap } from '../components/HumanBodyMap';
import { AnatomyViewer3D } from '../components/3d/AnatomyViewer3D';
import { ExerciseDetailModal } from '../components/ExerciseDetailModal';
import { MUSCLE_GROUPS, STAGE_EXERCISES, HOME_STAGE_EXERCISES } from '../data/muscleExercises';
import { exerciseImageMap } from '../data/exerciseImageMap';
import {
  Search, Dumbbell, Sparkles, Plus, Eye, CheckCircle2, Target,
  Award, Layers, Zap, Flame, Compass, ChevronRight, Home, Building2, ShieldCheck, Box
} from 'lucide-react';

export const MuscleMapPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  // Selected muscle (default to 'chest')
  const [selectedMuscle, setSelectedMuscle] = useState('chest');
  
  // Map View Mode: '2d' | '3d' (default to '3d' on desktop, '2d' on mobile)
  const [mapMode, setMapMode] = useState('3d');

  // Workout Mode: 'Gym' | 'Home' (default to 'Gym')
  const [workoutMode, setWorkoutMode] = useState('Gym');

  // Experience level stage tab (default to user's fitness level or 'Beginner')
  const userLevel = user?.fitnessLevel || 'Beginner';
  const [activeStage, setActiveStage] = useState(userLevel);

  // Sync activeStage when user level changes or initially loads
  useEffect(() => {
    if (['Beginner', 'Intermediate', 'Advanced'].includes(userLevel)) {
      setActiveStage(userLevel);
    }
  }, [userLevel]);

  const [modalExercise, setModalExercise] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Get current muscle info
  const currentMuscleInfo = selectedMuscle ? MUSCLE_GROUPS[selectedMuscle] : null;

  // Expected exercises per stage depending on mode: Gym = 5, Home = 6
  const expectedCount = workoutMode === 'Home' ? 6 : 5;

  // Get stage-specific exercises (5 for Gym, 6 for Home)
  const currentStageExercises = useMemo(() => {
    if (!selectedMuscle) return [];
    const exerciseDataset = workoutMode === 'Home' ? HOME_STAGE_EXERCISES : STAGE_EXERCISES;
    if (!exerciseDataset || !exerciseDataset[selectedMuscle]) return [];
    return exerciseDataset[selectedMuscle][activeStage] || [];
  }, [selectedMuscle, workoutMode, activeStage]);

  // Add exercise to custom workout
  const handleAddToWorkout = (exercise) => {
    try {
      const stored = localStorage.getItem('fitforge_custom_workout') || '[]';
      const currentList = JSON.parse(stored);
      const exists = currentList.some(item => item.name === exercise.name);

      if (!exists) {
        currentList.push({
          id: `ex-${selectedMuscle}-${workoutMode.toLowerCase()}-${Date.now()}`,
          name: exercise.name,
          target: currentMuscleInfo?.primaryName || exercise.name,
          muscleKey: selectedMuscle,
          equipment: exercise.equipment,
          difficulty: activeStage,
          suggestion: exercise.suggestion,
          workoutMode: workoutMode,
          sets: 3,
          reps: '10-12',
          restTime: 60
        });
        localStorage.setItem('fitforge_custom_workout', JSON.stringify(currentList));
      }

      showToast(`"${exercise.name}" added to your workout! 💪🏻`);
    } catch (err) {
      console.error('Error adding to workout:', err);
      showToast(`Added "${exercise.name}" to your workout! 💪🏻`);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const getStageBadgeColor = (stage) => {
    switch (stage) {
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
    <div className="space-y-6 sm:space-y-8 pb-20 lg:pb-16 select-none max-w-full overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 px-5 py-3 rounded-2xl bg-[#ccff00] text-black font-black text-xs sm:text-sm shadow-[0_0_25px_rgba(204,255,0,0.5)] flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Page Header Banner */}
      <section className="relative glass-card rounded-3xl p-5 sm:p-8 border border-white/10 overflow-hidden bg-gradient-to-r from-[#121318] via-black to-[#0b0c10]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-black tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STAGED EXERCISE EXPLORER</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight">
              Interactive <span className="text-[#ccff00]">Muscle Map</span>
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Select a body part, switch between <strong>Gym</strong> &amp; <strong>Home</strong> workouts, and train by experience level.
            </p>
          </div>

          {/* User Experience Level Badge */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1 self-start md:self-auto min-w-[200px]">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">YOUR PROFILE LEVEL</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse" />
              <span className="text-sm sm:text-base font-black text-white">{userLevel} Athlete</span>
            </div>
            <p className="text-[11px] text-[#ccff00] font-bold">
              ⚡ Defaulting to {userLevel} stage
            </p>
          </div>
        </div>
      </section>

      {/* MOBILE / TABLET TOP CONTROLS (< lg screens) */}
      {/* Allows mobile users to set Workout Mode & Stage Level at the top before tapping muscles */}
      <div className="block lg:hidden space-y-4">
        {/* Workout Mode Segmented Control */}
        <div className="glass-card rounded-2xl p-2 border border-white/10 bg-black/60 shadow-inner">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block px-2 pb-1.5">
            1. SELECT WORKOUT MODE
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setWorkoutMode('Gym')}
              className={`min-h-[44px] py-2.5 px-3 rounded-xl border font-black text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                workoutMode === 'Gym'
                  ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                  : 'bg-black/40 text-gray-400 border-white/10 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4 stroke-[2.5]" />
              <span>Gym Workout</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                workoutMode === 'Gym' ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-300'
              }`}>
                5/stage
              </span>
            </button>

            <button
              type="button"
              onClick={() => setWorkoutMode('Home')}
              className={`min-h-[44px] py-2.5 px-3 rounded-xl border font-black text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                workoutMode === 'Home'
                  ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                  : 'bg-black/40 text-gray-400 border-white/10 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4 stroke-[2.5]" />
              <span>Home Workout</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                workoutMode === 'Home' ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-300'
              }`}>
                6/stage
              </span>
            </button>
          </div>
        </div>

        {/* Stage Level Horizontal Scrollable Segmented Control */}
        <div className="glass-card rounded-2xl p-2 border border-white/10 bg-black/60 shadow-inner">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block px-2 pb-1.5">
            2. SELECT EXPERIENCE LEVEL
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {['Beginner', 'Intermediate', 'Advanced'].map((stage) => {
              const isActive = activeStage === stage;
              const isUserRecommended = stage === userLevel;

              return (
                <button
                  key={stage}
                  onClick={() => setActiveStage(stage)}
                  className={`flex-1 min-w-[110px] min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.35)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-white/5'
                  }`}
                >
                  <span>
                    {stage === 'Beginner' ? '🌱' : stage === 'Intermediate' ? '⚡' : '🔥'}
                  </span>
                  <span>{stage} ({expectedCount})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Main Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: 3D / 2D Interactive Anatomical Body Map */}
        <div className="lg:col-span-5 sticky lg:top-24 space-y-4">
          {/* 3D vs 2D Viewport Mode Switcher */}
          <div className="flex items-center justify-between p-2 rounded-2xl bg-[#161D27] border border-[#2A3442] shadow-md">
            <span className="text-[10px] font-black text-[#7E8A99] uppercase tracking-wider px-2">
              ANATOMY VIEWPORT
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMapMode('3d')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  mapMode === '3d'
                    ? 'bg-[#C6FF00] text-[#0B0F14] shadow-[0_0_15px_rgba(198,255,0,0.25)]'
                    : 'text-[#B8C2CF] hover:text-[#F5F7FA] hover:bg-[#1B2430]'
                }`}
              >
                <Box className="w-3.5 h-3.5" /> 3D View
              </button>
              <button
                type="button"
                onClick={() => setMapMode('2d')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  mapMode === '2d'
                    ? 'bg-[#C6FF00] text-[#0B0F14] shadow-[0_0_15px_rgba(198,255,0,0.25)]'
                    : 'text-[#B8C2CF] hover:text-[#F5F7FA] hover:bg-[#1B2430]'
                }`}
              >
                <span>📐</span> 2D Map
              </button>
            </div>
          </div>

          {/* Render 3D Model or 2D Vector Map */}
          {mapMode === '3d' ? (
            <div className="bg-[#161D27] rounded-3xl p-4 border border-[#2A3442] space-y-3 shadow-lg">
              <AnatomyViewer3D
                selectedMuscle={selectedMuscle}
                onSelectMuscle={(id) => setSelectedMuscle(id)}
              />
            </div>
          ) : (
            <HumanBodyMap
              selectedMuscle={selectedMuscle}
              onSelectMuscle={(id) => setSelectedMuscle(id)}
            />
          )}
        </div>

        {/* RIGHT COLUMN: Desktop Mode Switchers, Stage Tabs & Exercises List */}
        <div className="lg:col-span-7 space-y-6">
          {selectedMuscle && currentMuscleInfo ? (
            <div className="space-y-6">
              {/* Muscle Group Title & Details Header */}
              <div className="glass-card rounded-3xl p-5 sm:p-6 border border-[#ccff00]/20 bg-gradient-to-r from-[#ccff00]/10 via-transparent to-transparent space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider block">TARGET MUSCLE GROUP</span>
                    <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
                      Top Exercises for <span className="text-[#ccff00]">{currentMuscleInfo.name}</span>
                    </h2>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-[#ccff00]/20 text-[#ccff00] border border-[#ccff00]/40 text-xs font-black">
                    {workoutMode === 'Home' ? '18 Home Exercises (6 per Stage)' : '15 Gym Exercises (5 per Stage)'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {currentMuscleInfo.description}
                </p>

                <div className="pt-1 flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 font-semibold">
                    <strong className="text-[#ccff00]">Primary:</strong> {currentMuscleInfo.primaryName}
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-400">
                    <strong>Secondary:</strong> {currentMuscleInfo.secondaryMuscles.join(', ')}
                  </span>
                </div>

                {/* DESKTOP-ONLY WORKOUT MODE SELECTOR (lg:block) */}
                <div className="hidden lg:block pt-3 border-t border-white/10">
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider block mb-2">
                    WORKOUT ENVIRONMENT MODE
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setWorkoutMode('Gym')}
                      className={`min-h-[44px] p-3.5 rounded-2xl border font-black text-sm transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer ${
                        workoutMode === 'Gym'
                          ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-[0_0_20px_rgba(204,255,0,0.3)] scale-[1.02]'
                          : 'bg-black/50 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <Building2 className="w-4 h-4 stroke-[2.5]" />
                      <span>Gym Workout</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        workoutMode === 'Gym' ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-300'
                      }`}>
                        5 / Stage
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setWorkoutMode('Home')}
                      className={`min-h-[44px] p-3.5 rounded-2xl border font-black text-sm transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer ${
                        workoutMode === 'Home'
                          ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-[0_0_20px_rgba(204,255,0,0.3)] scale-[1.02]'
                          : 'bg-black/50 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <Home className="w-4 h-4 stroke-[2.5]" />
                      <span>Home Workout</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        workoutMode === 'Home' ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-300'
                      }`}>
                        6 / Stage
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* DESKTOP-ONLY STAGE TABS: Beginner, Intermediate, Advanced (lg:flex) */}
              <div className="hidden lg:flex glass-card rounded-2xl p-2 border border-white/10 bg-black/60 items-center justify-between gap-2 shadow-inner">
                {['Beginner', 'Intermediate', 'Advanced'].map((stage) => {
                  const isActive = activeStage === stage;
                  const isUserRecommended = stage === userLevel;

                  return (
                    <button
                      key={stage}
                      onClick={() => setActiveStage(stage)}
                      className={`flex-1 min-h-[44px] py-3 px-3 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
                        isActive
                          ? 'bg-[#ccff00] text-black shadow-[0_0_20px_rgba(204,255,0,0.35)] scale-[1.02]'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>
                        {stage === 'Beginner' ? '🌱' : stage === 'Intermediate' ? '⚡' : '🔥'}
                      </span>
                      <span>{stage} ({expectedCount})</span>
                      {isUserRecommended && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${
                          isActive ? 'bg-black text-[#ccff00]' : 'bg-[#ccff00]/20 text-[#ccff00]'
                        }`}>
                          YOUR STAGE
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Stage Subtitle */}
              <div className="flex items-center justify-between text-xs px-2 text-gray-400 font-semibold">
                <span>
                  Showing {currentStageExercises.length} <strong>{workoutMode}</strong> exercises for <strong>{activeStage} Stage</strong>:
                </span>
                <span className="text-[#ccff00] font-bold">
                  {currentStageExercises.length} / {expectedCount} Loaded
                </span>
              </div>

              {/* Exercise Cards List with Staggered Entrance Animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedMuscle}-${workoutMode}-${activeStage}`}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.06
                      }
                    }
                  }}
                  className="space-y-4"
                >
                  {currentStageExercises.map((ex, index) => (
                    <motion.div
                      key={ex.name}
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
                      }}
                      className="glass-card glass-card-hover rounded-3xl p-4 sm:p-5 border border-white/10 hover:border-[#ccff00]/40 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(204,255,0,0.15)] flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
                    >
                      {/* Left Exercise Image / Visual */}
                      <div className="w-full sm:w-32 h-36 sm:h-32 rounded-2xl bg-gray-900/90 border border-white/10 flex-shrink-0 flex items-center justify-center p-2 relative overflow-hidden group-hover:scale-105 transition-transform">
                        <img
                          src={exerciseImageMap[ex.name] || '/assets/exercises/placeholder.svg'}
                          alt={ex.name}
                          loading="lazy"
                          className="w-full h-full object-contain filter drop-shadow-md"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/assets/exercises/placeholder.svg';
                          }}
                        />
                        <span className="absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-full bg-black/80 text-[#ccff00] border border-[#ccff00]/30">
                          #{index + 1}
                        </span>
                      </div>

                      {/* Middle Details */}
                      <div className="flex-1 space-y-2.5">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getStageBadgeColor(activeStage)}`}>
                            {activeStage === 'Beginner' ? '🌱 Beginner' : activeStage === 'Intermediate' ? '⚡ Intermediate' : '🔥 Advanced'}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-white/5 text-gray-300 border border-white/10">
                            🎯 {currentMuscleInfo.name}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/20 flex items-center gap-1">
                            {workoutMode === 'Home' ? <Home className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                            {workoutMode}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-heading font-black text-white group-hover:text-[#ccff00] transition-colors leading-snug">
                          {ex.name}
                        </h3>

                        <p className="text-xs text-gray-300 leading-relaxed line-clamp-2 sm:line-clamp-none">
                          {ex.desc}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] text-gray-300 font-semibold pt-1">
                          <span className="flex items-center gap-1 text-[#ccff00] bg-[#ccff00]/10 px-2.5 py-1 rounded-md border border-[#ccff00]/20">
                            <Zap className="w-3.5 h-3.5" /> {ex.suggestion}
                          </span>
                          <span className="flex items-center gap-1 text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                            <Dumbbell className="w-3.5 h-3.5" /> {ex.equipment}
                          </span>
                        </div>
                      </div>

                      {/* Right Buttons - Touch target minimum 44px height */}
                      <div className="flex sm:flex-col items-center gap-2.5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                        <button
                          onClick={() => setModalExercise({
                            name: ex.name,
                            primaryMuscle: currentMuscleInfo.name,
                            secondaryMuscles: currentMuscleInfo.secondaryMuscles,
                            equipment: ex.equipment,
                            difficulty: activeStage,
                            workoutMode: workoutMode,
                            description: ex.desc,
                            steps: [
                              `Set up with proper form using ${ex.equipment}.`,
                              `Engage ${currentMuscleInfo.name} and execute concentric movement under control.`,
                              `Squeeze at peak contraction for 1 second.`,
                              `Lower back slowly through full range of motion.`
                            ],
                            commonMistakes: [
                              'Using momentum or swinging body weight',
                              'Shortening range of motion at bottom/top'
                            ],
                            tips: [
                              `Aim for ${ex.suggestion} maintaining progressive overload.`
                            ]
                          })}
                          className="flex-1 sm:flex-none w-full sm:w-auto h-11 min-h-[44px] px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-200 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                        >
                          <Eye className="w-4 h-4" /> View Details
                        </button>
                        <button
                          onClick={() => handleAddToWorkout(ex)}
                          className="flex-1 sm:flex-none w-full sm:w-auto h-11 min-h-[44px] px-4 rounded-xl bg-[#ccff00] text-black text-xs font-extrabold hover:bg-lime-400 shadow-[0_0_15px_rgba(204,255,0,0.25)] transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                        >
                          <Plus className="w-4 h-4 stroke-[3]" /> Add to Workout
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            /* Empty State before selecting a muscle */
            <div className="glass-card rounded-3xl p-8 sm:p-12 text-center space-y-4 border border-white/10 bg-gradient-to-b from-[#121318] to-[#0b0c10]">
              <div className="w-16 h-16 rounded-2xl bg-[#ccff00]/10 text-[#ccff00] flex items-center justify-center mx-auto border border-[#ccff00]/30 shadow-[0_0_20px_rgba(204,255,0,0.2)]">
                <Dumbbell className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
                Select a muscle group
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                Select a muscle group on the body map to view exercises for Beginner, Intermediate, and Advanced levels.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Exercise Detail Modal */}
      {modalExercise && (
        <ExerciseDetailModal
          exercise={modalExercise}
          userLevel={userLevel}
          onClose={() => setModalExercise(null)}
          onAddToWorkout={handleAddToWorkout}
        />
      )}
    </div>
  );
};


