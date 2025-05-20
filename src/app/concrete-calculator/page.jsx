'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ConcreteCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [quantity, setQuantity] = useState(null);
  const [bags, setBags] = useState(null);
  const [cost, setCost] = useState('');
  const [totalCost, setTotalCost] = useState(null);
  const [error, setError] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const calculateConcrete = (e) => {
    e.preventDefault();
    setError(null);

    // Validate inputs
    if (!length || !width || !depth) {
      setError('Please fill in all dimensions');
      return;
    }

    const lengthValue = parseFloat(length);
    const widthValue = parseFloat(width);
    const depthValue = parseFloat(depth);

    if (isNaN(lengthValue) || isNaN(widthValue) || isNaN(depthValue) || 
        lengthValue <= 0 || widthValue <= 0 || depthValue <= 0) {
      setError('Please enter valid positive numbers for all dimensions');
      return;
    }

    // Calculate concrete needed in cubic yards
    const cubicFeet = lengthValue * widthValue * (depthValue / 12); // Convert depth to feet
    const cubicYards = cubicFeet / 27;
    setQuantity(cubicYards.toFixed(2));

    // Calculate number of 60lb bags needed (1 bag = 0.45 cubic feet)
    const bagsNeeded = Math.ceil(cubicFeet / 0.45);
    setBags(bagsNeeded);

    // Calculate cost if provided
    if (cost) {
      const costValue = parseFloat(cost);
      if (!isNaN(costValue)) {  // Fixed this line - added missing parenthesis
        setTotalCost((cubicYards * costValue).toFixed(2));
      }
    }
  };

  const resetCalculator = () => {
    setLength('');
    setWidth('');
    setDepth('');
    setQuantity(null);
    setBags(null);
    setCost('');
    setTotalCost(null);
    setError(null);
  };

  if (!isMounted) return null;

  return (
    <>
      <Head>
        <title>Concrete Calculator | Estimate Your Concrete Needs</title>
        <meta 
          name="description" 
          content="Calculate how much concrete you need for your project. Estimate cubic yards required and number of bags needed for slabs, footings, and more." 
        />
        <meta name="keywords" content="concrete calculator, concrete estimate, how much concrete, cubic yards calculator, concrete bags calculator" />
        <meta property="og:title" content="Concrete Calculator | Estimate Your Concrete Needs" />
        <meta property="og:description" content="Calculate how much concrete you need for your project with our free concrete calculator." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Concrete Calculator</h1>
        <p className="text-gray-600 mb-6">
          Calculate the amount of concrete needed for your project in cubic yards or number of bags.
        </p>

        <form onSubmit={calculateConcrete} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">
                Length (feet)
              </label>
              <input
                type="number"
                id="length"
                min="0.1"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="10"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">
                Width (feet)
              </label>
              <input
                type="number"
                id="width"
                min="0.1"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="10"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="depth" className="block text-sm font-medium text-gray-700 mb-1">
                Depth (inches)
              </label>
              <input
                type="number"
                id="depth"
                min="1"
                step="0.5"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="4"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
                Cost per cubic yard (optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  id="cost"
                  min="0"
                  step="0.01"
                  className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="100.00"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={resetCalculator}
              className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Reset
            </button>
          </div>
        </form>

        {(quantity || bags) && (
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-md">
                <h3 className="text-lg font-medium text-blue-800">Concrete Volume Needed</h3>
                <p className="text-2xl font-bold text-blue-700 mt-2">
                  {quantity} cubic yards
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  ({(quantity * 27).toFixed(2)} cubic feet)
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-md">
                <h3 className="text-lg font-medium text-green-800">60lb Bags Needed</h3>
                <p className="text-2xl font-bold text-green-700 mt-2">
                  {bags} bags
                </p>
                <p className="text-sm text-green-600 mt-1">
                  (1 bag = 0.45 cubic feet)
                </p>
              </div>
            </div>

            {totalCost && (
              <div className="p-4 bg-purple-50 rounded-md">
                <h3 className="text-lg font-medium text-purple-800">Estimated Cost</h3>
                <p className="text-2xl font-bold text-purple-700 mt-2">
                  ${totalCost}
                </p>
                <p className="text-sm text-purple-600 mt-1">
                  Based on ${cost} per cubic yard
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How to Use This Calculator</h2>
          <div className="prose max-w-none">
            <ol className="list-decimal pl-5 space-y-2">
              <li>Enter the length and width of your project area in feet</li>
              <li>Enter the depth of concrete needed in inches (4 inches for typical slabs)</li>
              <li>Optionally enter the cost per cubic yard for a cost estimate</li>
              <li>Click "Calculate" to see results</li>
            </ol>
            <p className="mt-4">
              <strong>Note:</strong> This calculator provides estimates only. Always consult with a professional for exact requirements.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}