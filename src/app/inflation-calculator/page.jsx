'use client'

import { useState, useEffect } from 'react'
import { FaMoneyBill, FaSearchDollar, FaClock } from 'react-icons/fa'

export default function InflationCalculator() {
  const [initial, setInitial] = useState('')
  const [finalVal, setFinalVal] = useState('')
  const [years, setYears] = useState('')
  const [rate, setRate] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const calculateInflation = () => {
    const initialNum = parseFloat(initial)
    const finalNum = parseFloat(finalVal)
    const yearNum = parseFloat(years)

    if (!initialNum || !finalNum || !yearNum || initialNum <= 0 || finalNum <= 0 || yearNum <= 0) {
      setRate(null)
      return
    }

    const result = (Math.pow(finalNum / initialNum, 1 / yearNum) - 1) * 100
    setRate(result.toFixed(2))
  }

  return (
    <>
      <div className="relative max-w-3xl mx-auto mt-16 px-8 py-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden animate-fade-in">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-yellow-300 mb-10 tracking-wide">
          📉 Inflation Calculator (%)
        </h1>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-start gap-2">
            <label className="text-gray-800 dark:text-gray-100 font-semibold">Initial Price</label>
            <div className="w-full flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-3 rounded-xl shadow-inner">
              <FaMoneyBill className="text-green-500" />
              <input
                type="number"
                value={initial}
                onChange={(e) => setInitial(e.target.value)}
                className="w-full bg-transparent outline-none dark:text-white"
                placeholder=""
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-2">
            <label className="text-gray-800 dark:text-gray-100 font-semibold">Final Price</label>
            <div className="w-full flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-3 rounded-xl shadow-inner">
              <FaSearchDollar className="text-yellow-500" />
              <input
                type="number"
                value={finalVal}
                onChange={(e) => setFinalVal(e.target.value)}
                className="w-full bg-transparent outline-none dark:text-white"
                placeholder=""
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-2">
            <label className="text-gray-800 dark:text-gray-100 font-semibold">Years</label>
            <div className="w-full flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-3 rounded-xl shadow-inner">
              <FaClock className="text-blue-500" />
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full bg-transparent outline-none dark:text-white"
                placeholder=""
              />
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={calculateInflation}
          className="w-full bg-gradient-to-r from-pink-500 to-yellow-400 hover:scale-105 transition-transform duration-300 text-white font-bold py-3 rounded-xl shadow-lg"
        >
          🔍 Calculate Inflation Rate
        </button>

        {/* Result */}
        {rate && (
          <div className="mt-8 text-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              📊 Annual Average Inflation Rate:
            </p>
            <p className="text-4xl font-bold text-red-500 mt-2">{rate}%</p>
          </div>
        )}

        {/* Embedded Guide Article */}
        <div className="mt-10 bg-yellow-50 dark:bg-yellow-950 p-6 rounded-2xl shadow-inner border-l-4 border-yellow-500 dark:border-yellow-300">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-yellow-100">📝 Is Calculator Kaise Istamaal Karein?</h2>
          <ul className="list-disc list-inside text-gray-800 dark:text-yellow-100 space-y-1">
            <li><strong>Initial Price:</strong> Pehle ki keemat daalein (jaise 10 saal pehle).</li>
            <li><strong>Final Price:</strong> Aaj ki current price daalein.</li>
            <li><strong>Years:</strong> Kitne saalon mein ye badlaav hua — ye likhein.</li>
            <li><strong>Calculate:</strong> Button dabate hi aapko annual inflation rate milega.</li>
          </ul>
          <p className="mt-4 text-sm italic text-gray-600 dark:text-yellow-200">
            Example: Agar ₹1000 ki cheez ab ₹2000 ho gayi hai 10 saal mein, toh aapka inflation rate approx 7.18% hoga.
          </p>
        </div>
      </div>

      {/* Additional 4 Articles below the calculator */}
      <div className="max-w-3xl mx-auto mt-16 px-8 space-y-12 text-gray-900 dark:text-yellow-200">
        <article>
          <h3 className="text-2xl font-bold mb-3">🔍 Inflation Rate Meaning</h3>
          <p>
            Inflation rate is the percentage increase in the price level of goods and services in an economy over a period of time. It shows how much prices are rising annually.
          </p>
        </article>

        <article>
          <h3 className="text-2xl font-bold mb-3">💡 Why Track Inflation?</h3>
          <p>
            Keeping track of inflation helps individuals and businesses understand the changing value of money, adjust budgets, and make informed investment decisions.
          </p>
        </article>

        <article>
          <h3 className="text-2xl font-bold mb-3">📈 Effects of High Inflation</h3>
          <p>
            High inflation can reduce purchasing power, increase the cost of living, and create uncertainty in the economy. It can also erode savings if returns don’t keep up with inflation.
          </p>
        </article>

        <article>
          <h3 className="text-2xl font-bold mb-3">🛠️ How to Manage Inflation Risk</h3>
          <p>
            Investing in assets like real estate, stocks, or inflation-protected securities can help protect your wealth from inflation’s negative effects over time.
          </p>
        </article>
      </div>
    </>
  )
}
