'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

const conversionTypes = {
  length: {
    name: 'Length',
    units: [
      { name: 'Millimeters', value: 'mm', factor: 0.001 },
      { name: 'Centimeters', value: 'cm', factor: 0.01 },
      { name: 'Meters', value: 'm', factor: 1 },
      { name: 'Kilometers', value: 'km', factor: 1000 },
      { name: 'Inches', value: 'in', factor: 0.0254 },
      { name: 'Feet', value: 'ft', factor: 0.3048 },
      { name: 'Yards', value: 'yd', factor: 0.9144 },
      { name: 'Miles', value: 'mi', factor: 1609.34 }
    ]
  },
  weight: {
    name: 'Weight',
    units: [
      { name: 'Milligrams', value: 'mg', factor: 0.001 },
      { name: 'Grams', value: 'g', factor: 1 },
      { name: 'Kilograms', value: 'kg', factor: 1000 },
      { name: 'Metric Tons', value: 't', factor: 1000000 },
      { name: 'Ounces', value: 'oz', factor: 28.3495 },
      { name: 'Pounds', value: 'lb', factor: 453.592 },
      { name: 'Stones', value: 'st', factor: 6350.29 }
    ]
  },
  temperature: {
    name: 'Temperature',
    units: [
      { name: 'Celsius', value: '°C' },
      { name: 'Fahrenheit', value: '°F' },
      { name: 'Kelvin', value: 'K' }
    ]
  },
  volume: {
    name: 'Volume',
    units: [
      { name: 'Milliliters', value: 'ml', factor: 0.001 },
      { name: 'Liters', value: 'l', factor: 1 },
      { name: 'Cubic Meters', value: 'm³', factor: 1000 },
      { name: 'Teaspoons', value: 'tsp', factor: 0.00492892 },
      { name: 'Tablespoons', value: 'tbsp', factor: 0.0147868 },
      { name: 'Fluid Ounces', value: 'fl oz', factor: 0.0295735 },
      { name: 'Cups', value: 'cup', factor: 0.236588 },
      { name: 'Pints', value: 'pt', factor: 0.473176 },
      { name: 'Quarts', value: 'qt', factor: 0.946353 },
      { name: 'Gallons', value: 'gal', factor: 3.78541 }
    ]
  }
};

export default function ConversionCalculator() {
  const [conversionType, setConversionType] = useState('length');
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [result, setResult] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const convertTemperature = (value, from, to) => {
    let celsius;
    // Convert to Celsius first
    if (from === '°C') celsius = value;
    else if (from === '°F') celsius = (value - 32) * 5/9;
    else if (from === 'K') celsius = value - 273.15;

    // Convert from Celsius to target unit
    if (to === '°C') return celsius;
    if (to === '°F') return (celsius * 9/5) + 32;
    if (to === 'K') return celsius + 273.15;
  };

  const convertValue = () => {
    if (inputValue === '' || isNaN(inputValue)) {
      setResult(null);
      return;
    }

    const numValue = parseFloat(inputValue);
    
    if (conversionType === 'temperature') {
      const converted = convertTemperature(numValue, fromUnit, toUnit);
      setResult(converted.toFixed(6).replace(/\.?0+$/, ''));
    } else {
      const fromUnitData = conversionTypes[conversionType].units.find(u => u.value === fromUnit);
      const toUnitData = conversionTypes[conversionType].units.find(u => u.value === toUnit);
      
      if (fromUnitData && toUnitData) {
        const baseValue = numValue * fromUnitData.factor;
        const convertedValue = baseValue / toUnitData.factor;
        setResult(convertedValue.toFixed(6).replace(/\.?0+$/, ''));
      }
    }
  };

  useEffect(() => {
    convertValue();
  }, [inputValue, fromUnit, toUnit, conversionType]);

  const resetCalculator = () => {
    setInputValue('');
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <Head>
        <title>Universal Conversion Calculator | Convert Units Online</title>
        <meta 
          name="description" 
          content="Convert between different units of length, weight, temperature, and volume. Accurate and easy-to-use online conversion calculator for all your measurement needs."
        />
        <meta name="keywords" content="conversion calculator, unit converter, measurement converter, length converter, weight converter, temperature converter, volume converter" />
        <meta property="og:title" content="Universal Conversion Calculator | Convert Units Online" />
        <meta property="og:description" content="Convert between different units of measurement with our accurate online conversion calculator." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://yourdomain.com/conversion-calculator" />
      </Head>

      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Conversion Calculator</h1>
        <p className="text-gray-600 mb-6">
          Convert between different units of measurement
        </p>

        <div className="mb-6">
          <label htmlFor="conversionType" className="block text-sm font-medium text-gray-700 mb-1">
            Conversion Type
          </label>
          <select
            id="conversionType"
            value={conversionType}
            onChange={(e) => {
              setConversionType(e.target.value);
              const units = conversionTypes[e.target.value].units;
              setFromUnit(units[0].value);
              setToUnit(units[1]?.value || units[0].value);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.entries(conversionTypes).map(([key, type]) => (
              <option key={key} value={key}>{type.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="inputValue" className="block text-sm font-medium text-gray-700 mb-1">
              Value
            </label>
            <input
              type="number"
              id="inputValue"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter value"
              step="any"
            />
          </div>
          <div>
            <label htmlFor="fromUnit" className="block text-sm font-medium text-gray-700 mb-1">
              From
            </label>
            <select
              id="fromUnit"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {conversionTypes[conversionType].units.map(unit => (
                <option key={`from-${unit.value}`} value={unit.value}>{unit.name} ({unit.value})</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="toUnit" className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <select
              id="toUnit"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {conversionTypes[conversionType].units.map(unit => (
                <option key={`to-${unit.value}`} value={unit.value}>{unit.name} ({unit.value})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Conversion Result</p>
              <p className="text-2xl font-bold">
                {result !== null ? result : '--'} {toUnit}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={copyResult}
                disabled={!result}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Copy
              </button>
              <button
                onClick={resetCalculator}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">About Unit Conversions</h2>
          <p className="mb-4">
            This calculator provides accurate conversions between different units of measurement. 
            All conversions are based on standard conversion factors and formulas.
          </p>
          
          <h3 className="text-lg font-medium text-gray-800 mb-2">Conversion Types</h3>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li><strong>Length:</strong> Convert between metric and imperial length units</li>
            <li><strong>Weight:</strong> Convert between metric and imperial weight units</li>
            <li><strong>Temperature:</strong> Convert between Celsius, Fahrenheit, and Kelvin</li>
            <li><strong>Volume:</strong> Convert between metric and US customary volume units</li>
          </ul>

          <h3 className="text-lg font-medium text-gray-800 mb-2">How to Use</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Select the type of conversion you need</li>
            <li>Enter the value you want to convert</li>
            <li>Select the unit you're converting from</li>
            <li>Select the unit you want to convert to</li>
            <li>The result will appear automatically</li>
          </ol>
        </div>
      </div>
    </>
  );
}