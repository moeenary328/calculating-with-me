// app/time-calculator/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { FiClock, FiPlus, FiMinus, FiChevronRight, FiInfo } from 'react-icons/fi';

const metadata = {
  title: 'Free Time Calculator | Add/Subtract Time Online',
  description: 'Easily calculate time differences or add/subtract hours, minutes, and seconds from any time.',
  keywords: 'time calculator, add time, subtract time, time difference, duration calculator'
};

export default function TimeCalculatorPage() {
  const [calculationType, setCalculationType] = useState('difference');
  const [startTime, setStartTime] = useState('00:00:00');
  const [endTime, setEndTime] = useState('00:00:00');
  const [hoursToAdd, setHoursToAdd] = useState(0);
  const [minutesToAdd, setMinutesToAdd] = useState(0);
  const [secondsToAdd, setSecondsToAdd] = useState(0);
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

  // Set default start time to current time
  useEffect(() => {
    if (isClient) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setStartTime(`${hours}:${minutes}:${seconds}`);
    }
  }, [isClient]);

  const calculateTimeDifference = () => {
    if (!startTime || !endTime) return;
    
    const [startH, startM, startS] = startTime.split(':').map(Number);
    const [endH, endM, endS] = endTime.split(':').map(Number);
    
    let totalSeconds = (endH * 3600 + endM * 60 + endS) - (startH * 3600 + startM * 60 + startS);
    
    // Handle negative time (end before start)
    const isNegative = totalSeconds < 0;
    totalSeconds = Math.abs(totalSeconds);
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    setResult({
      type: 'difference',
      isNegative,
      hours,
      minutes,
      seconds,
      startTime,
      endTime
    });
  };

  const calculateTimeOperation = () => {
    if (!startTime) return;
    
    const [hours, minutes, seconds] = startTime.split(':').map(Number);
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;
    
    const addSeconds = operation === 'add' 
      ? hoursToAdd * 3600 + minutesToAdd * 60 + secondsToAdd * 1
      : -(hoursToAdd * 3600 + minutesToAdd * 60 + secondsToAdd * 1);
    
    totalSeconds += addSeconds;
    
    // Handle overflow/underflow
    if (totalSeconds < 0) totalSeconds += 86400; // Add a day if negative
    totalSeconds = totalSeconds % 86400; // Wrap around after 24 hours
    
    const newHours = Math.floor(totalSeconds / 3600) % 24;
    const newMinutes = Math.floor((totalSeconds % 3600) / 60);
    const newSeconds = totalSeconds % 60;
    
    setResult({
      type: 'operation',
      operation,
      hoursAdded: hoursToAdd,
      minutesAdded: minutesToAdd,
      secondsAdded: secondsToAdd,
      originalTime: startTime,
      newTime: `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (calculationType === 'difference') {
      calculateTimeDifference();
    } else {
      calculateTimeOperation();
    }
  };

  const formatTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':');
    const date = new Date();
    date.setHours(hours, minutes, seconds);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const resetForm = () => {
    if (isClient) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setStartTime(`${hours}:${minutes}:${seconds}`);
      setEndTime('00:00:00');
      setHoursToAdd(0);
      setMinutesToAdd(0);
      setSecondsToAdd(0);
      setResult(null);
    }
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
                className={`flex-1 py-2 font-medium ${calculationType === 'difference' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => {
                  setCalculationType('difference');
                  resetForm();
                }}
              >
                Time Difference
              </button>
              <button
                className={`flex-1 py-2 font-medium ${calculationType === 'operation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => {
                  setCalculationType('operation');
                  resetForm();
                }}
              >
                Add/Subtract Time
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {calculationType === 'difference' ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        id="startTime"
                        step="1"
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
                        step="1"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md pl-10"
                        required
                      />
                      <FiClock className="absolute left-3 top-3 text-gray-400" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="operationTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        id="operationTime"
                        step="1"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md pl-10"
                        required
                      />
                      <FiClock className="absolute left-3 top-3 text-gray-400" />
                    </div>
                  </div>

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
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
                        Hours
                      </label>
                      <input
                        type="number"
                        id="hours"
                        min="0"
                        value={hoursToAdd}
                        onChange={(e) => setHoursToAdd(Math.max(0, e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label htmlFor="minutes" className="block text-sm font-medium text-gray-700 mb-1">
                        Minutes
                      </label>
                      <input
                        type="number"
                        id="minutes"
                        min="0"
                        max="59"
                        value={minutesToAdd}
                        onChange={(e) => setMinutesToAdd(Math.min(59, Math.max(0, e.target.value)))}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label htmlFor="seconds" className="block text-sm font-medium text-gray-700 mb-1">
                        Seconds
                      </label>
                      <input
                        type="number"
                        id="seconds"
                        min="0"
                        max="59"
                        value={secondsToAdd}
                        onChange={(e) => setSecondsToAdd(Math.min(59, Math.max(0, e.target.value)))}
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
                {result.type === 'difference' ? (
                  <div>
                    <h3 className="font-medium text-lg mb-2">Time Difference Result</h3>
                    <p className="text-gray-700">
                      The difference between <span className="font-medium">{formatTime(result.startTime)}</span> and
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">{formatTime(result.endTime)}</span> is:
                    </p>
                    <p className="text-2xl font-bold mt-2">
                      {result.isNegative && '-'}
                      {result.hours > 0 && `${result.hours} hour${result.hours !== 1 ? 's' : ''} `}
                      {result.minutes > 0 && `${result.minutes} minute${result.minutes !== 1 ? 's' : ''} `}
                      {result.seconds > 0 && `${result.seconds} second${result.seconds !== 1 ? 's' : ''}`}
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-medium text-lg mb-2">Time Calculation Result</h3>
                    <p className="text-gray-700">
                      {result.operation === 'add' ? 'Adding' : 'Subtracting'}{' '}
                      {result.hoursAdded > 0 && `${result.hoursAdded} hour${result.hoursAdded !== 1 ? 's' : ''} `}
                      {result.minutesAdded > 0 && `${result.minutesAdded} minute${result.minutesAdded !== 1 ? 's' : ''} `}
                      {result.secondsAdded > 0 && `${result.secondsAdded} second${result.secondsAdded !== 1 ? 's' : ''}`}
                    </p>
                    <p className="text-gray-700">
                      to <span className="font-medium">{formatTime(result.originalTime)}</span> gives:
                    </p>
                    <p className="text-2xl font-bold mt-2">
                      {formatTime(result.newTime)}
                    </p>
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
                <h2 className="text-xl font-bold text-gray-800 mb-4">How to Use This Time Calculator</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Time Difference Calculator</h3>
                    <p className="text-gray-600">
                      Select any two times to calculate the exact duration between them. 
                      The calculation shows hours, minutes, and seconds between the two times.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Add/Subtract Time</h3>
                    <p className="text-gray-600">
                      Choose a start time, then specify how many hours, minutes, and seconds to add or subtract. 
                      Perfect for calculating future/past times based on duration.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">About Our Time Calculator</h2>
            
            <div className="prose prose-sm max-w-none text-gray-600">
              <p>
                Our free online time calculator helps you quickly determine the duration between two times 
                or calculate a new time by adding or subtracting hours, minutes, and seconds. This tool is perfect for:
              </p>
              
              <ul className="list-disc pl-5 my-3">
                <li>Calculating work hours and time tracking</li>
                <li>Determining event durations and schedules</li>
                <li>Adding/subtracting time for cooking, workouts, or meetings</li>
                <li>Time management and productivity planning</li>
              </ul>
              
              <h3 className="font-medium text-gray-900 mt-4">How Time Calculations Work</h3>
              <p>
                The calculator converts all times to total seconds for precise calculations, 
                then converts back to hours, minutes and seconds for display. 
                It properly handles 24-hour rollover (calculating times across midnight) 
                and provides accurate results for both positive and negative durations.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}