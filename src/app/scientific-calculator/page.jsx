'use client';
import React, { useState } from 'react';
import { FiSun, FiMoon, FiDelete, FiTrash } from 'react-icons/fi';
import { PiPiBold } from 'react-icons/pi';

const ProScientificCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState('');

  // Constants for currency conversion
  const EXCHANGE_RATE = 280;

  // Validate and sanitize input expression
  const validateExpression = (expr) => {
    // Check for empty input
    if (!expr) return { valid: false, message: 'Empty expression' };

    // Check for invalid characters
    const invalidChars = expr.match(/[^0-9+\-*\/%^().esincoqrtalπ√PKRUSD]/g);
    if (invalidChars) {
      return { 
        valid: false, 
        message: `Invalid characters: ${invalidChars.join(', ')}`
      };
    }

    // Check balanced parentheses
    const stack = [];
    for (let char of expr) {
      if (char === '(') stack.push(char);
      if (char === ')') {
        if (stack.length === 0) {
          return { valid: false, message: 'Unbalanced parentheses' };
        }
        stack.pop();
      }
    }
    if (stack.length > 0) {
      return { valid: false, message: 'Unbalanced parentheses' };
    }

    return { valid: true };
  };

  // Safe evaluation function
  const safeEvaluate = (expr) => {
    const validation = validateExpression(expr);
    if (!validation.valid) {
      setError(validation.message);
      return 'Error';
    }

    try {
      let sanitized = expr
        .replace(/π/g, Math.PI.toString())
        .replace(/e/g, Math.E.toString())
        .replace(/√/g, 'Math.sqrt')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log10')
        .replace(/ln/g, 'Math.log')
        .replace(/\^/g, '**');

      // eslint-disable-next-line no-new-func
      const evaluated = new Function('"use strict"; return (' + sanitized + ')')();

      if (Number.isNaN(evaluated)) {
        setError('Invalid mathematical operation');
        return 'Error';
      }
      if (!Number.isFinite(evaluated)) {
        setError('Division by zero or overflow');
        return 'Error';
      }

      setError('');
      return evaluated.toString();
    } catch (err) {
      setError(err.message);
      return 'Error';
    }
  };

  const handleClick = (val) => {
    setError('');

    if (val === 'C') {
      // Clear all
      setInput('');
      setResult('');
      return;
    }

    if (val === 'DEL') {
      // Delete last character
      setInput(prev => {
        const newInput = prev.slice(0, -1);
        setResult(newInput ? safeEvaluate(newInput) : '');
        return newInput;
      });
      return;
    }

    if (val === '=') {
      // Calculate result
      if (!input) {
        setError('No input to evaluate');
        return;
      }

      const answer = safeEvaluate(input);
      setResult(answer);
      
      if (answer !== 'Error') {
        setHistory(prev => [...prev.slice(-4), `${input} = ${answer}`]);
      }
      return;
    }

    if (val === 'PKR>USD') {
      // Currency conversion
      if (!input || isNaN(input)) {
        setError('Invalid PKR amount');
        return;
      }
      const usd = (parseFloat(input) / EXCHANGE_RATE).toFixed(2);
      setResult(`${usd} USD`);
      setHistory(prev => [...prev.slice(-4), `${input} PKR = ${usd} USD`]);
      return;
    }

    if (val === 'USD>PKR') {
      // Currency conversion
      if (!input || isNaN(input)) {
        setError('Invalid USD amount');
        return;
      }
      const pkr = (parseFloat(input) * EXCHANGE_RATE).toFixed(0);
      setResult(`${pkr} PKR`);
      setHistory(prev => [...prev.slice(-4), `${input} USD = ${pkr} PKR`]);
      return;
    }

    // Prevent invalid operator sequences
    const lastChar = input.slice(-1);
    const operators = ['+', '-', '*', '/', '^', '%'];
    
    if (operators.includes(val)) {
      // Don't allow operators at start (except minus)
      if (!input && val !== '-') return;
      
      // Don't allow multiple operators
      if (operators.includes(lastChar)) return;
    }

    // Prevent multiple decimals in same number
    if (val === '.') {
      const parts = input.split(/[\+\-\*\/\^\%]/);
      const lastPart = parts[parts.length - 1];
      if (lastPart.includes('.')) return;
    }

    // Prevent invalid function sequences
    // if (val.match(/[a-z]/) {
    //   const lastCharIsLetter = input.slice(-1).match(/[a-z]/);
    //   if (lastCharIsLetter && !val.match(/^(sin|cos|tan|log|ln|√)/)) return;
    // }
    if (val.match(/[a-z]/)) {
  const lastCharIsLetter = input.slice(-1).match(/[a-z]/);
  if (lastCharIsLetter && !val.match(/^(sin|cos|tan|log|ln|√)/)) return;
}

    setInput(prev => {
      const newInput = prev + val;
      setResult(safeEvaluate(newInput));
      return newInput;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const buttons = [
    'C', 'DEL', '(', ')', '/',
    'sin(', 'cos(', 'tan(', '^', '*',
    'log(', 'ln(', '√(', '%', '-',
    'π', 'e', '0', '.', '+',
    '7', '8', '9', '=', '',
    '4', '5', '6', 'PKR>USD', '',
    '1', '2', '3', 'USD>PKR', '',
  ];

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start py-8 transition-colors duration-500 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`w-full max-w-xl p-6 rounded-3xl shadow-2xl backdrop-blur-md border ${darkMode ? 'border-gray-700 bg-gray-800/30' : 'border-gray-300 bg-white/30'} relative mb-8`}>

        {/* Dark Mode Toggle */}
        <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FiSun className="text-yellow-400" size={24} /> : <FiMoon className="text-gray-700" size={24} />}
        </div>

        <h2 className={`text-2xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>📐 Pro Scientific Calculator</h2>

        {/* Error Display */}
        {error && (
          <div className={`p-2 mb-2 rounded-lg text-center ${darkMode ? 'bg-red-900/50 text-red-200' : 'bg-red-100 text-red-800'}`}>
            {error}
          </div>
        )}

        {/* Display Section */}
        <div className={`p-4 mb-4 rounded-xl ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} shadow-inner`}>
          <div className="text-lg break-words min-h-6">{input || '0'}</div>
          <div className={`text-md mt-2 ${result === 'Error' ? 'text-red-500' : 'text-green-500'}`}>
            {result || (input ? '=' : '')}
          </div>
        </div>

        {/* Button Section */}
        <div className={`grid grid-cols-5 gap-3 mb-6`}>
          {buttons.map((btn, idx) =>
            btn ? (
              <button
                key={idx}
                onClick={() => handleClick(btn)}
                className={`p-3 rounded-full shadow-md transition-all duration-200 flex items-center justify-center
                  ${darkMode ? 'bg-gray-700 hover:bg-blue-600' : 'bg-white hover:bg-blue-200'}
                  ${['C', 'DEL'].includes(btn) ? (darkMode ? 'text-red-400' : 'text-red-600') : ''}
                  ${['=', 'PKR>USD', 'USD>PKR'].includes(btn) ? (darkMode ? 'text-green-400' : 'text-green-600') : ''}
                  ${!['C', 'DEL', '=', 'PKR>USD', 'USD>PKR'].includes(btn) ? (darkMode ? 'text-blue-300' : 'text-blue-600') : ''}
                `}
              >
                {btn === 'DEL' ? <FiDelete /> : btn === 'π' ? <PiPiBold /> : btn}
              </button>
            ) : (
              <div key={idx}></div>
            )
          )}
        </div>

        {/* Answer History */}
        <div className={`${darkMode ? 'bg-gray-700/40' : 'bg-white/40'} p-4 rounded-xl shadow-inner`}>
          <div className="flex justify-between items-center mb-2">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>📜 Answer History</h3>
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-all text-sm cursor-pointer"
            >
              <FiTrash size={16} /> Clear
            </button>
          </div>
          <ul className="space-y-1 text-sm max-h-32 overflow-y-auto pr-2">
            {history.length === 0 ? (
              <li className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No history yet.</li>
            ) : (
              history.map((item, idx) => (
                <li key={idx} className={`${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>{item}</li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Guide Articles Section */}
      <div className={`w-full max-w-3xl px-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        <h2 className="text-2xl font-bold mb-6 text-center">📚 Calculator Guides</h2>
        
        {/* Article 1 */}
        <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-500">🔢</span> How to Use Scientific Functions
          </h3>
          <p className="mb-3">This calculator includes advanced scientific functions:</p>
          <ul className="list-disc pl-5 space-y-1 mb-3">
            <li><strong>Trigonometric functions</strong>: Use sin(, cos(, tan( followed by angle in radians</li>
            <li><strong>Logarithms</strong>: log( for base-10, ln( for natural log (base e)</li>
            <li><strong>Square root</strong>: √( for square root operations</li>
            <li><strong>Constants</strong>: π for Pi (3.1415...), e for Euler's number (2.7182...)</li>
            <li><strong>Exponents</strong>: Use ^ for power operations (e.g., 2^3 = 8)</li>
          </ul>
          <p className="text-sm italic">Example: Try "sin(π/2)" or "log(100)"</p>
        </div>

        {/* Article 2 */}
        <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-green-500">💱</span> Currency Conversion Guide
          </h3>
          <p className="mb-3">Easily convert between Pakistani Rupees (PKR) and US Dollars (USD):</p>
          <ul className="list-disc pl-5 space-y-1 mb-3">
            <li><strong>PKR to USD</strong>: Enter amount in PKR and press PKR&gt;USD</li>
            <li><strong>USD to PKR</strong>: Enter amount in USD and press USD&gt;PKR</li>
            <li>The calculator uses current exchange rate (1 USD ≈ {EXCHANGE_RATE} PKR)</li>
          </ul>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-3`}>
            <p className="font-mono text-sm">Example conversions:</p>
            <p className="font-mono text-sm">5000 PKR → {(5000/EXCHANGE_RATE).toFixed(2)} USD</p>
            <p className="font-mono text-sm">100 USD → {100*EXCHANGE_RATE} PKR</p>
          </div>
          <p className="text-sm italic">Note: Exchange rates may vary in real markets</p>
        </div>

        {/* Article 3 */}
        <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-purple-500">💡</span> Tips & Tricks for Better Calculations
          </h3>
          <p className="mb-3">Get the most out of your scientific calculator:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use parentheses to control operation order: (2+3)*4 = 20</li>
            <li>Chain calculations by using the result in next operation</li>
            <li>Press DEL to delete last character, C to clear everything</li>
            <li>History shows your last 4 calculations for reference</li>
            <li>Toggle dark mode for comfortable night-time use</li>
          </ul>
          <div className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p className="font-semibold text-sm">Common Errors to Avoid:</p>
            <ul className="list-disc pl-5 text-sm">
              <li>Unmatched parentheses</li>
              <li>Missing operators between numbers</li>
              <li>Using invalid characters</li>
              <li>Dividing by zero</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProScientificCalculator;