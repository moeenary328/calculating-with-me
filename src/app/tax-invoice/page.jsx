// app/tax-invoice/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { FaFileInvoiceDollar, FaDownload, FaPlus, FaTrash, FaRegLightbulb, FaChartLine, FaHandHoldingUsd, FaReceipt } from 'react-icons/fa';

export default function TaxInvoiceGenerator() {
  const [isMounted, setIsMounted] = useState(false);
  const [invoice, setInvoice] = useState({
    taxId: '',
    number: '',
    date: '',
    dueDate: '',
    business: {
      name: '',
      address: '',
      abn: '',
      phone: '',
      email: ''
    },
    client: {
      name: '',
      address: '',
      abn: '',
      email: ''
    },
    items: [
      { description: '', quantity: 1, rate: 0, tax: 10, amount: 0 }
    ],
    subtotal: 0,
    taxAmount: 0,
    total: 0,
    notes: 'Payment due within 14 days. Late payments subject to 5% interest.'
  });

  // Initialize after mount
  useEffect(() => {
    setIsMounted(true);
    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + 14);
    
    setInvoice(prev => ({
      ...prev,
      taxId: `TAX-${Math.floor(Math.random() * 9000) + 1000}`,
      number: `INV-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`,
      date: today.toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0]
    }));
  }, []);

  // SEO metadata
  useEffect(() => {
    if (!isMounted) return;
    
    document.title = "Professional Tax Invoice Generator | Create & Download GST Invoices free";
    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDesc.name = "description";
    metaDesc.content = "Free online tool to create professional tax invoices with GST calculations. Generate, download, free invoice unlimeted, and print compliant tax invoices in minutes.";
    document.head.appendChild(metaDesc);
    
    // Structured data for SEO
    const script = document.createElement('script');
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Free Tax Invoice Generator",
      "description": "Free online tool to create professional tax invoices for free with GST calculation",
      "applicationCategory": "BusinessApplication"
    });
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, [isMounted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setInvoice(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setInvoice(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...invoice.items];
    newItems[index] = { 
      ...newItems[index], 
      [name]: name === 'description' ? value : Number(value)
    };
    
    // Recalculate amount if quantity, rate or tax changes
    if (['quantity', 'rate', 'tax'].includes(name)) {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    
    // Update totals
    const subtotal = newItems.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = newItems.reduce((sum, item) => sum + (item.amount * item.tax / 100), 0);
    
    setInvoice(prev => ({
      ...prev,
      items: newItems,
      subtotal,
      taxAmount,
      total: subtotal + taxAmount
    }));
  };

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { description: '', quantity: 1, rate: 0, tax: 10, amount: 0 }
      ]
    }));
  };

  const removeItem = (index) => {
    const newItems = invoice.items.filter((_, i) => i !== index);
    const subtotal = newItems.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = newItems.reduce((sum, item) => sum + (item.amount * item.tax / 100), 0);
    
    setInvoice(prev => ({
      ...prev,
      items: newItems,
      subtotal,
      taxAmount,
      total: subtotal + taxAmount
    }));
  };

  const generatePdf = async () => {
    if (!isMounted) return;
    
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]);
      
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      
      // Header with tax invoice label
      page.drawText('TAX INVOICE', {
        x: 50,
        y: 750,
        size: 24,
        font: boldFont,
        color: rgb(0.2, 0.4, 0.6)
      });
      
      // Business info
      page.drawText(invoice.business.name, {
        x: 50,
        y: 700,
        size: 14,
        font: boldFont
      });
      
      page.drawText(`ABN: ${invoice.business.abn}`, {
        x: 50,
        y: 680,
        size: 10,
        font
      });
      
      // Invoice details
      page.drawText(`Invoice #: ${invoice.number}`, {
        x: 400,
        y: 700,
        size: 10,
        font
      });
      
      page.drawText(`Date: ${invoice.date}`, {
        x: 400,
        y: 680,
        size: 10,
        font
      });
      
      // Client info
      page.drawText(`Bill To: ${invoice.client.name}`, {
        x: 50,
        y: 640,
        size: 12,
        font: boldFont
      });
      
      // Items table
      page.drawText('Description', {
        x: 50,
        y: 600,
        size: 12,
        font: boldFont
      });
      
      page.drawText('Qty', {
        x: 300,
        y: 600,
        size: 12,
        font: boldFont
      });
      
      page.drawText('Rate', {
        x: 350,
        y: 600,
        size: 12,
        font: boldFont
      });
      
      page.drawText('Tax %', {
        x: 400,
        y: 600,
        size: 12,
        font: boldFont
      });
      
      page.drawText('Amount', {
        x: 450,
        y: 600,
        size: 12,
        font: boldFont
      });
      
      let yPos = 580;
      invoice.items.forEach(item => {
        page.drawText(item.description, {
          x: 50,
          y: yPos,
          size: 10,
          font
        });
        
        page.drawText(item.quantity.toString(), {
          x: 300,
          y: yPos,
          size: 10,
          font
        });
        
        page.drawText(`$${item.rate.toFixed(2)}`, {
          x: 350,
          y: yPos,
          size: 10,
          font
        });
        
        page.drawText(`${item.tax}%`, {
          x: 400,
          y: yPos,
          size: 10,
          font
        });
        
        page.drawText(`$${item.amount.toFixed(2)}`, {
          x: 450,
          y: yPos,
          size: 10,
          font
        });
        
        yPos -= 20;
      });
      
      // Totals
      page.drawText(`Subtotal: $${invoice.subtotal.toFixed(2)}`, {
        x: 350,
        y: yPos - 40,
        size: 12,
        font
      });
      
      page.drawText(`Tax: $${invoice.taxAmount.toFixed(2)}`, {
        x: 350,
        y: yPos - 60,
        size: 12,
        font
      });
      
      page.drawText(`Total: $${invoice.total.toFixed(2)}`, {
        x: 350,
        y: yPos - 80,
        size: 14,
        font: boldFont,
        color: rgb(0.2, 0.5, 0.2)
      });
      
      // Notes
      page.drawText(`Notes: ${invoice.notes}`, {
        x: 50,
        y: yPos - 120,
        size: 10,
        font
      });
      
      // Download PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tax_invoice_${invoice.number}.pdf`;
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
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
          <div className="h-96 bg-gray-200 rounded mb-8"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <FaFileInvoiceDollar className="text-4xl text-blue-600 mr-4" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Free Tax Invoice Generator</h1>
          <p className="text-gray-600">Create professional tax invoices unlimited free free free</p>
        </div>
      </div>

      {/* Invoice Form */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
        <div className="bg-blue-600 text-white p-4">
          <h2 className="text-xl font-bold flex items-center">
            <FaReceipt className="mr-2" /> Invoice Details
          </h2>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Business Info */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-4 text-blue-600 flex items-center">
                <FaReceipt className="mr-2" /> Your Business
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Business Name</label>
                  <input
                    type="text"
                    name="business.name"
                    value={invoice.business.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ABN</label>
                  <input
                    type="text"
                    name="business.abn"
                    value={invoice.business.abn}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Client Info */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-4 text-blue-600 flex items-center">
                <FaHandHoldingUsd className="mr-2" /> Client Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Client Name</label>
                  <input
                    type="text"
                    name="client.name"
                    value={invoice.client.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Client ABN (if applicable)</label>
                  <input
                    type="text"
                    name="client.abn"
                    value={invoice.client.abn}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Invoice Meta */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium mb-1">Tax Invoice #</label>
              <input
                type="text"
                name="number"
                value={invoice.number}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={invoice.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={invoice.dueDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          
          {/* Items Table */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4 text-blue-600">Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border">Description</th>
                    <th className="p-3 text-left border">Qty</th>
                    <th className="p-3 text-left border">Rate ($)</th>
                    <th className="p-3 text-left border">Tax (%)</th>
                    <th className="p-3 text-left border">Amount ($)</th>
                    <th className="p-3 text-left border"></th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 border">
                        <input
                          type="text"
                          name="description"
                          value={item.description}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-full p-2 border rounded"
                          required
                        />
                      </td>
                      <td className="p-3 border">
                        <input
                          type="number"
                          name="quantity"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-full p-2 border rounded"
                          min="1"
                          required
                        />
                      </td>
                      <td className="p-3 border">
                        <input
                          type="number"
                          name="rate"
                          value={item.rate}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-full p-2 border rounded"
                          min="0"
                          step="0.01"
                          required
                        />
                      </td>
                      <td className="p-3 border">
                        <input
                          type="number"
                          name="tax"
                          value={item.tax}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-full p-2 border rounded"
                          min="0"
                          max="100"
                          step="0.1"
                          required
                        />
                      </td>
                      <td className="p-3 border">
                        <div className="p-2">${item.amount.toFixed(2)}</div>
                      </td>
                      <td className="p-3 border">
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-500 hover:text-red-700 p-2"
                          title="Remove item"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={addItem}
              className="mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center"
            >
              <FaPlus className="mr-2" /> Add Item
            </button>
          </div>
          
          {/* Totals */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                name="notes"
                value={invoice.notes}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax:</span>
                <span>${invoice.taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="flex justify-end">
            <button
              onClick={generatePdf}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <FaDownload className="mr-2" /> Download Tax Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Viral Articles Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FaRegLightbulb className="mr-2 text-yellow-500" /> Helpful Resources
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Article 1 */}
          <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <div className="bg-blue-100 p-4">
              <FaChartLine className="text-3xl text-blue-600 mb-2" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">GST Compliance Guide for Small Businesses</h3>
              <p className="text-sm text-gray-600 mb-3">Everything you need to know about GST registration, reporting, and compliance in Australia.</p>
              <ul className="text-xs space-y-1 text-gray-700">
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> When to register for GST</li>
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> GST reporting requirements</li>
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Common GST mistakes to avoid</li>
              </ul>
            </div>
          </article>
          
          {/* Article 2 */}
          <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <div className="bg-green-100 p-4">
              <FaHandHoldingUsd className="text-3xl text-green-600 mb-2" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">How to Get Paid Faster</h3>
              <p className="text-sm text-gray-600 mb-3">Proven strategies to reduce payment delays and improve your cash flow.</p>
              <ul className="text-xs space-y-1 text-gray-700">
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Setting clear payment terms</li>
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Effective payment reminders</li>
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Offering multiple payment options</li>
              </ul>
            </div>
          </article>
          
          {/* Article 3 */}
          <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <div className="bg-purple-100 p-4">
              <FaFileInvoiceDollar className="text-3xl text-purple-600 mb-2" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Tax Deductions You Might Be Missing</h3>
              <p className="text-sm text-gray-600 mb-3">Common business expenses you can claim to reduce your tax bill.</p>
              <ul className="text-xs space-y-1 text-gray-700">
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Home office expenses</li>
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Vehicle and travel costs</li>
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Professional development</li>
              </ul>
            </div>
          </article>
          
          {/* Article 4 */}
          <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <div className="bg-yellow-100 p-4">
              <FaRegLightbulb className="text-3xl text-yellow-600 mb-2" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Digital Tools for Small Business</h3>
              <p className="text-sm text-gray-600 mb-3">Essential apps and software to streamline your business operations.</p>
              <ul className="text-xs space-y-1 text-gray-700">
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Accounting software</li>
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Time tracking tools</li>
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Project management apps</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}