'use client'

import { useState, useEffect } from 'react'
import { FaDollarSign, FaPercentage, FaCalendarAlt, FaCalculator } from 'react-icons/fa'

export default function CreativeInterestCalculator() {
  const [principal, setPrincipal] = useState(1000)
  const [rate, setRate] = useState(5)
  const [time, setTime] = useState(1)
  const [interest, setInterest] = useState(null)
  const [totalAmount, setTotalAmount] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const calculateInterest = () => {
    const principalNum = parseFloat(principal)
    const rateNum = parseFloat(rate)
    const timeNum = parseFloat(time)

    if (isNaN(principalNum) || isNaN(rateNum) || isNaN(timeNum)) {
      alert('Please enter valid numbers for all fields!')
      return
    }

    const calculatedInterest = (principalNum * rateNum * timeNum) / 100
    const total = principalNum + calculatedInterest

    setInterest(calculatedInterest.toFixed(2))
    setTotalAmount(total.toFixed(2))
  }

  return (
    <div className="relative max-w-2xl mx-auto mt-12 p-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-gray-900 dark:via-gray-700 dark:to-gray-900 rounded-3xl shadow-xl overflow-hidden">
      {/* Background Animation */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 animate-pulse bg-gradient-to-r from-yellow-400 via-orange-300 to-red-400 rounded-3xl"></div>

      <h2 className="text-5xl font-extrabold text-center text-white mb-10 z-10 relative">
        💰 Creative Interest Calculator
      </h2>

      <div className="space-y-6 z-10 relative">
        <div className="flex items-center gap-3">
          <FaDollarSign className="text-3xl text-yellow-400" />
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full px-5 py-3 rounded-lg border-none focus:ring-2 focus:ring-yellow-300 dark:bg-gray-800 dark:text-white"
            placeholder="Enter Principal ($)"
          />
        </div>

        <div className="flex items-center gap-3">
          <FaPercentage className="text-3xl text-yellow-400" />
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full px-5 py-3 rounded-lg border-none focus:ring-2 focus:ring-yellow-300 dark:bg-gray-800 dark:text-white"
            placeholder="Interest Rate (%)"
          />
        </div>

        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-3xl text-yellow-400" />
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-5 py-3 rounded-lg border-none focus:ring-2 focus:ring-yellow-300 dark:bg-gray-800 dark:text-white"
            placeholder="Loan Time (Years)"
          />
        </div>

        <button
          onClick={calculateInterest}
          className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-transform duration-300 shadow-2xl mt-4"
        >
          <FaCalculator className="text-xl group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-lg">Calculate Interest</span>
        </button>
      </div>

      {interest && totalAmount && (
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-inner space-y-4">
          <p className="text-lg font-medium text-gray-800 dark:text-white">
            🔥 Interest: <span className="font-bold text-red-600">${interest}</span>
          </p>
          <p className="text-lg font-medium text-gray-800 dark:text-white">
            📈 Total Amount: <span className="font-bold text-blue-600">${totalAmount}</span>
          </p>
        </div>
      )}

      {/* 🧾 Article 1 */}
      <article className="mt-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6 rounded-xl shadow-md space-y-3">
        <h3 className="text-2xl font-semibold text-pink-600">📘 What Is a Simple Interest Calculator?</h3>
        <p>
          A simple interest calculator is a financial tool that helps you estimate the interest you’ll earn or owe
          over time. It uses the basic formula: <strong>(Principal × Rate × Time) / 100</strong>. This calculator is
          ideal for quick and straightforward financial planning without compound effects.
        </p>
      </article>

      {/* 🧾 Article 2 */}
      <article className="mt-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6 rounded-xl shadow-md space-y-3">
        <h3 className="text-2xl font-semibold text-purple-600">🛠️ How to Use the Calculator</h3>
        <p>
          Simply enter your <strong>Principal</strong> amount (the base amount), the <strong>Interest Rate</strong>{' '}
          per year, and the <strong>Time</strong> in years. Then click <em>Calculate Interest</em> to see both the
          total interest and the total amount you'll pay or receive.
        </p>
      </article>

      {/* 🧾 Article 3 */}
      <article className="mt-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6 rounded-xl shadow-md space-y-3">
        <h3 className="text-2xl font-semibold text-indigo-600">💡 When Should You Use This?</h3>
        <p>
          Use this calculator for short-term personal or educational loans, or to estimate earnings from simple
          interest investments. It’s especially helpful when you need fast clarity without the complexity of
          compounding.
        </p>
      </article>
    </div>
  )
}
