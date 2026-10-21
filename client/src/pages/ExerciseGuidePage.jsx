import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dumbbell, Search, Filter, Play, CheckCircle2, AlertTriangle, ShieldCheck,
  Sparkles, Flame, Zap, HelpCircle, Activity, ChevronRight, Bookmark, Info,
  Layers, ArrowUpRight, Check, X, RefreshCw
} from 'lucide-react';
import { exerciseImageMap, getExerciseImage } from '../data/exerciseImageMap';
import { ExerciseMotionVisualizer } from '../components/ExerciseMotionVisualizer';
import { ExerciseBodySync } from '../components/ExerciseBodySync';
import { FitForgeLogo } from '../components/FitForgeLogo';
import { CornerTechAccents } from '../components/DecorativeGraphics';

// Comprehensive Master Exercise Database with Form Execution Data
const EXERCISE_GUIDE_DATABASE = [
  // CHEST
  {
    id: "barbell-bench-press",
    name: "Barbell Bench Press",
    category: "Chest",
    equipment: "Barbell",
    difficulty: "Intermediate",
    rating: 4.9,
    primaryMuscle: "Pectoralis Major",
    secondaryMuscles: ["Triceps Brachii", "Anterior Deltoids"],
    tempo: "3-1-1-0",
    image: "/assets/exercises/barbell-bench-press.svg",
    description: "The gold standard upper body pushing compound exercise targeting maximum chest mass and raw pressing power.",
    setup: [
      "Lie flat on the bench with eyes directly under the racked bar.",
      "Grip the bar slightly wider than shoulder-width with a firm overhand grip.",
      "Pull shoulder blades back and down into the bench to create a stable base.",
      "Plant feet flat on the floor to drive leg drive into the press."
    ],
    execution: [
      "Unrack the bar and position it directly over upper chest with arms fully extended.",
      "Inhale deep, brace core, and lower bar smoothly under 3-second control to mid-sternum.",
      "Touch chest gently without bouncing the bar off ribs.",
      "Press upward explosively while driving through feet until arms lock out."
    ],
    commonMistakes: [
      "Flaring elbows at 90° angles (causes severe shoulder impingement).",
      "Bouncing the barbell violently off the ribcage.",
      "Lifting hips and glutes off the bench during heavy drive."
    ],
    proTips: "Tuck elbows at roughly a 45° angle to your torso throughout the eccentric phase to protect shoulder joints."
  },
  {
    id: "incline-dumbbell-press",
    name: "Incline Dumbbell Press",
    category: "Chest",
    equipment: "Dumbbell",
    difficulty: "Intermediate",
    rating: 4.8,
    primaryMuscle: "Upper Pectoralis (Clavicular Head)",
    secondaryMuscles: ["Anterior Deltoid", "Triceps"],
    tempo: "3-1-1-0",
    image: "/assets/exercises/incline-dumbbell-press.svg",
    description: "Builds upper chest fullness and eliminates arm strength imbalances by forcing each side to work independently.",
    setup: [
      "Adjust incline bench to 30-45 degrees.",
      "Sit with dumbbells resting on lower thighs.",
      "Kick knees up one at a time to bring dumbbells up to shoulder height."
    ],
    execution: [
      "Press dumbbells up over upper chest level with palms facing slightly inward.",
      "Lower under control until dumbbells reach upper chest height, feeling a deep stretch.",
      "Press up and slightly inward in an arc motion without clacking dumbbells together."
    ],
    commonMistakes: [
      "Setting bench angle too high (above 45° shifts focus to front shoulders).",
      "Arching lower back excessively to flatten the bench angle."
    ],
    proTips: "Maintain a slight 15-30° inward turn on wrists to optimize clavicular chest head fiber alignment."
  },
  {
    id: "cable-chest-flyes",
    name: "Cable Chest Flyes",
    category: "Chest",
    equipment: "Cable",
    difficulty: "Beginner",
    rating: 4.7,
    primaryMuscle: "Sternal Chest",
    secondaryMuscles: ["Anterior Deltoids"],
    tempo: "2-1-2-1",
    image: "/assets/exercises/cable-chest-flyes.svg",
    description: "Provides continuous tension across the entire chest range of motion, providing unmatched peak contraction.",
    setup: [
      "Set cable pulleys at chest height.",
      "Grab D-handles and step forward into a staggered stance for stability.",
      "Keep elbows slightly bent and rigid throughout the movement."
    ],
    execution: [
      "Bring handles together in front of sternum in a wide hugging arc.",
      "Pause for 1 full second at peak contraction, squeezing chest tightly.",
      "Slowly allow handles to return back until a comfortable chest stretch is felt."
    ],
    commonMistakes: [
      "Turning the fly into a press by bending and extending elbows.",
      "Using momentum to swing cables forward."
    ],
    proTips: "Cross wrists over slightly at peak contraction for an extra peak squeeze."
  },

  // BACK
  {
    id: "lat-pulldowns",
    name: "Lat Pulldowns",
    category: "Back",
    equipment: "Cable",
    difficulty: "Beginner",
    rating: 4.9,
    primaryMuscle: "Latissimus Dorsi",
    secondaryMuscles: ["Biceps Brachii", "Rhomboids", "Rear Delts"],
    tempo: "3-1-1-1",
    image: "/assets/exercises/lat-pulldowns.svg",
    description: "Builds V-taper lat width and improves upper back pulling strength safely.",
    setup: [
      "Adjust thigh pad so legs are pinned securely.",
      "Grip wide bar with overhand grip wider than shoulder width.",
      "Sit tall with chest lifted towards bar."
    ],
    execution: [
      "Initiate pull by driving shoulder blades down and elbows toward back pockets.",
      "Pull bar down smoothly to upper chest/collarbone level.",
      "Pause briefly at bottom, squeezing lats tightly.",
      "Control the bar back up until lats fully stretch."
    ],
    commonMistakes: [
      "Leaning back excessively to yank bar down with lower back momentum.",
      "Pulling bar behind the neck (risks cervical spine injury)."
    ],
    proTips: "Imagine pulling with your elbows rather than hands to isolate lats over biceps."
  },
  {
    id: "bent-over-barbell-rows",
    name: "Bent-Over Barbell Rows",
    category: "Back",
    equipment: "Barbell",
    difficulty: "Advanced",
    rating: 4.8,
    primaryMuscle: "Rhomboids & Mid-Traps",
    secondaryMuscles: ["Latissimus Dorsi", "Erector Spinae", "Biceps"],
    tempo: "2-1-1-0",
    image: "/assets/exercises/bent-over-barbell-rows.svg",
    description: "Essential heavy rowing movement for building thick back density and spinal stability.",
    setup: [
      "Stand over barbell with feet hip-width apart.",
      "Hinge at hips to lower torso to 45° with flat neutral spine.",
      "Grip bar slightly wider than shoulder width."
    ],
    execution: [
      "Pull barbell upward toward belly button.",
      "Drive elbows toward ceiling and squeeze shoulder blades together at top.",
      "Lower bar under control without letting spine round."
    ],
    commonMistakes: [
      "Jerking torso up and down to swing heavy weight.",
      "Rounding upper or lower back during the row."
    ],
    proTips: "Keep core tight and imagine pulling the bar to your lower ribs."
  },

  // LEGS
  {
    id: "barbell-back-squats",
    name: "Barbell Back Squats",
    category: "Legs",
    equipment: "Barbell",
    difficulty: "Advanced",
    rating: 5.0,
    primaryMuscle: "Quadriceps & Gluteus Maximus",
    secondaryMuscles: ["Hamstrings", "Core", "Calves"],
    tempo: "3-1-1-0",
    image: "/assets/exercises/barbell-back-squats.svg",
    description: "The ultimate compound leg builder for lower body size, bone density, and athletic drive.",
    setup: [
      "Step under bar and rest it across upper trapezius muscles.",
      "Unrack bar and take two steps back into a shoulder-width stance with toes angled slightly out 15°.",
      "Brace core 360 degrees before descending."
    ],
    execution: [
      "Hinge hips and bend knees simultaneously, sitting down between ankles.",
      "Lower until hip crease drops parallel or below top of kneecaps.",
      "Drive through mid-foot explosively to return to standing position."
    ],
    commonMistakes: [
      "Knees caving inward (valgus collapse) during drive phase.",
      "Rising onto toes or lifting heels off the floor."
    ],
    proTips: "Push knees outward in line with toes throughout both down and up phases."
  },
  {
    id: "romanian-deadlifts",
    name: "Romanian Deadlifts",
    category: "Legs",
    equipment: "Barbell",
    difficulty: "Intermediate",
    rating: 4.9,
    primaryMuscle: "Hamstrings & Glutes",
    secondaryMuscles: ["Erector Spinae", "Lats", "Forearms"],
    tempo: "3-1-1-0",
    image: "/assets/exercises/romanian-deadlifts.svg",
    description: "Premier hip-hinge movement targeting deep hamstring stretch hypertrophy and glute strength.",
    setup: [
      "Stand tall holding barbell with overhand grip at thigh level.",
      "Set feet hip-width apart with a slight soft knee bend."
    ],
    execution: [
      "Push hips backward toward wall behind you while keeping bar touching thighs/shins.",
      "Lower bar until deep tension is felt across hamstrings (usually mid-shin level).",
      "Drive hips forward to snap back up to standing lockout."
    ],
    commonMistakes: [
      "Bending knees into a regular squat rather than hinging hips back.",
      "Letting barbell drift away from shins during descent."
    ],
    proTips: "Keep bar glued close to your body to keep leverage optimal on hamstrings."
  },

  // SHOULDERS
  {
    id: "overhead-dumbbell-press",
    name: "Overhead Dumbbell Press",
    category: "Shoulders",
    equipment: "Dumbbell",
    difficulty: "Intermediate",
    rating: 4.8,
    primaryMuscle: "Anterior & Lateral Deltoids",
    secondaryMuscles: ["Triceps", "Upper Traps"],
    tempo: "3-1-1-0",
    image: "/assets/exercises/overhead-dumbbell-press.svg",
    description: "Builds broad, 3D cannonball deltoids and vertical pressing overhead stability.",
    setup: [
      "Sit on upright bench with back support.",
      "Bring dumbbells to shoulder level with elbows angled forward 30°."
    ],
    execution: [
      "Press dumbbells vertically overhead until arms extend fully.",
      "Lower dumbbells under control to ear height.",
      "Maintain tight core without arching lower back."
    ],
    commonMistakes: [
      "Flaring elbows directly out to 90° (strains AC joint).",
      "Arching lower back excessively to cheat weight up."
    ],
    proTips: "Keep forearms vertically stacked directly under dumbbells at all times."
  },
  {
    id: "lateral-cable-raises",
    name: "Lateral Cable Raises",
    category: "Shoulders",
    equipment: "Cable",
    difficulty: "Beginner",
    rating: 4.9,
    primaryMuscle: "Lateral Deltoid (Side Shoulder)",
    secondaryMuscles: ["Upper Traps"],
    tempo: "2-1-2-1",
    image: "/assets/exercises/lateral-cable-raises.svg",
    description: "Directly targets side delts for maximum shoulder width and v-taper aesthetics.",
    setup: [
      "Set cable pulley to lowest position.",
      "Stand sideways to cable stack and grab handle with far hand."
    ],
    execution: [
      "Raise arm out to side in a wide arc until parallel with floor.",
      "Pause for 1 second at top height.",
      "Lower under control back to hip level."
    ],
    commonMistakes: [
      "Shrugging upper traps to lift weight instead of using side delt.",
      "Swinging torso back and forth."
    ],
    proTips: "Lead movement with your elbow rather than wrist to keep side delt engaged."
  },

  // ARMS
  {
    id: "ez-bar-bicep-curls",
    name: "EZ-Bar Bicep Curls",
    category: "Arms",
    equipment: "Barbell",
    difficulty: "Beginner",
    rating: 4.8,
    primaryMuscle: "Biceps Brachii",
    secondaryMuscles: ["Brachialis", "Forearms"],
    tempo: "2-1-2-1",
    image: "/assets/exercises/ez-bar-bicep-curls.svg",
    description: "Ergonomic bicep builder that reduces wrist strain while maximizing bicep peak activation.",
    setup: [
      "Stand tall holding EZ bar on outer angled grips.",
      "Pin elbows close to sides."
    ],
    execution: [
      "Curl bar upward toward shoulder height without swinging body.",
      "Squeeze bicep tightly at top.",
      "Lower under 3-second control back to full arm extension."
    ],
    commonMistakes: [
      "Swinging hips to use momentum on heavy weight.",
      "Letting elbows drift forward excessively."
    ],
    proTips: "Keep wrists rigid and locked straight throughout the curl."
  },
  {
    id: "triceps-rope-pushdowns",
    name: "Triceps Rope Pushdowns",
    category: "Arms",
    equipment: "Cable",
    difficulty: "Beginner",
    rating: 4.9,
    primaryMuscle: "Triceps Lateral & Medial Head",
    secondaryMuscles: ["Anterior Deltoid"],
    tempo: "2-1-2-1",
    image: "/assets/exercises/triceps-rope-pushdowns.svg",
    description: "Classic cable tricep isolation exercise with maximum lockout extension flexibility.",
    setup: [
      "Attach rope attachment to high cable pulley.",
      "Stand upright with slight hip hinge and pin elbows against ribs."
    ],
    execution: [
      "Push rope down until arms are fully locked out.",
      "Spread rope ends apart at bottom for peak tricep contraction.",
      "Return handle up under control until forearms reach 90°."
    ],
    commonMistakes: [
      "Letting elbows flare outward or move back and forth.",
      "Using shoulder momentum to press weight down."
    ],
    proTips: "Keep elbows glued in position as if pinned to your torso."
  },

  // ABS & CORE
  {
    id: "hanging-leg-raises",
    name: "Hanging Leg Raises",
    category: "Abs & Core",
    equipment: "Bodyweight",
    difficulty: "Advanced",
    rating: 4.8,
    primaryMuscle: "Lower Rectus Abdominis",
    secondaryMuscles: ["Hip Flexors", "Obliques", "Grip Strength"],
    tempo: "2-1-2-0",
    image: "/assets/exercises/hanging-leg-raises.svg",
    description: "High-intensity core exercise targeting lower abs and pelvic control while improving grip endurance.",
    setup: [
      "Hang from pull-up bar with overhand grip and straight legs."
    ],
    execution: [
      "Contract abs to lift legs up smoothly until parallel to floor or higher.",
      "Pause at top position.",
      "Lower legs slowly without swinging back and forth."
    ],
    commonMistakes: [
      "Swinging hips to use momentum.",
      "Arching lower back at bottom of rep."
    ],
    proTips: "Curvature of pelvis upward at top of movement is key to abdominal contraction."
  }
];

