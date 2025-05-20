// app/gpa-calculator/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { FiBook, FiPlus, FiTrash2, FiInfo, FiChevronRight, FiAward, FiHelpCircle } from 'react-icons/fi';

const metadata = {
  title: 'Free GPA Calculator | Calculate Your Grade Point Average',
  description: 'Accurately calculate your GPA for high school, college, or university. Supports weighted and unweighted GPA calculations.',
  keywords: 'GPA calculator, grade calculator, college GPA, high school GPA, weighted GPA, cumulative GPA'
};

const GRADE_SCALE = [
  { letter: 'A+', value: 4.0, weighted: 4.5 },
  { letter: 'A', value: 4.0, weighted: 4.0 },
  { letter: 'A-', value: 3.7, weighted: 3.7 },
  { letter: 'B+', value: 3.3, weighted: 3.3 },
  { letter: 'B', value: 3.0, weighted: 3.0 },
  { letter: 'B-', value: 2.7, weighted: 2.7 },
  { letter: 'C+', value: 2.3, weighted: 2.3 },
  { letter: 'C', value: 2.0, weighted: 2.0 },
  { letter: 'C-', value: 1.7, weighted: 1.7 },
  { letter: 'D+', value: 1.3, weighted: 1.3 },
  { letter: 'D', value: 1.0, weighted: 1.0 },
  { letter: 'F', value: 0.0, weighted: 0.0 },
];

