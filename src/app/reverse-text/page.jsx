// app/page.js
"use client";

import { useState } from 'react';

export default function ReverseText() {
  const [inputText, setInputText] = useState('');
  const [copied, setCopied] = useState(false);

  const reversedText = inputText.split('').reverse().join('');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(reversedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4 font-mono">
            Reverse<span className="text-blue-600">S</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Transform your text instantly with our powerful reversing tool
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Original Text</h2>
              <span className="text-sm text-gray-500">
                {inputText.length} characters
              </span>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-40 p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
              placeholder="Type or paste your text here..."
            />
          </div>

          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Reversed Text</h2>
              <button
                onClick={copyToClipboard}
                disabled={!reversedText}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  reversedText
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {copied ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="bg-white p-4 border-2 border-gray-200 rounded-lg h-40 overflow-y-auto">
              {reversedText ? (
                <p className="text-gray-800 whitespace-pre-wrap break-words">{reversedText}</p>
              ) : (
                <p className="text-gray-400 italic">Your reversed text will appear here</p>
              )}
            </div>
          </div>
        </div>

        {/* Guide Articles */}
        <section className="mt-12 bg-white rounded-xl shadow p-8 prose max-w-none text-gray-700 dark:text-gray-300">
          <h2>How to Use the Reverse Text Tool - Guide Articles</h2>

          <article>
            <h3>1. What is Text Reversal?</h3>
            <p>Text reversal means flipping the order of characters in a string so the last character becomes the first, and so on. It’s useful for fun text effects or programming challenges.</p>
          </article>

          <article>
            <h3>2. How to Enter Text</h3>
            <p>Simply type or paste any text into the “Original Text” box. This can be sentences, words, code snippets, or even emojis.</p>
          </article>

          <article>
            <h3>3. Viewing Reversed Text</h3>
            <p>As you type, the reversed version of your text will automatically appear in the “Reversed Text” box below. You can scroll to see longer texts.</p>
          </article>

          <article>
            <h3>4. Copying Your Result</h3>
            <p>Click the “Copy” button next to the reversed text to copy it to your clipboard instantly. This helps you quickly use the reversed text anywhere else.</p>
          </article>

          <article>
            <h3>5. Practical Uses of Reversed Text</h3>
            <p>People use reversed text for puzzles, creative writing, testing text algorithms, or simply to create interesting visual effects on social media.</p>
          </article>
        </section>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Try reversing sentences, words, or even code snippets!</p>
        </div>
      </div>
    </div>
  );
}
