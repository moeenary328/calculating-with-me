'use client'

import { useState, useEffect } from 'react'
import { FaMoneyBillWave, FaChartLine, FaCalendarPlus, FaPiggyBank } from 'react-icons/fa'

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState('')
  const [monthlyContribution, setMonthlyContribution] = useState('')
  const [years, setYears] = useState('')
  const [rate, setRate] = useState('')
  const [finalAmount, setFinalAmount] = useState(null)
  const [interestEarned, setInterestEarned] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const calculateInvestment = () => {
    const P = parseFloat(initialInvestment)
    const PMT = parseFloat(monthlyContribution)
    const r = parseFloat(rate) / 100 / 12
    const t = parseFloat(years)
    const n = t * 12

    if (isNaN(P) || isNaN(PMT) || isNaN(r) || isNaN(n)) return

    const futureValueSeries = PMT * (Math.pow(1 + r, n) - 1) / r
    const futureValueLumpSum = P * Math.pow(1 + r, n)
    const totalFutureValue = futureValueSeries + futureValueLumpSum
    const totalPrincipal = P + (PMT * n)
    const totalInterest = totalFutureValue - totalPrincipal

    setFinalAmount(totalFutureValue.toFixed(2))
    setInterestEarned(totalInterest.toFixed(2))
  }

  return (
    <>
      <div className="max-w-4xl mx-auto mt-12 p-10 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">📈 Investment Calculator</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <FaMoneyBillWave className="text-2xl text-green-600" />
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              className="w-full px-5 py-3 rounded-md bg-gray-100 focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white"
              placeholder="Initial Investment"
            />
          </div>

          <div className="flex items-center gap-3">
            <FaPiggyBank className="text-2xl text-pink-600" />
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className="w-full px-5 py-3 rounded-md bg-gray-100 focus:ring-2 focus:ring-pink-400 dark:bg-gray-800 dark:text-white"
              placeholder="Monthly Contribution"
            />
          </div>

          <div className="flex items-center gap-3">
            <FaCalendarPlus className="text-2xl text-blue-600" />
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full px-5 py-3 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
              placeholder="Investment Period (Years)"
            />
          </div>

          <div className="flex items-center gap-3">
            <FaChartLine className="text-2xl text-purple-600" />
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full px-5 py-3 rounded-md bg-gray-100 focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:text-white"
              placeholder="Expected Annual Return (%)"
            />
          </div>
        </div>

        <button
          onClick={calculateInvestment}
          className="mt-8 w-full md:w-auto bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          💹 Calculate Investment
        </button>

        {finalAmount && (
          <div className="mt-10 bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">📊 Result Summary</h3>
            <div className="space-y-2 text-lg text-gray-700 dark:text-gray-100">
              <p>📦 Total Value: <span className="font-bold text-green-600">${finalAmount}</span></p>
              <p>💰 Interest Earned: <span className="font-bold text-pink-600">${interestEarned}</span></p>
            </div>
          </div>
        )}
      </div>

      {/* 4 Articles Section below the calculator */}
      <div className="max-w-4xl mx-auto mt-16 px-6 space-y-12 text-gray-800 dark:text-gray-200">
        <article>
          <h3 className="text-2xl font-bold mb-3">How to Use the Investment Calculator</h3>
          <p>
            Input your initial investment, monthly contribution, number of years you plan to invest, and the expected annual return rate.
            Press the calculate button to see your estimated future value and total interest earned.
          </p>
        </article>

        <article>
          <h3 className="text-2xl font-bold mb-3">Why Compound Interest Matters</h3>
          <p>
            Compound interest allows your investment to grow exponentially over time. By reinvesting your earnings, your money works harder for you and increases your overall returns.
          </p>
        </article>

        <article>
          <h3 className="text-2xl font-bold mb-3">Tips for Consistent Investing</h3>
          <p>
            Regular contributions, even small amounts, can significantly boost your investment returns. Stay disciplined, avoid timing the market, and keep your long-term goals in mind.
          </p>
        </article>

        <article>
          <h3 className="text-2xl font-bold mb-3">Common Investing Mistakes to Avoid</h3>
          <p>
            Avoid withdrawing your money early, neglecting fees, or investing without proper research. Patience and knowledge are key to successful investing.
          </p>
        </article>
      </div>
    </>
  )
}
