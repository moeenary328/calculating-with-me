'use client'

import { useEffect, useState } from 'react'
import {
  FaCar,
  FaPercentage,
  FaCalendarAlt,
  FaCalculator,
  FaInfoCircle,
  FaLightbulb,
  FaCheckCircle
} from 'react-icons/fa'

export default function AutoLoanCalculator() {
  const [amount, setAmount] = useState('')
  const [interest, setInterest] = useState('')
  const [term, setTerm] = useState('')
  const [monthlyPayment, setMonthlyPayment] = useState(null)
  const [totalPayment, setTotalPayment] = useState(null)
  const [totalInterest, setTotalInterest] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const calculateLoan = () => {
    const principal = parseFloat(amount)
    const monthlyInterest = parseFloat(interest) / 100 / 12
    const totalPayments = parseFloat(term) * 12

    if (isNaN(principal) || isNaN(monthlyInterest) || isNaN(totalPayments)) return

    const x = Math.pow(1 + monthlyInterest, totalPayments)
    const monthly = (principal * x * monthlyInterest) / (x - 1)

    if (isFinite(monthly)) {
      setMonthlyPayment(monthly.toFixed(2))
      setTotalPayment((monthly * totalPayments).toFixed(2))
      setTotalInterest((monthly * totalPayments - principal).toFixed(2))
    } else {
      setMonthlyPayment(null)
      setTotalPayment(null)
      setTotalInterest(null)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gradient-to-tr from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl">
      <h2 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-300 mb-8">
        🚗 Auto Loan Calculator
      </h2>

      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <FaCar className="text-2xl text-blue-600 dark:text-blue-400" />
          <input
            type="number"
            placeholder="Car Price ($)"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <FaPercentage className="text-2xl text-green-600 dark:text-green-400" />
          <input
            type="number"
            placeholder="Interest Rate (%)"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-2xl text-purple-600 dark:text-purple-400" />
          <input
            type="number"
            placeholder="Loan Term (Years)"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>

        <button
          onClick={calculateLoan}
          className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-pink-500 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-transform duration-300 transform hover:scale-105 shadow-xl"
        >
          <FaCalculator className="text-xl group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-lg">Calculate Auto Loan</span>
        </button>
      </div>

      {monthlyPayment && (
        <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-inner space-y-3">
          <p className="text-lg font-medium text-gray-800 dark:text-white">
            📆 Monthly Payment: <span className="font-bold">${monthlyPayment}</span>
          </p>
          <p className="text-lg font-medium text-gray-800 dark:text-white">
            💵 Total Payment: <span className="font-bold">${totalPayment}</span>
          </p>
          <p className="text-lg font-medium text-gray-800 dark:text-white">
            📈 Total Interest: <span className="font-bold">${totalInterest}</span>
          </p>
        </div>
      )}

      {/* --- Instructional Articles --- */}
      <div className="mt-10 space-y-6">
        <div className="p-5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow">
          <h3 className="text-2xl font-bold flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <FaInfoCircle /> How to Use the Auto Loan Calculator
          </h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            Enter your car price, interest rate, and loan term (in years), then click <strong>Calculate Auto Loan</strong>.
            The calculator will instantly show your estimated monthly payment, total payment over the loan term, and the total interest you'll pay.
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow">
          <h3 className="text-2xl font-bold flex items-center gap-2 text-green-600 dark:text-green-400">
            <FaLightbulb /> How It Works
          </h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            The Auto Loan Calculator uses the standard amortization formula to determine your monthly payment based on the loan principal, interest rate, and loan term. It assumes fixed monthly payments and consistent interest over the loan period.
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow">
          <h3 className="text-2xl font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <FaCheckCircle /> Benefits of Using This Calculator
          </h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            This tool helps you budget better before buying a car. It gives clarity on how much you’ll be paying monthly and overall, helping you choose a loan that fits your financial situation and avoid surprises later.
          </p>
        </div>
      </div>
    </div>
  )
}
