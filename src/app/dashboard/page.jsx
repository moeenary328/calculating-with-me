"use client";

import React, { useState } from 'react';
import {
  FiTrendingUp,
  FiShoppingBag,
  FiUsers,
  FiRefreshCw,
  FiBell,
  FiSearch,
  FiEdit,
  FiTrash2,
  FiEye,
  FiPackage,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiPlus,
  FiDownload,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiStar,
  FiDollarSign,
  FiCalendar,
  FiBox,
  FiTruck,
  FiCreditCard,
  FiArrowUpRight,
  FiArrowDownRight,
  FiBarChart2,
  FiPieChart,
  FiActivity,
  FiSettings,
  FiLogOut,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiPrinter,
  FiFileText,
  FiHome,
  FiGrid,
  FiList,
  FiMoon,
  FiSun,
  FiGlobe,
  FiLock,
  FiShield,
  FiGift,
  FiAward,
  FiZap,
  FiWind,
  FiDroplet,
  FiHeart,
  FiBookmark,
  FiShare2,
  FiCopy,
  FiExternalLink,
  FiX,
  FiCpu,
  FiDatabase,
  FiCloud,
  FiServer,
  FiCode,
  FiTerminal,
  FiCommand,
  FiSliders,
  FiLayers,
  FiTarget,
  FiCompass,
  FiMap,
  FiNavigation,
  FiAnchor,
  FiAperture,
  FiCamera,
  FiVideo,
  FiImage,
  FiMonitor,
  FiTablet,
  FiSmartphone,
  FiWatch,
  FiHeadphones,
  FiSpeaker,
  FiMic,
  FiRadio,
  FiDisc,
  FiMusic,
  FiFilm,
  FiBookOpen,
  FiBook,
  FiBookmark as FiBookmarkIcon,
  FiLibrary,
  FiArchive,
  FiFolder,
  FiFolderPlus,
  FiFolderMinus,
  FiFile,
  FiFilePlus,
  FiFileMinus,
  FiFileText as FiFileTextIcon,
  FiCopy as FiCopyIcon,
  FiScissors,
  FiClipboard,
  FiPencil,
  FiPenTool,
  FiBrush,
  FiPaintBucket,
  FiDroplet as FiDropletIcon,
  FiWind as FiWindIcon,
  FiCloud as FiCloudIcon,
  FiSun as FiSunIcon,
  FiMoon as FiMoonIcon,
  FiStar as FiStarIcon,
  FiAward as FiAwardIcon,
  FiGift as FiGiftIcon,
  FiHeart as FiHeartIcon,
  FiThumbsUp,
  FiThumbsDown,
  FiSmile,
  FiFrown,
  FiMeh,
  FiAlertTriangle,
  FiInfo,
  FiHelpCircle,
  FiLifeBuoy,
  FiShield as FiShieldIcon,
  FiLock as FiLockIcon,
  FiUnlock,
  FiKey,
  FiTool,
  FiWrench,
  FiHammer,
  FiScrewdriver,
  FiCpu as FiCpuIcon,
  FiHardDrive,
  FiMonitor as FiMonitorIcon,
  FiTablet as FiTabletIcon,
  FiSmartphone as FiSmartphoneIcon,
  FiWatch as FiWatchIcon,
  FiHeadphones as FiHeadphonesIcon,
  FiSpeaker as FiSpeakerIcon,
  FiMic as FiMicIcon,
  FiRadio as FiRadioIcon,
  FiDisc as FiDiscIcon,
  FiMusic as FiMusicIcon,
  FiFilm as FiFilmIcon
} from 'react-icons/fi';

