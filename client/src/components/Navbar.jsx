import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { notificationAPI } from '../services/api';
import { Bell, User, LogOut, Settings, Sparkles, CheckCircle2, ShieldAlert, Droplet, Flame, Info } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useTranslation } from 'react-i18next';

export const Navbar = () => {
  const { user, logout, setActiveTab } = useAuth();
  const { t } = useTranslation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const data = await notificationAPI.getNotifications();
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.isRead).length);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await notificationAPI.markRead(id);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Mark read error:', err);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0B0F14]/95 backdrop-blur-md border-b border-[#2A3442] px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-md">
      {/* Left: Greeting / Brand */}
      <div>
        <h1 className="text-lg lg:text-xl font-heading font-bold text-[#F5F7FA] flex items-center gap-2">
          {t('common.welcome', 'Welcome back')}, <span className="text-[#C6FF00]">{user?.name || 'Athlete'}</span> 💪🏻
        </h1>
        <p className="text-xs text-[#B8C2CF] hidden sm:block">{t('common.overviewSubtitle', "Here's your fitness overview for today.")}</p>
      </div>

      {/* Right: Language Selector, Actions & User Avatar */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Global Multi-Language Selector */}
        <LanguageSelector variant="compact" />

        {/* Quick Coach Button */}}
        <button
          onClick={() => setActiveTab('ai-coach')}
          className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#C6FF00]/15 text-[#C6FF00] border border-[#C6FF00]/40 hover:bg-[#C6FF00]/25 transition-all cursor-pointer shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C6FF00]" />
          <span>Ask Coach</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 rounded-xl bg-[#161D27] border border-[#2A3442] text-[#B8C2CF] hover:text-[#F5F7FA] hover:border-[#C6FF00]/50 transition-all cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C6FF00] text-[#0B0F14] font-extrabold text-[10px] rounded-full flex items-center justify-center animate-pulse shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#161D27] rounded-2xl p-4 shadow-2xl z-50 border border-[#2A3442] animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-[#2A3442]">
                <h3 className="font-heading font-semibold text-sm text-[#F5F7FA] flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#C6FF00]" /> Notifications
                </h3>
                <span className="text-xs text-[#C6FF00] font-bold">{unreadCount} unread</span>
              </div>
              <div className="mt-3 space-y-2 max-h-72 overflow-y-auto pr-1">
                {notifications.length === 0 ? (
                  <p className="text-xs text-[#7E8A99] text-center py-4">No notifications yet.</p>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n._id}
                      onClick={() => handleMarkRead(n._id)}
                      className={`p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                        n.isRead
                          ? 'bg-[#121821] border-[#2A3442] text-[#B8C2CF]'
                          : 'bg-[#1B2430] border-[#C6FF00]/40 text-[#F5F7FA]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-semibold text-[#F5F7FA]">{n.title}</span>
                        {!n.isRead && <span className="w-2 h-2 rounded-full bg-[#C6FF00]"></span>}
                      </div>
                      <p className="mt-1 text-[#B8C2CF] leading-relaxed">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-[#161D27] transition-all cursor-pointer"
          >
            <img
              src={user?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={user?.name}
              className="w-9 h-9 rounded-xl object-cover border border-[#2A3442] hover:border-[#C6FF00]/50"
            />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-[#161D27] rounded-2xl p-2 shadow-2xl z-50 border border-[#2A3442]">
              <div className="px-3 py-2 border-b border-[#2A3442] mb-1">
                <p className="text-xs font-bold text-[#F5F7FA]">{user?.name}</p>
                <p className="text-[11px] text-[#B8C2CF] truncate">{user?.email}</p>
              </div>
              <button
                onClick={() => { setActiveTab('profile'); setShowProfileMenu(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#B8C2CF] hover:text-[#F5F7FA] hover:bg-[#1B2430] transition-all text-left cursor-pointer"
              >
                <User className="w-4 h-4 text-[#C6FF00]" /> {t('nav.profile', 'My Profile')}
              </button>
              <button
                onClick={() => { setActiveTab('settings'); setShowProfileMenu(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#B8C2CF] hover:text-[#F5F7FA] hover:bg-[#1B2430] transition-all text-left cursor-pointer"
              >
                <Settings className="w-4 h-4 text-[#28D7FF]" /> {t('nav.settings', 'Settings')}
              </button>
              <button
                onClick={() => { setActiveTab('about'); setShowProfileMenu(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#B8C2CF] hover:text-[#F5F7FA] hover:bg-[#1B2430] transition-all text-left cursor-pointer"
              >
                <Info className="w-4 h-4 text-[#C6FF00]" /> {t('nav.aboutApp', 'About the App')}
              </button>
              <div className="my-1 border-t border-[#2A3442]"></div>
              <button
                onClick={logout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-all text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> {t('nav.logout', 'Logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
