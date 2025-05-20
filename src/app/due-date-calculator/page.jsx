"use client";
import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaRedo, FaCopy } from "react-icons/fa";

const publicHolidays = [
  "2025-01-01",
  "2025-12-25",
  "2025-08-14",
  "2025-03-23",
  "2025-05-01",
];

const DueDateCalculator = () => {
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [unit, setUnit] = useState("days");
  const [excludeWeekends, setExcludeWeekends] = useState(false);
  const [excludeHolidays, setExcludeHolidays] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false); // ← important

  // Ensure component runs only on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const calculateDueDate = () => {
    if (!startDate || !duration || isNaN(duration)) {
      setDueDate("Please enter valid data.");
      return;
    }

    let date = new Date(startDate);
    let remaining = parseInt(duration, 10);

    while (remaining > 0) {
      switch (unit) {
        case "days":
          date.setDate(date.getDate() + 1);
          break;
        case "weeks":
          date.setDate(date.getDate() + 7);
          remaining--;
          continue;
        case "months":
          date.setMonth(date.getMonth() + 1);
          remaining--;
          continue;
      }

      const day = date.getDay();
      const formatted = date.toISOString().split("T")[0];

      if (
        (!excludeWeekends || (day !== 0 && day !== 6)) &&
        (!excludeHolidays || !publicHolidays.includes(formatted))
      ) {
        remaining--;
      }
    }

    setDueDate(date.toDateString());
  };

  const resetFields = () => {
    setStartDate("");
    setDuration("");
    setUnit("days");
    setExcludeWeekends(false);
    setExcludeHolidays(false);
    setDueDate(null);
    setCopied(false);
  };

  const copyResult = () => {
    if (dueDate) {
      navigator.clipboard.writeText(dueDate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isClient) return null; // Avoid SSR mismatch

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-white text-gray-800">
      <div className="w-full max-w-2xl rounded-2xl shadow-lg p-6 border border-gray-200 bg-white">
        <h1 className="text-2xl font-bold mb-4">Advanced Due Date Calculator</h1>

        {/* ✅ Instructions */}
        <div className="p-4 mb-5 rounded-md border bg-blue-50 text-blue-900 text-sm leading-relaxed">
          <p><strong>How to Use:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Select Start Date</li>
            <li>Enter Duration</li>
            <li>Choose Unit (Days/Weeks/Months)</li>
            <li>Enable “Exclude Weekends” and/or “Exclude Public Holidays”</li>
            <li>Click “Calculate”</li>
          </ul>
        </div>

        <div className="space-y-4">
          <div>
            <label>Start Date:</label>
            <input
              type="date"
              className="p-2 rounded border w-full"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label>Duration:</label>
            <input
              type="number"
              className="p-2 rounded border w-full"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter duration"
            />
          </div>

          <div>
            <label>Unit:</label>
            <select
              className="p-2 rounded border w-full"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
            </select>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={excludeWeekends}
                onChange={() => setExcludeWeekends(!excludeWeekends)}
              />
              Exclude Weekends
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={excludeHolidays}
                onChange={() => setExcludeHolidays(!excludeHolidays)}
              />
              Exclude Public Holidays
            </label>
          </div>

          <div className="flex gap-4 mt-4 flex-wrap">
            <button
              onClick={calculateDueDate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow"
            >
              Calculate
            </button>
            <button
              onClick={resetFields}
              className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
            >
              <FaRedo /> Reset
            </button>
            {dueDate && (
              <button
                onClick={copyResult}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow"
              >
                <FaCopy />
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>

          {dueDate && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md text-lg text-center font-semibold">
              📅 Calculated Due Date:{" "}
              <span className="text-blue-600">{dueDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DueDateCalculator;
