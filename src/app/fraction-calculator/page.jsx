"use client";

import { useState, useEffect } from 'react';
import { FaDivide, FaTimes, FaPlus, FaMinus, FaEquals, FaInfoCircle, FaCalculator, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function FractionCalculator() {
  const [fraction1, setFraction1] = useState({ numerator: '', denominator: '' });
  const [fraction2, setFraction2] = useState({ numerator: '', denominator: '' });
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState('');
  const [showMixed, setShowMixed] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    basics: true,
    examples: false,
    advanced: false
  });

  // Fix hydration error
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate greatest common divisor
  const gcd = (a, b) => {
    return b ? gcd(b, a % b) : a;
  };

  // Simplify fraction
  const simplify = (num, den) => {
    const commonDivisor = gcd(Math.abs(num), Math.abs(den));
    return [num / commonDivisor, den / commonDivisor];
  };

  // Convert to mixed number
  const toMixed = (num, den) => {
    if (den === 0) return 'Undefined';
    if (num === 0) return '0';
    
    const whole = Math.floor(Math.abs(num) / Math.abs(den));
    const remainder = Math.abs(num) % Math.abs(den);
    const sign = num * den < 0 ? '-' : '';
    
    if (whole === 0) return `${sign}${remainder}/${Math.abs(den)}`;
    if (remainder === 0) return `${sign}${whole}`;
    
    return `${sign}${whole} ${remainder}/${Math.abs(den)}`;
  };

  const calculate = () => {
    const num1 = parseInt(fraction1.numerator);
    const den1 = parseInt(fraction1.denominator) || 1;
    const num2 = parseInt(fraction2.numerator);
    const den2 = parseInt(fraction2.denominator) || 1;

    if (isNaN(num1)) {
      setResult('Enter first fraction');
      return;
    }
    if (isNaN(num2)) {
      setResult('Enter second fraction');
      return;
    }

    let resultNum, resultDen;

    switch (operation) {
      case '+':
        resultNum = num1 * den2 + num2 * den1;
        resultDen = den1 * den2;
        break;
      case '-':
        resultNum = num1 * den2 - num2 * den1;
        resultDen = den1 * den2;
        break;
      case '*':
        resultNum = num1 * num2;
        resultDen = den1 * den2;
        break;
      case '/':
        resultNum = num1 * den2;
        resultDen = den1 * num2;
        break;
      default:
        return;
    }

    if (resultDen === 0) {
      setResult('Undefined (division by zero)');
      return;
    }

    const [simplifiedNum, simplifiedDen] = simplify(resultNum, resultDen);

    if (showMixed) {
      setResult(toMixed(simplifiedNum, simplifiedDen));
    } else {
      setResult(`${simplifiedNum}/${simplifiedDen}`);
    }
  };

  const resetCalculator = () => {
    setFraction1({ numerator: '', denominator: '' });
    setFraction2({ numerator: '', denominator: '' });
    setResult('');
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex items-center justify-center gap-3">
            <FaCalculator className="text-2xl" />
            <h1 className="text-2xl font-bold">Professional Fraction Calculator</h1>
          </div>
          <p className="text-center text-blue-100 mt-2">
            Perform operations with fractions and mixed numbers
          </p>
        </div>

        {/* Main Calculator */}
        <div className="p-6">
          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-6">
            {/* Fraction 1 */}
            <div className="flex flex-col items-center">
              <input
                type="number"
                value={fraction1.numerator}
                onChange={(e) => setFraction1({ ...fraction1, numerator: e.target.value })}
                placeholder="Numerator"
                className="w-full p-3 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="w-full border-t border-gray-300 my-1"></div>
              <input
                type="number"
                value={fraction1.denominator}
                onChange={(e) => setFraction1({ ...fraction1, denominator: e.target.value })}
                placeholder="Denominator"
                className="w-full p-3 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Operation Selector */}
            <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setOperation('+')}
                  className={`p-3 rounded-lg transition-colors ${operation === '+' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <FaPlus />
                </button>
                <button
                  onClick={() => setOperation('-')}
                  className={`p-3 rounded-lg transition-colors ${operation === '-' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <FaMinus />
                </button>
                <button
                  onClick={() => setOperation('*')}
                  className={`p-3 rounded-lg transition-colors ${operation === '*' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <FaTimes />
                </button>
                <button
                  onClick={() => setOperation('/')}
                  className={`p-3 rounded-lg transition-colors ${operation === '/' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <FaDivide />
                </button>
              </div>
            </div>

            {/* Fraction 2 */}
            <div className="flex flex-col items-center">
              <input
                type="number"
                value={fraction2.numerator}
                onChange={(e) => setFraction2({ ...fraction2, numerator: e.target.value })}
                placeholder="Numerator"
                className="w-full p-3 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="w-full border-t border-gray-300 my-1"></div>
              <input
                type="number"
                value={fraction2.denominator}
                onChange={(e) => setFraction2({ ...fraction2, denominator: e.target.value })}
                placeholder="Denominator"
                className="w-full p-3 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Equals and Result */}
            <div className="flex flex-col items-center justify-center">
              <button
                onClick={calculate}
                className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg mb-2 transition-colors"
              >
                <FaEquals />
              </button>
              <div className="text-center">
                <label className="flex items-center justify-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showMixed}
                    onChange={() => setShowMixed(!showMixed)}
                    className="mr-2 h-4 w-4"
                  />
                  <span className="text-sm">Mixed Number</span>
                </label>
              </div>
            </div>

            {/* Result Display */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Result:</h3>
              <div className={`text-2xl font-bold min-h-10 ${result.includes('Undefined') ? 'text-red-600' : 'text-gray-800'}`}>
                {result || ' '}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={resetCalculator}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaInfoCircle /> {showGuide ? 'Hide Guide' : 'Show Guide'}
            </button>
          </div>
        </div>

        {/* User Guide - Divided into 3 sections */}
        {showGuide && (
          <div className="bg-gray-50 border-t border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Fraction Calculator Guide</h2>
            
            {/* Section 1: Basic Operations */}
            <div className="mb-6 bg-white rounded-lg overflow-hidden shadow-sm">
              <button 
                onClick={() => toggleSection('basics')}
                className="w-full flex justify-between items-center p-4 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <h3 className="font-medium text-gray-700">Basic Operations</h3>
                {expandedSections.basics ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {expandedSections.basics && (
                <div className="p-4 border-t">
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">1</span>
                      <span>Enter numerators (top numbers) and denominators (bottom numbers) for both fractions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">2</span>
                      <span>Select the operation (+, -, ×, ÷) using the buttons</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">3</span>
                      <span>Click the equals (=) button to calculate</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">4</span>
                      <span>Toggle "Mixed Number" to display results as mixed numbers (e.g., 1 1/2 instead of 3/2)</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Section 2: Examples */}
            <div className="mb-6 bg-white rounded-lg overflow-hidden shadow-sm">
              <button 
                onClick={() => toggleSection('examples')}
                className="w-full flex justify-between items-center p-4 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <h3 className="font-medium text-gray-700">Examples</h3>
                {expandedSections.examples ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {expandedSections.examples && (
                <div className="p-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                      <p className="font-medium text-blue-600">Addition:</p>
                      <p>1/2 + 1/4 = 3/4</p>
                      <p className="text-sm text-gray-500 mt-1">(Enter 1/2 + 1/4)</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                      <p className="font-medium text-blue-600">Subtraction:</p>
                      <p>3/4 - 1/2 = 1/4</p>
                      <p className="text-sm text-gray-500 mt-1">(Enter 3/4 - 1/2)</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                      <p className="font-medium text-blue-600">Multiplication:</p>
                      <p>2/3 × 3/4 = 1/2</p>
                      <p className="text-sm text-gray-500 mt-1">(Enter 2/3 × 3/4)</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                      <p className="font-medium text-blue-600">Division:</p>
                      <p>1/2 ÷ 1/4 = 2/1</p>
                      <p className="text-sm text-gray-500 mt-1">(Enter 1/2 ÷ 1/4)</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Advanced Features */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <button 
                onClick={() => toggleSection('advanced')}
                className="w-full flex justify-between items-center p-4 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <h3 className="font-medium text-gray-700">Advanced Features & Tips</h3>
                {expandedSections.advanced ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {expandedSections.advanced && (
                <div className="p-4 border-t">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Special Inputs</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">•</span>
                          <span><strong>Whole numbers:</strong> Enter as fraction (e.g., 3 as 3/1)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">•</span>
                          <span><strong>Negative fractions:</strong> Put negative sign in numerator (e.g., -1/2)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">•</span>
                          <span><strong>Empty denominator:</strong> Treated as 1 (e.g., 3/ = 3/1)</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Calculation Features</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">•</span>
                          <span><strong>Automatic simplification:</strong> Results always reduced to lowest terms</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">•</span>
                          <span><strong>Mixed numbers:</strong> Option to display improper fractions as mixed numbers</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">•</span>
                          <span><strong>Error handling:</strong> Shows "Undefined" for division by zero</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}