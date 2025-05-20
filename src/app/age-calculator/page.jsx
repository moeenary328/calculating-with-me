'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { 
  FaBirthdayCake, 
  FaUser, 
  FaClock, 
  FaHeartbeat, 
  FaShareAlt, 
  FaChartLine 
} from 'react-icons/fa';
import { 
  IoMdClose, 
  IoIosInformationCircle 
} from 'react-icons/io';
import { 
  MdCelebration, 
  MdCake 
} from 'react-icons/md';

const ProfessionalAgeCalculator = () => {
  // State for user data
  const [userData, setUserData] = useState({
    name: '',
    birthDate: ''
  });
  
  // State for age calculation
  const [age, setAge] = useState(null);
  
  // State for statistics
  const [stats, setStats] = useState({
    timeAlive: {
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
      weeks: 0,
      months: 0
    },
    lifeStats: {
      heartbeats: 0,
      breaths: 0,
      sleeps: 0
    }
  });
  
  // State for meta information
  const [metaInfo, setMetaInfo] = useState({
    nextBirthday: '',
    zodiacSign: '',
    generation: ''
  });
  
  // State for UI
  const [uiState, setUiState] = useState({
    showDetails: false,
    error: '',
    isCalculating: false
  });
  
  // State to track client-side mounting
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate time alive and life statistics
  useEffect(() => {
    if (!isClient || !uiState.showDetails || !userData.birthDate) return;

    const calculateTimeAlive = () => {
      const now = new Date();
      const birthDate = new Date(userData.birthDate);
      const diff = now - birthDate;

      // Time alive calculations
      const milliseconds = diff;
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);
      const months = age ? age.years * 12 + age.months : 0;

      // Life statistics (approximations)
      const averageHeartRate = 75;
      const averageBreathingRate = 16;
      const averageSleepPerDay = 8;

      setStats({
        timeAlive: { milliseconds, seconds, minutes, hours, days, weeks, months },
        lifeStats: {
          heartbeats: Math.floor(minutes * averageHeartRate),
          breaths: Math.floor(minutes * averageBreathingRate),
          sleeps: Math.floor(days * averageSleepPerDay)
        }
      });
    };

    calculateTimeAlive(); // Initial calculation
    
    const interval = setInterval(calculateTimeAlive, 1000);
    return () => clearInterval(interval);
  }, [isClient, uiState.showDetails, userData.birthDate, age]);

  // Calculate age from birth date
  const calculateAge = () => {
    if (!isClient) return;

    // Validation
    if (!userData.birthDate) {
      setUiState(prev => ({ ...prev, error: 'Please enter your birth date' }));
      return;
    }

    const today = new Date();
    const birthDate = new Date(userData.birthDate);

    if (birthDate > today) {
      setUiState(prev => ({ ...prev, error: 'Birth date cannot be in the future' }));
      setAge(null);
      return;
    }

    setUiState(prev => ({ ...prev, isCalculating: true, error: '' }));

    // Calculate age
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust for negative days/months
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
    calculateMetaInfo(birthDate);
    setUiState(prev => ({ ...prev, showDetails: true, isCalculating: false }));
  };

  // Calculate meta information (zodiac, generation, etc.)
  const calculateMetaInfo = (birthDate) => {
    if (!isClient) return;

    const today = new Date();
    const currentYear = today.getFullYear();
    let nextBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
    
    if (today > nextBirthday) {
      nextBirthday.setFullYear(currentYear + 1);
    }

    // Zodiac sign determination
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    let zodiacSign = '';
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) zodiacSign = 'Aries ♈';
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) zodiacSign = 'Taurus ♉';
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) zodiacSign = 'Gemini ♊';
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) zodiacSign = 'Cancer ♋';
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) zodiacSign = 'Leo ♌';
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) zodiacSign = 'Virgo ♍';
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) zodiacSign = 'Libra ♎';
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) zodiacSign = 'Scorpio ♏';
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) zodiacSign = 'Sagittarius ♐';
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) zodiacSign = 'Capricorn ♑';
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) zodiacSign = 'Aquarius ♒';
    else zodiacSign = 'Pisces ♓';

    // Generation determination
    const birthYear = birthDate.getFullYear();
    let generation = '';
    
    if (birthYear >= 2013) generation = 'Gen Alpha';
    else if (birthYear >= 1997) generation = 'Gen Z';
    else if (birthYear >= 1981) generation = 'Millennials';
    else if (birthYear >= 1965) generation = 'Gen X';
    else if (birthYear >= 1946) generation = 'Baby Boomers';
    else if (birthYear >= 1928) generation = 'Silent Generation';
    else generation = 'Greatest Generation';

    setMetaInfo({
      nextBirthday: nextBirthday.toDateString(),
      zodiacSign,
      generation
    });
  };

  // Reset calculator to initial state
  const resetCalculator = () => {
    setUserData({ name: '', birthDate: '' });
    setAge(null);
    setStats({
      timeAlive: {
        milliseconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0,
        weeks: 0,
        months: 0
      },
      lifeStats: {
        heartbeats: 0,
        breaths: 0,
        sleeps: 0
      }
    });
    setMetaInfo({
      nextBirthday: '',
      zodiacSign: '',
      generation: ''
    });
    setUiState({
      showDetails: false,
      error: '',
      isCalculating: false
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <Head>
        <title>Professional Age Calculator | Track Your Life in Milliseconds</title>
        <meta name="description" content="Calculate your exact age down to the millisecond. Discover fascinating life statistics including heartbeats, breaths, sleep hours, zodiac sign, and generational information." />
        <meta name="keywords" content="age calculator, life statistics calculator, zodiac sign finder, generation calculator, birthday calculator, time alive calculator" />
        <meta property="og:title" content="Professional Age Calculator with Life Statistics" />
        <meta property="og:description" content="Discover exactly how long you've been alive with millisecond precision and fascinating life statistics." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        {/* Main Calculator */}
        {isClient && (
          <motion.div
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mb-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
              <motion.h1 
                className="text-3xl font-bold flex items-center justify-center"
                variants={itemVariants}
              >
                <MdCake className="mr-3" />
                Professional Age Calculator
              </motion.h1>
            </div>

            <div className="p-6 md:p-8">
              <motion.div className="space-y-6" variants={containerVariants}>
                <motion.div variants={itemVariants}>
                  <label className="block text-lg font-medium text-gray-800 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400 text-xl" />
                    </div>
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) => setUserData({...userData, name: e.target.value})}
                      className="pl-12 w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3 border text-lg"
                      placeholder="Enter your name"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-lg font-medium text-gray-800 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaBirthdayCake className="text-gray-400 text-xl" />
                    </div>
                    <input
                      type="date"
                      value={userData.birthDate}
                      onChange={(e) => setUserData({...userData, birthDate: e.target.value})}
                      className="pl-12 w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3 border text-lg"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </motion.div>

                {uiState.error && (
                  <motion.p 
                    className="text-red-500 text-lg font-medium p-3 bg-red-50 rounded-lg flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <IoIosInformationCircle className="mr-2 text-xl" />
                    {uiState.error}
                  </motion.p>
                )}

                <motion.div variants={itemVariants} className="pt-2">
                  <button
                    onClick={calculateAge}
                    disabled={uiState.isCalculating}
                    className={`w-full ${uiState.isCalculating ? 'bg-purple-400' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'} text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 text-lg`}
                  >
                    {uiState.isCalculating ? 'Calculating...' : 'Calculate My Age'}
                  </button>
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {uiState.showDetails && age && (
                  <motion.div
                    className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <FaUser className="mr-3 text-purple-600" />
                        {userData.name ? `${userData.name}'s Age Report` : 'Your Age Report'}
                      </h2>
                      <button
                        onClick={resetCalculator}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label="Reset calculator"
                      >
                        <IoMdClose size={24} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <motion.div
                        className="bg-white p-6 rounded-xl shadow-md border-t-4 border-purple-500"
                        variants={cardVariants}
                        whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                      >
                        <div className="text-5xl font-bold text-purple-600 mb-2">
                          {age.years}
                        </div>
                        <div className="text-gray-600 text-lg">Years</div>
                        <div className="mt-3 text-sm text-gray-500">
                          {age.years >= 18 ? 'You are an adult' : 'You are a minor'}
                        </div>
                      </motion.div>
                      <motion.div
                        className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500"
                        variants={cardVariants}
                        whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                      >
                        <div className="text-5xl font-bold text-blue-600 mb-2">
                          {age.months}
                        </div>
                        <div className="text-gray-600 text-lg">Months</div>
                        <div className="mt-3 text-sm text-gray-500">
                          {12 - age.months} months until next birthday
                        </div>
                      </motion.div>
                      <motion.div
                        className="bg-white p-6 rounded-xl shadow-md border-t-4 border-indigo-500"
                        variants={cardVariants}
                        whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                      >
                        <div className="text-5xl font-bold text-indigo-600 mb-2">
                          {age.days}
                        </div>
                        <div className="text-gray-600 text-lg">Days</div>
                        <div className="mt-3 text-sm text-gray-500">
                          {stats.timeAlive.days.toLocaleString()} total days lived
                        </div>
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div 
                        className="bg-white p-6 rounded-xl shadow-sm border"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                      >
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                          <FaClock className="mr-2 text-blue-500" />
                          Time Alive Statistics
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Milliseconds:</span>
                            <span className="font-medium">{stats.timeAlive.milliseconds.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Seconds:</span>
                            <span className="font-medium">{stats.timeAlive.seconds.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Minutes:</span>
                            <span className="font-medium">{stats.timeAlive.minutes.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Hours:</span>
                            <span className="font-medium">{stats.timeAlive.hours.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Weeks:</span>
                            <span className="font-medium">{stats.timeAlive.weeks.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Months:</span>
                            <span className="font-medium">{stats.timeAlive.months.toLocaleString()}</span>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div 
                        className="bg-white p-6 rounded-xl shadow-sm border"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                      >
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                          <FaHeartbeat className="mr-2 text-red-500" />
                          Life Statistics
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Heartbeats:</span>
                            <span className="font-medium">{stats.lifeStats.heartbeats.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Breaths:</span>
                            <span className="font-medium">{stats.lifeStats.breaths.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Hours slept:</span>
                            <span className="font-medium">{stats.lifeStats.sleeps.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Zodiac Sign:</span>
                            <span className="font-medium">{metaInfo.zodiacSign}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Generation:</span>
                            <span className="font-medium">{metaInfo.generation}</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    <motion.div 
                      className="mt-6 bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl border border-purple-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                        <MdCelebration className="mr-2 text-purple-600" />
                        Upcoming Birthday
                      </h3>
                      <p className="text-gray-700">
                        Your next birthday is on <span className="font-bold text-purple-600">{metaInfo.nextBirthday}</span>.
                      </p>
                      <p className="text-gray-700 mt-2">
                        You'll be turning <span className="font-bold text-blue-600">{age.years + 1}</span> years old!
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* User Guide Section */}
        {isClient && (
          <motion.div 
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
              <h2 className="text-2xl font-bold flex items-center justify-center">
                <IoIosInformationCircle className="mr-3" />
                How to Use the Age Calculator
              </h2>
            </div>

            <div className="p-6 md:p-8">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Simple Steps to Calculate Your Age</h3>
                <ol className="list-decimal pl-5 space-y-2 mb-6">
                  <li>Enter your name (optional)</li>
                  <li>Select your birth date using the date picker</li>
                  <li>Click "Calculate My Age"</li>
                  <li>Explore your detailed age statistics</li>
                </ol>

                <h3 className="text-xl font-semibold text-gray-800 mb-4">Understanding Your Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                      <FaClock className="mr-2" />
                      Time Alive
                    </h4>
                    <p>Shows your age broken down into different time units from milliseconds to years.</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2 flex items-center">
                      <FaHeartbeat className="mr-2" />
                      Life Statistics
                    </h4>
                    <p>Estimates of your heartbeats, breaths, and sleep hours based on average rates.</p>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Tips for Best Experience</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Use the date picker to ensure correct date format</li>
                    <li>Watch the numbers update in real-time</li>
                    <li>Compare with friends by sharing your results</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default ProfessionalAgeCalculator;