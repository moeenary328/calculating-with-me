'use client';

import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import {
  FaCalculator,
  FaFileInvoiceDollar,
  FaBolt,
  FaMagic,
  FaTools,
  FaPenFancy,
  FaRocket,
  FaStar,
  FaCrown,
  FaHeart,
  FaChartLine,
  FaShieldAlt,
  FaAward,
  FaLightbulb,
  FaGlobe,
  FaUsers,
  FaArrowRight,
  FaInfinity,
  FaLock,
  FaBrain
} from 'react-icons/fa';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function HomePage() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, 49, { duration: 3 });
      return animation.stop;
    }
  }, [isInView, count]);

  // Particle background component
  const ParticleBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 1,
              height: Math.random() * 6 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `rgba(99, 102, 241, ${Math.random() * 0.4})`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 30 - 15],
              opacity: [0, Math.random() * 0.8 + 0.2, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    );
  };

  // Animated numbers component
  const AnimatedCounter = ({ value, label, color }) => {
    return (
      <motion.div 
        className="text-center p-6 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-purple-500/20 shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ 
          scale: 1.05, 
          boxShadow: "0 0 30px rgba(99, 102, 241, 0.5)",
          transition: { duration: 0.3 }
        }}
      >
        <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
          +<motion.span>{rounded}</motion.span>
        </div>
        <div className="text-purple-200/80 mt-2 text-sm font-medium">{label}</div>
      </motion.div>
    );
  };

  // Feature card component
  const FeatureCard = ({ icon, title, description, delay, color }) => {
    return (
      <motion.div
        className="group relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-purple-500/20 shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay }}
        whileHover={{ 
          y: -10, 
          boxShadow: "0 0 40px rgba(99, 102, 241, 0.4)",
          transition: { duration: 0.3 }
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className={`p-4 bg-gradient-to-br ${color} rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
              {icon}
            </div>
          </div>
          <h3 className="text-xl font-bold text-center mb-4 text-white">{title}</h3>
          <p className="text-purple-200/70 text-center text-sm leading-relaxed">{description}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-900/20 rounded-full mix-blend-soft-light filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-900/20 rounded-full mix-blend-soft-light filter blur-3xl"></div>
        <ParticleBackground />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik02MCAwSDBWNk0wIDBoNjAiIHN0cm9rZT0icmdiYSg5OSwxMDIsMjQxLDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-10 z-0" />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header section */}
        <motion.div 
          className="text-center mb-20 mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center px-5 py-3 mb-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-purple-500/30"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            <FaCrown className="mr-2 text-amber-300" />
            ELITE CALCULATION PLATFORM
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Calculate
            </span>
            <span className="block mt-2">With <span className="text-purple-400">Absolute</span> Precision</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-purple-200 mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Advanced <span className="font-semibold text-purple-400">calculation ecosystem</span> designed for professionals who demand excellence, speed, and flawless execution.
          </motion.p>

          {/* Stats Section */}
          <motion.div 
            ref={ref}
            className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <AnimatedCounter value={49} label="Premium Tools" color="from-purple-400 to-pink-400" />
            <AnimatedCounter value={100} label="Accuracy Rate" color="from-green-400 to-cyan-400" />
            <AnimatedCounter value={24} label="Available Hours" color="from-amber-300 to-amber-500" />
            <AnimatedCounter value={0} label="Learning Curve" color="from-rose-400 to-rose-500" />
          </motion.div>

          {/* Buttons Section */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, type: 'spring' }}
          >
            <Link
              href="/calculators"
              className="group relative w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50"
            >
              <FaCalculator className="text-xl" />
              Explore Calculators
              <motion.span 
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaArrowRight />
              </motion.span>
            </Link>

            <Link
              href="/invoices"
              className="group w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-purple-500/30 px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg backdrop-blur-sm"
            >
              <FaFileInvoiceDollar className="text-xl" />
              Create Invoices
            </Link>

            <Link
              href="/text-tools"
              className="group w-full sm:w-auto bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50"
            >
              <FaPenFancy className="text-xl" />
              Text Tools
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          <FeatureCard 
            icon={<FaBolt className="text-3xl text-amber-400" />} 
            title="Lightning Fast" 
            description="Real-time calculations with instant results and no waiting times for maximum productivity."
            delay={0}
            color="from-amber-500 to-amber-600"
          />
          <FeatureCard 
            icon={<FaMagic className="text-3xl text-purple-400" />} 
            title="AI Powered" 
            description="Intelligent algorithms that learn from your usage patterns and provide smart suggestions."
            delay={0.1}
            color="from-purple-500 to-purple-600"
          />
          <FeatureCard 
            icon={<FaChartLine className="text-3xl text-cyan-400" />} 
            title="Data Visualization" 
            description="Beautiful charts and graphs to help you understand your data and make informed decisions."
            delay={0.2}
            color="from-cyan-500 to-cyan-600"
          />
          <FeatureCard 
            icon={<FaLock className="text-3xl text-green-400" />} 
            title="Secure & Private" 
            description="Bank-level security ensures your data remains confidential and protected at all times."
            delay={0.3}
            color="from-green-500 to-green-600"
          />
          <FeatureCard 
            icon={<FaAward className="text-3xl text-amber-400" />} 
            title="Award-Winning Design" 
            description="Elegant UI with smooth animations and thoughtful interactions that delight users."
            delay={0.4}
            color="from-amber-500 to-amber-600"
          />
          <FeatureCard 
            icon={<FaBrain className="text-3xl text-indigo-400" />} 
            title="Smart Technology" 
            description="Cutting-edge tools that you won't find anywhere else, designed to give you an advantage."
            delay={0.5}
            color="from-indigo-500 to-indigo-600"
          />
        </motion.div>

        {/* Testimonial Section */}
        <motion.div
          className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl p-10 text-white shadow-2xl mb-20 border border-purple-500/20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-5xl mb-4 text-purple-500">"</div>
          <p className="text-xl italic mb-6 text-purple-200">
            This platform has completely transformed how I work with numbers. The elegant interface combined with 
            powerful calculation capabilities has saved me countless hours and made complex tasks simple. It's simply the best calculation suite I've ever used.
          </p>
          <div className="flex items-center">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
              <FaGlobe className="text-white text-xl" />
            </div>
            <div>
              <div className="font-semibold text-lg">Alex Morgan</div>
              <div className="text-purple-300">Financial Analyst at GlobalCorp</div>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Ready to Revolutionize Your Workflow?</h2>
          <p className="text-purple-200 mb-10 text-xl">
            Join thousands of professionals who have already elevated their productivity with our advanced tools.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link
              href="/calculators"
              className="relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center">
                Get Started Now
                <FaRocket className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link
              href="/demo"
              className="relative inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-purple-500/30 backdrop-blur-sm"
            >
              <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center">
                View Live Demo
                <FaUsers className="ml-2" />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          className="pt-12 border-t border-purple-500/20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-purple-300">
            Crafted with <FaHeart className="inline text-rose-500 mx-1" /> for professionals who value precision and elegance
          </p>
          <p className="text-sm text-purple-400 mt-3">© 2023 Calculating with Me. All rights reserved.</p>
        </motion.div>
      </div>

      {/* Sidebar Toggle Button */}
      <motion.button
        className="fixed left-6 top-6 z-50 p-3 bg-purple-600 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        onClick={() => setSidebarVisible(!sidebarVisible)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaBars className="text-white" />
      </motion.button>

      {/* Sidebar */}
      <motion.div
        className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-gray-950 to-black z-40 shadow-2xl border-r border-purple-500/20"
        initial={{ x: -320 }}
        animate={{ x: sidebarVisible ? 0 : -320 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-bold text-white">Navigation</h2>
            <button 
              onClick={() => setSidebarVisible(false)}
              className="text-purple-300 hover:text-white"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
          
          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <Link href="/calculators" className="flex items-center px-4 py-3 text-purple-200 hover:bg-purple-900/50 rounded-lg transition-colors">
                  <FaCalculator className="mr-3 text-purple-400" />
                  Calculators
                </Link>
              </li>
              <li>
                <Link href="/invoices" className="flex items-center px-4 py-3 text-purple-200 hover:bg-purple-900/50 rounded-lg transition-colors">
                  <FaFileInvoiceDollar className="mr-3 text-purple-400" />
                  Invoices
                </Link>
              </li>
              <li>
                <Link href="/text-tools" className="flex items-center px-4 py-3 text-purple-200 hover:bg-purple-900/50 rounded-lg transition-colors">
                  <FaPenFancy className="mr-3 text-purple-400" />
                  Text Tools
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="pt-6 border-t border-purple-500/20">
            <p className="text-sm text-purple-400 text-center">Premium Calculation Suite</p>
          </div>
        </div>
      </motion.div>

      {/* Overlay when sidebar is open */}
      {sidebarVisible && (
        <motion.div 
          className="fixed inset-0 bg-black/70 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSidebarVisible(false)}
        />
      )}
    </div>
  );
}

// We need to define FaBars and FaTimes icons
const FaBars = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1.2em" width="1.2em">
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>
);

const FaTimes = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 352 512" height="1.2em" width="1.2em">
    <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
  </svg>
);



// 'use client';

// import { motion } from 'framer-motion';
// import {
//   FaCalculator,
//   FaFileInvoiceDollar,
//   FaBolt,
//   FaMagic,
//   FaTools,
//   FaPenFancy
// } from 'react-icons/fa';
// import Link from 'next/link';

// export default function HomePage() {
//   return (
//     <div className="min-h-screen w-full bg-white text-gray-900 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
//       <motion.div
//         className="max-w-6xl w-full text-center py-16 sm:py-20"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         {/* Heading */}
//         <motion.h1
//           className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-snug bg-gradient-to-r from-pink-600 via-gray-700 to-amber-700 text-transparent bg-clip-text"
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           Discover the Magic of <br className="hidden sm:block" /> Calculating with Me
//         </motion.h1>

//         {/* Subheading */}
//         <motion.p
//           className="text-base sm:text-xl md:text-2xl text-gray-700 mt-4 sm:mt-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           49+ Tools that <span className="text-purple-600 font-bold">simplify life</span>, <span className="text-green-600 font-bold">save time</span>, and make you <span className="text-pink-600 font-bold">look smarter</span>.
//         </motion.p>

//         {/* Buttons Section */}
//         <motion.div
//           className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 flex-wrap"
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ delay: 0.6, type: 'spring' }}
//         >
//           <Link
//             href="/calculators"
//             className="group w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg text-base sm:text-lg font-semibold flex items-center justify-center gap-2 transition hover:scale-105"
//           >
//             <FaCalculator className="text-lg sm:text-xl" />
//             View Calculators
//           </Link>

//           <Link
//             href="/invoices"
//             className="group w-full sm:w-auto bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg text-base sm:text-lg font-semibold flex items-center justify-center gap-2 transition hover:scale-105"
//           >
//             <FaFileInvoiceDollar className="text-lg sm:text-xl" />
//             View Invoices
//           </Link>

//           <Link
//             href="/text-tools"
//             className="group w-full sm:w-auto bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg text-base sm:text-lg font-semibold flex items-center justify-center gap-2 transition hover:scale-105"
//           >
//             <FaPenFancy className="text-lg sm:text-xl" />
//             Text Tools
//           </Link>
//         </motion.div>

//         {/* Feature Cards */}
//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-16"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           transition={{ staggerChildren: 0.2 }}
//         >
//           {[{
//             title: 'Instant Answers',
//             desc: 'No formulas needed. Get results in real-time.',
//             icon: <FaBolt className="text-3xl sm:text-4xl text-yellow-500 mx-auto mb-3" />,
//           }, {
//             title: 'Smart Invoices',
//             desc: 'Professional receipts with branding support.',
//             icon: <FaFileInvoiceDollar className="text-3xl sm:text-4xl text-green-600 mx-auto mb-3" />,
//           }, {
//             title: 'Designed for You',
//             desc: 'Simple UI with beautiful animations & dark mode.',
//             icon: <FaMagic className="text-3xl sm:text-4xl text-pink-500 mx-auto mb-3" />,
//           }, {
//             title: '49++ Tools Ready',
//             desc: 'From EMI to Tax to Scientific Math & more.',
//             icon: <FaTools className="text-3xl sm:text-4xl text-purple-600 mx-auto mb-3" />,
//           }].map((item, i) => (
//             <motion.div
//               key={i}
//               className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
//               variants={{
//                 hidden: { opacity: 0, y: 40 },
//                 visible: { opacity: 1, y: 0 },
//               }}
//             >
//               {item.icon}
//               <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{item.title}</h3>
//               <p className="text-sm sm:text-base text-gray-600">{item.desc}</p>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Articles Section */}
//         <motion.div
//           className="mt-20 space-y-10 sm:space-y-12 text-left"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.2 }}
//         >
//           <div className="bg-white shadow-lg rounded-xl p-5 sm:p-6 border-l-4 border-purple-500">
//             <h2 className="text-xl sm:text-2xl font-bold text-purple-700 mb-2 sm:mb-3">Why You Need Smart Calculators in 2025</h2>
//             <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
//               In today's fast-paced world, traditional methods of calculating taxes, interests, or expenses slow you down. Smart calculators are more than just math tools — they offer instant results, smart error handling, dynamic visuals, and automatic formatting. Whether you're calculating a mortgage, body mass index, or investment returns, our calculators make it intuitive, quick, and beautiful.
//             </p>
//           </div>

//           <div className="bg-white shadow-lg rounded-xl p-5 sm:p-6 border-l-4 border-green-500">
//             <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-2 sm:mb-3">How to Use This Platform Effectively</h2>
//             <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
//               Start by exploring the calculator section that fits your needs — Finance, Health, Math, or Invoicing. Use the live preview, enter your data, and get real-time results. Customize invoices, export PDFs, or reverse your text instantly. This platform is designed with simplicity and power in mind — no learning curve, just results.
//             </p>
//           </div>
//         </motion.div>

//         {/* Footer Text */}
//         <motion.div
//           className="mt-16 sm:mt-20 text-sm sm:text-lg text-gray-600 text-center leading-relaxed"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.5 }}
//         >
//           <p>please try these tools and enjoy them for free</p>
//           <p className="mt-2">✨ Built with ❤️ — unlimited free access to all tools for your life</p>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }


