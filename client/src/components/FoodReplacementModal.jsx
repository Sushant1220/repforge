import React, { useState, useEffect } from 'react';
import { nutritionAPI } from '../services/api';
import { X, RefreshCw, Check, ArrowRight } from 'lucide-react';

export const FoodReplacementModal = ({ isOpen, onClose, date, mealType, item, onReplaced }) => {
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlt, setSelectedAlt] = useState(null);

  useEffect(() => {
    if (isOpen && item) {
      setLoading(true);
      nutritionAPI.getReplacements(item.name)
        .then(res => {
          setAlternatives(res.alternatives || []);
          setSelectedAlt(res.alternatives?.[0] || null);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const handleConfirmReplace = async () => {
    if (!selectedAlt) return;
    try {
      await nutritionAPI.replaceFood({
        date,
        mealType,
        itemId: item.id || item._id,
        newItem: selectedAlt
      });
      onReplaced();
      onClose();
    } catch (err) {
      console.error('Failed to replace food:', err);
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
            <RefreshCw className="w-5 h-5 text-[#ccff00]" /> Replace Food Item
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Swap <span className="text-[#ccff00] font-semibold">{item.name}</span> with a macro-equivalent alternative.
          </p>
        </div>

        {/* Original Food Badge */}
        <div className="p-3.5 rounded-2xl bg-[#121318] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block">Original Item</span>
            <span className="text-sm font-bold text-white">{item.name} ({item.quantity})</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-[#ccff00] block">{item.calories} kcal</span>
            <span className="text-[11px] text-gray-300">P: {item.protein}g | C: {item.carbs}g | F: {item.fat}g</span>
          </div>
        </div>

        {/* Alternatives List */}
        <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
          <label className="text-xs font-semibold text-gray-300 block">Select Macro-Matched Replacement:</label>
          {loading ? (
            <div className="py-8 text-center text-xs text-gray-400">Finding smart food alternatives...</div>
          ) : (
            alternatives.map((alt, idx) => {
              const isSelected = selectedAlt?.name === alt.name;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedAlt(alt)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#ccff00]/10 border-[#ccff00] text-white shadow-[0_0_15px_rgba(204,255,0,0.15)]'
                      : 'bg-[#121318] border-white/5 text-gray-300 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{alt.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-300">{alt.portion}</span>
                    </div>
                    {alt.note && <span className="text-[10px] text-[#ccff00] block">{alt.note}</span>}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-white block">{alt.calories} kcal</span>
                    <span className="text-[10px] text-gray-400">P: {alt.protein}g | C: {alt.carbs}g</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/10">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-white/10 text-xs font-medium text-gray-300 hover:bg-white/5 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmReplace}
            disabled={!selectedAlt}
            className="flex-1 py-3 rounded-xl bg-[#ccff00] text-black text-xs font-bold hover:bg-[#b8e600] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(204,255,0,0.3)]"
          >
            <span>Confirm Replacement</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
