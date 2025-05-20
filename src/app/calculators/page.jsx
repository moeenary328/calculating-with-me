'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FaHome, FaCalculator, FaCar, FaMoneyCheckAlt, FaClock, FaPiggyBank,
  FaUserTie, FaChartLine, FaPercent, FaUniversity, FaCashRegister, FaLaptop,
  FaWrench, FaCalendarAlt, FaCogs, FaUserGraduate, FaUsers, FaCube, FaNetworkWired,
  FaFingerprint, FaExchangeAlt,
} from 'react-icons/fa';

const categories = [
  {
    name: 'Finance',
    icon: <FaMoneyCheckAlt className="inline-block mr-2" />,
    items: [
      { label: 'Mortgage Calculator', href: '/mortgage-calculator', icon: <FaHome /> },
      { label: 'Loan Calculator', href: '/loan-calculator', icon: <FaCalculator /> },
      { label: 'Auto Loan Calculator', href: '/auto-loan-calculator', icon: <FaCar /> },
      { label: 'Interest Calculator', href: '/interest-calculator', icon: <FaMoneyCheckAlt /> },
      { label: 'Payment Calculator', href: '/payment-calculator', icon: <FaClock /> },
      { label: 'Retirement Calculator', href: '/retirement-calculator', icon: <FaPiggyBank /> },
      { label: 'Amortization Calculator', href: '/amortization-calculator', icon: <FaUserTie /> },
      { label: 'Investment Calculator', href: '/investment-calculator', icon: <FaChartLine /> },
      { label: 'Inflation Calculator', href: '/inflation-calculator', icon: <FaPercent /> },
      { label: 'Finance Calculator', href: '/finance-calculator', icon: <FaUniversity /> },
      { label: 'Income Tax Calculator', href: '/income-tax-calculator', icon: <FaCashRegister /> },
      { label: 'Compound Interest Calculator', href: '/compound-interest-calculator', icon: <FaLaptop /> },
      { label: 'Salary Calculator', href: '/salary-calculator', icon: <FaWrench /> },
      { label: 'Interest Rate Calculator', href: '/interest-rate-calculator', icon: <FaCalendarAlt /> },
      { label: 'Sales Tax Calculator', href: '/sales-tax-calculator', icon: <FaCogs /> },
    ],
  },
  {
    name: 'Math',
    icon: <FaCalculator className="inline-block mr-2" />,
    items: [
      { label: 'Math Calculators', href: '/math-calculator', icon: <FaCalculator /> },
      { label: 'Scientific Calculator', href: '/scientific-calculator', icon: <FaCalculator /> },
      { label: 'Fraction Calculator', href: '/fraction-calculator', icon: <FaCalculator /> },
      { label: 'Percentage Calculator', href: '/percentage-calculator', icon: <FaPercent /> },
      { label: 'Triangle Calculator', href: '/triangle-calculator', icon: <FaChartLine /> },
      { label: 'Standard Deviation Calculator', href: '/standard-deviation-calculator', icon: <FaUserGraduate /> },
    ],
  },
  {
    name: 'Date & Time',
    icon: <FaCalendarAlt className="inline-block mr-2" />,
    items: [
      { label: 'Due Date Calculator', href: '/due-date-calculator', icon: <FaUserGraduate /> },
      { label: 'Age Calculator', href: '/age-calculator', icon: <FaUsers /> },
      { label: 'Date Calculator', href: '/date-calculator', icon: <FaCalendarAlt /> },
      { label: 'Time Calculator', href: '/time-calculator', icon: <FaClock /> },
      { label: 'Hours Calculator', href: '/hours-calculator', icon: <FaClock /> },
      { label: 'GPA Calculator', href: '/gpa-calculator', icon: <FaUserGraduate /> },
      { label: 'Grade Calculator', href: '/grade-calculator', icon: <FaUserGraduate /> },
    ],
  },
  {
    name: 'Utilities',
    icon: <FaWrench className="inline-block mr-2" />,
    items: [
      { label: 'Concrete Calculator', href: '/concrete-calculator', icon: <FaCube /> },
      { label: 'Subnet Calculator', href: '/subnet-calculator', icon: <FaNetworkWired /> },
      { label: 'Password Generator', href: '/password-generator', icon: <FaFingerprint /> },
      { label: 'Random Number Generator', href: '/random-number-generator', icon: <FaCube /> },
      { label: 'Conversion Calculator', href: '/conversion-calculator', icon: <FaExchangeAlt /> },
    ],
  },
];

export default function CalculatorsPage() {
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleCategory = (name) => {
    setActiveCategory(activeCategory === name ? null : name);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700 dark:text-blue-400 animate-pulse">
        Explore Our Powerful Calculators
      </h1>
      <p className="max-w-3xl mx-auto text-center mb-12 text-lg text-gray-600 dark:text-gray-300">
        Choose any category to reveal multiple tools designed to help you calculate with ease and precision.
      </p>

      <div className="max-w-5xl mx-auto space-y-6">
        {categories.map(({ name, icon, items }) => (
          <div key={name} className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
            <button
              onClick={() => toggleCategory(name)}
              className="w-full flex items-center justify-between px-6 py-4 text-left text-xl font-semibold bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              <div className="flex items-center">
                {icon}
                <span>{name}</span>
              </div>
              <span className="text-2xl">{activeCategory === name ? '−' : '+'}</span>
            </button>

            {activeCategory === name && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6 bg-white dark:bg-gray-900 rounded-b-lg">
                {items.map(({ label, href, icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-transform transform hover:scale-105"
                  >
                    <span className="text-2xl text-blue-600 dark:text-blue-400">{icon}</span>
                    <span className="text-lg font-medium">{label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
