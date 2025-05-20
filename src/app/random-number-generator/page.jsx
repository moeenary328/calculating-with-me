'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function RandomNumberGenerator() {
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(100);
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setIsMounted(true);
    generateNumbers(); // Generate initial number
  }, []);

  const generateNumbers = () => {
    const newResults = [];
    for (let i = 0; i < quantity; i++) {
      const randomNum = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      newResults.push(randomNum);
    }
    setResults(newResults);
    
    // Add to history (limit to last 5 generations)
    const newHistory = [...history];
    newHistory.unshift({
      min: minValue,
      max: maxValue,
      qty: quantity,
      numbers: newResults,
      timestamp: new Date().toLocaleTimeString()
    });
    if (newHistory.length > 5) newHistory.pop();
    setHistory(newHistory);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(results.join(', '));
  };

  const validateInputs = () => {
    if (minValue >= maxValue) {
      alert('Minimum value must be less than maximum value');
      return false;
    }
    if (quantity < 1 || quantity > 100) {
      alert('Quantity must be between 1 and 100');
      return false;
    }
    return true;
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      generateNumbers();
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <Head>
        <title>Random Number Generator | Create Random Numbers Online</title>
        <meta 
          name="description" 
          content="Generate random numbers between any range. Customize minimum, maximum values and quantity. Perfect for games, draws, and statistical sampling."
        />
        <meta name="keywords" content="random number generator, random number, number picker, randomizer, online random number" />
        <meta property="og:title" content="Random Number Generator | Create Random Numbers Online" />
        <meta property="og:description" content="Generate random numbers between any range with customizable options." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://yourdomain.com/random-number-generator" />
      </Head>

      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Random Number Generator</h1>
        <p className="text-gray-600 mb-6">
          Generate random numbers between any range you specify
        </p>

        <form onSubmit={handleGenerate} className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="minValue" className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Value
              </label>
              <input
                type="number"
                id="minValue"
                value={minValue}
                onChange={(e) => setMinValue(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                min="-1000000"
                max="1000000"
              />
            </div>
            <div>
              <label htmlFor="maxValue" className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Value
              </label>
              <input
                type="number"
                id="maxValue"
                value={maxValue}
                onChange={(e) => setMaxValue(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                min="-1000000"
                max="1000000"
              />
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                min="1"
                max="100"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Generate Numbers
            </button>
            {results.length > 0 && (
              <button
                type="button"
                onClick={copyToClipboard}
                className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Copy Results
              </button>
            )}
          </div>
        </form>

        {results.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Numbers</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex flex-wrap gap-2">
                {results.map((num, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-2 bg-white border border-gray-200 rounded-md font-mono"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Generations</h2>
            <div className="space-y-2">
              {history.map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{item.timestamp}</span>
                    <span>{item.min} to {item.max} (x{item.qty})</span>
                  </div>
                  <div className="font-mono text-blue-600">
                    {item.numbers.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">About Random Number Generation</h2>
          <p className="mb-4">
            This tool generates truly random numbers using JavaScript's <code>Math.random()</code> function. 
            The numbers are uniformly distributed between your specified range.
          </p>
          
          <h3 className="text-lg font-medium text-gray-800 mb-2">Common Uses</h3>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Games and contests (raffles, draws)</li>
            <li>Statistical sampling and simulations</li>
            <li>Random selection processes</li>
            <li>Cryptography and security applications</li>
            <li>Educational purposes</li>
          </ul>

          <h3 className="text-lg font-medium text-gray-800 mb-2">Technical Notes</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Minimum value: -1,000,000</li>
            <li>Maximum value: 1,000,000</li>
            <li>Maximum quantity per generation: 100 numbers</li>
            <li>Numbers are generated client-side in your browser</li>
          </ul>
        </div>
      </div>
    </>
  );
}