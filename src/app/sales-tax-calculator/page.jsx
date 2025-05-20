'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaPercentage, FaCalculator, FaBook } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#34d399', '#6366f1'];

export default function SalesTaxCalculator() {
  const [price, setPrice] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [taxAmount, setTaxAmount] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculateTax = () => {
    const p = parseFloat(price);
    const r = parseFloat(taxRate);

    if (isNaN(p) || isNaN(r)) return;

    const tax = (p * r) / 100;
    const total = p + tax;

    setTaxAmount(tax.toFixed(2));
    setTotalAmount(total.toFixed(2));
  };

  const chartData = [
    { name: 'Price', value: parseFloat(price || 0) },
    { name: 'Tax', value: parseFloat(taxAmount || 0) },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-indigo-100 py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Skeleton for heading */}
          <div className="text-center">
            <div className="h-12 bg-gray-200 rounded-full w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-full w-1/2 mx-auto"></div>
          </div>

          {/* Skeleton for calculator box */}
          <div className="bg-white/40 backdrop-blur-md border border-white shadow-2xl rounded-3xl p-8 grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-200 rounded-full w-1/2 mb-2"></div>
                  <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
                </div>
              ))}
              <div className="h-10 bg-gray-300 rounded-xl w-full"></div>
              <div className="space-y-2 mt-6">
                <div className="h-4 bg-gray-200 rounded-full w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded-full w-3/4 mx-auto"></div>
              </div>
            </div>
            <div className="h-[300px] bg-gray-100 rounded-xl"></div>
          </div>

          {/* Skeleton for article info */}
          <div className="bg-white/50 p-6 rounded-2xl shadow-xl border border-white backdrop-blur-sm">
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
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-indigo-100 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto space-y-12"
      >
        {/* Heading */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-green-700 flex items-center justify-center gap-3">
            <FaCalculator className="text-indigo-600 animate-bounce" />
            Sales Tax Calculator
          </h1>
          <p className="text-sm text-gray-600 mt-1">💸 Calculate your product's total with tax in real time</p>
        </motion.div>

        {/* Calculator Box */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/40 backdrop-blur-md border border-white shadow-2xl rounded-3xl p-8 grid md:grid-cols-2 gap-8"
        >
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label className="font-medium text-gray-700 flex gap-2 items-center">
                <FaShoppingCart /> Item Price (PKR)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., 5000"
                className="w-full mt-1 px-4 py-2 rounded-lg bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="font-medium text-gray-700 flex gap-2 items-center">
                <FaPercentage /> Tax Rate (%)
              </label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                placeholder="e.g., 17"
                className="w-full mt-1 px-4 py-2 rounded-lg bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button
              onClick={calculateTax}
              className="w-full py-2 mt-4 bg-gradient-to-r from-green-500 to-indigo-500 text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-transform"
            >
              💰 Calculate Tax
            </button>

            {taxAmount && totalAmount && (
              <div className="text-center space-y-2 mt-6">
                <p className="text-green-800 font-bold">Tax Amount: PKR {taxAmount}</p>
                <p className="text-indigo-800 font-bold">Total Price: PKR {totalAmount}</p>
              </div>
            )}
          </div>

          {/* Chart */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Article Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/50 p-6 rounded-2xl shadow-xl border border-white backdrop-blur-sm"
        >
          <h2 className="text-xl font-bold text-indigo-700 flex gap-2 items-center">
            <FaBook /> How to Use This Calculator?
          </h2>
          <p className="text-gray-700 mt-2 text-sm leading-relaxed">
            This calculator helps you compute the total cost of an item including sales tax.
            <br /><br />
            ➕ Just enter your product's price and the tax rate (%).  
            <br />
            📊 You'll instantly see how much tax you pay and the total price including tax.
            <br /><br />
            🧮 Formula used: <strong>Total = Price + (Price × Tax Rate ÷ 100)</strong>
            <br /><br />
            Perfect for shopping, business, or e-commerce platforms!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}