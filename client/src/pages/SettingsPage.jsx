import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fitnessAPI } from '../services/api';
import { Settings, Bell, Shield, Moon, Sun, Scale, Ruler, Save, Globe, Dumbbell, AlertTriangle, Check } from 'lucide-react';
import { LanguageSelector } from '../components/LanguageSelector';
import { useTranslation } from 'react-i18next';

export const SettingsPage = () => {
  const { user, updateUser, units, toggleUnitWeight, toggleUnitHeight, theme, toggleTheme } = useAuth();
  const { t } = useTranslation();

  const [savingLevel, setSavingLevel] = useState(false);
  const [levelSavedMsg, setLevelSavedMsg] = useState('');

  const [notifications, setNotifications] = useState({
    workoutReminder: true,
    mealReminder: true,
    waterReminder: true,
    weeklyReport: true
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLevelChange = async (newLevel) => {
    setSavingLevel(true);
    setLevelSavedMsg('');
    try {
      const res = await fitnessAPI.recalculate({ experienceLevel: newLevel });
      updateUser(res.user);
      setLevelSavedMsg(`Training level updated to ${newLevel}! Workout routine regenerated.`);
      setTimeout(() => setLevelSavedMsg(''), 4000);
    } catch (err) {
      console.error('Failed to update experience level:', err);
    } finally {
      setSavingLevel(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div>
        <h2 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#ccff00]" /> {t('nav.settings', 'Account Settings')}
        </h2>
        <p className="text-xs text-gray-400">Manage your system preferences, language, units, experience level, notifications, and security</p>
      </div>

      {/* 1. Fitness Preferences & Experience Level Override */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-[#ccff00]" /> Fitness Preferences & Training Level
            </h3>
            <p className="text-xs text-gray-400">
              Current Duration: <strong className="text-white">{user?.trainingDuration || 'Less than 3 months'}</strong> • Level: <strong className="text-[#ccff00]">{user?.experienceLevel || 'Beginner'}</strong>
            </p>
          </div>
          {levelSavedMsg && (
            <span className="text-xs text-[#ccff00] font-bold bg-[#ccff00]/10 px-3 py-1 rounded-full border border-[#ccff00]/30 animate-pulse">
              ✓ {levelSavedMsg}
            </span>
          )}
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2.5 text-xs text-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Choose the level that best matches your actual training experience.</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => {
            const isSelected = (user?.experienceLevel || 'Beginner') === lvl;
            return (
              <button
                key={lvl}
                disabled={savingLevel}
                onClick={() => handleLevelChange(lvl)}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#ccff00]/15 border-[#ccff00] text-white shadow-[0_0_15px_rgba(204,255,0,0.2)]'
                    : 'bg-[#121318] border-white/5 text-gray-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-extrabold text-sm text-white">{lvl}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#ccff00]" />}
                </div>
                <span className="text-[10px] text-gray-400 mt-2 block">
                  {lvl === 'Beginner' ? 'Form & foundational strength' : lvl === 'Intermediate' ? 'Progressive overload & volume' : 'High volume & advanced splits'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Global Language Selector Section */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#ccff00]" /> Global Language & Region
            </h3>
            <p className="text-xs text-gray-400">Select your preferred language. Supports English, Hindi, Hinglish, Spanish, Arabic (RTL), Chinese & more.</p>
          </div>
          <LanguageSelector variant="default" />
        </div>
      </div>

      {/* 3. Units & Theme Settings */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-5">
        <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
          <Scale className="w-4 h-4 text-[#ccff00]" /> Units & Theme System
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#121318] border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-white block">Weight Unit</span>
              <span className="text-[10px] text-gray-400">Kilograms or Pounds</span>
            </div>
            <button
              onClick={toggleUnitWeight}
              className="px-3 py-1.5 rounded-xl bg-[#ccff00] text-black font-bold text-xs cursor-pointer shadow-[0_0_10px_rgba(204,255,0,0.3)]"
            >
              {units.weight.toUpperCase()}
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#121318] border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-white block">Height Unit</span>
              <span className="text-[10px] text-gray-400">Centimeters or Feet</span>
            </div>
            <button
              onClick={toggleUnitHeight}
              className="px-3 py-1.5 rounded-xl bg-[#ccff00] text-black font-bold text-xs cursor-pointer shadow-[0_0_10px_rgba(204,255,0,0.3)]"
            >
              {units.height.toUpperCase()}
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#121318] border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-white block">Appearance Theme</span>
              <span className="text-[10px] text-gray-400">Dark / Light Mode</span>
            </div>
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-[#ccff00]" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
              <span className="capitalize">{theme}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Notification Preferences */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-5">
        <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#ccff00]" /> Notification Reminders
        </h3>

        <div className="space-y-3">
          {[
            { key: 'workoutReminder', title: 'Workout Reminder', desc: 'Notify when scheduled workout time arrives' },
            { key: 'mealReminder', title: 'Meal & Macro Reminder', desc: 'Notify to log breakfast, lunch, snack, and dinner' },
            { key: 'waterReminder', title: 'Water Hydration Alert', desc: 'Periodic reminders to stay on track with water goal' },
            { key: 'weeklyReport', title: 'Weekly Progress Report', desc: 'Receive smart performance analysis every Sunday' }
          ].map((item) => (
            <div key={item.key} className="p-4 rounded-2xl bg-[#121318] border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">{item.title}</span>
                <span className="text-[10px] text-gray-400">{item.desc}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={() => toggleNotification(item.key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ccff00]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
