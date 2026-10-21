import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { workoutAPI, fitnessAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import {
  Dumbbell, Play, CheckCircle2, Clock, Flame, ChevronRight, ChevronLeft,
  Pause, RotateCcw, Award, Check, Sparkles, X, Activity, Eye, Info, HelpCircle, Shield, RefreshCw
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { exerciseImageMap, PLACEHOLDER_IMAGE, getExerciseImage } from '../data/exerciseImageMap';
import { WorkoutCompletion3DModal } from '../components/3d/WorkoutCompletion3DModal';
import { ExerciseMotionVisualizer } from '../components/ExerciseMotionVisualizer';
import homeWorkoutImg from '../assets/repforge_home_workout.png';
import { CornerTechAccents } from '../components/DecorativeGraphics';

// Form Technique Guidance Instructions
const exerciseInstructionMap = {
  "Lat Pulldowns": "Grip the bar slightly wider than shoulder-width. Sit straight and pull the bar down smoothly to upper chest while contracting your lats.",
  "Bent-Over Barbell Rows": "Hinge forward at hips with flat back. Pull the barbell up towards lower ribs while driving elbows backward.",
  "Seated Cable Rows": "Sit with slight knee bend. Pull handle to midsection while squeezing shoulder blades together and maintaining upright posture.",
  "EZ-Bar Bicep Curls": "Hold EZ bar with underhand grip. Keep elbows stationary at sides and curl weight up towards chest level.",
  "Hammer Curls": "Hold dumbbells in neutral grip (palms facing each other). Raise dumbbells upward while isolating biceps and brachialis.",
  "Barbell Bench Press": "Lie flat on bench. Lower bar slowly to sternum height and press upward explosively while keeping shoulder blades pinched.",
  "Incline Dumbbell Press": "Set incline to 30-45 degrees. Press dumbbells straight up over upper chest level and lower under control.",
  "Cable Chest Flyes": "Set pulleys at shoulder height. Bring handles together in front of chest in a wide hugging arc motion.",
  "Triceps Rope Pushdowns": "Attach rope to high pulley. Keep elbows tucked at ribs and push rope down, spreading ends apart at bottom for full extension.",
  "Skull Crushers": "Lie on bench holding EZ bar. Bend elbows to lower weight towards forehead, then press back up extending triceps.",
  "Dips": "Suspend body on parallel bars. Lower body by bending elbows to 90 degrees, then push up to full arm extension.",
  "Barbell Back Squats": "Place bar across upper traps. Lower hips back and down until thighs reach parallel with floor, then drive up through heels.",
  "Romanian Deadlifts": "Hold bar with overhand grip. Hinge hips backward while sliding bar down shins until hamstrings are fully stretched.",
  "Leg Press": "Place feet shoulder-width apart on platform. Lower platform slowly until knees reach 90 degrees, then press up without locking knees.",
  "Standing Calf Raises": "Stand on edge of step or platform. Raise heels as high as possible, contract calves at top, and lower stretch smoothly.",
  "Hanging Leg Raises": "Grip pullup bar. Raise legs up until parallel to floor, contracting lower abs without swinging momentum.",
  "Light Incline Treadmill Walk": "Walk at steady pace on incline setting to build cardiovascular endurance and burn calories.",
  "Plank Hold": "Hold body rigid in straight line supported on forearms and toes. Keep core tightly braced.",
  "Ab Wheel Rollouts": "Kneel on mat holding ab wheel. Roll forward extending arms and body, then contract abs to pull back.",
  "Overhead Dumbbell Press": "Sit upright holding dumbbells at shoulder level. Press overhead until arms extend vertically.",
  "Lateral Cable Raises": "Stand beside low cable. Raise arm out to side until parallel to floor, isolating side deltoids.",
  "Face Pulls": "Pull cable rope towards upper forehead, separating hands and flaring elbows to target rear deltoids.",
  "Preacher Curls": "Rest upper arms on preacher bench. Curl weight up concentrating tension on bicep peak.",
  "Overhead Tricep Extensions": "Hold weight overhead with both hands. Lower behind neck by bending elbows, then press back up.",
  "Conventional Deadlift": "Stand over bar, grip shoulder-width. Lift bar keeping spine flat, driving hips forward at top.",
  "Dumbbell Walking Lunges": "Step forward into lunge until back knee nearly touches floor, then push up into next stride.",
  "Push-Ups to Renegade Row": "Perform push-up on dumbbells, then row one dumbbell to hip level. Alternate sides.",
  "Full Body Dynamic Stretching": "Perform active mobility exercises to warm up joints and increase dynamic flexibility.",
  "Foam Rolling Major Muscles": "Roll foam roller over quads, hamstrings, and back to release muscle tightness and accelerate recovery."
};



function getExerciseInstruction(exName) {
  if (!exName) return "Focus on proper form, steady breathing, and controlled progressive overload.";
  return exerciseInstructionMap[exName] || "Focus on proper form, steady breathing, and controlled progressive overload.";
}

export const WorkoutPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [workouts, setWorkouts] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [loading, setLoading] = useState(true);

  // Workout Mode State
  const [inWorkoutMode, setInWorkoutMode] = useState(false);
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [currentSetNum, setCurrentSetNum] = useState(1);
  const [userEnteredWeight, setUserEnteredWeight] = useState('');

  // Demo Modal State
  const [demoModalEx, setDemoModalEx] = useState(null);

  // Reassessment Modal
  const [showReassessPrompt, setShowReassessPrompt] = useState(false);

  // Timer State
  const [restTimeLeft, setRestTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Completion Summary State
  const [workoutCompletedSummary, setWorkoutCompletedSummary] = useState(null);
  const [workoutDifficulty, setWorkoutDifficulty] = useState('Perfect');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const userLevel = user?.experienceLevel || 'Beginner';

  useEffect(() => {
    fetchWorkouts();
  }, []);

  useEffect(() => {
    let interval = null;
    if (timerActive && restTimeLeft > 0) {
      interval = setInterval(() => {
        setRestTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (restTimeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, restTimeLeft]);

  const fetchWorkouts = async () => {
    try {
      const data = await workoutAPI.getWorkouts();
      setWorkouts(data);
      const todayStr = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      if (days.includes(todayStr)) {
        setSelectedDay(todayStr);
      }
    } catch (err) {
      console.error('Fetch workouts error:', err);
    } finally {
      setLoading(false);
    }
  };

  const activeWorkout = workouts.find(w => w.day === selectedDay) || workouts[0];

  const currentEx = activeWorkout?.exercises?.[currentExIndex];
  const activeExImg = currentEx ? getExerciseImage(currentEx.name) : PLACEHOLDER_IMAGE;
  const activeExInstruction = currentEx ? getExerciseInstruction(currentEx.name) : "";

  useEffect(() => {
    if (currentEx) {
      setUserEnteredWeight(currentEx.lastUsedWeight || currentEx.suggestedWeight || 20);
    }
  }, [currentExIndex, currentEx]);

  const handleToggleExercise = async (exId) => {
    if (!activeWorkout) return;
    try {
      const updated = await workoutAPI.toggleExercise({
        workoutId: activeWorkout._id || activeWorkout.id,
        exerciseId: exId
      });
      setWorkouts(prev => prev.map(w => (w._id === updated._id || w.id === updated.id) ? updated : w));
    } catch (err) {
      console.error('Toggle error:', err);
    }
  };

  // Workout Mode Actions
  const startWorkoutMode = () => {
    setInWorkoutMode(true);
    setCurrentExIndex(0);
    setCurrentSetNum(1);
    setRestTimeLeft(0);
    setTimerActive(false);
  };

  const handleCompleteSet = async () => {
    if (!currentEx) return;

    const actualWeight = parseFloat(userEnteredWeight) || currentEx.suggestedWeight || 20;

    try {
      const updatedWorkout = await workoutAPI.logSet({
        workoutId: activeWorkout._id || activeWorkout.id,
        exerciseId: currentEx.id || currentEx._id,
        setNum: currentSetNum,
        weight: actualWeight,
        reps: parseInt(currentEx.reps) || 10
      });

      // Update state with saved workout
      setWorkouts(prev => prev.map(w => (w._id === updatedWorkout._id || w.id === updatedWorkout.id) ? updatedWorkout : w));

      // Start Rest Timer
      setRestTimeLeft(currentEx.restTime || 90);
      setTimerActive(true);

      // Advance Set or Exercise
      if (currentSetNum < currentEx.sets) {
        setCurrentSetNum(prev => prev + 1);
      } else {
        // Completed all sets for this exercise
        handleToggleExercise(currentEx.id || currentEx._id);
        if (currentExIndex < activeWorkout.exercises.length - 1) {
          setCurrentExIndex(prev => prev + 1);
          setCurrentSetNum(1);
        } else {
          // Finished entire workout!
          finishEntireWorkout();
        }
      }
    } catch (err) {
      console.error('Log set error:', err);
    }
  };

  const finishEntireWorkout = async () => {
    try {
      const res = await workoutAPI.completeWorkout({
        workoutId: activeWorkout._id || activeWorkout.id,
        durationMinutes: activeWorkout.estimatedTime || 55,
        feedback: workoutDifficulty
      });

      setInWorkoutMode(false);
      setWorkoutCompletedSummary(res.summary);

      // Trigger Confetti!
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Finish workout error:', err);
    }
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getLevelBadgeColor = (lvl) => {
    switch (lvl) {
      case 'Advanced': return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Intermediate': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'Beginner':
      default: return 'bg-[#ccff00]/15 text-[#ccff00] border-[#ccff00]/40';
    }
  };

  const getIntensityText = (lvl) => {
    switch (lvl) {
      case 'Advanced': return 'Challenging Weight — Use a load matching rep range while maintaining controlled technique.';
      case 'Intermediate': return 'Moderate to Challenging Weight — Choose a weight where the final 2–3 reps feel challenging.';
      case 'Beginner':
      default: return 'Light to Moderate Weight — Choose a weight you can control comfortably while learning proper form.';
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-gray-400 font-semibold">{t('common.loading', 'Loading workout schedules...')}</div>;
  }

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header & Day Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card rounded-3xl p-6 border border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
              <Dumbbell className="w-6 h-6 text-[#ccff00]" /> {t('nav.workout', 'Workout Routine')}
            </h2>
            {/* Level Badge */}
            <span className={`px-3 py-1 rounded-full text-xs font-heading font-black border uppercase tracking-wider ${getLevelBadgeColor(userLevel)}`}>
              {userLevel} PLAN
            </span>
          </div>
          <p className="text-xs text-gray-400">
            {getIntensityText(userLevel)}
          </p>
        </div>

        <button
          onClick={startWorkoutMode}
          className="px-5 py-2.5 rounded-xl bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)] flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Play className="w-4 h-4 fill-black" />
          <span>Start Workout Mode</span>
        </button>
      </div>

      {/* Days Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {days.map(d => {
          const isSelected = selectedDay === d;
          return (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.25)]'
                  : 'bg-[#121318] border border-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>

      {/* Active Workout Card Overview */}
      {activeWorkout && (
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#ccff00] font-bold uppercase tracking-wider block">{activeWorkout.day} Split</span>
                <span className="text-[10px] text-gray-400 font-bold">({userLevel} Program)</span>
              </div>
              <h3 className="text-xl font-heading font-extrabold text-white">{activeWorkout.title}</h3>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-gray-300">
                <Clock className="w-4 h-4 text-cyan-400" /> {activeWorkout.estimatedTime} Mins
              </span>
              <span className="flex items-center gap-1.5 text-gray-300">
                <Flame className="w-4 h-4 text-orange-400" /> {activeWorkout.estimatedCalories} kcal
              </span>
            </div>
          </div>

          {/* Exercise List Cards with Strict Matching Image Thumbnails */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeWorkout.exercises?.map((ex, idx) => {
              const imgSrc = getExerciseImage(ex.name);
              const instruction = getExerciseInstruction(ex.name);

              return (
                <div
                  key={ex.id || idx}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
                    ex.completed
                      ? 'bg-[#ccff00]/5 border-[#ccff00]/40 text-gray-300'
                      : 'bg-[#121318] border-white/5 text-white hover:border-white/20'
                  }`}
                >
                  {/* Strict Exercise Image Thumbnail on Left */}
                  <div className="relative w-full sm:w-28 h-28 sm:h-24 rounded-2xl overflow-hidden bg-[#0b0c10] border border-white/10 shrink-0">
                    <img
                      src={imgSrc}
                      alt={ex.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = PLACEHOLDER_IMAGE;
                      }}
                    />
                    <button
                      onClick={() => setDemoModalEx({ ...ex, imgSrc, instruction })}
                      className="absolute bottom-1.5 right-1.5 p-1 rounded-lg bg-black/70 backdrop-blur-md text-[#ccff00] hover:bg-[#ccff00] hover:text-black transition-all text-[10px] font-bold flex items-center gap-1 px-1.5"
                      title="View Exercise Form Guide"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Demo</span>
                    </button>
                  </div>

                  {/* Details on Right */}
                  <div className="flex-1 space-y-2 min-w-0 w-full">
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-heading font-extrabold text-white leading-tight truncate">{ex.name}</h4>
                        <button
                          onClick={() => handleToggleExercise(ex.id || ex._id)}
                          className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                            ex.completed
                              ? 'bg-[#ccff00] text-black shadow-[0_0_10px_rgba(204,255,0,0.4)]'
                              : 'border border-white/20 hover:border-[#ccff00]'
                          }`}
                        >
                          {ex.completed && <Check className="w-4 h-4 stroke-[3]" />}
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-[#ccff00] border border-[#ccff00]/20 font-bold">
                          {ex.targetMuscle}
                        </span>
                        {ex.lastUsedWeight ? (
                          <span className="text-[10px] text-cyan-400 font-semibold">
                            Last: {ex.lastUsedWeight}kg
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 font-medium pt-0.5 border-t border-white/5">
                      <span><strong className="text-white">{ex.sets}</strong> Sets</span>
                      <span>• <strong className="text-white">{ex.reps}</strong> Reps</span>
                      <span>• Rest: <strong className="text-cyan-400">{ex.restTime}s</strong></span>
                      <span>• Rec: <strong className="text-[#ccff00]">{ex.suggestedWeight}kg</strong></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Requirement 7: Home Workout Visual Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden border border-orange-500/30 shadow-2xl bg-black min-h-[200px] flex items-center p-6 sm:p-8 group"
      >
        <img
          src={homeWorkoutImg}
          alt="No Gym? No Problem. Home Workout"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover img-hover-zoom filter brightness-[0.45] group-hover:brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <CornerTechAccents />

        <div className="relative z-20 space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-[11px] font-black tracking-wider uppercase">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>EQUIPMENT-FREE CONDITIONING</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-tight">
            NO GYM? <span className="text-orange-400">NO PROBLEM.</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Target bodyweight pushups, squats, lunges, and core holds. Stay consistent with 6 exercises per muscle group, anytime, anywhere.
          </p>
        </div>
      </motion.div>

      {/* 2. Live Workout Player Screen with Level Badge & Weight Tracking */}
      {inWorkoutMode && currentEx && (
        <div className="fixed inset-0 z-50 bg-[#0b0c10]/95 backdrop-blur-xl p-4 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in fade-in">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div>
                <span className="text-xs text-[#ccff00] font-bold uppercase tracking-wider block">Live Workout Player</span>
                <h2 className="text-xl font-heading font-extrabold text-white">{activeWorkout?.title}</h2>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${getLevelBadgeColor(userLevel)}`}>
                {userLevel} Mode
              </span>
            </div>
            <button
              onClick={() => setInWorkoutMode(false)}
              className="p-2.5 rounded-xl bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Exercise Main Display Card with Large Exact Exercise Visual */}
          <div className="max-w-2xl mx-auto w-full my-auto space-y-6 text-center py-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] font-bold text-xs">
              Exercise {currentExIndex + 1} of {activeWorkout?.exercises?.length}
            </div>

            {/* Exact Exercise Visual Player Display */}
            <div className="relative w-full max-w-lg h-52 sm:h-60 rounded-3xl overflow-hidden border border-white/15 shadow-2xl mx-auto bg-[#0b0c10] group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentEx.name}
                  src={activeExImg}
                  alt={currentEx.name}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = PLACEHOLDER_IMAGE;
                  }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-bold text-[#ccff00]">
                Target: {currentEx.targetMuscle}
              </div>

              <button
                onClick={() => setDemoModalEx({ ...currentEx, imgSrc: activeExImg, instruction: activeExInstruction })}
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-[#ccff00] text-black font-bold text-xs flex items-center gap-1.5 hover:bg-[#b8e600] transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <Info className="w-4 h-4" />
                <span>Form Guide</span>
              </button>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">{currentEx.name}</h1>
              <p className="text-xs text-cyan-300 italic max-w-md mx-auto">{getIntensityText(userLevel)}</p>
            </div>

            {/* Set Progress & Working Weight Setup */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-md mx-auto">
              <div className="p-3.5 rounded-2xl bg-[#121318] border border-white/10">
                <span className="text-[10px] text-gray-400 block font-medium">Set Progress</span>
                <span className="text-lg font-black text-[#ccff00] font-heading">Set {currentSetNum} of {currentEx.sets}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#121318] border border-white/10">
                <span className="text-[10px] text-gray-400 block font-medium">Last Used / Target</span>
                <span className="text-lg font-black text-white font-heading">
                  {currentEx.lastUsedWeight ? `${currentEx.lastUsedWeight}kg` : `${currentEx.suggestedWeight}kg`} × {currentEx.reps}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#121318] border border-[#ccff00]/30">
                <span className="text-[10px] text-gray-400 block font-medium">Weight Used (kg)</span>
                <input
                  type="number"
                  step="0.5"
                  value={userEnteredWeight}
                  onChange={(e) => setUserEnteredWeight(e.target.value)}
                  className="w-full text-center bg-black/50 border border-white/10 rounded-lg text-sm font-bold text-[#ccff00] focus:outline-none focus:border-[#ccff00] py-0.5 mt-0.5"
                />
              </div>
            </div>

            {/* Interactive Rest Timer Display */}
            {restTimeLeft > 0 ? (
              <div className="p-6 rounded-3xl bg-[#121318] border border-[#ccff00]/40 max-w-md mx-auto space-y-3 animate-timer shadow-[0_0_25px_rgba(204,255,0,0.15)]">
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Rest Timer Active</span>
                <span className="text-4xl font-extrabold text-[#ccff00] font-heading block">{formatTimer(restTimeLeft)}</span>
                <div className="flex items-center justify-center gap-3 pt-1">
                  <button
                    onClick={() => setTimerActive(!timerActive)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-xs font-bold text-white hover:bg-white/20 transition-all cursor-pointer"
                  >
                    {timerActive ? 'Pause Rest' : 'Resume Rest'}
                  </button>
                  <button
                    onClick={() => setRestTimeLeft(0)}
                    className="px-4 py-2 rounded-xl bg-[#ccff00]/20 text-[#ccff00] text-xs font-bold hover:bg-[#ccff00]/30 transition-all cursor-pointer"
                  >
                    Skip Rest
                  </button>
                </div>
              </div>
            ) : null}

            {/* Actions */}
            <div className="flex items-center justify-center gap-4 max-w-md mx-auto pt-2">
              <button
                disabled={currentExIndex === 0 && currentSetNum === 1}
                onClick={() => {
                  if (currentSetNum > 1) setCurrentSetNum(prev => prev - 1);
                  else if (currentExIndex > 0) {
                    setCurrentExIndex(prev => prev - 1);
                    setCurrentSetNum(activeWorkout.exercises[currentExIndex - 1].sets);
                  }
                }}
                className="px-5 py-3.5 rounded-2xl border border-white/10 text-xs font-bold text-gray-300 hover:bg-white/5 transition-all disabled:opacity-40 cursor-pointer"
              >
                Previous Set
              </button>

              <button
                onClick={handleCompleteSet}
                className="flex-1 py-4 rounded-2xl bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#b8e600] transition-all shadow-[0_0_20px_rgba(204,255,0,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-5 h-5 stroke-[3]" />
                <span>Complete Set {currentSetNum}</span>
              </button>
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="w-full max-w-xl mx-auto h-2 rounded-full bg-[#121318] overflow-hidden mt-4">
            <div
              className="h-full bg-[#ccff00] transition-all duration-300"
              style={{ width: `${((currentExIndex + (currentSetNum / currentEx.sets)) / activeWorkout.exercises.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* 3. Exercise Form Guide Demo Modal */}
      {demoModalEx && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161D27] max-w-xl w-full rounded-3xl border border-[#2A3442] p-6 space-y-5 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setDemoModalEx(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#121821] border border-[#2A3442] text-[#B8C2CF] hover:text-white transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[11px] font-mono text-[#C6FF00] uppercase font-bold tracking-wider block mb-0.5">Live Form & Motion Guide</span>
              <h3 className="text-xl font-heading font-black text-white">{demoModalEx.name}</h3>
            </div>

            {/* Live Vector Motion Demonstrator */}
            <ExerciseMotionVisualizer exerciseName={demoModalEx.name} />

            {/* Modal Details & Form Instructions */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#121821] border border-[#2A3442] space-y-2">
                <span className="text-xs font-bold text-[#C6FF00] uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#C6FF00]" /> Technique Instructions
                </span>
                <p className="text-xs text-[#B8C2CF] leading-relaxed">
                  {demoModalEx.instruction}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="p-3 rounded-xl bg-[#121821] border border-[#2A3442]">
                  <span className="text-[10px] text-[#7E8A99] block">Sets</span>
                  <span className="text-sm font-bold text-white">{demoModalEx.sets}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#121821] border border-[#2A3442]">
                  <span className="text-[10px] text-[#7E8A99] block">Reps</span>
                  <span className="text-sm font-bold text-white">{demoModalEx.reps}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#121821] border border-[#2A3442]">
                  <span className="text-[10px] text-[#7E8A99] block">Rest</span>
                  <span className="text-sm font-bold text-[#28D7FF] font-mono">{demoModalEx.restTime}s</span>
                </div>
              </div>

              <button
                onClick={() => setDemoModalEx(null)}
                className="w-full py-3 rounded-2xl bg-[#C6FF00] text-[#0B0F14] font-extrabold text-xs uppercase tracking-wider hover:bg-[#9BEA00] transition-all cursor-pointer mt-2 shadow-lg"
              >
                Got It, Resume Workout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. 3D Workout Completion Celebratory Modal */}
      <WorkoutCompletion3DModal
        isOpen={!!workoutCompletedSummary}
        onClose={() => setWorkoutCompletedSummary(null)}
        workoutTitle={workoutCompletedSummary?.title || 'Workout Session'}
      />
    </div>
  );
};
