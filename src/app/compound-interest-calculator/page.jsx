'use client';

import { useState, useEffect } from 'react';
import { FaCalculator } from 'react-icons/fa';

export default function CompoundInterestCalculatorPage() {
  // isClient false by default — server pe yeh hi render hoga
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Server and first client render - simple placeholder content
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-white dark:bg-gray-900 text-black dark:text-white">
        <p className="text-xl font-semibold">Loading Compound Interest Calculator...</p>
      </main>
    );
  }

  // Client-only actual calculator component
  return <CompoundInterestCalculator />;
}

function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [n, setN] = useState('');
  const [result, setResult] = useState(null);

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 100;
    const T = parseFloat(time);
    const N = parseFloat(n);

    if (!P || !R || !T || !N) {
      setResult(null);
      return;
    }

    const amount = P * Math.pow(1 + R / N, N * T);
    setResult(amount.toFixed(2));
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3 text-blue-600 dark:text-blue-400">
        <FaCalculator /> Compound Interest Calculator
      </h1>

      <div className="max-w-md w-full bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-6">
        <Input label="Principal Amount (PKR)" value={principal} onChange={setPrincipal} />
        <Input label="Annual Interest Rate (%)" value={rate} onChange={setRate} />
        <Input label="Time (Years)" value={time} onChange={setTime} />
        <Input label="Compounded Times per Year" value={n} onChange={setN} />

        <button
          onClick={calculateCompoundInterest}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition"
        >
          Calculate
        </button>

        {result !== null && (
          <div className="mt-4 bg-green-200 dark:bg-green-700 dark:text-white p-4 rounded text-center text-xl font-semibold">
            Final Amount: PKR {result}
          </div>
        )}

        <Articles />
      </div>
    </main>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="block mb-1 font-semibold">{label}</label>
      <input
        type="number"
        className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min="0"
      />
    </div>
  );
}

function Articles() {
  return (
    <section className="mt-10 space-y-8">
      <Article
        title="What is Compound Interest?"
        content={`Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods.`}
      />
      <Article
        title="How Does Compounding Frequency Affect Your Investment?"
        content={`The more frequently interest is compounded (monthly, quarterly, etc.), the more interest you earn, because interest is calculated and added more often.`}
      />
      <Article
        title="Why Use a Compound Interest Calculator?"
        content={`Using a compound interest calculator helps you estimate the growth of your investments or savings over time, considering regular deposits and interest rates.`}
      />
    </section>
  );
}

function Article({ title, content }) {
  return (
    <article className="bg-white dark:bg-gray-700 p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">{title}</h2>
      <p className="text-gray-700 dark:text-gray-300">{content}</p>
    </article>
  );
}
