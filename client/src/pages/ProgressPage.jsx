import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { progressAPI } from '../services/api';
import { LogWeightModal } from '../components/LogWeightModal';
import { LogMeasurementModal } from '../components/LogMeasurementModal';
import { AnimatedCounter } from '../components/AnimatedCounter';
import {
  TrendingUp, Scale, Ruler, Calendar, Plus, Activity, Zap, Flame, Award
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

export const ProgressPage = () => {
  const { user } = useAuth();
  const [timeFilter, setTimeFilter] = useState('30 Days'); // 7 Days, 30 Days, 3 Months, 6 Months, 1 Year
  const [weightLogs, setWeightLogs] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal controls
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showMeasurementModal, setShowMeasurementModal] = useState(false);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      const [wLogs, mLogs] = await Promise.all([
        progressAPI.getWeightLogs(),
        progressAPI.getMeasurements()
      ]);
      setWeightLogs(wLogs);
      setMeasurements(mLogs);
    } catch (err) {
      console.error('Fetch progress error:', err);
    } finally {
      setLoading(false);
    }
  };

  const startWeight = 83.0;
  const currentWeight = user?.weight || 80.8;
  const targetWeight = user?.targetWeight || 75.0;
  const lostWeight = +(startWeight - currentWeight).toFixed(1);

  // Latest measurements
  const latestM = measurements[measurements.length - 1] || {
    chest: 104, waist: 84, arms: 38.5, shoulders: 122, thighs: 58, hips: 96, bodyFat: 16.5
  };

  const weightChartData = weightLogs.length > 0 ? weightLogs.map((wl, i) => ({
    date: wl.date ? wl.date.slice(5) : `W${i+1}`,
    weight: wl.weight
  })) : [
    { date: '08-03', weight: 83.0 },
    { date: '08-10', weight: 82.6 },
    { date: '08-17', weight: 82.2 },
    { date: '08-24', weight: 81.8 },
    { date: '08-31', weight: 81.5 },
    { date: '09-07', weight: 81.2 },
    { date: '09-14', weight: 80.9 },
    { date: '09-21', weight: 80.8 }
  ];

  const consistencyData = [
    { day: 'Mon', completed: 100 },
    { day: 'Tue', completed: 100 },
    { day: 'Wed', completed: 100 },
    { day: 'Thu', completed: 50 },
    { day: 'Fri', completed: 100 },
    { day: 'Sat', completed: 100 },
    { day: 'Sun', completed: 100 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-6 pb-12"
    >
      {/* Header & Time Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#ccff00]" /> Progress Analytics
          </h2>
          <p className="text-xs text-gray-400">Track weight trends, body measurements, and workout consistency</p>
        </div>

        {/* Time Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#121318] border border-white/10 overflow-x-auto scrollbar-none relative">
          {['7 Days', '30 Days', '3 Months', '6 Months', '1 Year'].map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap z-10 ${
                timeFilter === filter
                  ? 'text-black font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {timeFilter === filter && (
                <motion.div
                  layoutId="activeFilterPill"
                  className="absolute inset-0 bg-[#ccff00] rounded-lg shadow-[0_0_10px_rgba(204,255,0,0.25)] z-[-1]"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Weight Tracking Hero Summary */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-bold text-white">Weight Transformation Log</h3>
              <p className="text-xs text-gray-400">Target Goal: <strong className="text-white">{targetWeight} kg</strong></p>
            </div>
          </div>

          <button
            onClick={() => setShowWeightModal(true)}
            className="px-5 py-2.5 rounded-xl bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(204,255,0,0.3)]"
          >
            <Plus className="w-4 h-4" />
            <span>Log Weight</span>
          </button>
        </div>

        {/* 4 Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-[#121318] border border-white/5 space-y-1">
            <span className="text-[10px] text-gray-400 uppercase font-semibold">Starting Weight</span>
            <span className="text-xl font-extrabold text-white font-heading">{startWeight} kg</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#121318] border border-white/5 space-y-1">
            <span className="text-[10px] text-gray-400 uppercase font-semibold">Current Weight</span>
            <span className="text-xl font-extrabold text-[#ccff00] font-heading">{currentWeight} kg</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#121318] border border-white/5 space-y-1">
            <span className="text-[10px] text-gray-400 uppercase font-semibold">Target Weight</span>
            <span className="text-xl font-extrabold text-cyan-400 font-heading">{targetWeight} kg</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#121318] border border-white/5 space-y-1">
            <span className="text-[10px] text-gray-400 uppercase font-semibold">Total Lost</span>
            <span className="text-xl font-extrabold text-emerald-400 font-heading">-{lostWeight} kg</span>
          </div>
        </div>

        {/* Weight Progress Chart */}
        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#242733" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={11} />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#6b7280" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#121318', borderColor: '#ccff00', borderRadius: '12px', color: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#ccff00"
                strokeWidth={3.5}
                dot={{ fill: '#ccff00', r: 5 }}
                activeDot={{ r: 8, fill: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Body Measurement Tracker */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400">
              <Ruler className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-bold text-white">Body Circumferences & Fat %</h3>
              <p className="text-xs text-gray-400">Track muscle growth & fat loss across body parts</p>
            </div>
          </div>

          <button
            onClick={() => setShowMeasurementModal(true)}
            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#ccff00]" />
            <span>Log Measurements</span>
          </button>
        </div>

        {/* Measurement Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#121318] border border-white/5 text-center space-y-1">
            <span className="text-[10px] text-gray-400 block font-semibold">Chest</span>
            <span className="text-base font-extrabold text-white">{latestM.chest || 104} cm</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#121318] border border-white/5 text-center space-y-1">
            <span className="text-[10px] text-gray-400 block font-semibold">Waist</span>
            <span className="text-base font-extrabold text-[#ccff00]">{latestM.waist || 84} cm</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#121318] border border-white/5 text-center space-y-1">
            <span className="text-[10px] text-gray-400 block font-semibold">Arms</span>
            <span className="text-base font-extrabold text-white">{latestM.arms || 38.5} cm</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#121318] border border-white/5 text-center space-y-1">
            <span className="text-[10px] text-gray-400 block font-semibold">Shoulders</span>
            <span className="text-base font-extrabold text-white">{latestM.shoulders || 122} cm</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#121318] border border-white/5 text-center space-y-1">
            <span className="text-[10px] text-gray-400 block font-semibold">Thighs</span>
            <span className="text-base font-extrabold text-white">{latestM.thighs || 58} cm</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#121318] border border-white/5 text-center space-y-1">
            <span className="text-[10px] text-gray-400 block font-semibold">Hips</span>
            <span className="text-base font-extrabold text-white">{latestM.hips || 96} cm</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#121318] border border-white/5 text-center space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-gray-400 block font-semibold">Body Fat %</span>
            <span className="text-base font-extrabold text-cyan-400">{latestM.bodyFat || 16.5}%</span>
          </div>
        </div>
      </div>

      {/* 3. Workout Consistency Chart */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
        <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#ccff00]" /> Weekly Training Consistency
        </h3>
        <div className="h-48 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={consistencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#242733" />
              <XAxis dataKey="day" stroke="#6b7280" fontSize={11} />
              <YAxis domain={[0, 100]} stroke="#6b7280" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#121318', borderColor: '#ccff00', borderRadius: '12px', color: '#fff' }} />
              <Bar dataKey="completed" fill="#ccff00" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Modals */}
      <LogWeightModal
        isOpen={showWeightModal}
        onClose={() => setShowWeightModal(false)}
        onWeightLogged={fetchProgressData}
      />

      <LogMeasurementModal
        isOpen={showMeasurementModal}
        onClose={() => setShowMeasurementModal(false)}
        onLogSuccess={fetchProgressData}
      />
    </motion.div>
  );
};
