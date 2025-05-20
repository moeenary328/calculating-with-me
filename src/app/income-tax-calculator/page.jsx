"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState("");
  const [tax, setTax] = useState(undefined);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const calculateTax = () => {
    const incomeNum = parseFloat(income);
    if (isNaN(incomeNum)) {
      setTax(undefined);
      return;
    }

    let calculatedTax = 0;

    if (incomeNum <= 600000) {
      calculatedTax = 0;
    } else if (incomeNum <= 1200000) {
      calculatedTax = (incomeNum - 600000) * 0.05;
    } else if (incomeNum <= 1800000) {
      calculatedTax = 30000 + (incomeNum - 1200000) * 0.1;
    } else if (incomeNum <= 2500000) {
      calculatedTax = 90000 + (incomeNum - 1800000) * 0.15;
    } else if (incomeNum <= 3500000) {
      calculatedTax = 195000 + (incomeNum - 2500000) * 0.175;
    } else if (incomeNum <= 5000000) {
      calculatedTax = 370000 + (incomeNum - 3500000) * 0.2;
    } else {
      calculatedTax = 670000 + (incomeNum - 5000000) * 0.22;
    }

    setTax(calculatedTax);
  };

  if (!hydrated) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-900 shadow-2xl backdrop-blur-md bg-opacity-70 dark:bg-opacity-60 rounded-2xl p-8 max-w-md w-full text-center mb-8"
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
          Income Tax Calculator
        </h2>
        <input
          type="number"
          inputMode="numeric"
          placeholder="Enter Annual Income (PKR)"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
        />
        <button
          onClick={calculateTax}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 px-6 rounded-md"
        >
          Calculate Tax
        </button>

        {typeof tax === "number" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-4 bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100 rounded-md shadow"
          >
            <p className="text-lg font-medium">
              Your estimated tax is:
              <br />
              <span className="text-2xl font-bold">
                PKR {Intl.NumberFormat("en-PK").format(tax)}
              </span>
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Instructional Article */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 text-gray-800 dark:text-gray-100 prose dark:prose-invert"
      >
        <h2 className="text-2xl font-bold mb-4">How to Use the Income Tax Calculator</h2>
        <p>
          This income tax calculator helps you estimate your annual tax liability in Pakistan
          based on the current tax slabs for salaried individuals.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Enter your <strong>gross annual income</strong> in PKR (before tax and deductions).</li>
          <li>Click on the <strong>"Calculate Tax"</strong> button to see your estimated income tax.</li>
          <li>The calculator uses latest <strong>Pakistan tax slabs</strong> for quick and accurate results.</li>
        </ul>
        <p>
          Please note: This calculator provides an estimate only. For accurate tax filing,
          consult a professional tax advisor or FBR guidelines.
        </p>
        <p>
          This tool is updated for <strong>FY 2024-2025</strong>. If you are self-employed,
          consult separate tax brackets.
        </p>
      </motion.article>
    </div>
  );
}
