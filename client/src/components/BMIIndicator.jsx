import React from 'react';

export const BMIIndicator = ({ bmiScore = 22.4, bmiCategory = 'Normal' }) => {
  // Score range: 15 to 35 mapped to 0% - 100%
  const minBmi = 15;
  const maxBmi = 35;
  const percentage = Math.min(100, Math.max(0, ((bmiScore - minBmi) / (maxBmi - minBmi)) * 100));

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Underweight': return 'text-cyan-400 border-cyan-400 bg-cyan-400/10';
      case 'Normal': return 'text-[#ccff00] border-[#ccff00] bg-[#ccff00]/10';
      case 'Overweight': return 'text-amber-400 border-amber-400 bg-amber-400/10';
      case 'Obese': return 'text-rose-500 border-rose-500 bg-rose-500/10';
      default: return 'text-[#ccff00] border-[#ccff00] bg-[#ccff00]/10';
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-[#121318] border border-white/10 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-400 font-medium block">Body Mass Index (BMI)</span>
          <span className="text-2xl font-extrabold text-white font-heading">{bmiScore}</span>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryColor(bmiCategory)}`}>
          {bmiCategory}
        </span>
      </div>

      {/* Visual BMI Scale Gradient */}
      <div className="relative pt-3 pb-1">
        <div className="h-3 rounded-full bg-gradient-to-r from-cyan-400 via-[#ccff00] via-amber-400 to-rose-500 w-full opacity-80" />
        {/* Animated Marker */}
        <div
          className="absolute top-1 transform -translate-x-1/2 flex flex-col items-center transition-all duration-700"
          style={{ left: `${percentage}%` }}
        >
          <div className="w-4 h-4 rounded-full bg-white border-2 border-black shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-[10px] text-gray-400 pt-1 font-medium">
        <span>&lt; 18.5 Under</span>
        <span>18.5–24.9 Normal</span>
        <span>25–29.9 Over</span>
        <span>30+ Obese</span>
      </div>
    </div>
  );
};
