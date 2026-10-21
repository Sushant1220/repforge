import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, UserCheck, Sparkles, Image as ImageIcon, Activity, ShieldCheck } from 'lucide-react';
import { getExerciseImage, PLACEHOLDER_IMAGE } from '../data/exerciseImageMap';

// Real Athlete Exercise Photo Motion Database
const REAL_EXERCISE_PHOTOS = {
  "Barbell Bench Press": {
    photos: [
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press/0.jpg",
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press/1.jpg"
    ],
    target: "Pectoralis Major & Triceps",
    phases: [
      { name: "1. Setup & Unrack", desc: "Bar directly over chest, shoulder blades retracted into bench." },
      { name: "2. Eccentric Lowering", desc: "Lower bar under control to sternum, elbows tucked 45°." },
      { name: "3. Chest Contraction", desc: "Touch sternum lightly without bouncing." },
      { name: "4. Concentric Drive", desc: "Drive bar up explosively back to top lockout." }
    ]
  },
  "Incline Dumbbell Press": {
    photos: [
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Press/0.jpg",
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Press/1.jpg"
    ],
    target: "Upper Pectoralis (Clavicular Head)",
    phases: [
      { name: "1. Setup Position", desc: "Dumbbells at shoulder level on 30-45° incline bench." },
      { name: "2. Eccentric Stretch", desc: "Lower dumbbells until deep stretch in upper chest is felt." },
      { name: "3. Press Drive", desc: "Press dumbbells up and arc slightly inward overhead." },
      { name: "4. Peak Squeeze", desc: "Squeeze upper chest tightly at lockout." }
    ]
  },
  "Overhead Dumbbell Press": {
    photos: [
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Dumbbell_Press/0.jpg",
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Dumbbell_Press/1.jpg"
    ],
    target: "Anterior & Lateral Deltoids",
    phases: [
      { name: "1. Shoulder Rack", desc: "Sit upright with dumbbells at ear/shoulder height." },
      { name: "2. Overhead Press", desc: "Press vertically upward overhead without leaning back." },
      { name: "3. Overhead Lockout", desc: "Lock out arms directly above shoulders." },
      { name: "4. Controlled Return", desc: "Lower under control back to shoulder level." }
    ]
  },
  "Lat Pulldowns": {
    photos: [
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/0.jpg",
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/1.jpg"
    ],
    target: "Latissimus Dorsi & Rhomboids",
    phases: [
      { name: "1. Wide Grip Stretch", desc: "Grip bar wider than shoulder width, chest lifted." },
      { name: "2. Pull Drive", desc: "Drive elbows down and back toward back pockets." },
      { name: "3. Lat Squeeze", desc: "Bar touches upper chest, squeeze shoulder blades." },
      { name: "4. Controlled Stretch", desc: "Return bar upward under 3s control for lat elongation." }
    ]
  },
  "Barbell Back Squats": {
    photos: [
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Squat/0.jpg",
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Squat/1.jpg"
    ],
    target: "Quadriceps & Gluteus Maximus",
    phases: [
      { name: "1. Rack & Brace", desc: "Bar resting across traps, core braced 360°." },
      { name: "2. Hip Hinge Sit", desc: "Break hips and knees, sitting down between ankles." },
      { name: "3. Parallel Depth", desc: "Lower until hip crease drops parallel or below knees." },
      { name: "4. Drive Up", desc: "Drive up through mid-foot to full standing stance." }
    ]
  },
  "Romanian Deadlifts": {
    photos: [
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/0.jpg",
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/1.jpg"
    ],
    target: "Hamstrings & Glutes",
    phases: [
      { name: "1. Stand Tall", desc: "Hold bar at thigh level with soft knee bend." },
      { name: "2. Hip Hinge Back", desc: "Push hips backward toward wall behind you." },
      { name: "3. Hamstring Stretch", desc: "Lower bar to mid-shin keeping bar close to legs." },
      { name: "4. Hip Snap", desc: "Drive hips forward back to standing lockout." }
    ]
  },
  "EZ-Bar Bicep Curls": {
    photos: [
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/EZ-Bar_Curl/0.jpg",
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/EZ-Bar_Curl/1.jpg"
    ],
    target: "Biceps Brachii Peak",
    phases: [
      { name: "1. Bottom Stretch", desc: "Arms fully extended with elbows pinned at sides." },
      { name: "2. Concentric Curl", desc: "Curl bar upward toward shoulder height." },
      { name: "3. Peak Contraction", desc: "Squeeze bicep peak tightly at top." },
      { name: "4. Controlled Eccentric", desc: "Lower bar under 3-second control." }
    ]
  },
  "Triceps Rope Pushdowns": {
    photos: [
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pushdowns/0.jpg",
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pushdowns/1.jpg"
    ],
    target: "Triceps Lateral & Medial Head",
    phases: [
      { name: "1. 90° Setup", desc: "Hold rope with elbows pinned at ribs." },
      { name: "2. Pushdown", desc: "Extend arms downward, straightening elbows." },
      { name: "3. Lockout & Spread", desc: "Spread rope handles apart at bottom lockout." },
      { name: "4. Controlled Return", desc: "Return handle up under control to 90°." }
    ]
  },
  "Cable Chest Flyes": {
    photos: [
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Crossover/0.jpg",
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Crossover/1.jpg"
    ],
    target: "Sternal Chest",
    phases: [
      { name: "1. Staggered Setup", desc: "Step forward holding cable handles." },
      { name: "2. Arc Hug", desc: "Bring handles together in a wide hugging arc." },
      { name: "3. Squeeze", desc: "Pause for 1s squeezing chest at center." },
      { name: "4. Stretch Return", desc: "Slowly return handles for full chest stretch." }
    ]
  },
  "Hanging Leg Raises": {
    photos: [
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hanging_Leg_Raise/0.jpg",
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hanging_Leg_Raise/1.jpg"
    ],
    target: "Lower Abs & Core",
    phases: [
      { name: "1. Hang Setup", desc: "Hang from bar with straight legs and tight grip." },
      { name: "2. Leg Lift", desc: "Raise legs up until parallel to floor." },
      { name: "3. Peak Ab Hold", desc: "Squeeze abs tightly at top." },
      { name: "4. Controlled Drop", desc: "Lower legs slowly without swinging." }
    ]
  }
};