export default function GPACalculatorPage() {
  const [calculationType, setCalculationType] = useState('current');
  const [courses, setCourses] = useState([
    { id: 1, name: '', credits: 1, grade: '', isHonors: false }
  ]);
  const [cumulativeGPA, setCumulativeGPA] = useState('');
  const [cumulativeCredits, setCumulativeCredits] = useState('');
  const [isWeighted, setIsWeighted] = useState(false);
  const [result, setResult] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set SEO meta tags and mark as client-side
  useEffect(() => {
    setIsClient(true);
    document.title = metadata.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', metadata.description);
    }
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      const newMeta = document.createElement('meta');
      newMeta.name = 'keywords';
      newMeta.content = metadata.keywords;
      document.head.appendChild(newMeta);
    }
  }, []);

  const addCourse = () => {
    setCourses([...courses, {
      id: Date.now(),
      name: '',
      credits: 1,
      grade: '',
      isHonors: false
    }]);
  };

  const removeCourse = (id) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const updateCourse = (id, field, value) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    let weightedPoints = 0;
    let weightedCredits = 0;

    // Calculate current semester GPA
    courses.forEach(course => {
      if (course.grade && course.credits) {
        const gradeInfo = GRADE_SCALE.find(g => g.letter === course.grade);
        if (gradeInfo) {
          const points = isWeighted && course.isHonors ? gradeInfo.weighted : gradeInfo.value;
          totalPoints += points * course.credits;
          totalCredits += parseFloat(course.credits);

          if (course.isHonors) {
            weightedPoints += gradeInfo.weighted * course.credits;
            weightedCredits += parseFloat(course.credits);
          }
        }
      }
    });

    if (calculationType === 'cumulative' && cumulativeGPA && cumulativeCredits) {
      const cumulativePoints = parseFloat(cumulativeGPA) * parseFloat(cumulativeCredits);
      totalPoints += cumulativePoints;
      totalCredits += parseFloat(cumulativeCredits);
    }

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    const weightedGpa = weightedCredits > 0 ? (weightedPoints / weightedCredits).toFixed(2) : 0;

    setResult({
      gpa,
      weightedGpa,
      totalCredits,
      weightedCredits,
      isWeighted
    });
  };

  const calculateSemesterGPA = () => {
    if (!cumulativeGPA || !cumulativeCredits || !result) return null;
    
    const previousPoints = parseFloat(cumulativeGPA) * parseFloat(cumulativeCredits);
    const semesterCredits = result.totalCredits - parseFloat(cumulativeCredits);
    
    if (semesterCredits <= 0) return null;
    
    const semesterPoints = (parseFloat(result.gpa) * parseFloat(result.totalCredits)) - previousPoints;
    return (semesterPoints / semesterCredits).toFixed(2);
  };

  const resetCalculator = () => {
    setCourses([{ id: 1, name: '', credits: 1, grade: '', isHonors: false }]);
    setCumulativeGPA('');
    setCumulativeCredits('');
    setResult(null);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading GPA calculator...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* SEO Optimized Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{metadata.title}</h1>
          <p className="text-lg text-gray-600">{metadata.description}</p>
        </header>

        {/* Calculator Section */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <div className="flex border-b mb-6">
              <button
                className={`flex-1 py-2 font-medium ${calculationType === 'current' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => {
                  setCalculationType('current');
                  resetCalculator();
                }}
              >
                Current Semester
              </button>
              <button
                className={`flex-1 py-2 font-medium ${calculationType === 'cumulative' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => {
                  setCalculationType('cumulative');
                  resetCalculator();
                }}
              >
                Cumulative GPA
              </button>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <label htmlFor="weighted" className="mr-2 text-sm font-medium text-gray-700">
                  Weighted GPA
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    id="weighted"
                    checked={isWeighted}
                    onChange={() => setIsWeighted(!isWeighted)}
                    className="sr-only"
                  />
                  <div className={`block w-10 h-6 rounded-full ${isWeighted ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isWeighted ? 'transform translate-x-4' : ''}`}
                  ></div>
                </div>
                <FiHelpCircle 
                  className="text-gray-400 cursor-pointer" 
                  title="Weighted GPA gives extra points for honors/AP courses"
                />
              </div>
              <button
                onClick={addCourse}
                className="flex items-center text-blue-600 text-sm"
              >
                <FiPlus className="mr-1" /> Add Course
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {courses.map((course) => (
                <div key={course.id} className="grid grid-cols-12 gap-4 items-end">
                  <div className="col-span-5">
                    <label htmlFor={`course-name-${course.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Course Name
                    </label>
                    <input
                      type="text"
                      id={`course-name-${course.id}`}
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="e.g. Mathematics"
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor={`credits-${course.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Credits
                    </label>
                    <select
                      id={`credits-${course.id}`}
                      value={course.credits}
                      onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-3">
                    <label htmlFor={`grade-${course.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Grade
                    </label>
                    <select
                      id={`grade-${course.id}`}
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select grade</option>
                      {GRADE_SCALE.map(grade => (
                        <option key={grade.letter} value={grade.letter}>{grade.letter}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <input
                      type="checkbox"
                      id={`honors-${course.id}`}
                      checked={course.isHonors}
                      onChange={(e) => updateCourse(course.id, 'isHonors', e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <label htmlFor={`honors-${course.id}`} className="ml-2 text-sm text-gray-700">
                      Honors
                    </label>
                  </div>
                  <div className="col-span-1">
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="w-full p-2 text-red-500 hover:text-red-700"
                      disabled={courses.length <= 1}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {calculationType === 'cumulative' && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="cumulativeGPA" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Cumulative GPA
                  </label>
                  <input
                    type="number"
                    id="cumulativeGPA"
                    min="0"
                    max="4.5"
                    step="0.01"
                    value={cumulativeGPA}
                    onChange={(e) => setCumulativeGPA(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g. 3.75"
                  />
                </div>
                <div>
                  <label htmlFor="cumulativeCredits" className="block text-sm font-medium text-gray-700 mb-1">
                    Total Credits Completed
                  </label>
                  <input
                    type="number"
                    id="cumulativeCredits"
                    min="0"
                    step="0.5"
                    value={cumulativeCredits}
                    onChange={(e) => setCumulativeCredits(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g. 45"
                  />
                </div>
              </div>
            )}

            <button
              onClick={calculateGPA}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
            >
              Calculate GPA <FiChevronRight className="ml-1" />
            </button>

            {result && (
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <FiAward className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Your {isWeighted ? 'Weighted' : 'Unweighted'} GPA
                  </h3>
                  <p className="text-5xl font-bold text-blue-600 mb-4">{result.gpa}</p>
                  
                  {isWeighted && result.weightedCredits > 0 && (
                    <p className="text-gray-600 mb-2">
                      Weighted GPA: <span className="font-medium">{result.weightedGpa}</span>
                    </p>
                  )}
                  
                  <p className="text-gray-600">
                    Based on <span className="font-medium">{result.totalCredits}</span> total credits
                  </p>
                  
                  {calculationType === 'cumulative' && cumulativeGPA && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        Previous GPA: {cumulativeGPA} ({cumulativeCredits} credits)
                      </p>
                      <p className="text-sm text-gray-600">
                        Semester GPA: {calculateSemesterGPA()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* User Guide Section */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <button 
              onClick={() => setShowGuide(!showGuide)}
              className="flex items-center text-blue-600 mb-4"
            >
              <FiInfo className="mr-2" />
              {showGuide ? 'Hide Instructions' : 'Show Instructions'}
            </button>

            {showGuide && (
              <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">How to Calculate Your GPA</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Current Semester GPA</h3>
                    <p className="text-gray-600">
                      Calculate your GPA for the current semester by entering all your courses, credits, and grades.
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
                      <li>Add all your courses using the "Add Course" button</li>
                      <li>Enter the number of credits for each course</li>
                      <li>Select your letter grade for each course</li>
                      <li>Mark honors/AP courses if using weighted GPA</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Cumulative GPA</h3>
                    <p className="text-gray-600">
                      Calculate your overall GPA by including your previous cumulative GPA and credits.
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
                      <li>Enter your current cumulative GPA</li>
                      <li>Enter your total completed credits</li>
                      <li>Add your current semester courses as above</li>
                      <li>The calculator will combine both for your new cumulative GPA</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Weighted vs. Unweighted GPA</h3>
                    <p className="text-gray-600">
                      <strong>Unweighted GPA:</strong> All courses are graded on a 4.0 scale
                    </p>
                    <p className="text-gray-600">
                      <strong>Weighted GPA:</strong> Honors/AP courses receive extra points (typically 0.5)
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Understanding GPA Calculations</h2>
            
            <div className="prose prose-sm max-w-none text-gray-600">
              <p>
                GPA (Grade Point Average) is a standardized way of measuring academic achievement.
                Our calculator helps you accurately determine your GPA for college applications,
                scholarship requirements, or academic planning.
              </p>
              
              <h3 className="font-medium text-gray-900 mt-4">How GPA is Calculated</h3>
              <p>
                GPA is calculated by converting each letter grade to grade points, multiplying by
                the course credits, summing all points, and dividing by total credits. For example:
              </p>
              
              <ul className="list-disc pl-5 my-3">
                <li>An A (4.0) in a 3-credit course = 12 grade points</li>
                <li>A B (3.0) in a 4-credit course = 12 grade points</li>
                <li>Total points (24) ÷ total credits (7) = 3.43 GPA</li>
              </ul>
              
              <h3 className="font-medium text-gray-900 mt-4">Weighted GPA Considerations</h3>
              <p>
                Many high schools use weighted GPA to recognize advanced coursework. Honors and AP
                courses typically add 0.5 points to the standard grade (so an A becomes 4.5 instead of 4.0).
                Our calculator automatically adjusts for weighted GPA when you mark courses as honors.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}