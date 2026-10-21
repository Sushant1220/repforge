import React, { useState } from 'react';
import { progressAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { X, Scale, Save } from 'lucide-react';

export const LogWeightModal = ({ isOpen, onClose, onWeightLogged }) => {
  const { user, updateUser } = useAuth();
  const [weight, setWeight] = useState(user?.weight || 80.8);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await progressAPI.logWeight({ weight, date, notes });
      updateUser({ weight: Number(weight) });
      if (onWeightLogged) onWeightLogged();
      onClose();
    } catch (err) {
      console.error('Failed to log weight:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md glass-card rounded-3xl p-6 border border-white/10 space-y-5 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#ccff00]" /> Log Today's Weight
          </h2>
          <p className="text-xs text-gray-400 mt-1">Keep your weight tracking history up to date.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Body Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              required
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#121318] border border-white/10 text-lg font-extrabold text-white text-center focus:outline-none focus:border-[#ccff00]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Log Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#121318] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ccff00]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Notes (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Morning fasting weight..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#121318] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ccff00]"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-white/10 text-xs font-medium text-gray-300 hover:bg-white/5 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 rounded-xl bg-[#ccff00] text-black text-xs font-bold hover:bg-[#b8e600] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(204,255,0,0.3)] disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{submitting ? 'Saving...' : 'Save Weight Log'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
