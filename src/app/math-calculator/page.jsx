'use client';
import React, { useState } from 'react';
import { FiSun, FiMoon, FiTrash2 } from 'react-icons/fi';

const SimpleMobileCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const evaluate = (expression) => {
    try {
      const res = eval(expression);
      return res.toString();
    } catch {
      return '';
    }
  };

  const handleClick = (value) => {
    if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '=') {
      try {
        const finalResult = eval(input);
        const resultStr = finalResult.toString();
        setResult(resultStr);
        setInput(resultStr);
        setHistory((prev) => [...prev.slice(-4), `${input} = ${resultStr}`]);
      } catch {
        setResult('Error');
      }
    } else {
      const newInput = input + value;
      setInput(newInput);
      setResult(evaluate(newInput));
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-200 px-4 py-8">
      <div className="w-full max-w-sm p-4 rounded-2xl shadow-xl bg-white relative">

        {/* Dark Mode Toggle */}
        <div className="absolute top-3 right-3 cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-700" />}
        </div>

        {/* Display */}
        <div className={`mb-2 p-3 rounded-lg text-right text-xl font-mono break-words min-h-[60px]
          ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
          {input || '0'}
        </div>

        {/* 🔮 Live Result Preview */}
        <div className={`mb-4 text-right text-green-600 font-bold pr-1 transition duration-300 ease-in-out ${result ? 'opacity-100' : 'opacity-0'}`}>
          Live Result: {result}
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(btn)}
              className={`p-4 rounded-full font-semibold text-lg active:scale-95 transition-all duration-150 
                ${darkMode
                  ? 'bg-gray-700 text-white hover:bg-blue-600'
                  : 'bg-white text-red-600 hover:bg-blue-100'}`}
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Answer History */}
        <div className="bg-white border-t pt-3">
          <div className="flex justify-between items-center mb-2 px-1">
            <h3 className="font-semibold text-gray-700">🧾 History</h3>
            <button onClick={handleClearHistory} className="text-sm flex items-center gap-1 text-red-500 hover:text-red-700">
              <FiTrash2 size={14} /> Clear
            </button>
          </div>
          <ul className="text-sm max-h-24 overflow-y-auto pr-2">
            {history.length === 0 ? (
              <li className="text-gray-400">No history yet.</li>
            ) : (
              history.map((item, idx) => (
                <li key={idx} className="text-blue-700">{item}</li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SimpleMobileCalculator;