export const ExerciseGuidePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEquipment, setSelectedEquipment] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeExercise, setActiveExercise] = useState(EXERCISE_GUIDE_DATABASE[0]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [activeTab, setActiveTab] = useState("execution"); // "execution" | "mistakes" | "muscles"

  const categories = ["All", "Chest", "Back", "Legs", "Shoulders", "Arms", "Abs & Core"];
  const equipmentOptions = ["All", "Barbell", "Dumbbell", "Cable", "Bodyweight"];

  // Filter Exercises
  const filteredExercises = EXERCISE_GUIDE_DATABASE.filter(ex => {
    const matchesCategory = selectedCategory === "All" || ex.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesEquipment = selectedEquipment === "All" || ex.equipment.toLowerCase().includes(selectedEquipment.toLowerCase());
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ex.primaryMuscle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ex.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesEquipment && matchesSearch;
  });

  const toggleBookmark = (id) => {
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12 text-[#F5F7FA]">
      {/* Header Banner Section */}
      <div className="relative rounded-3xl bg-[#161D27] border border-[#2A3442] p-6 sm:p-8 overflow-hidden shadow-2xl">
        <CornerTechAccents />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121821] border border-[#C6FF00]/30 text-[#C6FF00] text-xs font-bold font-heading">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            REPFORGE EXERCISE EXECUTION LAB
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            Master Every Rep With <span className="text-[#C6FF00] neon-text-glow">Precision Form</span>
          </h1>
          <p className="text-sm sm:text-base text-[#B8C2CF] leading-relaxed">
            Step-by-step technique breakdown, live vector motion playback, biomechanical alignment cues, and common mistake fixes to maximize gains and prevent injury.
          </p>
        </div>

        {/* Decorative Floating Icon */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 p-6 rounded-3xl bg-[#121821]/80 border border-[#2A3442] text-[#C6FF00]">
          <Dumbbell className="w-16 h-16 animate-pulse" />
        </div>
      </div>

      {/* Main Grid: Left Catalog (4) | Center Exercise Lab (5) | Right Body Map (3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">

        {/* LEFT COLUMN: Search, Filters & Catalog List */}
        <div className="lg:col-span-4 space-y-5">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#7E8A99] absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search exercise (e.g. Bench Press, Squat)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#161D27] border border-[#2A3442] text-xs text-white placeholder-[#7E8A99] focus:outline-none focus:border-[#C6FF00] shadow-sm transition-colors"
            />
          </div>

          {/* Muscle Group Category Tabs */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#7E8A99] uppercase tracking-wider block">Target Muscle Filter</span>
            <div className="flex flex-wrap gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#C6FF00] text-[#0B0F14] font-bold shadow-[0_0_10px_rgba(198,255,0,0.3)]'
                      : 'bg-[#161D27] border border-[#2A3442] text-[#B8C2CF] hover:text-white hover:border-[#7E8A99]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Equipment Selector */}
          <div className="flex items-center justify-between gap-2 p-3 bg-[#161D27] border border-[#2A3442] rounded-2xl">
            <span className="text-xs font-semibold text-[#B8C2CF] flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#C6FF00]" /> Equipment:
            </span>
            <div className="flex gap-1 overflow-x-auto no-scrollbar">
              {equipmentOptions.map(eq => (
                <button
                  key={eq}
                  onClick={() => setSelectedEquipment(eq)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors ${
                    selectedEquipment === eq
                      ? 'bg-[#1B2430] text-[#C6FF00] font-bold border border-[#2A3442]'
                      : 'text-[#7E8A99] hover:text-[#B8C2CF]'
                  }`}
                >
                  {eq}
                </button>
              ))}
            </div>
          </div>

          {/* Exercise List Catalog Cards */}
          <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredExercises.length === 0 ? (
              <div className="p-8 text-center bg-[#161D27] border border-[#2A3442] rounded-2xl space-y-2">
                <Dumbbell className="w-8 h-8 text-[#7E8A99] mx-auto opacity-50" />
                <p className="text-xs text-[#B8C2CF]">No exercises match your search query.</p>
              </div>
            ) : (
              filteredExercises.map(ex => {
                const isActive = activeExercise.id === ex.id;
                const isBookmarked = bookmarkedIds.includes(ex.id);

                return (
                  <motion.div
                    key={ex.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setActiveExercise(ex)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-[#1B2430] border-[#C6FF00] shadow-[0_0_15px_rgba(198,255,0,0.15)]'
                        : 'bg-[#161D27] border-[#2A3442] hover:border-[#7E8A99]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-[#121821] border border-[#2A3442] p-1.5 flex-shrink-0 flex items-center justify-center">
                        <img
                          src={getExerciseImage(ex.name)}
                          alt={ex.name}
                          className="w-full h-full object-contain filter invert opacity-90"
                          onError={(e) => { e.target.src = '/assets/exercises/placeholder.svg'; }}
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                          {ex.name}
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00] animate-pulse" />}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-[#7E8A99] mt-0.5">
                          <span className="text-[#C6FF00] font-medium">{ex.category}</span>
                          <span>•</span>
                          <span>{ex.equipment}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(ex.id);
                        }}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isBookmarked
                            ? 'bg-[#C6FF00]/20 border-[#C6FF00] text-[#C6FF00]'
                            : 'border-transparent text-[#7E8A99] hover:text-white'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-[#C6FF00] translate-x-1' : 'text-[#7E8A99]'}`} />
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* CENTER COLUMN: Active Exercise Motion Demonstrator & Execution Guide */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Exercise Title Bar */}
          <div className="bg-[#161D27] border border-[#2A3442] rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C6FF00]/10 border border-[#C6FF00]/30 text-[#C6FF00] text-[11px] font-bold">
                    {activeExercise.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#28D7FF]/10 border border-[#28D7FF]/30 text-[#28D7FF] text-[11px] font-bold">
                    {activeExercise.equipment}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#121821] border border-[#2A3442] text-[#B8C2CF] text-[11px] font-mono">
                    Difficulty: <strong className="text-white">{activeExercise.difficulty}</strong>
                  </span>
                </div>
                <h2 className="text-2xl font-heading font-extrabold text-white">
                  {activeExercise.name}
                </h2>
                <p className="text-xs text-[#B8C2CF] mt-1">
                  {activeExercise.description}
                </p>
              </div>
            </div>

            {/* Live Vector Motion Demonstrator */}
            <ExerciseMotionVisualizer exerciseName={activeExercise.name} />

            {/* Navigation Tabs (Execution Steps | Common Mistakes | Muscle Activation) */}
            <div className="flex border-b border-[#2A3442] pt-2 gap-4 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('execution')}
                className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'execution'
                    ? 'border-[#C6FF00] text-[#C6FF00]'
                    : 'border-transparent text-[#7E8A99] hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" /> Form Steps & Setup
              </button>
              <button
                onClick={() => setActiveTab('mistakes')}
                className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'mistakes'
                    ? 'border-[#C6FF00] text-[#C6FF00]'
                    : 'border-transparent text-[#7E8A99] hover:text-white'
                }`}
              >
                <AlertTriangle className="w-4 h-4" /> Avoid Common Errors
              </button>
              <button
                onClick={() => setActiveTab('muscles')}
                className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'muscles'
                    ? 'border-[#C6FF00] text-[#C6FF00]'
                    : 'border-transparent text-[#7E8A99] hover:text-white'
                }`}
              >
                <Activity className="w-4 h-4" /> Target Muscles & Tempo
              </button>
            </div>

            {/* Tab Contents */}
            <AnimatePresence mode="wait">
              {activeTab === 'execution' && (
                <motion.div
                  key="execution"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-5 pt-2"
                >
                  {/* Setup Phase */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#C6FF00] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> 1. Initial Setup & Position
                    </h4>
                    <div className="space-y-1.5">
                      {activeExercise.setup.map((step, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#121821] border border-[#2A3442] flex items-start gap-2.5 text-xs text-[#B8C2CF]">
                          <span className="w-5 h-5 rounded-full bg-[#161D27] border border-[#C6FF00]/40 text-[#C6FF00] font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </span>
                          <p className="leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Execution Phase */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#28D7FF] uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" /> 2. Motion Execution & Drive
                    </h4>
                    <div className="space-y-1.5">
                      {activeExercise.execution.map((step, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#121821] border border-[#2A3442] flex items-start gap-2.5 text-xs text-[#B8C2CF]">
                          <span className="w-5 h-5 rounded-full bg-[#161D27] border border-[#28D7FF]/40 text-[#28D7FF] font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </span>
                          <p className="leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pro Trainer Tip Banner */}
                  <div className="p-4 rounded-2xl bg-[#C6FF00]/10 border border-[#C6FF00]/30 text-xs flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#C6FF00] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-heading">RepForge Certified Trainer Cue:</strong>
                      <p className="text-[#B8C2CF] mt-0.5">{activeExercise.proTips}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'mistakes' && (
                <motion.div
                  key="mistakes"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-3 pt-2"
                >
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                    Critical Form Errors To Avoid
                  </span>
                  {activeExercise.commonMistakes.map((err, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-xs text-rose-300">
                      <X className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block">Mistake #{idx + 1}</strong>
                        <p className="mt-0.5 text-rose-200">{err}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'muscles' && (
                <motion.div
                  key="muscles"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-4 pt-2"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-[#121821] border border-[#2A3442] space-y-1">
                      <span className="text-[11px] text-[#7E8A99] uppercase font-mono block">Primary Muscle Target</span>
                      <span className="text-sm font-bold text-[#C6FF00] block">{activeExercise.primaryMuscle}</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#121821] border border-[#2A3442] space-y-1">
                      <span className="text-[11px] text-[#7E8A99] uppercase font-mono block">Recommended Lifting Tempo</span>
                      <span className="text-sm font-bold text-[#28D7FF] font-mono block">{activeExercise.tempo}</span>
                      <p className="text-[10px] text-[#7E8A99]">(Eccentric - Pause - Concentric - Lockout)</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#121821] border border-[#2A3442] space-y-2">
                    <span className="text-xs font-bold text-white block">Secondary & Synergist Support Muscles</span>
                    <div className="flex flex-wrap gap-2">
                      {activeExercise.secondaryMuscles.map((mus, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-xl bg-[#161D27] border border-[#2A3442] text-xs text-[#B8C2CF]">
                          {mus}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN: Anatomical Body Map Synced to Active Exercise */}
        <div className="lg:col-span-3 space-y-4">
          <ExerciseBodySync exercise={activeExercise} />

          {/* Quick Stats Card */}
          <div className="bg-[#121821] border border-[#2A3442] rounded-3xl p-4 space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#C6FF00]" /> Exercise Stats
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-[#161D27] border border-[#2A3442] space-y-0.5">
                <span className="text-[10px] text-[#7E8A99] uppercase block">Tempo</span>
                <span className="text-sm font-bold text-[#C6FF00] font-mono">{activeExercise.tempo}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#161D27] border border-[#2A3442] space-y-0.5">
                <span className="text-[10px] text-[#7E8A99] uppercase block">Rating</span>
                <span className="text-sm font-bold text-amber-400">★ {activeExercise.rating}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#161D27] border border-[#2A3442] space-y-0.5 col-span-2">
                <span className="text-[10px] text-[#7E8A99] uppercase block">Equipment</span>
                <span className="text-xs font-bold text-white">{activeExercise.equipment}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
