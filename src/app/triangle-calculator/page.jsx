"use client";

import { useState, useEffect } from 'react';
import { FaCalculator, FaInfoCircle, FaChevronDown, FaChevronUp, FaRuler, FaRulerCombined, FaShapes, FaExclamationTriangle, FaEquals  } from 'react-icons/fa';

export default function TriangleCalculator() {
  const [sideA, setSideA] = useState('');
  const [sideB, setSideB] = useState('');
  const [sideC, setSideC] = useState('');
  const [base, setBase] = useState('');
  const [height, setHeight] = useState('');
  const [results, setResults] = useState({
    area: '',
    perimeter: '',
    type: '',
    isValid: true
  });
  const [showGuide, setShowGuide] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const calculateTriangle = () => {
    const a = parseFloat(sideA) || 0;
    const b = parseFloat(sideB) || 0;
    const c = parseFloat(sideC) || 0;
    const baseVal = parseFloat(base) || 0;
    const heightVal = parseFloat(height) || 0;

    // Validate triangle sides
    const isValid = a + b > c && a + c > b && b + c > a;
    
    if (!isValid) {
      setResults({
        area: 'Invalid',
        perimeter: 'Invalid',
        type: 'Not a valid triangle',
        isValid: false
      });
      return;
    }

    // Calculate perimeter
    const perimeter = a + b + c;
    
    // Calculate area (using Heron's formula if all sides provided, otherwise base*height/2)
    let area;
    if (a > 0 && b > 0 && c > 0) {
      const s = perimeter / 2;
      area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    } else if (baseVal > 0 && heightVal > 0) {
      area = (baseVal * heightVal) / 2;
    } else {
      area = 'Insufficient data';
    }

    // Determine triangle type
    let type;
    if (a === b && b === c) {
      type = 'Equilateral';
    } else if (a === b || a === c || b === c) {
      type = 'Isosceles';
    } else {
      type = 'Scalene';
    }

    // Check if right-angled
    const sides = [a, b, c].sort((x, y) => x - y);
    if (Math.abs(sides[0] ** 2 + sides[1] ** 2 - sides[2] ** 2) < 0.0001) {
      type += ', Right-angled';
    }

    setResults({
      area: typeof area === 'number' ? area.toFixed(2) : area,
      perimeter: perimeter.toFixed(2),
      type,
      isValid: true
    });
  };

  const resetCalculator = () => {
    setSideA('');
    setSideB('');
    setSideC('');
    setBase('');
    setHeight('');
    setResults({
      area: '',
      perimeter: '',
      type: '',
      isValid: true
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex items-center justify-center gap-3">
            <FaCalculator className="text-2xl" />
            <h1 className="text-2xl font-bold">Triangle Calculator</h1>
          </div>
          <p className="text-center text-blue-100 mt-2">
            Calculate area, perimeter, and type of triangle
          </p>
        </div>

        {/* Main Calculator */}
        <div className="p-6">
          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <FaRuler /> Side Lengths
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-8">a:</span>
                  <input
                    type="number"
                    value={sideA}
                    onChange={(e) => setSideA(e.target.value)}
                    placeholder="Side a"
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8">b:</span>
                  <input
                    type="number"
                    value={sideB}
                    onChange={(e) => setSideB(e.target.value)}
                    placeholder="Side b"
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8">c:</span>
                  <input
                    type="number"
                    value={sideC}
                    onChange={(e) => setSideC(e.target.value)}
                    placeholder="Side c"
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <FaRulerCombined /> Base & Height
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-8">Base:</span>
                  <input
                    type="number"
                    value={base}
                    onChange={(e) => setBase(e.target.value)}
                    placeholder="Base"
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8">Height:</span>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Height"
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Note: Provide either all 3 sides OR base and height
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className={`mb-6 p-4 rounded-lg border ${results.isValid ? 'bg-gray-50 border-gray-200' : 'bg-red-50 border-red-200'}`}>
            <h3 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FaShapes /> Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Area:</p>
                <p className={`text-lg font-semibold ${results.isValid ? 'text-gray-800' : 'text-red-600'}`}>
                  {results.area || '-'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Perimeter:</p>
                <p className={`text-lg font-semibold ${results.isValid ? 'text-gray-800' : 'text-red-600'}`}>
                  {results.perimeter || '-'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type:</p>
                <p className={`text-lg font-semibold ${results.isValid ? 'text-gray-800' : 'text-red-600'}`}>
                  {results.type || '-'}
                </p>
              </div>
            </div>
            {!results.isValid && (
              <div className="mt-2 flex items-center gap-2 text-red-600">
                <FaExclamationTriangle />
                <span>Invalid triangle: Sum of any two sides must be greater than the third side</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={calculateTriangle}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaEquals /> Calculate
            </button>
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

        {/* User Guide */}
        {showGuide && (
          <div className="bg-gray-50 border-t border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <FaInfoCircle /> Triangle Calculator Guide
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">How to Use</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">1</span>
                    <span>Enter either all three side lengths (a, b, c) OR base and height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">2</span>
                    <span>Click "Calculate" to get area, perimeter, and triangle type</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">3</span>
                    <span>Use "Reset" to clear all fields</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Calculation Methods</h3>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="font-medium text-blue-600">Using Side Lengths:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Area calculated using Heron's formula</li>
                    <li>Perimeter = a + b + c</li>
                    <li>Type determined by side equality and angles</li>
                  </ul>
                  
                  <p className="font-medium text-blue-600 mt-3">Using Base & Height:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Area = (base × height) / 2</li>
                    <li>Perimeter requires side lengths</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Triangle Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="font-medium">By Sides:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li><strong>Equilateral:</strong> All sides equal</li>
                      <li><strong>Isosceles:</strong> Two sides equal</li>
                      <li><strong>Scalene:</strong> No sides equal</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="font-medium">By Angles:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li><strong>Right-angled:</strong> One 90° angle (a² + b² = c²)</li>
                      <li><strong>Acute:</strong> All angles &lt; 90°</li>
                      <li><strong>Obtuse:</strong> One angle &gt; 90°</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}