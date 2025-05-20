"use client";

import { useState } from 'react';

export default function WordCounter() {
  const [text, setText] = useState('');

  const countWords = (str) => {
    if (str.trim() === '') return 0;
    return str.trim().split(/\s+/).length;
  };

  const countCharacters = (str) => {
    return str.length;
  };

  const countSentences = (str) => {
    if (str.trim() === '') return 0;
    return str.split(/[.!?]+(?=\s|$)/).filter(Boolean).length;
  };

  const countParagraphs = (str) => {
    if (str.trim() === '') return 0;
    return str.split(/\n+/).filter(para => para.trim() !== '').length;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">FREE Word Counter</h1>
          <p className="text-gray-600">Count words, characters, sentences, and paragraphs in your text</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <textarea
            className="w-full h-64 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800">Words</h3>
              <p className="text-2xl font-bold text-blue-600">{countWords(text)}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-800">Characters</h3>
              <p className="text-2xl font-bold text-green-600">{countCharacters(text)}</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-purple-800">Sentences</h3>
              <p className="text-2xl font-bold text-purple-600">{countSentences(text)}</p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-yellow-800">Paragraphs</h3>
              <p className="text-2xl font-bold text-yellow-600">{countParagraphs(text)}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setText('')}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
            >
              Clear Text
            </button>
          </div>
        </div>

        {/* 👇 Instructional Articles Start Here */}
        <div className="mt-12 space-y-8">
          <article className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">How to Use the Word Counter Tool</h2>
            <p className="text-gray-700">
              Simply type or paste your text in the input box provided above. The tool will automatically calculate and display
              the number of words, characters, sentences, and paragraphs in real-time. There’s no need to click a button!
            </p>
          </article>

          <article className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <h2 className="text-xl font-semibold text-green-700 mb-2">Why Use a Word Counter?</h2>
            <p className="text-gray-700">
              Whether you’re writing an assignment, article, or blog post, this word counter ensures you stay within your desired word
              limit. It helps improve clarity, readability, and ensures your writing meets specific guidelines.
            </p>
          </article>

          <article className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Tips for Better Writing</h2>
            <p className="text-gray-700">
              Try to keep your paragraphs short and focused. A sentence typically conveys one idea. Use this tool to
              evaluate sentence count and structure to enhance your overall writing quality and user experience.
            </p>
          </article>
        </div>
        {/* 👆 Instructional Articles End Here */}
      </div>
    </div>
  );
}
