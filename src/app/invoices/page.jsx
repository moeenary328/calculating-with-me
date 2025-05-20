'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiDocumentText,
  HiDocumentReport,
  HiDocumentDuplicate,
  HiReceiptRefund,
  HiClipboardList,
  HiCurrencyDollar,
  HiDocumentAdd
} from 'react-icons/hi';

const sections = [
  {
    title: '📄 PDF Download',
    buttons: [
      { name: 'Invoice', icon: HiDocumentText },
      { name: 'Tax Invoice', icon: HiDocumentReport },
      { name: 'Proforma Invoice', icon: HiDocumentDuplicate },
      { name: 'Receipt', icon: HiReceiptRefund },
      { name: 'Sales Receipt', icon: HiClipboardList },
      { name: 'Cash Receipt', icon: HiCurrencyDollar }
    ]
  },
  {
    title: '🧾 Invoice Maker',
    buttons: [
      { name: 'Quote', icon: HiDocumentAdd },
      { name: 'Estimate', icon: HiDocumentText },
      { name: 'Credit Memo', icon: HiClipboardList },
      { name: 'Credit Note', icon: HiReceiptRefund }
    ]
  }
];

export default function InvoicesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-4 py-10">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Explore Invoice & PDF Tools
        </motion.h1>

        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-6">{section.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {section.buttons.map(({ name, icon: Icon }) => (
                <Link
                  key={name}
                  href={`/${name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:bg-blue-50 dark:hover:bg-blue-900 transition duration-300 shadow hover:shadow-xl transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-blue-600 dark:text-blue-400 text-3xl">
                      <Icon />
                    </div>
                    <div>
                      <p className="text-lg font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition">
                        {name}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