export const ExerciseMotionVisualizer = ({ exerciseName }) => {
  const data = REAL_EXERCISE_PHOTOS[exerciseName] || REAL_EXERCISE_PHOTOS["Overhead Dumbbell Press"];
  const [photoIndex, setPhotoIndex] = useState(0); // 0 or 1
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      const stepTimeMs = 1200 / speed;
      interval = setInterval(() => {
        setPhotoIndex(prev => (prev === 0 ? 1 : 0));
        setCurrentStep(prev => (prev + 1) % data.phases.length);
      }, stepTimeMs);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, data.phases.length]);

  const activePhase = data.phases[currentStep];

  return (
    <div className="w-full bg-[#121821] border border-[#2A3442] rounded-3xl p-4 sm:p-6 space-y-4 shadow-2xl relative overflow-hidden">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#C6FF00_1px,transparent_1px)] [background-size:20px_20px] opacity-5 pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 border-b border-[#2A3442] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C6FF00] animate-ping" />
          <span className="text-xs font-bold text-[#C6FF00] tracking-wider uppercase font-heading">
            Live Athlete Motion Execution
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] bg-[#161D27] border border-[#2A3442] text-[#B8C2CF] px-3 py-1 rounded-full font-mono">
            Target: <strong className="text-white">{data.target}</strong>
          </span>
        </div>
      </div>

      {/* Real Athlete Exercise Photo Motion Player */}
      <div className="relative w-full h-72 sm:h-80 bg-[#0B0F14] rounded-2xl border border-[#2A3442] overflow-hidden shadow-inner flex items-center justify-center">
        {!imageError ? (
          <AnimatePresence mode="wait">
            <motion.img
              key={photoIndex}
              src={data.photos[photoIndex]}
              alt={exerciseName}
              initial={{ opacity: 0.8, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full h-full object-contain p-2 filter contrast-105"
              onError={() => setImageError(true)}
            />
          </AnimatePresence>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={getExerciseImage(exerciseName)}
              alt={exerciseName}
              className="w-full h-full object-contain p-4"
              onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
            />
          </div>
        )}

        {/* Live Motion Status Overlay Badge */}
        <div className="absolute top-3 left-3 bg-[#161D27]/90 backdrop-blur-md border border-[#2A3442] px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs">
          <UserCheck className="w-4 h-4 text-[#C6FF00]" />
          <span className="text-white font-bold">
            {photoIndex === 0 ? "Phase A: Start Position" : "Phase B: Peak Contraction"}
          </span>
        </div>

        {/* Live Step Caption Banner */}
        <div className="absolute bottom-3 left-3 right-3 bg-[#161D27]/90 backdrop-blur-md border border-[#2A3442] p-3 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#C6FF00] block">{activePhase.name}</span>
            <p className="text-[11px] text-[#B8C2CF] line-clamp-1">{activePhase.desc}</p>
          </div>
          <span className="text-[10px] font-mono text-[#7E8A99] bg-[#0B0F14] px-2.5 py-1 rounded-md border border-[#2A3442]">
            Step {currentStep + 1}/{data.phases.length}
          </span>
        </div>
      </div>

      {/* Control Buttons & Step Selectors */}
      <div className="space-y-3 pt-1">
        {/* Step Buttons */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          {data.phases.map((ph, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentStep(idx);
                setPhotoIndex(idx % 2);
                setIsPlaying(false);
              }}
              className={`p-2 rounded-xl border text-left transition-all ${
                currentStep === idx
                  ? 'bg-[#1B2430] border-[#C6FF00] text-white shadow-[0_0_12px_rgba(198,255,0,0.2)]'
                  : 'bg-[#161D27] border-[#2A3442] text-[#7E8A99] hover:text-[#B8C2CF]'
              }`}
            >
              <span className="text-[10px] font-mono font-bold block opacity-70">Step {idx + 1}</span>
              <span className="text-[11px] font-semibold truncate block">{ph.name.split('.')[1] || ph.name}</span>
            </button>
          ))}
        </div>

        {/* Motion Controls Bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-xl bg-[#C6FF00] hover:bg-[#9BEA00] text-[#0B0F14] font-extrabold text-xs flex items-center gap-1.5 transition-transform active:scale-95 shadow-md cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              {isPlaying ? 'Pause Motion' : 'Play Motion'}
            </button>

            <button
              onClick={() => {
                setCurrentStep(0);
                setPhotoIndex(0);
                setIsPlaying(true);
              }}
              className="p-2 rounded-xl bg-[#161D27] border border-[#2A3442] text-[#B8C2CF] hover:text-white transition-colors cursor-pointer"
              title="Reset Rep"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-[#161D27] border border-[#2A3442] rounded-xl p-1">
            {[0.5, 1, 1.5].map(spd => (
              <button
                key={spd}
                onClick={() => setSpeed(spd)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-colors ${
                  speed === spd
                    ? 'bg-[#1B2430] text-[#C6FF00] font-bold border border-[#2A3442]'
                    : 'text-[#7E8A99] hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
