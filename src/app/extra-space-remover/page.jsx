"use client"; // Required for client-side interactivity

import { useState } from 'react';

export default function SpaceRemover() {
  const [inputText, setInputText] = useState("");
  const [cleanedText, setCleanedText] = useState("");

  const removeExtraSpaces = () => {
    let text = inputText.replace(/\s+/g, ' ').trim(); // Remove extra spaces
    text = text.replace(/^\s*[\r\n]/gm, ''); // Remove empty lines
    setCleanedText(text);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cleanedText);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Free Extra Space Remover for You</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Original Text</h2>
            <textarea
              className="w-full h-64 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Paste your text here..."
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                removeExtraSpaces();
              }}
            />
            <button
              onClick={() => setInputText("")}
              className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
            >
              Clear Text
            </button>
          </div>

          {/* Output Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Cleaned Text</h2>
              <button
                onClick={copyToClipboard}
                disabled={!cleanedText}
                className={`px-4 py-2 rounded-md ${cleanedText ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                Copy
              </button>
            </div>
            <div className="w-full h-64 p-4 border border-gray-300 rounded-md bg-gray-50 overflow-auto">
              {cleanedText || <span className="text-gray-400">Cleaned text will appear here...</span>}
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>Spaces removed: {inputText.length - cleanedText.length}</p>
            </div>
          </div>
        </div>

        {/* 👇 Instructional Articles Start Here */}
        <div className="mt-12 space-y-8">
          <article className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">How to Use the Extra Space Remover Tool</h2>
            <p className="text-gray-700">
              Paste your content into the "Original Text" box. The tool will instantly clean up your input by removing unnecessary spaces and empty lines. You can then copy the cleaned text using the "Copy" button, or reset the input using "Clear Text".
            </p>
          </article>

          <article className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <h2 className="text-xl font-semibold text-green-700 mb-2">Why Clean Extra Spaces?</h2>
            <p className="text-gray-700">
              Unwanted extra spaces and blank lines often make content messy and hard to read. This tool helps maintain consistency in formatting—ideal for blogs, emails, code, or academic writing. Clean text ensures clarity and looks more professional.
            </p>
          </article>
        </div>
        {/* 👆 Instructional Articles End Here */}
      </div>
    </div>
  );
}
