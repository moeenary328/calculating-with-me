"use client";
import { useState, useEffect } from 'react';
import { FaCalculator, FaCopy, FaTrash, FaInfoCircle } from 'react-icons/fa';

const StandardDeviationCalculator = () => {
  const [input, setInput] = useState('');
  const [numbers, setNumbers] = useState([]);
  const [result, setResult] = useState({
    population: null,
    sample: null
  });
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const addNumber = () => {
    if (!input.trim()) {
      setError('Please enter a number');
      return;
    }

    const num = parseFloat(input);
    if (isNaN(num)) {
      setError('Please enter a valid number');
      return;
    }

    setNumbers([...numbers, num]);
    setInput('');
    setError(null);
  };

  const calculateStandardDeviation = () => {
    if (numbers.length === 0) {
      setError('Please add at least one number');
      return;
    }

    const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    const squaredDifferences = numbers.map(num => Math.pow(num - mean, 2));
    const sumSquaredDifferences = squaredDifferences.reduce((sum, num) => sum + num, 0);

    const populationStdDev = Math.sqrt(sumSquaredDifferences / numbers.length);
    const sampleStdDev = numbers.length > 1 
      ? Math.sqrt(sumSquaredDifferences / (numbers.length - 1))
      : 0;

    setResult({
      population: parseFloat(populationStdDev.toFixed(4)),
      sample: parseFloat(sampleStdDev.toFixed(4))
    });
    setError(null);
  };

  const resetCalculator = () => {
    setNumbers([]);
    setInput('');
    setResult({ population: null, sample: null });
    setError(null);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text.toString());
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addNumber();
    }
  };

  // Render nothing on server to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex items-center justify-start mb-6">
            <FaCalculator className="text-blue-500 text-2xl mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Standard Deviation Calculator</h1>
          </div>
          
          <div className="mb-6">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter a number"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addNumber}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition duration-200"
              >
                Add
              </button>
            </div>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-medium text-gray-700">Numbers Entered:</h2>
              <button
                onClick={resetCalculator}
                className="flex items-center text-sm text-red-500 hover:text-red-700"
              >
                <FaTrash className="mr-1" /> Clear All
              </button>
            </div>
            <div className="bg-gray-100 p-3 rounded-md h-32 overflow-y-auto">
              {numbers.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No numbers added yet</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {numbers.map((num, index) => (
                    <span 
                      key={index} 
                      className="bg-white px-3 py-1 rounded-full text-sm shadow-sm"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={calculateStandardDeviation}
            disabled={numbers.length === 0}
            className={`w-full py-3 px-4 rounded-md font-medium ${numbers.length === 0 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600 text-white'}`}
          >
            Calculate Standard Deviation
          </button>

          {(result.population !== null || result.sample !== null) && (
            <div className="mt-6 space-y-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Population Standard Deviation (σ):</span>
                  <div className="flex items-center">
                    <span className="text-blue-700 font-bold mr-2">
                      {result.population}
                    </span>
                    <button 
                      onClick={() => copyToClipboard(result.population)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Copy to clipboard"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1 flex items-center">
                  <FaInfoCircle className="mr-1" /> 
                  Used when data represents the entire population
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Sample Standard Deviation (s):</span>
                  <div className="flex items-center">
                    <span className="text-green-700 font-bold mr-2">
                      {result.sample}
                    </span>
                    <button 
                      onClick={() => copyToClipboard(result.sample)}
                      className="text-green-500 hover:text-green-700"
                      title="Copy to clipboard"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1 flex items-center">
                  <FaInfoCircle className="mr-1" /> 
                  Used when data is a sample of the population
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 bg-yellow-50 p-4 rounded-md">
            <h3 className="font-medium text-yellow-800 mb-2">How to use:</h3>
            <ol className="list-decimal list-inside text-sm text-yellow-700 space-y-1">
              <li>Enter numbers one by one and click "Add"</li>
              <li>Click "Calculate Standard Deviation" when ready</li>
              <li>Results will show both population and sample standard deviation</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardDeviationCalculator;