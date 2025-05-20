// app/quote-maker/page.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import Head from 'next/head';

// Static configuration data
const FONTS = [
  { name: 'Sans-serif', value: 'sans-serif' },
  { name: 'Serif', value: 'serif' },
  { name: 'Monospace', value: 'monospace' },
  { name: 'Cursive', value: 'cursive' },
];

const COLORS = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Green', value: '#10b981' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
];

export default function QuoteMaker() {
  const [isMounted, setIsMounted] = useState(false);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [color, setColor] = useState('#3b82f6');
  const [font, setFont] = useState('sans-serif');
  const quoteRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Enhanced attribute cleaner
    const cleanExtensionAttributes = () => {
      const attributesToRemove = ['fdprocessedid', 'data-gramm', 'gramm'];
      document.querySelectorAll('*').forEach(el => {
        attributesToRemove.forEach(attr => {
          el.removeAttribute(attr);
        });
      });
    };

    // Run immediately and set up observer
    cleanExtensionAttributes();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          cleanExtensionAttributes();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      subtree: true,
      attributeFilter: ['fdprocessedid', 'data-gramm', 'gramm']
    });

    return () => observer.disconnect();
  }, []);

  const downloadPDF = () => {
    if (!quote || !isMounted) return;
    
    const doc = new jsPDF();
    doc.setFont(font);
    doc.setTextColor(color);
    doc.setFontSize(20);
    
    const splitText = doc.splitTextToSize(quote, 180);
    doc.text(splitText, 15, 20);
    
    if (author) {
      doc.setTextColor('#6b7280');
      doc.setFontSize(14);
      doc.text(`— ${author}`, 15, 20 + (splitText.length * 10) + 10);
    }
    
    doc.save('quote.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Free Quote Maker Tool | Create Free Beautiful Quotes</title>
        <meta name="description" content="Create and download beautiful quote images with our free online quote maker tool. Customize fonts, colors and more." />
        <meta name="keywords" content="quote maker, quote generator, create quotes, inspirational quotes, quote pdf, free quots" />
        <meta property="og:title" content="Quote Maker Tool | Create Beautiful Quotes" />
        <meta property="og:description" content="Create and download beautiful quote images with our free online quote maker tool." />
        <meta property="og:type" content="website" />
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Quote Maker Tool</h1>
          <p className="text-xl text-gray-600">Create beautiful quotes and download as PDF</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label htmlFor="quote" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Quote
                </label>
                <textarea
                  id="quote"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your inspirational quote here..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  autoComplete="off"
                  data-lpignore="true"
                  data-form-type="none"
                  suppressHydrationWarning
                />
              </div>

              <div className="mb-6">
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  Author (Optional)
                </label>
                <input
                  type="text"
                  id="author"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Author name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  autoComplete="off"
                  data-lpignore="true"
                  data-form-type="none"
                  suppressHydrationWarning
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {FONTS.map((f) => (
                    <button
                      key={f.value}
                      type="button"
                      className={`py-2 px-4 rounded-md border ${font === f.value ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                      onClick={() => setFont(f.value)}
                      style={{ fontFamily: f.value }}
                      suppressHydrationWarning
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      className={`w-10 h-10 rounded-full ${color === c.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                      style={{ backgroundColor: c.value }}
                      onClick={() => setColor(c.value)}
                      aria-label={c.name}
                      suppressHydrationWarning
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={downloadPDF}
                disabled={!quote || !isMounted}
                className={`w-full py-3 px-4 rounded-md font-medium text-white ${!quote || !isMounted ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                {isMounted ? 'Download as PDF' : 'Loading...'}
              </button>
            </div>

            {/* Preview section */}
            <div className="flex items-center justify-center">
              <div 
                ref={quoteRef}
                className="p-8 border-2 border-gray-200 rounded-xl w-full h-64 flex flex-col justify-center"
                style={{
                  backgroundColor: '#f9fafb',
                  color: isMounted ? color : '#3b82f6',
                  fontFamily: isMounted ? font : 'sans-serif',
                }}
              >
                <p className="text-2xl text-center italic">"{quote || 'Your quote will appear here'}"</p>
                {author && <p className="text-right mt-4 text-lg">— {author}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Static articles section (remains unchanged) */}
           <article className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Mastering the Quote Maker free</h2>
              <div className="space-y-4 text-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Essential Features</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Real-time preview of your customized quote</li>
                      <li> text colors and  background options</li>
                      <li> font styles with visual examples</li>
                      <li>text sizes for different applications</li>
                      <li>Download as PDF or copy as text</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Quick Start Guide</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Type your quote in the text box</li>
                      <li>Customize appearance using the controls</li>
                      <li>Preview changes instantly</li>
                      <li>Download or copy your creation</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </article>
        
      </div>
    </div>
  );
}


