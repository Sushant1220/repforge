import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { fitnessAPI, workoutAPI, nutritionAPI, progressAPI } from '../services/api';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { FitnessHero } from '../components/FitnessHero';
import {
  Flame, Zap, Droplet, Footprints, Scale, Dumbbell, Utensils,
  Play, Plus, CheckCircle2, TrendingUp, Sparkles, ChevronRight, MapPin, Navigation,
  Award, Activity, Target
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import dashboardHeroImg from '../assets/repforge_dashboard_hero.png';
import heroAthleteImg from '../assets/repforge_hero_athlete.png';
import homeWorkoutImg from '../assets/repforge_home_workout.png';
import gymFinderImg from '../assets/repforge_gym_finder.png';
import supplementsImg from '../assets/repforge_supplements_card.png';
import { GridPatternOverlay, CornerTechAccents, GlowingOrbs } from '../components/DecorativeGraphics';
import { CheatDayButton } from '../components/CheatDayButton';

export const DashboardPage = () => {
  const { user, setActiveTab } = useAuth();
  const [todayWorkout, setTodayWorkout] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [weightLogs, setWeightLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [wData, nData, wlData] = await Promise.all([
        workoutAPI.getWorkouts(),
        nutritionAPI.getNutrition(),
        progressAPI.getWeightLogs()
      ]);

      const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      const currentWorkout = wData.find(w => w.day === todayName) || wData[0];
      setTodayWorkout(currentWorkout);
      setNutrition(nData);
      setWeightLogs(wlData);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickWaterAdd = async () => {
    try {
      const res = await nutritionAPI.logWater({ amountLiters: 0.25 });
      setNutrition(prev => prev ? { ...prev, waterLogged: res.waterLogged } : prev);
    } catch (err) {
      console.error('Water add error:', err);
    }
  };

  // Calculations
  const calLogged = nutrition?.meals?.reduce((acc, m) => acc + m.items.filter(i => i.eaten).reduce((sum, item) => sum + item.calories, 0), 0) || 1450;
  const calTarget = user?.targets?.calories || 2200;
  const calPercent = Math.min(100, Math.round((calLogged / calTarget) * 100));

  const proteinLogged = nutrition?.meals?.reduce((acc, m) => acc + m.items.filter(i => i.eaten).reduce((sum, item) => sum + item.protein, 0), 0) || 105;
  const proteinTarget = user?.targets?.protein || 165;
  const proteinPercent = Math.min(100, Math.round((proteinLogged / proteinTarget) * 100));

  const waterLogged = nutrition?.waterLogged || 2.1;
  const waterTarget = user?.targets?.water || 3.2;

  const currentWeight = user?.weight || 80.8;
  const startWeight = 83.0;
  const targetWeight = user?.targetWeight || 75.0;
  const weightProgressPercent = Math.min(100, Math.max(0, Math.round(((startWeight - currentWeight) / (startWeight - targetWeight)) * 100)));

  const completedExercises = todayWorkout?.exercises?.filter(e => e.completed).length || 2;
  const totalExercises = todayWorkout?.exercises?.length || 6;

  // Chart Data format
  const chartData = weightLogs.length > 0 ? weightLogs.map((wl, idx) => ({
    name: `W${idx + 1}`,
    weight: wl.weight
  })) : [
    { name: 'W1', weight: 83.0 },
    { name: 'W2', weight: 82.4 },
    { name: 'W3', weight: 81.9 },
    { name: 'W4', weight: 81.2 },
    { name: 'W5', weight: 80.9 },
    { name: 'W6', weight: 80.8 }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
  };

  return (
    <div className="space-y-8 pb-16 relative">
      {/* Background Mesh & Glows */}
      <GlowingOrbs color="neon" />

      {/* 1. Powerful Visual Hero Section */}
      <FitnessHero onNavigate={setActiveTab} />

      {/* 1. Summary Cards Grid with Staggered Entrance Animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5"
      >
        {/* Calories Card */}
        <motion.div variants={cardVariants} className="p-4 rounded-2xl bg-[#161D27] glass-card-hover border border-[#2A3442] space-y-2.5 shadow-md">
          <div className="flex items-center justify-between text-xs text-[#B8C2CF]">
            <span className="font-semibold text-[#F5F7FA] flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#FF9F43]" /> Calories
            </span>
            <span className="text-[10px] text-[#FF9F43] font-extrabold">
              <AnimatedCounter value={calPercent} suffix="%" />
            </span>
          </div>
          <div>
            <span className="text-xl font-extrabold text-[#F5F7FA] font-heading">
              <AnimatedCounter value={calLogged} />
            </span>
            <span className="text-xs text-[#7E8A99]"> / {calTarget.toLocaleString()} kcal</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#121821] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${calPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-[#FF9F43] rounded-full"
            />
          </div>
        </motion.div>

        {/* Protein Card */}
        <motion.div variants={cardVariants} className="p-4 rounded-2xl bg-[#161D27] glass-card-hover border border-[#2A3442] space-y-2.5 shadow-md">
          <div className="flex items-center justify-between text-xs text-[#B8C2CF]">
            <span className="font-semibold text-[#F5F7FA] flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#C6FF00]" /> Protein
            </span>
            <span className="text-[10px] text-[#C6FF00] font-extrabold">
              <AnimatedCounter value={proteinPercent} suffix="%" />
            </span>
          </div>
          <div>
            <span className="text-xl font-extrabold text-[#F5F7FA] font-heading">
              <AnimatedCounter value={proteinLogged} />
            </span>
            <span className="text-xs text-[#7E8A99]"> / {proteinTarget} g</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#121821] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${proteinPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-[#C6FF00] rounded-full"
            />
          </div>
        </motion.div>

        {/* Water Card */}
        <motion.div variants={cardVariants} className="p-4 rounded-2xl bg-[#161D27] glass-card-hover border border-[#2A3442] space-y-2.5 shadow-md">
          <div className="flex items-center justify-between text-xs text-[#B8C2CF]">
            <span className="font-semibold text-[#F5F7FA] flex items-center gap-1.5">
              <Droplet className="w-4 h-4 text-[#28D7FF]" /> Water
            </span>
            <button
              onClick={handleQuickWaterAdd}
              className="p-1 px-1.5 rounded bg-[#28D7FF]/20 text-[#28D7FF] border border-[#28D7FF]/30 hover:bg-[#28D7FF]/30 transition-all text-[10px] font-extrabold flex items-center gap-0.5 cursor-pointer active:scale-95"
            >
              <Plus className="w-3 h-3" /> 250ml
            </button>
          </div>
          <div>
            <span className="text-xl font-extrabold text-[#F5F7FA] font-heading">{waterLogged}</span>
            <span className="text-xs text-[#7E8A99]"> / {waterTarget} L</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#121821] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (waterLogged / waterTarget) * 100)}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-[#28D7FF] rounded-full"
            />
          </div>
        </motion.div>

        {/* Steps Card */}
        <motion.div variants={cardVariants} className="p-4 rounded-2xl bg-[#161D27] glass-card-hover border border-[#2A3442] space-y-2.5 shadow-md">
          <div className="flex items-center justify-between text-xs text-[#B8C2CF]">
            <span className="font-semibold text-[#F5F7FA] flex items-center gap-1.5">
              <Footprints className="w-4 h-4 text-[#10B981]" /> Steps
            </span>
            <span className="text-[10px] text-[#10B981] font-extrabold">64%</span>
          </div>
          <div>
            <span className="text-xl font-extrabold text-[#F5F7FA] font-heading">
              <AnimatedCounter value={6400} />
            </span>
            <span className="text-xs text-[#7E8A99]"> / 10,000</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#121821] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '64%' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-[#10B981] rounded-full"
            />
          </div>
        </motion.div>

        {/* Weight Progress Card */}
        <motion.div variants={cardVariants} className="p-4 rounded-2xl bg-[#161D27] glass-card-hover border border-[#2A3442] space-y-2.5 shadow-md">
          <div className="flex items-center justify-between text-xs text-[#B8C2CF]">
            <span className="font-semibold text-[#F5F7FA] flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-[#8B5CF6]" /> Weight Goal
            </span>
            <span className="text-[10px] text-[#8B5CF6] font-extrabold">
              <AnimatedCounter value={weightProgressPercent} suffix="%" />
            </span>
          </div>
          <div>
            <span className="text-xl font-extrabold text-[#F5F7FA] font-heading">{currentWeight}</span>
            <span className="text-xs text-[#7E8A99]"> kg (Target: {targetWeight}kg)</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#121821] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${weightProgressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-[#8B5CF6] rounded-full"
            />
          </div>
        </motion.div>

        {/* Training Level Card */}
        <motion.div variants={cardVariants} className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-[#161D27] border border-[#C6FF00]/40 space-y-2 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#F5F7FA] flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4 text-[#C6FF00]" /> Training Level
            </span>
            <span className="text-[10px] text-[#C6FF00] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#C6FF00]/15 border border-[#C6FF00]/40">
              {user?.experienceLevel || 'Beginner'}
            </span>
          </div>
          <div>
            <span className="text-xs text-[#B8C2CF] block font-medium">Experience Duration:</span>
            <span className="text-sm font-bold text-[#F5F7FA] truncate block">{user?.trainingDuration || 'Less than 3 months'}</span>
          </div>
          <button
            onClick={() => setActiveTab('workout')}
            className="w-full py-1.5 rounded-xl bg-[#C6FF00] text-[#0B0F14] font-extrabold text-[10px] uppercase hover:bg-[#b5ea00] transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-95 shadow-sm"
          >
            <span>View Plan</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </motion.div>
      </motion.div>

      {/* 2. Main Middle Section: Today's Workout & Nearby Gyms Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Workout Large Card (7 Cols) */}
        <div className="lg:col-span-7 bg-[#161D27] rounded-3xl p-6 border border-[#2A3442] space-y-5 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#C6FF00]/15 border border-[#C6FF00]/30 text-[#C6FF00]">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-[#B8C2CF] font-medium block">Today's Workout Routine</span>
                <h3 className="text-xl font-heading font-extrabold text-[#F5F7FA]">{todayWorkout?.title || 'Chest & Triceps Focus'}</h3>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#1B2430] border border-[#2A3442] text-[#C6FF00]">
              {todayWorkout?.day || 'Monday'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#121821] border border-[#2A3442] text-center">
            <div>
              <span className="text-[10px] text-[#7E8A99] block uppercase font-bold">Exercises</span>
              <span className="text-base font-extrabold text-[#F5F7FA]">{totalExercises} Routine</span>
            </div>
            <div>
              <span className="text-[10px] text-[#7E8A99] block uppercase font-bold">Est. Duration</span>
              <span className="text-base font-extrabold text-[#F5F7FA]">{todayWorkout?.estimatedTime || 55} Mins</span>
            </div>
            <div>
              <span className="text-[10px] text-[#7E8A99] block uppercase font-bold">Burn Target</span>
              <span className="text-base font-extrabold text-[#C6FF00]">{todayWorkout?.estimatedCalories || 420} kcal</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[#B8C2CF] font-medium">Workout Progress:</span>
            <span className="font-bold text-[#C6FF00]">{completedExercises} / {totalExercises} Exercises Completed</span>
          </div>

          <div className="w-full h-2 rounded-full bg-[#121821] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C6FF00] to-[#9BEA00] rounded-full transition-all duration-500"
              style={{ width: `${(completedExercises / totalExercises) * 100}%` }}
            />
          </div>

          <div className="pt-2">
            <button
              onClick={() => setActiveTab('workout')}
              className="w-full py-3.5 rounded-2xl bg-[#C6FF00] text-[#0B0F14] font-extrabold text-xs uppercase tracking-wider hover:bg-[#b5ea00] transition-all shadow-[0_0_20px_rgba(198,255,0,0.25)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-[#0B0F14]" />
              <span>Start Workout Mode</span>
            </button>
          </div>
        </div>

        {/* Nearby Gyms & Weekly Progress Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Gyms Near You Card */}
          <div className="bg-[#161D27] rounded-3xl p-6 border border-[#2A3442] space-y-4 shadow-lg bg-gradient-to-tr from-[#161D27] to-[#28D7FF]/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#28D7FF]/15 border border-[#28D7FF]/30 text-[#28D7FF]">
                  <MapPin className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-base font-heading font-bold text-[#F5F7FA]">Gyms Near You</h3>
                  <p className="text-xs text-[#B8C2CF]">Find gyms around your current location.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('nearby-gyms')}
              className="w-full py-3 rounded-2xl bg-[#28D7FF] text-[#0B0F14] font-extrabold text-xs uppercase tracking-wider hover:bg-[#6be2ff] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(40,215,255,0.3)]"
            >
              <Navigation className="w-4 h-4 fill-[#0B0F14]" />
              <span>Find Nearby Gyms</span>
            </button>
          </div>

          {/* Weekly Progress Weight Line Chart */}
          <div className="bg-[#161D27] rounded-3xl p-6 border border-[#2A3442] space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-heading font-bold text-[#F5F7FA] flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#C6FF00]" /> Weight Progress
                </h3>
                <p className="text-xs text-[#B8C2CF]">8-Week Transformation Trend</p>
              </div>
              <button
                onClick={() => setActiveTab('progress')}
                className="text-xs text-[#C6FF00] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="h-40 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A3442" />
                  <XAxis dataKey="name" stroke="#7E8A99" fontSize={10} />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#7E8A99" fontSize={10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1B2430', borderColor: '#2A3442', borderRadius: '12px', fontSize: '12px', color: '#F5F7FA' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#C6FF00"
                    strokeWidth={3}
                    dot={{ fill: '#C6FF00', r: 4 }}
                    activeDot={{ r: 6, fill: '#F5F7FA' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Today's Nutrition Breakdown */}
      <div className="bg-[#161D27] rounded-3xl p-6 border border-[#2A3442] space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-bold text-[#F5F7FA] flex items-center gap-2">
              <Utensils className="w-5 h-5 text-[#C6FF00]" /> Today's Nutrition Plan
            </h3>
            <p className="text-xs text-[#B8C2CF]">Personalized meals tailored for your {user?.fitnessGoal || 'Build Muscle'} goal</p>
          </div>
          <button
            onClick={() => setActiveTab('nutrition')}
            className="px-3.5 py-1.5 rounded-xl bg-[#1B2430] border border-[#2A3442] text-xs font-semibold text-[#B8C2CF] hover:text-[#F5F7FA] hover:bg-[#2A3442] transition-all cursor-pointer"
          >
            Manage Nutrition
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {nutrition?.meals?.map((meal, idx) => {
            const firstItem = meal.items[0];
            return (
              <div key={idx} className="p-4 rounded-2xl bg-[#121821] border border-[#2A3442] space-y-3 hover:border-[#3A4759] transition-all shadow-sm">
                <div className="flex items-center justify-between border-b border-[#2A3442] pb-2">
                  <span className="text-xs font-bold text-[#C6FF00] uppercase tracking-wider">{meal.mealType}</span>
                  <span className="text-xs font-extrabold text-[#F5F7FA]">{meal.totalCalories} kcal</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#F5F7FA] truncate">{firstItem?.name || meal.name}</h4>
                  <p className="text-xs text-[#B8C2CF] truncate mt-0.5">{firstItem?.quantity || '1 Portion'}</p>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#B8C2CF] pt-1">
                  <span>Protein: <strong className="text-[#F5F7FA]">{firstItem?.protein || 35}g</strong></span>
                  <span>Carbs: <strong className="text-[#F5F7FA]">{firstItem?.carbs || 50}g</strong></span>
                  <span>Fat: <strong className="text-[#F5F7FA]">{firstItem?.fat || 12}g</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Easter Egg: Cheat Day Button */}
      <CheatDayButton />

      {/* 4. Requirement 10: Image-Based Feature Cards (Quick Actions) */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold text-[#C6FF00] uppercase tracking-wider block">KEY CAPABILITIES</span>
            <h3 className="text-xl font-heading font-black text-[#F5F7FA]">Explore RepForge Tools</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Muscle Map */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-64 rounded-3xl overflow-hidden border border-[#2A3442] group cursor-pointer shadow-xl flex flex-col justify-end p-5 bg-[#161D27]"
            onClick={() => setActiveTab('muscle-map')}
          >
            <img
              src={heroAthleteImg}
              alt="Anatomical Muscle Map"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover img-hover-zoom filter brightness-[0.75] contrast-105 group-hover:brightness-[0.88]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/60 to-transparent z-10" />
            <div className="relative z-20 space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#C6FF00]/20 border border-[#C6FF00]/40 text-[#C6FF00] text-[10px] font-black uppercase">
                Interactive Visual
              </span>
              <h4 className="text-lg font-heading font-black text-[#F5F7FA] group-hover:text-[#C6FF00] transition-colors">
                Anatomical Muscle Map
              </h4>
              <p className="text-xs text-[#B8C2CF] leading-snug line-clamp-2">
                Target specific muscle groups and trigger muscle hypertrophy routines.
              </p>
              <button className="pt-1 text-xs font-black text-[#C6FF00] uppercase tracking-wider flex items-center gap-1 group-hover:underline">
                <span>Explore Map</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Home Workout */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative h-64 rounded-3xl overflow-hidden border border-[#2A3442] group cursor-pointer shadow-xl flex flex-col justify-end p-5 bg-[#161D27]"
            onClick={() => setActiveTab('workout')}
          >
            <img
              src={homeWorkoutImg}
              alt="Home Workout"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover img-hover-zoom filter brightness-[0.75] contrast-105 group-hover:brightness-[0.88]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/60 to-transparent z-10" />
            <div className="relative z-20 space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FF9F43]/20 border border-[#FF9F43]/40 text-[#FF9F43] text-[10px] font-black uppercase">
                No Gym? No Problem
              </span>
              <h4 className="text-lg font-heading font-black text-[#F5F7FA] group-hover:text-[#FF9F43] transition-colors">
                Home Workout Routine
              </h4>
              <p className="text-xs text-[#B8C2CF] leading-snug line-clamp-2">
                Bodyweight pushups, squats, and core splits requiring zero equipment.
              </p>
              <button className="pt-1 text-xs font-black text-[#FF9F43] uppercase tracking-wider flex items-center gap-1 group-hover:underline">
                <span>Start Home Workout</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 3: Nearby Gyms */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative h-64 rounded-3xl overflow-hidden border border-[#2A3442] group cursor-pointer shadow-xl flex flex-col justify-end p-5 bg-[#161D27]"
            onClick={() => setActiveTab('nearby-gyms')}
          >
            <img
              src={gymFinderImg}
              alt="Nearby Gyms"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover img-hover-zoom filter brightness-[0.75] contrast-105 group-hover:brightness-[0.88]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/60 to-transparent z-10" />
            <div className="relative z-20 space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#28D7FF]/20 border border-[#28D7FF]/40 text-[#28D7FF] text-[10px] font-black uppercase">
                Geolocation
              </span>
              <h4 className="text-lg font-heading font-black text-[#F5F7FA] group-hover:text-[#28D7FF] transition-colors">
                Find Nearby Gyms
              </h4>
              <p className="text-xs text-[#B8C2CF] leading-snug line-clamp-2">
                Discover powerlifting gyms, squat racks, ratings, and map navigation.
              </p>
              <button className="pt-1 text-xs font-black text-[#28D7FF] uppercase tracking-wider flex items-center gap-1 group-hover:underline">
                <span>Discover Gyms</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 4: Supplement Finder */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative h-64 rounded-3xl overflow-hidden border border-[#2A3442] group cursor-pointer shadow-xl flex flex-col justify-end p-5 bg-[#161D27]"
            onClick={() => setActiveTab('supplements')}
          >
            <img
              src={supplementsImg}
              alt="Supplement Finder"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover img-hover-zoom filter brightness-[0.75] contrast-105 group-hover:brightness-[0.88]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/60 to-transparent z-10" />
            <div className="relative z-20 space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[10px] font-black uppercase">
                Goal Based
              </span>
              <h4 className="text-lg font-heading font-black text-[#F5F7FA] group-hover:text-rose-400 transition-colors">
                Supplement Finder
              </h4>
              <p className="text-xs text-[#B8C2CF] leading-snug line-clamp-2">
                Filtered recommendations by budget, fitness goals, and diet preference.
              </p>
              <button className="pt-1 text-xs font-black text-rose-400 uppercase tracking-wider flex items-center gap-1 group-hover:underline">
                <span>Find Supplements</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
