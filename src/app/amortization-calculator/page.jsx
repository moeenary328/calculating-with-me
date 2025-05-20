'use client'

import { useState, useEffect } from 'react'
import { FaHandHoldingUsd, FaPercent, FaRegClock } from 'react-icons/fa'

export default function AmortizationCalculator() {
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('')
  const [monthlyPayment, setMonthlyPayment] = useState(null)
  const [totalPayment, setTotalPayment] = useState(null)
  const [totalInterest, setTotalInterest] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const calculateAmortization = () => {
    const P = parseFloat(loanAmount)
    const r = parseFloat(interestRate) / 100 / 12
    const n = parseFloat(loanTerm) * 12

    if (isNaN(P) || isNaN(r) || isNaN(n)) return

    const M = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    const total = M * n
    const interest = total - P

    setMonthlyPayment(M.toFixed(2))
    setTotalPayment(total.toFixed(2))
    setTotalInterest(interest.toFixed(2))
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 p-10 bg-gradient-to-bl from-rose-500 via-fuchsia-600 to-indigo-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-[40px] shadow-2xl relative overflow-hidden">

      <h1 className="text-4xl font-extrabold text-white text-center mb-10 drop-shadow-xl">📊 Amortization Calculator</h1>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <FaHandHoldingUsd className="text-2xl text-white" />
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full px-6 py-3 rounded-lg bg-white/90 focus:ring-2 focus:ring-pink-400 dark:bg-gray-800 dark:text-white"
            placeholder="Loan Amount"
          />
        </div>

        <div className="flex items-center gap-4">
          <FaPercent className="text-2xl text-white" />
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full px-6 py-3 rounded-lg bg-white/90 focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:text-white"
            placeholder="Interest Rate (%)"
          />
        </div>

        <div className="flex items-center gap-4">
          <FaRegClock className="text-2xl text-white" />
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full px-6 py-3 rounded-lg bg-white/90 focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white"
            placeholder="Loan Term (Years)"
          />
        </div>

        <button
          onClick={calculateAmortization}
          className="w-full mt-6 py-3 px-6 text-white font-semibold rounded-full bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-400 hover:to-pink-400 transform hover:scale-105 transition-transform duration-300 shadow-xl"
        >
          📐 Calculate Amortization
        </button>
      </div>

      {monthlyPayment && (
        <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-inner space-y-4">
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            💸 Monthly Payment: <span className="font-bold text-rose-600">${monthlyPayment}</span>
          </p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            🧾 Total Payment: <span className="font-bold text-purple-600">${totalPayment}</span>
          </p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            🔥 Total Interest: <span className="font-bold text-indigo-600">${totalInterest}</span>
          </p>
        </div>
      )}

      {/* Instructional Articles */}
      <section className="mt-16 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-rose-600">📘 What is Amortization?</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Amortization refers to the process of paying off a debt over time through regular payments. Each payment covers interest costs and reduces the principal loan balance, so your debt decreases gradually.
        </p>
      </section>

      <section className="mt-10 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-purple-600">🔍 How to Use This Calculator</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Enter your total loan amount, the annual interest rate, and the term of the loan in years. Click the "Calculate Amortization" button to view your monthly payment, total payment, and total interest.
        </p>
      </section>

      <section className="mt-10 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-md mb-20">
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">💡 Why Use an Amortization Schedule?</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Knowing how much you’ll pay over the life of your loan helps you plan your finances better. An amortization schedule provides transparency on how much of your payment goes toward interest vs. principal.
        </p>
      </section>
    </div>
  )
}
