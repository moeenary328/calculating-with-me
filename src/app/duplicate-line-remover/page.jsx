'use client';

import React, { useState } from 'react';

export default function DuplicateLineRemover() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const removeDuplicateLines = (text) => {
    const lines = text.split('\n');
    const seen = new Set();
    const uniqueLines = lines.filter(line => {
      const trimmed = line.trim();
      if (seen.has(trimmed)) return false;
      seen.add(trimmed);
      return true;
    });
    return uniqueLines.join('\n');
  };

  const handleRemoveDuplicates = () => {
    setOutputText(removeDuplicateLines(inputText));
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 max-w-4xl mx-auto flex flex-col gap-8">
      <h1 className="text-4xl font-bold text-center">Free Duplicate Lines Remover</h1>

      <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col gap-4">
        <label htmlFor="inputText" className="font-semibold">
          Enter your text here:
        </label>
        <textarea
          id="inputText"
          rows={10}
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Paste or type your text..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div className="flex gap-4">
          <button
            onClick={handleRemoveDuplicates}
            disabled={!inputText.trim()}
            className={`px-5 py-2 rounded-md font-semibold text-white transition ${
              inputText.trim() ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300 cursor-not-allowed'
            }`}
          >
            Remove Duplicate Lines
          </button>
          <button
            onClick={handleClear}
            className="px-5 py-2 rounded-md font-semibold bg-gray-400 hover:bg-gray-500 text-white transition"
          >
            Clear
          </button>
        </div>

        {outputText && (
          <>
            <label htmlFor="outputText" className="font-semibold mt-6">
              Result (duplicates removed):
            </label>
            <textarea
              id="outputText"
              rows={10}
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 resize-y"
              readOnly
              value={outputText}
            />
          </>
        )}
      </section>

      <article className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center items-center">
        <h2>How to Use This Tool</h2>
        <p>
          This Duplicate Line Remover helps you clean up your text by removing repeated lines. <br /> Just paste your text in the box above and click "Remove Duplicate Lines."
        </p>
        <ol>
          <li>Paste or write your text in the input box.</li>
          <li>Click <strong>Remove Duplicate Lines</strong> to process the text.</li>
          <li>The output box will show your text without repeated lines.</li>
          <li>You can then copy the cleaned text.</li>
          <li>Click <strong>Clear</strong> to start fresh.</li>
        </ol>
        <p>Note: The tool trims spaces before comparing lines, so lines with <br /> different leading/trailing spaces are treated as duplicates.</p>
      </article>
    </main>
  );
}
