'use client';

import React, { useState, useEffect } from 'react';
import { FaCalculator } from 'react-icons/fa';

const FinanceCalculator = () => {
  // Track hydration (mounted) state
  const [isMounted, setIsMounted] = useState(false);

  // Input states
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [interest, setInterest] = useState('');
  const [emi, setEmi] = useState('');
  const [calculationType, setCalculationType] = useState('simpleInterest');

  // Mark mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const calculateSimpleInterest = () => {
    if (!principal || !rate || !time) {
      setInterest('Please enter all values.');
      setEmi('');
      return;
    }
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    if (p <= 0 || r <= 0 || t <= 0) {
      setInterest('Values must be greater than zero.');
      setEmi('');
      return;
    }
    const si = (p * r * t).toFixed(2);
    setInterest(si);
    setEmi('');
  };

  const calculateEMI = () => {
    if (!principal || !rate || !time) {
      setEmi('Please enter all values.');
      setInterest('');
      return;
    }
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 1200;
    const n = parseFloat(time) * 12;
    if (p <= 0 || n <= 0) {
      setEmi('Values must be greater than zero.');
      setInterest('');
      return;
    }
    if (r === 0) {
      setEmi((p / n).toFixed(2));
      setInterest('');
      return;
    }
    const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(emiValue.toFixed(2));
    setInterest('');
  };

  const handleCalculation = () => {
    if (calculationType === 'simpleInterest') {
      calculateSimpleInterest();
    } else if (calculationType === 'emi') {
      calculateEMI();
    }
  };

  // Prevent rendering UI that depends on client state before hydration
  if (!isMounted) {
    return null; // or a loader if you want
  }

  return (
    <div className="bg-white shadow-md rounded-md p-6 w-full max-w-md mx-auto">
      <div className="flex items-center justify-center mb-4">
        <FaCalculator className="text-indigo-500 text-2xl mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Finance Calculator</h2>
      </div>

      <div className="mb-4">
        <label htmlFor="calculationType" className="block text-gray-700 text-sm font-bold mb-2">
          Calculation Type:
        </label>
        <select
          id="calculationType"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={calculationType}
          onChange={(e) => setCalculationType(e.target.value)}
        >
          <option value="simpleInterest">Simple Interest</option>
          <option value="emi">Loan EMI</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="principal" className="block text-gray-700 text-sm font-bold mb-2">
          Principal Amount:
        </label>
        <input
          type="number"
          id="principal"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder="Enter principal amount"
          min="0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="rate" className="block text-gray-700 text-sm font-bold mb-2">
          Rate of Interest (% per annum):
        </label>
        <input
          type="number"
          id="rate"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Enter annual interest rate"
          min="0"
          step="0.01"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">
          Time Period (in years):
        </label>
        <input
          type="number"
          id="time"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Enter time period in years"
          min="0"
          step="0.1"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
          type="button"
          onClick={handleCalculation}
        >
          Calculate
        </button>

        <div className="text-center">
          {calculationType === 'simpleInterest' && interest && (
            <p className={`text-lg font-semibold ${interest.includes('Please') || interest.includes('must') ? 'text-red-500' : 'text-green-500'}`}>
              Simple Interest: {interest.startsWith('Please') || interest.startsWith('Values') ? interest : `₹${interest}`}
            </p>
          )}
          {calculationType === 'emi' && emi && (
            <p className={`text-lg font-semibold ${emi.includes('Please') || emi.includes('must') ? 'text-red-500' : 'text-green-500'}`}>
              Monthly EMI: {emi.startsWith('Please') || emi.startsWith('Values') ? emi : `₹${emi}`}
            </p>
          )}
        </div>
      </div>

      {/* Instructional Articles */}
      <div className="space-y-6 text-gray-700">
        <article className="bg-gray-50 p-4 rounded shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Simple Interest Overview</h3>
          <p>
            Simple interest is the interest calculated only on the initial amount (principal) of a loan or deposit.
            It does not take into account the effect of compounding. Simple interest is easy to calculate and understand.
          </p>
        </article>

        <article className="bg-gray-50 p-4 rounded shadow-sm">
          <h3 className="text-xl font-semibold mb-2">How to Calculate Simple Interest</h3>
          <p>
            To calculate simple interest, enter the principal amount, the annual interest rate (in %), and the time period (in years).
            Click "Calculate" to see the interest amount you will earn or owe. The formula used is: Simple Interest = Principal × Rate × Time.
          </p>
        </article>

        <article className="bg-gray-50 p-4 rounded shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Loan EMI Overview</h3>
          <p>
            EMI stands for Equated Monthly Installment. It is the fixed payment amount made by a borrower to a lender at a specified date each month.
            EMI includes both the principal and interest components and is calculated to repay the loan over the chosen tenure.
          </p>
        </article>

        <article className="bg-gray-50 p-4 rounded shadow-sm">
          <h3 className="text-xl font-semibold mb-2">How to Calculate EMI</h3>
          <p>
            To calculate your monthly EMI, enter the loan principal, annual interest rate, and loan tenure in years.
            Click "Calculate" to get your monthly installment amount. The calculation assumes monthly compounding interest.
          </p>
        </article>
      </div>
    </div>
  );
};

export default FinanceCalculator;
