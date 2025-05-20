// app/date-calculator/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { FiCalendar, FiPlus, FiMinus, FiChevronRight, FiInfo } from 'react-icons/fi';

// Static metadata object (not exported)
const metadata = {
  title: 'Free Date Calculator | Calculate Days Between Dates Online',
  description: 'Easily calculate days between two dates or add/subtract days from any date.',
};

export default function DateCalculatorPage() {
  const [calculationType, setCalculationType] = useState('difference');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [daysToAdd, setDaysToAdd] = useState(0);
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    document.title = metadata.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', metadata.description);
    }
  }, []);

  // Set default start date to today
  useEffect(() => {
    if (isClient) {
      const today = new Date();
      const formattedToday = today.toISOString().split('T')[0];
      setStartDate(formattedToday);
    }
  }, [isClient]);

  const calculateDateDifference = () => {
    if (!startDate || !endDate) return;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    setResult({
      type: 'difference',
      days: diffDays,
      startDate: start,
      endDate: end
    });
  };

  const calculateDateOperation = () => {
    if (!startDate) return;
    
    const date = new Date(startDate);
    const days = operation === 'add' ? parseInt(daysToAdd) : -parseInt(daysToAdd);
    date.setDate(date.getDate() + days);
    
    setResult({
      type: 'operation',
      days: daysToAdd,
      operation,
      originalDate: new Date(startDate),
      newDate: date
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (calculationType === 'difference') {
      calculateDateDifference();
    } else {
      calculateDateOperation();
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const resetForm = () => {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    setStartDate(formattedToday);
    setEndDate('');
    setDaysToAdd(0);
    setResult(null);
  };

  if (!isClient) {
    return null; // or return a loading spinner
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
                Date Difference
              </button>
              <button
                className={`flex-1 py-2 font-medium ${calculationType === 'operation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => {
                  setCalculationType('operation');
                  resetForm();
                }}
              >
                Add/Subtract Days
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {calculationType === 'difference' ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md pl-10"
                        required
                      />
                      <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md pl-10"
                        required
                      />
                      <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="operationDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="operationDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md pl-10"
                        required
                      />
                      <FiCalendar className="absolute left-3 top-3 text-gray-400" />
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
                    <input
                      type="number"
                      min="0"
                      value={daysToAdd}
                      onChange={(e) => setDaysToAdd(e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                      placeholder="Number of days"
                      required
                    />
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
                    <h3 className="font-medium text-lg mb-2">Date Difference Result</h3>
                    <p className="text-gray-700">
                      There are <span className="font-bold">{result.days}</span> days between
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">{formatDate(result.startDate)}</span> and
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">{formatDate(result.endDate)}</span>
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-medium text-lg mb-2">Date Calculation Result</h3>
                    <p className="text-gray-700">
                      {result.operation === 'add' ? 'Adding' : 'Subtracting'}{' '}
                      <span className="font-bold">{result.days}</span> days to
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">{formatDate(result.originalDate)}</span> gives
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">{formatDate(result.newDate)}</span>
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
                <h2 className="text-xl font-bold text-gray-800 mb-4">How to Use This Date Calculator</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Date Difference Calculator</h3>
                    <p className="text-gray-600">
                      Select any two dates to calculate the exact number of days between them. 
                      The calculation includes both the start and end dates.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Add/Subtract Days</h3>
                    <p className="text-gray-600">
                      Choose a start date, then specify how many days to add or subtract. 
                      Perfect for calculating deadlines, due dates, or future events.
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
            <h2 className="text-xl font-bold text-gray-800 mb-4">About Our Date Calculator</h2>
            
            <div className="prose prose-sm max-w-none text-gray-600">
              <p>
                Our free online date calculator helps you quickly determine the number of days between two dates 
                or calculate a new date by adding or subtracting days. This tool is perfect for:
              </p>
              
              <ul className="list-disc pl-5 my-3">
                <li>Planning events and counting down to special occasions</li>
                <li>Calculating project deadlines and delivery dates</li>
                <li>Determining exact dates for travel plans</li>
                <li>Tracking important anniversaries and milestones</li>
              </ul>
              
              <h3 className="font-medium text-gray-900 mt-4">How Date Calculations Work</h3>
              <p>
                The calculator uses JavaScript's Date object to perform accurate calculations, 
                accounting for all calendar variations including leap years and different month lengths. 
                When calculating the difference between two dates, the tool counts each full day 
                between your selected dates.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}