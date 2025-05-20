"use client";

import { useState, useEffect } from 'react';
import { FaPercentage, FaEquals, FaCalculator, FaInfoCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function PercentageCalculator() {
  const [calculationType, setCalculationType] = useState('findPercentage');
  const [values, setValues] = useState({
    part: '',
    whole: '',
    percentage: '',
    result: '',
    increaseDecreaseAmount: '',
    isIncrease: true
  });
  const [showInstructions, setShowInstructions] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration error
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value,
      result: '' // Clear result when inputs change
    }));
  };

  const calculate = () => {
    // Input validation
    if (calculationType === 'findPercentage' && (!values.percentage || !values.whole)) {
      setValues(prev => ({ ...prev, result: 'Please enter both values' }));
      return;
    }
    if (calculationType === 'findValue' && (!values.part || !values.whole)) {
      setValues(prev => ({ ...prev, result: 'Please enter both values' }));
      return;
    }
    if (calculationType === 'findBase' && (!values.part || !values.percentage)) {
      setValues(prev => ({ ...prev, result: 'Please enter both values' }));
      return;
    }
    if (calculationType === 'increaseDecrease' && (!values.whole || !values.increaseDecreaseAmount)) {
      setValues(prev => ({ ...prev, result: 'Please enter both values' }));
      return;
    }

    switch (calculationType) {
      case 'findPercentage':
        const percentageResult = (parseFloat(values.part) / parseFloat(values.whole)) * 100;
        setValues(prev => ({ ...prev, result: `${percentageResult.toFixed(2)}%` }));
        break;
      case 'findValue':
        const valueResult = (parseFloat(values.whole) * parseFloat(values.percentage)) / 100;
        setValues(prev => ({ ...prev, result: valueResult.toFixed(2) }));
        break;
      case 'findBase':
        const baseResult = (parseFloat(values.part) * 100) / parseFloat(values.percentage);
        setValues(prev => ({ ...prev, result: baseResult.toFixed(2) }));
        break;
      case 'increaseDecrease':
        const change = parseFloat(values.increaseDecreaseAmount);
        const base = parseFloat(values.whole);
        const changeResult = values.isIncrease 
          ? base + (base * change / 100) 
          : base - (base * change / 100);
        setValues(prev => ({
          ...prev,
          result: changeResult.toFixed(2),
          percentage: change.toString()
        }));
        break;
      default:
        break;
    }
  };

  const resetForm = () => {
    setValues({
      part: '',
      whole: '',
      percentage: '',
      result: '',
      increaseDecreaseAmount: '',
      isIncrease: true
    });
  };

  const toggleIncreaseDecrease = () => {
    setValues(prev => ({
      ...prev,
      isIncrease: !prev.isIncrease
    }));
  };

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden md:max-w-2xl p-6">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-100 p-3 rounded-full mb-3">
            <FaCalculator className="text-blue-600 text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Percentage Calculator</h1>
          <p className="text-gray-600 text-center">Calculate percentages easily for any scenario</p>
        </div>

        {/* Calculation Type Selector */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Select Calculation Type:</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => setCalculationType('findPercentage')}
              className={`p-3 rounded-lg transition-all ${calculationType === 'findPercentage' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              What is X% of Y?
            </button>
            <button
              onClick={() => setCalculationType('findValue')}
              className={`p-3 rounded-lg transition-all ${calculationType === 'findValue' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              X is what % of Y?
            </button>
            <button
              onClick={() => setCalculationType('findBase')}
              className={`p-3 rounded-lg transition-all ${calculationType === 'findBase' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              X is Y% of what?
            </button>
            <button
              onClick={() => setCalculationType('increaseDecrease')}
              className={`p-3 rounded-lg transition-all ${calculationType === 'increaseDecrease' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Increase/Decrease
            </button>
          </div>

          {/* Instructions */}
          <div 
            className="bg-blue-50/80 p-4 rounded-xl border border-blue-100 cursor-pointer transition-all hover:bg-blue-50"
            onClick={() => setShowInstructions(!showInstructions)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaInfoCircle className="text-blue-500 mr-2" />
                <h3 className="font-medium text-blue-700">
                  {calculationType === 'findPercentage' ? 'How to calculate "What is X% of Y?"'
                   : calculationType === 'findValue' ? 'How to calculate "X is what % of Y?"'
                   : calculationType === 'findBase' ? 'How to calculate "X is Y% of what?"'
                   : 'How to calculate increase/decrease by X%'}
                </h3>
              </div>
              <span className="text-blue-500">{showInstructions ? '▲' : '▼'}</span>
            </div>
            
            {showInstructions && (
              <div className="mt-3 text-sm text-gray-700 space-y-2">
                {calculationType === 'findPercentage' && (
                  <>
                    <p>This calculates what X percentage is of a base value Y.</p>
                    <p className="font-medium">Example:</p>
                    <p className="bg-blue-100/50 p-2 rounded">What is 15% of 200?<br />Answer: 30</p>
                    <p>Enter 15 in percentage field and 200 in whole value field.</p>
                  </>
                )}
                {calculationType === 'findValue' && (
                  <>
                    <p>This calculates what percentage X is of Y.</p>
                    <p className="font-medium">Example:</p>
                    <p className="bg-blue-100/50 p-2 rounded">30 is what percent of 150?<br />Answer: 20%</p>
                    <p>Enter 30 in part value field and 150 in whole value field.</p>
                  </>
                )}
                {calculationType === 'findBase' && (
                  <>
                    <p>This calculates the base value when you know a part and its percentage.</p>
                    <p className="font-medium">Example:</p>
                    <p className="bg-blue-100/50 p-2 rounded">50 is 20% of what?<br />Answer: 250</p>
                    <p>Enter 50 in part value field and 20 in percentage field.</p>
                  </>
                )}
                {calculationType === 'increaseDecrease' && (
                  <>
                    <p>This calculates the result after increasing or decreasing a value by a percentage.</p>
                    <p className="font-medium">Example:</p>
                    <p className="bg-blue-100/50 p-2 rounded">Increase 100 by 10%<br />Answer: 110</p>
                    <p>Enter 100 in base value field and 10 in percentage field.</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-5 mb-8">
          {calculationType === 'findPercentage' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Percentage (X%)</label>
                <div className="flex">
                  <input
                    type="number"
                    name="percentage"
                    value={values.percentage}
                    onChange={handleInputChange}
                    placeholder="Enter percentage"
                    className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="bg-gray-100 px-4 py-3 rounded-r-lg border border-l-0 border-gray-300 flex items-center">
                    <FaPercentage className="text-gray-500" />
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Whole Value (Y)</label>
                <div className="flex">
                  <span className="bg-gray-100 px-4 py-3 rounded-l-lg border border-r-0 border-gray-300 flex items-center">of</span>
                  <input
                    type="number"
                    name="whole"
                    value={values.whole}
                    onChange={handleInputChange}
                    placeholder="Enter whole value"
                    className="flex-1 p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          {calculationType === 'findValue' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Part Value (X)</label>
                <input
                  type="number"
                  name="part"
                  value={values.part}
                  onChange={handleInputChange}
                  placeholder="Enter part value"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Whole Value (Y)</label>
                <div className="flex">
                  <input
                    type="number"
                    name="whole"
                    value={values.whole}
                    onChange={handleInputChange}
                    placeholder="Enter whole value"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">We'll calculate what percentage X is of Y</p>
              </div>
            </>
          )}

          {calculationType === 'findBase' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Part Value (X)</label>
                <input
                  type="number"
                  name="part"
                  value={values.part}
                  onChange={handleInputChange}
                  placeholder="Enter part value"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Percentage (Y%)</label>
                <div className="flex">
                  <input
                    type="number"
                    name="percentage"
                    value={values.percentage}
                    onChange={handleInputChange}
                    placeholder="Enter percentage"
                    className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="bg-gray-100 px-4 py-3 rounded-r-lg border border-l-0 border-gray-300 flex items-center">
                    <FaPercentage className="text-gray-500" />
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">We'll calculate what number X is Y% of</p>
              </div>
            </>
          )}

          {calculationType === 'increaseDecrease' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Base Value</label>
                <div className="flex">
                  <button 
                    onClick={toggleIncreaseDecrease}
                    className={`px-4 py-3 rounded-l-lg border flex items-center gap-2 ${values.isIncrease ? 'bg-green-500 text-white border-green-600' : 'bg-red-500 text-white border-red-600'}`}
                  >
                    {values.isIncrease ? <FaArrowUp /> : <FaArrowDown />}
                    {values.isIncrease ? 'Increase' : 'Decrease'}
                  </button>
                  <input
                    type="number"
                    name="whole"
                    value={values.whole}
                    onChange={handleInputChange}
                    placeholder="Enter base value"
                    className="flex-1 p-3 border-t border-b border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="bg-gray-100 px-4 py-3 rounded-r-lg border border-l-0 border-gray-300 flex items-center">by</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Percentage</label>
                <div className="flex">
                  <input
                    type="number"
                    name="increaseDecreaseAmount"
                    value={values.increaseDecreaseAmount}
                    onChange={handleInputChange}
                    placeholder="Enter percentage"
                    className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="bg-gray-100 px-4 py-3 rounded-r-lg border border-l-0 border-gray-300 flex items-center">
                    <FaPercentage className="text-gray-500" />
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={calculate}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
          >
            <FaEquals /> Calculate
          </button>
          <button
            onClick={resetForm}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium transition-all"
          >
            Reset
          </button>
        </div>

        {/* Results */}
        {values.result && (
          <div className={`p-4 rounded-xl ${values.result.includes('Please') ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
            <h3 className="font-semibold mb-1">
              {values.result.includes('Please') ? 'Error' : 'Calculation Result'}
            </h3>
            <p className={`text-2xl font-bold ${values.result.includes('Please') ? 'text-red-600' : 'text-green-600'}`}>
              {values.result}
            </p>
            {calculationType === 'increaseDecrease' && !values.result.includes('Please') && (
              <p className="mt-2 text-sm text-gray-600">
                {values.whole} {values.isIncrease ? 'increased' : 'decreased'} by {values.increaseDecreaseAmount}% = {values.result}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}