import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { checkinAPI } from '../services/api';
import { CalendarCheck, Award, Sparkles, Check, Flame, Zap, Droplet, Moon, Smile, Footprints } from 'lucide-react';

export const DailyCheckInPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    weight: user?.weight || 80.8,
    workoutCompleted: true,
    dietFollowed: true,
    water: 2.5,
    sleep: 8.0,
    steps: 8420,
    energy: 8,
    mood: 'Excellent'
  });

  const [checkinResult, setCheckinResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTodayCheckin();
  }, []);

  const fetchTodayCheckin = async () => {
    try {
      const data = await checkinAPI.getToday();
      if (data) {
        setCheckinResult(data);
        setFormData({
          weight: data.weight || user?.weight || 80.8,
          workoutCompleted: data.workoutCompleted,
          dietFollowed: data.dietFollowed,
          water: data.water || 2.5,
          sleep: data.sleep || 8.0,
          steps: data.steps || 8420,
          energy: data.energy || 8,
          mood: data.mood || 'Excellent'
        });
      }
    } catch (err) {
      console.error('Fetch checkin error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await checkinAPI.submitCheckin(formData);
      setCheckinResult(res);
    } catch (err) {
      console.error('Submit checkin error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const moods = ['Excellent', 'Good', 'Average', 'Low'];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
          <CalendarCheck className="w-6 h-6 text-[#ccff00]" /> Daily Fitness Check-In
        </h2>
        <p className="text-xs text-gray-400">Log today's execution to calculate your Daily Fitness Score & get smart advice</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Check-In Form (7 Cols) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-white/10 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Weight & Sleep */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Today's Weight (kg)</label>
                <input
                  type="number" step="0.1" required
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121318] border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-[#ccff00]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Sleep Hours</label>
                <input
                  type="number" step="0.5" required
                  value={formData.sleep}
                  onChange={(e) => setFormData({ ...formData, sleep: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121318] border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-[#ccff00]"
                />
              </div>
            </div>

            {/* Workout & Diet Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#121318] border border-white/5 space-y-2">
                <span className="text-xs font-semibold text-gray-300 block">Workout Completed Today?</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, workoutCompleted: true })}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      formData.workoutCompleted ? 'bg-[#ccff00] text-black' : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    Yes ✓
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, workoutCompleted: false })}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      !formData.workoutCompleted ? 'bg-rose-500 text-white' : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#121318] border border-white/5 space-y-2">
                <span className="text-xs font-semibold text-gray-300 block">Diet Plan Followed?</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, dietFollowed: true })}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      formData.dietFollowed ? 'bg-[#ccff00] text-black' : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    Yes ✓
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, dietFollowed: false })}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      !formData.dietFollowed ? 'bg-rose-500 text-white' : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            {/* Water & Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Water Intake (Liters)</label>
                <input
                  type="number" step="0.1" required
                  value={formData.water}
                  onChange={(e) => setFormData({ ...formData, water: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121318] border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-[#ccff00]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Daily Steps</label>
                <input
                  type="number" required
                  value={formData.steps}
                  onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121318] border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-[#ccff00]"
                />
              </div>
            </div>

            {/* Energy Slider & Mood Picker */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-300 mb-1">
                  <span>Energy Level (1 to 10):</span>
                  <span className="text-[#ccff00] font-bold">{formData.energy} / 10</span>
                </div>
                <input
                  type="range" min="1" max="10"
                  value={formData.energy}
                  onChange={(e) => setFormData({ ...formData, energy: e.target.value })}
                  className="w-full accent-[#ccff00]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-2">Today's Mood</label>
                <div className="grid grid-cols-4 gap-2">
                  {moods.map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setFormData({ ...formData, mood: m })}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        formData.mood === m
                          ? 'bg-[#ccff00] text-black shadow-[0_0_10px_rgba(204,255,0,0.3)]'
                          : 'bg-[#121318] border border-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-2xl bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-all cursor-pointer shadow-[0_0_20px_rgba(204,255,0,0.3)] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{submitting ? 'Calculating Score...' : 'Submit Daily Check-In'}</span>
            </button>
          </form>
        </div>

        {/* Daily Score & Recommendation Card (5 Cols) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-white/10 space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-[#ccff00]" /> Daily Fitness Score
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Calculated based on training, nutrition & recovery execution</p>
          </div>

          {/* Score Badge Circle */}
          <div className="text-center py-6">
            <div className="w-32 h-32 rounded-full border-4 border-[#ccff00] bg-[#ccff00]/10 flex flex-col items-center justify-center mx-auto shadow-[0_0_30px_rgba(204,255,0,0.25)]">
              <span className="text-4xl font-black font-heading text-white">{checkinResult?.score || 88}</span>
              <span className="text-[10px] text-[#ccff00] font-bold tracking-widest uppercase">/ 100 PTS</span>
            </div>
          </div>

          {/* Smart Recommendation Box */}
          <div className="p-4 rounded-2xl bg-[#121318] border border-white/10 space-y-2">
            <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Coach Recommendation
            </span>
            <p className="text-xs text-gray-300 leading-relaxed font-medium">
              "{checkinResult?.recommendation || 'Outstanding consistency! Hydration and protein targets are on point. Maintain this momentum for optimal muscle recovery.'}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
