'use client';

import { useState, useEffect } from 'react';
import { FaHome, FaCalculator, FaDollarSign, FaPercent, FaCalendarAlt, FaRedo, FaFilePdf } from 'react-icons/fa';
import jsPDF from 'jspdf';

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanAmount, setLoanAmount] = useState(240000);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, loanAmount, interestRate, loanTerm]);

  const calculateMortgage = () => {
    const principal = loanAmount;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const payment =
      principal *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const total = payment * numberOfPayments;
    const interest = total - principal;

    setMonthlyPayment(payment.toFixed(2));
    setTotalInterest(interest.toFixed(2));
    setTotalPayment(total.toFixed(2));
  };

  const handleHomePriceChange = (e) => {
    const price = parseFloat(e.target.value) || 0;
    setHomePrice(price);
    const newDownPayment = price * (downPaymentPercent / 100);
    setDownPayment(newDownPayment);
    setLoanAmount(price - newDownPayment);
  };

  const handleDownPaymentChange = (e) => {
    const payment = parseFloat(e.target.value) || 0;
    setDownPayment(payment);
    const percent = (payment / homePrice) * 100;
    setDownPaymentPercent(parseFloat(percent.toFixed(2)));
    setLoanAmount(homePrice - payment);
  };

  const handleDownPaymentPercentChange = (e) => {
    const percent = parseFloat(e.target.value) || 0;
    setDownPaymentPercent(percent);
    const payment = homePrice * (percent / 100);
    setDownPayment(payment);
    setLoanAmount(homePrice - payment);
  };

  const handleInterestRateChange = (e) => {
    setInterestRate(parseFloat(e.target.value) || 0);
  };

  const handleLoanTermChange = (term) => {
    setLoanTerm(term);
  };

  const resetCalculator = () => {
    setHomePrice(300000);
    setDownPayment(60000);
    setDownPaymentPercent(20);
    setLoanAmount(240000);
    setInterestRate(3.5);
    setLoanTerm(30);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Mortgage Calculator Results", 20, 20);
    doc.setFontSize(12);
    doc.text(`Home Price: $${homePrice}`, 20, 40);
    doc.text(`Down Payment: $${downPayment} (${downPaymentPercent}%)`, 20, 50);
    doc.text(`Loan Amount: $${loanAmount}`, 20, 60);
    doc.text(`Interest Rate: ${interestRate}%`, 20, 70);
    doc.text(`Loan Term: ${loanTerm} years`, 20, 80);
    doc.text(`Monthly Payment: $${monthlyPayment}`, 20, 90);
    doc.text(`Total Interest: $${totalInterest}`, 20, 100);
    doc.text(`Total Payment: $${totalPayment}`, 20, 110);
    doc.save('mortgage_calculation.pdf');
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 mb-8 mt-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaHome />
          Mortgage Calculator
        </h2>
        <div className="flex gap-2">
          <button
            onClick={resetCalculator}
            className="flex items-center gap-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 transition"
          >
            <FaRedo />
            Reset
          </button>
          <button
            onClick={downloadPDF}
            className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition"
          >
            <FaFilePdf />
            Download PDF
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Home Price</label>
        <input
          type="number"
          value={homePrice}
          onChange={handleHomePriceChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment ($)</label>
          <input
            type="number"
            value={downPayment}
            onChange={handleDownPaymentChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment (%)</label>
          <input
            type="number"
            value={downPaymentPercent}
            onChange={handleDownPaymentPercentChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
        <input
          type="number"
          value={loanAmount}
          readOnly
          className="w-full bg-gray-100 rounded-md border-gray-300 shadow-sm py-2 px-3 border"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
        <input
          type="number"
          value={interestRate}
          onChange={handleInterestRateChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (years)</label>
        <div className="flex gap-2 flex-wrap">
          {[10, 15, 20, 30].map((term) => (
            <button
              key={term}
              onClick={() => handleLoanTermChange(term)}
              className={`px-4 py-2 rounded-md ${
                loanTerm === term ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {term} years
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <FaCalculator />
          Monthly Payment
        </h3>
        <div className="text-3xl font-bold text-blue-600 mb-2">${monthlyPayment}</div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <div className="text-sm text-gray-600">Total Interest</div>
            <div className="font-semibold">${totalInterest}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Total Payment</div>
            <div className="font-semibold">${totalPayment}</div>
          </div>
        </div>
      </div>

      {/* How to Use - Articles */}
      <div className="mt-10 space-y-6 text-gray-800">
        <div>
          <h3 className="text-xl font-bold mb-2">📌 How to Use the Mortgage Calculator</h3>
          <p>
            To begin, enter the total price of the home you want to purchase. Then, either type in the amount you're putting down as a down payment or adjust the percentage. The loan amount will automatically adjust based on these values. Select your interest rate and loan term to get your monthly mortgage payment, total interest, and total payment details.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">📘 Understanding the Mortgage Results</h3>
          <p>
            The Monthly Payment is the amount you'll pay each month, including interest. The Total Interest is how much you'll pay over the life of the loan just in interest. The Total Payment includes both the principal and the interest together. These figures help you plan your finances better.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">📤 Exporting Results as PDF</h3>
          <p>
            After filling out the fields and calculating your mortgage, click on the "Download PDF" button to save your results. This PDF includes all your inputs and calculated results, making it easy to print or share.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
