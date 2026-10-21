import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './i18n';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';

import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { OnboardingWizard } from './pages/OnboardingWizard';
import { DashboardPage } from './pages/DashboardPage';
import { MyPlanPage } from './pages/MyPlanPage';
import { WorkoutPage } from './pages/WorkoutPage';
import { NutritionPage } from './pages/NutritionPage';
import { SupplementsPage } from './pages/SupplementsPage';
import { NearbyGymsPage } from './pages/NearbyGymsPage';
import { ProgressPage } from './pages/ProgressPage';
import { AICoachPage } from './pages/AICoachPage';
import { DailyCheckInPage } from './pages/DailyCheckInPage';
import { MuscleMapPage } from './pages/MuscleMapPage';
import { ExerciseGuidePage } from './pages/ExerciseGuidePage';
import { FitForgeLogo } from './components/FitForgeLogo';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { IntroSplash } from './components/IntroSplash';

function AppContent() {
  const { user, token, loading, activeTab, setActiveTab } = useAuth();
  const [authView, setAuthView] = useState('login');

  /**
   * Intro logic:
   * - showIntro = true  → play video → blink → then show login page
   * - showIntro = false → directly show whatever page is needed
   *
   * Triggered on:
   *  1. First load / refresh  → user not logged in → showIntro = true
   *  2. Sign out              → token removed     → showIntro = true again
   *
   * We track the *previous* token value to detect sign-out.
   */
  const [showIntro, setShowIntro] = useState(false);
  const prevTokenRef = React.useRef(token);

  useEffect(() => {
    // Still loading → wait
    if (loading) return;

    const wasLoggedIn = !!prevTokenRef.current;
    const isLoggedIn  = !!token;

    if (!isLoggedIn) {
      // Not logged in: show intro
      // (fresh page load OR just signed out OR refresh while logged out)
      setShowIntro(true);
    }

    prevTokenRef.current = token;
  }, [token, loading]);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  // While auth state is being loaded, show nothing (or a tiny loader)
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C6FF00]/30 border-t-[#C6FF00] rounded-full animate-spin" />
      </div>
    );
  }

  // === NOT LOGGED IN ===
  if (!token || !user) {
    return (
      <>
        {/* Intro always plays first when not logged in */}
        {showIntro && <IntroSplash onComplete={handleIntroComplete} />}

        {/* Login/Signup page renders underneath (visible after intro) */}
        {!showIntro && (
          <>
            {authView === 'signup' && (
              <SignUpPage
                onNavigateLogin={() => setAuthView('login')}
                onNavigateOnboarding={() => setAuthView('onboarding')}
              />
            )}
            {authView === 'onboarding' && (
              <OnboardingWizard onOnboardingComplete={() => setAuthView('login')} />
            )}
            {authView === 'login' && (
              <LoginPage
                onNavigateSignUp={() => setAuthView('signup')}
                onNavigateOnboarding={() => setAuthView('onboarding')}
              />
            )}
          </>
        )}
      </>
    );
  }

  // === ONBOARDING ===
  if (!user.onboardingCompleted) {
    return <OnboardingWizard onOnboardingComplete={() => setActiveTab('dashboard')} />;
  }

  // === MAIN DASHBOARD ===
  return (
    <div className="flex min-h-screen bg-[#0B0F14] text-[#F5F7FA]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full"
            >
              {activeTab === 'dashboard'     && <DashboardPage />}
              {activeTab === 'my-plan'       && <MyPlanPage />}
              {activeTab === 'workout'       && <WorkoutPage />}
              {(activeTab === 'exercise-guide' || activeTab === 'guide') && <ExerciseGuidePage />}
              {activeTab === 'muscle-map'    && <MuscleMapPage />}
              {activeTab === 'nutrition'     && <NutritionPage />}
              {activeTab === 'supplements'   && <SupplementsPage />}
              {activeTab === 'nearby-gyms'   && <NearbyGymsPage />}
              {activeTab === 'progress'      && <ProgressPage />}
              {activeTab === 'ai-coach'      && <AICoachPage />}
              {activeTab === 'checkin'       && <DailyCheckInPage />}
              {activeTab === 'about'         && <AboutPage onNavigate={setActiveTab} />}
              {activeTab === 'profile'       && <ProfilePage />}
              {activeTab === 'settings'      && <SettingsPage />}
              {!['dashboard','my-plan','workout','exercise-guide','guide','muscle-map',
                  'nutrition','supplements','nearby-gyms','progress','ai-coach',
                  'checkin','about','profile','settings'].includes(activeTab) && (
                <NotFoundPage onBackHome={() => setActiveTab('dashboard')} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
