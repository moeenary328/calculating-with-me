'use client'

import { useState, useEffect } from 'react'
import { FaUser, FaBriefcase, FaMoneyBillWave, FaRegSmileWink } from 'react-icons/fa'

export default function RetirementCalculator() {
  const [age, setAge] = useState('')
  const [retirementAge, setRetirementAge] = useState('')
  const [monthlySavings, setMonthlySavings] = useState('')
  const [annualReturn, setAnnualReturn] = useState('')
  const [totalSavings, setTotalSavings] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const calculateRetirement = () => {
    const currentAge = parseFloat(age)
    const targetAge = parseFloat(retirementAge)
    const savings = parseFloat(monthlySavings)
    const returnRate = parseFloat(annualReturn) / 100

    if (isNaN(currentAge) || isNaN(targetAge) || isNaN(savings) || isNaN(returnRate)) return

    const months = (targetAge - currentAge) * 12
    const monthlyRate = returnRate / 12
    const futureValue = savings * (((Math.pow(1 + monthlyRate, months)) - 1) / monthlyRate)

    setTotalSavings(futureValue.toFixed(2))
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 rounded-3xl shadow-2xl relative overflow-hidden">
      <h2 className="text-4xl font-bold text-center text-white mb-8">🌟 Retirement Calculator</h2>

      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <FaUser className="text-2xl text-white" />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-5 py-3 rounded-lg bg-white/80 focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white"
            placeholder="Current Age"
          />
        </div>

        <div className="flex items-center gap-3">
          <FaRegSmileWink className="text-2xl text-white" />
          <input
            type="number"
            value={retirementAge}
            onChange={(e) => setRetirementAge(e.target.value)}
            className="w-full px-5 py-3 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
            placeholder="Retirement Age"
          />
        </div>

        <div className="flex items-center gap-3">
          <FaMoneyBillWave className="text-2xl text-white" />
          <input
            type="number"
            value={monthlySavings}
            onChange={(e) => setMonthlySavings(e.target.value)}
            className="w-full px-5 py-3 rounded-lg bg-white/80 focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:text-white"
            placeholder="Monthly Savings"
          />
        </div>

        <div className="flex items-center gap-3">
          <FaBriefcase className="text-2xl text-white" />
          <input
            type="number"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(e.target.value)}
            className="w-full px-5 py-3 rounded-lg bg-white/80 focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800 dark:text-white"
            placeholder="Expected Annual Return (%)"
          />
        </div>

        <button
          onClick={calculateRetirement}
          className="w-full mt-6 py-3 px-6 text-white font-semibold rounded-lg bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-400 hover:to-red-400 transform hover:scale-105 transition-transform duration-300 shadow-xl"
        >
          🔍 Calculate Retirement Savings
        </button>
      </div>

      {totalSavings && (
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-inner">
          <p className="text-lg font-medium text-gray-800 dark:text-white">
            🎯 Estimated Savings at Retirement: 
            <span className="font-bold text-green-600 dark:text-green-400"> ${totalSavings}</span>
          </p>
        </div>
      )}

      {/* 3 Instructional Articles */}
      <div className="mt-12 space-y-10 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-lg">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">📘 How to Use This Retirement Calculator</h3>
          <p className="text-gray-700 dark:text-gray-300">
            To use the Retirement Calculator, simply enter your current age, the age at which you plan to retire, your monthly savings, and the expected annual return rate on your investment. The calculator will estimate the total savings you could have by retirement, helping you plan more effectively for the future.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">📊 Why Planning for Retirement Matters</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Retirement planning ensures financial independence in your later years. Starting early allows compound interest to grow your investments, minimizing stress and maximizing security when you retire. Use this calculator regularly to track progress and adjust your savings goals.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">💼 Tips for Boosting Your Retirement Savings</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Start saving as early as possible to maximize compounding.</li>
            <li>Increase your monthly contribution each year.</li>
            <li>Diversify your investments to manage risk effectively.</li>
            <li>Review your portfolio annually and rebalance as needed.</li>
            <li>Take advantage of employer-matching contributions if available.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
