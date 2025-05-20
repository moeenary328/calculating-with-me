'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [strength, setStrength] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Character sets
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  useEffect(() => {
    setIsMounted(true);
    generatePassword(); // Generate initial password
  }, []);

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const generatePassword = () => {
    let chars = '';
    if (includeLowercase) chars += lowercaseChars;
    if (includeUppercase) chars += uppercaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;

    if (!chars) {
      setPassword('Select at least one character type');
      setStrength('None');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }

    setPassword(generatedPassword);
    calculateStrength(generatedPassword);
    setIsCopied(false);
  };

  const calculateStrength = (pass) => {
    let score = 0;
    if (includeLowercase) score++;
    if (includeUppercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;
    
    // Length contributes more to strength
    if (length >= 16) score += 2;
    else if (length >= 12) score += 1;
    else if (length >= 8) score += 0.5;

    if (score <= 1) setStrength('Very Weak');
    else if (score <= 2) setStrength('Weak');
    else if (score <= 3) setStrength('Medium');
    else if (score <= 4) setStrength('Strong');
    else setStrength('Very Strong');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!isMounted) return null;

  return (
    <>
      <Head>
        <title>Secure Password Generator | Create Strong Passwords</title>
        <meta 
          name="description" 
          content="Generate secure, random passwords with customizable options. Create strong passwords with uppercase, lowercase, numbers, and symbols for better online security." 
        />
        <meta name="keywords" content="password generator, secure password, random password, strong password, online security" />
        <meta property="og:title" content="Secure Password Generator | Create Strong Passwords" />
        <meta property="og:description" content="Generate secure, random passwords with customizable options for better online security." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://yourdomain.com/password-generator" />
      </Head>

      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Password Generator</h1>
        <p className="text-gray-600 mb-6">
          Create strong, secure passwords for your online accounts
        </p>

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <div className="flex items-center justify-between">
            <div className="font-mono text-xl overflow-x-auto whitespace-nowrap">
              {password}
            </div>
            <button
              onClick={copyToClipboard}
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              aria-label="Copy password to clipboard"
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-sm text-gray-600">Strength:</span>
            <span className={`ml-2 font-medium ${
              strength === 'Very Weak' ? 'text-red-600' :
              strength === 'Weak' ? 'text-orange-500' :
              strength === 'Medium' ? 'text-yellow-500' :
              strength === 'Strong' ? 'text-green-500' :
              'text-green-600'
            }`}>
              {strength}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Length: {length}
            </label>
            <input
              type="range"
              min="4"
              max="32"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>4</span>
              <span>8</span>
              <span>12</span>
              <span>16</span>
              <span>20</span>
              <span>24</span>
              <span>28</span>
              <span>32</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeUppercase"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeUppercase" className="ml-2 block text-sm text-gray-700">
                Uppercase Letters (A-Z)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeLowercase"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeLowercase" className="ml-2 block text-sm text-gray-700">
                Lowercase Letters (a-z)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeNumbers"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeNumbers" className="ml-2 block text-sm text-gray-700">
                Numbers (0-9)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeSymbols"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeSymbols" className="ml-2 block text-sm text-gray-700">
                Symbols (!@#$%)
              </label>
            </div>
          </div>

          <button
            onClick={generatePassword}
            className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Generate New Password
          </button>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Password Security Tips</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-5 space-y-2">
              <li>Use at least 12 characters for better security</li>
              <li>Combine uppercase, lowercase, numbers, and symbols</li>
              <li>Avoid using personal information or common words</li>
              <li>Don't reuse passwords across different accounts</li>
              <li>Consider using a password manager to store your passwords securely</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}