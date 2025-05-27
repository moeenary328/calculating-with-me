'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiFacebook
} from 'react-icons/fi';
import { FaYoutube } from 'react-icons/fa';

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 px-4 overflow-x-hidden">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 px-2"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Contact <span className="text-blue-600">Us</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
            Reach out via email or phone anytime
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Info Cards - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4 w-full"
          >
            {/* Contact Info Cards */}
            {[
              {
                icon: <FiMail className="h-4 w-4 sm:h-5 sm:w-5" />,
                title: 'Email Us',
                detail1: 'moeenthaheem1@gmail.com',
                detail2: 'Replies within 24 hours',
                color: 'bg-blue-100 text-blue-600'
              },
              {
                icon: <FiPhone className="h-4 w-4 sm:h-5 sm:w-5" />,
                title: 'Call Us',
                detail1: '+92 3186314829',
                detail2: 'Available anytime',
                color: 'bg-green-100 text-green-600'
              },
              {
                icon: <FiMapPin className="h-4 w-4 sm:h-5 sm:w-5" />,
                title: 'Visit Us',
                detail1: 'Kot Addu, Punjab',
                detail2: 'Near Sheikh Umer, Sinswan',
                color: 'bg-purple-100 text-purple-600'
              }
            ].map((info, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start gap-3 w-full"
              >
                <div className={`${info.color} p-2 rounded-md flex-shrink-0`}>
                  {info.icon}
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-base font-semibold text-gray-900 truncate">{info.title}</h3>
                  <p className="text-sm text-gray-700 truncate">{info.detail1}</p>
                  <p className="text-xs text-gray-500 truncate">{info.detail2}</p>
                </div>
              </div>
            ))}

            {/* Social Media Section */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 w-full">
              <h3 className="text-base font-semibold text-gray-900 mb-3 text-center">
                Follow Us
              </h3>
              <div className="flex justify-center gap-3">
                <a
                  href="https://www.facebook.com/share/1BbHoqUs2K/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-50 hover:bg-blue-50 rounded-md text-gray-700 hover:text-blue-600 transition-colors"
                  aria-label="Facebook"
                >
                  <FiFacebook className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a
                  href="https://youtube.com/@dadiwaliai-videos1?si=PVRyt3yLuw0h8VY9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-50 hover:bg-red-50 rounded-md text-gray-700 hover:text-red-600 transition-colors"
                  aria-label="YouTube"
                >
                  <FaYoutube className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form - Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white p-5 rounded-lg shadow-md border border-gray-100 w-full"
          >
            {status === 'success' ? (
              <div className="text-center py-6">
                <FiCheckCircle className="mx-auto h-10 w-10 text-green-500 mb-3" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-sm text-gray-600 mb-5">
                  Thank you for contacting us
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition text-sm"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Send Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className={`w-full flex items-center justify-center gap-1 px-4 py-2 rounded-md text-white text-sm font-medium ${
                      status === 'submitting'
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 transition'
                    }`}
                  >
                    {status === 'submitting' ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}