
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  FaAngleDoubleLeft, FaAngleDoubleRight, FaSearch, FaChevronDown,
  FaCalculator, FaCar, FaHome, FaMoneyCheckAlt, FaChartLine, FaPiggyBank,
  FaUniversity, FaCashRegister, FaPercent, FaLaptop, FaCogs, FaUserTie,
  FaUserGraduate, FaUsers, FaCalendarAlt, FaCube, FaExchangeAlt,
  FaNetworkWired, FaFingerprint, FaClock, FaWrench, FaTools
} from 'react-icons/fa';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [openCategory, setOpenCategory] = useState('Finance');
  const [searchQuery, setSearchQuery] = useState('');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCategory = (category) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  const categories = [
    {
      name: 'Finance',
      icon: <FaMoneyCheckAlt />,
      items: [
        { label: 'Mortgage Calculator', icon: <FaHome />, href: '/mortgage-calculator' },
        { label: 'Loan Calculator', icon: <FaCalculator />, href: '/loan-calculator' },
        { label: 'Auto Loan Calculator', icon: <FaCar />, href: '/auto-loan-calculator' },
        { label: 'Interest Calculator', icon: <FaMoneyCheckAlt />, href: '/interest-calculator' },
        { label: 'Payment Calculator', icon: <FaClock />, href: '/payment-calculator' },
        { label: 'Retirement Calculator', icon: <FaPiggyBank />, href: '/retirement-calculator' },
        { label: 'Amortization Calculator', icon: <FaUserTie />, href: '/amortization-calculator' },
        { label: 'Investment Calculator', icon: <FaChartLine />, href: '/investment-calculator' },
        { label: 'Inflation Calculator', icon: <FaPercent />, href: '/inflation-calculator' },
        { label: 'Finance Calculator', icon: <FaUniversity />, href: '/finance-calculator' },
        { label: 'Income Tax Calculator', icon: <FaCashRegister />, href: '/income-tax-calculator' },
        { label: 'Compound Interest Calculator', icon: <FaLaptop />, href: '/compound-interest-calculator' },
        { label: 'Salary Calculator', icon: <FaWrench />, href: '/salary-calculator' },
        { label: 'Interest Rate Calculator', icon: <FaCalendarAlt />, href: '/interest-rate-calculator' },
        { label: 'Sales Tax Calculator', icon: <FaCogs />, href: '/sales-tax-calculator' },
      ],
    },
    {
      name: 'Math',
      icon: <FaCalculator />,
      items: [
        { label: 'Math Calculators', icon: <FaCalculator />, href: '/math-calculator' },
        { label: 'Scientific Calculator', icon: <FaCalculator />, href: '/scientific-calculator' },
        { label: 'Fraction Calculator', icon: <FaCalculator />, href: '/fraction-calculator' },
        { label: 'Percentage Calculator', icon: <FaPercent />, href: '/percentage-calculator' },
        { label: 'Triangle Calculator', icon: <FaChartLine />, href: '/triangle-calculator' },
        { label: 'Standard Deviation Calculator', icon: <FaUserGraduate />, href: '/standard-deviation-calculator' },
      ],
    },
    {
      name: 'Date & Time',
      icon: <FaCalendarAlt />,
      items: [
        { label: 'Due Date Calculator', icon: <FaUserGraduate />, href: '/due-date-calculator' },
        { label: 'Age Calculator', icon: <FaUsers />, href: '/age-calculator' },
        { label: 'Date Calculator', icon: <FaCalendarAlt />, href: '/date-calculator' },
        { label: 'Time Calculator', icon: <FaClock />, href: '/time-calculator' },
        { label: 'Hours Calculator', icon: <FaClock />, href: '/hours-calculator' },
        { label: 'GPA Calculator', icon: <FaUserGraduate />, href: '/gpa-calculator' },
        { label: 'Grade Calculator', icon: <FaUserGraduate />, href: '/grade-calculator' },
      ],
    },
    {
      name: 'Utilities',
      icon: <FaTools />,
      items: [
        { label: 'Concrete Calculator', icon: <FaCube />, href: '/concrete-calculator' },
        { label: 'Subnet Calculator', icon: <FaNetworkWired />, href: '/subnet-calculator' },
        { label: 'Password Generator', icon: <FaFingerprint />, href: '/password-generator' },
        { label: 'Random Number Generator', icon: <FaCube />, href: '/random-number-generator' },
        { label: 'Conversion Calculator', icon: <FaExchangeAlt />, href: '/conversion-calculator' },
      ],
    },
  ];

  const filteredCategories = categories.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  return (
    <aside className={`h-screen sticky top-0 transition-all duration-300 bg-gray-900 text-white ${isOpen ? 'w-64' : 'w-20'}`}>
      {/* Header */}
      <div className="flex justify-between items-center p-3">
        {isOpen && (
          <div className="flex items-center gap-2 text-gray-300 text-lg font-semibold">
            <FaCalculator />
            <span>Tools</span>
          </div>
        )}
        <button type="button" onClick={toggleSidebar} className="text-white text-xl hover:text-gray-300">
          {isOpen ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
        </button>
      </div>

      {/* Search */}
      {isOpen && (
        <div className="px-3 pb-2">
          <div className="relative text-sm">
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-800 text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-2 top-2.5 text-gray-400" />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="overflow-y-auto h-[calc(100vh-80px)] px-2 pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 space-y-1">
        {filteredCategories.map((category) =>
          category.items.length > 0 ? (
            <div key={category.name}>
              <button
                type="button"
                onClick={() => toggleCategory(category.name)}
                className="w-full flex items-center justify-between p-2 text-left text-sm font-semibold text-gray-300 hover:bg-gray-700 rounded-md transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  {isOpen && <span>{category.name}</span>}
                </div>
                {isOpen && (
                  <FaChevronDown
                    className={`transition-transform duration-300 ${openCategory === category.name ? 'rotate-180' : ''}`}
                  />
                )}
              </button>

              {openCategory === category.name && (
                <div className="ml-6 space-y-1 mt-1 transition-all duration-200">
                  {category.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex items-center gap-3 p-2 rounded-md text-sm transition-all duration-200 ${
                        pathname === item.href
                          ? 'bg-gray-700 font-semibold'
                          : 'hover:bg-gray-700 hover:translate-x-1'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      {isOpen && (
                        <>
                          <span className="block group-hover:hidden">{item.label}</span>
                          <span className="hidden group-hover:block text-gray-300">{`→ ${item.label}`}</span>
                        </>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : null
        )}
      </nav>
    </aside>
  );
}

