'use client'

import { useState, useEffect } from 'react'
import {
  FaDollarSign,
  FaMoneyCheckAlt,
  FaPercentage,
  FaCalendarAlt,
  FaCalculator,
} from 'react-icons/fa'

export default function PaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(5000)
  const [interestRate, setInterestRate] = useState(5)
  const [loanTerm, setLoanTerm] = useState(12)
  const [monthlyPayment, setMonthlyPayment] = useState(null)
  const [totalPayment, setTotalPayment] = useState(null)
  const [totalInterest, setTotalInterest] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const calculatePayment = () => {
    const principal = parseFloat(loanAmount)
    const rate = parseFloat(interestRate) / 100 / 12
    const numberOfPayments = parseFloat(loanTerm)

    if (isNaN(principal) || isNaN(rate) || isNaN(numberOfPayments)) {
      alert('Please enter valid numbers for all fields!')
      return
    }

    const x = Math.pow(1 + rate, numberOfPayments)
    const monthly = (principal * rate * x) / (x - 1)
    const total = monthly * numberOfPayments
    const interest = total - principal

    setMonthlyPayment(monthly.toFixed(2))
    setTotalPayment(total.toFixed(2))
    setTotalInterest(interest.toFixed(2))
  }

  return (
    <div className="relative max-w-2xl mx-auto mt-12 p-8 bg-gradient-to-br from-green-400 via-teal-500 to-blue-600 dark:from-gray-900 dark:via-gray-700 dark:to-gray-900 rounded-3xl shadow-xl overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 animate-pulse bg-gradient-to-r from-yellow-400 via-orange-500 to-red-400 rounded-3xl"></div>

      <h2 className="text-5xl font-extrabold text-center text-white mb-10 z-10 relative">
        💸 Payment Calculator
      </h2>

      <div className="space-y-6 z-10 relative">
        <div className="flex items-center gap-3">
          <FaDollarSign className="text-3xl text-yellow-400" />
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full px-5 py-3 rounded-lg border-none focus:ring-2 focus:ring-yellow-300 dark:bg-gray-800 dark:text-white"
            placeholder="Loan Amount ($)"
          />
        </div>

        <div className="flex items-center gap-3">
          <FaPercentage className="text-3xl text-yellow-400" />
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full px-5 py-3 rounded-lg border-none focus:ring-2 focus:ring-yellow-300 dark:bg-gray-800 dark:text-white"
            placeholder="Interest Rate (%)"
          />
        </div>

        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-3xl text-yellow-400" />
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full px-5 py-3 rounded-lg border-none focus:ring-2 focus:ring-yellow-300 dark:bg-gray-800 dark:text-white"
            placeholder="Loan Term (Months)"
          />
        </div>

        <button
          onClick={calculatePayment}
          className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-transform duration-300 shadow-2xl mt-4"
        >
          <FaCalculator className="text-xl group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-lg">Calculate Payment</span>
        </button>
      </div>

      {monthlyPayment && totalPayment && totalInterest && (
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-inner space-y-4">
          <p className="text-lg font-medium text-gray-800 dark:text-white">
            💰 Monthly Payment: <span className="font-bold text-green-600">${monthlyPayment}</span>
          </p>
          <p className="text-lg font-medium text-gray-800 dark:text-white">
            💵 Total Payment: <span className="font-bold text-blue-600">${totalPayment}</span>
          </p>
          <p className="text-lg font-medium text-gray-800 dark:text-white">
            🔥 Total Interest: <span className="font-bold text-red-600">${totalInterest}</span>
          </p>
        </div>
      )}

      {/* 📘 Instructional Articles */}
      <div className="mt-12 space-y-8 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-xl">
        <article className="text-gray-800 dark:text-gray-200">
          <h3 className="text-2xl font-bold mb-2">📌 What Is a Payment Calculator?</h3>
          <p>
            A payment calculator helps you estimate how much your monthly loan payments will be
            based on your loan amount, interest rate, and repayment term. It’s useful for planning
            your finances, comparing loans, and avoiding surprises in your budget.
          </p>
        </article>

        <article className="text-gray-800 dark:text-gray-200">
          <h3 className="text-2xl font-bold mb-2">⚙️ How to Use the Payment Calculator</h3>
          <p>
            Simply enter the loan amount, interest rate (annual), and loan term in months. Click on
            the “Calculate Payment” button, and the tool will instantly show your monthly payment,
            total amount payable, and total interest cost.
          </p>
        </article>

        <article className="text-gray-800 dark:text-gray-200">
          <h3 className="text-2xl font-bold mb-2">💡 Why It’s Important to Know Your Payments</h3>
          <p>
            Knowing your payment breakdown helps you make smarter financial decisions. It prevents
            you from overborrowing, lets you adjust your budget accordingly, and helps you compare
            different loan offers effectively.
          </p>
        </article>
      </div>
    </div>
  )
}
