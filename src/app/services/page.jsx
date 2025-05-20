import { Metadata } from "next";

export const metadata = {
  title: "Our Services - Calculating with Me",
  description: "Explore the wide range of calculator and text tools provided by Calculating with Me.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white px-4 py-8 md:px-16 lg:px-32">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-700 dark:text-blue-400">
          Our Services
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          From calculators to text processing tools, we provide a variety of powerful, intuitive, and 100% free services to help you get the job done efficiently — right in your browser.
        </p>
      </div>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow hover:shadow-lg transition duration-300 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
              {service.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{service.description}</p>
          </div>
        ))}
      </section>

      <div className="mt-12 text-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          More amazing tools & Services are coming soon — in 2026!
        </p>
      </div>
    </main>
  );
}

const services = [
  {
    title: "Financial Calculators",
    description: "Loan, Mortgage, Investment, Salary, and Retirement calculators with full logic, styled designs, and mobile support.",
  },
  {
    title: "Scientific & Math Calculators",
    description: "Advanced calculators like scientific and percentage calculators for students and professionals.",
  },
  {
    title: "Text Tools",
    description: "Word Counter, Extra Space Remover, Duplicate Line Remover, Text Reverser, and more text utilities.",
  },
  {
    title: "Invoice & Receipt Generators",
    description: "Generate professional invoices and sales receipts with downloadable PDF support.",
  },
  {
    title: "PDF Tools",
    description: "Coming soon: Merge, split, and compress PDF files with ease — all browser-based.",
  },
 
];
