import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import { 
  Telescope, 
  Sprout, 
  TrendingUp, 
  Sparkles, 
  Landmark, 
  DollarSign, 
  Calendar, 
  Percent, 
  Play, 
  RotateCcw,
  Zap,
  Rocket
} from 'lucide-react';
import { SavingsSimParams } from '../types';

export const SavingsSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'engine' | 'sprout' | 'race'>('engine');

  // Simulator Params
  const [params, setParams] = useState<SavingsSimParams>({
    goalTitle: "High-Powered Saturn Telescope",
    goalCost: 350,
    initialDeposit: 60,
    monthlyContribution: 25,
    hysaApy: 5.0,
    inflationRate: 3.5,
    years: 3
  });

  // Sprout Garden Interactive State
  const [sproutYears, setSproutYears] = useState<number>(3);
  const [sproutDeposit, setSproutDeposit] = useState<number>(100);
  const [sproutRate, setSproutRate] = useState<number>(10);

  // Generate monthly timeline data for the Saturn Engine
  const totalMonths = params.years * 12;
  const monthlyHysaRate = params.hysaApy / 100 / 12;
  const monthlyInflationRate = params.inflationRate / 100 / 12;

  let currentHysa = params.initialDeposit;
  let currentPiggy = params.initialDeposit;
  let currentCost = params.goalCost;

  const chartData = [];
  let monthReachedHysa: number | null = null;
  let monthReachedPiggy: number | null = null;

  for (let m = 0; m <= totalMonths; m++) {
    if (m > 0) {
      // HYSA earns interest on balance + new monthly deposit
      currentHysa = currentHysa * (1 + monthlyHysaRate) + params.monthlyContribution;
      // Piggy bank only gets monthly contribution (0% interest)
      currentPiggy += params.monthlyContribution;
      // Telescope price creeps up due to inflation
      currentCost = currentCost * (1 + monthlyInflationRate);
    }

    if (currentHysa >= currentCost && monthReachedHysa === null) {
      monthReachedHysa = m;
    }
    if (currentPiggy >= currentCost && monthReachedPiggy === null) {
      monthReachedPiggy = m;
    }

    chartData.push({
      month: `M${m}`,
      monthNum: m,
      hysaBalance: Math.round(currentHysa * 100) / 100,
      piggyBalance: Math.round(currentPiggy * 100) / 100,
      telescopeCost: Math.round(currentCost * 100) / 100,
    });
  }

  // Sprout Tree Data Calculation
  const calculateSproutTree = () => {
    let balance = sproutDeposit;
    const history = [];
    for (let y = 1; y <= sproutYears; y++) {
      const start = balance;
      const simpleInterest = sproutDeposit * (sproutRate / 100);
      const interestEarned = start * (sproutRate / 100);
      const compoundBonus = interestEarned - simpleInterest;
      balance += interestEarned;

      history.push({
        year: y,
        startBalance: Math.round(start * 100) / 100,
        interestEarned: Math.round(interestEarned * 100) / 100,
        compoundBonus: Math.max(0, Math.round(compoundBonus * 100) / 100),
        endBalance: Math.round(balance * 100) / 100
      });
    }
    return history;
  };

  const sproutHistory = calculateSproutTree();

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-4">
      {/* Tab Selector Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-white border-4 border-[#FDE68A] rounded-3xl p-5 shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] border-2 border-[#F59E0B] flex items-center justify-center text-[#D97706] shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#78350F] leading-tight">Interactive Storybook Simulators 🚀</h2>
            <p className="text-xs text-[#92400E] font-bold mt-0.5">Put Silas and Aunt Minty's lessons into real mathematical action</p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-[#FEF3C7] p-1.5 rounded-2xl border-2 border-[#F59E0B] flex-wrap">
          <button
            id="tab-sim-engine"
            onClick={() => setActiveTab('engine')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'engine'
                ? 'bg-[#F59E0B] text-white shadow-md'
                : 'text-[#78350F] hover:bg-[#FDE68A]'
            }`}
          >
            <Telescope className="w-4 h-4" />
            <span>Saturn Savings Engine</span>
          </button>

          <button
            id="tab-sim-sprout"
            onClick={() => setActiveTab('sprout')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'sprout'
                ? 'bg-[#10B981] text-white shadow-md'
                : 'text-[#78350F] hover:bg-[#FDE68A]'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>Compound Sprout Lab</span>
          </button>

          <button
            id="tab-sim-race"
            onClick={() => setActiveTab('race')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'race'
                ? 'bg-[#F43F5E] text-white shadow-md'
                : 'text-[#78350F] hover:bg-[#FDE68A]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Inflation Race Track</span>
          </button>
        </div>
      </div>

      {/* 1. SATURN SAVINGS ENGINE */}
      {activeTab === 'engine' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Form */}
          <div className="lg:col-span-4 bg-white border-4 border-[#FDE68A] rounded-3xl p-6 text-slate-800 shadow-xl space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b-2 border-[#FDE68A] text-[#78350F]">
              <Telescope className="w-5 h-5 text-[#D97706]" />
              <h3 className="font-black text-[#78350F] text-base">Silas's Savings Engine Controls</h3>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-[#78350F]">Telescope Target Cost ($):</span>
                  <span className="text-[#D97706] font-black">${params.goalCost}</span>
                </div>
                <input
                  id="slider-goal-cost"
                  type="range"
                  min="150"
                  max="800"
                  step="25"
                  value={params.goalCost}
                  onChange={(e) => setParams({ ...params, goalCost: Number(e.target.value) })}
                  className="w-full accent-[#F59E0B] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-[#78350F]">Initial Deposit (from Belly the Pig):</span>
                  <span className="text-[#E11D48] font-black">${params.initialDeposit}</span>
                </div>
                <input
                  id="slider-initial-deposit"
                  type="range"
                  min="10"
                  max="200"
                  step="10"
                  value={params.initialDeposit}
                  onChange={(e) => setParams({ ...params, initialDeposit: Number(e.target.value) })}
                  className="w-full accent-[#F43F5E] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-[#78350F]">Monthly Allowance / Chores Saved:</span>
                  <span className="text-[#0284C7] font-black">${params.monthlyContribution} / mo</span>
                </div>
                <input
                  id="slider-monthly-contrib"
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={params.monthlyContribution}
                  onChange={(e) => setParams({ ...params, monthlyContribution: Number(e.target.value) })}
                  className="w-full accent-[#0284C7] cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-[#FEF3C7] p-3 rounded-2xl border-2 border-[#F59E0B]">
                  <span className="block text-[#78350F] font-bold mb-1">Bank APY:</span>
                  <div className="flex items-center gap-1">
                    <input
                      id="input-hysa-apy"
                      type="number"
                      step="0.5"
                      min="0.5"
                      max="12"
                      value={params.hysaApy}
                      onChange={(e) => setParams({ ...params, hysaApy: Number(e.target.value) })}
                      className="w-16 px-2 py-1 rounded-xl bg-white text-[#166534] font-black border-2 border-[#22C55E]"
                    />
                    <span className="text-[#166534] font-black">%</span>
                  </div>
                </div>

                <div className="bg-[#FEF3C7] p-3 rounded-2xl border-2 border-[#F59E0B]">
                  <span className="block text-[#78350F] font-bold mb-1">Inflation Rate:</span>
                  <div className="flex items-center gap-1">
                    <input
                      id="input-inflation-rate"
                      type="number"
                      step="0.5"
                      min="0"
                      max="10"
                      value={params.inflationRate}
                      onChange={(e) => setParams({ ...params, inflationRate: Number(e.target.value) })}
                      className="w-16 px-2 py-1 rounded-xl bg-white text-[#991B1B] font-black border-2 border-[#EF4444]"
                    />
                    <span className="text-[#991B1B] font-black">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulation Insight Box */}
            <div className="p-4 rounded-2xl bg-[#FEF3C7] border-2 border-[#F59E0B] text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-[#78350F] font-black">
                <Zap className="w-4 h-4 text-[#D97706]" />
                <span>Mission to Saturn Countdown:</span>
              </div>
              <p className="text-slate-800 font-medium">
                {monthReachedHysa !== null ? (
                  <>
                    With the <strong>High-Yield Savings Engine</strong>, Silas reaches his telescope in{' '}
                    <span className="text-[#166534] font-black bg-[#DCFCE7] px-2 py-0.5 rounded-lg border border-[#22C55E]">{monthReachedHysa} months</span>!
                  </>
                ) : (
                  <>Silas needs a slightly longer timeline or higher monthly savings.</>
                )}
              </p>
              {monthReachedPiggy !== null && monthReachedHysa !== null && monthReachedPiggy > monthReachedHysa && (
                <p className="text-[#92400E] font-bold">
                  🚀 Silas beats the ceramic pig by <strong>{monthReachedPiggy - monthReachedHysa} months</strong> thanks to compound interest!
                </p>
              )}
            </div>
          </div>

          {/* Visualization Graph Card */}
          <div className="lg:col-span-8 bg-white border-4 border-[#FDE68A] rounded-3xl p-6 text-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-black text-lg text-[#78350F]">The Ladder to the Stars: Growth Comparison</h3>
                  <p className="text-xs text-[#92400E] font-bold">Comparing High-Yield Account vs Ceramic Pig vs Rising Inflation Price</p>
                </div>
              </div>

              {/* Recharts Line Visualizer */}
              <div className="w-full h-80 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" />
                    <XAxis dataKey="month" stroke="#92400E" fontSize={11} fontStyle="bold" />
                    <YAxis stroke="#92400E" fontSize={11} tickFormatter={(val) => `$${val}`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#FFFBEB', borderColor: '#F59E0B', borderRadius: '16px', borderWidth: '2px', fontWeight: 'bold' }}
                      labelStyle={{ color: '#78350F', fontWeight: 'bold' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                    <Line
                      type="monotone"
                      dataKey="hysaBalance"
                      name="High-Yield Account (Silas & Aunt Minty)"
                      stroke="#10b981"
                      strokeWidth={4}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="piggyBalance"
                      name="Ceramic Piggy Bank (Idle Cash)"
                      stroke="#f43f5e"
                      strokeWidth={3}
                      strokeDasharray="4 4"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="telescopeCost"
                      name="Telescope Price (with Inflation)"
                      stroke="#d97706"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t-2 border-[#FDE68A] text-center">
              <div className="p-3.5 bg-[#DCFCE7] border-2 border-[#22C55E] rounded-2xl shadow-sm">
                <span className="text-[10px] uppercase font-black text-[#166534] block">HYSA 3-Yr Total</span>
                <span className="text-xl font-black text-[#15803D]">
                  ${chartData[chartData.length - 1]?.hysaBalance}
                </span>
              </div>
              <div className="p-3.5 bg-[#FFE4E6] border-2 border-[#FDA4AF] rounded-2xl shadow-sm">
                <span className="text-[10px] uppercase font-black text-[#9F1239] block">Piggy Bank Total</span>
                <span className="text-xl font-black text-[#BE123C]">
                  ${chartData[chartData.length - 1]?.piggyBalance}
                </span>
              </div>
              <div className="p-3.5 bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-2xl shadow-sm">
                <span className="text-[10px] uppercase font-black text-[#78350F] block">Free Interest Earned</span>
                <span className="text-xl font-black text-[#B45309]">
                  ${Math.round((chartData[chartData.length - 1]?.hysaBalance - chartData[chartData.length - 1]?.piggyBalance) * 100) / 100}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. COMPOUND SPROUT LAB */}
      {activeTab === 'sprout' && (
        <div className="bg-white border-4 border-[#FDE68A] rounded-3xl p-6 sm:p-10 text-slate-800 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-[#FDE68A] pb-6">
            <div>
              <div className="flex items-center gap-2 text-[#166534] font-black text-xs uppercase tracking-wider">
                <Sprout className="w-4 h-4 text-[#10B981]" />
                <span>Aunt Minty's Botanical Notebook (Page 6)</span>
              </div>
              <h3 className="text-2xl font-black text-[#78350F] mt-1">The Compound Sprout Garden 🌱</h3>
              <p className="text-sm font-medium text-[#92400E] max-w-2xl mt-1">
                "This is your interest sprout... and this is compound interest: when your interest starts earning its own interest!"
              </p>
            </div>

            {/* Interactive Sliders */}
            <div className="flex items-center gap-3 bg-[#FEF3C7] p-3 rounded-2xl border-2 border-[#F59E0B] text-xs">
              <div>
                <span className="text-[#78350F] font-bold block">Seed Deposit:</span>
                <span className="font-black text-[#166534]">${sproutDeposit}</span>
              </div>
              <div className="border-l-2 border-[#FDE68A] pl-3">
                <span className="text-[#78350F] font-bold block">Growth Rate:</span>
                <span className="font-black text-[#D97706]">{sproutRate}% APY</span>
              </div>
              <div className="border-l-2 border-[#FDE68A] pl-3">
                <span className="text-[#78350F] font-bold block">Years:</span>
                <div className="flex gap-1 mt-0.5">
                  {[1, 2, 3, 5].map(y => (
                    <button
                      key={y}
                      id={`btn-sprout-yr-${y}`}
                      onClick={() => setSproutYears(y)}
                      className={`px-2.5 py-0.5 rounded-lg text-xs font-black border ${
                        sproutYears === y
                          ? 'bg-[#10B981] text-white border-[#047857]'
                          : 'bg-white text-[#78350F] border-[#FDE68A] hover:bg-[#FFFBEB]'
                      }`}
                    >
                      {y}Y
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Visual Sprout Tree Diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Visual SVG Plant Canvas */}
            <div className="bg-[#F0FDF4] rounded-3xl border-4 border-[#86EFAC] p-8 flex flex-col items-center justify-center relative min-h-[340px] overflow-hidden shadow-inner">
              <div className="absolute top-4 left-4 text-xs font-black text-[#166534] uppercase tracking-wider">
                🌿 AUNT MINTY'S FIELD SKETCH
              </div>

              {/* Animated Sprout Graphic */}
              <div className="relative flex flex-col items-center mt-6">
                {/* Branches based on years */}
                {sproutYears >= 3 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex gap-16 mb-2"
                  >
                    <div className="w-14 h-9 bg-[#86EFAC] border-2 border-[#166534] rounded-full flex items-center justify-center text-[10px] font-black text-[#14532D] shadow-sm">
                      Year 3
                    </div>
                    <div className="w-14 h-9 bg-[#86EFAC] border-2 border-[#166534] rounded-full flex items-center justify-center text-[10px] font-black text-[#14532D] shadow-sm">
                      Year 3
                    </div>
                  </motion.div>
                )}

                {sproutYears >= 2 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex gap-8 mb-2"
                  >
                    <div className="w-20 h-10 bg-[#4ADE80] border-2 border-[#15803D] rounded-full flex items-center justify-center text-xs font-black text-[#14532D] shadow-sm">
                      Year 2 Sprout
                    </div>
                    <div className="w-20 h-10 bg-[#4ADE80] border-2 border-[#15803D] rounded-full flex items-center justify-center text-xs font-black text-[#14532D] shadow-sm">
                      Interest on Interest
                    </div>
                  </motion.div>
                )}

                {/* Primary Sprout Stem */}
                <div className="w-24 h-12 bg-[#22C55E] border-2 border-[#166534] rounded-full flex items-center justify-center text-xs font-black text-white shadow-md">
                  Initial Interest
                </div>
                <div className="w-5 h-16 bg-[#15803D] rounded-sm" />

                {/* Pot / Principal Seed */}
                <div className="w-36 h-20 bg-[#B45309] border-2 border-[#78350F] rounded-b-3xl rounded-t-sm flex flex-col items-center justify-center text-xs text-[#FEF3C7] font-bold shadow-lg">
                  <span className="font-bold">Soil & Seed</span>
                  <span className="text-white font-black text-sm">${sproutDeposit} Principal</span>
                </div>
              </div>
            </div>

            {/* Year-by-Year Table */}
            <div className="space-y-4">
              <h4 className="font-black text-base text-[#78350F]">Compound Multiplication Breakdown</h4>
              <div className="space-y-2.5">
                {sproutHistory.map(row => (
                  <div
                    key={row.year}
                    className="p-4 rounded-2xl bg-[#FEF3C7] border-2 border-[#F59E0B] flex items-center justify-between text-xs shadow-sm"
                  >
                    <div>
                      <span className="font-black text-[#D97706] uppercase tracking-wider block">
                        Year {row.year} Sprout 🌱
                      </span>
                      <span className="text-[#78350F] text-xs font-bold">
                        Starts at ${row.startBalance} + ${row.interestEarned} Interest
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#92400E] font-bold block">Ending Balance:</span>
                      <span className="text-lg font-black text-[#166534]">
                        ${row.endBalance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. INFLATION RACE TRACK */}
      {activeTab === 'race' && (
        <div className="bg-white border-4 border-[#FDE68A] rounded-3xl p-6 sm:p-10 text-slate-800 shadow-xl space-y-8">
          <div>
            <div className="flex items-center gap-2 text-[#E11D48] font-black text-xs uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Aunt Minty's Two-Finger Race (Page 8)</span>
            </div>
            <h3 className="text-2xl font-black text-[#78350F] mt-1">The Great Inflation vs Interest Race 🏁</h3>
            <p className="text-sm font-medium text-[#92400E] max-w-2xl mt-1">
              "On one track is inflation, making things more expensive. On the other track is your interest. If you leave your money under your mattress, inflation wins the race."
            </p>
          </div>

          {/* Interactive Visual Race Lanes */}
          <div className="space-y-5 bg-[#FFFBEB] p-6 rounded-3xl border-2 border-[#FDE68A]">
            {/* Track 1: High-Yield Account Rocket */}
            <div>
              <div className="flex justify-between text-xs font-black mb-1.5">
                <span className="text-[#166534] flex items-center gap-1.5">
                  <Rocket className="w-4 h-4 text-[#10B981]" /> Track 1: High-Yield Savings Account (5.0% Speed)
                </span>
                <span className="text-[#166534] font-black">WINS THE RACE! 🏆</span>
              </div>
              <div className="w-full bg-white h-7 rounded-full overflow-hidden p-0.5 border-2 border-[#22C55E] shadow-inner">
                <motion.div
                  initial={{ width: "20%" }}
                  animate={{ width: "95%" }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  className="h-full bg-gradient-to-r from-[#22C55E] to-[#10B981] rounded-full"
                />
              </div>
            </div>

            {/* Track 2: Inflation Escalator */}
            <div>
              <div className="flex justify-between text-xs font-black mb-1.5">
                <span className="text-[#991B1B] flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#EF4444]" /> Track 2: Inflation / Rising Prices (3.2% Speed)
                </span>
                <span className="text-[#991B1B]">Making things expensive 📈</span>
              </div>
              <div className="w-full bg-white h-7 rounded-full overflow-hidden p-0.5 border-2 border-[#EF4444] shadow-inner">
                <motion.div
                  initial={{ width: "20%" }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  className="h-full bg-gradient-to-r from-[#F59E0B] to-[#EF4444] rounded-full"
                />
              </div>
            </div>

            {/* Track 3: Mattress / Ceramic Pig */}
            <div>
              <div className="flex justify-between text-xs font-black mb-1.5">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <Landmark className="w-4 h-4 text-slate-500" /> Track 3: Mattress / Idle Cash (0% Speed - Taking a Nap)
                </span>
                <span className="text-slate-600 font-mono font-bold">0 mph (Sleeping) 💤</span>
              </div>
              <div className="w-full bg-white h-7 rounded-full overflow-hidden p-0.5 border-2 border-slate-300 shadow-inner">
                <div className="w-20 h-full bg-slate-300 rounded-full flex items-center justify-center text-[10px] font-black text-slate-700">
                  Stuck
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
