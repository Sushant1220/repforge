import React, { useState, useEffect } from 'react';
import { nutritionAPI } from '../services/api';
import { X, Search, Plus, Check } from 'lucide-react';

export const AddFoodModal = ({ isOpen, onClose, date, mealType = 'Breakfast', onFoodAdded }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [servings, setServings] = useState('1');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      handleSearch('');
    }
  }, [isOpen]);

  const handleSearch = (q) => {
    setQuery(q);
    setLoading(true);
    nutritionAPI.searchFood(q)
      .then(res => {
        setSearchResults(res);
        if (res.length > 0 && !selectedFood) {
          setSelectedFood(res[0]);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  if (!isOpen) return null;

  const mult = parseFloat(servings) || 1;
  const computedCalories = selectedFood ? Math.round(selectedFood.calories * mult) : 0;
  const computedProtein = selectedFood ? Math.round(selectedFood.protein * mult) : 0;
  const computedCarbs = selectedFood ? Math.round(selectedFood.carbs * mult) : 0;
  const computedFat = selectedFood ? Math.round(selectedFood.fat * mult) : 0;

  const handleAdd = async () => {
    if (!selectedFood) return;
    try {
      await nutritionAPI.addFood({
        date,
        mealType,
        foodItem: selectedFood,
        servings: mult
      });
      onFoodAdded();
      onClose();
    } catch (err) {
      console.error('Failed to add food:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg glass-card rounded-3xl p-6 border border-white/10 space-y-5 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#ccff00]" /> Add Food to {mealType}
          </h2>
          <p className="text-xs text-gray-400 mt-1">Search RepForge verified database or enter custom portion.</p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search food (e.g. Rice, Chicken, Eggs, Oats)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121318] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ccff00]"
          />
        </div>

        {/* Search Results */}
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {searchResults.map((f) => {
            const isSelected = selectedFood?.id === f.id;
            return (
              <div
                key={f.id}
                onClick={() => setSelectedFood(f)}
                className={`p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#ccff00]/10 border-[#ccff00] text-white'
                    : 'bg-[#121318] border-white/5 text-gray-300 hover:border-white/20'
                }`}
              >
                <div>
                  <span className="font-semibold text-white block">{f.name}</span>
                  <span className="text-[10px] text-gray-400">{f.portion}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#ccff00] block">{f.calories} kcal</span>
                  <span className="text-[10px] text-gray-400">P: {f.protein}g | C: {f.carbs}g | F: {f.fat}g</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quantity Input & Preview */}
        {selectedFood && (
          <div className="p-4 rounded-2xl bg-[#121318] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-300">Number of Servings:</label>
              <input
                type="number"
                step="0.25"
                min="0.25"
                max="10"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                className="w-20 px-3 py-1.5 rounded-lg bg-[#1a1c24] border border-white/10 text-xs text-white font-bold text-center focus:outline-none focus:border-[#ccff00]"
              />
            </div>
            <div className="flex justify-between items-center text-xs pt-2 border-t border-white/10">
              <span className="text-gray-400 font-medium">Total Added Macros:</span>
              <span className="font-bold text-[#ccff00]">
                {computedCalories} kcal <span className="text-gray-300 font-normal">({computedProtein}g P, {computedCarbs}g C, {computedFat}g F)</span>
              </span>
            </div>
          </div>
        )}

        {/* Submit Action */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-white/10 text-xs font-medium text-gray-300 hover:bg-white/5 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!selectedFood}
            className="flex-1 py-3 rounded-xl bg-[#ccff00] text-black text-xs font-bold hover:bg-[#b8e600] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(204,255,0,0.3)] disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            <span>Add to Meal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
