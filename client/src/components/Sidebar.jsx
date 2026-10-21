import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Target,
  Dumbbell,
  Utensils,
  Pill,
  MapPin,
  TrendingUp,
  Bot,
  CalendarCheck,
  User,
  Settings,
  Info,
  LogOut,
  Flame,
  Zap,
  Activity,
  PlayCircle
} from 'lucide-react';

import { FitForgeLogo } from './FitForgeLogo';

export const Sidebar = () => {
  const { user, activeTab, setActiveTab, logout } = useAuth();
  const { t } = useTranslation();

  const navItems = [
    { id: 'dashboard', label: t('nav.dashboard', 'Dashboard'), icon: LayoutDashboard },
    { id: 'my-plan', label: t('nav.myPlan', 'My Plan'), icon: Target },
    { id: 'workout', label: t('nav.workout', 'Workout'), icon: Dumbbell },
    { id: 'exercise-guide', label: t('nav.exerciseGuide', 'Exercise Guide'), icon: PlayCircle, badge: 'DEMO' },
    { id: 'muscle-map', label: t('nav.muscleMap', 'Muscle Map'), icon: Activity, badge: 'NEW' },
    { id: 'nutrition', label: t('nav.nutrition', 'Nutrition'), icon: Utensils },
    { id: 'supplements', label: t('nav.supplements', 'Supplements'), icon: Pill, badge: 'SMART' },
    { id: 'nearby-gyms', label: t('nav.nearbyGyms', 'Nearby Gyms'), icon: MapPin, badge: 'MAP' },
    { id: 'progress', label: t('nav.progress', 'Progress'), icon: TrendingUp },
    { id: 'ai-coach', label: t('nav.aiCoach', 'Smart Coach'), icon: Bot, badge: 'SMART' },
    { id: 'checkin', label: t('nav.dailyCheckIn', 'Daily Check-In'), icon: CalendarCheck },
    { id: 'about', label: t('nav.aboutApp', 'About the App'), icon: Info, badge: 'INFO' },
    { id: 'profile', label: t('nav.profile', 'Profile'), icon: User },
    { id: 'settings', label: t('nav.settings', 'Settings'), icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 xl:w-80 bg-[#0E131B] border-r border-[#2A3442] h-screen sticky top-0 p-5 select-none shadow-xl">
      {/* Brand Logo Header */}
      <div className="p-4 sm:p-[20px_24px] mb-6 rounded-2xl bg-[#161D27] border border-[#2A3442] shadow-md">
        <FitForgeLogo variant="full" size="md" onClick={() => setActiveTab('dashboard')} />
      </div>

      {/* Streak Badge Widget */}
      <div className="mb-6 p-3.5 rounded-2xl bg-[#161D27] border border-orange-500/30 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-orange-500/20 text-[#FF9F43]">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-xs text-[#B8C2CF] block font-medium">Active Streak</span>
            <span className="text-sm font-bold text-[#F5F7FA]">{user?.streakCount || 12} Days 🔥</span>
          </div>
        </div>
        <Zap className="w-4 h-4 text-[#FF9F43]" />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer group ${
                isActive
                  ? 'text-[#0B0F14]'
                  : 'text-[#B8C2CF] hover:text-[#F5F7FA] hover:bg-[#161D27]'
              }`}
            >
              {/* Sliding Neon Highlight Background */}
              {isActive && (
                <motion.div
                  layoutId="activeSidebarHighlight"
                  className="absolute inset-0 bg-[#C6FF00] rounded-xl shadow-[0_0_15px_rgba(198,255,0,0.25)] z-0"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}

              <div className="relative z-10 flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-[#0B0F14]' : 'text-[#7E8A99] group-hover:text-[#C6FF00]'}`} />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span className={`relative z-10 text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  isActive ? 'bg-[#0B0F14] text-[#C6FF00]' : 'bg-[#C6FF00]/15 text-[#C6FF00] border border-[#C6FF00]/30'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Profile Footer */}
      <div className="pt-4 border-t border-[#2A3442] mt-auto">
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#161D27] border border-[#2A3442]">
          <div
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2.5 min-w-0 cursor-pointer"
          >
            <img
              src={user?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={user?.name}
              className="w-9 h-9 rounded-lg object-cover border border-[#2A3442]"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#F5F7FA] truncate">{user?.name || 'Alex'}</p>
              <p className="text-[10px] text-[#C6FF00] font-semibold truncate">{user?.fitnessGoal || 'Build Muscle'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            title={t('nav.logout', 'Logout')}
            className="p-1.5 rounded-lg text-[#7E8A99] hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
