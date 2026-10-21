import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { nutritionAPI } from '../services/api';
import { FoodReplacementModal } from '../components/FoodReplacementModal';
import { AddFoodModal } from '../components/AddFoodModal';
import {
  Utensils, Flame, Zap, Droplet, Plus, RefreshCw, CheckCircle2,
  Check, PieChart, Info, Search, Sparkles
} from 'lucide-react';
import { GridPatternOverlay, GlowingOrbs, CornerTechAccents, CircularProgressRing } from '../components/DecorativeGraphics';

export const NutritionPage = () => {
  const { user } = useAuth();
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [replacementModal, setReplacementModal] = useState({ isOpen: false, mealType: '', item: null });
  const [addFoodModal, setAddFoodModal] = useState({ isOpen: false, mealType: 'Breakfast' });

  useEffect(() => {
    fetchNutritionData();
  }, []);

  const fetchNutritionData = async () => {
    try {
      const data = await nutritionAPI.getNutrition();
      setNutrition(data);
    } catch (err) {
      console.error('Fetch nutrition error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleItem = async (mealType, itemId) => {
    try {
      const updated = await nutritionAPI.toggleMealItem({
        date: nutrition?.date,
        mealType,
        itemId
      });
      setNutrition(updated);
    } catch (err) {
      console.error('Toggle meal item error:', err);
    }
  };

  const handleWaterAdd = async (amountLiters) => {
    try {
      const res = await nutritionAPI.logWater({ amountLiters, date: nutrition?.date });
      setNutrition(prev => prev ? { ...prev, waterLogged: res.waterLogged } : prev);
    } catch (err) {
      console.error('Log water error:', err);
    }
  };

  // Macro Totals Logged
  const eatenItems = nutrition?.meals?.flatMap(m => m.items.filter(i => i.eaten)) || [];
  const totalCaloriesLogged = eatenItems.reduce((acc, i) => acc + i.calories, 0);
  const totalProteinLogged = eatenItems.reduce((acc, i) => acc + i.protein, 0);
  const totalCarbsLogged = eatenItems.reduce((acc, i) => acc + i.carbs, 0);
  const totalFatLogged = eatenItems.reduce((acc, i) => acc + i.fat, 0);

  const calTarget = user?.targets?.calories || 2200;
  const calRemaining = Math.max(0, calTarget - totalCaloriesLogged);
  const calPercent = Math.min(100, Math.round((totalCaloriesLogged / calTarget) * 100));

  const proteinTarget = user?.targets?.protein || 165;
  const carbTarget = user?.targets?.carbs || 220;
  const fatTarget = user?.targets?.fat || 65;
  const waterTarget = user?.targets?.water || 3.2;

  if (loading) {
    return <div className="py-20 text-center text-xs text-gray-400">Loading daily nutrition plan...</div>;
  }

  return (
    <div className="space-y-6 pb-12 relative">
      <GlowingOrbs color="neon" />

      {/* 1. Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
            <Utensils className="w-6 h-6 text-[#ccff00]" /> Daily Nutrition Dashboard
          </h2>
          <p className="text-xs text-gray-400">Track macro composition, replace foods, and log hydration goals</p>
        </div>
        <button
          onClick={() => setAddFoodModal({ isOpen: true, mealType: 'Breakfast' })}
          className="px-5 py-2.5 rounded-xl bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Food</span>
        </button>
      </motion.div>

      {/* 2. Top Hero: Calories Remaining & Macro Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calories Remaining Hero (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-5 glass-card glass-card-hover rounded-3xl p-6 border border-white/10 flex flex-col justify-between space-y-4 relative overflow-hidden"
        >
          <CornerTechAccents />
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Calories Budget</span>
            <span className="text-xs text-[#ccff00] font-bold">{calPercent}% Consumed</span>
          </div>

          <div className="flex items-center justify-around py-2">
            <CircularProgressRing
              size={100}
              strokeWidth={8}
              progress={calPercent}
              color="#ccff00"
              label={`${calPercent}%`}
              sublabel="Eaten"
            />
            <div className="text-left space-y-1">
              <span className="text-3xl sm:text-4xl font-heading font-black text-white block">{calRemaining.toLocaleString()}</span>
              <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider block">kcal remaining</span>
              <p className="text-[11px] text-gray-400">Target: {calTarget} kcal</p>
            </div>
          </div>

          <div className="w-full h-3 rounded-full bg-[#121318] overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#ccff00] to-lime-400 transition-all duration-500" style={{ width: `${calPercent}%` }} />
          </div>
        </motion.div>

        {/* Macro Target Progress Bars (7 Cols) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-white/10 space-y-4">
          <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
            <PieChart className="w-4 h-4 text-[#ccff00]" /> Daily Macronutrient Breakdown
          </h3>

          <div className="space-y-3.5">
            {/* Protein Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-300 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#ccff00]" /> Protein</span>
                <span className="text-white">{totalProteinLogged} / {proteinTarget} g</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-[#121318] overflow-hidden">
                <div className="h-full bg-[#ccff00] rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (totalProteinLogged / proteinTarget) * 100)}%` }} />
              </div>
            </div>

            {/* Carbohydrates Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-300 flex items-center gap-1.5"><Utensils className="w-3.5 h-3.5 text-cyan-400" /> Carbohydrates</span>
                <span className="text-white">{totalCarbsLogged} / {carbTarget} g</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-[#121318] overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (totalCarbsLogged / carbTarget) * 100)}%` }} />
              </div>
            </div>

            {/* Fats Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-300 flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-orange-400" /> Fats</span>
                <span className="text-white">{totalFatLogged} / {fatTarget} g</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-[#121318] overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (totalFatLogged / fatTarget) * 100)}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Water Tracker Section */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400">
              <Droplet className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-bold text-white">Water & Hydration Tracker</h3>
              <p className="text-xs text-gray-400">Goal: <strong className="text-white">{waterTarget} Litres</strong> | Current: <strong className="text-cyan-400">{nutrition?.waterLogged || 2.1} L</strong></p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleWaterAdd(0.25)}
              className="px-3 py-2 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-xs font-bold text-cyan-300 hover:bg-cyan-400/20 transition-all cursor-pointer"
            >
              +250 ml
            </button>
            <button
              onClick={() => handleWaterAdd(0.5)}
              className="px-3 py-2 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-xs font-bold text-cyan-300 hover:bg-cyan-400/20 transition-all cursor-pointer"
            >
              +500 ml
            </button>
            <button
              onClick={() => handleWaterAdd(1.0)}
              className="px-3 py-2 rounded-xl bg-cyan-400 text-black text-xs font-extrabold hover:bg-cyan-300 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              +1.0 L
            </button>
          </div>
        </div>

        {/* Glasses Visual Grid */}
        <div className="flex flex-wrap gap-3 pt-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((gIndex) => {
            const currentL = nutrition?.waterLogged || 2.1;
            const glassFilled = (gIndex * 0.25) <= currentL;
            return (
              <div
                key={gIndex}
                onClick={() => handleWaterAdd(0.25)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  glassFilled
                    ? 'bg-cyan-400/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                    : 'bg-[#121318] border-white/5 text-gray-600 hover:border-white/20'
                }`}
              >
                <Droplet className={`w-5 h-5 ${glassFilled ? 'fill-cyan-400' : ''}`} />
                <span className="text-[9px] font-bold">250ml</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Meals Breakdown List */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-bold text-white">Daily Meals Breakdown</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nutrition?.meals?.map((meal, idx) => (
            <div key={idx} className="glass-card rounded-3xl p-5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider block">{meal.mealType}</span>
                  <h4 className="text-base font-bold text-white">{meal.name}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-white/5 text-[#ccff00]">
                    {meal.totalCalories} kcal
                  </span>
                  <button
                    onClick={() => setAddFoodModal({ isOpen: true, mealType: meal.mealType })}
                    className="p-1.5 rounded-lg bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                    title="Add food to meal"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Items in meal */}
              <div className="space-y-2.5">
                {meal.items.map((item) => (
                  <div
                    key={item.id || item._id}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                      item.eaten
                        ? 'bg-[#ccff00]/5 border-[#ccff00]/30 text-gray-300'
                        : 'bg-[#121318] border-white/5 text-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{item.name}</span>
                        <span className="text-[10px] text-gray-400">({item.quantity})</span>
                      </div>
                      <span className="text-[10px] text-[#ccff00] block mt-0.5">
                        {item.calories} kcal | P: {item.protein}g | C: {item.carbs}g | F: {item.fat}g
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setReplacementModal({ isOpen: true, mealType: meal.mealType, item })}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-semibold text-gray-300 hover:text-white hover:border-[#ccff00] transition-all cursor-pointer flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3 text-[#ccff00]" />
                        <span>Replace</span>
                      </button>

                      <button
                        onClick={() => handleToggleItem(meal.mealType, item.id || item._id)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          item.eaten
                            ? 'bg-[#ccff00] text-black'
                            : 'bg-[#121318] border border-white/20 text-gray-400 hover:text-white'
                        }`}
                      >
                        {item.eaten ? <Check className="w-3 h-3 stroke-[3]" /> : null}
                        <span>{item.eaten ? 'Eaten' : 'Mark Eaten'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <FoodReplacementModal
        isOpen={replacementModal.isOpen}
        onClose={() => setReplacementModal({ isOpen: false, mealType: '', item: null })}
        date={nutrition?.date}
        mealType={replacementModal.mealType}
        item={replacementModal.item}
        onReplaced={fetchNutritionData}
      />

      <AddFoodModal
        isOpen={addFoodModal.isOpen}
        onClose={() => setAddFoodModal({ isOpen: false, mealType: 'Breakfast' })}
        date={nutrition?.date}
        mealType={addFoodModal.mealType}
        onFoodAdded={fetchNutritionData}
      />
    </div>
  );
};
