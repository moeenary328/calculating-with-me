'use client';
import { motion } from 'framer-motion';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 md:px-16 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 2, y: 1 }}
        transition={{ type: 'spring', stiffness: 60 }}
        className="text-4xl md:text-5xl font-bold text-center text-blue-600 dark:text-blue-400 mb-12"
      >
        📝 MyBlogs
      </motion.h1>

      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow-md max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-2">
          🔍 Latest Blogs
        </h2>
    
        <div className="mt-4 text-base text-gray-800 dark:text-gray-200 space-y-2">
          <h3><strong>✨ Introduction & Praise for Users</strong> 
<br />Welcome to CalculatingWithMe.com — your all-in-one digital toolkit for smarter calculations, powerful tools, and professional results — absolutely free and instantly accessible.

Whether you're a student, professional, business owner, or just someone who loves convenience, our platform is designed with you in mind. We’ve built a clean, fast, and user-friendly experience to make your daily tasks easier and more efficient.

</h3>
        </div>
        <div className="mt-4 text-base text-gray-800 dark:text-gray-200 space-y-2">
            <h2><strong>🧮 What You’ll Find on CalculatingWithMe.com:</strong>
<br /><strong>✅ Financial Calculators</strong><br />
Calculate loans, salaries, taxes, investments, interest rates, and more — with full accuracy and interactive designs. Perfect for budgeting, planning, or financial analysis.

<strong>✅ PDF Invoice Generators</strong> <br />
Create professional invoices in seconds! Whether you need a sales receipt, fee estimate, or service bill, our invoice tools offer:

Clean templates

Custom fields

PDF download in one click
No sign-up, no charges — just print & go.

<strong>✅ Smart Text Tools</strong><br />
Make your writing easier and faster with tools like:

Word Counter

Extra Space Remover

Uppercase ⇄ Lowercase

Reverse Text

Duplicate Line Remover

Whether you're editing documents, coding, or posting online — these text tools save time and boost quality.</h2>
<div className="mt-4 text-base text-gray-800 dark:text-gray-200 space-y-2">
    <h2>
       <strong>🌟 Why Users Love CalculatingWithMe.com:</strong> <br />
<br />🔐 100% Free & Safe to Use

⚡ Lightning Fast Performance

📱 Mobile & Desktop Friendly

🌙 Light/Dark Mode Support

🎨 Unique Designs with Animations

🧠 Easy-to-understand Layouts for All Ages

We believe that smart tools should be accessible, elegant, and powerful — and that’s exactly what we deliver.

<strong>🙌 Try It Now</strong><br />
<br />Explore the tools. Save time. Impress your clients, teachers, or yourself.

Start calculating smarter — only on CalculatingWithMe.com 🚀
    </h2>
</div>
        </div>
      </motion.div>
    </div>
  );
}

