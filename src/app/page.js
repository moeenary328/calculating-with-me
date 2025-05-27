'use client';

import { motion } from 'framer-motion';
import {
  FaCalculator,
  FaFileInvoiceDollar,
  FaBolt,
  FaMagic,
  FaTools,
  FaPenFancy
} from 'react-icons/fa';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-white text-gray-900 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-6xl w-full text-center py-16 sm:py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-snug bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-transparent bg-clip-text"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Discover the Magic of <br className="hidden sm:block" /> Calculating with Me
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-base sm:text-xl md:text-2xl text-gray-700 mt-4 sm:mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          49+ Tools that <span className="text-purple-600 font-bold">simplify life</span>, <span className="text-green-600 font-bold">save time</span>, and make you <span className="text-pink-600 font-bold">look smarter</span>.
        </motion.p>

        {/* Buttons Section */}
        <motion.div
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 flex-wrap"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
        >
          <Link
            href="/calculators"
            className="group w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg text-base sm:text-lg font-semibold flex items-center justify-center gap-2 transition hover:scale-105"
          >
            <FaCalculator className="text-lg sm:text-xl" />
            View Calculators
          </Link>

          <Link
            href="/invoices"
            className="group w-full sm:w-auto bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg text-base sm:text-lg font-semibold flex items-center justify-center gap-2 transition hover:scale-105"
          >
            <FaFileInvoiceDollar className="text-lg sm:text-xl" />
            View Invoices
          </Link>

          <Link
            href="/text-tools"
            className="group w-full sm:w-auto bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg text-base sm:text-lg font-semibold flex items-center justify-center gap-2 transition hover:scale-105"
          >
            <FaPenFancy className="text-lg sm:text-xl" />
            Text Tools
          </Link>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          {[{
            title: 'Instant Answers',
            desc: 'No formulas needed. Get results in real-time.',
            icon: <FaBolt className="text-3xl sm:text-4xl text-yellow-500 mx-auto mb-3" />,
          }, {
            title: 'Smart Invoices',
            desc: 'Professional receipts with branding support.',
            icon: <FaFileInvoiceDollar className="text-3xl sm:text-4xl text-green-600 mx-auto mb-3" />,
          }, {
            title: 'Designed for You',
            desc: 'Simple UI with beautiful animations & dark mode.',
            icon: <FaMagic className="text-3xl sm:text-4xl text-pink-500 mx-auto mb-3" />,
          }, {
            title: '49++ Tools Ready',
            desc: 'From EMI to Tax to Scientific Math & more.',
            icon: <FaTools className="text-3xl sm:text-4xl text-purple-600 mx-auto mb-3" />,
          }].map((item, i) => (
            <motion.div
              key={i}
              className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {item.icon}
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{item.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Articles Section */}
        <motion.div
          className="mt-20 space-y-10 sm:space-y-12 text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="bg-white shadow-lg rounded-xl p-5 sm:p-6 border-l-4 border-purple-500">
            <h2 className="text-xl sm:text-2xl font-bold text-purple-700 mb-2 sm:mb-3">Why You Need Smart Calculators in 2025</h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              In today's fast-paced world, traditional methods of calculating taxes, interests, or expenses slow you down. Smart calculators are more than just math tools — they offer instant results, smart error handling, dynamic visuals, and automatic formatting. Whether you're calculating a mortgage, body mass index, or investment returns, our calculators make it intuitive, quick, and beautiful.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-5 sm:p-6 border-l-4 border-green-500">
            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-2 sm:mb-3">How to Use This Platform Effectively</h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Start by exploring the calculator section that fits your needs — Finance, Health, Math, or Invoicing. Use the live preview, enter your data, and get real-time results. Customize invoices, export PDFs, or reverse your text instantly. This platform is designed with simplicity and power in mind — no learning curve, just results.
            </p>
          </div>
        </motion.div>

        {/* Footer Text */}
        <motion.div
          className="mt-16 sm:mt-20 text-sm sm:text-lg text-gray-600 text-center leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p>please try these tools and enjoy them for free</p>
          <p className="mt-2">✨ Built with ❤️ — unlimited free access to all tools for your life</p>
        </motion.div>
      </motion.div>
    </div>
  );
}