import {
  HiOutlineCalculator,
  HiOutlineChartSquareBar,
  HiOutlineChartBar,
  HiOutlineChartPie,
  HiOutlineChip,
  HiOutlineCube,
  HiOutlineCubeTransparent,
  HiOutlineDatabase,
  HiOutlineServer,
  HiOutlineCloud,
  HiOutlineCode,
  HiOutlineTerminal,
  HiOutlineCommandLine,
  HiOutlineBeaker,
  HiOutlineFlask,
  HiOutlineSparkles,
  HiOutlineLightningBolt,
  HiOutlineBolt,
  HiOutlineZap,
  HiOutlineFastForward,
  HiOutlineRewind,
  HiOutlinePlay,
  HiOutlinePause,
  HiOutlineStop,
  HiOutlineRefresh,
  HiOutlineSwitchHorizontal,
  HiOutlineSwitchVertical,
  HiOutlineArrowsExpand,
  HiOutlineArrowsCollapse,
  HiOutlineZoomIn,
  HiOutlineZoomOut,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineSortAscending,
  HiOutlineSortDescending,
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiOutlineViewBoards,
  HiOutlinePresentationChartLine,
  HiOutlinePresentationChartBar,
  HiOutlineChartSquareBar as HiOutlineChartSquareBarIcon,
  HiOutlineChartBar as HiOutlineChartBarIcon,
  HiOutlineChartPie as HiOutlineChartPieIcon,
  HiOutlineChartSquareBar as HiOutlineChartSquareBarIcon2,
  HiOutlineCurrencyDollar,
  HiOutlineCurrencyEuro,
  HiOutlineCurrencyPound,
  HiOutlineCurrencyRupee,
  HiOutlineCurrencyYen,
  HiOutlineCurrencyBangladeshi,
  HiOutlineReceiptTax,
  HiOutlineCash,
  HiOutlineCreditCard,
  HiOutlineCalculator as HiOutlineCalculatorIcon,
  HiOutlineDocument,
  HiOutlineDocumentAdd,
  HiOutlineDocumentRemove,
  HiOutlineDocumentDuplicate,
  HiOutlineDocumentSearch,
  HiOutlineDocumentReport,
  HiOutlineDocumentText,
  HiOutlineFolder,
  HiOutlineFolderAdd,
  HiOutlineFolderRemove,
  HiOutlineFolderOpen,
  HiOutlineFolderDownload,
  HiOutlineFolderUpload,
  HiOutlineCloudUpload,
  HiOutlineCloudDownload,
  HiOutlineCloudOffline,
  HiOutlineServer as HiOutlineServerIcon,
  HiOutlineDatabase as HiOutlineDatabaseIcon,
  HiOutlineChip as HiOutlineChipIcon,
  HiOutlineCube as HiOutlineCubeIcon,
  HiOutlineCubeTransparent as HiOutlineCubeTransparentIcon
} from 'react-icons/hi';

import {
  BsCalculator,
  BsGraphUp,
  BsGraphDown,
  BsBarChart,
  BsPieChart,
  BsCpu,
  BsGpuCard,
  BsMemory,
  BsMotherboard,
  BsFan,
  BsThermometer,
  BsThermometerHigh,
  BsThermometerLow,
  BsSpeedometer,
  BsTachometer,
  BsGauge,
  BsClock,
  BsClockHistory,
  BsStopwatch,
  BsTimer,
  BsAlarm,
  BsHourglass,
  BsHourglassSplit,
  BsCalendar,
  BsCalendarDate,
  BsCalendarWeek,
  BsCalendarMonth,
  BsCalendarEvent,
  BsCalendarCheck,
  BsCalendarX,
  BsCalendarPlus,
  BsCalendarMinus,
  BsPeople,
  BsPerson,
  BsPersonBadge,
  BsPersonCheck,
  BsPersonX,
  BsPersonPlus,
  BsPersonMinus,
  BsPersonWorkspace,
  BsPersonVideo,
  BsPersonVideo2,
  BsPersonVideo3,
  BsPersonHeart,
  BsPersonHeartFill,
  BsPersonRolodex,
  BsPersonCircle,
  BsPersonSquare,
  BsPersonBoundingBox,
  BsPersonBadgeFill,
  BsPersonCheckFill,
  BsPersonXFill,
  BsPersonPlusFill,
  BsPersonMinusFill
} from 'react-icons/bs';

const CalculatingWithMeDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('weekly');
  const [showAddCalculation, setShowAddCalculation] = useState(false);
  const [showAddTool, setShowAddTool] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Website-specific stats based on the content
  const [stats] = useState([
    {
      title: 'Premium Tools',
      value: '37',
      change: '+5',
      icon: HiOutlineCalculator,
      color: 'blue',
      bgColor: 'from-blue-500 to-blue-600',
      description: 'Advanced calculation tools'
    },
    {
      title: 'Accuracy Rate',
      value: '99.9%',
      change: '+0.5%',
      icon: FiTarget,
      color: 'green',
      bgColor: 'from-green-500 to-green-600',
      description: 'Precision guaranteed'
    },
    {
      title: 'Active Hours',
      value: '24/7',
      change: '+365',
      icon: FiClock,
      color: 'purple',
      bgColor: 'from-purple-500 to-purple-600',
      description: 'Always available'
    },
    {
      title: 'Learning Curve',
      value: '15min',
      change: '-30%',
      icon: FiBookOpen,
      color: 'orange',
      bgColor: 'from-orange-500 to-orange-600',
      description: 'Quick mastery'
    }
  ]);

  // Premium Tools Data
  const [tools, setTools] = useState([
    {
      id: 1,
      name: 'Financial Calculator Pro',
      category: 'Finance',
      usage: 12450,
      rating: 4.9,
      users: 3450,
      status: 'Active',
      type: 'Premium',
      icon: '💰',
      features: ['Compound Interest', 'Loan Calculator', 'ROI Analysis']
    },
    {
      id: 2,
      name: 'Scientific Suite',
      category: 'Science',
      usage: 8760,
      rating: 4.8,
      users: 2890,
      status: 'Active',
      type: 'Premium',
      icon: '🔬',
      features: ['Unit Converter', 'Formula Solver', 'Graph Plotter']
    },
    {
      id: 3,
      name: 'Engineering Toolkit',
      category: 'Engineering',
      usage: 6540,
      rating: 4.9,
      users: 1980,
      status: 'Active',
      type: 'Enterprise',
      icon: '⚙️',
      features: ['Stress Analysis', 'Load Calculator', 'Material Properties']
    },
    {
      id: 4,
      name: 'Statistical Analyzer',
      category: 'Statistics',
      usage: 4320,
      rating: 4.7,
      users: 1230,
      status: 'Beta',
      type: 'Premium',
      icon: '📊',
      features: ['Regression', 'Distribution', 'Hypothesis Testing']
    },
    {
      id: 5,
      name: 'AI Predictor',
      category: 'AI/ML',
      usage: 2100,
      rating: 4.6,
      users: 890,
      status: 'Beta',
      type: 'Enterprise',
      icon: '🤖',
      features: ['Pattern Recognition', 'Forecasting', 'Optimization']
    },
    {
      id: 6,
      name: 'Data Visualizer',
      category: 'Visualization',
      usage: 5600,
      rating: 4.8,
      users: 1670,
      status: 'Active',
      type: 'Premium',
      icon: '📈',
      features: ['3D Charts', 'Heat Maps', 'Interactive Graphs']
    },
    {
      id: 7,
      name: 'Cryptocurrency Calc',
      category: 'Crypto',
      usage: 8900,
      rating: 4.7,
      users: 2340,
      status: 'Active',
      type: 'Premium',
      icon: '₿',
      features: ['Price Converter', 'Mining Calculator', 'Portfolio Tracker']
    },
    {
      id: 8,
      name: 'Physics Simulator',
      category: 'Physics',
      usage: 3400,
      rating: 4.9,
      users: 980,
      status: 'Active',
      type: 'Enterprise',
      icon: '⚛️',
      features: ['Quantum Calc', 'Mechanics', 'Thermodynamics']
    },
    {
      id: 9,
      name: 'Chemistry Lab',
      category: 'Chemistry',
      usage: 2800,
      rating: 4.8,
      users: 760,
      status: 'Active',
      type: 'Premium',
      icon: '🧪',
      features: ['Molar Mass', 'pH Calculator', 'Reaction Balancer']
    },
    {
      id: 10,
      name: 'Math Solver',
      category: 'Mathematics',
      usage: 15600,
      rating: 4.9,
      users: 4560,
      status: 'Active',
      type: 'Free',
      icon: '📐',
      features: ['Equation Solver', 'Calculus', 'Matrix Operations']
    }
  ]);

  // Recent Calculations Data
  const [calculations, setCalculations] = useState([
    {
      id: 1,
      userId: 'Alex Morgan',
      userEmail: 'alex@globalcorp.com',
      tool: 'Financial Calculator Pro',
      type: 'Compound Interest',
      input: '$50,000 @ 5% for 10y',
      result: '$81,444.73',
      date: '2025-03-15T10:30:00',
      status: 'Completed',
      time: '2.3s'
    },
    {
      id: 2,
      userId: 'Sarah Chen',
      userEmail: 'sarah@techstart.io',
      tool: 'AI Predictor',
      type: 'Sales Forecast',
      input: 'Q1 2025 Data',
      result: '+23.5% growth',
      date: '2025-03-15T09:45:00',
      status: 'Completed',
      time: '4.1s'
    },
    {
      id: 3,
      userId: 'James Wilson',
      userEmail: 'james@construct.com',
      tool: 'Engineering Toolkit',
      type: 'Load Analysis',
      input: 'Steel Beam 8m',
      result: '45.2 kN/m',
      date: '2025-03-15T09:15:00',
      status: 'Processing',
      time: '1.8s'
    },
    {
      id: 4,
      userId: 'Maria Garcia',
      userEmail: 'maria@research.org',
      tool: 'Statistical Analyzer',
      type: 'T-Test',
      input: 'Sample size: 250',
      result: 'p = 0.023',
      date: '2025-03-15T08:50:00',
      status: 'Completed',
      time: '3.2s'
    },
    {
      id: 5,
      userId: 'David Kim',
      userEmail: 'david@cryptofund.com',
      tool: 'Cryptocurrency Calc',
      type: 'Portfolio Value',
      input: 'BTC, ETH, SOL',
      result: '$234,567',
      date: '2025-03-15T08:20:00',
      status: 'Completed',
      time: '1.5s'
    },
    {
      id: 6,
      userId: 'Emma Thompson',
      userEmail: 'emma@university.edu',
      tool: 'Physics Simulator',
      type: 'Quantum State',
      input: 'Particle in box',
      result: 'Ψ = 2.34e-10',
      date: '2025-03-15T07:55:00',
      status: 'Pending',
      time: '5.2s'
    },
    {
      id: 7,
      userId: 'Michael Brown',
      userEmail: 'michael@chemco.com',
      tool: 'Chemistry Lab',
      type: 'pH Calculation',
      input: 'HCl 0.1M',
      result: 'pH = 1.0',
      date: '2025-03-15T07:30:00',
      status: 'Completed',
      time: '1.2s'
    },
    {
      id: 8,
      userId: 'Lisa Wang',
      userEmail: 'lisa@dataviz.com',
      tool: 'Data Visualizer',
      type: '3D Surface Plot',
      input: 'Dataset XYZ',
      result: 'Interactive plot',
      date: '2025-03-15T06:45:00',
      status: 'Completed',
      time: '6.0s'
    },
    {
      id: 9,
      userId: 'Robert Taylor',
      userEmail: 'robert@mathacademy.com',
      tool: 'Math Solver',
      type: 'Differential Eq',
      input: "y'' + 2y' + y = 0",
      result: 'y = e^(-x)(C₁ + C₂x)',
      date: '2025-03-15T06:10:00',
      status: 'Completed',
      time: '2.7s'
    },
    {
      id: 10,
      userId: 'Patricia Lee',
      userEmail: 'patricia@biotech.com',
      tool: 'Statistical Analyzer',
      type: 'ANOVA',
      input: '3 groups, n=30',
      result: 'F = 4.56, p < 0.05',
      date: '2025-03-15T05:30:00',
      status: 'Failed',
      time: '3.8s'
    }
  ]);

  // Filtered Data
  const filteredTools = tools.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCalculations = calculations.filter(c => 
    c.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.tool.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculations
  const totalTools = tools.length;
  const activeTools = tools.filter(t => t.status === 'Active').length;
  const betaTools = tools.filter(t => t.status === 'Beta').length;
  const totalCalculations = calculations.length;
  const completedCalcs = calculations.filter(c => c.status === 'Completed').length;
  const pendingCalcs = calculations.filter(c => c.status === 'Pending' || c.status === 'Processing').length;
  const failedCalcs = calculations.filter(c => c.status === 'Failed').length;

  // Status Color Function
  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-600 border-green-200',
      'Beta': 'bg-purple-100 text-purple-600 border-purple-200',
      'Enterprise': 'bg-blue-100 text-blue-600 border-blue-200',
      'Premium': 'bg-yellow-100 text-yellow-600 border-yellow-200',
      'Free': 'bg-gray-100 text-gray-600 border-gray-200',
      'Completed': 'bg-green-100 text-green-600 border-green-200',
      'Processing': 'bg-yellow-100 text-yellow-600 border-yellow-200',
      'Pending': 'bg-orange-100 text-orange-600 border-orange-200',
      'Failed': 'bg-red-100 text-red-600 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
      {/* Top Navigation Bar - Website Themed */}
      <div className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 border-gray-200'} border-b backdrop-blur-lg bg-opacity-90`}>
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section - Website Logo */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <HiOutlineCalculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>CalculateWith.Me</h1>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Precision Dashboard</p>
                </div>
              </div>

              {/* Quick Stats Badge */}
              <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-xl">
                <FiZap className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Live Calculations: 1,247</span>
              </div>
            </div>

            {/* Center - Search */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <FiSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-400'} w-5 h-5`} />
                <input
                  type="text"
                  placeholder="Search tools, calculations, users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Filter Chips */}
              <div className="hidden lg:flex items-center gap-2">
                {['realtime', 'hourly', 'daily'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                      selectedFilter === filter
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : darkMode
                          ? 'text-gray-400 hover:bg-gray-800'
                          : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Notifications */}
              <button className={`relative p-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-xl transition-colors`}>
                <FiBell className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white"></span>
              </button>

              {/* Dark Mode Toggle */}
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-xl transition-colors`}
              >
                {darkMode ? (
                  <FiSun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <FiMoon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Profile */}
              <button className={`flex items-center gap-3 p-2 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-xl transition-colors`}>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <FiUser className="w-6 h-6 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Admin</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>calculatingwithme.com</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Hero Stats - Website Themed */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <HiOutlineLightningBolt className="w-6 h-6 text-blue-600" />
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Platform Overview</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isPositive = stat.change.startsWith('+');
              
              return (
                <div key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-l-4 border-${stat.color}-500`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${stat.bgColor} rounded-2xl flex items-center justify-center`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className={`flex items-center gap-1 text-sm font-medium ${
                      isPositive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                    } px-3 py-1 rounded-full`}>
                      {isPositive ? <FiArrowUpRight className="w-4 h-4" /> : <FiArrowDownRight className="w-4 h-4" />}
                      {stat.change}
                    </span>
                  </div>
                  <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{stat.value}</h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.title}</p>
                  <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{stat.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Analytics Section - Website Themed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Usage Analytics */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg lg:col-span-2`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Calculation Analytics</h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Real-time usage metrics</p>
              </div>
              <div className="flex items-center gap-2">
                <button className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}>
                  <FiCalendar className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
                <button className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}>
                  <FiDownload className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>

            {/* Analytics Chart */}
            <div className="space-y-6">
              <div className="flex items-end h-48 gap-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full space-y-1">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all hover:opacity-80"
                        style={{ height: `${Math.random() * 150 + 50}px` }}
                      ></div>
                      <div className="w-full bg-gray-200 rounded-t-lg h-4 opacity-30"></div>
                    </div>
                    <span className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{day}</span>
                  </div>
                ))}
              </div>

              {/* Tool Usage Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FiZap className="w-4 h-4 text-yellow-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Peak Usage</span>
                  </div>
                  <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>2,847/min</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FiClock className="w-4 h-4 text-blue-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Avg Response</span>
                  </div>
                  <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>1.2s</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FiCheckCircle className="w-4 h-4 text-green-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Success Rate</span>
                  </div>
                  <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>99.97%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Platform Health</h2>
              <FiCpu className="w-6 h-6 text-blue-500" />
            </div>

            <div className="space-y-4">
              {/* System Status */}
              <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-blue-50 to-purple-50'} rounded-xl`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>System Status</span>
                  <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">Operational</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>API</span>
                    <span className="text-green-500">● 99.9%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Database</span>
                    <span className="text-green-500">● 99.8%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Cache</span>
                    <span className="text-green-500">● 100%</span>
                  </div>
                </div>
              </div>

              {/* Tool Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl text-center`}>
                  <HiOutlineCube className={`w-6 h-6 mx-auto mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{totalTools}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Tools</p>
                </div>
                <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl text-center`}>
                  <FiActivity className={`w-6 h-6 mx-auto mb-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{activeTools}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active</p>
                </div>
              </div>

              {/* Status Breakdown */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Completed</span>
                    <span className={`text-xs font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{completedCalcs}</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Pending</span>
                    <span className={`text-xs font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pendingCalcs}</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-1/6 bg-yellow-500 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Failed</span>
                    <span className={`text-xs font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{failedCalcs}</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-1/12 bg-red-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
                View System Status
              </button>
            </div>
          </div>
        </div>

        {/* Tools & Calculations Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Premium Tools Table */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden`}>
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Premium Tools</h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Advanced calculation tools</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowAddTool(true)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <FiPlus className="w-4 h-4" /> Add Tool
                  </button>
                  <button className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-xl transition-colors`}>
                    <FiDownload className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tool</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {filteredTools.slice(0, 5).map((tool) => (
                    <tr key={tool.id} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center text-2xl">
                            {tool.icon}
                          </div>
                          <div>
                            <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tool.name}</div>
                            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tool.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{tool.usage.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{tool.rating}</span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{tool.users.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(tool.status)}`}>
                          {tool.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(tool.type)}`}>
                          {tool.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Showing 1 to 5 of {filteredTools.length} tools
              </span>
              <div className="flex gap-2">
                <button className={`p-2 ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} border rounded-lg transition-colors`}>
                  <FiChevronLeft className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
                <button className={`p-2 ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} border rounded-lg transition-colors`}>
                  <FiChevronRight className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Recent Calculations Table */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden`}>
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Calculations</h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Latest user calculations</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowAddCalculation(true)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <FiPlus className="w-4 h-4" /> Add Calculation
                  </button>
                  <button className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-xl transition-colors`}>
                    <FiPrinter className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tool</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Input</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {filteredCalculations.slice(0, 5).map((calc) => (
                    <tr key={calc.id} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                      <td className="px-6 py-4">
                        <div>
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{calc.userId}</div>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{calc.userEmail}</div>
                        </div>
                      </td>
                      <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{calc.tool}</td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{calc.input}</td>
                      <td className={`px-6 py-4 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{calc.result}</td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{calc.time}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs rounded-full border flex items-center gap-1 w-fit ${getStatusColor(calc.status)}`}>
                          {calc.status === 'Pending' && <FiClock className="w-3 h-3" />}
                          {calc.status === 'Processing' && <FiActivity className="w-3 h-3" />}
                          {calc.status === 'Completed' && <FiCheckCircle className="w-3 h-3" />}
                          {calc.status === 'Failed' && <FiAlertCircle className="w-3 h-3" />}
                          {calc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Showing 1 to 5 of {filteredCalculations.length} calculations
              </span>
              <div className="flex gap-2">
                <button className={`p-2 ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} border rounded-lg transition-colors`}>
                  <FiChevronLeft className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
                <button className={`p-2 ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} border rounded-lg transition-colors`}>
                  <FiChevronRight className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section - Website Themed */}
        <div className={`mt-8 p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg`}>
          <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Platform Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: FiZap, label: 'Lightning Fast', color: 'yellow' },
              { icon: FiCpu, label: 'AI Powered', color: 'blue' },
              { icon: FiBarChart2, label: 'Data Visualization', color: 'green' },
              { icon: FiLock, label: 'Secure & Private', color: 'purple' },
              { icon: FiAward, label: 'Award-Winning', color: 'orange' },
              { icon: FiCode, label: 'Smart Technology', color: 'red' }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl text-center hover:scale-105 transition-transform`}>
                  <Icon className={`w-8 h-8 mx-auto mb-2 text-${feature.color}-500`} />
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{feature.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        {/* <footer className={`mt-8 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            © 2025 calculatingwithme.com. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}>
              Privacy Policy
            </button>
            <button className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}>
              Terms of Service
            </button>
            <button className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}>
              Help Center
            </button>
          </div>
        </footer> */}
      </div>

      {/* Add Tool Modal */}
      {showAddTool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl w-full max-w-md p-6`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New Tool</h3>
              <button 
                onClick={() => setShowAddTool(false)}
                className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
              >
                <FiX className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const newTool = {
                id: tools.length + 1,
                name: formData.get('name'),
                category: formData.get('category'),
                usage: 0,
                rating: 0,
                users: 0,
                status: 'Beta',
                type: formData.get('type'),
                icon: '🔧',
                features: []
              };
              setTools([...tools, newTool]);
              setShowAddTool(false);
            }}>
              <div className="space-y-4">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Tool Name" 
                  required 
                  className={`w-full p-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <input 
                  type="text" 
                  name="category" 
                  placeholder="Category" 
                  required 
                  className={`w-full p-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <select 
                  name="type"
                  className={`w-full p-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="Free">Free</option>
                  <option value="Premium">Premium</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
                <div className="flex gap-3">
                  <button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:opacity-90 transition-opacity font-medium"
                  >
                    Add Tool
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowAddTool(false)}
                    className={`flex-1 ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} py-3 rounded-xl transition-colors font-medium`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Calculation Modal */}
      {showAddCalculation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl w-full max-w-md p-6`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add Calculation</h3>
              <button 
                onClick={() => setShowAddCalculation(false)}
                className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
              >
                <FiX className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const newCalculation = {
                id: calculations.length + 1,
                userId: formData.get('user'),
                userEmail: formData.get('email'),
                tool: formData.get('tool'),
                type: formData.get('type'),
                input: formData.get('input'),
                result: formData.get('result'),
                date: new Date().toISOString(),
                status: 'Pending',
                time: '0.0s'
              };
              setCalculations([...calculations, newCalculation]);
              setShowAddCalculation(false);
            }}>
              <div className="space-y-4">
                <input 
                  type="text" 
                  name="user" 
                  placeholder="User Name" 
                  required 
                  className={`w-full p-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="User Email" 
                  required 
                  className={`w-full p-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <input 
                  type="text" 
                  name="tool" 
                  placeholder="Tool Name" 
                  required 
                  className={`w-full p-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <input 
                  type="text" 
                  name="type" 
                  placeholder="Calculation Type" 
                  required 
                  className={`w-full p-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <input 
                  type="text" 
                  name="input" 
                  placeholder="Input Parameters" 
                  required 
                  className={`w-full p-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <input 
                  type="text" 
                  name="result" 
                  placeholder="Result" 
                  required 
                  className={`w-full p-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <div className="flex gap-3">
                  <button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:opacity-90 transition-opacity font-medium"
                  >
                    Add Calculation
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowAddCalculation(false)}
                    className={`flex-1 ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} py-3 rounded-xl transition-colors font-medium`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatingWithMeDashboard;