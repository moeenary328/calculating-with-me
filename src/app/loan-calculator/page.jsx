'use client'

import { useState, useEffect } from 'react'
import { FaMoneyCheckAlt, FaPercentage, FaCalendarAlt, FaCalculator } from 'react-icons/fa'

export default function LoanCalculator() {
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

    if (isNaN(principal) || isNaN(monthlyInterest) || isNaN(totalPayments)) {
      return
    }

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
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl transition duration-300">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        💰 Loan Calculator
      </h2>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FaMoneyCheckAlt className="text-xl text-blue-600 dark:text-blue-400" />
          <input
            type="number"
            placeholder="Loan Amount ($)"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <FaPercentage className="text-xl text-green-600 dark:text-green-400" />
          <input
            type="number"
            placeholder="Interest Rate (%)"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-xl text-purple-600 dark:text-purple-400" />
          <input
            type="number"
            placeholder="Loan Term (Years)"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>

        <button
          onClick={calculateLoan}
          className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-800 text-white font-semibold py-3 px-6 rounded-xl transition-transform duration-300 transform hover:scale-105 shadow-xl"
        >
          <FaCalculator className="text-xl group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-lg">Calculate Loan</span>
        </button>
      </div>

      {monthlyPayment && (
        <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-inner space-y-2">
          <p className="text-lg font-medium text-gray-700 dark:text-white">
            📆 Monthly Payment: <span className="font-bold">${monthlyPayment}</span>
          </p>
          <p className="text-lg font-medium text-gray-700 dark:text-white">
            💵 Total Payment: <span className="font-bold">${totalPayment}</span>
          </p>
          <p className="text-lg font-medium text-gray-700 dark:text-white">
            📈 Total Interest: <span className="font-bold">${totalInterest}</span>
          </p>
        </div>
      )}

      {/* 🧠 Instructional Articles */}
      <div className="mt-10 space-y-6 bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">📚 How to Use Loan Calculator</h3>

        <div className="space-y-4">
          <article className="text-gray-700 dark:text-gray-300">
            <h4 className="font-bold text-lg">1️⃣ What is a Loan Calculator?</h4>
            <p>
              A loan calculator helps you estimate your monthly payments, total interest, and total cost of a loan based on the loan amount, interest rate, and term. It’s useful for planning your finances before taking a loan.
            </p>
          </article>

          <article className="text-gray-700 dark:text-gray-300">
            <h4 className="font-bold text-lg">2️⃣ How to Use This Tool</h4>
            <p>
              Simply enter the loan amount, annual interest rate, and loan term in years. Click the "Calculate Loan" button to instantly view your estimated monthly payment, total payment, and total interest.
            </p>
          </article>

          <article className="text-gray-700 dark:text-gray-300">
            <h4 className="font-bold text-lg">3️⃣ Why It Matters</h4>
            <p>
              Knowing the total cost of a loan helps you avoid financial surprises. This calculator empowers you to compare loan offers, make smarter borrowing decisions, and manage your budget efficiently.
            </p>
          </article>
        </div>
      </div>
    </div>
  )
}
