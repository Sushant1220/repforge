import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  MapPin,
  TrendingUp,
  User,
  Bot,
  Info,
  Activity,
  PlayCircle
} from 'lucide-react';

export const MobileNav = () => {
  const { activeTab, setActiveTab } = useAuth();
  const { t } = useTranslation();

  const mobileItems = [
    { id: 'dashboard', label: t('nav.dashboard', 'Home'), icon: LayoutDashboard },
    { id: 'workout', label: t('nav.workout', 'Workout'), icon: Dumbbell },
    { id: 'exercise-guide', label: t('nav.exerciseGuide', 'Guide'), icon: PlayCircle },
    { id: 'muscle-map', label: t('nav.muscleMap', 'Muscle Map'), icon: Activity },
    { id: 'nearby-gyms', label: t('nav.nearbyGyms', 'Gyms'), icon: MapPin },
    { id: 'profile', label: t('nav.profile', 'Profile'), icon: User },
  ];

  return (
    <>
      {/* Floating Coach Button on Mobile */}
      <button
        onClick={() => setActiveTab('ai-coach')}
        className="lg:hidden fixed bottom-20 right-4 z-40 p-3.5 rounded-full bg-[#ccff00] text-black shadow-[0_0_20px_rgba(204,255,0,0.5)] border border-[#ccff00] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label="Smart Coach"
      >
        <Bot className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* Fixed Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0b0c10]/95 backdrop-blur-lg border-t border-white/10 px-1 py-2 flex items-center justify-around">
        {mobileItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl transition-all ${
                isActive ? 'text-[#ccff00]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
