import React from 'react';
import { Dumbbell, ArrowLeft } from 'lucide-react';

export const NotFoundPage = ({ onBackHome }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="w-24 h-24 rounded-3xl bg-[#121318] border border-[#ccff00]/40 text-[#ccff00] flex items-center justify-center shadow-[0_0_30px_rgba(204,255,0,0.2)]">
        <Dumbbell className="w-12 h-12 rotate-45" />
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-4xl font-heading font-black text-white">404 — Page Not Found</h1>
        <p className="text-sm text-gray-400">Looks like this workout route doesn't exist or has been completed!</p>
      </div>

      <button
        onClick={onBackHome}
        className="px-6 py-3 rounded-2xl bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(204,255,0,0.3)]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </button>
    </div>
  );
};
