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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Contact <span className="text-blue-600">Us</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Contact with Email or Phone number with me any time contact now for free inquiry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-8"
          >
            {[
              {
                icon: <FiMail className="h-5 w-5" />,
                title: 'Email Us',
                detail1: 'moeenkhanpro111@gmail.com',
                detail2: 'Typically replies within 24 hours',
                color: 'bg-blue-100 text-blue-600'
              },
              {
                icon: <FiPhone className="h-5 w-5" />,
                title: 'Call Us',
                detail1: '+92 3186314829',
                detail2: 'any time contact of me',
                color: 'bg-green-100 text-green-600'
              },
              {
                icon: <FiMapPin className="h-5 w-5" />,
                title: 'Visit Us',
                detail1: 'pakistan punjab - KotAddu',
                detail2: 'near sheikh umer - Sinawan',
                color: 'bg-purple-100 text-purple-600'
              }
            ].map((info, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4"
              >
                <div className={`${info.color} p-3 rounded-lg`}>{info.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{info.title}</h3>
                  <p className="mt-1 text-gray-600">{info.detail1}</p>
                  <p className="mt-2 text-sm text-gray-500">{info.detail2}</p>
                </div>
              </div>
            ))}

            {/* Follow Us Section with only Facebook & YouTube */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Follow Us</h3>
  <div className="flex gap-3 justify-center">
    {[
      { icon: <FiFacebook />, name: 'Facebook', href: 'https://www.facebook.com/share/1BbHoqUs2K/' },
      { icon: <FaYoutube />, name: 'YouTube', href: 'https://youtube.com/@codebymoeen-o4j?si=dFDyt8xdCxd22TDn' }
    ].map((social, idx) => (
      <a
        key={idx}
        href={social.href}
        aria-label={social.name}
        className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-blue-600 transition-colors"
      >
        {social.icon}
      </a>
    ))}
  </div>
</div>

          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100"
          >
            {status === 'success' ? (
              <div className="text-center py-10">
                <FiCheckCircle className="mx-auto h-14 w-14 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for contacting us. We’ll be in touch soon.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium ${
                      status === 'submitting'
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 transition'
                    }`}
                  >
                    {status === 'submitting' ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
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
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="h-5 w-5" />
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
