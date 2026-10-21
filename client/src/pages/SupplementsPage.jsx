import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supplementAPI } from '../services/api';
import {
  Pill, Sparkles, CheckCircle2, DollarSign, RefreshCw, Eye, Plus, Check,
  Scale, Star, X, ShoppingBag, ArrowRight, ShieldCheck, Info
} from 'lucide-react';

export const SupplementsPage = () => {
  const { user } = useAuth();

  // Input Form State
  const [goal, setGoal] = useState(user?.fitnessGoal || 'Muscle Gain');
  const [selectedBudgetPreset, setSelectedBudgetPreset] = useState(5000);
  const [customBudget, setCustomBudget] = useState('');
  const [diet, setDiet] = useState(user?.dietType || 'No Preference');

  // Results State
  const [recommendationResult, setRecommendationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Modals & Drawers
  const [detailProduct, setDetailProduct] = useState(null);
  const [comparisonList, setComparisonList] = useState([]);
  const [showComparisonDrawer, setShowComparisonDrawer] = useState(false);

  // My Supplement Plan State
  const [savedPlan, setSavedPlan] = useState([]);
  const [showPlanDrawer, setShowPlanDrawer] = useState(false);

  // Replacement State
  const [replacingCategory, setReplacingCategory] = useState(null);

  const budgetOptions = [
    { label: 'Under ₹1,000', value: 1000 },
    { label: 'Under ₹2,000', value: 2000 },
    { label: 'Under ₹3,000', value: 3000 },
    { label: 'Under ₹5,000', value: 5000 },
    { label: 'Under ₹10,000', value: 10000 },
  ];

  const goals = ['Weight Loss', 'Weight Gain', 'Muscle Gain', 'Strength', 'General Fitness'];
  const diets = ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'No Preference'];

  const getEffectiveBudget = () => {
    if (customBudget && !isNaN(customBudget) && Number(customBudget) > 0) {
      return Number(customBudget);
    }
    return selectedBudgetPreset;
  };

  const handleFindSupplements = async () => {
    setLoading(true);
    const budgetVal = getEffectiveBudget();
    try {
      const res = await supplementAPI.recommend({
        goal,
        budget: budgetVal,
        diet
      });
      setRecommendationResult(res);
      // Auto-populate saved plan with initial stack
      setSavedPlan(res.stack);
    } catch (err) {
      console.error('Supplement recommendation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFindSupplements();
  }, []);

  const handleAddToPlan = (product) => {
    if (!savedPlan.some(p => p.id === product.id)) {
      setSavedPlan(prev => [...prev, product]);
    }
  };

  const handleRemoveFromPlan = (productId) => {
    setSavedPlan(prev => prev.filter(p => p.id !== productId));
  };

  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleToggleCompare = (product) => {
    if (comparisonList.some(p => p.id === product.id)) {
      setComparisonList(prev => prev.filter(p => p.id !== product.id));
    } else {
      if (comparisonList.length >= 3) {
        showToast('You can compare a maximum of 3 products at a time.');
        return;
      }
      setComparisonList(prev => [...prev, product]);
      setShowComparisonDrawer(true);
    }
  };

  const handleReplaceProductInStack = (oldProduct, newProduct) => {
    if (!recommendationResult) return;
    const updatedStack = recommendationResult.stack.map(p => p.id === oldProduct.id ? { ...newProduct, badge: oldProduct.badge } : p);
    const newTotal = updatedStack.reduce((sum, p) => sum + p.price, 0);
    const newRemaining = Math.max(0, recommendationResult.budgetLimit - newTotal);

    setRecommendationResult(prev => ({
      ...prev,
      stack: updatedStack,
      totalCost: newTotal,
      budgetRemaining: newRemaining
    }));
    setSavedPlan(updatedStack);
    setReplacingCategory(null);
  };

  const planTotalCost = savedPlan.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white flex items-center gap-2">
            <Pill className="w-7 h-7 text-[#ccff00]" /> Supplement Recommendation Engine
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">Get an expert-curated supplement stack tailored to your goal and exact budget</p>
        </div>

        {/* My Supplement Plan Button */}
        <button
          onClick={() => setShowPlanDrawer(true)}
          className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/15 text-xs font-bold text-white hover:border-[#ccff00] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <ShoppingBag className="w-4 h-4 text-[#ccff00]" />
          <span>My Supplement Plan ({savedPlan.length})</span>
          <span className="px-2 py-0.5 rounded-full bg-[#ccff00] text-black font-extrabold text-[10px]">₹{planTotalCost.toLocaleString()}</span>
        </button>
      </div>

      {/* 1. Simple Input Form Container */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
        <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#ccff00]" /> 3-Step Simple Recommendation Quiz
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Step 1: Fitness Goal */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#ccff00] uppercase tracking-wider block">1. Fitness Goal</label>
            <div className="space-y-2">
              {goals.map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGoal(g)}
                  className={`w-full p-3 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer flex items-center justify-between ${
                    goal === g
                      ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                      : 'bg-[#121318] text-gray-300 border-white/5 hover:border-white/20'
                  }`}
                >
                  <span>{g}</span>
                  {goal === g && <Check className="w-4 h-4 stroke-[3]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Budget */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#ccff00] uppercase tracking-wider block">2. Select Budget (₹)</label>
            <div className="grid grid-cols-2 gap-2">
              {budgetOptions.map(b => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => { setSelectedBudgetPreset(b.value); setCustomBudget(''); }}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer text-center ${
                    selectedBudgetPreset === b.value && !customBudget
                      ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                      : 'bg-[#121318] text-gray-300 border-white/5 hover:border-white/20'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* Custom Budget Input */}
            <div className="pt-1">
              <label className="text-[11px] font-semibold text-gray-400 block mb-1">Or Enter Custom Budget (₹):</label>
              <input
                type="number"
                placeholder="e.g. 4500"
                value={customBudget}
                onChange={(e) => setCustomBudget(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#121318] border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-[#ccff00]"
              />
            </div>
          </div>

          {/* Step 3: Diet Preference & Submit */}
          <div className="space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#ccff00] uppercase tracking-wider block">3. Diet Preference</label>
              <div className="grid grid-cols-2 gap-2">
                {diets.map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDiet(d)}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer text-center ${
                      diet === d
                        ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                        : 'bg-[#121318] text-gray-300 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleFindSupplements}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#b8e600] transition-all shadow-[0_0_25px_rgba(204,255,0,0.4)] flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <Sparkles className="w-5 h-5 fill-black" />
              <span>{loading ? 'Finding Supplements...' : 'Find Supplements'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Results Section */}
      {recommendationResult && (
        <div className="space-y-8 animate-in fade-in">
          {/* Best Combination Under Your Budget Hero Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#ccff00]/40 space-y-6 relative overflow-hidden shadow-[0_0_40px_rgba(204,255,0,0.15)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs text-[#ccff00] font-bold uppercase tracking-wider block">Best Combination Under Your Budget</span>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-white">Recommended Stack for {recommendationResult.goal}</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-extrabold">
                  Target Budget: ₹{recommendationResult.budgetLimit?.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Stack Items List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendationResult.stack.map((item, idx) => (
                <div key={item.id} className="p-4 rounded-2xl bg-[#121318] border border-white/10 space-y-2 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ccff00]/20 text-[#ccff00] font-bold">{item.badge}</span>
                      <h4 className="text-sm font-bold text-white mt-1.5">{item.category}</h4>
                      <p className="text-xs text-gray-300 font-medium truncate">{item.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-2 text-xs">
                    <span className="text-gray-400">{item.brand}</span>
                    <span className="font-extrabold text-[#ccff00] text-sm">₹{item.price.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Budget Totals & Clear Message */}
            <div className="p-4 rounded-2xl bg-[#121318] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-gray-400 block">Total Stack Cost:</span>
                  <span className="font-extrabold text-white text-lg font-heading">₹{recommendationResult.totalCost?.toLocaleString()}</span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <span className="text-gray-400 block">Budget Remaining:</span>
                  <span className="font-extrabold text-[#ccff00] text-lg font-heading">₹{recommendationResult.budgetRemaining?.toLocaleString()}</span>
                </div>
              </div>

              <div className="text-xs text-gray-300 font-medium italic">
                "{recommendationResult.message}"
              </div>

              <button
                onClick={() => setSavedPlan(recommendationResult.stack)}
                className="px-5 py-2.5 rounded-xl bg-[#ccff00] text-black font-extrabold text-xs uppercase hover:bg-[#b8e600] transition-all cursor-pointer shrink-0 shadow-[0_0_15px_rgba(204,255,0,0.3)]"
              >
                Save All to My Plan
              </button>
            </div>
          </div>

          {/* 3. Detailed Supplement Cards Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-extrabold text-white">Recommended Supplements</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendationResult.stack.map((product) => {
                const isSaved = savedPlan.some(p => p.id === product.id);
                const isCompared = comparisonList.some(p => p.id === product.id);

                return (
                  <div
                    key={product.id}
                    className="glass-card rounded-3xl p-5 border border-white/10 flex flex-col justify-between space-y-4 hover:border-[#ccff00]/40 transition-all group"
                  >
                    <div className="space-y-3">
                      {/* Image & Badge Header */}
                      <div className="relative h-44 rounded-2xl overflow-hidden bg-[#121318] border border-white/5">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#ccff00] border border-[#ccff00]/40 text-[10px] font-bold">
                          {product.badge}
                        </span>
                        <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-amber-300 border border-amber-400/40 text-[10px] font-bold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-300" /> {product.rating} / 5
                        </span>
                      </div>

                      {/* Brand & Name */}
                      <div>
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">{product.brand} • {product.category}</span>
                        <h4 className="text-base font-bold text-white mt-0.5 line-clamp-1">{product.name}</h4>
                      </div>

                      {/* Price & Size details */}
                      <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#121318]">
                        <span className="font-extrabold text-lg text-[#ccff00] font-heading">₹{product.price.toLocaleString()}</span>
                        <span className="text-gray-300">{product.size} ({product.servings} Servings)</span>
                      </div>

                      {/* Main Benefit */}
                      <p className="text-xs text-gray-300 leading-relaxed font-medium line-clamp-2">
                        {product.mainBenefit}
                      </p>
                    </div>

                    {/* Product Card Action Buttons */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setDetailProduct(product)}
                          className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all flex items-center justify-center gap-1 cursor-pointer border border-white/10"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </button>
                        <button
                          onClick={() => handleToggleCompare(product)}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer border ${
                            isCompared
                              ? 'bg-cyan-400/20 border-cyan-400 text-cyan-300'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
                          }`}
                        >
                          <Scale className="w-3.5 h-3.5" />
                          <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                        </button>
                      </div>

                      <button
                        onClick={() => isSaved ? handleRemoveFromPlan(product.id) : handleAddToPlan(product)}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSaved
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-[#ccff00] text-black hover:bg-[#b8e600] shadow-[0_0_12px_rgba(204,255,0,0.25)]'
                        }`}
                      >
                        {isSaved ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4" />}
                        <span>{isSaved ? 'In My Supplement Plan' : 'Add to My Plan'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. More Options & Product Replacement Section */}
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-heading font-bold text-white">More Options & Alternatives</h3>
                <p className="text-xs text-gray-400">Want to swap a product? Choose from other matching options within your budget.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {recommendationResult.stack.map(p => (
                <button
                  key={p.id}
                  onClick={() => setReplacingCategory(p)}
                  className="px-4 py-2 rounded-xl bg-[#121318] border border-white/10 hover:border-[#ccff00] text-xs font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Replace {p.category}</span>
                </button>
              ))}
            </div>

            {/* Alternatives Drawer if Replacing */}
            {replacingCategory && (
              <div className="p-4 rounded-2xl bg-[#121318] border border-[#ccff00]/30 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider">
                    Select Alternative for {replacingCategory.category}
                  </span>
                  <button onClick={() => setReplacingCategory(null)} className="text-xs text-gray-400 hover:text-white">Close</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {recommendationResult.allMatchingProducts
                    .filter(alt => alt.id !== replacingCategory.id)
                    .slice(0, 3)
                    .map(alt => (
                      <div key={alt.id} className="p-3 rounded-xl bg-[#1a1c24] border border-white/5 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-white block">{alt.name}</span>
                          <span className="text-[10px] text-gray-400">{alt.brand} • ₹{alt.price}</span>
                        </div>
                        <button
                          onClick={() => handleReplaceProductInStack(replacingCategory, alt)}
                          className="px-3 py-1.5 rounded-lg bg-[#ccff00] text-black font-bold text-[11px] hover:bg-[#b8e600] transition-all cursor-pointer"
                        >
                          Select
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. Product Details Modal */}
      {detailProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 border border-white/15 space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setDetailProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <img
                src={detailProduct.image}
                alt={detailProduct.name}
                className="w-24 h-24 rounded-2xl object-cover border border-white/10 shrink-0"
              />
              <div>
                <span className="text-[10px] font-bold text-[#ccff00] uppercase tracking-wider block">{detailProduct.brand}</span>
                <h3 className="text-lg font-heading font-extrabold text-white leading-snug">{detailProduct.name}</h3>
                <span className="text-xl font-extrabold text-[#ccff00] font-heading mt-1 block">₹{detailProduct.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs p-3 rounded-2xl bg-[#121318]">
              <div>
                <span className="text-[10px] text-gray-400 block uppercase">Size</span>
                <span className="font-bold text-white">{detailProduct.size}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block uppercase">Servings</span>
                <span className="font-bold text-white">{detailProduct.servings} Servings</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block uppercase">Cost/Serving</span>
                <span className="font-bold text-[#ccff00]">₹{detailProduct.costPerServing}/serv</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-white block mb-0.5">Main Benefit</span>
                <p className="text-gray-300 leading-relaxed">{detailProduct.mainBenefit}</p>
              </div>

              <div>
                <span className="font-bold text-white block mb-0.5">Basic Ingredients</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {detailProduct.ingredients?.map((ing, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 text-gray-300 font-medium text-[11px]">{ing}</span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-white block mb-0.5">Who It Is For</span>
                <p className="text-gray-300 leading-relaxed">{detailProduct.whoFor}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-start gap-2 text-[11px]">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                <div>
                  <span className="font-bold text-white block">Simple Safety Note</span>
                  {detailProduct.safetyNote}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                handleAddToPlan(detailProduct);
                setDetailProduct(null);
              }}
              className="w-full py-3.5 rounded-2xl bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-all cursor-pointer shadow-[0_0_15px_rgba(204,255,0,0.3)]"
            >
              Add to My Supplement Plan
            </button>
          </div>
        </div>
      )}

      {/* 6. Product Comparison Side-by-Side Drawer */}
      {showComparisonDrawer && comparisonList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0b0c10]/95 backdrop-blur-xl border-t border-[#ccff00]/40 p-4 sm:p-6 animate-in slide-in-from-bottom">
          <div className="max-w-5xl mx-auto space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-cyan-400" /> Side-by-Side Product Comparison ({comparisonList.length}/3)
              </h3>
              <button
                onClick={() => setShowComparisonDrawer(false)}
                className="text-xs text-gray-400 hover:text-white"
              >
                Close Comparison
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {comparisonList.map(p => (
                <div key={p.id} className="p-4 rounded-2xl bg-[#121318] border border-white/10 space-y-2.5 text-xs relative">
                  <button
                    onClick={() => handleToggleCompare(p)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-rose-400"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <h4 className="font-bold text-white pr-6 line-clamp-1">{p.name}</h4>
                  <span className="font-extrabold text-base text-[#ccff00] block">₹{p.price.toLocaleString()}</span>

                  <div className="space-y-1 text-gray-300 border-t border-white/5 pt-2">
                    <div className="flex justify-between"><span>Size:</span><strong className="text-white">{p.size}</strong></div>
                    <div className="flex justify-between"><span>Servings:</span><strong className="text-white">{p.servings}</strong></div>
                    <div className="flex justify-between"><span>Protein/Serv:</span><strong className="text-[#ccff00]">{p.proteinPerServing}g</strong></div>
                    <div className="flex justify-between"><span>Cost/Serv:</span><strong className="text-cyan-400">₹{p.costPerServing}</strong></div>
                    <div className="flex justify-between"><span>Rating:</span><strong className="text-amber-300">★ {p.rating}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. My Supplement Plan Drawer */}
      {showPlanDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#0b0c10] border-l border-white/10 h-full p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-heading font-extrabold text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#ccff00]" /> My Supplement Plan
                </h3>
                <button onClick={() => setShowPlanDrawer(false)} className="p-2 rounded-full text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {savedPlan.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-12">Your supplement plan is currently empty.</p>
              ) : (
                <div className="space-y-3">
                  {savedPlan.map(p => (
                    <div key={p.id} className="p-3.5 rounded-2xl bg-[#121318] border border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-bold block">{p.brand}</span>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{p.name}</h4>
                        <span className="text-xs font-extrabold text-[#ccff00]">₹{p.price.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveFromPlan(p.id)}
                        className="p-2 text-gray-500 hover:text-rose-400 transition-all cursor-pointer"
                        title="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total Cost & Save */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-gray-300">Total Stack Cost:</span>
                <span className="text-xl font-extrabold text-[#ccff00] font-heading">₹{planTotalCost.toLocaleString()}</span>
              </div>
              <button
                onClick={() => {
                  showToast('Supplement plan saved successfully to your profile!');
                  setShowPlanDrawer(false);
                }}
                className="w-full py-3.5 rounded-2xl bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-all cursor-pointer shadow-[0_0_20px_rgba(204,255,0,0.3)]"
              >
                Save My Supplement Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-[#0b0c10] border border-[#ccff00] text-white text-xs font-bold shadow-[0_0_25px_rgba(204,255,0,0.4)] flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5">
          <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
