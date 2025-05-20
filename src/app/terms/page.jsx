// app/terms/page.jsx
import Head from 'next/head';

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | Calculating with Me</title>
        <meta name="description" content="Terms and conditions for Calculating with Me services" />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
        </div>

        {/* Content Container */}
        <div className="bg-white shadow-sm rounded-lg p-6 md:p-8">
          {/* Introduction Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
            <p className="mb-4 text-gray-700">
              These Terms and Conditions ("Terms") govern your use of the Calculating with Me website and tools ("Services").
            </p>
            <p className="text-gray-700">
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree, please discontinue use immediately...
            </p>
          </section>

          {/* Service Description Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Our Services</h2>
            <p className="mb-4 text-gray-700">
              Calculating with Me provides browser-based tools including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Text processing and analysis tools</li>
              <li>Financial calculators (mortgage, loan, interest, Text Tools & Invoices etc.)</li>
              <li>Document conversion utilities</li>
            </ul>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Key Features:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>100% free with no registration required</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>All processing happens in your browser</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Mobile-friendly design</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>No signup required</span>
                </li>
              </ul>
            </div>
          </section>

          {/* User Responsibilities Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Responsibilities</h2>
            <p className="mb-4 text-gray-700">
              You agree to use our Service responsibly and lawfully. Prohibited activities include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Using our tools for illegal purposes</li>
              <li>Attempting to reverse engineer our Service</li>
              <li>Excessive automated access to our tools</li>
              <li>Misrepresenting calculator results as professional advice</li>
            </ul>
          </section>
 

          {/* Limitation of Liability Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-700">
              Calculating with Me shall not be liable for any damages resulting from use of our Service. Our tools provide estimates only.
            </p>
          </section>

        </div>
      </main>
    </>
  );
}