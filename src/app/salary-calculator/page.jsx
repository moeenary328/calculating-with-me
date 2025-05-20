'use client';

import { useState, useEffect } from 'react';
import { FaMoneyBillWave, FaUserTie, FaCalculator, FaInfoCircle, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function SalaryCalculator() {
  const [basicSalary, setBasicSalary] = useState('');
  const [allowances, setAllowances] = useState('');
  const [deductions, setDeductions] = useState('');
  const [netSalary, setNetSalary] = useState(null);
  const [viewType, setViewType] = useState('monthly'); // 'monthly' or 'yearly'
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate net salary whenever inputs or viewType change
  useEffect(() => {
    const basic = parseFloat(basicSalary) || 0;
    const allow = parseFloat(allowances) || 0;
    const deduct = parseFloat(deductions) || 0;
    const monthly = basic + allow - deduct;
    const total = viewType === 'yearly' ? monthly * 12 : monthly;
    setNetSalary(total);
  }, [basicSalary, allowances, deductions, viewType]);

  if (!mounted) {
    // Return a placeholder with the same dimensions during SSR
    return (
      <div className="min-h-screen bg-white p-6 text-gray-800">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200">
            <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-800">
              <FaCalculator className="text-blue-500" />
              Salary Calculator (PKR)
            </h1>
            {/* Placeholder inputs */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
                </div>
              ))}
            </div>
            <div className="h-16 bg-gray-100 rounded-xl w-full"></div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-3 bg-gray-100 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start"
      >
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200 hover:scale-[1.02] transition-all duration-300"
        >
          <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-800">
            <FaCalculator className="text-blue-500" />
            Salary Calculator (PKR)
          </h1>

          {/* Toggle Monthly/Yearly */}
          <div className="flex items-center gap-4">
            <FaCalendarAlt className="text-blue-500" />
            <span className="text-sm font-medium">View Type:</span>
            <button
              onClick={() => setViewType('monthly')}
              className={`px-4 py-1 rounded-full border text-sm transition ${
                viewType === 'monthly' ? 'bg-blue-500 text-white' : 'bg-white border-gray-300 text-gray-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setViewType('yearly')}
              className={`px-4 py-1 rounded-full border text-sm transition ${
                viewType === 'yearly' ? 'bg-blue-500 text-white' : 'bg-white border-gray-300 text-gray-600'
              }`}
            >
              Yearly
            </button>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <div className="group">
              <label className="text-sm flex items-center gap-2">
                <FaUserTie /> Basic Salary
              </label>
              <input
                type="number"
                value={basicSalary}
                onChange={(e) => setBasicSalary(e.target.value)}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="e.g., 50000"
              />
            </div>

            <div className="group">
              <label className="text-sm flex items-center gap-2">
                <FaMoneyBillWave /> Allowances
              </label>
              <input
                type="number"
                value={allowances}
                onChange={(e) => setAllowances(e.target.value)}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="e.g., 15000"
              />
            </div>

            <div className="group">
              <label className="text-sm flex items-center gap-2">
                <FaMoneyBillWave /> Deductions
              </label>
              <input
                type="number"
                value={deductions}
                onChange={(e) => setDeductions(e.target.value)}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="e.g., 5000"
              />
            </div>
          </div>

          {/* Result */}
          {netSalary !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 rounded-xl bg-blue-100 text-blue-900 text-center font-semibold text-lg shadow-inner border border-blue-300"
            >
              {viewType === 'monthly' ? 'Monthly' : 'Yearly'} Net Salary: PKR {netSalary.toLocaleString()}
            </motion.div>
          )}
        </motion.div>

        {/* Right Section - Info Block */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:scale-[1.02] transition-all duration-300"
        >
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-gray-800">
            <FaInfoCircle className="text-blue-500" />
            Salary Calculator Info
          </h2>
          <p className="text-sm text-gray-600">
            Ye calculator aap ki monthly ya yearly salary calculate karta hai based on:
          </p>
          <ul className="list-disc pl-6 mt-2 text-sm text-gray-600">
            <li><strong>Basic Salary</strong>: Monthly fixed income.</li>
            <li><strong>Allowances</strong>: Medical, transport, fuel, etc.</li>
            <li><strong>Deductions</strong>: Tax ya other cuts.</li>
            <li><strong>Net Salary</strong>: Final amount jo aapko milta hai.</li>
          </ul>
          <p className="mt-2 text-xs italic text-gray-500">
            Currency: Pakistani Rupees (PKR)
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}