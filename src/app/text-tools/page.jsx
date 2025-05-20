'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFont, FaEraser, FaRetweet, FaSyncAlt, FaSortAlphaDown } from 'react-icons/fa';

const tools = [
  {
    name: 'Word Counter',
    icon: <FaFont className="text-3xl text-indigo-600" />,
    link: '/word-counter',
    desc: 'Count words, characters & spaces in real-time.',
  },
  {
    name: 'Extra Space Remover',
    icon: <FaEraser className="text-3xl text-pink-600" />,
    link: '/extra-space-remover',
    desc: 'Remove unnecessary blank spaces from your text.',
  },
  {
    name: 'Duplicate Line Remover',
    icon: <FaRetweet className="text-3xl text-green-600" />,
    link: '/duplicate-line-remover',
    desc: 'Eliminate all repeated lines easily.',
  },
  {
    name: 'Reverse Text',
    icon: <FaSyncAlt className="text-3xl text-yellow-500" />,
    link: '/reverse-text',
    desc: 'Flip your text backward letter by letter.',
  },
  {
    name: 'Uppercase to Lowercase',
    icon: <FaSortAlphaDown className="text-3xl text-purple-500" />,
    link: '/uppercase-to-lowercase',
    desc: 'Convert capital letters into lowercase smoothly.',
  },
];

export default function TextToolPage() {
  return (
    <div className="min-h-screen w-full bg-white px-6 py-16 text-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-transparent bg-clip-text">
          Powerful Text Tools for Everyone ✨
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Easily edit, analyze, and beautify your text content with just one click.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 hover:bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Link href={tool.link} className="flex flex-col items-center text-center">
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {tool.icon}
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-indigo-700">
                {tool.name}
              </h2>
              <p className="text-gray-600 text-sm">{tool.desc}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="mt-16 text-center text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        ✍️ write your words & enjoy Calculating with Me
      </motion.p>
    </div>
  );
}
