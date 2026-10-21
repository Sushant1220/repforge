import React, { useState } from 'react';
import { progressAPI } from '../services/api';
import { X, Ruler, Save } from 'lucide-react';

export const LogMeasurementModal = ({ isOpen, onClose, onLogSuccess }) => {
  const [formData, setFormData] = useState({
    chest: 104,
    waist: 84,
    arms: 38.5,
    shoulders: 122,
    thighs: 58,
    hips: 96,
    bodyFat: 16.5,
    date: new Date().toISOString().split('T')[0]
  });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await progressAPI.logMeasurement(formData);
      if (onLogSuccess) onLogSuccess();
      onClose();
    } catch (err) {
      console.error('Failed to log measurements:', err);
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
            <Ruler className="w-5 h-5 text-[#ccff00]" /> Body Measurement Tracker
          </h2>
          <p className="text-xs text-gray-400 mt-1">Record body circumferences (cm) & body fat %.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-gray-300 block mb-1">Chest (cm)</label>
              <input
                type="number" step="0.5" required
                name="chest" value={formData.chest} onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-[#121318] border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-[#ccff00]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-gray-300 block mb-1">Waist (cm)</label>
              <input
                type="number" step="0.5" required
                name="waist" value={formData.waist} onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-[#121318] border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-[#ccff00]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-gray-300 block mb-1">Arms (cm)</label>
              <input
                type="number" step="0.5" required
                name="arms" value={formData.arms} onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-[#121318] border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-[#ccff00]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-gray-300 block mb-1">Shoulders (cm)</label>
              <input
                type="number" step="0.5" required
                name="shoulders" value={formData.shoulders} onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-[#121318] border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-[#ccff00]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-gray-300 block mb-1">Thighs (cm)</label>
              <input
                type="number" step="0.5" required
                name="thighs" value={formData.thighs} onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-[#121318] border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-[#ccff00]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-gray-300 block mb-1">Hips (cm)</label>
              <input
                type="number" step="0.5" required
                name="hips" value={formData.hips} onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-[#121318] border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-[#ccff00]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-300 block mb-1">Estimated Body Fat %</label>
            <input
              type="number" step="0.1" required
              name="bodyFat" value={formData.bodyFat} onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl bg-[#121318] border border-white/10 text-xs font-bold text-[#ccff00] focus:outline-none focus:border-[#ccff00]"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs font-medium text-gray-300 hover:bg-white/5 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit" disabled={submitting}
              className="flex-1 py-2.5 rounded-xl bg-[#ccff00] text-black text-xs font-bold hover:bg-[#b8e600] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(204,255,0,0.3)] disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{submitting ? 'Saving...' : 'Save Measurements'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
