import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { achievementAPI } from '../services/api';
import {
  User, Flame, Trophy, Award, Zap, Target, Dumbbell, ShieldCheck,
  Edit3, Calendar, Activity, CheckCircle2, Lock
} from 'lucide-react';

export const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Alex Rivers',
    age: user?.age || 26,
    height: user?.height || 178,
    weight: user?.weight || 80.8,
    fitnessGoal: user?.fitnessGoal || 'Build Muscle',
    dietType: user?.dietType || 'Non-Vegetarian'
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      updateUser(profileForm);
      setEditingProfile(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const fetchAchievements = async () => {
    try {
      const data = await achievementAPI.getAchievements();
      setAchievements(data.achievements || []);
    } catch (err) {
      console.error('Fetch achievements error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Mock GitHub-style 30-day activity calendar heatmap
  const generateContributionDays = () => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const intensity = (i % 7 === 0 || i % 11 === 0) ? 0 : (i % 3 === 0 ? 2 : 3);
      days.push({
        date: date.toISOString().split('T')[0],
        intensity // 0: no workout, 2: partial, 3: completed
      });
    }
    return days;
  };

  const contributionDays = generateContributionDays();

  const getHeatmapColor = (intensity) => {
    switch (intensity) {
      case 3: return 'bg-[#ccff00] border-[#ccff00] shadow-[0_0_8px_rgba(204,255,0,0.4)]';
      case 2: return 'bg-[#ccff00]/40 border-[#ccff00]/50';
      default: return 'bg-[#121318] border-white/5';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Profile Header Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={user?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={user?.name}
            className="w-24 h-24 rounded-2xl object-cover border-2 border-[#ccff00] shadow-[0_0_20px_rgba(204,255,0,0.3)]"
          />

          <div className="text-center sm:text-left space-y-1 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-heading font-extrabold text-white">{user?.name || 'Alex Rivers'}</h2>
                <span className="px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-[#ccff00]" /> {user?.streakCount || 12} Day Streak
                </span>
              </div>

              <button
                onClick={() => setEditingProfile(true)}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-xs font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#ccff00]" />
                <span>Edit Profile</span>
              </button>
            </div>
            <p className="text-xs text-gray-400">{user?.email || 'alex@repforge.ai'}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2 text-[11px] font-semibold text-gray-300">
              <span className="px-2.5 py-1 rounded-lg bg-white/5">{user?.age || 26} Yrs</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5">{user?.height || 178} {user?.heightUnit || 'cm'}</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5">{user?.weight || 80.8} {user?.weightUnit || 'kg'}</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5">{user?.fitnessGoal || 'Build Muscle'}</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5">{user?.dietType || 'Non-Vegetarian'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. GitHub-Style Streak Heatmap Grid */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#ccff00]" /> Workout Activity & Streak Heatmap
            </h3>
            <p className="text-xs text-gray-400">30-Day consecutive execution history</p>
          </div>
          <span className="text-xs font-bold text-[#ccff00]">🔥 {user?.streakCount || 12} Consecutive Days</span>
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-2 pt-2">
          {contributionDays.map((d, i) => (
            <div
              key={i}
              title={`${d.date}: ${d.intensity > 0 ? 'Workout Completed' : 'Rest Day'}`}
              className={`w-7 h-7 rounded-lg border transition-all ${getHeatmapColor(d.intensity)}`}
            />
          ))}
        </div>
      </div>

      {/* 3. Achievements & Badges Grid */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
        <div>
          <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#ccff00]" /> Achievements & Badges
          </h3>
          <p className="text-xs text-gray-400">Unlock fitness milestones as you progress</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((badge, idx) => (
            <div
              key={badge._id || idx}
              className={`p-4 rounded-2xl border transition-all flex items-center gap-3.5 ${
                badge.unlocked
                  ? 'bg-[#121318] border-[#ccff00]/40 text-white shadow-[0_0_15px_rgba(204,255,0,0.1)]'
                  : 'bg-[#121318]/40 border-white/5 text-gray-500 opacity-60'
              }`}
            >
              <div className={`p-3 rounded-2xl ${
                badge.unlocked ? 'bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/30' : 'bg-white/5 text-gray-500'
              }`}>
                {badge.badgeIcon === 'Flame' ? <Flame className="w-6 h-6" /> :
                 badge.badgeIcon === 'Trophy' ? <Trophy className="w-6 h-6" /> :
                 badge.badgeIcon === 'Zap' ? <Zap className="w-6 h-6" /> :
                 badge.badgeIcon === 'Target' ? <Target className="w-6 h-6" /> :
                 badge.badgeIcon === 'Award' ? <Award className="w-6 h-6" /> :
                 <Dumbbell className="w-6 h-6" />}
              </div>

              <div>
                <span className="font-bold text-sm text-white flex items-center gap-1.5">
                  {badge.title}
                  {badge.unlocked ? <CheckCircle2 className="w-3.5 h-3.5 text-[#ccff00]" /> : <Lock className="w-3.5 h-3.5 text-gray-500" />}
                </span>
                <span className="text-[11px] text-gray-400 block mt-0.5 leading-snug">{badge.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg bg-[#0b0c10] border border-[#ccff00]/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-heading font-extrabold text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#ccff00]" /> Edit Athlete Profile
              </h3>
              <button
                onClick={() => setEditingProfile(false)}
                className="text-gray-400 hover:text-white p-1 rounded-xl bg-white/5 hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121318] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ccff00]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Age</label>
                  <input
                    type="number"
                    value={profileForm.age}
                    onChange={(e) => setProfileForm({ ...profileForm, age: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#121318] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ccff00]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={profileForm.height}
                    onChange={(e) => setProfileForm({ ...profileForm, height: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#121318] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ccff00]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Weight (kg)</label>
                  <input
                    type="number" step="0.1"
                    value={profileForm.weight}
                    onChange={(e) => setProfileForm({ ...profileForm, weight: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#121318] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ccff00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Fitness Goal</label>
                  <select
                    value={profileForm.fitnessGoal}
                    onChange={(e) => setProfileForm({ ...profileForm, fitnessGoal: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#121318] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ccff00]"
                  >
                    <option value="Build Muscle">Build Muscle</option>
                    <option value="Lose Weight">Lose Weight</option>
                    <option value="Gain Weight">Gain Weight</option>
                    <option value="Maintain Weight">Maintain Weight</option>
                    <option value="Improve Fitness">Improve Fitness</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Dietary Preference</label>
                  <select
                    value={profileForm.dietType}
                    onChange={(e) => setProfileForm({ ...profileForm, dietType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#121318] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ccff00]"
                  >
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Eggetarian">Eggetarian</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProfile(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#ccff00] text-black font-extrabold text-xs uppercase hover:bg-[#b8e600] transition-all cursor-pointer shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
