'use client';
import React, { useState } from 'react';
import { FiSun, FiMoon, FiTrash2, FiDelete } from 'react-icons/fi';
import Head from 'next/head';

const SimpleMobileCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [openArticle, setOpenArticle] = useState(null);

  // Safer evaluation function
  const evaluate = (expression) => {
    if (!expression) return '';
    try {
      // Sanitize input and handle percentages
      const sanitized = expression
        .replace(/[^-()\d/*+.]/g, '')
        .replace(/%/g, '*0.01');
      // eslint-disable-next-line no-new-func
      const calculation = new Function(`return ${sanitized}`)();
      return parseFloat(calculation.toFixed(8)).toString(); // Limit decimal places
    } catch {
      return '';
    }
  };

  const handleClick = (value) => {
    if (value === 'C') {
      // Clear everything
      setInput('');
      setResult('');
    } else if (value === '⌫') {
      // Backspace functionality
      if (input.length <= 1) {
        setInput('');
        setResult('');
      } else {
        const newInput = input.slice(0, -1);
        setInput(newInput);
        setResult(evaluate(newInput));
      }
    } else if (value === '=') {
      // Calculate final result
      if (!input) return;
      try {
        const finalResult = evaluate(input);
        setResult(finalResult);
        setInput(finalResult);
        setHistory(prev => [...prev.slice(-4), `${input} = ${finalResult}`]);
      } catch {
        setResult('Error');
      }
    } else if (value === '%') {
      // Percentage calculation
      if (!input) return;
      const percentageValue = evaluate(`${input}/100`);
      setInput(percentageValue);
      setResult(percentageValue);
    } else {
      // Prevent multiple operators
      const lastChar = input.slice(-1);
      const operators = ['+', '-', '*', '/', '.'];
      if (operators.includes(lastChar) && operators.includes(value)) return;
      
      const newInput = input + value;
      setInput(newInput);
      setResult(evaluate(newInput));
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  // Standard calculator button layout
  const buttons = [
    { value: 'C', className: 'bg-red-500 hover:bg-red-600 text-white' },
    { value: '⌫', className: 'bg-gray-500 hover:bg-gray-600 text-white', icon: <FiDelete /> },
    { value: '%', className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { value: '/', className: 'bg-blue-500 hover:bg-blue-600 text-white' },
    { value: '7', className: 'bg-gray-100 hover:bg-gray-200 text-gray-800' },
    { value: '8', className: 'bg-gray-100 hover:bg-gray-200 text-gray-800' },
    { value: '9', className: 'bg-gray-100 hover:bg-gray-200 text-gray-800' },
    { value: '*', className: 'bg-blue-500 hover:bg-blue-600 text-white' },
    { value: '4', className: 'bg-gray-100 hover:bg-gray-200 text-gray-800' },
    { value: '5', className: 'bg-gray-100 hover:bg-gray-200 text-gray-800' },
    { value: '6', className: 'bg-gray-100 hover:bg-gray-200 text-gray-800' },
    { value: '-', className: 'bg-blue-500 hover:bg-blue-600 text-white' },
    { value: '1', className: 'bg-gray-100 hover:bg-gray-200 text-gray-800' },
    { value: '2', className: 'bg-gray-100 hover:bg-gray-200 text-gray-800' },
    { value: '3', className: 'bg-gray-100 hover:bg-gray-200 text-gray-800' },
    { value: '+', className: 'bg-blue-500 hover:bg-blue-600 text-white' },
    { value: '0', className: 'col-span-2 bg-gray-100 hover:bg-gray-200 text-gray-800' },
    { value: '.', className: 'bg-gray-100 hover:bg-gray-200 text-gray-800' },
    { value: '=', className: 'bg-green-500 hover:bg-green-600 text-white' },
  ];

  const articles = [
    {
      title: '1. Basic Calculator Functions',
      content: 'This calculator supports all basic arithmetic operations: addition (+), subtraction (-), multiplication (*), and division (/). Press "=" to calculate the result.'
    },
    {
      title: '2. Advanced Features',
      content: 'Use "C" to clear everything, "⌫" to delete last character, and "%" for percentage calculations. Your last 4 calculations are saved in history.'
    },
    {
      title: '3. Dark Mode & Settings',
      content: 'Toggle between light and dark mode using the sun/moon icon. The calculator shows live results as you type for instant feedback.'
    }
  ];

  return (
    <>
      <Head>
        <title>Advanced Scientific Calculator | Math Tool Online</title>
        <meta name="description" content="Free online scientific calculator with real-time calculations, history, and dark mode. Perfect for students, engineers, and everyday math problems." />
        <meta name="keywords" content="calculator, scientific calculator, math tool, online calculator, percentage calculator" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="author" content="Calculator App" />
        <meta property="og:title" content="Advanced Scientific Calculator | Math Tool Online" />
        <meta property="og:description" content="Free online scientific calculator with real-time calculations and history" />
        <link rel="canonical" href="https://calculator-app.com" />
      </Head>

      <div className={`min-h-screen flex flex-col items-center justify-start px-4 py-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className={`w-full max-w-md p-6 rounded-xl shadow-lg transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Header with Dark Mode Toggle */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Scientific Calculator</h1>
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>

          {/* Display Area */}
          <div className={`mb-4 p-4 rounded-lg text-right ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className={`text-2xl font-mono min-h-8 break-all ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {input || '0'}
            </div>
            <div className={`text-lg font-mono min-h-6 ${result ? 'text-green-500' : 'text-transparent'}`}>
              {result ? `= ${result}` : '0'}
            </div>
          </div>

          {/* Calculator Buttons */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {buttons.map((btn, index) => (
              <button
                key={index}
                onClick={() => handleClick(btn.value)}
                className={`p-4 rounded-lg font-medium text-lg transition-all duration-200 active:scale-95 flex items-center justify-center 
                  ${btn.className} ${btn.value === '0' ? 'col-span-2' : ''}`}
              >
                {btn.icon || btn.value}
              </button>
            ))}
          </div>

          {/* Calculation History */}
          <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">Calculation History</h2>
              <button 
                onClick={handleClearHistory}
                className={`flex items-center gap-1 text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}
              >
                <FiTrash2 size={14} /> Clear
              </button>
            </div>
            <ul className="space-y-1 max-h-32 overflow-y-auto">
              {history.length > 0 ? (
                history.map((item, idx) => (
                  <li key={idx} className={`font-mono text-sm ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                    {item}
                  </li>
                ))
              ) : (
                <li className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No history yet
                </li>
              )}
            </ul>
          </div>

          {/* Help Articles */}
          <div className="space-y-3">
            <h2 className="font-semibold text-lg">Calculator Guide</h2>
            {articles.map((article, index) => (
              <div 
                key={index} 
                className={`border rounded-lg overflow-hidden transition-all duration-200 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
              >
                <button
                  onClick={() => setOpenArticle(openArticle === index ? null : index)}
                  className={`w-full text-left p-3 font-medium flex justify-between items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                >
                  <span>{article.title}</span>
                  <span>{openArticle === index ? '−' : '+'}</span>
                </button>
                {openArticle === index && (
                  <div className={`p-3 pt-0 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {article.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleMobileCalculator;