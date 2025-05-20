'use client';

import { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiPercent, FiAward, FiAlertTriangle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import Head from 'next/head';

export default function GradeCalculator() {
  const [grades, setGrades] = useState([{ score: '', weight: '' }]);
  const [targetGrade, setTargetGrade] = useState('');
  const [finalWeight, setFinalWeight] = useState('');
  const [currentGrade, setCurrentGrade] = useState(null);
  const [requiredFinalScore, setRequiredFinalScore] = useState(null);
  const [error, setError] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const calculateCurrentGrade = (grades) => {
    if (!grades || grades.length === 0) return 0;

    let totalWeightedScore = 0;
    let totalWeight = 0;

    for (const grade of grades) {
      const score = parseFloat(grade.score) || 0;
      const weight = parseFloat(grade.weight) || 0;
      
      totalWeightedScore += score * (weight / 100);
      totalWeight += weight;
    }

    if (totalWeight === 0) return 0;

    return (totalWeightedScore / (totalWeight / 100));
  };

  const calculateRequiredFinalScore = (currentGrade, finalWeight, targetGrade) => {
    const current = currentGrade || 0;
    const weight = finalWeight || 0;
    const target = targetGrade || 0;

    if (weight === 0) return 0;

    const currentWeight = 100 - weight;
    const required = (target - (current * (currentWeight / 100))) / (weight / 100);

    return Math.max(0, Math.min(100, required));
  };

  const handleAddGrade = () => {
    setGrades([...grades, { score: '', weight: '' }]);
  };

  const handleRemoveGrade = (index) => {
    if (grades.length > 1) {
      const newGrades = [...grades];
      newGrades.splice(index, 1);
      setGrades(newGrades);
    }
  };

  const handleGradeChange = (index, field, value) => {
    const newGrades = [...grades];
    newGrades[index][field] = value;
    setGrades(newGrades);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setError(null);

    // Validate inputs
    for (const grade of grades) {
      if (grade.score === '' || grade.weight === '') {
        setError('Please fill in all score and weight fields');
        setIsCalculating(false);
        return;
      }
      
      const score = parseFloat(grade.score);
      const weight = parseFloat(grade.weight);
      
      if (isNaN(score) || isNaN(weight) || score < 0 || score > 100 || weight < 0 || weight > 100) {
        setError('Please enter valid scores (0-100) and weights (0-100)');
        setIsCalculating(false);
        return;
      }
    }

    if (finalWeight === '') {
      setError('Please enter final exam weight');
      setIsCalculating(false);
      return;
    }

    if (targetGrade === '') {
      setError('Please enter your target grade');
      setIsCalculating(false);
      return;
    }

    // Calculate grades
    setTimeout(() => {
      try {
        const current = calculateCurrentGrade(grades);
        const required = calculateRequiredFinalScore(
          current, 
          parseFloat(finalWeight), 
          parseFloat(targetGrade)
        );
        
        setCurrentGrade(current);
        setRequiredFinalScore(required);
      } catch (err) {
        setError('An error occurred during calculation. Please check your inputs.');
      } finally {
        setIsCalculating(false);
      }
    }, 500);
  };

  if (!isMounted) return null;

  return (
    <>
      <Head>
        <title>Grade Calculator | Calculate Your Final Exam Score Needed</title>
        <meta 
          name="description" 
          content="Calculate the score you need on your final exam to reach your target grade. Easy-to-use grade calculator for students." 
        />
        <meta name="keywords" content="grade calculator, final exam calculator, GPA calculator, school grade calculator" />
      </Head>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Grade Calculator</h1>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="space-y-4">
            {grades.map((grade, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex-1">
                  <label htmlFor={`score-${index}`} className="block text-sm font-medium text-gray-700">
                    Assignment {index + 1} Score (%)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPercent className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      id={`score-${index}`}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                      placeholder="85"
                      value={grade.score}
                      onChange={(e) => handleGradeChange(index, 'score', e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label htmlFor={`weight-${index}`} className="block text-sm font-medium text-gray-700">
                    Weight (% of total grade)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPercent className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      id={`weight-${index}`}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                      placeholder="20"
                      value={grade.weight}
                      onChange={(e) => handleGradeChange(index, 'weight', e.target.value)}
                    />
                  </div>
                </div>
                {grades.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveGrade(index)}
                    className="mt-6 p-2 text-red-500 hover:text-red-700"
                    aria-label="Remove grade"
                  >
                    <FiTrash2 />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleAddGrade}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FiPlus className="mr-1" /> Add Another Assignment
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="final-weight" className="block text-sm font-medium text-gray-700">
                Final Exam Weight (% of total grade)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPercent className="text-gray-400" />
                </div>
                <input
                  type="number"
                  min="0"
                  max="100"
                  id="final-weight"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                  placeholder="30"
                  value={finalWeight}
                  onChange={(e) => setFinalWeight(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="target-grade" className="block text-sm font-medium text-gray-700">
                Target Final Grade (%)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiAward className="text-gray-400" />
                </div>
                <input
                  type="number"
                  min="0"
                  max="100"
                  id="target-grade"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                  placeholder="85"
                  value={targetGrade}
                  onChange={(e) => setTargetGrade(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isCalculating}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? 'Calculating...' : 'Calculate My Grade'}
            </button>
          </div>
        </form>

        <div className="mt-8">
          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiAlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          {currentGrade !== null && (
            <div className="space-y-4">
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FiInfo className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Current Grade</h3>
                    <div className="mt-2 text-2xl font-bold text-blue-700">
                      {currentGrade.toFixed(1)}%
                    </div>
                    <div className="mt-1 text-sm text-blue-700">
                      Based on your current assignments
                    </div>
                  </div>
                </div>
              </div>

              {requiredFinalScore !== null && (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FiCheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Required Final Exam Score</h3>
                      <div className="mt-2 text-2xl font-bold text-green-700">
                        {requiredFinalScore.toFixed(1)}%
                      </div>
                      <div className="mt-1 text-sm text-green-700">
                        To achieve your target grade
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Monetization Ad Space */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-center">
            <p className="text-sm text-gray-500 mb-2">Advertisement</p>
            <div className="min-h-[90px] flex items-center justify-center bg-white border border-gray-200 rounded">
              <p className="text-gray-400">Ad Space</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}