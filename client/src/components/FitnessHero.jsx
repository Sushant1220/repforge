import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Play, Sparkles, Zap } from 'lucide-react';
import heroAthleteImg from '../assets/repforge_hero_athlete.png';
import { HeroDumbbell3D } from './3d/HeroDumbbell3D';

export const FitnessHero = ({ onNavigate }) => {
  return (
    <section className="relative w-full rounded-3xl overflow-hidden border border-[#2A3442] shadow-xl bg-[#161D27] mb-8">
      {/* Background Fitness Photography with Vibrant Balanced Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroAthleteImg}
          alt="Forge Your Strongest Self"
          className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-110 scale-105"
        />
        {/* Dark Navy-Charcoal Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F14] via-[#0B0F14]/85 to-[#0B0F14]/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161D27] via-transparent to-[#0B0F14]/50 z-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6FF00]/10 rounded-full blur-3xl pointer-events-none z-10" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 p-6 sm:p-10 lg:p-12 min-h-[460px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side Column: Text, CTAs & Metrics */}
          <div className="lg:col-span-7 space-y-6">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C6FF00]/15 border border-[#C6FF00]/40 text-[#C6FF00] text-xs font-black tracking-widest uppercase shadow-[0_0_20px_rgba(198,255,0,0.2)]"
            >
              <Sparkles className="w-4 h-4 text-[#C6FF00] animate-pulse" />
              <span>NO EXCUSES. JUST REPS.</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-[#F5F7FA] uppercase tracking-tight leading-none drop-shadow-md"
            >
              FORGE YOUR <br />
              <span className="text-[#C6FF00] neon-text-glow">STRONGEST SELF</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-[#B8C2CF] font-medium leading-relaxed max-w-xl drop-shadow-sm"
            >
              Personalized workouts, nutrition, progress tracking and smarter fitness tools in one place.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              <button
                onClick={() => onNavigate && onNavigate('workout')}
                className="px-7 py-3.5 rounded-2xl btn-neon-primary text-xs tracking-wider flex items-center gap-2.5 cursor-pointer shadow-[0_0_25px_rgba(198,255,0,0.3)] hover:scale-[1.02] transition-transform"
              >
                <Play className="w-4 h-4 fill-[#0B0F14]" />
                <span>Start Workout</span>
              </button>

              <button
                onClick={() => onNavigate && onNavigate('muscle-map')}
                className="px-7 py-3.5 rounded-2xl btn-dark-secondary text-xs tracking-wider flex items-center gap-2.5 cursor-pointer border border-[#2A3442] hover:border-[#C6FF00]/60 hover:scale-[1.02] transition-transform"
              >
                <Activity className="w-4 h-4 text-[#C6FF00]" />
                <span>Explore Muscle Map</span>
              </button>

              <button
                onClick={() => onNavigate && onNavigate('nutrition')}
                className="px-5 py-3.5 rounded-2xl bg-[#1B2430] border border-[#2A3442] hover:border-[#C6FF00]/40 text-[#F5F7FA] font-heading font-extrabold text-xs tracking-wider uppercase transition-all cursor-pointer hidden sm:flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-[#28D7FF]" />
                <span>Diet Plan</span>
              </button>
            </motion.div>

            {/* Metrics Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4"
            >
              <div className="p-3.5 rounded-2xl bg-[#121821] border border-[#2A3442] space-y-0.5 shadow-sm">
                <span className="text-[10px] text-[#7E8A99] font-extrabold uppercase tracking-wider block">Active Streak</span>
                <p className="text-lg font-black text-[#FF9F43]">15 Days 🔥</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#121821] border border-[#2A3442] space-y-0.5 shadow-sm">
                <span className="text-[10px] text-[#7E8A99] font-extrabold uppercase tracking-wider block">Target Cal</span>
                <p className="text-lg font-black text-[#F5F7FA]">2,200 kcal</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#121821] border border-[#2A3442] space-y-0.5 shadow-sm">
                <span className="text-[10px] text-[#7E8A99] font-extrabold uppercase tracking-wider block">Protein Target</span>
                <p className="text-lg font-black text-[#28D7FF]">165 g</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#121821] border border-[#2A3442] space-y-0.5 shadow-sm">
                <span className="text-[10px] text-[#7E8A99] font-extrabold uppercase tracking-wider block">Target Weight</span>
                <p className="text-lg font-black text-[#9BEA00]">75.0 kg</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side Column: Interactive 3D Metallic Dumbbell Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center min-h-[300px] sm:min-h-[360px]"
          >
            {/* Background Glow Aura */}
            <div className="absolute inset-0 bg-radial from-[#C6FF00]/20 via-[#C6FF00]/5 to-transparent blur-2xl rounded-full pointer-events-none" />
            
            {/* 3D Canvas */}
            <HeroDumbbell3D className="w-full h-[320px] sm:h-[380px] lg:h-[420px]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

