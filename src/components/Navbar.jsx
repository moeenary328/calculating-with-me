'use client'

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  HiOutlineSearch,
  HiOutlineInformationCircle,
  HiOutlineBriefcase,
  HiOutlinePhone,
  HiChevronDown,
  HiMenu,
  HiX,
  HiDocumentText,
  HiClipboardList,
  HiCurrencyDollar,
  HiDocumentReport,
  HiDocumentDuplicate,
  HiReceiptRefund,
  HiClipboardCheck,
  HiViewBoards,
  HiDocumentAdd
} from 'react-icons/hi';

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef();

  // Set mounted to true after component has mounted
  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Don't render anything until the component is mounted
  if (!mounted) return null;

  const dropdowns = {
    'PDF Download': [
      { name: 'Invoice', icon: HiDocumentText },
      { name: 'Tax Invoice', icon: HiDocumentReport },
      { name: 'Proforma Invoice', icon: HiDocumentDuplicate },
      { name: 'Receipt', icon: HiReceiptRefund },
      { name: 'Sales Receipt', icon: HiClipboardList },
      { name: 'Cash Receipt', icon: HiCurrencyDollar }
    ],
    'Invoice Maker': [
      { name: 'Quote', icon: HiDocumentAdd },
      { name: 'Estimate', icon: HiDocumentText },
      { name: 'Credit Memo', icon: HiClipboardList },
      { name: 'Credit Note', icon: HiReceiptRefund }
    ],
    'Text Tools': [
      { name: 'Word Counter', icon: HiViewBoards },
      { name: 'Extra Space Remover', icon: HiClipboardCheck },
      { name: 'Duplicate Line Remover', icon: HiDocumentAdd },
      { name: 'Reverse Text', icon: HiDocumentText },
      { name: 'Uppercase to Lowercase', icon: HiViewBoards }
    ]
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/calculating.png" alt="logo" className="w-12 h-12" />
          <span className="text-lg font-bold text-gray-800 dark:text-white">Calculating with Me</span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:block flex-1 mx-6">
          <form onSubmit={(e) => e.preventDefault()} className="relative">
            <input
              type="text"
              placeholder="Search with Me ..."
              className="w-full pl-12 pr-16 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <HiOutlineSearch className="absolute left-4 top-2.5 text-gray-500 dark:text-gray-400 text-lg" />
            <button
              type="submit"
              className="absolute right-2 top-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm transition cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4" ref={dropdownRef}>
          {Object.entries(dropdowns).map(([title, items]) => (
            <div key={title} className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === title ? null : title)}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition ${
                  openDropdown === title
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                {title}
                <HiChevronDown className="text-lg" />
              </button>

              {openDropdown === title && (
                <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 overflow-hidden">
                  {items.map(({ name, icon: Icon }) => (
                    <Link
                      key={name}
                      href={`/${name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-600 hover:text-blue-900 dark:hover:text-white transition"
                    >
                      <Icon className="text-lg" />
                      {name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link href="/about" className="flex items-center gap-1 text-gray-700 font-bold dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
            <HiOutlineInformationCircle className="text-lg" />
            <span>About</span>
          </Link>
          <Link href="/services" className="flex items-center gap-1 text-gray-700 font-bold dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
            <HiOutlineBriefcase className="text-lg" />
            <span>Services</span>
          </Link>
          <Link href="/contact" className="flex items-center gap-1 text-gray-700 font-bold dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
            <HiOutlinePhone className="text-lg" />
            <span>Contact</span>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-2xl text-gray-800 dark:text-white">
          {mobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          {Object.entries(dropdowns).map(([title, items]) => (
            <div key={title} className="px-4">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">{title}</p>
              <div className="space-y-1">
                {items.map(({ name, icon: Icon }) => (
                  <Link
                    key={name}
                    href={`/${name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 rounded hover:bg-blue-100 dark:hover:bg-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="text-lg" />
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="px-4 space-y-2">
            <Link href="/about" className="block font-bold text-gray-900 dark:text-white hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/services" className="block font-bold text-gray-900 dark:text-white hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link href="/contact" className="block font-bold text-gray-900 dark:text-white hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
