"use client";

import { useState, useEffect } from 'react';
import { FiCopy, FiDownload, FiRotateCw, FiType, FiX, FiClipboard, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaTextHeight, FaExchangeAlt, FaSpaceShuttle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function TextUtilityTool() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [activeOperation, setActiveOperation] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [expandedArticle, setExpandedArticle] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Text statistics
  const stats = {
    length: inputText.length,
    words: inputText.trim() ? inputText.trim().split(/\s+/).length : 0,
    lines: inputText ? inputText.split('\n').length : 0
  };

  // Operations with animation
  const performOperation = (operation) => {
    setIsAnimating(true);
    setActiveOperation(operation);
    
    setTimeout(() => {
      switch (operation) {
        case 'uppercase':
          setOutputText(inputText.toUpperCase());
          break;
        case 'lowercase':
          setOutputText(inputText.toLowerCase());
          break;
        case 'reverse':
          setOutputText(inputText.split('').reverse().join(''));
          break;
        case 'swapCase':
          setOutputText(
            inputText.split('').map(char =>
              char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
            ).join('')
          );
          break;
        case 'removeSpaces':
          setOutputText(inputText.replace(/\s+/g, ''));
          break;
        default:
          setOutputText(inputText);
      }
      setIsAnimating(false);
    }, 300);
  };

  // Clipboard functions
  const copyToClipboard = async () => {
    if (!isClient) return;
    
    try {
      await navigator.clipboard.writeText(outputText);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const pasteFromClipboard = async () => {
    if (!isClient) return;
    
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
    } catch (err) {
      console.error('Failed to paste text: ', err);
    }
  };

  const downloadText = () => {
    if (!isClient) return;
    
    const element = document.createElement('a');
    const file = new Blob([outputText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'text-utility-output.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const clearText = () => {
    setInputText('');
    setOutputText('');
    setActiveOperation('');
  };

  const toggleArticle = (index) => {
    setExpandedArticle(expandedArticle === index ? null : index);
  };

  // Button data
  const operationButtons = [
    { icon: <FaTextHeight className="text-lg" />, label: 'UPPERCASE', operation: 'uppercase', color: 'bg-gradient-to-r from-purple-600 to-indigo-600' },
    { icon: <FiType className="text-lg" />, label: 'lowercase', operation: 'lowercase', color: 'bg-gradient-to-r from-pink-500 to-rose-500' },
    { icon: <FaExchangeAlt className="text-lg" />, label: 'Swap Case', operation: 'swapCase', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { icon: <FiRotateCw className="text-lg" />, label: 'Reverse', operation: 'reverse', color: 'bg-gradient-to-r from-indigo-500 to-violet-500' },
    { icon: <FaSpaceShuttle className="text-lg" />, label: 'Remove Spaces', operation: 'removeSpaces', color: 'bg-gradient-to-r from-teal-500 to-emerald-500' },
    { icon: <FiX className="text-lg" />, label: 'Clear All', operation: 'clear', color: 'bg-gradient-to-r from-gray-500 to-gray-700' }
  ];

  const statCards = [
    { label: 'Characters', value: stats.length, color: 'from-purple-500 to-indigo-500', icon: '✍️' },
    { label: 'Words', value: stats.words, color: 'from-pink-500 to-rose-500', icon: '📖' },
    { label: 'Lines', value: stats.lines, color: 'from-blue-500 to-cyan-500', icon: '📊' }
  ];

  const articles = [
    {
      title: "Getting Started with Calculating with Me",
      content: (
        <div className="space-y-3">
          <p>Welcome to Calculating with Me, your ultimate text transformation tool. Here's how to get started:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Paste or type your text in the input area</li>
            <li>Select an operation from the transformation buttons</li>
            <li>View your transformed text in the output area</li>
            <li>Copy or download the result as needed</li>
          </ol>
          <p>Use the statistics cards to track your text metrics like character count, word count, and line count.</p>
        </div>
      )
    },
    
    {
      title: "Advanced Text Transformations",
      content: (
        <div className="space-y-3">
          <p>Calculating with Me offers powerful text transformations:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>UPPERCASE:</strong> Convert all text to capital letters</li>
            <li><strong>lowercase:</strong> Convert all text to small letters</li>
            <li><strong>Swap Case:</strong> Invert the case of each character</li>
            <li><strong>Reverse:</strong> Reverse the order of all characters</li>
            <li><strong>Remove Spaces:</strong> Delete all whitespace from your text</li>
          </ul>
          <p>Experiment with different operations to see how they affect your text in real-time.</p>
        </div>
      )
    },
    {
      title: "Best Practices for Text Processing",
      content: (
        <div className="space-y-3">
          <p>Follow these tips for optimal text processing:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>For large texts, consider processing in smaller chunks</li>
            <li>Use the preview section to compare before and after versions</li>
            <li>Combine multiple operations by processing text sequentially</li>
            <li>Save your work frequently using the download feature</li>
          </ul>
          <p>Remember that some operations (like reversing) may make text unreadable unless that's your intention.</p>
        </div>
      )
    },
    {
      title: "Keyboard Shortcuts & Efficiency Tips",
      content: (
        <div className="space-y-3">
          <p>Work faster with these efficiency tips:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Ctrl+V (Cmd+V on Mac):</strong> Paste directly into the input area</li>
            <li><strong>Ctrl+A:</strong> Select all text in either text area</li>
            <li><strong>Tab:</strong> Navigate between interface elements</li>
          </ul>
          <p>For power users: You can chain operations by copying the output and pasting it back to the input for additional transformations.</p>
        </div>
      )
    },
    {
      title: "Troubleshooting Common Issues",
      content: (
        <div className="space-y-3">
          <p>Having trouble? Try these solutions:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Paste not working:</strong> Check browser permissions for clipboard access</li>
            <li><strong>Operations not applying:</strong> Ensure you have text in the input area</li>
            <li><strong>Formatting issues:</strong> Some operations may affect text formatting</li>
            <li><strong>Performance:</strong> Very large texts may take a moment to process</li>
          </ul>
          <p>If issues persist, try refreshing the page or using a different browser.</p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
            Calculating with Me
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Transform your text with powerful operations in a beautiful, intuitive interface
          </p>
          <div className="mt-6 h-1 w-24 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-80"></div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {statCards.map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-sm font-semibold mb-1 text-gray-500`}>
                    {stat.label}
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                </div>
                <div className="text-3xl opacity-80">
                  {stat.icon}
                </div>
              </div>
              <div className={`mt-4 h-1 bg-gradient-to-r ${stat.color} rounded-full`}></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Operation Buttons */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {operationButtons.map((btn, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => btn.operation !== 'clear' ? performOperation(btn.operation) : clearText()}
              className={`
                flex flex-col items-center justify-center gap-2 p-4 rounded-lg transition-all
                ${activeOperation === btn.operation ? 
                  `${btn.color} text-white shadow-md` : 
                  `bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:text-gray-900 hover:shadow-sm`
                }
              `}
              aria-label={btn.label}
            >
              <div className={`p-2 rounded-full ${activeOperation === btn.operation ? 'bg-white/20' : 'bg-gray-100'} text-lg`}>
                {btn.icon}
              </div>
              <span className="text-xs font-medium">{btn.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Text Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Input Area */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-600">
                INPUT TEXT
              </label>
              <button
                onClick={pasteFromClipboard}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors bg-white hover:bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 shadow-xs"
              >
                <FiClipboard size={14} /> Paste
              </button>
            </div>
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-72 p-5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-400 resize-none transition-all shadow-sm hover:shadow-md"
                placeholder="Type or paste your text here..."
              />
              {!inputText && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center p-6 opacity-40">
                    <div className="text-4xl mb-2">✍️</div>
                    <p className="text-sm font-medium text-gray-400">Your text playground awaits</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Output Area */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-600">
                OUTPUT TEXT
              </label>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!outputText}
                  className={`flex items-center gap-1.5 text-xs font-medium transition-colors px-3 py-1.5 rounded-lg border shadow-xs ${
                    outputText ? 
                      'text-gray-600 hover:text-gray-900 border-gray-200 bg-white hover:bg-gray-50' : 
                      'text-gray-400 border-gray-200 bg-gray-100 cursor-not-allowed'
                  }`}
                  aria-label="Copy"
                >
                  <FiCopy size={14} /> Copy
                </button>
                <button
                  onClick={downloadText}
                  disabled={!outputText}
                  className={`flex items-center gap-1.5 text-xs font-medium transition-colors px-3 py-1.5 rounded-lg border shadow-xs ${
                    outputText ? 
                      'text-gray-600 hover:text-gray-900 border-gray-200 bg-white hover:bg-gray-50' : 
                      'text-gray-400 border-gray-200 bg-gray-100 cursor-not-allowed'
                  }`}
                  aria-label="Download"
                >
                  <FiDownload size={14} /> Download
                </button>
              </div>
            </div>
            <div className="w-full h-72 p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md overflow-auto relative">
              {outputText ? (
                <pre className="whitespace-pre-wrap text-gray-800 font-mono">{outputText}</pre>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6 opacity-40">
                    <div className="text-4xl mb-2">✨</div>
                    <div className="text-sm font-medium text-gray-400">Transformed text will appear here</div>
                  </div>
                </div>
              )}
              {isAnimating && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="h-10 w-10 border-2 border-purple-500 border-t-transparent rounded-full"
                  ></motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

       

        {/* Preview Section */}
        <motion.div 
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse"></span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Text Preview
            </span>
          </h2>
          <div className="space-y-5">
            {inputText ? (
              <>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Original Text:</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">{inputText}</p>
                  </div>
                </div>
                {outputText && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Transformed ({activeOperation.replace(/([A-Z])/g, ' $1').trim()}):
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className={`whitespace-pre-wrap text-gray-800 leading-relaxed ${
                        activeOperation === 'reverse' ? 'direction-rtl' : ''
                      }`}>
                        {outputText}
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-5xl mb-4 opacity-30">📝</div>
                <p className="text-gray-400 italic">Enter some text to see the magic happen</p>
              </div>
            )}
          </div>
        </motion.div>

         {/* User Guide Articles */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse"></span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              User Guide
            </span>
          </h2>
          
          <div className="space-y-4">
            {articles.map((article, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all"
                whileHover={{ y: -2 }}
              >
                <button
                  onClick={() => toggleArticle(index)}
                  className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
                >
                  <h3 className="text-lg font-medium text-gray-800">{article.title}</h3>
                  {expandedArticle === index ? (
                    <FiChevronUp className="text-gray-500" />
                  ) : (
                    <FiChevronDown className="text-gray-500" />
                  )}
                </button>
                
                <AnimatePresence>
                  {expandedArticle === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 text-gray-600"
                    >
                      {article.content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Copied to clipboard!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}