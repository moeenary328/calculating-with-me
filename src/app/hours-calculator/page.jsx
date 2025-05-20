// app/hours-calculator/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { FiClock, FiPlus, FiMinus, FiChevronRight, FiInfo, FiCalendar } from 'react-icons/fi';

const metadata = {
  title: 'Free Hours Calculator | Calculate Work Hours & Time Duration',
  description: 'Easily calculate total hours between times, work hours, or add/subtract hours from any time. Perfect for timesheets and payroll.',
  keywords: 'hours calculator, work hours, time calculator, payroll calculator, timesheet calculator'
};

export default function HoursCalculatorPage() {
  const [calculationType, setCalculationType] = useState('duration');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [breakMinutes, setBreakMinutes] = useState(30);
  const [days, setDays] = useState(1);
  const [hoursToAdd, setHoursToAdd] = useState(0);
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set SEO meta tags and mark as client-side
  useEffect(() => {
    setIsClient(true);
    document.title = metadata.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', metadata.description);
    }
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      const newMeta = document.createElement('meta');
      newMeta.name = 'keywords';
      newMeta.content = metadata.keywords;
      document.head.appendChild(newMeta);
    }
  }, []);

  const calculateHoursDuration = () => {
    if (!startTime || !endTime) return;
    
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    
    let totalMinutes = (endH * 60 + endM) - (startH * 60 + startM);
    
    // Handle overnight shifts
    if (totalMinutes < 0) totalMinutes += 1440; // Add 24 hours
    
    // Subtract break time
    totalMinutes -= breakMinutes;
    
    const totalHours = (totalMinutes / 60) * days;
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    
    setResult({
      type: 'duration',
      totalHours: totalHours.toFixed(2),
      hours,
      minutes,
      days,
      breakMinutes,
      startTime,
      endTime
    });
  };

  const calculateHoursOperation = () => {
    const totalHours = operation === 'add' 
      ? parseFloat(hoursToAdd)
      : -parseFloat(hoursToAdd);
    
    setResult({
      type: 'operation',
      operation,
      hours: hoursToAdd,
      totalHours: totalHours.toFixed(2),
      equivalentMinutes: (totalHours * 60).toFixed(0),
      equivalentDays: (totalHours / 24).toFixed(2)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (calculationType === 'duration') {
      calculateHoursDuration();
    } else {
      calculateHoursOperation();
    }
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const resetForm = () => {
    setStartTime('09:00');
    setEndTime('17:00');
    setBreakMinutes(30);
    setDays(1);
    setHoursToAdd(0);
    setResult(null);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading calculator...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* SEO Optimized Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{metadata.title}</h1>
          <p className="text-lg text-gray-600">{metadata.description}</p>
        </header>

        {/* Calculator Section */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <div className="flex border-b mb-6">
              <button
                className={`flex-1 py-2 font-medium ${calculationType === 'duration' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => {
                  setCalculationType('duration');
                  resetForm();
                }}
              >
                Work Hours
              </button>
              <button
                className={`flex-1 py-2 font-medium ${calculationType === 'operation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => {
                  setCalculationType('operation');
                  resetForm();
                }}
              >
                Hours Converter
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {calculationType === 'duration' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          id="startTime"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md pl-10"
                          required
                        />
                        <FiClock className="absolute left-3 top-3 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                        End Time
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          id="endTime"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md pl-10"
                          required
                        />
                        <FiClock className="absolute left-3 top-3 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="breakMinutes" className="block text-sm font-medium text-gray-700 mb-1">
                        Break (minutes)
                      </label>
                      <input
                        type="number"
                        id="breakMinutes"
                        min="0"
                        value={breakMinutes}
                        onChange={(e) => setBreakMinutes(Math.max(0, e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Days
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="days"
                          min="1"
                          value={days}
                          onChange={(e) => setDays(Math.max(1, e.target.value))}
                          className="w-full p-2 border border-gray-300 rounded-md pl-10"
                        />
                        <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className={`p-2 rounded-md ${operation === 'add' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                      onClick={() => setOperation('add')}
                    >
                      <FiPlus />
                    </button>
                    <button
                      type="button"
                      className={`p-2 rounded-md ${operation === 'subtract' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                      onClick={() => setOperation('subtract')}
                    >
                      <FiMinus />
                    </button>
                    <div className="flex-1">
                      <label htmlFor="hoursToAdd" className="block text-sm font-medium text-gray-700 mb-1">
                        Hours
                      </label>
                      <input
                        type="number"
                        id="hoursToAdd"
                        min="0"
                        step="0.25"
                        value={hoursToAdd}
                        onChange={(e) => setHoursToAdd(Math.max(0, e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
                >
                  Calculate
                  <FiChevronRight className="ml-1" />
                </button>
              </div>
            </form>

            {result && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                {result.type === 'duration' ? (
                  <div>
                    <h3 className="font-medium text-lg mb-2">Work Hours Calculation</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-700">Start Time:</p>
                        <p className="font-medium">{formatTime(result.startTime)}</p>
                      </div>
                      <div>
                        <p className="text-gray-700">End Time:</p>
                        <p className="font-medium">{formatTime(result.endTime)}</p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-gray-700">Break:</p>
                        <p className="font-medium">{result.breakMinutes} mins</p>
                      </div>
                      <div>
                        <p className="text-gray-700">Days:</p>
                        <p className="font-medium">{result.days}</p>
                      </div>
                      <div>
                        <p className="text-gray-700">Total:</p>
                        <p className="text-2xl font-bold">{result.totalHours} hours</p>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">
                      ({result.hours} hours and {result.minutes} minutes)
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-medium text-lg mb-2">Hours Conversion</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Hours</p>
                        <p className="text-xl font-bold">{result.totalHours}</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Minutes</p>
                        <p className="text-xl font-bold">{result.equivalentMinutes}</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Days</p>
                        <p className="text-xl font-bold">{result.equivalentDays}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* User Guide Section */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <button 
              onClick={() => setShowGuide(!showGuide)}
              className="flex items-center text-blue-600 mb-4"
            >
              <FiInfo className="mr-2" />
              {showGuide ? 'Hide Instructions' : 'Show Instructions'}
            </button>

            {showGuide && (
              <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">How to Use This Hours Calculator</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Work Hours Calculator</h3>
                    <p className="text-gray-600">
                      Calculate total work hours between two times, accounting for breaks and multiple days.
                      Perfect for timesheets, payroll, and work hour tracking.
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
                      <li>Enter your start and end times</li>
                      <li>Add any break time in minutes</li>
                      <li>Multiply by number of days for weekly totals</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Hours Converter</h3>
                    <p className="text-gray-600">
                      Convert hours to minutes or days, or subtract hours for time tracking.
                      Useful for project estimation and time management.
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
                      <li>Enter hours (decimals accepted, e.g. 1.5 for 1 hour 30 minutes)</li>
                      <li>Choose to add or subtract</li>
                      <li>See equivalent minutes and days</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">About Our Hours Calculator</h2>
            
            <div className="prose prose-sm max-w-none text-gray-600">
              <p>
                Our free online hours calculator helps professionals, freelancers, and businesses
                accurately track and calculate work hours for timesheets, payroll, and productivity
                measurement. This tool is perfect for:
              </p>
              
              <ul className="list-disc pl-5 my-3">
                <li>Employees tracking work hours for timesheets</li>
                <li>Freelancers calculating billable hours</li>
                <li>Managers estimating project hours</li>
                <li>Business owners calculating payroll</li>
                <li>Students tracking study hours</li>
              </ul>
              
              <h3 className="font-medium text-gray-900 mt-4">How Hours Calculations Work</h3>
              <p>
                The calculator converts all times to minutes for precise calculations, then converts
                back to hours and minutes for display. It properly handles overnight shifts,
                break deductions, and multi-day calculations. The hours converter uses decimal
                hours (e.g., 1.5 hours = 1 hour and 30 minutes) for flexible time tracking.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}