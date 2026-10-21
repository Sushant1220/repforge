import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Dumbbell, Target, Utensils, Activity, Bot, ShoppingBag, MapPin, LayoutDashboard,
  Sparkles, Code, CheckCircle2, ShieldCheck, HeartPulse, Layers, ExternalLink,
  ChevronRight, Award, Compass, Globe
} from 'lucide-react';
import founderPhoto from '../assets/founder-profile.jpg';
import repforgeOfficialLogo from '../assets/repforge-official-logo.jpg';
import heroBannerImg from '../assets/repforge_hero_banner.png';
import { FitForgeLogo } from '../components/FitForgeLogo';
import { GridPatternOverlay, CornerTechAccents, GlowingOrbs } from '../components/DecorativeGraphics';
import { FitnessGallery } from '../components/FitnessGallery';

export const AboutPage = ({ onNavigate }) => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [modalType, setModalType] = React.useState(null);

  const purposes = [
    t('about.purposes.0', 'Understand their fitness goals'),
    t('about.purposes.1', 'Get personalized workout plans'),
    t('about.purposes.2', 'Get personalized diet suggestions'),
    t('about.purposes.3', 'Track weight and progress'),
    t('about.purposes.4', 'Monitor calories, protein and water'),
    t('about.purposes.5', 'Find supplements according to their goal and budget'),
    t('about.purposes.6', 'Discover nearby gyms'),
    t('about.purposes.7', 'Use a smart fitness assistant'),
    t('about.purposes.8', 'Build better fitness habits')
  ];

  const features = [
    {
      icon: Target,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      title: t('about.features.fitnessPlanTitle', 'Personalized Fitness Plan'),
      desc: t('about.features.fitnessPlanDesc', 'Enter height, weight, and fitness goals to instantly receive a customized workout and diet strategy tailored for you.')
    },
    {
      icon: Dumbbell,
      color: 'text-[#ccff00]',
      bgColor: 'bg-[#ccff00]/10',
      borderColor: 'border-[#ccff00]/20',
      title: t('about.features.workoutTitle', 'Workout Planner'),
      desc: t('about.features.workoutDesc', 'View daily workouts, targeted exercises, sets, reps, and dynamic rest time counters.')
    },
    {
      icon: Utensils,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      title: t('about.features.dietTitle', 'Diet Planner'),
      desc: t('about.features.dietDesc', 'Track daily meals with macro breakdowns for calories, protein, carbohydrates, and fats.')
    },
    {
      icon: Activity,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
      title: t('about.features.progressTitle', 'Progress Tracking'),
      desc: t('about.features.progressDesc', 'Track body weight, completed workouts, water intake, daily calories, protein, and steps.')
    },
    {
      icon: Bot,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      title: t('about.features.aiCoachTitle', 'Smart Fitness Coach'),
      desc: t('about.features.aiCoachDesc', 'Ask simple fitness questions and receive instant guidance from your smart fitness assistant 24/7.')
    },
    {
      icon: ShoppingBag,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/20',
      title: t('about.features.supplementTitle', 'Supplement Finder'),
      desc: t('about.features.supplementDesc', 'Choose fitness goal, budget, and diet preference (Veg/Non-Veg/Vegan) for transparent recommendations.')
    },
    {
      icon: MapPin,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      title: t('about.features.gymFinderTitle', 'Nearby Gym Finder'),
      desc: t('about.features.gymFinderDesc', 'Allow location access to discover gyms with distance, ratings, address, and Google Maps directions.')
    },
    {
      icon: LayoutDashboard,
      color: 'text-[#ccff00]',
      bgColor: 'bg-[#ccff00]/10',
      borderColor: 'border-[#ccff00]/20',
      title: t('about.features.dashboardTitle', 'Fitness Dashboard'),
      desc: t('about.features.dashboardDesc', 'Get a complete daily overview of active streaks, workouts, nutrition stats, and hydration in one place.')
    }
  ];

  return (
    <div className="space-y-12 pb-16 relative">
      <GlowingOrbs color="neon" />

      {/* 1. Hero Section */}
      <section className="relative glass-card rounded-3xl p-8 sm:p-12 border border-white/10 overflow-hidden text-center sm:text-left shadow-2xl">
        <GridPatternOverlay className="opacity-10" />
        <CornerTechAccents />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-black tracking-wide shadow-[0_0_15px_rgba(204,255,0,0.2)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>REPFORGE ECOSYSTEM</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-heading font-black text-white tracking-tight leading-none">
                RepForge
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-gray-300">
                "{t('about.heroSubtitle', 'Your personalized fitness companion.')}"
              </p>
            </div>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
              {t('about.heroDesc', 'RepForge is a personalized fitness platform designed to help users plan workouts, manage nutrition, track progress, discover suitable supplements, and find nearby gyms from one simple platform.')}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigate && onNavigate('dashboard')}
                className="px-6 py-3 rounded-2xl bg-[#ccff00] text-black font-heading font-extrabold text-xs tracking-wider uppercase hover:bg-[#b8e600] transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.3)]"
              >
                <span>Explore App Dashboard</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate && onNavigate('supplements')}
                className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-gray-200 font-heading font-extrabold text-xs tracking-wider uppercase transition-all cursor-pointer"
              >
                Find Supplements
              </button>
            </div>
          </div>

          {/* App Hero Graphic Visual Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md p-5 rounded-3xl bg-gradient-to-br from-[#121318] via-black to-[#0d0e13] border border-[#ccff00]/30 shadow-[0_0_30px_rgba(204,255,0,0.15)] space-y-4 group">
              <CornerTechAccents />
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <FitForgeLogo variant="full" size="md" />
                <span className="text-[10px] text-[#ccff00] font-bold bg-[#ccff00]/10 px-2.5 py-0.5 rounded-full border border-[#ccff00]/20">
                  OFFICIAL ECOSYSTEM
                </span>
              </div>

              {/* Official RepForge Hero Banner Visual */}
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black p-1 relative">
                <img
                  src={heroBannerImg}
                  alt="RepForge Powerlifting & Fitness Telemetry Visual"
                  loading="eager"
                  className="w-full h-44 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[10px] text-gray-400 font-medium">Active Streak</span>
                  <p className="text-lg font-black text-[#ccff00]">15 Days 🔥</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[10px] text-gray-400 font-medium">Nearby Gyms</span>
                  <p className="text-lg font-black text-cyan-400">450 m 📍</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why RepForge */}
      <section className="glass-card rounded-3xl p-8 sm:p-10 border border-white/10 space-y-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider">THE PURPOSE</span>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
            {t('about.whyTitle', 'Why RepForge?')}
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed max-w-3xl">
            {t('about.whyDesc', 'Fitness information is often scattered across different apps and websites. RepForge was created to bring essential fitness tools into one place and make fitness planning simple for everyone.')}
          </p>
        </div>

        <div className="pt-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
            {t('about.purposeHeadline', 'Built to help you achieve your goals effortlessly:')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {purposes.map((purpose, index) => (
              <div
                key={index}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 hover:border-[#ccff00]/40 transition-all group cursor-default"
              >
                <div className="w-7 h-7 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] flex items-center justify-center shrink-0 group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">
                  {purpose}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. What You Can Do With RepForge */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">CORE CAPABILITIES</span>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
            {t('about.whatYouCanDo', 'What You Can Do With RepForge')}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Comprehensive fitness features built for maximum ease of use and zero technical barrier.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
                className={`glass-card glass-card-hover rounded-3xl p-6 border ${feat.borderColor} space-y-4 flex flex-col justify-between relative overflow-hidden group`}
              >
                <CornerTechAccents />
                <div className="space-y-3 relative z-10">
                  <div className={`w-12 h-12 rounded-2xl ${feat.bgColor} border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <IconComponent className={`w-6 h-6 ${feat.color}`} />
                  </div>
                  <h3 className="text-base font-heading font-extrabold text-white group-hover:text-[#ccff00] transition-colors">{feat.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* 4. Meet the Founder Section */}
      <section className="glass-card rounded-3xl p-8 sm:p-12 border border-[#ccff00]/20 bg-gradient-to-br from-[#121318] via-black to-[#0b0c10] relative overflow-hidden space-y-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center sm:text-left space-y-1">
          <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider">FOUNDER PROFILE</span>
          <h2 className="text-3xl font-heading font-black text-white">
            {t('about.founderTitle', 'Meet the Founder')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Founder Photo with glow animation & hover effect */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#ccff00] via-cyan-400 to-amber-400 opacity-60 blur-md group-hover:opacity-100 transition duration-500 group-hover:scale-105" />
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-black bg-gray-900 shadow-2xl">
                <img
                  src={founderPhoto}
                  alt={t('about.founderName', 'Sushant Kumar Singh')}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback placeholder image if assets missing
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Founder Details */}
          <div className="md:col-span-8 space-y-4 text-center sm:text-left">
            <div>
              <h3 className="text-2xl font-heading font-black text-white">
                {t('about.founderName', 'Sushant Kumar Singh')}
              </h3>
              <p className="text-xs font-bold text-[#ccff00] uppercase tracking-wider">
                {t('about.founderRole', 'Founder & Developer')}
              </p>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              "{t('about.founderDesc', 'RepForge was created as a modern fitness technology project with the goal of making workout planning, nutrition guidance, supplement discovery, progress tracking and gym discovery easier from one platform.')}"
            </p>

            <p className="text-xs text-gray-400 italic">
              "{t('about.founderSubDesc', 'Built with a focus on simple user experience, modern technology and practical fitness tools.')}"
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-gray-300">
                🚀 Full-Stack MERN Architect
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-gray-300">
                ⚡ UI/UX Enthusiast
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Requirement 11: Fitness Gallery / Motivation Section */}
      <FitnessGallery />

      {/* 6. Mission */}
      <section className="glass-card rounded-3xl p-8 border border-white/10 text-center space-y-3 bg-gradient-to-r from-[#ccff00]/5 via-transparent to-cyan-500/5">
        <HeartPulse className="w-10 h-10 text-[#ccff00] mx-auto" />
        <h2 className="text-2xl font-heading font-black text-white">
          {t('about.missionTitle', 'Our Mission')}
        </h2>
        <p className="text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
          "{t('about.missionText', 'To make fitness planning simpler, more accessible and easier to understand by bringing useful fitness tools together in one modern platform.')}"
        </p>
      </section>

      {/* 7. Footer */}
      <footer className="pt-8 border-t border-white/10 text-center space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-lg font-heading font-black text-white">RepForge</span>
            <p className="text-xs text-gray-400">
              {t('common.slogan', 'Smarter fitness. Simpler journey.')}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-semibold">
            <button onClick={() => onNavigate && onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">About</button>
            <button onClick={() => onNavigate && onNavigate('dashboard')} className="hover:text-white transition-colors cursor-pointer">Features</button>
            <button onClick={() => setModalType('privacy')} className="hover:text-white transition-colors cursor-pointer">Privacy</button>
            <button onClick={() => setModalType('terms')} className="hover:text-white transition-colors cursor-pointer">Terms</button>
            <button onClick={() => setModalType('contact')} className="hover:text-white transition-colors cursor-pointer">Contact</button>
          </div>
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <p className="font-bold text-gray-400">
            {t('common.designedBy', 'Designed & Developed by Sushant Kumar Singh')}
          </p>
          <p>© {currentYear} RepForge. {t('common.allRightsReserved', 'All rights reserved.')}</p>
        </div>
      </footer>

      {/* Info Modals (Privacy, Terms, Contact) */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg bg-[#0b0c10] border border-[#ccff00]/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-xl bg-white/5 hover:bg-white/10"
            >
              ✕
            </button>

            {modalType === 'privacy' && (
              <div className="space-y-4">
                <h3 className="text-xl font-heading font-extrabold text-white flex items-center gap-2">
                  🔒 Privacy Policy
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  RepForge values your privacy. Your personal fitness data, daily check-in metrics, meal logs, and weight history are stored securely and never shared with third parties.
                </p>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-400 space-y-2">
                  <p>• Data Encryption: All account credentials and JWT tokens use industry-standard encryption.</p>
                  <p>• Local Storage Control: Session preferences are stored locally on your device for fast access.</p>
                </div>
              </div>
            )}

            {modalType === 'terms' && (
              <div className="space-y-4">
                <h3 className="text-xl font-heading font-extrabold text-white flex items-center gap-2">
                  📜 Terms of Service
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Welcome to RepForge! By accessing our fitness platform, you agree to use our recommendations, workout routines, and supplement guides responsibly.
                </p>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-400 space-y-2">
                  <p>• Medical Disclaimer: Fitness & nutrition recommendations are for informational purposes. Always consult a healthcare professional before starting extreme splits.</p>
                  <p>• Account Security: Users are responsible for maintaining the confidentiality of their credentials.</p>
                </div>
              </div>
            )}

            {modalType === 'contact' && (
              <div className="space-y-4">
                <h3 className="text-xl font-heading font-extrabold text-white flex items-center gap-2">
                  ✉️ Contact Support
                </h3>
                <p className="text-xs text-gray-300">
                  Have questions, feature requests, or need technical assistance? Reach out directly to the RepForge developer team.
                </p>
                <div className="p-4 rounded-2xl bg-[#121318] border border-[#ccff00]/30 space-y-2 text-xs">
                  <p className="text-white font-bold">Founder & Architect: <span className="text-[#ccff00]">Sushant Kumar Singh</span></p>
                  <p className="text-gray-400">Email: <a href="mailto:support@repforge.ai" className="text-[#ccff00] hover:underline">support@repforge.ai</a></p>
                  <p className="text-gray-400">Platform: Full-Stack MERN Powerlifting & Fitness SaaS</p>
                </div>
              </div>
            )}

            <button
              onClick={() => setModalType(null)}
              className="w-full py-3 rounded-xl bg-[#ccff00] text-black font-extrabold text-xs uppercase hover:bg-[#b8e600] transition-all cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
