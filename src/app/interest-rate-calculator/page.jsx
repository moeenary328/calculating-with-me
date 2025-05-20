'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPercentage, FaMoneyBillWave, FaChartLine, FaCalculator, FaBook } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function InterestRateCalculator() {
  const [principal, setPrincipal] = useState('');
  const [interest, setInterest] = useState('');
  const [time, setTime] = useState('');
  const [total, setTotal] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculateInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(interest);
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t)) return;

    const totalAmount = p * (1 + (r / 100) * t);
    setTotal(totalAmount.toFixed(2));

    // Create chart data
    const data = [];
    for (let i = 1; i <= t; i++) {
      const yearlyAmount = p * (1 + (r / 100) * i);
      data.push({ year: `Year ${i}`, value: parseFloat(yearlyAmount.toFixed(2)) });
    }
    setChartData(data);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Skeleton for title */}
          <div className="text-center">
            <div className="h-12 bg-gray-200 rounded-full w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-full w-1/2 mx-auto"></div>
          </div>

          {/* Skeleton for calculator card */}
          <div className="glass bg-white/40 border border-white backdrop-blur-md shadow-2xl rounded-3xl p-8 md:grid md:grid-cols-2 gap-10">
            <div className="space-y-5">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-200 rounded-full w-1/2 mb-2"></div>
                  <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
                </div>
              ))}
              <div className="h-10 bg-gray-300 rounded-lg w-full"></div>
              <div className="h-16 bg-gray-100 rounded-xl w-full"></div>
            </div>
            <div className="h-[300px] bg-gray-100 rounded-xl"></div>
          </div>

          {/* Skeleton for article info */}
          <div className="bg-white/50 rounded-2xl p-6 shadow-xl backdrop-blur-md border border-white">
            <div className="h-6 bg-gray-200 rounded-full w-1/3 mb-4"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-3 bg-gray-200 rounded-full w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto space-y-12"
      >
        {/* Title */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-blue-700 drop-shadow-lg flex justify-center items-center gap-3">
            <FaCalculator className="text-purple-600 animate-pulse" /> Magical Interest Rate Calculator
          </h1>
          <p className="text-sm text-gray-600 mt-2">✨ Calculate simple interest magically with visual charm ✨</p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass bg-white/40 border border-white backdrop-blur-md shadow-2xl rounded-3xl p-8 md:grid md:grid-cols-2 gap-10"
        >
          {/* Inputs */}
          <div className="space-y-5">
            <div>
              <label className="flex items-center gap-2 font-medium text-gray-700"><FaMoneyBillWave /> Principal Amount (PKR)</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="e.g., 100000"
                className="w-full mt-1 px-4 py-2 rounded-lg bg-white text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-medium text-gray-700"><FaPercentage /> Annual Interest Rate (%)</label>
              <input
                type="number"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder="e.g., 10"
                className="w-full mt-1 px-4 py-2 rounded-lg bg-white text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-medium text-gray-700"><FaChartLine /> Time (Years)</label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g., 5"
                className="w-full mt-1 px-4 py-2 rounded-lg bg-white text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <button
              onClick={calculateInterest}
              className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
            >
              ✨ Calculate Interest ✨
            </button>

            {total && (
              <div className="text-center mt-4 p-4 bg-purple-100 text-purple-800 font-bold rounded-xl shadow-inner animate-bounce-slow">
                Total Amount: PKR {total}
              </div>
            )}
          </div>

          {/* Chart */}
          <div className="h-[300px] mt-10 md:mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Article Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white/50 rounded-2xl p-6 shadow-xl backdrop-blur-md border border-white"
        >
          <h2 className="text-xl font-bold flex items-center gap-2 text-purple-700">
            <FaBook /> How to Use This Calculator?
          </h2>
          <p className="text-sm text-gray-700 mt-2 leading-relaxed">
            This interest rate calculator uses the **simple interest formula**:
            <br /><strong className="text-blue-700">Total = Principal × (1 + Rate × Time)</strong>
            <br /><br />
            👉 Enter your initial principal amount (e.g., 100000 PKR)<br />
            👉 Input annual interest rate in % (e.g., 10%)<br />
            👉 Specify how many years you want to invest.<br />
            <br />
            🔍 You'll see total value after interest, along with a chart showing yearly growth.
          </p>
          <p className="text-xs text-gray-500 mt-3 italic">
            Note: For compound interest, use a compound calculator (coming soon 🔮)
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}