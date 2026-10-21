import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fitnessAPI } from '../services/api';
import { BMIIndicator } from '../components/BMIIndicator';
import { Target, Flame, Zap, Droplet, Footprints, Calendar, Edit3, RefreshCw, CheckCircle2 } from 'lucide-react';

export const MyPlanPage = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [recalculating, setRecalculating] = useState(false);

  const [formData, setFormData] = useState({
    fitnessGoal: user?.fitnessGoal || 'Build Muscle',
    weight: user?.weight || 80.8,
    targetWeight: user?.targetWeight || 75.0,
    activityLevel: user?.activityLevel || 'Moderately Active'
  });

  const handleRecalculate = async () => {
    setRecalculating(true);
    try {
      const res = await fitnessAPI.recalculate(formData);
      updateUser(res.user);
      setEditing(false);
    } catch (err) {
      console.error('Recalculate failed:', err);
    } finally {
      setRecalculating(false);
    }
  };

  const targets = user?.targets || {
    bmiScore: 25.5,
    bmiCategory: 'Overweight',
    calories: 2150,
    protein: 165,
    carbs: 220,
    fat: 65,
    water: 3.2,
    steps: 10000
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-[#ccff00]" /> My Personalized Plan
          </h2>
          <p className="text-xs text-gray-400">Complete architectural breakdown of your fitness & nutritional targets</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setEditing(!editing)}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Edit3 className="w-4 h-4 text-[#ccff00]" />
            <span>{editing ? 'Cancel Edit' : 'Edit Goal'}</span>
          </button>
          <button
            onClick={handleRecalculate}
            disabled={recalculating}
            className="px-4 py-2.5 rounded-xl bg-[#ccff00] text-black font-extrabold text-xs hover:bg-[#b8e600] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(204,255,0,0.3)] disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${recalculating ? 'animate-spin' : ''}`} />
            <span>{recalculating ? 'Recalculating...' : 'Recalculate Plan'}</span>
          </button>
        </div>
      </div>

      {/* Edit Form Modal Drawer if toggled */}
      {editing && (
        <div className="p-6 rounded-3xl glass-card border border-[#ccff00]/30 space-y-4 animate-in fade-in">
          <h3 className="text-base font-heading font-bold text-white">Modify Goal & Activity Parameters</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Fitness Goal</label>
              <select
                value={formData.fitnessGoal}
                onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#121318] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ccff00]"
              >
                <option value="Lose Weight">Lose Weight</option>
                <option value="Build Muscle">Build Muscle</option>
                <option value="Gain Weight">Gain Weight</option>
                <option value="Maintain Weight">Maintain Weight</option>
                <option value="Improve Fitness">Improve Fitness</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Current Weight (kg)</label>
              <input
                type="number" step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#121318] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ccff00]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Target Weight (kg)</label>
              <input
                type="number" step="0.1"
                value={formData.targetWeight}
                onChange={(e) => setFormData({ ...formData, targetWeight: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#121318] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ccff00]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Activity Level</label>
              <select
                value={formData.activityLevel}
                onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#121318] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ccff00]"
              >
                <option value="Sedentary">Sedentary</option>
                <option value="Lightly Active">Lightly Active</option>
                <option value="Moderately Active">Moderately Active</option>
                <option value="Very Active">Very Active</option>
                <option value="Extremely Active">Extremely Active</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleRecalculate}
            className="py-2.5 px-6 rounded-xl bg-[#ccff00] text-black font-extrabold text-xs hover:bg-[#b8e600] transition-all cursor-pointer"
          >
            Apply & Update Targets
          </button>
        </div>
      )}

      {/* Main Grid Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Key Parameters */}
        <div className="lg:col-span-7 space-y-6">
          {/* Target Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
              <span className="text-xs text-gray-400 block font-medium">Fitness Goal</span>
              <span className="text-lg font-bold text-white block">{user?.fitnessGoal || 'Build Muscle'}</span>
              <span className="text-[10px] text-[#ccff00] block">Preserving lean mass</span>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
              <span className="text-xs text-gray-400 block font-medium">Current vs Target</span>
              <span className="text-lg font-bold text-white block">{user?.weight || 80.8} kg → {user?.targetWeight || 75.0} kg</span>
              <span className="text-[10px] text-cyan-400 block">Delta: -5.8 kg</span>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
              <span className="text-xs text-gray-400 block font-medium flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-400" /> Daily Calorie Goal
              </span>
              <span className="text-xl font-extrabold text-[#ccff00] font-heading">{targets.calories} kcal</span>
              <span className="text-[10px] text-gray-400 block">TDEE: {targets.tdee || 2650} kcal</span>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
              <span className="text-xs text-gray-400 block font-medium flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-[#ccff00]" /> Protein Intake Target
              </span>
              <span className="text-xl font-extrabold text-[#ccff00] font-heading">{targets.protein} g/day</span>
              <span className="text-[10px] text-gray-400 block">~2.0g per kg bodyweight</span>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
              <span className="text-xs text-gray-400 block font-medium flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 text-cyan-400" /> Hydration Goal
              </span>
              <span className="text-xl font-extrabold text-white font-heading">{targets.water} Liters</span>
              <span className="text-[10px] text-gray-400 block">Daily fluid intake</span>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
              <span className="text-xs text-gray-400 block font-medium flex items-center gap-1">
                <Footprints className="w-3.5 h-3.5 text-emerald-400" /> Step Goal
              </span>
              <span className="text-xl font-extrabold text-white font-heading">{targets.steps?.toLocaleString()} Steps</span>
              <span className="text-[10px] text-gray-400 block">Active NEAT target</span>
            </div>
          </div>

          {/* Timeline & Schedule Summary */}
          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
            <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#ccff00]" /> Estimated Timeline & Routine
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[#121318] border border-white/5">
                <span className="text-gray-400 block">Workout Frequency</span>
                <span className="font-bold text-white text-sm mt-0.5 block">{user?.workoutDaysPerWeek || 5} Days / Week</span>
              </div>
              <div className="p-3 rounded-xl bg-[#121318] border border-white/5">
                <span className="text-gray-400 block">Location</span>
                <span className="font-bold text-white text-sm mt-0.5 block">{user?.workoutLocation || 'Gym'}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#121318] border border-white/5">
                <span className="text-gray-400 block">Est. Completion</span>
                <span className="font-bold text-[#ccff00] text-sm mt-0.5 block">10–12 Weeks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: BMI Gauge & Metabolic Data */}
        <div className="lg:col-span-5 space-y-6">
          {/* BMI Gauge Component */}
          <BMIIndicator bmiScore={targets.bmiScore || 25.5} bmiCategory={targets.bmiCategory || 'Overweight'} />

          {/* Metabolic Breakdown */}
          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
            <h3 className="text-base font-heading font-bold text-white">Metabolic Metrics</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#121318]">
                <span className="text-gray-300">BMR (Basal Metabolic Rate):</span>
                <span className="font-bold text-white">{targets.bmr || 1810} kcal</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#121318]">
                <span className="text-gray-300">TDEE (Total Expenditure):</span>
                <span className="font-bold text-white">{targets.tdee || 2650} kcal</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#121318]">
                <span className="text-gray-300">Caloric Deficit/Surplus:</span>
                <span className="font-bold text-[#ccff00]">-500 kcal Moderate Deficit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
