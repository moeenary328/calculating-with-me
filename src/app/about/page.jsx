'use client';

import { motion } from 'framer-motion';
import Head from 'next/head';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Calculating with Me</title>
        <meta name="description" content="Learn about our collection of free text processing tools designed to make your writing and editing easier." />
      </Head>

      <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              About Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Calculating with Me</span>
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              your writing with simple & Calculating with Me
            </p>
            <h4 className="mt-7 max-w-xl mx-auto text-xl text-red-500">
              I am (Moeen) From Pakistan.
            </h4>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-gray-50 rounded-xl shadow-lg p-8 sm:p-10"
          >
            <div className="prose prose-lg max-w-none text-gray-600">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="mb-6">
                We created these text tools to help writers, developers, students, and professionals 
                work more efficiently with text content. Our goal is to provide simple, intuitive 
                tools that solve common text processing challenges without unnecessary complexity.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-blue-500">✓</span>
                  <span className="ml-2">100% free with no registration required</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-blue-500">✓</span>
                  <span className="ml-2">All processing happens in your browser (no server-side tracking)</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-blue-500">✓</span>
                  <span className="ml-2">Mobile-friendly design</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-blue-500">✓</span>
                  <span className="ml-2">No signin free to use all users </span>
                </li>
              </ul>

            </div>
          </motion.div>

        </motion.div>
      </div>
    </>
  );
}