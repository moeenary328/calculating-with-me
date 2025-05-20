// app/receipt-invoice/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { FaReceipt, FaDownload, FaPlus, FaTrash, FaInfoCircle, FaRegLightbulb, FaDollarSign, FaFileSignature } from 'react-icons/fa';

export default function ReceiptInvoiceGenerator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [receipt, setReceipt] = useState({
    receiptNumber: '',
    date: '',
    paymentMethod: 'Cash',
    seller: {
      name: '',
      address: '',
      contact: ''
    },
    buyer: {
      name: '',
      address: '',
      contact: ''
    },
    items: [
      { description: '', quantity: 1, unitPrice: 0, total: 0 }
    ],
    subtotal: 0,
    tax: 0,
    grandTotal: 0,
    notes: 'Thank you for your business!'
  });

  // Initialize after component mounts
  useEffect(() => {
    setIsMounted(true);
    const today = new Date();
    setReceipt(prev => ({
      ...prev,
      receiptNumber: `RCPT-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`,
      date: today.toISOString().split('T')[0]
    }));

    // Cleanup function
    return () => {
      setIsMounted(false);
    };
  }, []);

  // SEO configuration
  useEffect(() => {
    if (!isMounted) return;

    document.title = "Free Online Receipt Generator | Create & Download Professional Receipts";
    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDesc.name = "description";
    metaDesc.content = "Generate, customize, and download professional receipts instantly. Free online receipt maker with tax calculations, multiple payment methods, and printable PDF format.";
    document.head.appendChild(metaDesc);

    // Structured data for SEO
    const script = document.createElement('script');
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Professional Receipt Generator",
      "description": "Free online tool to create, customize and download professional receipts with automatic tax calculations",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      if (metaDesc.parentNode) {
        document.head.removeChild(metaDesc);
      }
    };
  }, [isMounted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setReceipt(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      // Ensure numeric fields are properly converted
      const numericValue = ['tax', 'subtotal', 'grandTotal'].includes(name) 
        ? parseFloat(value) || 0 
        : value;
      
      setReceipt(prev => ({ 
        ...prev, 
        [name]: numericValue,
        ...(name === 'tax' && { 
          grandTotal: prev.subtotal + numericValue 
        })
      }));
    }
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...receipt.items];
    
    newItems[index] = { 
      ...newItems[index], 
      [name]: name === 'description' ? value : parseFloat(value) || 0
    };

    // Recalculate total if quantity or price changes
    if (name === 'quantity' || name === 'unitPrice') {
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
    }

    const subtotal = newItems.reduce((sum, item) => sum + (item.total || 0), 0);
    const grandTotal = subtotal + (receipt.tax || 0);

    setReceipt(prev => ({
      ...prev,
      items: newItems,
      subtotal,
      grandTotal
    }));
  };

  const addItem = () => {
    setReceipt(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, unitPrice: 0, total: 0 }]
    }));
  };

  const removeItem = (index) => {
    const newItems = receipt.items.filter((_, i) => i !== index);
    const subtotal = newItems.reduce((sum, item) => sum + (item.total || 0), 0);
    
    setReceipt(prev => ({
      ...prev,
      items: newItems,
      subtotal,
      grandTotal: subtotal + (prev.tax || 0)
    }));
  };

  const generatePdf = async () => {
    if (!isMounted || isGenerating) return;
    setIsGenerating(true);

    try {
      // Validate required fields
      const requiredFields = [
        receipt.seller.name,
        receipt.buyer.name,
        ...receipt.items.map(item => item.description)
      ];

      if (requiredFields.some(field => !field)) {
        alert('Please fill in all required fields (Seller Name, Buyer Name, and all Item Descriptions)');
        return;
      }

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Header
      page.drawText('OFFICIAL RECEIPT', {
        x: 50,
        y: 750,
        size: 24,
        font: boldFont,
        color: rgb(0.2, 0.4, 0.6)
      });

      // Receipt Details
      page.drawText(`Receipt #: ${receipt.receiptNumber || 'N/A'}`, { x: 50, y: 700, size: 12, font: regularFont });
      page.drawText(`Date: ${receipt.date || new Date().toISOString().split('T')[0]}`, { x: 50, y: 680, size: 12, font: regularFont });
      page.drawText(`Payment Method: ${receipt.paymentMethod || 'Cash'}`, { x: 50, y: 660, size: 12, font: regularFont });

      // Seller/Buyer Info
      page.drawText(`Seller: ${receipt.seller.name || 'Your Business'}`, { x: 50, y: 630, size: 12, font: regularFont });
      page.drawText(`Address: ${receipt.seller.address || 'Not specified'}`, { x: 50, y: 610, size: 12, font: regularFont });
      page.drawText(`Buyer: ${receipt.buyer.name || 'Customer'}`, { x: 350, y: 630, size: 12, font: regularFont });
      page.drawText(`Address: ${receipt.buyer.address || 'Not specified'}`, { x: 350, y: 610, size: 12, font: regularFont });

      // Items Table Header
      page.drawText('Description', { x: 50, y: 580, size: 12, font: boldFont });
      page.drawText('Qty', { x: 300, y: 580, size: 12, font: boldFont });
      page.drawText('Unit Price', { x: 350, y: 580, size: 12, font: boldFont });
      page.drawText('Total', { x: 450, y: 580, size: 12, font: boldFont });
      
      // Draw line under header
      page.drawLine({
        start: { x: 50, y: 575 },
        end: { x: 550, y: 575 },
        thickness: 1,
        color: rgb(0.8, 0.8, 0.8),
      });

      // Items Table
      let yPos = 560;
      receipt.items.forEach(item => {
        page.drawText(item.description || 'Item', { x: 50, y: yPos, size: 10, font: regularFont });
        page.drawText(String(item.quantity || 0), { x: 300, y: yPos, size: 10, font: regularFont });
        page.drawText(`$${(item.unitPrice || 0).toFixed(2)}`, { x: 350, y: yPos, size: 10, font: regularFont });
        page.drawText(`$${(item.total || 0).toFixed(2)}`, { x: 450, y: yPos, size: 10, font: regularFont });
        yPos -= 20;
      });

      // Totals Section
      page.drawLine({
        start: { x: 350, y: yPos - 30 },
        end: { x: 550, y: yPos - 30 },
        thickness: 1,
        color: rgb(0.8, 0.8, 0.8),
      });

      const subtotal = receipt.subtotal || 0;
      const tax = receipt.tax || 0;
      const grandTotal = receipt.grandTotal || subtotal + tax;

      page.drawText(`Subtotal: $${subtotal.toFixed(2)}`, { x: 350, y: yPos - 40, size: 12, font: regularFont });
      page.drawText(`Tax: $${tax.toFixed(2)}`, { x: 350, y: yPos - 60, size: 12, font: regularFont });
      page.drawText(`Total: $${grandTotal.toFixed(2)}`, { 
        x: 350, 
        y: yPos - 80, 
        size: 14,
        font: boldFont,
        color: rgb(0.2, 0.5, 0.2)
      });

      // Notes Section
      if (receipt.notes) {
        page.drawText('Notes:', { x: 50, y: yPos - 120, size: 12, font: boldFont });
        page.drawText(receipt.notes, { 
          x: 50, 
          y: yPos - 140, 
          size: 10, 
          font: regularFont,
          maxWidth: 500,
          lineHeight: 14
        });
      }

      // Download PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt_${receipt.receiptNumber || Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);

    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again or check your inputs.');
    } finally {
      setIsGenerating(false);
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

  const isFormValid = receipt.seller.name && receipt.buyer.name && 
                     receipt.items.every(item => item.description) &&
                     !isGenerating;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Header with SEO-rich title */}
      <div className="flex items-center mb-8 bg-blue-50 p-6 rounded-lg">
        <FaReceipt className="text-4xl text-blue-600 mr-4" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Professional Receipt Generator</h1>
          <p className="text-gray-600">Create, customize, and download printable receipts in minutes</p>
        </div>
      </div>

      {/* How to Use Section */}
      <div className="bg-white rounded-xl shadow-lg mb-12">
        <div className="bg-blue-600 text-white p-4 rounded-t-xl">
          <h2 className="text-xl font-bold flex items-center">
            <FaInfoCircle className="mr-2" /> How to Create Receipts in 3 Easy Steps
          </h2>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <FaFileSignature className="text-2xl text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">1. Enter Business Details</h3>
                <p className="text-sm text-gray-600">Fill in your business and customer information</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaDollarSign className="text-2xl text-green-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">2. Add Items & Prices</h3>
                <p className="text-sm text-gray-600">List products/services with quantities and prices</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaDownload className="text-2xl text-purple-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">3. Download PDF</h3>
                <p className="text-sm text-gray-600">Get your professional receipt instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Receipt Form */}
      <div className="bg-white rounded-xl shadow-lg mb-12">
        <div className="bg-blue-600 text-white p-4 rounded-t-xl">
          <h2 className="text-xl font-bold flex items-center">
            <FaReceipt className="mr-2" /> Receipt Details
          </h2>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Seller Info */}
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-bold text-lg mb-4 text-blue-600">Your Business Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Business Name *</label>
                  <input
                    type="text"
                    name="seller.name"
                    value={receipt.seller.name}
                    onChange={handleChange}
                    placeholder="Your Company Name"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Business Address</label>
                  <input
                    type="text"
                    name="seller.address"
                    value={receipt.seller.address}
                    onChange={handleChange}
                    placeholder="123 Business St, City"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
            
            {/* Buyer Info */}
            <div className="border-l-4 border-green-600 pl-4">
              <h3 className="font-bold text-lg mb-4 text-green-600">Customer Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Customer Name *</label>
                  <input
                    type="text"
                    name="buyer.name"
                    value={receipt.buyer.name}
                    onChange={handleChange}
                    placeholder="Customer Name"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Customer Address</label>
                  <input
                    type="text"
                    name="buyer.address"
                    value={receipt.buyer.address}
                    onChange={handleChange}
                    placeholder="456 Customer Ave, Town"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium mb-1">Receipt Number</label>
              <input
                type="text"
                name="receiptNumber"
                value={receipt.receiptNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-50"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={receipt.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Payment Method</label>
              <select
                name="paymentMethod"
                value={receipt.paymentMethod}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Check">Check</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Items Section */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4 text-blue-600">Items Purchased</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border">Description *</th>
                    <th className="p-3 text-left border">Quantity</th>
                    <th className="p-3 text-left border">Unit Price ($)</th>
                    <th className="p-3 text-left border">Total ($)</th>
                    <th className="p-3 text-left border"></th>
                  </tr>
                </thead>
                <tbody>
                  {receipt.items.map((item, index) => (
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
                          name="unitPrice"
                          value={item.unitPrice}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-full p-2 border rounded"
                          min="0"
                          step="0.01"
                          required
                        />
                      </td>
                      <td className="p-3 border">
                        <div className="p-2 font-medium">${item.total.toFixed(2)}</div>
                      </td>
                      <td className="p-3 border">
                        {receipt.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-700 p-2"
                            title="Remove item"
                          >
                            <FaTrash />
                          </button>
                        )}
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

          {/* Totals Section */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Additional Notes</label>
              <textarea
                name="notes"
                value={receipt.notes}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="3"
                placeholder="Thank you message or special instructions"
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span className="font-medium">${receipt.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax:</span>
                <div className="flex items-center">
                  <span className="mr-2">$</span>
                  <input
                    type="number"
                    name="tax"
                    value={receipt.tax}
                    onChange={handleChange}
                    className="w-24 p-1 border rounded"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total:</span>
                <span className="text-green-600">${receipt.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex justify-end">
            <button
              onClick={generatePdf}
              disabled={!isFormValid}
              className={`px-6 py-3 rounded-lg flex items-center ${isFormValid ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              {isGenerating ? (
                'Generating...'
              ) : (
                <>
                  <FaDownload className="mr-2" /> Download Receipt PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* SEO Articles */}
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <article className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaRegLightbulb className="mr-2 text-yellow-500" /> Why Professional Receipts Matter
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Legal proof of transaction for tax purposes</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Essential for warranty claims and returns</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Professional appearance builds customer trust</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Simplifies accounting and bookkeeping</span>
            </li>
          </ul>
        </article>

        <article className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaInfoCircle className="mr-2 text-blue-500" /> Receipt Requirements by Law
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Unique receipt number for tracking</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Business name and contact information</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Date of transaction</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Detailed list of items/services</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  );
}