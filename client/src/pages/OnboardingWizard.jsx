import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { fitnessAPI } from '../services/api';
import {
  User, Flame, Activity, Dumbbell, Utensils, HeartPulse,
  ArrowRight, ArrowLeft, Check, Sparkles, AlertCircle, ShieldAlert, Award
} from 'lucide-react';
import { GridPatternOverlay, GlowingOrbs, CornerTechAccents } from '../components/DecorativeGraphics';

export const OnboardingWizard = ({ onOnboardingComplete }) => {
  const { user, updateUser } = useAuth();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || 'Alex Rivers',
    age: user?.age || 26,
    gender: user?.gender || 'Male',
    height: user?.height || 178,
    heightUnit: user?.heightUnit || 'cm',
    weight: user?.weight || 83,
    weightUnit: user?.weightUnit || 'kg',
    fitnessGoal: user?.fitnessGoal || 'Build Muscle',
    targetWeight: user?.targetWeight || 75,
    activityLevel: user?.activityLevel || 'Moderately Active',
    trainingDuration: user?.trainingDuration || 'Less than 3 months',
    experienceLevel: user?.experienceLevel || 'Beginner',
    workoutLocation: user?.workoutLocation || 'Gym',
    workoutDaysPerWeek: user?.workoutDaysPerWeek || 4,
    workoutDuration: user?.workoutDuration || '60 minutes',
    preferredTime: user?.preferredTime || 'Morning',
    dietType: user?.dietType || 'Non-Vegetarian',
    mealsPerDay: user?.mealsPerDay || 4,
    allergies: user?.allergies || [],
    medicalNotes: user?.medicalNotes || ''
  });

  const durationOptions = [
    { label: 'Just Starting', level: 'Beginner' },
    { label: 'Less than 3 months', level: 'Beginner' },
    { label: '3–6 months', level: 'Beginner' },
    { label: '6–12 months', level: 'Beginner' },
    { label: '1–2 years', level: 'Intermediate' },
    { label: 'More than 2 years', level: 'Advanced' }
  ];

  const updateForm = (field, val) => {
    setFormData(prev => {
      const next = { ...prev, [field]: val };
      if (field === 'trainingDuration') {
        const found = durationOptions.find(d => d.label === val);
        if (found) {
          next.experienceLevel = found.level;
        }
      }
      return next;
    });
  };

  const handleAllergyToggle = (allergy) => {
    if (allergy === 'None') {
      setFormData(prev => ({ ...prev, allergies: [] }));
      return;
    }
    const current = formData.allergies.filter(a => a !== 'None');
    if (current.includes(allergy)) {
      setFormData(prev => ({ ...prev, allergies: current.filter(a => a !== allergy) }));
    } else {
      setFormData(prev => ({ ...prev, allergies: [...current, allergy] }));
    }
  };

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = async () => {
    setSubmitting(true);
    try {
      const res = await fitnessAPI.saveOnboarding(formData);
      updateUser(res.user);
      onOnboardingComplete();
    } catch (err) {
      console.error('Onboarding failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const goals = [
    { title: 'Lose Weight', desc: 'Burn body fat & tighten waist', icon: '🔥' },
    { title: 'Build Muscle', desc: 'Maximize hypertrophy & strength gains', icon: '💪' },
    { title: 'Gain Weight', desc: 'Healthy weight & mass surplus', icon: '⚡' },
    { title: 'Maintain Weight', desc: 'Keep current weight & boost stamina', icon: '⚖️' },
    { title: 'Improve Fitness', desc: 'Cardiovascular health & endurance', icon: '🏃' },
  ];

  const activityLevels = [
    { level: 'Sedentary', desc: 'Little to no exercise, desk job' },
    { level: 'Lightly Active', desc: 'Light exercise 1-3 days per week' },
    { level: 'Moderately Active', desc: 'Moderate exercise 3-5 days per week' },
    { level: 'Very Active', desc: 'Hard exercise 6-7 days per week' },
    { level: 'Extremely Active', desc: 'Very hard athletic training or physical job' },
  ];

  const getLevelDescription = (lvl) => {
    if (lvl === 'Intermediate') {
      return "Your workout plan will focus on progressive overload, compound movements and increasing training volume.";
    }
    if (lvl === 'Advanced') {
      return "Your workout plan will focus on high volume, strength & hypertrophy splits, and advanced exercise variations.";
    }
    return "Your workout plan will focus on learning proper technique, building consistency and gradually increasing strength.";
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center p-4 relative overflow-hidden">
      <GlowingOrbs color="neon" />
      <GridPatternOverlay className="opacity-15" />

      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-20">
        {/* Progress Bar Header */}
        <div className="flex items-center justify-between text-xs font-semibold text-[#B8C2CF] mb-2">
          <span className="text-[#C6FF00] font-heading font-extrabold tracking-wider uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            RepForge Initialization
          </span>
          <span>Step {step} of 6</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#121821] overflow-hidden border border-[#2A3442]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(step / 6) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-[#C6FF00] to-lime-400 shadow-[0_0_10px_rgba(198,255,0,0.5)]"
          />
        </div>
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: -12 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full max-w-2xl bg-[#161D27] rounded-3xl p-6 sm:p-10 border border-[#2A3442] space-y-8 mt-12 relative z-10 shadow-2xl"
      >
        <CornerTechAccents />
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-[#C6FF00] uppercase tracking-wider block mb-1">Step 1 — Basic Information</span>
              <h2 className="text-2xl font-heading font-extrabold text-[#F5F7FA]">Let's calculate your baseline body stats</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#B8C2CF] block mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121821] border border-[#2A3442] text-xs text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#B8C2CF] block mb-1">Age (Years)</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => updateForm('age', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121821] border border-[#2A3442] text-xs text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#B8C2CF] block mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateForm('gender', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121821] border border-[#2A3442] text-xs text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Height ({formData.heightUnit})</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => updateForm('height', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121318] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ccff00]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Weight ({formData.weightUnit})</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => updateForm('weight', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121318] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ccff00]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Primary Fitness Goal */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider block mb-1">Step 2 — Fitness Target</span>
              <h2 className="text-2xl font-heading font-extrabold text-white">What is your primary fitness goal?</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {goals.map((g) => {
                const isSelected = formData.fitnessGoal === g.title;
                return (
                  <div
                    key={g.title}
                    onClick={() => updateForm('fitnessGoal', g.title)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? 'bg-[#ccff00]/10 border-[#ccff00] text-white shadow-[0_0_20px_rgba(204,255,0,0.2)]'
                        : 'bg-[#121318] border-white/5 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <span className="text-2xl">{g.icon}</span>
                    <div>
                      <span className="font-bold text-sm text-white block">{g.title}</span>
                      <span className="text-[11px] text-gray-400">{g.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Target Weight ({formData.weightUnit})</label>
              <input
                type="number"
                step="0.1"
                value={formData.targetWeight}
                onChange={(e) => updateForm('targetWeight', e.target.value)}
                className="w-full max-w-xs px-4 py-2.5 rounded-xl bg-[#121318] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ccff00]"
              />
            </div>
          </div>
        )}

        {/* Step 3: Activity Level */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider block mb-1">Step 3 — Activity Level</span>
              <h2 className="text-2xl font-heading font-extrabold text-white">How active is your daily lifestyle?</h2>
            </div>

            <div className="space-y-2.5">
              {activityLevels.map((act) => {
                const isSelected = formData.activityLevel === act.level;
                return (
                  <div
                    key={act.level}
                    onClick={() => updateForm('activityLevel', act.level)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#ccff00]/10 border-[#ccff00] text-white shadow-[0_0_15px_rgba(204,255,0,0.15)]'
                        : 'bg-[#121318] border-white/5 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-sm text-white block">{act.level}</span>
                      <span className="text-xs text-gray-400">{act.desc}</span>
                    </div>
                    {isSelected && <div className="w-5 h-5 rounded-full bg-[#ccff00] text-black flex items-center justify-center font-bold text-xs">✓</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Workout Experience Level System */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider block mb-1">Step 4 — Training Experience</span>
              <h2 className="text-2xl font-heading font-extrabold text-white">How long have you been exercising consistently?</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {durationOptions.map((opt) => {
                const isSelected = formData.trainingDuration === opt.label;
                return (
                  <div
                    key={opt.label}
                    onClick={() => updateForm('trainingDuration', opt.label)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#ccff00]/15 border-[#ccff00] text-white shadow-[0_0_20px_rgba(204,255,0,0.2)]'
                        : 'bg-[#121318] border-white/5 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <span className="font-extrabold text-sm text-white">{opt.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white/10 text-[#ccff00]">
                      {opt.level}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Auto-Assigned Training Level Banner */}
            <div className="p-5 rounded-3xl glass-card border border-[#ccff00]/30 bg-[#ccff00]/5 space-y-2">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#ccff00]" />
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Your Assigned Training Level</span>
                <span className="px-3 py-1 rounded-full bg-[#ccff00] text-black font-heading font-black text-xs">
                  {formData.experienceLevel}
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                {getLevelDescription(formData.experienceLevel)}
              </p>
            </div>
          </div>
        )}

        {/* Step 5: Schedule & Location Preferences */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider block mb-1">Step 5 — Schedule & Preferences</span>
              <h2 className="text-2xl font-heading font-extrabold text-white">Customize your training schedule</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Workout Location</label>
                <select
                  value={formData.workoutLocation}
                  onChange={(e) => updateForm('workoutLocation', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121318] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ccff00]"
                >
                  <option value="Gym">Commercial Gym</option>
                  <option value="Home">Home Workout</option>
                  <option value="Both">Both / Hybrid</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Days Per Week</label>
                <div className="flex gap-2">
                  {[2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => updateForm('workoutDaysPerWeek', num)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        formData.workoutDaysPerWeek === num
                          ? 'bg-[#ccff00] text-black shadow-[0_0_10px_rgba(204,255,0,0.3)]'
                          : 'bg-[#121318] border border-white/10 text-gray-300 hover:text-white'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Session Duration</label>
                <select
                  value={formData.workoutDuration}
                  onChange={(e) => updateForm('workoutDuration', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121318] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ccff00]"
                >
                  <option value="30 minutes">30 minutes (Express)</option>
                  <option value="45 minutes">45 minutes</option>
                  <option value="60 minutes">60 minutes (Standard)</option>
                  <option value="90 minutes">90 minutes (Pro)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Preferred Time of Day</label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => updateForm('preferredTime', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121318] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ccff00]"
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Diet & Health Notes */}
        {step === 6 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider block mb-1">Step 6 — Diet & Medical Notes</span>
              <h2 className="text-2xl font-heading font-extrabold text-white">Fine-tune your nutrition & health parameters</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-2">Dietary Preference</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Vegetarian', 'Non-Vegetarian', 'Vegan'].map((diet) => (
                    <button
                      key={diet}
                      type="button"
                      onClick={() => updateForm('dietType', diet)}
                      className={`py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                        formData.dietType === diet
                          ? 'bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.25)]'
                          : 'bg-[#121318] border border-white/10 text-gray-300 hover:text-white'
                      }`}
                    >
                      {diet}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Meals Per Day</label>
                <select
                  value={formData.mealsPerDay}
                  onChange={(e) => updateForm('mealsPerDay', Number(e.target.value))}
                  className="w-full max-w-xs px-4 py-2.5 rounded-xl bg-[#121318] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ccff00]"
                >
                  <option value={3}>3 Meals / day</option>
                  <option value={4}>4 Meals / day</option>
                  <option value={5}>5 Meals / day</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <button
            type="button"
            disabled={step === 1}
            onClick={handleBack}
            className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-gray-300 hover:bg-white/5 transition-all disabled:opacity-30 cursor-pointer flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {step < 6 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)] cursor-pointer flex items-center gap-2"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={submitting}
              onClick={handleFinish}
              className="px-7 py-3 rounded-xl bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-all shadow-[0_0_20px_rgba(204,255,0,0.4)] cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{submitting ? 'Generating Your Plan...' : 'Finish & Launch RepForge'}</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
