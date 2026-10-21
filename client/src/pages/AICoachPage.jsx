import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { aiAPI } from '../services/api';
import { Bot, Send, Sparkles, User, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';

export const AICoachPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${user?.name || 'Athlete'}! I am your **RepForge Coach**. I'm analyzed your profile (**${user?.weight || 80.8}kg**, goal: **${user?.fitnessGoal || 'Build Muscle'}**, diet: **${user?.dietType || 'Non-Vegetarian'}**).\n\nHow can I help optimize your workouts or nutrition today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('chat'); // 'chat' | 'weekly-report'
  const [weeklyReport, setWeeklyReport] = useState(null);

  const messagesEndRef = useRef(null);

  const suggestionChips = [
    "What should I eat before my workout?",
    "Modify today's workout to 30 minutes.",
    "Suggest a high-protein vegetarian dinner.",
    "I missed yesterday's workout. What should I do?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (activeSubTab === 'weekly-report' && !weeklyReport) {
      fetchWeeklyReport();
    }
  }, [activeSubTab]);

  const fetchWeeklyReport = async () => {
    try {
      const data = await aiAPI.getWeeklyReport();
      setWeeklyReport(data);
    } catch (err) {
      console.error('Fetch weekly report error:', err);
    }
  };

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await aiAPI.askCoach(query);
      setMessages(prev => [...prev, { sender: 'ai', text: res.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Apologies, I encountered an issue generating a response. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Subtabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
            <Bot className="w-6 h-6 text-[#ccff00]" /> RepForge Coach
          </h2>
          <p className="text-xs text-gray-400">Ask anything about your personalized training, diet, or recovery</p>
        </div>

        <div className="flex items-center gap-2 p-1 rounded-xl bg-[#121318] border border-white/10">
          <button
            onClick={() => setActiveSubTab('chat')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'chat' ? 'bg-[#ccff00] text-black shadow-[0_0_10px_rgba(204,255,0,0.25)]' : 'text-gray-400 hover:text-white'
            }`}
          >
            Chat Assistant
          </button>
          <button
            onClick={() => setActiveSubTab('weekly-report')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'weekly-report' ? 'bg-[#ccff00] text-black shadow-[0_0_10px_rgba(204,255,0,0.25)]' : 'text-gray-400 hover:text-white'
            }`}
          >
            Weekly Smart Report
          </button>
        </div>
      </div>

      {activeSubTab === 'chat' ? (
        <div className="glass-card rounded-3xl border border-white/10 h-[650px] flex flex-col overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex items-start gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed space-y-2 ${
                  m.sender === 'user'
                    ? 'bg-[#ccff00] text-black font-semibold rounded-tr-none'
                    : 'bg-[#121318] text-gray-200 border border-white/10 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>

                {m.sender === 'user' && (
                  <img
                    src={user?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt="User"
                    className="w-8 h-8 rounded-xl object-cover shrink-0"
                  />
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] flex items-center justify-center">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-4 rounded-2xl bg-[#121318] border border-white/10 text-xs text-gray-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping" />
                  <span>RepForge is analyzing your parameters...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-3 bg-[#121318]/50 border-t border-white/5 flex gap-2 overflow-x-auto scrollbar-none">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-300 hover:text-white hover:border-[#ccff00] transition-all whitespace-nowrap cursor-pointer"
              >
                💡 {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-[#0b0c10] border-t border-white/10 flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask RepForge anything about your plan..."
              className="flex-1 px-4 py-3 rounded-2xl bg-[#121318] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ccff00]"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="p-3.5 rounded-2xl bg-[#ccff00] text-black hover:bg-[#b8e600] transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Weekly Smart Report Subtab */
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs text-[#ccff00] font-bold uppercase tracking-wider block">Smart Summary</span>
              <h3 className="text-xl font-heading font-extrabold text-white">{weeklyReport?.weekRange || 'Week 8 Performance'}</h3>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              High Performance
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-[#121318] border border-white/5 space-y-1">
              <span className="text-[10px] text-gray-400 uppercase font-semibold">Workouts Done</span>
              <span className="text-xl font-extrabold text-white font-heading">{weeklyReport?.workoutsCompleted} / {weeklyReport?.workoutsTotal}</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#121318] border border-white/5 space-y-1">
              <span className="text-[10px] text-gray-400 uppercase font-semibold">Diet Adherence</span>
              <span className="text-xl font-extrabold text-[#ccff00] font-heading">{weeklyReport?.dietConsistency}%</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#121318] border border-white/5 space-y-1">
              <span className="text-[10px] text-gray-400 uppercase font-semibold">Avg Daily Steps</span>
              <span className="text-xl font-extrabold text-cyan-400 font-heading">{weeklyReport?.avgSteps?.toLocaleString()}</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#121318] border border-white/5 space-y-1">
              <span className="text-[10px] text-gray-400 uppercase font-semibold">Weight Delta</span>
              <span className="text-xl font-extrabold text-emerald-400 font-heading">{weeklyReport?.weightChange} kg</span>
            </div>
          </div>

          {/* Smart Synthesis Advice Box */}
          <div className="p-5 rounded-2xl bg-[#121318] border border-[#ccff00]/30 space-y-2">
            <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Smart Recommendation
            </span>
            <p className="text-xs text-gray-200 leading-relaxed font-medium">
              "{weeklyReport?.aiRecommendation}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
