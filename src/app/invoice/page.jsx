// app/invoice/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export default function InvoiceGenerator() {
  const [isMounted, setIsMounted] = useState(false);
  const [invoice, setInvoice] = useState({
    number: '',
    date: '',
    clientName: '',
    items: [
      { description: 'Web Design', quantity: 1, rate: 500, amount: 500 }
    ],
    total: 500
  });

  // Initialize after mount to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
    setInvoice(prev => ({
      ...prev,
      number: `INV-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString().split('T')[0]
    }));
  }, []);

  // SEO metadata
  useEffect(() => {
    if (!isMounted) return;
    
    document.title = "Free Invoice Generator | Create & Download PDF Invoices";
    const metaDesc = document.querySelector('meta[name="description"]') || 
                     document.createElement('meta');
    metaDesc.name = "description";
    metaDesc.content = "Generate professional invoices in seconds. Free online tool to create and download PDF invoices instantly.";
    document.head.appendChild(metaDesc);
  }, [isMounted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...invoice.items];
    newItems[index] = { 
      ...newItems[index], 
      [name]: name === 'description' ? value : Number(value)
    };
    
    if (name === 'quantity' || name === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    
    const total = newItems.reduce((sum, item) => sum + (item.amount || 0), 0);
    
    setInvoice(prev => ({
      ...prev,
      items: newItems,
      total
    }));
  };

  const generatePdf = async () => {
    if (!isMounted) return;
    
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]);
      
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      
      // Header
      page.drawText('INVOICE', { x: 50, y: 750, size: 24, font });
      page.drawText(`#${invoice.number}`, { x: 450, y: 750, size: 12, font });
      
      // Client Info
      page.drawText(`Client: ${invoice.clientName}`, { x: 50, y: 700, size: 14 });
      page.drawText(`Date: ${invoice.date}`, { x: 50, y: 680, size: 12 });
      
      // Items Table
      page.drawText('Description', { x: 50, y: 650, size: 12, font });
      page.drawText('Qty', { x: 350, y: 650, size: 12, font });
      page.drawText('Rate', { x: 400, y: 650, size: 12, font });
      page.drawText('Amount', { x: 500, y: 650, size: 12, font });
      
      let yPos = 630;
      invoice.items.forEach(item => {
        page.drawText(item.description, { x: 50, y: yPos, size: 10 });
        page.drawText(item.quantity.toString(), { x: 350, y: yPos, size: 10 });
        page.drawText(`$${item.rate}`, { x: 400, y: yPos, size: 10 });
        page.drawText(`$${item.amount}`, { x: 500, y: yPos, size: 10 });
        yPos -= 20;
      });
      
      // Total
      page.drawText(`Total: $${invoice.total}`, { 
        x: 400, 
        y: yPos - 30, 
        size: 16, 
        font,
        color: rgb(0.2, 0.5, 0.2)
      });
      
      // Download PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice_${invoice.number}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  if (!isMounted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-6">Invoice Generator</h1>
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="h-12 bg-gray-200 rounded w-1/3 ml-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Invoice Form */}
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Invoice Generator</h1>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block mb-1">Invoice Number</label>
            <input
              type="text"
              name="number"
              value={invoice.number}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block mb-1">Client Name</label>
            <input
              type="text"
              name="clientName"
              value={invoice.clientName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={invoice.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-3">Items</h2>
        {invoice.items.map((item, index) => (
          <div key={index} className="grid grid-cols-4 gap-2 mb-4">
            <input
              type="text"
              name="description"
              value={item.description}
              onChange={(e) => handleItemChange(index, e)}
              className="p-2 border rounded col-span-2"
              placeholder="Description"
            />
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
              className="p-2 border rounded"
              min="1"
              placeholder="Qty"
            />
            <input
              type="number"
              name="rate"
              value={item.rate}
              onChange={(e) => handleItemChange(index, e)}
              className="p-2 border rounded"
              min="0"
              step="0.01"
              placeholder="Rate"
            />
          </div>
        ))}
        
        <div className="flex justify-between items-center mt-6">
          <div className="text-lg font-semibold">
            Total: ${invoice.total}
          </div>
          <button
            onClick={generatePdf}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Viral Articles Section */}
      <div className="mt-16 grid md:grid-cols-3 gap-8">
        {/* Article 1 */}
        <article className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-3">How to Create Professional Invoices in 5 Minutes</h2>
          <p className="mb-4">Learn the secrets to creating invoices that get you paid faster. Our step-by-step guide shows you exactly what to include for maximum professionalism.</p>
          <ul className="space-y-2 text-sm">
            <li>✓ Essential elements every invoice needs</li>
            <li>✓ Common mistakes to avoid</li>
            <li>✓ How to format for quick payment</li>
          </ul>
        </article>

        {/* Article 2 */}
        <article className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-3">Freelancer's Guide to Getting Paid On Time</h2>
          <p className="mb-4">Discover proven strategies to reduce late payments and improve your cash flow as a freelancer or small business owner.</p>
          <ul className="space-y-2 text-sm">
            <li>✓ Setting clear payment terms</li>
            <li>✓ When to send payment reminders</li>
            <li>✓ Tools to automate your invoicing</li>
          </ul>
        </article>

        {/* Article 3 */}
        <article className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-3">Tax Deductions Every Small Business Should Know</h2>
          <p className="mb-4">Are you missing out on valuable tax deductions? Learn which business expenses you can write off to reduce your tax bill.</p>
          <ul className="space-y-2 text-sm">
            <li>✓ Home office deductions</li>
            <li>✓ Equipment and software expenses</li>
            <li>✓ Mileage and travel costs</li>
          </ul>
        </article>
      </div>
    </div>
  );
}