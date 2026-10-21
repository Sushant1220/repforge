import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, X,
  CheckCircle2, Sparkles, User, KeyRound, Dumbbell,
  Salad, MapPin, BarChart3
} from 'lucide-react';
import { FitForgeLogo } from '../components/FitForgeLogo';
import gymBg from '../assets/gym_dumbbell_bg.png';

export const LoginPage = ({ onNavigateSignUp, onNavigateOnboarding, initialMode = 'login' }) => {
  const { login, register, googleLogin } = useAuth();

  const [authMode, setAuthMode] = useState(initialMode);

  // Form Fields
  const [name, setName]                     = useState('');
  const [email, setEmail]                   = useState('alex@repforge.ai');
  const [password, setPassword]             = useState('Password123!');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword]     = useState(false);
  const [rememberMe, setRememberMe]         = useState(true);

  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot Password
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail]           = useState('');
  const [resetSent, setResetSent]             = useState(false);

  // Password validation
  const hasMinLength = password.length >= 8;
  const hasUpper     = /[A-Z]/.test(password);
  const hasLower     = /[a-z]/.test(password);
  const hasNumber    = /[0-9]/.test(password);
  const hasSpecial   = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isPasswordValid = hasMinLength && hasUpper && hasLower && hasNumber && hasSpecial;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (authMode === 'login') {
        const userData = await login(email, password);
        if (!userData.onboardingCompleted) onNavigateOnboarding();
      } else {
        if (password !== confirmPassword) { setError('Passwords do not match.'); setLoading(false); return; }
        if (!isPasswordValid) { setError('Please satisfy all password complexity rules.'); setLoading(false); return; }
        await register({ name, email, password, confirmPassword });
        onNavigateOnboarding();
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('alex@repforge.ai');
    setPassword('Password123!');
    setError('');
    setLoading(true);
    try { await login('alex@repforge.ai', 'Password123!'); }
    catch (err) { setError(err.message || 'Demo login failed'); }
    finally { setLoading(false); }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try { await googleLogin(); }
    catch (err) { setError('Google Sign-In failed. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    setResetSent(true);
  };

  const features = [
    { icon: Dumbbell, label: 'Workout Plans' },
    { icon: Salad,    label: 'Nutrition Guidance' },
    { icon: MapPin,   label: 'Muscle Map' },
    { icon: BarChart3,label: 'Progress Analytics' },
  ];

  return (
    <div className="min-h-screen flex overflow-hidden bg-[#0B0F14]">

      {/* ─── LEFT PANEL: Background Image + Content ─── */}
      <div className="relative hidden lg:flex flex-col flex-1 overflow-hidden">
        {/* Background image */}
        <img
          src={gymBg}
          alt="RepForge Gym"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F14]/85 via-[#0B0F14]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/70 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-10 xl:p-14">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <FitForgeLogo variant="full" size="md" />
            <div className="hidden xl:block">
              <p className="text-[10px] text-[#B8C2CF] font-bold uppercase tracking-widest mt-0.5">
                Powerlifting &amp; Fitness SaaS
              </p>
            </div>
          </div>

          {/* Headline block — pushed down */}
          <div className="mt-auto mb-auto flex flex-col gap-5 max-w-lg">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full bg-[#C6FF00]/15 border border-[#C6FF00]/50 text-[#C6FF00] text-[11px] font-black tracking-widest uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-[#C6FF00] animate-pulse" />
              Sign In &amp; Keep Going
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl xl:text-6xl font-black leading-[1.05] tracking-tight text-white"
            >
              Good Workouts<br />Build{' '}
              <span className="text-[#C6FF00]" style={{ textShadow: '0 0 30px rgba(198,255,0,0.5)' }}>
                Better<br />Days
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-sm text-[#B8C2CF] leading-relaxed max-w-sm"
            >
              Your all-in-one fitness platform for real progress.
            </motion.p>

            {/* Feature Chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              {features.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-[#C6FF00]/30 transition-all cursor-default group"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#C6FF00]/10 border border-[#C6FF00]/20 flex items-center justify-center group-hover:bg-[#C6FF00]/20 transition-all">
                    <Icon className="w-4 h-4 text-[#C6FF00]" />
                  </div>
                  <span className="text-[10px] font-bold text-[#B8C2CF] text-center leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── RIGHT PANEL: Auth Card ─── */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-[460px] xl:w-[500px] bg-[#0E131B] flex flex-col justify-center px-8 sm:px-12 py-10 overflow-y-auto"
      >
        {/* Mobile logo */}
        <div className="lg:hidden mb-8 flex justify-center">
          <FitForgeLogo variant="full" size="md" />
        </div>

        {/* Card icon + heading */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#C6FF00]/30 shadow-[0_0_25px_rgba(198,255,0,0.2)]">
            <img
              src="/repforge-icon.png"
              alt="RepForge"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.classList.add('bg-[#C6FF00]/10', 'flex', 'items-center', 'justify-center');
                e.target.parentElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#C6FF00" stroke-width="2.5"><path d="M6.5 6.5h11M6.5 17.5h11M3 12h18"/></svg>';
              }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={authMode}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="text-center"
            >
              <h2 className="text-2xl font-black text-white">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-xs text-[#B8C2CF] mt-1">
                {authMode === 'login'
                  ? 'Sign in to continue to RepForge'
                  : 'Join thousands forging their best physique'}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold text-center"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <AnimatePresence mode="wait">
          <motion.form
            key={authMode}
            initial={{ opacity: 0, x: authMode === 'login' ? -12 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Name (signup only) */}
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-[#B8C2CF] mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#4A5568] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Rivers"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#161D27] border border-[#2A3442] text-sm text-white placeholder-[#4A5568] focus:outline-none focus:border-[#C6FF00] focus:ring-1 focus:ring-[#C6FF00]/30 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[#B8C2CF] mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#4A5568] absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@repforge.ai"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#161D27] border border-[#2A3442] text-sm text-white placeholder-[#4A5568] focus:outline-none focus:border-[#C6FF00] focus:ring-1 focus:ring-[#C6FF00]/30 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-[#B8C2CF] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#4A5568] absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#161D27] border border-[#2A3442] text-sm text-white placeholder-[#4A5568] focus:outline-none focus:border-[#C6FF00] focus:ring-1 focus:ring-[#C6FF00]/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-2.5 text-[#4A5568] hover:text-[#B8C2CF] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Password rules (signup) */}
            {authMode === 'signup' && (
              <div className="p-3 rounded-xl bg-[#161D27] border border-[#2A3442] grid grid-cols-2 gap-1.5">
                {[
                  { ok: hasMinLength, label: '8+ characters' },
                  { ok: hasUpper,     label: 'Uppercase letter' },
                  { ok: hasLower,     label: 'Lowercase letter' },
                  { ok: hasNumber,    label: 'One number' },
                  { ok: hasSpecial,   label: 'Special character', full: true },
                ].map(({ ok, label, full }) => (
                  <span key={label} className={`flex items-center gap-1 text-[10px] font-semibold ${full ? 'col-span-2' : ''} ${ok ? 'text-[#C6FF00]' : 'text-[#4A5568]'}`}>
                    {ok ? <CheckCircle2 className="w-3 h-3" /> : '•'} {label}
                  </span>
                ))}
              </div>
            )}

            {/* Confirm Password (signup) */}
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-[#B8C2CF] mb-1.5">Confirm Password</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#4A5568] absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#161D27] border border-[#2A3442] text-sm text-white placeholder-[#4A5568] focus:outline-none focus:border-[#C6FF00] focus:ring-1 focus:ring-[#C6FF00]/30 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Remember Me + Forgot Password (login) */}
            {authMode === 'login' && (
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#B8C2CF] hover:text-white font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-[#161D27] border-[#2A3442] accent-[#C6FF00]"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => { setShowForgotModal(true); setResetSent(false); setResetEmail(email); }}
                  className="text-xs text-[#C6FF00] hover:underline font-bold cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || (authMode === 'signup' && !isPasswordValid)}
              className="w-full py-3.5 rounded-xl bg-[#C6FF00] hover:bg-[#b8e600] text-black text-sm font-black tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all shadow-[0_0_25px_rgba(198,255,0,0.3)] hover:shadow-[0_0_35px_rgba(198,255,0,0.45)] mt-1"
            >
              <span>{loading ? 'Processing...' : authMode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.form>
        </AnimatePresence>

        {/* Demo Login */}
        {authMode === 'login' && (
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full mt-3 py-2.5 rounded-xl bg-[#161D27] border border-[#2A3442] text-xs font-bold text-white hover:border-[#C6FF00]/40 hover:bg-[#1B2430] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#C6FF00]" />
            ⚡ Quick Demo Login (Alex Rivers)
          </button>
        )}

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#2A3442]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#0E131B] px-3 text-[10px] text-[#4A5568] font-bold uppercase tracking-widest">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="py-2.5 px-3 rounded-xl bg-[#161D27] border border-[#2A3442] text-xs font-bold text-white hover:bg-[#1B2430] hover:border-[#2A3442]/80 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
              <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.2-.7-.4-1.5-.4-2.3z"/>
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Apple ID authentication ready!')}
            className="py-2.5 px-3 rounded-xl bg-[#161D27] border border-[#2A3442] text-xs font-bold text-white hover:bg-[#1B2430] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-1 .04-2.2.67-2.91 1.5-.63.73-1.18 1.88-1.03 3 1.12.09 2.29-.66 2.95-1.46z"/>
            </svg>
            <span>Apple ID</span>
          </button>
        </div>

        {/* Switch Mode */}
        <p className="text-center text-xs text-[#B8C2CF] mt-6">
          {authMode === 'login' ? (
            <>New to RepForge?{' '}
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setError(''); }}
                className="text-[#C6FF00] font-bold hover:underline cursor-pointer"
              >
                Create an account
              </button>
            </>
          ) : (
            <>Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setError(''); }}
                className="text-[#C6FF00] font-bold hover:underline cursor-pointer"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </motion.div>

      {/* ─── FORGOT PASSWORD MODAL ─── */}
      <AnimatePresence>
        {showForgotModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-md bg-[#161D27] border border-[#2A3442] rounded-3xl p-6 space-y-5 shadow-2xl relative"
            >
              <button
                onClick={() => setShowForgotModal(false)}
                className="absolute top-4 right-4 text-[#4A5568] hover:text-white p-1.5 rounded-lg hover:bg-[#1B2430] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <h3 className="text-xl font-black text-white">Reset Your Password</h3>
                <p className="text-xs text-[#B8C2CF] mt-1">Enter your registered email to receive reset instructions.</p>
              </div>

              {resetSent ? (
                <div className="p-4 rounded-2xl bg-[#C6FF00]/10 border border-[#C6FF00]/30 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#C6FF00] mx-auto" />
                  <p className="text-sm font-bold text-white">Reset Link Sent!</p>
                  <p className="text-xs text-[#B8C2CF]">
                    We've sent recovery instructions to <strong className="text-[#C6FF00]">{resetEmail}</strong>.
                  </p>
                  <button
                    onClick={() => setShowForgotModal(false)}
                    className="mt-3 w-full py-2.5 rounded-xl bg-[#C6FF00] text-black text-xs font-black uppercase cursor-pointer hover:bg-[#b8e600]"
                  >
                    Return to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleResetSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[#B8C2CF] block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="alex@repforge.ai"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121821] border border-[#2A3442] text-sm text-white placeholder-[#4A5568] focus:outline-none focus:border-[#C6FF00]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#C6FF00] text-black text-xs font-black uppercase cursor-pointer hover:bg-[#b8e600]"
                  >
                    Send Recovery Email
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
