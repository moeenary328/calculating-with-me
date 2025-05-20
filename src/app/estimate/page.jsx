"use client";

import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

export default function ProjectEstimateCalculator() {
  const [mounted, setMounted] = useState(false);
  const [hours, setHours] = useState("");
  const [rate, setRate] = useState("");
  const [contingency, setContingency] = useState("");
  const [tax, setTax] = useState("");

  // Sirf client pe render ke liye
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Inputs ko parse karo
  const h = parseFloat(hours) || 0;
  const r = parseFloat(rate) || 0;
  const c = parseFloat(contingency) || 0;
  const t = parseFloat(tax) || 0;

  const baseCost = h * r;
  const contingencyAmount = (baseCost * c) / 100;
  const taxAmount = (baseCost * t) / 100;
  const total = baseCost + contingencyAmount + taxAmount;

  // PDF generate function
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Project Estimate", 14, 22);
    doc.setFontSize(12);
    doc.text(`Hours: ${h}`, 14, 40);
    doc.text(`Rate: $${r.toFixed(2)}`, 14, 50);
    doc.text(`Contingency: ${c}%`, 14, 60);
    doc.text(`Tax: ${t}%`, 14, 70);
    doc.text(`Total Estimate: $${total.toFixed(2)}`, 14, 90);
    doc.save("project_estimate.pdf");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl mt-12">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
        Project Estimate Calculator
      </h1>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        {/* Hours */}
        <div>
          <label
            htmlFor="hours"
            className="block mb-1 font-semibold text-gray-700 dark:text-gray-300"
          >
            Total Project Hours
          </label>
          <input
            id="hours"
            type="number"
            min="0"
            step="0.1"
            placeholder="e.g. 100"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        {/* Rate */}
        <div>
          <label
            htmlFor="rate"
            className="block mb-1 font-semibold text-gray-700 dark:text-gray-300"
          >
            Hourly Rate ($)
          </label>
          <input
            id="rate"
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g. 50"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        {/* Contingency */}
        <div>
          <label
            htmlFor="contingency"
            className="block mb-1 font-semibold text-gray-700 dark:text-gray-300"
          >
            Contingency (%) <span className="text-sm text-gray-500">(unforeseen costs)</span>
          </label>
          <input
            id="contingency"
            type="number"
            min="0"
            step="0.1"
            placeholder="e.g. 10"
            value={contingency}
            onChange={(e) => setContingency(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        {/* Tax */}
        <div>
          <label
            htmlFor="tax"
            className="block mb-1 font-semibold text-gray-700 dark:text-gray-300"
          >
            Tax (%) <span className="text-sm text-gray-500">(sales tax/VAT)</span>
          </label>
          <input
            id="tax"
            type="number"
            min="0"
            step="0.1"
            placeholder="e.g. 5"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
      </form>

      <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900 rounded-xl text-indigo-900 dark:text-indigo-100 text-2xl font-bold text-center shadow-lg">
        Estimated Total: ${total.toFixed(2)}
      </div>

      {/* PDF Button */}
      <div className="text-center mt-6">
        <button
          onClick={generatePDF}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Download PDF
        </button>
      </div>

      {/* Instructional Articles */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">1. How to Enter Project Details</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Pehle "Total Project Hours" mein project ke liye required total working hours dalein. Phir "Hourly Rate" field mein per hour charge specify karein. Dono values numeric honi chahiye.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">2. Adding Contingency for Unexpected Costs</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Agar koi unforeseen circumstances ya additional expenses ho sakte hain, to "Contingency (%)" mein ek percentage add karein. Yeh automatically base cost par calculate hoga.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">3. Including Taxes (Sales Tax / VAT)</h2>
          <p className="text-gray-700 dark:text-gray-300">
            "Tax (%)" field mein applicable sales tax ya VAT percentage dalein. Yeh base cost par calculate hokar total estimate mein include ho jayega.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">4. Generating and Downloading the Estimate</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Sare values enter karne ke baad "Download PDF" button click karein. Ek PDF file generate hogi jisme aapki estimate details hongi, jo aap store ya share kar sakte hain.
          </p>
        </section>
      </div>
    </div>
  );
}
